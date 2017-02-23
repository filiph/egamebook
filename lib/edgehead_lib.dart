import 'dart:async';

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
import 'package:edgehead/generic_animation_frame/animation_frame.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
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

  Room deadEscapee;
  Room tunnel;

  Situation initialSituation;
  WorldState world;
  PlanConsequence consequence;

  Storyline storyline = new Storyline();

  final Stat<double> hitpoints;
  final Stat<int> stamina;

  EdgeheadGame(
      StringTakingVoidFunction echo,
      StringTakingVoidFunction goto,
      choices,
      ChoiceFunction choiceFunction,
      SlotMachineShowFunction slotMachineShowFunction,
      this.hitpoints,
      this.stamina,
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

    deadEscapee = new Room(
        "deadEscapee",
        "UNUSED because this is the first choice",
        "",
        null,
        null,
        [new Exit("tunnel", "Run towards freedom")]);
    tunnel = new Room(
        "tunnel",
        "You and Briana sprint through the giant worm’s tunnel.\n\n"
        "Suddenly, an **orc** and a **goblin** jump in front of you from "
        "a slimy crevice, swords in hands.\n\n"
        "![Orc and Goblin](img/orc_and_goblin_sketch.jpg)",
        "",
        (_) => [orc, goblin],
        null,
        [new Exit(endOfRoam.name, "End book")],
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

    initialSituation = new RoomRoamingSituation.initialized(deadEscapee);

    world = new WorldState(
        [filip, briana], [deadEscapee, tunnel, endOfRoam], initialSituation);

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

    log.info("update() for world at time ${world.time}");
    if (world.situations.isEmpty) {
      finished = true;

      storyline.addParagraph();
      if (world.hasAliveActor(filip.id)) {
        var player = world.getActorById(filip.id);
        storyline.add("<subject> look<s> behind", subject: player);
        storyline.add(
            "<subject> see<s> the giant worm's hideous head approaching",
            subject: player);
        if (world.hasAliveActor(briana.id)) {
          storyline.add("You both start sprinting again.", wholeSentence: true);
        } else {
          storyline.add("<subject> take<s> a last look at Briana",
              subject: player);
          storyline.add("<subject> start<s> sprinting again, alone",
              subject: player, endSentence: true);
        }
        storyline.addParagraph();
        storyline.add("TO BE CONTINUED.", wholeSentence: true);
      } else {
        storyline.add("You will soon be the giant worm's food.",
            wholeSentence: true);
      }
      echo(storyline.realize());

      return;
    }

    var situation = world.currentSituation;
    var actor = situation.getCurrentActor(world);

    var planner = new ActorPlanner(actor, world);
    await planner.plan(waitFunction: idleCallback);
    var recs = planner.getRecommendations();
    if (recs.isEmpty) {
      // Hacky. Not sure this will work. Try to always have some action to do.
      // TODO: maybe this should remove the currentSituation from stack?
      log.severe("No recommendation for ${actor.name}");
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
      if (recs.actions.length == 1) {
        // Only one option, select by default.
        selected = recs.actions.single;
        await _applySelected(selected, actor, storyline);
        return;
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
          return "${a.enemy.name} ${a.name}";
        }
        return "ZZZZZZ ${a.name}";
      }

      actions.sort((a, b) => sortingName(a).compareTo(sortingName(b)));
      for (Action action in actions) {
        START HERE: go to egamebook/.../html_presenter:380 and create a dialog with button elements above, and a close button
        String submenu;
        if (world.currentSituation is FightSituation) {
          if (action is EnemyTargetAction) {
            submenu = action.enemy.name;
          } else {
            submenu = "Other";
          }
        }
        choiceFunction(action.name,
            helpMessage: action.helpMessage,
            submenu: submenu, script: () async {
          await _applySelected(action, actor, storyline);
        });
      }
      return;
    } else {
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
          consequence =
              new PlanConsequence.withUpdatedWorld(consequence, world);
        }
      }
    } else {
      // Actor isn't player. Just play dice.
      int index =
          Randomly.chooseWeighted(consequences.map((c) => c.probability));
      consequence = consequences[index];
    }

    storyline.concatenate(consequence.storyline);
    world = consequence.world;
  }
}
