import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/pound.dart';
import 'package:edgehead/src/fight/actions/sweep_off_feet.dart';

class StandUp extends Action {
  static final StandUp singleton = new StandUp();

  static const String className = "StandUp";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = false;

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
    a.report(s, "<subject> stand<s> up");
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
    var sweepRecency = world.timeSinceLastActionRecord(
        actionName: SweepOffFeet.className,
        sufferer: a,
        wasSuccess: true);
    // We're using 2 here because it's safer. Sometimes, an action by another
    // actor is silent, so with 1 we would still get 'you sweep his legs, he
    // stands up'.
    if (sweepRecency != null && sweepRecency <= 2) {
      return false;
    }
    // If this actor was just pounded to ground, do not let him stand up.
    var poundRecency = world.timeSinceLastActionRecord(
        actionName: Pound.className, sufferer: a, wasSuccess: true);
    if (poundRecency != null && poundRecency <= 2) {
      return false;
    }
    return true;
  }
}
