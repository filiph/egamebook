import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';

class StartSlashGroundedEnemy extends EnemyTargetAction {
  @override
  final String helpMessage = "Opponents on the ground are often the most "
      "vulnerable.";

  @override
  final bool isAggressive = true;

  StartSlashGroundedEnemy(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "strike down at <object>";

  @override
  String get rollReasonTemplate => "will <subject> strike with extra force?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
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
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> strike<s> down "
        "{with <subject's> ${a.currentWeapon.name} |}at <object> "
        "with all <subject's> {might|power}",
        object: enemy,
        positive: true);
    var strikeDownSituation = new StrikeDownSituation.initialized(a, enemy);
    w.pushSituation(strikeDownSituation);
    var onGroundDefenseSituation =
        new OnGroundDefenseSituation.initialized(a, enemy, extraForce: true);
    w.pushSituation(onGroundDefenseSituation);
    return "${a.name} strikes down at ${enemy.name} on the ground";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 0.95;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      enemy.pose == Pose.onGround &&
      a.pose != Pose.onGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) =>
      new StartSlashGroundedEnemy(enemy);
}
