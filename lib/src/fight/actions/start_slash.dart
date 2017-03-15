import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';

class StartSlash extends EnemyTargetAction {
  static const String className = "StartSlash";

  @override
  final String helpMessage = "The basic swordfighting move is also often the "
      "most effective.";

  @override
  final bool isAggressive = true;

  @override
  final Resource rerollResource = Resource.stamina;

  StartSlash(Actor enemy) : super(enemy);

  @override
  String get name => className;

  @override
  String get commandTemplate => "swing at <object>";

  @override
  bool get rerollable => false;

  @override
  String get rollReasonTemplate => null;

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
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
    return "${a.name} starts a slash at ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      !a.isPlayer &&
      a.isStanding &&
      !enemy.isOnGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) => new StartSlash(enemy);
}
