import 'dart:async';

import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/looped_event/looped_event.dart';
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
import 'package:egamebook/stat/stat.dart';
import 'package:logging/logging.dart';

/// Lesser self-worth than normal combine function as monsters should
/// kind of carelessly attack to make fights more action-packed.
num carelessCombineFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation - 2 * scoreChange.enemy;

num normalCombineFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation +
    scoreChange.teamPreservation -
    scoreChange.enemy;

class EdgeheadGame extends LoopedEvent {
  static const int maxChoicesCount = 6;

  final Logger log = new Logger('EdgeheadGame');

  /// When we hit an action whose [Action.name] matches this pattern,
  /// we'll drop from automatic playthrough.
  ///
  /// This field exist in order to allow skipping to an action, as a way of
  /// play-testing.
  final Pattern actionPattern;

  bool actionPatternWasHit = false;

  Actor filip;
  Actor briana;
  Actor orc;
  Actor goblin;

  Room preStartBook;
  Room deadEscapee;
  Room tunnel;

  Situation initialSituation;
  WorldState world;
  PlanConsequence consequence;

  Storyline storyline = new Storyline();

  final Stat<double> hitpoints;
  final Stat<int> stamina;
  final Stat<int> gold;

  EdgeheadGame(
      StringTakingVoidFunction echo,
      StringTakingVoidFunction goto,
      choices,
      ChoiceFunction choiceFunction,
      SlotMachineShowFunction slotMachineShowFunction,
      this.hitpoints,
      this.stamina,
      this.gold,
      {this.actionPattern})
      : super(echo, goto, choices, choiceFunction, slotMachineShowFunction) {
    setup();
  }

  void setup() {
    orc = new Actor((b) => b
      ..id = 1000
      ..name = "orc"
      ..nameIsProperNoun = false
      ..pronoun = Pronoun.HE
      ..currentWeapon = new Sword()
      ..hitpoints = 2
      ..maxHitpoints = 2
      ..team = defaultEnemyTeam
      ..combineFunction = carelessCombineFunction);

    goblin = new Actor((b) => b
      ..id = 1001
      ..name = "goblin"
      ..nameIsProperNoun = false
      ..pronoun = Pronoun.HE
      ..currentWeapon = new Sword("scimitar")
      ..team = defaultEnemyTeam
      ..combineFunction = carelessCombineFunction);

    preStartBook = new Room(
        "preStartBook",
        (a, w, s) => s.add("UNUSED because this is the first choice",
            wholeSentence: true),
        (a, w, s) => throw new StateError("Room isn't to be revisited"),
        null,
        null,
        [new Exit("start_of_book", "", "")]);
    deadEscapee = new Room(
        "deadEscapee",
        (a, w, s) => s.add("UNUSED because this is the first choice",
            wholeSentence: true),
        (a, w, s) => throw new StateError("Room isn't to be revisited"),
        null,
        null,
        [
          new Exit("tunnel", "Run towards freedom",
              "You and Briana sprint through the giant worm’s tunnel.")
        ]);
    tunnel = new Room(
        "tunnel",
        (a, w, s) => s.add(
            "Suddenly, an **orc** and a **goblin** jump in front of you from "
            "a slimy crevice, swords in hands.\n\n"
            "![Orc and Goblin](img/orc_and_goblin_sketch.jpg)",
            wholeSentence: true),
        (a, w, s) => throw new StateError("Room isn't to be revisited"),
        (_) => [orc, goblin],
        null,
        [
          new Exit(entranceToBloodrock.name, "Start running again",
              "You finally arrive to the cave's entrance.")
        ],
        groundMaterial: "{rock|cavern} floor");

    filip = new Actor((b) => b
      ..id = 1
      ..isPlayer = true
      ..pronoun = Pronoun.YOU
      ..name = "Filip"
      ..currentWeapon = new Sword()
      ..hitpoints = 2
      ..maxHitpoints = 2
      ..stamina = 1
      ..initiative = 1000
      ..currentRoomName = deadEscapee.name);

    hitpoints.value = filip.hitpoints / filip.maxHitpoints;
    stamina.value = filip.stamina;
    gold.value = filip.gold;

    briana = new Actor((b) => b
      ..id = 100
      ..pronoun = Pronoun.SHE
      ..name = "Briana"
      ..currentWeapon = new Sword("longsword")
      ..hitpoints = 2
      ..maxHitpoints = 2
      ..currentRoomName = deadEscapee.name
      ..followingActorId = filip.id);

    // TODO: make sure to re-use these events
    // new FightSituation.initialized([filip, briana], [orc, goblin])
    //     .rebuild((b) => b
    //   ..events[2] = (w, s) {
    //     s.addParagraph();
    //     s.add("You hear a horrible growling sound from behind.");
    //     s.add("The worm must be near.");
    //     s.addParagraph();
    //   }
    //   ..events[6] = (w, s) {
    //     s.addParagraph();
    //     s.add("The earth shatters and there's that sound again.");
    //     s.addParagraph();
    //   });

    initialSituation = new RoomRoamingSituation.initialized(
//        deadEscapee,
//        entranceToBloodrock,
        preStartBook,
        false);

    var rooms = new List<Room>.from(allRooms)
      ..addAll([preStartBook, deadEscapee, tunnel, endOfRoam]);

    var global = new EdgeheadGlobalState();

    world = new WorldState([filip, briana], rooms, initialSituation, global);

    consequence = new PlanConsequence.initial(world);
  }

