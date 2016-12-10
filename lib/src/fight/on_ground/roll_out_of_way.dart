import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

var rollOutOfWay = new EnemyTargetActionGenerator("roll out of way",
    valid: (Actor a, enemy, WorldState w) => true, chance: (a, enemy, w) {
  if (a.isPlayer) return 1.0;
  return 0.5;
}, success: (a, enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> <is> able to roll out of the way",
      but: true, positive: true);
  if (a.isPlayer) {
    w.updateActorById(a.id, (b) => b..pose = Pose.standing);
    a.report(s, "<subject> jump<s> up on <subject's> feet", positive: true);
  }
  w.popSituationsUntil("FightSituation");
  return "${a.name} rolls out of the way of ${enemy.name}'s strike";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> tr<ies> to roll out of the way");
  a.report(s, "<subject> can't", but: true);
  return "${a.name} fails to roll out of the way";
});
