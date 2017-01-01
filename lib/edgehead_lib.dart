import 'dart:async';

import 'package:edgehead/src/fight/fight_situation.dart';

import 'fractal_stories/action.dart';
import 'fractal_stories/actor.dart';
import 'fractal_stories/item.dart';
import 'fractal_stories/looped_event/looped_event.dart';
import 'fractal_stories/plan_consequence.dart';
import 'fractal_stories/planner.dart';
import 'fractal_stories/situation.dart';
import 'fractal_stories/storyline/randomly.dart';
import 'fractal_stories/storyline/storyline.dart';
import 'fractal_stories/team.dart';
import 'fractal_stories/world.dart';
import 'package:logging/logging.dart';
// import 'dart:html';

/// Lesser self-worth than normal scoring function as monsters should
/// kind of carelessly attack to make fights more action-packed.
num carelessScoringFunction(Actor monster, WorldState world) {
  int score = 0;

  var friends = world.actors.where((a) => a.team == monster.team);
  score += friends.fold(0, (sum, a) => sum + a.hitpoints);

  var enemies = world.actors.where((a) => a.isEnemyOf(monster));
  score -= enemies.fold(0, (sum, a) => sum + a.hitpoints);

  return score;
}

class EdgeheadGame extends LoopedEvent {
  static const int maxChoicesCount = 4;

  final Logger log = new Logger('EdgeheadGame');

  Actor filip;
  Actor briana;
  Actor orc;
  Actor goblin;

  Situation initialSituation;
  WorldState world;
  PlanConsequence consequence;

  Storyline storyline = new Storyline();

  EdgeheadGame(StringTakingVoidFunction echo, StringTakingVoidFunction goto,
      choices, ChoiceFunction choiceFunction)
      : super(echo, goto, choices, choiceFunction) {
    setup();
  }

  void setup() {
    filip = new Actor((b) => b
      ..id = 1
      ..isPlayer = true
      ..pronoun = Pronoun.YOU
      ..name = "Filip"
      ..currentWeapon = new Sword()
      ..hitpoints = 2
      ..initiative = 1000);

    briana = new Actor((b) => b
      ..id = 100
      ..pronoun = Pronoun.SHE
      ..name = "Briana"
      ..currentWeapon = new Sword("longsword")
      ..hitpoints = 2);

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

    initialSituation =
        new FightSituation.initialized([filip, briana], [orc, goblin])
            .rebuild((b) => b
              ..events[2] = (w, s) {
                s.addParagraph();
                s.add("You hear a horrible growling sound from behind.");
                s.add("The worm must be near.");
                s.addParagraph();
              }
              ..events[6] = (w, s) {
                s.addParagraph();
                s.add("The earth shatters and there's that sound again.");
                s.addParagraph();
              });

    world = new WorldState(
        new Set.from([filip, briana, orc, goblin]), initialSituation);

    consequence = new PlanConsequence.initial(world);
  }

  @override
  Future<Null> update() async {
    if (world.situations.isEmpty) {
      finished = true;

      storyline.addParagraph();
      var player = world.getActorById(filip.id);
      if (player.isAlive) {
        storyline.add("<subject> look<s> behind", subject: player);
        storyline.add(
            "<subject> see<s> the giant worm's hideous head approaching",
            subject: player);
        if (world.getActorById(briana.id).isAlive) {
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
//    _choiceFunction("Do something", script: () => finished = true);

    var situation = world.currentSituation;
    var actor = situation.getCurrentActor(world);

    var planner = new ActorPlanner(actor, world);
    await planner.plan(
        // Unused because we're running in both command line and browser.
        // TODO: re-introduce
        //
        //   waitFunction: () async {
        //     await window.animationFrame;
        //   }
      waitFunction: () async {
        await new Future.delayed(const Duration(milliseconds: 2));
      }
    );
    var recs = planner.getRecommendations();
    if (recs.isEmpty) {
      // Hacky. Not sure this will work. Try to always have some action to do.
      // TODO: maybe this should remove the currentSituation from stack?
      world.elapseSituationTime(situation.id);
      world.time += 1;
      return;
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
//      XXX START HERE - if more than one action, remove the one that was just made
//      also rename to something else
      selected = recs.actions[Randomly.chooseWeightedPrecise(recs.weights,
          max: PlannerRecommendation.weightsResolution)];
      _applySelected(selected, actor, storyline);
    }

    if (storyline.hasManyParagraphs) {
      echo(storyline.realize(onlyFirstParagraph: true));
      storyline.removeFirstParagraph();
    }
  }

  void _applySelected(Action selected, Actor actor, Storyline storyline) {
    var consequences = selected.apply(actor, consequence, world).toList();
    int index = Randomly.chooseWeighted(consequences.map((c) => c.probability));
    consequence = consequences[index];
    storyline.concatenate(consequence.storyline);
    world = consequence.world;
  }
}
