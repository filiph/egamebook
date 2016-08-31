import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/item.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:stranded/world.dart';

import 'package:edgehead/src/fight/damage_reports.dart';

var counterSlash = new EnemyTargetActionGenerator("swing back at <object>",
    valid: (Actor a, enemy, w) => a.wields(ItemType.SWORD),
    chance: 0.5, success: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> swing<s> back at <object>", object: enemy);
  w.updateActorById(enemy.id, (b) => b..hitpoints -= 1);
  if (w.getActorById(enemy.id).isAlive) {
    a.report(
        s,
        "<subject> cut<s> "
        "deep into <object's> {shoulder|hip|thigh}"
        "{| with <subject's> ${a.currentWeapon.name}}",
        object: enemy,
        positive: true);
    reportPain(s, enemy);
  } else {
    a.report(
        s,
        "<subject> {slash<es> accross|cut<s> through} <object's> "
        "{neck|face|abdomen}",
        object: enemy,
        positive: true);
    reportDeath(s, enemy);
  }
  return "${a.name} swings back at ${enemy.name}";
}, failure: (Actor a, Actor enemy, WorldState w, Storyline s) {
  a.report(s, "<subject> tr<ies> to swing back");
  a.report(s, "<subject> {go<es> wide|miss<es>}", but: true);
  if (a.pose == Pose.standing) {
    w.updateActorById(a.id, (b) => b..pose = Pose.offBalance);
    a.report(s, "<subject> lose<s> balance because of that",
        negative: true, endSentence: true);
  }
  return "${a.name} fails to swing back at ${enemy.name}";
});
