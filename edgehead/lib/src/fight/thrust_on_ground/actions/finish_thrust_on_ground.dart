import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_thrusting_damage.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/apply_thrust.dart';
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
    assert(a.isOnGround);
    assert(a.currentWeaponOrBodyPart != null);

    final designation = enemy.isOnGround
        ? BodyPartDesignation.torso
        : w.randomChoose([
            BodyPartDesignation.leftLeg,
            BodyPartDesignation.rightLeg,
          ]);
    final result =
        executeThrustingHit(enemy, a.currentWeaponOrBodyPart, designation);

    w.updateActorById(enemy.id, (b) => b.replace(result.victim));

    final thread = getThreadId(sim, w, thrustOnGroundSituationName);
    applyThrust(result, context, enemy, thread);

    return "${a.name} thrusts ${enemy.name} while on the ground ($result)";
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
