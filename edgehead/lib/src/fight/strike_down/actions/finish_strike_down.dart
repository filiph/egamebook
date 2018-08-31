import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';
import 'package:edgehead/writers_helpers.dart';

class FinishSlashGroundedEnemy extends OtherActorAction {
  static final FinishSlashGroundedEnemy singleton = FinishSlashGroundedEnemy();

  static const String className = "FinishSlashGroundedEnemy";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = false;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  String get commandTemplate => null;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(_, __) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final damage = enemy.hitpoints;
    w.updateActorById(enemy.id, (b) => b..hitpoints = 0);
    final updatedEnemy = w.getActorById(enemy.id);
    final isBriana = updatedEnemy.id == brianaId;
    var bodyPart = isBriana ? 'side' : '{throat|neck|side}';
    s.add("<subject> {cut<s>|slash<es>|slit<s>} <object's> $bodyPart",
        subject: a.currentWeapon, object: updatedEnemy);
    if (isBriana) {
      reportPain(context, updatedEnemy, damage);
    } else {
      killHumanoid(context, updatedEnemy);
    }
    return "${a.name} slains ${enemy.name} on the ground";
  }

  /// All action takes place in the OnGroundDefenseSituation.
  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      enemy.isOnGround && a.currentWeapon.damageCapability.isSlashing;
}
