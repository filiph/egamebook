import 'dart:async';

import 'package:built_collection/built_collection.dart';
import 'package:edgehead/ecs/pubsub.dart';
import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/egamebook/commands/commands.dart';
import 'package:edgehead/egamebook/commands/resolve_slot_machine_command.dart';
import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/items/sword.dart';
import 'package:edgehead/fractal_stories/plan_consequence.dart';
import 'package:edgehead/fractal_stories/planner.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:edgehead/writers_input.dart';
import 'package:logging/logging.dart';
import 'package:meta/meta.dart';
import 'package:slot_machine/result.dart' as slot;

import 'egamebook/stat/stat.dart';

/// [EdgeheadGame.briana]'s [Actor.id].
const int brianaId = 100;

/// [EdgeheadGame.aren]'s [Actor.id].
const int playerId = 1;

/// Lesser self-worth than normal combine function as monsters should
/// kind of carelessly attack to make fights more action-packed.
num carelessCombineFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation - 2 * scoreChange.enemy;

num normalCombineFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation +
    scoreChange.teamPreservation -
    scoreChange.enemy;

abstract class Book {
  StreamController<ElementBase> _elementsController;

  /// The completer for [showChoices]. Should be `null` by default, and only
  /// `non-null` when there is a [ChoiceBlock] waiting for player input.
  Completer<Choice> _showChoicesCompleter;

  /// The completer for [showSlotMachine]. Should be `null` by default,
  /// and only `non-null` when there is a slot machine rolling or waiting
  /// for player input.
  Completer<slot.SessionResult> _showSlotMachineCompleter;

  /// Whether or not the book is waiting for a command from the player.
  /// If it isn't, commands arriving to the book will throw a runtime error.
  ///
  /// This is important because we don't want to allow the player to change
  /// the Book's state while it's working. For example, drinking a potion
  /// from the inventory should not be allowed _while_ a combat simulation
  /// is taking place. It should only be available when it's the player's turn.
  ///
  /// TODO: Instead of throwing, buffer the input and send it after we are
  /// waiting for input again.
  @protected
  bool isWaitingForInput = true;

  Book() : _elementsController = new StreamController<ElementBase>();

  /// The build identifier. This should probably be autopopulated
  /// from the commit hash.
  String get buildId;

  Stream<ElementBase> get elements => _elementsController.stream;

  /// If you want to send custom book elements, use [elementsSink].
  ///
  /// Most [Book]s will use methods like [showChoices] which use
  /// [elementsSink] internally.
  ///
  /// If you opt into using the manual method, you also need to make sure
  /// to deal with custom [Command]s coming from the player.  For example,
  /// a fancy Map element could be sending a `MapZoom` command which you
  /// should deal with in [acceptCustom].
  @protected
  StreamSink<ElementBase> get elementsSink => _elementsController.sink;

  /// The version in semver form (e.g. "1.0.2").
  String get semver;

  /// A string uniquely identifying this egamebook.
  String get uid;

  /// Major player events are sent through this function. For example, player
  /// picking a [Choice] or requesting a game load.
  ///
  /// Custom events are redirected to [acceptCustom].
  void accept(CommandBase command) {
    assert(isWaitingForInput);

    if (command is PickChoice) {
      assert(_showChoicesCompleter != null);
      _showChoicesCompleter.complete(command.choice);
      _showChoicesCompleter = null;
      isWaitingForInput = false;
      return;
    }

    if (command is ResolveSlotMachine) {
      assert(_showSlotMachineCompleter != null);
      _showSlotMachineCompleter.complete(
          new slot.SessionResult(command.result, command.wasRerolled));
      _showSlotMachineCompleter = null;
      isWaitingForInput = false;
      return;
    }

    // else
    acceptCustom(command);
  }

  /// Override this function when you expect custom commands from the user.
  ///
  /// Please make sure to update [isWaitingForInput]. If the command sets
  /// things in motion (as in, starts the simulation), you should set it
  /// to `false`. Otherwise, keep it `true`.
  @protected
  void acceptCustom(CommandBase command) {
    throw new UnimplementedError();
  }

  /// Cleans up
  @mustCallSuper
  void close() {
    _elementsController.close();
  }

  /// Shows the provided text as regular [TextOutput].
  @protected
  void echo(String markdownText) {
    _elementsController
        .add(new TextOutput((b) => b..markdownText = markdownText));
  }