  @override
  Future<Null> update() async {
    if (storyline.outputFinishedParagraphs(echo)) {
      // We had some paragraphs ready and sent them to [echo]. Let's return
      // to the outer loop so that we show the output before planning next
      // moves.
      return;
    }

    var currentPlayer = world.getActorById(filip.id);
    hitpoints.value = currentPlayer.hitpoints / currentPlayer.maxHitpoints;
    stamina.value = currentPlayer.stamina;
    gold.value = currentPlayer.gold;

    log.info("update() for world at time ${world.time}");
    if (world.situations.isEmpty) {
      finished = true;

      storyline.addParagraph();
      if (world.hasAliveActor(filip.id)) {
        storyline.add("TO BE CONTINUED.", wholeSentence: true);
      } else {
        storyline.add("You died.", wholeSentence: true);
      }
      echo(storyline.realize());

      return;
    }

    var situation = world.currentSituation;
    var actor = situation.getCurrentActor(world);

    var planner = new ActorPlanner(actor, world);
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
        for (var consequence in action.apply(actor, consequence, world)) {
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
        // auto-selected.
        for (var action in recs.actions) {
          assert(action.command.isNotEmpty);
        }
      }
      echo(storyline.realize());
      storyline.clear();

      log.fine("planner.generateTable for ${actor.name}");
      planner.generateTable().forEach((line) => log.fine(line));

      // Take only the first few best actions.
      List<Action> actions = recs
          .pickMax(maxChoicesCount, normalCombineFunction)
          .toList(growable: false);

      // Creates a string just for sorting. Actions with same enemy are
      // sorted next to each other.
      String sortingName(Action a) {
        if (a is EnemyTargetAction) {
          return "${a.enemy.name} ${a.command}";
        }
        return "ZZZZZZ ${a.command}";
      }

      actions.sort((a, b) => sortingName(a).compareTo(sortingName(b)));
      for (Action action in actions) {
        choiceFunction(action.command, helpMessage: action.helpMessage,
            script: () async {
          await _applySelected(action, actor, storyline);
        });
      }
      return;
    } else {
      // NPC
      // TODO - if more than one action, remove the one that was just made
      selected =
          recs.pickRandomly(actor.combineFunction ?? normalCombineFunction);
      await _applySelected(selected, actor, storyline);
    }

    storyline.outputFinishedParagraphs(echo);
  }

  Future<Null> _applySelected(
      Action action, Actor actor, Storyline storyline) async {
    var consequences = action.apply(actor, consequence, world).toList();

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

  Future _applyPlayerAction(
      Action action, Actor actor, List<PlanConsequence> consequences) async {
    double chance = action.getSuccessChance(actor, world);
    if (chance == 1.0) {
      consequence = consequences.single;
    } else if (chance == 0.0) {
      consequence = consequences.single;
    } else {
      var resourceName = action.rerollResource.toString().split('.').last;
      var result = await showSlotMachine(
          chance, action.getRollReason(actor, world),
          rerollEnabled:
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
}
