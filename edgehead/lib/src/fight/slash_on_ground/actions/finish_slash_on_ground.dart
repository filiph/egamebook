import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/decide_slashing_hit.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/apply_slash.dart';
import 'package:edgehead/src/fight/slash_on_ground/slash_on_ground_situation.dart';

class FinishSlashOnGround extends OtherActorAction {
  static final FinishSlashOnGround singleton = FinishSlashOnGround();

  static const String className = "FinishSlashOnGround";

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
    assert(a.currentWeaponOrBodyPart != null);

    final result = decideSlashingHit(
      enemy,
      a.currentWeaponOrBodyPart,
      w.randomInt,
      designation: w.randomChoose([
        BodyPartDesignation.torso,
        if (enemy.anatomy.primaryWeaponAppendageAvailable)
          BodyPartDesignation.primaryArm,
        if (enemy.anatomy.secondaryWeaponAppendageAvailable)
          BodyPartDesignation.secondaryArm,
        if (enemy.anatomy.hasHealthyLegs) ...[
          BodyPartDesignation.leftLeg,
          BodyPartDesignation.rightLeg
        ],
      ]),
    );

    final threadId = getThreadId(sim, w, slashOnGroundSituationName);
    applySlash(result, context, enemy, threadId);

    return "${a.name} slashes  ${enemy.name} while on the ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      a.currentDamageCapability.isSlashing;
}
