import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/on_ground/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/on_ground/strike_down_situation.dart';

class FinishSlashGroundedEnemy extends EnemyTargetAction {
  FinishSlashGroundedEnemy(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "kill <object> (WARNING: should not be "
      "user-visible)";

  @override
  final String helpMessage = null;

  @override
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    w.updateActorById(enemy.id, (b) => b..hitpoints = 0);
    s.add("<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",
        subject: a.currentWeapon, object: enemy);
    enemy.report(s, "<subject> die<s>", negative: true);
    s.addParagraph();
    return "${a.name} slains ${enemy.name} on the ground";
  }

  /// All action takes place in the OnGroundDefenseSituation.
  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      enemy.pose == Pose.onGround && a.wields(ItemType.SWORD);

  static EnemyTargetAction builder(Actor enemy) =>
      new FinishSlashGroundedEnemy(enemy);
}

class StartSlashGroundedEnemy extends EnemyTargetAction {
  StartSlashGroundedEnemy(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "strike down at <object>";

  @override
  final String helpMessage = "Opponents on the ground are often the most "
      "vulnerable.";

  @override
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
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
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      enemy.pose == Pose.onGround && a.wields(ItemType.SWORD);

  static EnemyTargetAction builder(Actor enemy) =>
      new StartSlashGroundedEnemy(enemy);
}
