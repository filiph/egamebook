import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/item.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:stranded/storyline/randomly.dart';
import 'package:edgehead/src/fight/counter_attack_situation.dart';
import 'package:stranded/situation.dart';

var parrySlash = new EnemyTargetActionGenerator("parry and counter",
    valid: (Actor a, enemy, WorldState w) => a.wields(ItemType.SWORD),
    chance: 0.6, success: (a, enemy, WorldState w, Storyline s) {
  a.report(
      s,
      "<subject> {parr<ies> it|"
      "meet<s> it with <subject's> ${a.currentWeapon.name}|"
      "fend<s> it off}",
      positive: true);
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
  return "${a.name} parries ${enemy.name}";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(
      s,
      "<subject> tr<ies> to {parry|deflect it|"
      "meet it with <subject's> ${a.currentWeapon.name}|"
      "fend it off}");
  Randomly.run(
      () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
      () => enemy.report(s, "<subject> <is> too quick for <object>",
          object: a, but: true));
  return "${a.name} fails to dodge ${enemy.name}";
});
