import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:built_collection/built_collection.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/edgehead_actors.dart';
import 'package:edgehead/edgehead_director.dart';
import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/edgehead_save_serialize.dart';
import 'package:edgehead/edgehead_serializers.dart' as edgehead_serializer;
import 'package:edgehead/edgehead_simulation.dart';
import 'package:edgehead/egamebook/book.dart';
import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:edgehead/egamebook/slot_machine_result.dart' as slot;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/plan_consequence.dart';
import 'package:edgehead/fractal_stories/planner.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/stat.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:logging/logging.dart';

class EdgeheadGame extends Book {
  static final StatSetting<int> sanitySetting = StatSetting<int>(
      "sanity", "The mental state of the player's mind.", (v) => "$v Sa", 3);

  static final StatSetting<int> staminaSetting = StatSetting<int>("stamina",
      "The physical energy that the player can use.", (v) => "$v St", 5);

  /// This is the random generator used to scramble randomness just after
  /// the player has selected an option (assuming [randomizeAfterPlayerChoice]
  /// is `true`).
  static final Random _randomizeAfterPlayerChoiceRandom = Random();

  /// When this is `true`, new games will be started with
  /// [EdgeheadGlobalState.isInTesterMode] on. This means some tester
  /// conveniences will be enabled.
  static const bool startNewGamesInTesterMode = false;

  final Logger log = Logger('KnightsGame');

  @override
  final String uid = "kosf";

  @override
  final String semver = "1.0.0";

  /// TODO: This should probably be auto-populated from somewhere.
  @override
  final String buildId = "deadbeef";

  /// When we hit an action whose [Action.name] matches this pattern,
  /// we'll drop from automatic playthrough.
  ///
  /// This field exist in order to allow skipping to an action, as a way of
  /// play-testing.
  final Pattern? actionPattern;

  bool actionPatternWasHit = false;

  /// The player character as it started the game. It is mostly used in
  /// [_setup], but it also defines whether or not to end the game
  /// (if the character with [playerCharacter]'s [Actor.id] is dead, then
  /// that's game over).
  late Actor? playerCharacter;

  late WorldState world;
  late Simulation simulation;
  late PlanConsequence consequence;
  late Storyline storyline;

  final Stat<int> stamina = Stat<int>(staminaSetting, 1);

  final Stat<int> sanity = Stat<int>(sanitySetting, 1);

  /// An instance that can be reused to generate randomness, provided that
  /// it's always seeded with a new state before use.
  final StatefulRandom _reusableRandom = StatefulRandom(42);

  /// If `true`, we update [world]'s [WorldState.statefulRandomState] with a new
  /// number. This is so that the player can reload the game from a savegame
  /// and have a different experience.
  ///
  /// If we didn't have this, reloading would lead to the same exact
  /// playthrough, because the system is completely deterministic.
  final bool randomizeAfterPlayerChoice;

  /// The latest savegame, for debug use.
  /// ignore: unused_field
  String _latestSavegameDebug = '';

  /// Create a new Edgehead game.
  ///
  /// The optional [actionPattern] will stop the automated playthrough
  /// once an action with a matching name is encountered.
  ///
  /// Reloads game state from [saveGameSerialized] when provided.
  ///
  /// Initializes a new game with [randomSeed] when provided.
  ///
  /// If [saveGameSerialized] is provided, [randomSeed] mustn't be provided,
  /// and vice versa.
  ///
  /// Set [randomizeAfterPlayerChoice] to `false` if you want a completely
  /// deterministic playthrough. By default, this is `true`, which means that
  /// the world state's random seed is changed after every player
  /// input (i.e. choice taken). This ensures that reloading a previous position
  /// will result in a different experience.
  EdgeheadGame({
    this.actionPattern,
    String? saveGameSerialized,
    int? randomSeed,
    this.randomizeAfterPlayerChoice = true,
  }) {
    if (randomSeed != null && saveGameSerialized != null) {
      throw ArgumentError(
          "Either provide randomSeed or saveGameSerialized, never both.");
    }
    _setup(saveGameSerialized, randomSeed);
  }

