import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class FinishPunch extends OtherActorAction {
  static final FinishPunch singleton = FinishPunch();

  static const String className = "FinishPunch";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = false;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = false;

  @override
  String get commandTemplate => null;

  @override
  String get name => className;

  @override
  Resource get rerollResource => null;

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
    assert(!enemy.isOnGround, "Can't punch people on the ground.");
    final updatedPose =
        enemy.pose >= Pose.standing ? Pose.offBalance : Pose.onGround;
    final thread = getThreadId(sim, w, "PunchSituation");
    final groundMaterial = getGroundMaterial(w);
    w.updateActorById(enemy.id, (b) => b..pose = updatedPose);
    switch (updatedPose) {
      case Pose.standing:
        throw StateError("Enemy's pose should never be 'standing' after "
            "a successful punch");
      case Pose.offBalance:
        s.add(
            "<subject> {punch<es> <object> in the {face|nose|eye|jaw}|"
            "punch<es> <object's> {face|nose|eye|jaw}}",
            subject: a,
            object: enemy,
            actionThread: thread,
            positive: true);
        enemy.report(s, "<subject> {stagger<s>|stumble<s>} off balance",
            negative: true);
        break;
      case Pose.onGround:
        s.add(
            "<subject> send<s> <object> to the $groundMaterial with "
            "a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",
            subject: a,
            object: enemy,
            actionThread: thread,
            positive: true);
        w.recordCustom(fellToGroundCustomEventName, actor: enemy);
        break;
    }
    return "${a.name} punches ${enemy.name} to $updatedPose";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) => true;
}
