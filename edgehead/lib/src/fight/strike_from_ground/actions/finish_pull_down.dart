import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/strike_from_ground/strike_from_ground_situation.dart';

class FinishPullDown extends OtherActorAction {
  static final FinishPullDown singleton = FinishPullDown();

  static const String className = "FinishPullDown";

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
  String applyFailure(_, __) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Simulation sim = context.simulation;
    Storyline s = context.outputStoryline;

    final groundMaterial = getGroundMaterial(w);
    final thread = getThreadId(sim, w, strikeFromGroundSituationName);
    a.report(s, '<subject> grab<s> <object> by the legs',
        object: enemy, positive: true, actionThread: thread);
    a.report(
        s, '<subject> pull<s> <object> down to the {ground|$groundMaterial}',
        object: enemy, positive: true, actionThread: thread);

    // Thread replacement.
    a.report(s, '<subject> crawl<s> over to <object>',
        object: enemy,
        positive: true,
        actionThread: thread,
        replacesThread: true);
    a.report(
        s, '<subject> pull<s> <object> down to the {ground|$groundMaterial}',
        object: enemy,
        positive: true,
        actionThread: thread,
        replacesThread: true);

    w.updateActorById(enemy.id, (b) => b..pose = Pose.onGround);

    return "${a.name} pulls ${enemy.name} down to the ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      enemy.pose > Pose.onGround;
}