  /// Load existing game from [saveGameSerialized].
  @override
  void load(String saveGameSerialized) {
    const parseErrorMessage =
        "Error when parsing savegame. Maybe the savegame needs "
        "to be updated to the newest version of the runtime?";

    try {
      world = edgehead_serializer.serializers.deserializeWith(
          WorldState.serializer, json.decode(saveGameSerialized))!;
      // ignore: avoid_catching_errors
    } on ArgumentError catch (e, s) {
      log.severe(parseErrorMessage);
      throw EdgeheadSaveGameParseException(
          'Couldn\'t parse savegame', e, s.toString());
      // ignore: avoid_catching_errors
    } on DeserializationError catch (e, s) {
      log.severe(parseErrorMessage);
      throw EdgeheadSaveGameParseException(
          'Couldn\'t parse savegame', e, s.toString());
    }
    _updateStatsFromWorld();
    _sendInitialStats();
  }

  @override
  void start() {
    _sendInitialStats();

    update();
  }

  Future<void> update() async {
    return runZonedGuarded(_update, (Object e, StackTrace s) {
      // Catch errors and send to presenter.
      elementsSink.add(ErrorElement((b) => b
        ..message = e.toString()
        ..stackTrace = s.toString()));
      // ignore: only_throw_errors
      throw e;
    });
  }

  Future _applyPlayerAction(Performance<dynamic> performance, Actor actor,
      List<PlanConsequence> consequences, Storyline storyline) async {
    num chance = performance.action
        .getSuccessChance(actor, simulation, world, performance.object)
        .value;
    if (chance == 1.0) {
      consequence = consequences.single;
    } else if (chance == 0.0) {
      consequence = consequences.single;
    } else {
      var resourceName =
          performance.action.rerollResource.toString().split('.').last;

      slot.SessionResult result;
      result = await showSlotMachine(
          chance.toDouble(),
          performance.action
              .getRollReason(actor, simulation, world, performance.object)!,
          rerollable: performance.action.rerollable &&
              actor.hasResource(performance.action.rerollResource!),
          rerollEffectDescription: "drain $resourceName");

      consequence =
          consequences.where((c) => c.isSuccess == result.isSuccess).single;

      if (result.wasRerolled) {
        // Deduct player's stats (stamina, etc.) according to wasRerolled.
        assert(
            performance.action.rerollResource != null,
            "Action.rerollable is true but "
            "no Action.rerollResource is specified.");

        // It would be better to do without modifying world outside planner,
        // but I can't think of any other way.
        final builder = consequence.world.toBuilder();
        switch (performance.action.rerollResource!) {
          case Resource.sanity:
            assert(consequence.world.getActorById(actor.id).sanity > 0,
                "Tried using sanity when ${actor.name} had none left.");
            storyline.addCustomElement(StatUpdate.sanity(actor.sanity, -1));
            builder.updateActorById(actor.id, (b) => b.sanity = b.sanity! - 1);
          case Resource.stamina:
            assert(consequence.world.getActorById(actor.id).stamina > 0,
                "Tried using stamina when ${actor.name} had none left.");
            storyline.addCustomElement(StatUpdate.stamina(actor.stamina, -1));
            builder.updateActorById(
                actor.id, (b) => b..stamina = b.stamina! - 1);
        }
        world = builder.build();
        consequence = PlanConsequence.withUpdatedWorld(consequence, world);
      }
    }
  }

