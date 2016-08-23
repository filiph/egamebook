import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/item.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';

import 'slash_situation.dart';

var parrySlash = new EnemyTargetActionGenerator("parry it",
    valid: (Actor a, enemy, WorldState w) => a.wields(ItemType.SWORD),
    chance: 0.6, success: (a, enemy, WorldState w, Storyline s) {
  a.report(
      s,
      "<subject> {parr<ies> it|"
      "meet<s> it with <subject's> ${a.currentWeapon.name}|"
      "fend<s> it off}",
      positive: true);
  w.popSituation();
  w.popSituation();
  return "${a.name} parries ${enemy.name}";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> tr<ies> to {parry|"
      "meet it with <subject's> ${a.currentWeapon.name}|"
      "fend it off}");
  a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true);
  return "${a.name} fails to dodge ${enemy.name}";
});
