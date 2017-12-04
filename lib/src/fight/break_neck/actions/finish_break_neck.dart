import 'package:edgehead/edgehead_lib.dart' show brianaId;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';

class FinishBreakNeck extends EnemyTargetAction {
  static const String className = "FinishBreakNeck";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

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
  String applyFailure(ActionContext context) {
    Actor a = context.actor;
    WorldState w = context.world;
    Storyline s = context.storyline;
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    WorldState w = context.world;
    Storyline s = context.storyline;
    final damage = enemy.hitpoints;
    w.updateActorById(enemy.id, (b) => b..hitpoints = 0);
    final updatedEnemy = w.getActorById(enemy.id);
    if (updatedEnemy.id == brianaId) {
      // Special case for Briana who cannot die.
      a.report(s, "<subject> smash<es> <object's> head to the ground",
          object: updatedEnemy, positive: true);
      reportPain(context, updatedEnemy, damage);
    } else {
      a.report(
          s,
          "<subject> break<s> "
          "<object's> "
          "neck" /* TODO: add variants */,
          object: updatedEnemy,
          positive: true);
      killHumanoid(context, updatedEnemy);
    }
    return "${a.name} breaks ${enemy.name}'s neck on ground";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState w) => true;

  static EnemyTargetAction builder(Actor enemy) => new FinishBreakNeck(enemy);
}
