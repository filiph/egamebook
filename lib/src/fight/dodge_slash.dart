import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';

var dodgeSlash = new EnemyTargetActionGenerator("dodge it",
    valid: (Actor a, enemy, WorldState w) => a.pose != Pose.onGround,
    chance: 0.5, success: (a, enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> {dodge<s>|sidestep<s>} it",
      object: enemy, positive: true);
  w.popSituation();
  w.popSituation();
  return "${a.name} dodges ${enemy.name}";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> tr<ies> to {dodge|sidestep}");
  a.report(s, "<subject> {can't|fail<s>}", but: true);
  return "${a.name} fails to dodge ${enemy.name}";
});
