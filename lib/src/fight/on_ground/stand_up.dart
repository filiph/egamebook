import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

class StandUp extends ActorAction {
  static final StandUp singleton = new StandUp();

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
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) => a.pose == Pose.onGround;
}
