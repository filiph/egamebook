import 'package:edgehead/edgehead_lib.dart' show brianaId;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';

class OffBalanceOpportunityThrust extends EnemyTargetAction {
  static const String className = "OffBalanceOpportunityThrust";

  @override
  final String helpMessage = "When an opponent is out of balance they are the "
      "most vulnerable.";

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  OffBalanceOpportunityThrust(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "stab <object>";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> hit <objectPronoun>?";

  @override
  String applyFailure(ActionContext context) {
    Actor a = context.actor;
    Storyline s = context.storyline;
    a.report(s, "<subject> tr<ies> to stab <object>", object: enemy);
    a.report(s, "<subject> {go<es> wide|fail<s>|miss<es>}", but: true);
    return "${a.name} fails to stab ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    WorldState w = context.world;
    Storyline s = context.storyline;
    final damage = a.currentWeapon.thrustingDamage;
    w.updateActorById(
        enemy.id, (b) => b..hitpoints -= damage);
    final updatedEnemy = w.getActorById(enemy.id);
    bool killed = !updatedEnemy.isAlive && updatedEnemy.id != brianaId;
    if (!killed) {
      a.report(
          s,
          "<subject> thrust<s> {|${weaponAsObject2(a)}} "
          "deep into <object's> {shoulder|hip|thigh}",
          object: updatedEnemy,
          positive: true);
      reportPain(context, updatedEnemy, damage);
    } else {
      a.report(
          s,
          "<subject> {stab<s>|"
          "run<s> ${weaponAsObject2(a)} through} <object>",
          object: updatedEnemy,
          positive: true);
      killHumanoid(context, updatedEnemy);
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
      a.isStanding && enemy.isOffBalance && a.currentWeapon.isThrusting;

  static EnemyTargetAction builder(Actor enemy) =>
      new OffBalanceOpportunityThrust(enemy);
}
