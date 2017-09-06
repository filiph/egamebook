import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class FinishPunch extends EnemyTargetAction {
  static const String className = "FinishPunch";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable = false;

  FinishPunch(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "";

  @override
  String get name => className;

  @override
  Resource get rerollResource => null;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    assert(!enemy.isOnGround, "Can't punch people on the ground.");
    final updatedPose = enemy.isStanding ? Pose.offBalance : Pose.onGround;
    final thread = getThreadId(w, "PunchSituation");
    final groundMaterial = getGroundMaterial(w);
    w.updateActorById(enemy.id, (b) => b..pose = updatedPose);
    switch (updatedPose) {
      case Pose.standing:
        throw new StateError("Enemy's pose should never be 'standing' after "
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
        break;
    }
    return "${a.name} punches ${enemy.name} to $updatedPose";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState w) => true;

  static EnemyTargetAction builder(Actor enemy) => new FinishPunch(enemy);
}
