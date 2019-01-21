import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';

class StandUp extends Action<Null> with ComplexCommandPath<Null> {
  static final StandUp singleton = StandUp();

  static const String className = "StandUp";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const ["self", "stand up"];

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
    a.report(
        s,
        "<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|"
        "get<s> up|pick<s> <subjectPronounSelf> up}");
    Randomly.run(
        () => a.report(
            s, "<subject> {stagger<s>|sway<s>} back before finding balance"),
        () => a.report(s, "<subject> stead<ies> <subjectPronounSelf>"));
    if (a.isPlayer) {
      // Don't force the player to stand in two moves.
      w.updateActorById(a.id, (b) => b.pose = a.poseMax);
    } else {
      w.updateActorById(a.id, (b) => b.pose = Pose.extended);
    }
    return "${a.name} stands up";
  }

  @override
  String getCommand(Null _) => "Stand up.";

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) =>
      "Will ${a.pronoun.nominative} stand up?";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Null _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Null _) {
    if (!a.isOnGround) return false;
    // If this actor just fell, do not let him stand up.
    if (recentlyForcedToGround(a, world)) return false;
    return true;
  }
}
