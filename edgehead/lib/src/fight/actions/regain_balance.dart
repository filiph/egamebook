import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/clash.dart';
import 'package:edgehead/src/fight/common/recently_lost_stance.dart';

class RegainBalance extends Action<Null> with ComplexCommandPath<Null> {
  static final RegainBalance singleton = RegainBalance();

  static const String className = "RegainBalance";

  @override
  final String helpMessage = "Most moves are easier and more effective when "
      "you are firmly in balance.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = false;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  List<String> get commandPathTemplate => const ["self", "regain balance"];

  @override
  String get name => className;

  @override
  String applyFailure(_, __) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Null _) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> regain<s> <object>",
        object: balance, positive: true);
    if (a.isPlayer) {
      // Player doesn't need to do two stance improvements in a row.
      w.updateActorById(a.id, (b) => b.pose = a.poseMax);
    } else {
      w.updateActorById(
          a.id,
          (b) =>
              b.pose = a.poseMax >= Pose.standing ? Pose.standing : a.poseMax);
    }
    return "${a.name} regains balance";
  }

  @override
  String getCommand(Null _) => "Regain balance.";

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) =>
      "Will ${a.pronoun.nominative} regain balance?";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Null _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Null _) =>
      a.pose == Pose.offBalance && !recentlyLostStance(a, world);
}
