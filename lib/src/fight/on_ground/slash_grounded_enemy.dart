import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

import 'package:edgehead/src/fight/on_ground/strike_down_situation.dart';
import 'package:edgehead/src/fight/on_ground/on_ground_defense_situation.dart';

var slashGroundedEnemy = new EnemyTargetActionGenerator(
    "strike down at <object>",
    valid: (Actor a, enemy, w) =>
        enemy.pose == Pose.onGround && a.wields(ItemType.SWORD),
    chance: (a, enemy, w) => 1.0,
    success: (a, enemy, WorldState w, Storyline s) {
  a.report(
      s,
      "<subject> strike<s> down "
      "{with <subject's> ${a.currentWeapon.name} |}at <object>",
      object: enemy);
  var strikeDownSituation = new StrikeDownSituation.initialized(a, enemy);
  w.pushSituation(strikeDownSituation);
  var onGroundDefenseSituation =
      new OnGroundDefenseSituation.initialized(a, enemy);
  w.pushSituation(onGroundDefenseSituation);
  return "${a.name} strikes down at ${enemy.name} on the ground";
});

var finishSlashGroundedEnemy = new EnemyTargetActionGenerator("kill <object>",
    valid: (Actor a, enemy, w) =>
        enemy.pose == Pose.onGround && a.wields(ItemType.SWORD),
    chance: (_, __, ___) => 1.0,
    success: (a, enemy, WorldState w, Storyline s) {
  w.updateActorById(enemy.id, (b) => b..hitpoints = 0);
  s.add("<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",
      subject: a.currentWeapon, object: enemy);
  enemy.report(s, "<subject> die<s>", negative: true);
  s.addParagraph();
  return "${a.name} slains ${enemy.name} on the ground";
});
