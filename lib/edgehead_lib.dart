import 'dart:async';
import 'dart:convert';

import 'dart:math';
import 'package:built_collection/built_collection.dart';
import 'package:edgehead/ecs/pubsub.dart';
import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/edgehead_simulation.dart';
import 'package:edgehead/egamebook/book.dart';
import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/plan_consequence.dart';
import 'package:edgehead/fractal_stories/planner.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/stat.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:logging/logging.dart';

import 'edgehead_serializers.dart' as edgehead_serializer;

class EdgeheadGame extends Book {
  static final StatSetting<double> hitpointsSetting = new StatSetting<double>(
      "hitpoints", "The health of the player.", (v) => "$v HP");

  static final StatSetting<int> staminaSetting = new StatSetting<int>(
      "stamina", "The physical energy that the player can use.", (v) => "$v S");

  final Logger log = new Logger('EdgeheadGame');

  @override
  final String uid = "edgehead";

  @override
  final String semver = "2.0.0-alpha";

  @override
  final String buildId = "deadbeef";

  /// When we hit an action whose [Action.name] matches this pattern,
  /// we'll drop from automatic playthrough.
  ///
  /// This field exist in order to allow skipping to an action, as a way of
  /// play-testing.
  final Pattern actionPattern;
  bool actionPatternWasHit = false;
  Actor aren;
  Actor briana;

  final PubSub _pubsub = new PubSub();
  Situation initialSituation;
  WorldState world;

  Simulation simulation;

  PlanConsequence consequence;
  Storyline storyline = new Storyline();
  final Stat<double> hitpoints = new Stat<double>(hitpointsSetting, 0.0);
  final Stat<int> stamina = new Stat<int>(staminaSetting, 1);

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
  EdgeheadGame({
    this.actionPattern,
    String saveGameSerialized,
    int randomSeed,
  }) {
    if (randomSeed != null && saveGameSerialized != null) {
      throw new ArgumentError(
          "Either provide randomSeed or saveGameSerialized, never both.");
    }
    _setup(saveGameSerialized, randomSeed);
    _pubsub.actorLostHitpoints.listen(_actorLostHitpointsHandler);
    _pubsub.seal();
  }

  @override
  void close() {
    _pubsub.close();
    super.close();
  }

  /// Sets up the game, either as a load from [saveGameSerialized] or
  /// as a new game from scratch.
  void _setup(String saveGameSerialized, int randomSeed) {
    aren = edgeheadPlayer;

    hitpoints.value = aren.hitpoints / aren.maxHitpoints;
    stamina.value = aren.stamina;

    briana = edgeheadBriana;

    initialSituation = edgeheadInitialSituation;

    final startingTime = new DateTime.utc(1294, 5, 9, 10, 0);

    var global = new EdgeheadGlobalState();

    if (saveGameSerialized != null) {
      // Load existing game from [saveGameSerialized].
      try {
        world = edgehead_serializer.serializers.deserializeWith(
            WorldState.serializer, JSON.decode(saveGameSerialized));
      } on ArgumentError {
        const message = "Error when parsing savegame. Maybe the savegame needs "
            "to be updated to the newest version of the runtime?";
        log.severe(message);
        print("ERROR: $message");
        rethrow;
      }
    } else {
      // Creating a new game from start.
      world = new WorldState((b) => b
        ..actors = new SetBuilder<Actor>(<Actor>[aren, briana])
        ..situations = new ListBuilder<Situation>(<Situation>[initialSituation])
        ..global = global
        ..statefulRandomState = randomSeed ?? new Random().nextInt(0xffffffff)
        ..time = startingTime);
    }

    simulation = edgeheadSimulation;

    consequence = new PlanConsequence.initial(world);
  }

  @override
  void start() {
    update();
  }

