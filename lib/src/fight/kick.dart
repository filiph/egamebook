import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';

import 'off_balance_opportunity_situation.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';

var kickOffBalance = new EnemyTargetActionGenerator("kick <object>",
    valid: (Actor a, enemy, w) => a.pose == Pose.standing,
    chance: (a, enemy, w) {
  num outOfBalancePenalty = a.pose == Pose.standing ? 0 : 0.2;
  if (a.isPlayer) return 0.7 - outOfBalancePenalty;
  return 0.5 - outOfBalancePenalty;
}, success: (a, enemy, WorldState w, Storyline s) {
  if (enemy.pose == Pose.standing || enemy.pose == Pose.offBalance) {
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
  } else {
    a.report(s, "<subject> kick<s> <object> on the ground", object: enemy);
  }
  return "${a.name} kicks ${enemy.name}";
}, failure: (a, enemy, w, s) {
  a.report(s, "<subject> kick<s> <object>", object: enemy);
  if (enemy.pose == Pose.standing) {
    if (a.isPlayer) {
      enemy.report(s, "<subject> lose<s> <object>",
          object: balance, negative: true);
    }
    w.updateActorById(enemy.id, (b) => b..pose = Pose.offBalance);
  }

  if (w.getActorById(enemy.id).pose == Pose.offBalance) {
    var situation =
        new OffBalanceOpportunitySituation.initialized(enemy, culprit: a);
    w.pushSituation(situation);
  }
  return "${a.name} kicks ${enemy.name} off balance";
});

final balance =
    new Entity(name: "balance", team: neutralTeam, nameIsProperNoun: true);
