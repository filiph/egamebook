import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

OtherActorAction finishPunchBuilder(Actor enemy) => new FinishPunch(enemy);

class FinishPunch extends OtherActorAction {
  static const String className = "FinishPunch";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = false;

  FinishPunch(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => null;

  @override
  String get name => className;

  @override
  Resource get rerollResource => null;

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
    assert(!target.isOnGround, "Can't punch people on the ground.");
    final updatedPose = target.isStanding ? Pose.offBalance : Pose.onGround;
    final thread = getThreadId(sim, w, "PunchSituation");
    final groundMaterial = getGroundMaterial(w);
    w.updateActorById(target.id, (b) => b..pose = updatedPose);
    switch (updatedPose) {
      case Pose.standing:
        throw new StateError("Enemy's pose should never be 'standing' after "
            "a successful punch");
      case Pose.offBalance:
        s.add(
            "<subject> {punch<es> <object> in the {face|nose|eye|jaw}|"
            "punch<es> <object's> {face|nose|eye|jaw}}",
            subject: a,
            object: target,
            actionThread: thread,
            positive: true);
        target.report(s, "<subject> {stagger<s>|stumble<s>} off balance",
            negative: true);
        break;
      case Pose.onGround:
        s.add(
            "<subject> send<s> <object> to the $groundMaterial with "
            "a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",
            subject: a,
            object: target,
            actionThread: thread,
            positive: true);
        break;
    }
    return "${a.name} punches ${target.name} to $updatedPose";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) => true;
}
