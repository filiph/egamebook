import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';

OtherActorAction finishLeapBuilder(Actor enemy) => new FinishLeap(enemy);

class FinishLeap extends OtherActorAction {
  static const String className = "FinishLeap";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  FinishLeap(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => null;

  @override
  String get name => className;

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
    w.updateActorById(target.id, (b) => b..pose = Pose.onGround);
    final updatedEnemy = w.getActorById(target.id);
    w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
    final thread = getThreadId(sim, w, "LeapSituation");
    final ground = getGroundMaterial(w);
    a.report(s, "<subject> {ram<s>|smash<es>} into <object>",
        object: target, positive: true, actionThread: thread);
    s.add(
        "both ${a.isPlayer || target.isPlayer ? 'of you' : ''} "
        "{land on|fall to} the $ground",
        actionThread: thread);
    if (target.hitpoints > 1) {
      s.add(
          "the impact almost "
          "{knocks <object> unconscious|knocks <object> out}",
          object: target,
          actionThread: thread);
      final damage = 1;
      reportPain(context, updatedEnemy, damage);
      w.updateActorById(target.id, (b) => b..hitpoints -= damage);
    }
    return "${a.name} finishes leap at ${target.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) => true;
}
