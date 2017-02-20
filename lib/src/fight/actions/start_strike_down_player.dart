import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/start_strike_down.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

class StartStrikeDownPlayer extends StartStrikeDown {
  StartStrikeDownPlayer(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "strike down at <object>";

  @override
  bool get rerollable => true;

  @override
  Resource get rerollResource => Resource.stamina;

  @override
  String get rollReasonTemplate => "will <subject> hit?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> strike<s> down "
        "{with <subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy);
    var strikeDownSituation = new StrikeDownSituation.initialized(a, enemy);
    w.pushSituation(strikeDownSituation);
    var onGroundDefenseSituation = new OnGroundDefenseSituation.initialized(
        a, enemy,
        predeterminedResult: Predetermination.successGuaranteed);
    w.pushSituation(onGroundDefenseSituation);
    return "${a.name} makes an unsuccessful strike at ${enemy.name} "
        "on the ground";
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
    var onGroundDefenseSituation = new OnGroundDefenseSituation.initialized(
        a, enemy,
        predeterminedResult: Predetermination.failureGuaranteed);
    w.pushSituation(onGroundDefenseSituation);
    return "${a.name} makes a successful strike at ${enemy.name} on the ground";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 0.7;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      a.isPlayer &&
      enemy.pose == Pose.onGround &&
      a.pose != Pose.onGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) =>
      new StartStrikeDownPlayer(enemy);
}
