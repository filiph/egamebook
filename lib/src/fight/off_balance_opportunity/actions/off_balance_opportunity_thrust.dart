import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';
import 'package:edgehead/writers_helpers.dart';

ReasonedSuccessChance computeOpportunityThrust(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.4, [
    const Bonus(20, CombatReason.dexterity),
    const Bonus(20, CombatReason.targetWithoutShield),
    const Bonus(20, CombatReason.balance),
  ]);
}

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
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> tr<ies> to stab <object>", object: enemy);
    a.report(s, "<subject> {go<es> wide|fail<s>|miss<es>}", but: true);
    return "${a.name} fails to stab ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final damage = a.currentWeapon.damageCapability.thrustingDamage;
    w.updateActorById(enemy.id, (b) => b..hitpoints -= damage);
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
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w) {
    return computeOpportunityThrust(a, sim, w, enemy);
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) =>
      a.isStanding &&
      enemy.isOffBalance &&
      a.currentWeapon.damageCapability.isThrusting;

  static EnemyTargetAction builder(Actor enemy) =>
      new OffBalanceOpportunityThrust(enemy);
}
