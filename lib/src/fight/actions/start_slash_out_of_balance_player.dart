import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/start_slash_out_of_balance.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

class StartSlashOutOfBalancePlayer extends StartSlashOutOfBalance {
  StartSlashOutOfBalancePlayer(Actor enemy) : super(enemy);

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> swing<s> "
        "{<subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy);
    var slashSituation = new SlashSituation.initialized(a, enemy);
    w.pushSituation(slashSituation);
    var slashDefenseSituation = new SlashDefenseSituation.initialized(a, enemy,
        predeterminedResult: Predetermination.failureGuaranteed);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} starts an out-of-balance slash at ${enemy.name}";
  }

  @override
  bool isApplicable(Actor a, WorldState world) =>
      a.isPlayer &&
      a.isOffBalance &&
      !enemy.isOnGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) =>
      new StartSlashOutOfBalancePlayer(enemy);
}
