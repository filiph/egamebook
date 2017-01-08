import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/kick.dart';

class StandUp extends Action {
  static final StandUp singleton = new StandUp();

  @override
  final String helpMessage = null;

  @override
  String get name => "Stand up."; // TODO: explanation?

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
      "will ${a.pronoun.nominative} stand up?";

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) {
    if (a.pose != Pose.onGround) return false;
    // If this actor just fell, do not let him stand up.
    if (world.actionRecords.last.actionClass ==
            Kick.builder(a).runtimeType.toString() &&
        world.actionRecords.last.sufferers.contains(a.id) &&
        world.actionRecords.last.wasSuccess) {
      return false;
    }
    return true;
  }
}
