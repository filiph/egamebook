import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world.dart';

import 'off_balance_opportunity_situation.dart';

final balance =
    new Entity(name: "balance", team: neutralTeam, nameIsProperNoun: true);

class Kick extends EnemyTargetAction {
  Kick(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "kick <object>";

  @override
  String helpMessage = "Kicking opponents doesn't deal much damage but it can "
      "put them off balance or even to the ground. Such opponents are much "
      "easier targets for you and your allies.";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
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
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
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
    return "${a.name} kicks ${enemy.name} to ground";
  }

  @override
  num getSuccessChance(Actor a, WorldState world) {
    num outOfBalancePenalty = a.pose == Pose.standing ? 0 : 0.2;
    if (a.isPlayer) return 0.7 - outOfBalancePenalty;
    return 0.5 - outOfBalancePenalty;
  }

  @override
  bool isApplicable(Actor a, WorldState world) => a.pose == Pose.standing;

  static EnemyTargetAction builder(Actor enemy) => new Kick(enemy);
}
