import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/item.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';

var defensiveParrySlash = new EnemyTargetActionGenerator("step back and parry",
    valid: (Actor a, enemy, WorldState w) => a.wields(ItemType.SWORD),
    chance: 1.0, success: (a, enemy, WorldState w, Storyline s) {
  if (a.isPlayer) {
    a.report(s, "<subject> {step<s>|take<s> a step} back");
  }
  a.report(
      s,
      "<subject> {parr<ies> it|deflect<s> it|"
      "meet<s> it with <subject's> ${a.currentWeapon.name}|"
      "fend<s> it off}",
      positive: true);
  // Pop slash_defense_situation.
  w.popSituation();
  // Pop slash_situation.
  w.popSituation();
  return "${a.name} steps back and parries ${enemy.name}";
});
