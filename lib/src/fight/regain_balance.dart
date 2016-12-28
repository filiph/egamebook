import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

import 'kick.dart';

class RegainBalance extends Action {
  static final RegainBalance singleton = new RegainBalance();

  @override
  String get name => "Regain balance.";

  @override
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    if (a.isPlayer) {
      a.report(s, "<subject> regain<s> <object>",
          object: balance, positive: true);
    }
    w.updateActorById(a.id, (b) => b.pose = Pose.standing);
    return "${a.name} regains balance";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) => a.pose == Pose.offBalance;
}
