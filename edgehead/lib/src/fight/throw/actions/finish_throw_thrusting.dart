import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_thrusting_damage.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/throw/move_projectile_to_ground.dart';
import 'package:edgehead/src/fight/throw/throw_situation.dart';

class FinishThrowThrusting extends OtherActorAction {
  static final FinishThrowThrusting singleton = FinishThrowThrusting();

  static const String className = "FinishThrowThrusting";

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
  List<String> get commandPathTemplate => const [];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Simulation sim = context.simulation;
    final projectile = a.currentWeapon;
    assert(projectile.isWeapon);
    assert(projectile.damageCapability.isThrusting);

    final allLivingParts = enemy.anatomy.torso
        .getDescendantParts()
        .where((part) => part.isAlive)
        .toList(growable: false);
    final targetPart = w.randomChoose(allLivingParts);

    final result =
        executeThrustingHit(enemy, projectile, targetPart.designation);

    w.updateActorById(enemy.id, (b) => b.replace(result.victim));
    final thread = getThreadId(sim, w, throwSituationName);
    bool killed = !result.victim.isAlive && !result.victim.isInvincible;
    if (!killed) {
      projectile.report(
          s,
          "<subject> {pierce<s>|ram<s> into|drill<s> into} "
          "<objectOwner's> <object>",
          owner: a,
          objectOwner: result.victim,
          object: result.touchedPart,
          actionThread: thread,
          positive: true);
      if (result.disabled &&
          // Eyes don't go "limp".
          result.touchedPart.function != BodyPartFunction.vision) {
        result.touchedPart.report(s, "<subject> go<es> limp",
            negative: true, actionThread: thread);
      }
      if (result.willDropCurrentWeapon) {
        final weapon = dropCurrentWeapon(w, result.victim.id);
        result.victim.report(s, "<subject> drop<s> <object>",
            object: weapon, negative: true, actionThread: thread);
      }
      if (result.willFall) {
        result.victim.report(s, "<subject> fall<s> {|down|to the ground}",
            negative: true, actionThread: thread);
        w.updateActorById(result.victim.id, (b) => b.pose = Pose.onGround);
        w.recordCustom(fellToGroundCustomEventName, actor: result.victim);
      }
      inflictPain(
          context, enemy.id, projectile.damageCapability.thrustingDamage,
          extremePain: result.disabled);

      result.victim
          .report(s, "<subject> pull<s> <object> out", object: projectile);
      projectile.report(
          s, "<subject> fall<s> onto the ${getGroundMaterial(w)}");

      if (result.wasBlinding) {
        result.victim.report(s, "<subject> <is> now blind", negative: true);
      }
    } else {
      projectile.report(
          s,
          "<subject> {pierce<s>|ram<s> into|drill<s> through} "
          "<objectOwner's> <object>",
          objectOwner: result.victim,
          object: result.touchedPart,
          positive: true,
          actionThread: thread);
      killHumanoid(context, enemy.id);
    }

    moveProjectileToGround(w, a, projectile, false);
    return "${a.name} hits ${enemy.name} with thrown ${projectile.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      a.currentWeapon.damageCapability.isThrusting;
}
