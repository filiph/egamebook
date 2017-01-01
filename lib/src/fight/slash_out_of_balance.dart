import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

import 'slash_defense_situation.dart';
import 'slash_situation.dart';

class StartSlashOutOfBalance extends EnemyTargetAction {
  StartSlashOutOfBalance(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "swing at <object> (while out of balance)";

  @override
  final String helpMessage = "It's always better to fight with your feet "
      "firmly on the ground. But sometimes, it's necessary to act quickly.";

  @override
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> swing<s> "
        "{<subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy);
    var slashSituation = new SlashSituation.initialized(a, enemy);
    w.pushSituation(slashSituation);
    var slashDefenseSituation = new SlashDefenseSituation.initialized(a, enemy);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} starts an out-of-balance slash at ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      a.pose == Pose.offBalance &&
      enemy.pose != Pose.onGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) =>
      new StartSlashOutOfBalance(enemy);
}
