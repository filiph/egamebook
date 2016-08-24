import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/world.dart';
import 'package:stranded/situation.dart';
import 'package:stranded/storyline/storyline.dart';

import 'off_balance_opportunity_situation.dart';
import 'package:stranded/team.dart';
import 'package:stranded/storyline/randomly.dart';

var kickOffBalance = new EnemyTargetActionGenerator("kick <object>",
    valid: (Actor a, enemy, w) =>
        a.pose == Pose.standing && enemy.pose == Pose.standing,
    chance: 0.5, success: (a, enemy, WorldState w, Storyline s) {
  Randomly.run(() {
    a.report(s, "<subject> kick<s> <object>", object: enemy);
    if (Randomly.tossCoin()) {
      enemy.report(s, "<subject> flail<s> <subject's> arms");
    }
    enemy.report(s, "<subject> fall<s>{| to the ground}", negative: true);
  }, () {
    a.report(s, "<subject> kick<s> <object> off <object's> feet",
        object: enemy, positive: true);
    if (enemy.isPlayer) {
      enemy.report(s, "<subject> land<s> on the ground", negative: true);
    }
  });

  w.updateActorById(enemy.id, (b) => b..pose = Pose.onGround);
  return "${a.name} kicks ${enemy.name} to the ground";
}, failure: (a, enemy, w, s) {
  a.report(s, "<subject> kick<s> <object>", object: enemy);
  if (a.isPlayer) {
    enemy.report(s, "<subject> lose<s> <object>",
        object: balance, negative: true);
  }
  w.updateActorById(enemy.id, (b) => b..pose = Pose.offBalance);
  var situation =
      new Situation.withState(new OffBalanceOpportunitySituation((b) => b
        ..actorId = enemy.id
        ..culpritId = a.id));
  w.pushSituation(situation);
  return "${a.name} kicks ${enemy.name} off balance";
});

final balance =
    new Entity(name: "balance", team: neutralTeam, nameIsProperNoun: true);