  Future<Null> update() async {
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

    var currentPlayer = world.getActorById(aren.id);
    hitpoints.value = currentPlayer.hitpoints / currentPlayer.maxHitpoints;
    stamina.value = currentPlayer.stamina;

    log.info("update() for world at time ${world.time}");
    if (world.situations.isEmpty) {
      storyline.addParagraph();
      storyline.generateOutput().forEach(elementsSink.add);

      if (!world.hasAliveActor(aren.id)) {
        elementsSink.add(new LoseGame((b) => b..markdownText = "You die."));
      } else {
        elementsSink.add(new WinGame((b) => b..markdownText = "TODO win text"));
      }
      return;
    }

    var situation = world.currentSituation;
    var actor = situation.getCurrentActor(simulation, world);

    assert(
        actor != null,
        "situation.getCurrentActor(world) returned null. "
        "Some action that you added should make sure it removes the "
        "Situation (maybe '${world.actionHistory.getLatest().description}'?) "
        "or that the actor has at least one way to resolve the situation. "
        "World: $world. "
        "Situation: ${world.currentSituation}. "
        "Action Records: "
        "${world.actionHistory.describe()}");
    if (actor == null) {
      // In prod, silently remove the Situation and continue.
      final builder = world.toBuilder();
      builder.popSituation(simulation);
      builder.elapseWorldTime();
      world = builder.build();
      Timer.run(() => update());
      return;
    }

    var planner = new ActorPlanner(actor, simulation, world, _pubsub);
    await planner.plan();
    var recs = planner.getRecommendations();

    // Fail fast for no recommendations.
    assert(
        !recs.isEmpty, "No recommendations for ${actor.name} in ${situation}");
    if (recs.isEmpty) {
      // Hacky. Not sure this will work. Try to always have some action to do.
      // TODO: maybe this should remove the currentSituation from stack?
      log.severe("No recommendation for ${actor.name}");
      log.severe(() {
        String path = world.actionHistory.describe();
        return "- how we got here: $path";
      });
      final builder = world.toBuilder();
      builder.elapseSituationTimeIfExists(situation.id);
      builder.elapseWorldTime();
      world = builder.build();
      Timer.run(() => update());
      return;
    }

    if (actionPattern != null && actor.isPlayer) {
      for (var action in recs.actions) {
        if (!action.name.contains(actionPattern)) {
          continue;
        }
        actionPatternWasHit = true;
        void logAndPrint(String msg) {
          print(msg);
          log.info(msg);
        }

        logAndPrint("===== ACTIONPATTERN WAS HIT =====");
        logAndPrint("Found action that matches '$actionPattern': $action");
        for (var consequence
            in action.apply(actor, consequence, simulation, world, _pubsub)) {
          logAndPrint("- consequence with probability "
              "${consequence.probability}");
          logAndPrint("    ${consequence.successOrFailure.toUpperCase()}");
          logAndPrint("    ${consequence.storyline.realizeAsString()}");
        }
      }
    }

    Action selected;
    if (actor.isPlayer) {
      // Player
      if (recs.actions.length > 1) {
        // If we have more than one action, none of them should have
        // blank command (which signifies an action that should be
        // auto-selected).
        for (var action in recs.actions) {
          assert(
              action.command.isNotEmpty,
              "Action can have an empty ('') command "
              "only if it is the only action presented. But now we have "
              "these commands: ${recs.actions}. One of these actions "
              "should probably have a stricter PREREQUISITE (isApplicable).");
        }
      }

      log.fine("planner.generateTable for ${actor.name}");
      planner.generateTable().forEach((line) => log.fine(line));

      // Take only the first few best actions.
      List<Action> actions = recs
          .pickMax(situation.maxActionsToShow, normalCombineFunction)
          .toList(growable: false);

      if (actions.isNotEmpty && actions.any((a) => a.command != "")) {
        /// Only realize storyline when there is an actual choice to show.
        storyline.generateOutput().forEach(elementsSink.add);
      }

      // Creates a string just for sorting. Actions with same enemy are
      // sorted next to each other.
      String sortingName(Action a) {
        if (a is EnemyTargetAction) {
          return "${a.enemy.name} ${a.command}";
        }
        return "ZZZZZZ ${a.command}";
      }

      actions.sort((a, b) => sortingName(a).compareTo(sortingName(b)));

      assert(
          actions.length == 1 || !actions.any((a) => a.isImplicit),
          "Cannot have an implicit action when there are more "
          "than one presented.");

      final choices = new ListBuilder<Choice>();
      final callbacks = new Map<Choice, Future<Null> Function()>();
      for (Action action in actions) {
        final choice = new Choice((b) => b
          ..markdownText = action.command
          ..helpMessage = action.helpMessage
          ..isImplicit = action.isImplicit);
        callbacks[choice] = () async {
          await _applySelected(action, actor, storyline);
        };
        choices.add(choice);
      }
      final savegame = new SaveGameBuilder()
        ..saveGameSerialized = JSON.encode(edgehead_serializer.serializers
            .serializeWith(WorldState.serializer, world));
      final choiceBlock = new ChoiceBlock((b) => b
        ..choices = choices
        ..saveGame = savegame);
      final picked = await showChoices(choiceBlock);

      // Execute the picked option.
      await callbacks[picked]();
    } else {
      // NPC
      // TODO - if more than one action, remove the one that was just made
      final combineFunction =
          simulation.combineFunctions[actor.combineFunctionHandle];
      selected = recs.pickRandomly(combineFunction, world.statefulRandomState);
      await _applySelected(selected, actor, storyline);
    }

    storyline.generateFinishedOutput().forEach(elementsSink.add);

    // Run the next step asynchronously.
    Timer.run(() => update());
  }

