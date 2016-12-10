import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

import 'slash_situation.dart';
import 'slash_defense_situation.dart';
import 'package:edgehead/src/fight/damage_reports.dart';

var startSlash = new EnemyTargetActionGenerator("swing at <object>",
    valid: (Actor a, enemy, w) =>
        a.pose == Pose.standing &&
        enemy.pose != Pose.onGround &&
        a.wields(ItemType.SWORD),
    chance: (_, __, ___) => 1.0,
    success: (a, enemy, WorldState w, Storyline s) {
  a.report(
      s,
      "<subject> swing<s> "
      "{<subject's> ${a.currentWeapon.name} |}at <object>",
      object: enemy);
  var slashSituation =
      new Situation.withState(new SlashSituation.withValues(a, enemy));
  w.pushSituation(slashSituation);
  var slashDefenseSituation =
      new Situation.withState(new SlashDefenseSituation.withValues(a, enemy));
  w.pushSituation(slashDefenseSituation);
  return "${a.name} slashes at ${enemy.name}";
});

var finishSlash = new EnemyTargetActionGenerator("kill <object>",
    valid: (Actor a, enemy, w) => a.wields(ItemType.SWORD),
    chance: (_, __, ___) => 1.0,
    success: (a, enemy, WorldState w, Storyline s) {
  w.updateActorById(enemy.id, (b) => b..hitpoints -= 1);
  if (w.getActorById(enemy.id).isAlive) {
    a.report(
        s,
        "<subject> {slash<es>|cut<s>} <object's> "
        "{shoulder|abdomen|thigh}",
        object: enemy,
        positive: true);
    reportPain(s, enemy);
  } else {
    a.report(
        s,
        "<subject> {slash<es>|cut<s>} {across|through} <object's> "
        "{neck|abdomen|lower body}",
        object: enemy,
        positive: true);
    reportDeath(s, enemy);
  }
  return "${a.name} slains ${enemy.name}";
});
