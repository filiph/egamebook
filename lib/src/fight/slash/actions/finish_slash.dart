import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_damage.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:edgehead/writers_helpers.dart' show brianaId, orcthorn;

OtherActorAction finishSlashBuilder(Actor enemy) => new FinishSlash(enemy);

class FinishSlash extends OtherActorAction {
  static const String className = "FinishSlash";

  /// The default severity of the slash that is dealt. Can be upgraded
  /// or downgraded depending on specific rules.
  static final _defaultSlashSuccessLevel = SlashSuccessLevel.majorCut;

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  FinishSlash(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => null;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(ActionContext context) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final damage = a.currentWeapon.damageCapability.slashingDamage;
    final situation = context.world.currentSituation as AttackerSituation;
    assert(situation.name == slashSituationName);

    SlashingResult result;
    if (situation.attackDirection == AttackDirection.fromLeft ||
        situation.attackDirection == AttackDirection.fromRight) {
      // Just the general direction was given.
      result = _executeFromDirection(
          situation, situation.attackDirection, a, w.randomInt);
    } else {
      // This attack targets a specific body part.
      result = _executeAtDesignation(
          situation, situation.attackDirection, a, w.randomInt);
    }

    w.actors.removeWhere((actor) => actor.id == target.id);
    w.actors.add(result.actor);
    final thread = getThreadId(sim, w, slashSituationName);
    // TODO: revert kill if it's briana.
    bool killed = !result.actor.isAlive && result.actor.id != brianaId;
    if (!killed) {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} <object's> "
          "${result.slashedPart.randomDesignation}",
          object: result.actor,
          positive: true,
          actionThread: thread);
      if (result.fell) {
        result.actor.report(s, "<subject> fall<s> {|down|to the ground}",
            negative: true, actionThread: thread);
      }
      reportPain(context, result.actor, damage);
    } else {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} "
          "{across|through} <object's> "
          "${result.slashedPart.randomDesignation}",
          object: result.actor,
          positive: true,
          actionThread: thread);
      if (a.currentWeapon.name == orcthorn.name &&
          target.name.contains('orc')) {
        a.currentWeapon.report(
            s, "<subject> slit<s> through the flesh like it isn't there.",
            wholeSentence: true);
      }
      killHumanoid(context, result.actor);
    }
    return "${a.name} slashes${killed ? ' (and kills)' : ''} ${target.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) =>
      a.currentWeapon.damageCapability.isSlashing;

  SlashingResult _executeAtDesignation(AttackerSituation situation,
      AttackDirection direction, Actor attacker, RandomIntGetter randomGetter) {
    final designation = _convert(direction);
    return executeSlashingHit(
        target, attacker.currentWeapon, _defaultSlashSuccessLevel,
        designation: designation);
  }

  BodyPartDesignation _convert(AttackDirection direction) {
    assert(
        direction != AttackDirection.fromRight &&
            direction != AttackDirection.fromLeft,
        "This method only supports specific body targets.");

    switch (direction) {
      case AttackDirection.primaryArm:
        return BodyPartDesignation.primaryArm;
      case AttackDirection.secondaryArm:
        return BodyPartDesignation.secondaryArm;
      case AttackDirection.leftLeg:
        return BodyPartDesignation.leftLeg;
      case AttackDirection.rightLeg:
        return BodyPartDesignation.rightLeg;
      case AttackDirection.neck:
        return BodyPartDesignation.neck;
    }

    throw new ArgumentError("Cannot convert $direction, it's missing in "
        "the switch statement above");
  }

  SlashingResult _executeFromDirection(AttackerSituation situation,
      AttackDirection direction, Actor attacker, RandomIntGetter randomGetter) {
    final slashDirection = situation.attackDirection == AttackDirection.fromLeft
        ? SlashDirection.left
        : SlashDirection.right;
    return executeSlashingHitFromDirection(target, slashDirection,
        attacker.currentWeapon, _defaultSlashSuccessLevel, randomGetter);
  }
}
