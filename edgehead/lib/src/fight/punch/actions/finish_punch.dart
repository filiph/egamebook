import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/fall.dart';
import 'package:edgehead/src/fight/common/recently_lost_stance.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/punch/punch_situation.dart';

class FinishPunch extends OtherActorAction {
  static final FinishPunch singleton = FinishPunch();

  static const String className = "FinishPunch";

  @override
  final String? helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = false;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = false;

  @override
  List<String> get commandPathTemplate => const [];

  @override
  String get name => className;

  @override
  Resource? get rerollResource => null;

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
    final thread = getThreadId(sim, w, punchSituationName);
    final groundMaterial = getGroundMaterial(w);
    w.updateActorById(enemy.id, (b) => b..pose = updatedPose);
    w.recordCustom(lostStanceCustomEvent, actor: enemy);
    switch (updatedPose) {
      case Pose.extended:
      case Pose.standing:
      case Pose.combat:
        throw StateError("Enemy's pose should never be $updatedPose after "
            "a successful punch");
      case Pose.offBalance:
        const string =
            "<subject> {punch<es> <object> in the {face|nose|eye|jaw}|"
            "punch<es> <object's> {face|nose|eye|jaw}}";
        s.add(string,
            subject: a, object: enemy, actionThread: thread, positive: true);
        enemy.report(s, "<subject> {stagger<s>|stumble<s>} off balance",
            actionThread: thread, negative: true);
        // Summary
        s.add(string,
            subject: a,
            object: enemy,
            actionThread: thread,
            replacesThread: true,
            positive: true);
        enemy.report(s, "<subject> {stagger<s>|stumble<s>} off balance",
            actionThread: thread, replacesThread: true, negative: true);
      case Pose.onGround:
        s.add(
            "<subject> send<s> <object> to the $groundMaterial with "
            "a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",
            subject: a,
            object: enemy,
            actionThread: thread,
            positive: true);
        // This repeats the b.pose = Pose.onGround line, but also
        // adds standard falling functionality, like reminding player
        // about lying down being bad.
        makeActorFall(context.world, w, s, enemy);
    }
    return "${a.name} punches ${enemy.name} to $updatedPose";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      true;
}
