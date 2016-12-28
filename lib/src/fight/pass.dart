import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

class Pass extends Action {
  static final Pass singleton = new Pass();

  @override
  String get name => "Stand off.";

  @override
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState world, Storyline s) {
    if (a.isPlayer) {
      a.report(s, "<subject> stand<s> off");
    }
    return "${a.name} passes the opportunity";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor actor, WorldState world) => true;
}
