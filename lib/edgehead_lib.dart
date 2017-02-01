import 'dart:async';

import 'package:slot_machine/result.dart' as slot;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
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
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:logging/logging.dart';

/// Lesser self-worth than normal scoring function as monsters should
/// kind of carelessly attack to make fights more action-packed.
num carelessScoringFunction(Actor monster, WorldState world) {
  int score = 0;

  var friends = world.actors.where((a) => a.team == monster.team);
  score += friends.fold(0, (sum, a) => sum + a.hitpoints);

  score -= world.actors
      .fold<num>(
          0, (sum, a) => sum + monster.hateTowards(a, world) * a.hitpoints)
      .round();

  return score;
}

class EdgeheadGame extends LoopedEvent {
  static const int maxChoicesCount = 5;

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

  EdgeheadGame(
      StringTakingVoidFunction echo,
      StringTakingVoidFunction goto,
      choices,
      ChoiceFunction choiceFunction,
      SlotMachineShowFunction slotMachineShowFunction,
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
      ..team = defaultEnemyTeam
      ..worldScoringFunction = carelessScoringFunction);

    goblin = new Actor((b) => b
      ..id = 1001
      ..name = "goblin"
      ..nameIsProperNoun = false
      ..pronoun = Pronoun.HE
      ..currentWeapon = new Sword("scimitar")
      ..team = defaultEnemyTeam
      ..worldScoringFunction = carelessScoringFunction);

    deadEscapee = new Room(
        "deadEscapee",
        "UNUSED because this is the first choice",
        "",
        null,
        null,
        [new Exit("tunnel", "Run towards freedom")]);
    tunnel = new Room("tunnel", "You run and see a goblin and an orc.", "",
        (_) => [orc, goblin], null, [new Exit(endOfRoam.name, "End book")],
        groundMaterial: "{rock|cavern} floor");

    filip = new Actor((b) => b
      ..id = 1
      ..isPlayer = true
      ..pronoun = Pronoun.YOU
      ..name = "Filip"
      ..currentWeapon = new Sword()
      ..hitpoints = 2
      ..initiative = 1000
      ..currentRoomName = deadEscapee.name);

    briana = new Actor((b) => b
      ..id = 100
      ..pronoun = Pronoun.SHE
      ..name = "Briana"
      ..currentWeapon = new Sword("longsword")
      ..hitpoints = 2
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
        selected = recs.actions.single; // TODO
        _applySelected(selected, actor, storyline);
        return;
      }
      echo(storyline.realize());
      storyline.clear();

      log.fine("planner.generateTable for ${actor.name}");
      planner.generateTable().forEach((line) => log.fine(line));

      // Take only the first few best actions.
      List<Action> actions = new List.from(recs.actions.take(maxChoicesCount));
      actions.sort((a, b) => a.name.compareTo(b.name));
      for (Action action in actions) {
        choiceFunction(action.name, helpMessage: action.helpMessage,
            script: () {
          _applySelected(action, actor, storyline);
        });
      }
      return;
    } else {
      // TODO - if more than one action, remove the one that was just made
      // also rename to something else
      selected = recs.actions[Randomly.chooseWeightedPrecise(recs.weights,
          max: PlannerRecommendation.weightsResolution)];
      _applySelected(selected, actor, storyline);
    }

    storyline.outputFinishedParagraphs(echo);
  }

  void _applySelected(Action action, Actor actor, Storyline storyline) {
    var consequences = action.apply(actor, consequence, world).toList();
    int index = Randomly.chooseWeighted(consequences.map((c) => c.probability));
    consequence = consequences[index];

    if (actor.isPlayer) {
      double chance = action.getSuccessChance(actor, world);
      if (chance < 1.0) {
        showSlotMachine(
            chance,
            consequence.isSuccess ? slot.Result.success : slot.Result.failure,
            action.getRollReason(actor, world));
      }
    }

    storyline.concatenate(consequence.storyline);
    world = consequence.world;
  }
}
