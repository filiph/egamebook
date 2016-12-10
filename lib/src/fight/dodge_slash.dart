import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/src/fight/counter_attack_situation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';

var dodgeSlash = new EnemyTargetActionGenerator("dodge and counter",
    valid: (Actor a, enemy, WorldState w) => a.pose != Pose.onGround,
    chance: (a, enemy, w) {
  num outOfBalancePenalty = a.pose == Pose.standing ? 0 : 0.2;
  if (a.isPlayer) return 0.7 - outOfBalancePenalty;
  return 0.4 - outOfBalancePenalty;
}, success: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> {dodge<s>|sidestep<s>} it",
      object: enemy, positive: true);
  if (enemy.pose == Pose.standing) {
    enemy.report(s, "<subject> lose<s> balance because of that",
        endSentence: true);
    w.updateActorById(enemy.id, (b) => b.pose = Pose.offBalance);
  }
  w.popSituationsUntil("FightSituation");
  if (a.isPlayer) {
    s.add("this opens an opportunity for a counter attack");
  }
  var counterAttackSituation =
      new Situation.withState(new CounterAttackSituation.withValues(a, enemy));
  w.pushSituation(counterAttackSituation);
  return "${a.name} dodges ${enemy.name}";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> tr<ies> to {dodge|sidestep}");
  if (a.pose == Pose.offBalance) {
    a.report(s, "<subject> <is> out of balance", but: true);
  } else {
    Randomly.run(
        () => a.report(s, "<subject> {can't|fail<s>|<does>n't succeed}",
            but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
  }
  return "${a.name} fails to dodge ${enemy.name}";
});
