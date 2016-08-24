import 'package:edgehead/src/fight/damage_reports.dart';
import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/item.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:stranded/world.dart';

var offBalanceOpportunityThrust = new EnemyTargetActionGenerator(
    "stab <object>",
    valid: (Actor a, enemy, WorldState w) =>
        a.pose == Pose.standing &&
        enemy.pose == Pose.offBalance &&
        a.wields(ItemType.SWORD),
    chance: 0.5, success: (a, enemy, WorldState w, Storyline s) {
  w.updateActorById(enemy.id, (b) => b..hitpoints -= 1);
  if (w.getActorById(enemy.id).isAlive) {
    a.report(
        s,
        "<subject> thrust<s> {|<subject's> ${a.currentWeapon.name}} "
            "deep into <object's> {shoulder|hip|thigh}",
        object: enemy,
        positive: true);
    reportPain(s, enemy);
  } else {
    a.report(
        s,
        "<subject> {stab<s>|"
        "run<s> <subject's> ${a.currentWeapon.name} through} <object>",
        object: enemy,
        positive: true);
    reportDeath(s, enemy);
  }
  return "${a.name} stabs ${enemy.name}";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> tr<ies> to stab <object>", object: enemy);
  a.report(s, "<subject> {go<es> wide|fail<s>|miss<es>}", but: true);
  return "${a.name} fails to stab ${enemy.name}";
});