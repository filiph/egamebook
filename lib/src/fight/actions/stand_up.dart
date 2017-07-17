import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/kick_to_ground.dart';
import 'package:edgehead/src/fight/actions/pound.dart';
import 'package:edgehead/src/fight/punch/actions/finish_punch.dart';

/// This will return `true` if the actor [a] was recently pushed to the ground.
/// That's useful to know so that they can't immediately stand up.
bool recentlyForcedToGround(Actor a, WorldState world) {
  var sweepRecency = world.timeSinceLastActionRecord(
      actionName: KickToGround.className, sufferer: a, wasSuccess: true);
  // We're using 2 here because it's safer. Sometimes, an action by another
  // actor is silent, so with 1 we would still get 'you sweep his legs, he
  // stands up'.
  if (sweepRecency != null && sweepRecency <= 2) {
    return true;
  }
  // If this actor was just pounded to ground, do not let him stand up.
  var poundRecency = world.timeSinceLastActionRecord(
      actionName: Pound.className, sufferer: a, wasSuccess: true);
  if (poundRecency != null && poundRecency <= 2) {
    return true;
  }
  // If this actor was just punched to ground, do not let him stand up.
  var punchRecency = world.timeSinceLastActionRecord(
      actionName: FinishPunch.className, sufferer: a, wasSuccess: true);
  if (punchRecency != null && punchRecency <= 2) {
    return true;
  }
  return false;
}

class StandUp extends Action {
  static final StandUp singleton = new StandUp();

  static const String className = "StandUp";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  String get command => "Stand up.";

  @override
  String get name => className;

  @override
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|"
        "get<s> up|pick<s> <subjectPronounSelf> up}");
    Randomly.run(
        () => a.report(
            s, "<subject> {stagger<s>|sway<s>} back before finding balance"),
        () => a.report(s, "<subject> stead<ies> <subjectPronounSelf>"));
    w.updateActorById(a.id, (b) => b.pose = Pose.standing);
    return "${a.name} stands up";
  }

  @override
  String getRollReason(Actor a, WorldState w) =>
      "Will ${a.pronoun.nominative} stand up?";

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) {
    if (!a.isOnGround) return false;
    // If this actor just fell, do not let him stand up.
    if (recentlyForcedToGround(a, world)) return false;
    return true;
  }
}
