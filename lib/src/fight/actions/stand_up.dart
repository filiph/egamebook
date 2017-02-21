import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/sweep_off_feet.dart';

class StandUp extends Action {
  static final StandUp singleton = new StandUp();

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  String get name => "Stand up.";

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
    var recency = world.timeSinceLastActionRecord(
        actionClassPattern: SweepOffFeet.className, sufferer: a, wasSuccess: true);
    if (recency != null && recency <= 1) {
      return false;
    }
    return true;
  }
}
