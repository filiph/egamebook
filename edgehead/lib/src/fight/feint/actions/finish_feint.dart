import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/recently_lost_stance.dart';
import 'package:edgehead/src/fight/feint/feint_situation.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';

class FinishFeint extends OtherActorAction {
  static final FinishFeint singleton = FinishFeint();

  static const String className = "FinishFeint";

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
    assert(context.world.currentSituation is AttackerSituation);

    var type = feintTypeFromSituation(
        context.world.currentSituation! as AttackerSituation);

    String stringType;
    switch (type) {
      case FeintType.jab:
        stringType = "jab";
      case FeintType.slash:
        stringType = "slash";
      default:
        throw UnimplementedError('No string for $type');
    }

    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Simulation sim = context.simulation;

    final thread = getThreadId(sim, w, feintSituationName);
    final feint = MoveEntity.getFromAttackerSituation(context.world);
    feint.report(s, "<subject> is successful", actionThread: thread);

    a.report(s, "<subject> feint<s> a $stringType",
        replacesThread: true, actionThread: thread, positive: true);

    enemy.report(s, "<subject> expose<s> <subject's> arm",
        actionThread: thread, negative: true);

    w.updateActorById(enemy.id, (b) => b..pose = Pose.extended);
    w.recordCustom(lostStanceCustomEvent, actor: enemy);

    var situation = OffBalanceOpportunitySituation.initialized(
        w.randomInt(), enemy,
        culprit: a);
    w.pushSituation(situation);

    return "${a.name} feints ${enemy.name} out of stance with a $stringType";
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
