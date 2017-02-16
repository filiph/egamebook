import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';

class StartSlash extends EnemyTargetAction {
  @override
  final String helpMessage = "The basic swordfighting move is also often the "
      "most effective.";

  @override
  final bool isAggressive = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  StartSlash(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "swing at <object>";

  @override
  String get rollReasonTemplate => "will <subject> swing with extra force?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> swing<s> "
        "{<subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy);
    var slashSituation = new SlashSituation.initialized(a, enemy);
    w.pushSituation(slashSituation);
    var slashDefenseSituation = new SlashDefenseSituation.initialized(a, enemy);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} starts a slash at ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    Randomly.run(
        () => a.report(s, "<subject> swing<s> powerfuly at <object>",
            object: enemy, positive: true),
        () => a.report(
            s,
            "<subject> swing<s> "
            "{<subject's> ${a.currentWeapon.name} |}at <object> "
            "with great force",
            object: enemy,
            positive: true));

    var slashSituation =
        new SlashSituation.initialized(a, enemy, extraForce: true);
    w.pushSituation(slashSituation);
    var slashDefenseSituation =
        new SlashDefenseSituation.initialized(a, enemy, extraForce: true);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} starts a slash at ${enemy.name} with extra force";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) =>
      actor.isPlayer ? 0.9 : 0.3;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      a.pose == Pose.standing &&
      enemy.pose != Pose.onGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) => new StartSlash(enemy);
}
