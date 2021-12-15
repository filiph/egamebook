import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/decide_slashing_hit.dart';
import 'package:edgehead/fractal_stories/anatomy/weapon_assault_result.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/apply_slash.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

class FinishSlash extends OtherActorAction {
  static final FinishSlash singleton = FinishSlash();

  static const String className = "FinishSlash";

  @override
  final String? helpMessage = null;

  @override
  final bool isAggressive = true;

  /// The action that initiated the slash might have been proactive, but
  /// the finish is just that, a finish.
  @override
  final bool isProactive = false;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const [];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;

    final situation = context.world.currentSituation as AttackerSituation;
    assert(situation.name == slashSituationName);

    WeaponAssaultResult result;
    if (situation.attackDirection == AttackDirection.fromLeft ||
        situation.attackDirection == AttackDirection.fromRight) {
      // Just the general direction was given.
      result = _executeFromDirection(
          situation, situation.attackDirection, a, enemy, w.randomInt);
    } else {
      // This attack targets a specific body part.
      result = _executeAtDesignation(
          situation, situation.attackDirection, a, enemy, w.randomInt);
    }

    final threadId = getThreadId(sim, w, slashSituationName);
    applySlash(result, context, enemy, threadId);

    return "${a.name} slashes ${enemy.name} ($result)";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      a.currentDamageCapability.isSlashing;

  WeaponAssaultResult _executeAtDesignation(
      AttackerSituation situation,
      AttackDirection direction,
      Actor attacker,
      Actor enemy,
      RandomIntGetter randomGetter) {
    final designation = direction.toBodyPartDesignation();
    assert(attacker.currentWeaponOrBodyPart != null);
    return decideSlashingHit(
        enemy, attacker.currentWeaponOrBodyPart!, randomGetter,
        designation: designation);
  }

  WeaponAssaultResult _executeFromDirection(
      AttackerSituation situation,
      AttackDirection direction,
      Actor attacker,
      Actor enemy,
      RandomIntGetter randomGetter) {
    final slashDirection = situation.attackDirection == AttackDirection.fromLeft
        ? SlashDirection.left
        : SlashDirection.right;
    assert(attacker.currentWeaponOrBodyPart != null);
    return decideSlashingHitFromDirection(
        enemy, slashDirection, attacker.currentWeaponOrBodyPart!, randomGetter);
  }
}
