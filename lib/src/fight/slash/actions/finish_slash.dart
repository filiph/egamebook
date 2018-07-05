import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_damage.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/writers_helpers.dart' show brianaId, orcthorn;

OtherActorAction finishSlashBuilder(Actor enemy) => new FinishSlash(enemy);

class FinishSlash extends OtherActorAction {
  static const String className = "FinishSlash";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  FinishSlash(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => null;

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
    final damage = a.currentWeapon.damageCapability.slashingDamage;
    final situation = context.world.currentSituation as AttackerSituation;
    assert(situation.name == slashSituationName);
    assert(situation.attackDirection == AttackDirection.left ||
        situation.attackDirection == AttackDirection.right);
    final direction = situation.attackDirection == AttackDirection.left
        ? SlashDirection.left
        : SlashDirection.right;
    // TODO: change to cleave automatically when at last hitpoint
    final result = executeSlashingHitFromDirection(target, direction,
        a.currentWeapon, SlashSuccessLevel.majorCut, w.randomInt);
    w.actors.removeWhere((actor) => actor.id == target.id);
    w.actors.add(result.actor);
    final thread = getThreadId(sim, w, slashSituationName);
    // TODO: revert kill if it's briana.
    bool killed = !result.actor.isAlive && result.actor.id != brianaId;
    if (!killed) {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} <object's> "
          "${result.slashedPart.randomDesignation}",
          object: result.actor,
          positive: true,
          actionThread: thread);
      if (result.fell) {
        result.actor.report(s, "<subject> fall<s> {|down|to the ground}",
            negative: true, actionThread: thread);
      }
      reportPain(context, result.actor, damage);
    } else {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} "
          "{across|through} <object's> "
          "${result.slashedPart.randomDesignation}",
          object: result.actor,
          positive: true,
          actionThread: thread);
      if (a.currentWeapon.name == orcthorn.name &&
          target.name.contains('orc')) {
        a.currentWeapon.report(
            s, "<subject> slit<s> through the flesh like it isn't there.",
            wholeSentence: true);
      }
      killHumanoid(context, result.actor);
    }
    return "${a.name} slashes${killed ? ' (and kills)' : ''} ${target.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) =>
      a.currentWeapon.damageCapability.isSlashing;
}
