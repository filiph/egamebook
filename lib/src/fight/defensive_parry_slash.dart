import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/item.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:stranded/storyline/randomly.dart';

var defensiveParrySlash = new EnemyTargetActionGenerator("step back and parry",
    valid: (Actor a, enemy, WorldState w) => a.wields(ItemType.SWORD),
    chance: (a, enemy, w) {
  if (a.isPlayer) return 1.0;
  num outOfBalancePenalty = a.pose == Pose.standing ? 0 : 0.2;
  return 0.5 - outOfBalancePenalty;
}, success: (a, enemy, WorldState w, Storyline s) {
  if (a.isPlayer) {
    a.report(s, "<subject> {step<s>|take<s> a step} back");
  }
  a.report(
      s,
      "<subject> {parr<ies> it|deflect<s> it|"
      "meet<s> it with <subject's> ${a.currentWeapon.name}|"
      "fend<s> it off}",
      positive: true);

  if (a.pose != Pose.standing) {
    w.updateActorById(a.id, (b) => b..pose = Pose.standing);
    if (a.isPlayer) {
      a.report(s, "<subject> regain<s> balance");
    }
  }
  w.popSituationsUntil("FightSituation");
  return "${a.name} steps back and parries ${enemy.name}";
}, failure: (a, enemy, w, s) {
  a.report(
      s,
      "<subject> tr<ies> to {parry|deflect it|"
      "meet it with <subject's> ${a.currentWeapon.name}|"
      "fend it off}");
  if (a.pose == Pose.offBalance) {
    a.report(s, "<subject> <is> out of balance", but: true);
  } else {
    Randomly.run(
        () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
  }
  return "${a.name} fails to dodge ${enemy.name}";
});
