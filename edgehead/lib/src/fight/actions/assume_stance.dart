import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently_lost_stance.dart';

class AssumeStance extends Action<Null> {
  static final AssumeStance singleton = AssumeStance();

  static const String className = "AssumeStance";

  static final Entity _balance =
      Entity(name: "balance", team: neutralTeam, nameIsProperNoun: true);

  @override
  final String helpMessage = "When in proper combat stance, the enemy has "
      "fewer opportunities for attack.";

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
  List<String> get commandPathTemplate => const ["self", "improve stance"];

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
    a.report(s, "<subject> assume<s> better stance",
        object: _balance, positive: true);
    w.updateActorById(a.id, (b) => b.pose = a.poseMax);
    return "${a.name} assumes better stance";
  }

  @override
  Duration getRecoveryDuration(ApplicabilityContext context, Null object) {
    if (context.actor.isPlayer) {
      //  This move should be super fast for the player.
      return const Duration(milliseconds: 200);
    }

    return super.getRecoveryDuration(context, object);
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) =>
      "Will ${a.pronoun.nominative} assume better stance?";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Null _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Null _) =>
      // Only player is able to assume better stance.
      // It's boring to look at in enemies.
      a.isPlayer &&
      a.pose > Pose.offBalance &&
      a.pose < a.poseMax &&
      !recentlyLostStance(a, world);
}
