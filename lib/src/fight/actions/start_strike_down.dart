import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';

class StartStrikeDown extends EnemyTargetAction {
  static const String className = "StartStrikeDown";

  @override
  final String helpMessage = "Opponents on the ground are often the most "
      "vulnerable.";

  @override
  final bool isAggressive = true;

  StartStrikeDown(Actor enemy) : super(enemy);

  @override
  String get name => className;

  @override
  String get commandTemplate => "strike down at <object>";

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => null;

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
      !a.isPlayer &&
      enemy.isOnGround &&
      !a.isOnGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) => new StartStrikeDown(enemy);
}
