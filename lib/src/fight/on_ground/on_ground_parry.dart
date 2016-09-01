import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/item.dart';
import 'package:stranded/storyline/randomly.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:stranded/world.dart';

var onGroundParry = new EnemyTargetActionGenerator("parry it",
    valid: (Actor a, enemy, WorldState w) => a.wields(ItemType.SWORD),
    chance: (a, enemy, w) {
  if (a.isPlayer) return 0.6;
  return 0.3;
}, success: (a, enemy, WorldState w, Storyline s) {
  a.report(
      s,
      "<subject> {parr<ies> it|"
      "stop<s> it with <subject's> ${a.currentWeapon.name}}",
      positive: true);
  w.popSituationsUntil("FightSituation");
  return "${a.name} parries ${enemy.name}";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(
      s,
      "<subject> tr<ies> to {parry|deflect it|"
      "stop it{| with <subject's> ${a.currentWeapon.name}}}");
  Randomly.run(
      () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
      () => enemy.report(s, "<subject> <is> too quick for <object>",
          object: a, but: true));
  return "${a.name} fails to parry ${enemy.name}";
});
