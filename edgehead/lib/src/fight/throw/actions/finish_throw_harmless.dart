import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/throw/move_projectile_to_ground.dart';

class FinishThrowHarmless extends OtherActorAction {
  static final FinishThrowHarmless singleton = FinishThrowHarmless();

  static const String className = "FinishThrowHarmless";

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
    assert(projectile.damageCapability.isHarmless);
    final groundMaterial = getGroundMaterial(w);

    final bodyPart =
        enemy.anatomy.pickRandomBodyPartFromFront(w.randomInt, false);
    projectile.report(
        s,
        "<subject> {hit<s>|land<s> on} "
        "<objectOwner's> <object>",
        owner: a,
        objectOwner: enemy,
        object: bodyPart,
        positive: true);
    projectile.report(
        s,
        '<subject> {fall<s>|drop<s>} to the {ground|$groundMaterial} '
        'uselessly');

    moveProjectileToGround(w, a, projectile, false);
    return "${a.name} hits ${enemy.name} with a harmless projectile";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      a.currentWeapon!.damageCapability.isHarmless;
}
