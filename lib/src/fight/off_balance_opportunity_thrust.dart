import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/item.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';

var offBalanceOpportunityThrust = new EnemyTargetActionGenerator(
    "stab <object>",
    valid: (Actor a, enemy, WorldState w) =>
        a.pose == Pose.standing &&
        enemy.pose == Pose.offBalance &&
        a.wields(ItemType.SWORD),
    chance: 0.5, success: (a, enemy, WorldState w, Storyline s) {
  a.report(
      s,
      "<subject> {stab<s>|"
      "run<s> <subject's> ${a.currentWeapon.name} through} <object>",
      object: enemy,
      positive: true);
  enemy.report(s, "<subject> collapse<s>, dead",
      negative: true, endSentence: true);
  s.addParagraph();
  w.updateActorById(enemy.id, (b) => b.isAlive = false);
  return "${a.name} stabs ${enemy.name}";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> tr<ies> to stab <object>", object: enemy);
  a.report(s, "<subject> {go<es> wide|fail<s>|miss<es>}", but: true);
  return "${a.name} fails to stab ${enemy.name}";
});
