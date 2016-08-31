import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:edgehead/src/fight/counter_attack_situation.dart';
import 'package:stranded/situation.dart';

var dodgeSlash = new EnemyTargetActionGenerator("dodge and counter",
    valid: (Actor a, enemy, WorldState w) => a.pose != Pose.onGround,
    chance: 0.5, success: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> {dodge<s>|sidestep<s>} it",
      object: enemy, positive: true);
  if (enemy.pose == Pose.standing) {
    enemy.report(s, "<subject> lose<s> balance because of that",
        endSentence: true);
    w.updateActorById(enemy.id, (b) => b.pose = Pose.offBalance);
  }
  // Pop slash_defense_situation.
  w.popSituation();
  // Pop slash_situation.
  w.popSituation();
  if (a.isPlayer) {
    s.add("this opens an opportunity for a counter attack");
  }
  var counterAttackSituation =
      new Situation.withState(new CounterAttackSituation.withValues(a, enemy));
  w.pushSituation(counterAttackSituation);
  return "${a.name} dodges ${enemy.name}";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> tr<ies> to {dodge|sidestep}");
  a.report(s, "<subject> {can't|fail<s>}", but: true);
  return "${a.name} fails to dodge ${enemy.name}";
});