  Future<void> _applySelected(Performance performance, ActorTurn turn,
      int choiceCount, Storyline storyline) async {
    var consequences = performance
        .apply(turn, choiceCount, consequence, simulation, world,
            performance.object)
        .toList();

    if (turn.actor!.isPlayer) {
      await _applyPlayerAction(
          performance, turn.actor!, consequences, storyline);
    } else {
      // This initializes the random state based on current
      // [WorldState.statefulRandomState]. We don't save the state after use
      // because that would be changing state outside an action.
      _reusableRandom.loadState(world.statefulRandomState ~/ 3 * 2 + 1);
      int index = Randomly.chooseWeighted(
          consequences.map((c) => c.probability),
          random: _reusableRandom);
      consequence = consequences[index];
    }

    storyline.concatenate(consequence.storyline);
    world = consequence.world;

    var actor = world.getActorById(turn.actor!.id);
    log.fine(() => "${actor.name} selected ${performance.action.name}");
    log.fine(() => "- ${actor.name} is recovering "
        "until ${actor.recoveringUntil}");
    log.finest(() {
      String path = world.actionHistory.describe();
      return "- how ${actor.name} got here: $path";
    });
  }

  void _sendInitialStats() {
    elementsSink.add(StatInitialization.stamina(stamina.value));
    elementsSink.add(StatInitialization.sanity(sanity.value));
  }

  /// Sets up the game, either as a load from [saveGameSerialized] or
  /// as a new game from scratch.
  void _setup(String? saveGameSerialized, int? randomSeed) {
    if (saveGameSerialized != null) {
      // Updates [world] from savegame.
      load(saveGameSerialized);
    } else {
      // Creating a new game from start.
      world = WorldState((b) => b
        ..actors = ListBuilder<Actor>(<Actor>[
          edgeheadPlayer,
          edgeheadTamara,
          edgeheadLeroy,
          edgeheadKat,
          edgeheadMiguel,
          edgeheadLadyHope,
          edgeheadDarg,
          jailer,
          shaman,
          sixtyFiverOrc,
          sixtyFiverGoblin,
          firstGoblin,
          albinoGoblin,
          campLeaderGoblin,
          campNakedGoblin,
          lizardman,
          conetKobold,
          orcCaptain,
          orcBerserker,
          hawkman,
          bigO,
        ])
        ..director = edgeheadDirector.toBuilder()
        ..situations =
            ListBuilder<Situation>(<Situation>[edgeheadInitialSituation])
        ..global = EdgeheadGlobalState(
            (b) => b.isInTesterMode = startNewGamesInTesterMode)
        ..statefulRandomState = randomSeed ?? Random().nextInt(0xffffffff)
        ..time = edgeheadStartingTime);
    }

    storyline = Storyline(
        referredEntities: world.actors.where((actor) => !actor.isDirector));

    playerCharacter = world.getActorById(playerId);

    _updateStatsFromWorld();

    simulation = edgeheadSimulation;

    consequence = PlanConsequence.initial(world);
  }

