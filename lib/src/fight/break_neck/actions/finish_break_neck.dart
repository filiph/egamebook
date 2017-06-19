import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/damage_reports.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class FinishBreakNeck extends EnemyTargetAction {
  static const String className = "FinishBreakNeck";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  FinishBreakNeck(Actor enemy) : super(enemy);

  @override
  String get name => className;

  @override
  String get commandTemplate => "";

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    w.updateActorById(enemy.id, (b) => b..hitpoints = 0);
    a.report(
        s,
        "<subject> break<s> "
        "<object's> "
        "neck" /* TODO: add variants */,
        object: enemy,
        positive: true);
    var groundMaterial =
        w.getSituationByName<FightSituation>("FightSituation").groundMaterial;
    reportDeath(s, enemy, groundMaterial);
    return "${a.name} breaks ${enemy.name}'s neck on ground";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState w) => true;

  static EnemyTargetAction builder(Actor enemy) => new FinishBreakNeck(enemy);
}
