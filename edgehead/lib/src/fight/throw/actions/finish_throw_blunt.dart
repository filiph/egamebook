import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/fall.dart';
import 'package:edgehead/src/fight/throw/move_projectile_to_ground.dart';

class FinishThrowBlunt extends OtherActorAction {
  static final FinishThrowBlunt singleton = FinishThrowBlunt();

  static const String className = "FinishThrowBlunt";

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
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final projectile = a.currentWeapon!;
    assert(projectile.damageCapability.isBlunt);

    final bodyPart =
        enemy.anatomy.pickRandomBodyPartFromFront(w.randomInt, false);
    projectile.report(
        s,
        "<subject> {hit<s>|strike<s>} "
        "<objectOwner's> <object>",
        owner: a,
        objectOwner: enemy,
        object: bodyPart,
        positive: true);
    enemy.report(
        s,
        "<subject> "
        "{step<s> back|take<s> two steps back|falter<s>|waver<s>}",
        negative: true);

    if (enemy.pose > Pose.offBalance) {
      enemy.report(s, "<subject> barely keep<s> <subject's> {balance|footing}",
          negative: true);
      w.updateActorById(enemy.id, (b) => b.pose = Pose.offBalance);
    } else {
      enemy.report(s, "<subject> <is> knocked to the ground", negative: true);
      makeActorFall(context.world, w, s, enemy);
    }

    moveProjectileToGround(w, a, projectile, false);
    return "${a.name} hits ${enemy.name} with a blunt weapon";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      a.currentWeapon!.damageCapability.isBlunt;
}
