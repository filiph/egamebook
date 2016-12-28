import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/damage_reports.dart';

class OffBalanceOpportunityThrust extends EnemyTargetAction {
  OffBalanceOpportunityThrust(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "stab <object>";

  @override
  String applyFailure(Actor a, WorldState _, Storyline s) {
    a.report(s, "<subject> tr<ies> to stab <object>", object: enemy);
    a.report(s, "<subject> {go<es> wide|fail<s>|miss<es>}", but: true);
    return "${a.name} fails to stab ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    w.updateActorById(enemy.id, (b) => b..hitpoints -= 1);
    if (w.getActorById(enemy.id).isAlive) {
      a.report(
          s,
          "<subject> thrust<s> {|<subject's> ${a.currentWeapon.name}} "
          "deep into <object's> {shoulder|hip|thigh}",
          object: enemy,
          positive: true);
      reportPain(s, enemy);
    } else {
      a.report(
          s,
          "<subject> {stab<s>|"
          "run<s> <subject's> ${a.currentWeapon.name} through} <object>",
          object: enemy,
          positive: true);
      reportDeath(s, enemy);
    }
    return "${a.name} stabs ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    if (a.isPlayer) return 0.6;
    return 0.5;
  }

  @override
  bool isApplicable(Actor a, WorldState w) =>
      a.pose == Pose.standing &&
      enemy.pose == Pose.offBalance &&
      a.wields(ItemType.SWORD);

  static EnemyTargetAction builder(Actor enemy) =>
      new OffBalanceOpportunityThrust(enemy);
}
