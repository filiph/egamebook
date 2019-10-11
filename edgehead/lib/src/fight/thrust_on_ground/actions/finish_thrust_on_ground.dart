import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_thrusting_damage.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/thrust_on_ground/thrust_on_ground_situation.dart';

class FinishThrustOnGround extends OtherActorAction {
  static final FinishThrustOnGround singleton = FinishThrustOnGround();

  static const String className = "FinishThrustOnGround";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

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
    assert(a.currentWeaponOrBodyPart != null);
    final damage = a.currentDamageCapability.thrustingDamage;

    final result = executeThrustingHit(
        enemy, a.currentWeaponOrBodyPart, BodyPartDesignation.torso);

    w.updateActorById(enemy.id, (b) => b.replace(result.victim));

    final thread = getThreadId(sim, w, thrustOnGroundSituationName);
    bool killed = !result.victim.isAnimated && !result.victim.isInvincible;
    if (!killed) {
      a.report(
          s,
          "<subject> {pierce<s>|stab<s>|bore<s> through} <object's> "
          "${result.touchedPart.randomDesignation}",
          object: result.victim,
          positive: true,
          actionThread: thread);
      assert(!result.willDropCurrentWeapon,
          "Attacking torso shouldn't make enemy drop weapon.");
      assert(!result.willFall, "Enemy is already on the ground.");
      inflictPain(context, enemy.id, damage, result.touchedPart);
      assert(!result.wasBlinding, "Torso is not a vision body part.");
    } else {
      a.report(
          s,
          "<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} "
          "<object's> "
          "${result.touchedPart.randomDesignation}",
          object: result.victim,
          positive: true,
          actionThread: thread);
      killHumanoid(context, enemy.id);
    }
    return "${a.name} thrusts${killed ? ' (and kills)' : ''} ${enemy.name} "
        "while on the ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      a.currentDamageCapability.isThrusting;
}
