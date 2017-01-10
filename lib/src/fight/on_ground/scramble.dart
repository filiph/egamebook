import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/kick.dart';

class Scramble extends Action {
  static final Scramble singleton = new Scramble();

  @override
  String get name => "Scramble.";

  @override
  final String helpMessage = null; // TODO: explanation?

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
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) {
    if (a.pose != Pose.onGround) return false;
    // Actor must have just fallen.
    if (world.actionRecords.last.actionClass ==
            Kick.builder(a).runtimeType.toString() &&
        world.actionRecords.last.sufferers.contains(a.id) &&
        world.actionRecords.last.wasSuccess) {
      return true;
    }
    return false;
  }

  @override
  String getRollReason(Actor a, WorldState w) =>
      "Will ${a.pronoun.nominative} crawl out of harm's way?";
}
