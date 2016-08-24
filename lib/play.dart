import 'dart:io';

import 'package:built_collection/built_collection.dart';

import 'package:stranded/actor.dart';
import 'package:stranded/world.dart';
import 'package:stranded/planner.dart';
import 'package:stranded/action.dart';
import 'package:stranded/item.dart';
import 'package:stranded/plan_consequence.dart';
import 'package:stranded/team.dart';
import 'package:stranded/situation.dart';
import 'package:stranded/storyline/randomly.dart';
import 'package:stranded/storyline/storyline.dart';

import 'src/fight/fight_situation.dart';

main() async {
  var filip = new Actor((b) => b
    ..id = 1
    ..isPlayer = true
    ..pronoun = Pronoun.YOU
    ..name = "Filip"
    ..currentWeapon = new Sword()
    ..initiative = 1000);
  var briana = new Actor((b) => b
    ..id = 100
    ..pronoun = Pronoun.SHE
    ..name = "Briana"
    ..currentWeapon = new Sword("longsword"));
//  var brant = new Actor((b) => b
//    ..id = 500
//    ..pronoun = Pronoun.HE
//    ..name = "Brant"
//    ..currentWeapon = new Sword());

  var orc = new Actor((b) => b
    ..id = 1000
    ..name = "orc"
    ..nameIsProperNoun = false
    ..pronoun = Pronoun.HE
    ..currentWeapon = new Sword("scimitar")
    ..team = defaultEnemyTeam);

  var goblin = new Actor((b) => b
    ..id = 1001
    ..name = "goblin"
    ..nameIsProperNoun = false
    ..pronoun = Pronoun.HE
    ..currentWeapon = new Sword()
    ..team = defaultEnemyTeam);

  var initialSituation = new Situation.withState(new FightSituation((b) => b
    ..playerTeamIds = new BuiltList<int>([filip.id, briana.id])
    ..enemyTeamIds = new BuiltList<int>([orc.id, goblin.id])
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
    }));

  WorldState world = new WorldState(
      new Set.from([filip, briana, orc, goblin]), initialSituation);

//  world.validate();

  var consequence = new PlanConsequence.initial(world);
  var storyline = new Storyline();

  print("You and ${briana.name} sprint through the giant worm tunnel.\n");
  print("Suddenly, an **orc** and a **goblin** jump at you "
      "from a slimy crevice, swords in hand.");

  while (world.situations.isNotEmpty) {
    var situation = world.currentSituation;
    var actor = situation.state.getCurrentActor(world);

    var planner = new ActorPlanner(actor, world);
    await planner.plan(maxOrder: 7);
    var recs = planner.getRecommendations();
    if (recs.isEmpty) {
      // Hacky. Not sure this will work. Try to always have some action to do.
      world.updateSituationById(
          situation.id, (b) => b.state = b.state.elapseTime());
      world.time += 1;
      continue;
    }

    ActorAction selected;
    if (actor.isPlayer) {
      // Player
      if (recs.actions.length == 1) {
        // Only one option, select by default.
        selected = recs.actions.single;
      } else {
        print(storyline.realize());
        storyline.clear();

        planner.generateTable().forEach(print);
        int option = int.parse(stdin.readLineSync());
        selected = planner.firstActionScores.keys.toList()[option];
      }
    } else {
      selected = recs.actions[Randomly.chooseWeightedPrecise(recs.weights,
          max: PlannerRecommendation.weightsResolution)];
    }
    var consequences = selected.apply(actor, consequence, world).toList();
    int index = Randomly
        .chooseWeighted(consequences.map/*<num>*/((c) => c.probability));
    consequence = consequences[index];
    storyline.concatenate(consequence.storyline);
    world = consequence.world;
  }
  print(storyline.realize());

  if (world.getActorById(filip.id).isAlive) {
    print("You start sprinting again.");
  } else {
    print("You will soon be the giant worm's food.");
  }
}
