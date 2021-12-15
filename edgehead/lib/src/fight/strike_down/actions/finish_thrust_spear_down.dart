import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';

class FinishThrustAtGroundedEnemy extends OtherActorAction {
  static final FinishThrustAtGroundedEnemy singleton =
      FinishThrustAtGroundedEnemy();

  static const String className = "FinishThrustSpearAtGroundedEnemy";

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
  String applyFailure(_, __) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final damage = enemy.isInvincible ? enemy.hitpoints - 1 : enemy.hitpoints;
    w.updateActorById(enemy.id, (b) => b.hitpoints = b.hitpoints! - damage);
    final updatedEnemy = w.getActorById(enemy.id);
    // TODO: actually decide which body part to hit
    var bodyPart = enemy.isInvincible ? 'side' : '{throat|neck|heart}';
    s.add(
        "<subject> {impale<s>|bore<s> through|pierce<s>} "
        "<object's> $bodyPart",
        subject: a.currentWeapon,
        object: updatedEnemy);
    if (enemy.isInvincible) {
      inflictPain(context, enemy.id, damage,
          enemy.anatomy.findByDesignation(BodyPartDesignation.neck)!);
    } else {
      killHumanoid(context, enemy.id);
    }
    return "${a.name} slains ${enemy.name} on the ground with a spear";
  }

  /// All action takes place in the OnGroundDefenseSituation.
  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      enemy.isOnGround &&
      (a.currentWeapon?.damageCapability.isThrusting ?? false);
}
