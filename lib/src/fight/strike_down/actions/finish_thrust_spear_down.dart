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
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    w.updateActorById(enemy.id, (b) => b..hitpoints = 0);
    final isBriana = enemy.id == brianaId;
    var bodyPart = isBriana ? 'side' : '{throat|neck|heart}';
    s.add(
        "<subject> {impale<s>|bore<s> through|pierce<s>} "
        "<object's> $bodyPart",
        subject: a.currentWeapon,
        object: enemy);
    if (isBriana) {
      reportPain(s, enemy);
    } else {
      killHumanoid(s, w, enemy);
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
