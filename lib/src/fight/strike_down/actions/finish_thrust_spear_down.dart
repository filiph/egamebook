import 'package:edgehead/edgehead_lib.dart' show brianaId;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/spear.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';

class FinishThrustSpearAtGroundedEnemy extends EnemyTargetAction {
  static const String className = "FinishThrustSpearAtGroundedEnemy";

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

  FinishThrustSpearAtGroundedEnemy(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(_) {
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
    final isBriana = updatedEnemy.id == brianaId;
    var bodyPart = isBriana ? 'side' : '{throat|neck|heart}';
    s.add(
        "<subject> {impale<s>|bore<s> through|pierce<s>} "
        "<object's> $bodyPart",
        subject: a.currentWeapon,
        object: updatedEnemy);
    if (isBriana) {
      reportPain(context, updatedEnemy, damage);
    } else {
      killHumanoid(context, updatedEnemy);
    }
    return "${a.name} slains ${enemy.name} on the ground with a spear";
  }

  /// All action takes place in the OnGroundDefenseSituation.
  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      enemy.isOnGround && a.currentWeapon is Spear;

  static EnemyTargetAction builder(Actor enemy) =>
      new FinishThrustSpearAtGroundedEnemy(enemy);
}