  Future<void> _update() async {
    final intermediateOutput =
        storyline.generateFinishedOutput().toList(growable: false);
    if (intermediateOutput.isNotEmpty) {
      /// Forward the output to [elementSink].
      intermediateOutput.forEach(elementsSink.add);
      // We had some paragraphs ready and sent them to [echo]. Let's return
      // to the outer loop so that we show the output before planning next
      // moves.
      return;
    }

    _updateStatsFromWorld();

    log.info("update() for world at time ${world.time}");
    if (world.situations.isEmpty) {
      storyline.addParagraph();
      storyline.generateOutput().forEach(elementsSink.add);

      if (world.wasKilled(playerCharacter!.id)) {
        showLose("I die.");
      } else {
        // TODO: show a better message.
        showWin("I win.");
      }
      return;
    }

    var situation = world.currentSituation!;
    var actorTurn = situation.getNextTurn(simulation, world);

    assert(
        !actorTurn.isNever,
        "situation.getCurrentActor(world) returned null. "
        "Some action that you added should make sure it removes the "
        "Situation (maybe '${world.actionHistory.getLatest().description}'?) "
        "or that the actor has at least one way to resolve the situation. "
        "World: $world. "
        "Situation: ${world.currentSituation}. "
        "Action Records: "
        "${world.actionHistory.describe()}");
    if (actorTurn.isNever) {
      // In prod, silently remove the Situation and continue.
      final builder = world.toBuilder();
      builder.situations.removeLast();
      world = builder.build();
      Timer.run(update);
      return;
    }

    if (actorTurn.actor == null) {
      throw ArgumentError("actorTurn.actor is null. "
          "That may mean that a Situation returns getCurrentActor as null. "
          "Some action that you added should make sure it removes the "
          "Situation "
          "(maybe ${world.actionHistory.getLatest().description}?). "
          "World: $world. "
          "Situation: ${world.currentSituation}. "
          "Action Records: "
          "${world.actionHistory.describe()}");
    }
    var actor = actorTurn.actor!;

    var planner = ActorPlanner(actor, simulation, world);
    planner.plan(
      // Don't plan ahead for the player, we are showing
      // all possibilities anyway. And the director only has one action.
      maxOrder: actor.isPlayer || actor.isDirector ? 0 : 4,
      maxConsequences: 10000,
    );
    var recs = planner.getRecommendations();

    if (recs.isEmpty) {
      // Fail fast for no recommendations in debug mode.
      assert(
          false,
          "No recommendations for ${actor.name} in $situation.\n"
          "How we got here: ${world.actionHistory.describe()}\n"
          "Savegame: ${serializeWorldState(world)}");

      // Try to recover when in production. Hacky. Not sure this will work
      // and could lead into an infinite loop.
      // TODO: maybe this should remove the currentSituation from stack once
      //       a counter of failures reaches some number.
      log.severe("No recommendation for ${actor.name}");
      log.severe(() {
        String path = world.actionHistory.describe();
        return "- how we got here: $path";
      });
      final builder = world.toBuilder();
      builder.elapseSituationTimeIfExists(situation.id);
      world = builder.build();
      Timer.run(update);
      return;
    }

    if (actionPattern != null && actor.isPlayer) {
      for (final performance in recs.performances) {
        if (!performance.action.name.contains(actionPattern!)) {
          continue;
        }
        actionPatternWasHit = true;
        void logAndPrint(String msg) {
          print(msg);
          log.info(msg);
        }

        logAndPrint("===== ACTIONPATTERN WAS HIT =====");
        logAndPrint("Found action that matches '$actionPattern': $performance");
        for (final consequence in performance.apply(
            actorTurn,
            recs.performances.length,
            consequence,
            simulation,
            world,
            performance.object)) {
          logAndPrint("- consequence with probability "
              "${consequence.probability}");
          logAndPrint("    ${consequence.successOrFailure.toUpperCase()}");
          logAndPrint("    ${consequence.storyline.realizeAsString()}");
        }
      }
    }

    log.fine("planner.generateTable for ${actor.name}");
    planner.generateTable().forEach(log.fine);

    Performance<dynamic>? selected;
    if (actor.isPlayer) {
      // Player
      if (recs.performances.length > 1) {
        // If we have more than one performance, none of them should have
        // blank command (which signifies an action that should be
        // auto-selected).
        for (final performance in recs.performances) {
          assert(
              performance.commandPath.isNotEmpty,
              "Action can have an empty ([]) commandPath "
              "only if it is the only action presented. But now we have "
              "these commands: ${recs.performances.map((p) => p.commandPath)}. "
              "One of these actions should probably have a stricter "
              "PREREQUISITE (isApplicable).");
        }
      }

      // Take only the first few best actions.
      // TODO: remove - we are taking all actions now
      List<Performance> performances = recs
          .pickMax(situation.maxActionsToShow, normalFoldFunction)
          .toList(growable: false);

      if (performances.isNotEmpty &&
          performances.any((a) => a.commandPath.isNotEmpty)) {
        /// Only realize storyline when there is an actual choice to show.
        storyline.generateOutput().forEach(elementsSink.add);
      }

      // Creates a string just for sorting. Actions with same enemy are
      // sorted next to each other.
      String sortingName(Performance a) {
        var commandForSorting = a.commandPath.join('-->');
        if (a.action is EnemyTargetAction) {
          return "${a.object} $commandForSorting";
        }
        return "ZZZZZZ $commandForSorting";
      }

      performances.sort((a, b) => sortingName(a).compareTo(sortingName(b)));

      assert(
          performances.length == 1 ||
              !performances.any((a) => a.action.isImplicit),
          "Cannot have an implicit action when there are more "
          "than one presented.");

      final choices = ListBuilder<Choice>();
      final callbacks = <Choice, Future<void> Function()>{};
      for (final performance in performances) {
        assert(
            performance.action.isImplicit ||
                performance.commandPath.first != 'Go' ||
                performance.additionalData.isNotEmpty,
            'Go actions should have path data: $performance.');

        final smartifiedCommandPath =
            performance.commandPath.map(Storyline.smartifyQuotes);
        final smartifiedCommandSentence =
            Storyline.smartifyQuotes(performance.commandSentence);

        final choice = Choice((b) => b
          ..commandPath = ListBuilder<String>(smartifiedCommandPath)
          ..commandSentence = smartifiedCommandSentence
          ..helpMessage = performance.action
              .getHelpMessage(performance.context, performance.object)
          ..successChance = performance.successChance.value
          ..actionName = performance.action.name
          ..additionalData = ListBuilder<int>(performance.additionalData)
          ..additionalStrings =
              MapBuilder<String, String>(performance.additionalStrings)
          ..isImplicit = performance.action.isImplicit);
        callbacks[choice] = () async {
          selected = performance;
          await _applySelected(
              performance, actorTurn, performances.length, storyline);

          // New seed for WorldState's stateful random state, so that players
          // can reload and see different results.
          if (randomizeAfterPlayerChoice) {
            world = world.rebuild((b) => b.statefulRandomState =
                _randomizeAfterPlayerChoiceRandom.nextInt(0xFFFFFF));
          }
        };
        choices.add(choice);
      }
      final serializedSavegame = serializeWorldState(world);
      // Save for debug use. Overwrites the previous savegame.
      _latestSavegameDebug = serializedSavegame;
      final savegame = SaveGameBuilder()
        ..saveGameSerialized = serializedSavegame;
      final choiceBlock = ChoiceBlock((b) => b
        ..choices = choices
        ..saveGame = savegame);
      try {
        final picked = await showChoices(choiceBlock);

        final callback = callbacks[picked];
        if (callback == null) {
          log.warning("showChoices returned a choice that isn't part "
              "of the choiceBlock\n"
              "choice: $picked\n"
              "choiceBlock: $choiceBlock");
          return;
        }

        // Execute the picked option.
        await callback();
      } on CancelledInteraction catch (e) {
        log.info("The choice-picking was interrupted: $e");
        return;
      }
    } else {
      // NPC
      // TODO - if more than one action, remove the one that was just made
      final foldFunction = simulation.foldFunctions[actor.foldFunctionHandle]!;
      selected = recs.pickRandomly(foldFunction, world.statefulRandomState);
      await _applySelected(
          selected, actorTurn, recs.performances.length, storyline);
    }
    log.info(() => '${actor.name} (id=${actor.id}) selected $selected');

    storyline.generateFinishedOutput().forEach(elementsSink.add);

    // Run the next step asynchronously.
    Timer.run(update);
  }

  /// Updates [stamina] and [sanity] from the current [world].
  void _updateStatsFromWorld() {
    var currentPlayer = world.getActorById(playerId);
    stamina.value = currentPlayer.stamina;
    sanity.value = currentPlayer.sanity;
  }
}

/// An exception to be thrown when [EdgeheadGame.new] is called with
/// an outdated or corrupt savegame.
class EdgeheadSaveGameParseException implements Exception {
  final Error? underlyingError;

  final String stackTrace;

  final String message;

  const EdgeheadSaveGameParseException(
      this.message, this.underlyingError, this.stackTrace);

  @override
  String toString() => '$message -- underlyingError: $underlyingError';
}
