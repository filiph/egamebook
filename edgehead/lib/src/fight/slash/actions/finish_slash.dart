import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_slashing_damage.dart';
import 'package:edgehead/fractal_stories/anatomy/weapon_assault_result.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:edgehead/writers_helpers.dart' show orcthorn;

class FinishSlash extends OtherActorAction {
  static final FinishSlash singleton = FinishSlash();

  static const String className = "FinishSlash";

  /// The default severity of the slash that is dealt. Can be upgraded
  /// or downgraded depending on specific rules.
  static const _defaultSlashSuccessLevel = SlashSuccessLevel.majorCut;

  @override
  final String helpMessage = null;

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
    Storyline s = context.outputStoryline;
    final damage = a.currentDamageCapability.slashingDamage;
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

    w.updateActorById(enemy.id, (b) => b.replace(result.victim));
    final thread = getThreadId(sim, w, slashSituationName);
    bool killed = !result.victim.isAlive && !result.victim.isInvincible;
    if (!killed) {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} <object's> "
          "${result.touchedPart.randomDesignation}",
          object: result.victim,
          positive: true,
          actionThread: thread);
      if (result.disabled &&
          (result.touchedPart.function == BodyPartFunction.damageDealing ||
              result.touchedPart.function == BodyPartFunction.mobile ||
              result.touchedPart.function == BodyPartFunction.wielding)) {
        result.touchedPart.report(s, "<subject> go<es> limp",
            negative: true, actionThread: thread);
      }
      if (result.willDropCurrentWeapon) {
        final weapon = dropCurrentWeapon(w, result.victim.id);
        result.victim.report(s, "<subject> drop<s> <object>",
            object: weapon, negative: true, actionThread: thread);
      }
      if (result.willFall) {
        result.victim.report(s, "<subject> fall<s> {|down|to the ground}",
            negative: true, actionThread: thread);
        w.updateActorById(result.victim.id, (b) => b.pose = Pose.onGround);
        w.recordCustom(fellToGroundCustomEventName, actor: result.victim);
      }
      inflictPain(context, result.victim.id, damage);
      if (result.wasBlinding) {
        result.victim.report(s, "<subject> <is> now blind", negative: true);
      }
    } else {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} "
          "{across|through} <object's> "
          "${result.touchedPart.randomDesignation}",
          object: result.victim,
          positive: true,
          actionThread: thread);
      if (a.currentWeapon?.id == orcthorn.id && enemy.name.contains('orc')) {
        a.currentWeapon.report(
            s, "<subject> slit<s> through the flesh like it isn't there.",
            wholeSentence: true);
      }
      killHumanoid(context, result.victim.id);
    }
    return "${a.name} slashes${killed ? ' (and kills)' : ''} ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      a.currentDamageCapability.isSlashing;

  WeaponAssaultResult _executeAtDesignation(
      AttackerSituation situation,
      AttackDirection direction,
      Actor attacker,
      Actor enemy,
      RandomIntGetter randomGetter) {
    final designation = direction.toBodyPartDesignation();
    assert(attacker.currentWeaponOrBodyPart != null);
    return executeSlashingHit(
        enemy, attacker.currentWeaponOrBodyPart, _defaultSlashSuccessLevel,
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
    return executeSlashingHitFromDirection(
        enemy,
        slashDirection,
        attacker.currentWeaponOrBodyPart,
        _defaultSlashSuccessLevel,
        randomGetter);
  }
}
