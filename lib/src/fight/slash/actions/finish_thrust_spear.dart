import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/writers_helpers.dart';

EnemyTargetAction finishThrustSpearBuilder(Actor enemy) =>
    new FinishThrustSpear(enemy);

class FinishThrustSpear extends EnemyTargetAction {
  static const String className = "FinishThrustSpear";

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

  FinishThrustSpear(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(ActionContext context) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final damage = a.currentWeapon.thrustingDamage;
    w.updateActorById(enemy.id, (b) => b..hitpoints -= damage);
    final updatedEnemy = w.getActorById(enemy.id);
    final thread = getThreadId(sim, w, slashSituationName);
    bool killed = !updatedEnemy.isAlive && updatedEnemy.id != brianaId;
    if (!killed) {
      a.report(
          s,
          "<subject> {pierce<s>|stab<s>|bore<s> through} <object's> "
          "{shoulder|abdomen|thigh}",
          object: updatedEnemy,
          positive: true,
          actionThread: thread);
      reportPain(context, updatedEnemy, damage);
    } else {
      a.report(
          s,
          "<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} "
          "<object's> "
          "{neck|chest|heart}",
          object: updatedEnemy,
          positive: true,
          actionThread: thread);
      killHumanoid(context, updatedEnemy);
    }
    return "${a.name} pierces${killed ? ' (and kills)' : ''} ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, Simulation sim, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) =>
      a.currentWeapon.type == WeaponType.spear;
}