  void _actorLostHitpointsHandler(ActorLostHitpointsEvent event) {
    if (event.actor.isPlayer) {
      event.context.outputStoryline
          .addCustomElement(new StatUpdate<int>((b) => b
            ..name = hitpointsSetting.name
            ..newValue = event.actor.hitpoints));
    }
  }

  Future _applyPlayerAction(
      Action action, Actor actor, List<PlanConsequence> consequences) async {
    num chance = action.getSuccessChance(actor, simulation, world).value;
    if (chance == 1.0) {
      consequence = consequences.single;
    } else if (chance == 0.0) {
      consequence = consequences.single;
    } else {
      var resourceName = action.rerollResource.toString().split('.').last;
      assert(!action.rerollable || action.rerollResource == Resource.stamina,
          'Non-stamina resource needed for ${action.name}');
      var result = await showSlotMachine(
          chance.toDouble(), action.getRollReason(actor, simulation, world),
          rerollable:
              action.rerollable && actor.hasResource(action.rerollResource),
          rerollEffectDescription: "use $resourceName");
      consequence =
          consequences.where((c) => c.isSuccess == result.isSuccess).single;

      if (result.wasRerolled) {
        // Deduct player's stats (stamina, etc.) according to wasRerolled.
        assert(
            action.rerollResource != null,
            "Action.rerollable is true but "
            "no Action.rerollResource is specified.");
        assert(action.rerollResource == Resource.stamina,
            "Only stamina is supported as reroll resource right now");
        // TODO: find out if we can do away without modifying world outside
        //       planner
        final builder = consequence.world.toBuilder();
        builder.updateActorById(actor.id, (b) => b..stamina -= 1);
        world = builder.build();
        consequence = new PlanConsequence.withUpdatedWorld(consequence, world);
      }
    }
  }

  /// An instance that can be reused to generate randomness, provided that
  /// it's always seeded with a new state before use.
  final StatefulRandom _reusableRandom = new StatefulRandom(42);

  Future<Null> _applySelected(
      Action action, Actor actor, Storyline storyline) async {
    var consequences =
        action.apply(actor, consequence, simulation, world, _pubsub).toList();

    if (actor.isPlayer) {
      await _applyPlayerAction(action, actor, consequences);
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

    log.fine(() => "${actor.name} selected ${action.name}");
    log.finest(() {
      String path = world.actionHistory.describe();
      return "- how ${actor.name} got here: $path";
    });
  }
}
