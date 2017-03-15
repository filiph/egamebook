import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';

class StartSlashOutOfBalance extends EnemyTargetAction {
  static const String className = "StartSlashOutOfBalance";

  @override
  final String helpMessage = "It's always better to fight with your feet "
      "firmly on the ground. But sometimes, it's necessary to act quickly.";

  @override
  final bool isAggressive = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  StartSlashOutOfBalance(Actor enemy) : super(enemy);

  @override
  String get name => className;

  @override
  String get nameTemplate => "swing at <object> (while out of balance)";

  @override
  String get rollReasonTemplate => "will <subject> hit <objectPronoun>?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> completely miss<es> <object> with "
        "<subject's> ${a.currentWeapon.name}",
        object: enemy,
        negative: true);
    return "${a.name} fails to start an out-of-balance slash at ${enemy.name}";
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
  num getSuccessChance(Actor actor, WorldState world) => 0.7;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      !a.isPlayer &&
      a.isOffBalance &&
      !enemy.isOnGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) =>
      new StartSlashOutOfBalance(enemy);
}
