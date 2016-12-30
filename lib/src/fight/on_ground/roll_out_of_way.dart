import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

class RollOutOfWay extends EnemyTargetAction {
  RollOutOfWay(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "roll out of way";

  @override
  final String helpMessage = null; // TODO: come up with something

  @override
  String applyFailure(Actor a, WorldState _, Storyline s) {
    a.report(s, "<subject> tr<ies> to roll out of the way");
    a.report(s, "<subject> can't", but: true);
    return "${a.name} fails to roll out of the way";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> <is> able to roll out of the way",
        but: true, positive: true);
    if (a.isPlayer) {
      w.updateActorById(a.id, (b) => b..pose = Pose.standing);
      a.report(s, "<subject> jump<s> up on <subject's> feet", positive: true);
    }
    w.popSituationsUntil("FightSituation");
    return "${a.name} rolls out of the way of ${enemy.name}'s strike";
  }

  @override
  num getSuccessChance(Actor a, WorldState world) {
    if (a.isPlayer) return 1.0;
    return 0.5;
  }

  @override
  bool isApplicable(Actor actor, WorldState world) => true;

  static EnemyTargetAction builder(Actor enemy) => new RollOutOfWay(enemy);
}