  /// Show a block of choices. This method returns with a [Future] of the
  /// picked [Choice].
  @protected
  Future<Choice> showChoices(ChoiceBlock choices) {
    assert(_showChoicesCompleter == null);
    _showChoicesCompleter = new Completer<Choice>();
    _elementsController.add(choices);
    isWaitingForInput = true;
    return _showChoicesCompleter.future;
  }

  @protected
  Future<slot.SessionResult> showSlotMachine(
      double probability, String rollReason,
      {bool rerollable: false, String rerollEffectDescription}) {
    assert(_showSlotMachineCompleter == null);
    _showSlotMachineCompleter = new Completer<slot.SessionResult>();
    _elementsController.add(new SlotMachine((b) => b
      ..probability = probability
      ..rollReason = rollReason
      ..rerollable = rerollable
      ..rerollEffectDescription = rerollEffectDescription));
    isWaitingForInput = true;
    return _showSlotMachineCompleter.future;
  }

  /// Sets the book in motion. Either from the start, or from a saved position.
  void start();
}

class EdgeheadGame extends Book {
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
  Actor orc;
  Actor goblin;

  final PubSub _pubsub = new PubSub();

  Room preStartBook;

  Situation initialSituation;
  WorldState world;
  PlanConsequence consequence;

  Storyline storyline = new Storyline();

  final Stat<double> hitpoints =
      new Stat<double>("hitpoints", (v) => "$v HP", initialValue: 0.0);
  final Stat<int> stamina = new Stat<int>("stamina", (v) => "$v HP");
  final Stat<int> gold = new Stat<int>("gold", (v) => "$v g");

  EdgeheadGame({this.actionPattern}) {
    setup();
    _pubsub.actorLostHitpoints.listen(_actorLostHitpointsHandler);
    _pubsub.seal();
  }

  @override
  void close() {
    _pubsub.close();
    super.close();
  }

  void setup() {
    orc = new Actor.initialized(1000, "orc",
        nameIsProperNoun: false,
        pronoun: Pronoun.HE,
        currentWeapon: new Sword(),
        hitpoints: 2,
        maxHitpoints: 2,
        team: defaultEnemyTeam,
        combineFunction: carelessCombineFunction);

    goblin = new Actor.initialized(1001, "goblin",
        nameIsProperNoun: false,
        pronoun: Pronoun.HE,
        currentWeapon: new Sword(name: "scimitar"),
        team: defaultEnemyTeam,
        combineFunction: carelessCombineFunction);

    preStartBook = new Room(
        "preStartBook",
        (a, w, s) => s.add("UNUSED because this is the first choice",
            wholeSentence: true),
        (a, w, s) => throw new StateError("Room isn't to be revisited"),
        null,
        null,
        [new Exit("start_adventure", "", "")]);

    aren = new Actor.initialized(playerId, "Filip",
        nameIsProperNoun: true,
        isPlayer: true,
        pronoun: Pronoun.YOU,
        hitpoints: 2,
        maxHitpoints: 2,
        stamina: 1,
        initiative: 1000,
        currentRoomName: preStartBook.name);

    hitpoints.value = aren.hitpoints / aren.maxHitpoints;
    stamina.value = aren.stamina;

    briana = new Actor.initialized(brianaId, "Briana",
        nameIsProperNoun: true,
        pronoun: Pronoun.SHE,
        hitpoints: 2,
        maxHitpoints: 2,
        currentRoomName: preStartBook.name,
        followingActorId: aren.id);

    initialSituation =
        new RoomRoamingSituation.initialized(preStartBook, false);

    var rooms = new List<Room>.from(allRooms)
      ..addAll([preStartBook, endOfRoam]);

    var global = new EdgeheadGlobalState();

    world = new WorldState([aren, briana], rooms, initialSituation, global);

    consequence = new PlanConsequence.initial(world);
  }

  @override
  void start() {
    update();
  }

