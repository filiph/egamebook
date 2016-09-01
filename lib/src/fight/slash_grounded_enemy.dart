import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/item.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:stranded/world.dart';

var slashGroundedEnemy = new EnemyTargetActionGenerator(
    "strike down at <object>",
    valid: (Actor a, enemy, w) =>
        enemy.pose == Pose.onGround && a.wields(ItemType.SWORD),
    chance: (a, enemy, w) {
      num outOfBalancePenalty = a.pose == Pose.standing ? 0 : 0.2;
      if (a.isPlayer) return 0.8 - outOfBalancePenalty;
      return 0.7 - outOfBalancePenalty;
    }, success: (a, enemy, WorldState w, Storyline s) {
  a.report(
      s,
      "<subject> strike<s> down "
      "{with <subject's> ${a.currentWeapon.name} |}at <object>",
      object: enemy);
  enemy.report(s, "<subject> tr<ies> to roll out of the way");
  enemy.report(s, "<subject> can't", but: true);
  s.add("<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",
      subject: a.currentWeapon, object: enemy);
  enemy.report(s, "<subject> die<s>", negative: true);
  s.addParagraph();
  w.updateActorById(enemy.id, (b) => b..hitpoints = 0);
  return "${a.name} kills ${enemy.name} on the ground";
}, failure: (a, enemy, w, s) {
  a.report(
      s,
      "<subject> strike<s> down "
      "{with <subject's> ${a.currentWeapon.name} |}at <object>",
      object: enemy);
  enemy.report(s, "<subject> <is> able to roll out of the way", but: true);
  return "${a.name} fails to kill ${enemy.name} on the ground";
});
