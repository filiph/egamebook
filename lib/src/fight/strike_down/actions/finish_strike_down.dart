import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

class FinishSlashGroundedEnemy extends EnemyTargetAction {
  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = false;

  FinishSlashGroundedEnemy(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "kill <object> (WARNING should not be "
      "user-visible)";

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

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
      enemy.pose == Pose.onGround && a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) =>
      new FinishSlashGroundedEnemy(enemy);
}