  Future<Null> update() async {
    if (storyline.outputFinishedParagraphs(echo)) {
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
      echo(storyline.realize());

      if (!world.hasAliveActor(aren.id)) {
        _elementsController
            .add(new LoseGame((b) => b..markdownText = "You die."));
      } else {
        _elementsController
            .add(new WinGame((b) => b..markdownText = "TODO win text"));
      }
      return;
    }

    var situation = world.currentSituation;
    var actor = situation.getCurrentActor(world);

    assert(
        actor != null,
        "situation.getCurrentActor(world) returned null. "
        "Some action that you added should make sure it removes the "
        "Situation (maybe '${world.actionRecords.first.description}'?) or that "
        "the actor has at least one way to resolve the situation. "
        "World: $world. "
        "Situation: ${world.currentSituation}. "
        "Action Records: "
        "${world.actionRecords.map((a) => a.description).join('<-')}");
    if (actor == null) {
      // In prod, silently remove the Situation and continue.
      world.popSituation();
      world.time += 1;
      return;
    }

    var planner = new ActorPlanner(actor, world, _pubsub);
    await planner.plan();
    var recs = planner.getRecommendations();
    if (recs.isEmpty) {
      // Hacky. Not sure this will work. Try to always have some action to do.
      // TODO: maybe this should remove the currentSituation from stack?
      log.severe("No recommendation for ${actor.name}");
      log.severe(() {
        String path =
            world.actionRecords.map((a) => a.description).join(' <- ');
        return "- how we got here: $path";
      });
      world.elapseSituationTime(situation.id);
      world.time += 1;
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
            in action.apply(actor, consequence, world, _pubsub)) {
          logAndPrint("- consequence with probability "
              "${consequence.probability}");
          logAndPrint("    ${consequence.successOrFailure.toUpperCase()}");
          logAndPrint("    ${consequence.storyline.realize()}");
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
        echo(storyline.realize());
        storyline.clear();
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

      final choices = new ListBuilder<Choice>();
      final callbacks = new Map<Choice, Future<Null> Function()>();
      for (Action action in actions) {
        final choice = new Choice((b) => b
          ..markdownText = action.command
          ..helpMessage = action.helpMessage);
        callbacks[choice] = () async {
          await _applySelected(action, actor, storyline);
        };
        choices.add(choice);
      }
      final choiceBlock = new ChoiceBlock((b) => b..choices = choices);
      final picked = await showChoices(choiceBlock);

      // Execute the picked option.
      await callbacks[picked]();
    } else {
      // NPC
      // TODO - if more than one action, remove the one that was just made
      selected =
          recs.pickRandomly(actor.combineFunction ?? normalCombineFunction);
      await _applySelected(selected, actor, storyline);
    }

    storyline.outputFinishedParagraphs(echo);

    // ignore: unawaited_futures
    update();
  }

  void _actorLostHitpointsHandler(ActorLostHitpointsEvent event) {
    if (event.actor.isPlayer) {
      // TODO
      echo("=== HITPOINTS UPDATE: player is hit for ${event.hitpointsLost}");
    }
  }

  Future _applyPlayerAction(
      Action action, Actor actor, List<PlanConsequence> consequences) async {
    num chance = action.getSuccessChance(actor, world);
    if (chance == 1.0) {
      consequence = consequences.single;
    } else if (chance == 0.0) {
      consequence = consequences.single;
    } else {
      var resourceName = action.rerollResource.toString().split('.').last;
      assert(!action.rerollable || action.rerollResource == Resource.stamina,
          'Non-stamina resource needed for ${action.name}');
      var result = await showSlotMachine(
          chance.toDouble(), action.getRollReason(actor, world),
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
        var world = new WorldState.duplicate(consequence.world);
        assert(action.rerollResource == Resource.stamina,
            "Only stamina is supported as reroll resource right now");
        world.updateActorById(actor.id, (b) => b..stamina -= 1);
        consequence = new PlanConsequence.withUpdatedWorld(consequence, world);
      }
    }
  }

  Future<Null> _applySelected(
      Action action, Actor actor, Storyline storyline) async {
    var consequences =
        action.apply(actor, consequence, world, _pubsub).toList();

    if (actor.isPlayer) {
      await _applyPlayerAction(action, actor, consequences);
    } else {
      int index =
          Randomly.chooseWeighted(consequences.map((c) => c.probability));
      consequence = consequences[index];
    }

    storyline.concatenate(consequence.storyline);
    world = consequence.world;

    log.fine(() => "${actor.name} selected ${action.name}");
    log.finest(() {
      String path = world.actionRecords.map((a) => a.description).join(' <- ');
      return "- how ${actor.name} got here: $path";
    });
  }
}
