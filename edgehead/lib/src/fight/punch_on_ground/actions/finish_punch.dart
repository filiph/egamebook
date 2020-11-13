import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/punch_on_ground/punch_situation.dart';

class FinishPunchOnGround extends OtherActorAction {
  static final FinishPunchOnGround singleton = FinishPunchOnGround();

  static const String className = "FinishPunchOnGround";

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
  List<String> get commandPathTemplate => const [];

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
    assert(a.isOnGround && enemy.isOnGround,
        "This is only for people on the ground.");
    final thread = getThreadId(sim, w, punchOnGroundSituationName);

    const string = "<subject> {punch<es> <object> in the {face|nose|eye|jaw}|"
        "punch<es> <object's> {face|nose|eye|jaw}}";
    s.add(string,
        subject: a, object: enemy, actionThread: thread, positive: true);
    enemy.report(s, "<subject> {blink<s>|sway<s>} in a {short|brief} daze",
        actionThread: thread, negative: true);

    // Summary
    s.add(string,
        subject: a,
        object: enemy,
        actionThread: thread,
        replacesThread: true,
        positive: true);
    enemy.report(s, "<subject> {blink<s>|sway<s>} in a {short|brief} daze",
        actionThread: thread, replacesThread: true, negative: true);

    if (!enemy.isPlayer) {
      w.updateActorById(
          enemy.id,
          (b) => b
            ..recoveringUntil =
                w.time.add(Action.defaultRecoveryDuration * 1.5));
    }

    return "${a.name} punches ${enemy.name} on ground";
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
