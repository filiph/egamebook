import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/kick.dart';

class Scramble extends Action {
  static final Scramble singleton = new Scramble();

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = false; // TODO: explanation?

  @override
  String get name => "Scramble.";

  @override
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> tr<ies> to {scramble|crawl} "
        "out of {reach|harm's way}");
    return "${a.name} scrambles on ground";
  }

  @override
  String getRollReason(Actor a, WorldState w) =>
      "Will ${a.pronoun.nominative} crawl out of harm's way?";

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) {
    if (a.pose != Pose.onGround) return false;
    // Actor must have just fallen.
    var recency = world.timeSinceLastActionRecord(
        actionClassPattern: Kick.className, sufferer: a, wasSuccess: true);
    if (recency != null && recency <= 1) {
      return true;
    }
    return false;
  }
}
