import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently_lost_stance.dart';

class RegainBalance extends Action<Nothing> {
  static final RegainBalance singleton = RegainBalance();

  static const String className = "RegainBalance";

  static final Entity _balance =
      Entity(name: "balance", team: neutralTeam, nameIsProperNoun: true);

  @override
  final String helpMessage = "Most moves are easier and more effective when "
      "I am firmly in balance.";

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
  String applySuccess(ActionContext context, void _) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> regain<s> <object>",
        object: _balance, positive: true);
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
  Duration getRecoveryDuration(ApplicabilityContext context, Nothing _) {
    if (context.actor.isPlayer) {
      //  This move should be super fast for the player.
      return const Duration(milliseconds: 200);
    }

    return super.getRecoveryDuration(context, _);
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      "Will ${a.pronoun.nominative} regain balance?";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, void _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, void _) =>
      // Only player is able to regain balance.
      // It's boring when others do it.
      a.isPlayer && a.pose == Pose.offBalance && !recentlyLostStance(a, world);
}
