import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_thrusting_damage.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/apply_thrust.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/thrust/thrust_situation.dart';

class FinishThrust extends OtherActorAction {
  static final FinishThrust singleton = FinishThrust();

  static const String className = "FinishThrust";

  @override
  final String? helpMessage = null;

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
    final situation = context.world.currentSituation as AttackerSituation;
    assert(situation.name == thrustSituationName);
    assert(situation.attackDirection != AttackDirection.fromLeft &&
        situation.attackDirection != AttackDirection.fromRight);
    assert(a.currentWeaponOrBodyPart != null);

    final result = executeThrustingHit(enemy, a.currentWeaponOrBodyPart!,
        situation.attackDirection.toBodyPartDesignation());

    final thread = getThreadId(sim, w, thrustSituationName);
    applyThrust(result, context, enemy, thread);

    return "${a.name} thrusts at ${enemy.name} ($result)";
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
