import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_blunt_damage.dart';
import 'package:edgehead/fractal_stories/anatomy/weapon_assault_result.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/blunt_swing/blunt_swing_situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';
import 'package:edgehead/src/fight/common/fall.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

class FinishBluntSwing extends OtherActorAction {
  static final FinishBluntSwing singleton = FinishBluntSwing();

  static const String className = "FinishBluntSwing";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  /// The action that initiated the slash might have been proactive, but
  /// the finish is just that, a finish.
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
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final damage = a.currentDamageCapability.slashingDamage;
    final situation = context.world.currentSituation as AttackerSituation;
    assert(situation.name == bluntSwingSituationName);

    final result = _executeAtDesignation(
        situation, situation.attackDirection, a, enemy, w.randomInt);

    w.updateActorById(enemy.id, (b) => b.replace(result.victim));
    final thread = getThreadId(sim, w, bluntSwingSituationName);
    bool killed = !result.victim.isAnimated && !result.victim.isInvincible;
    if (!killed) {
      a.report(
          s,
          "<subject> hit<s> <object's> "
          "${result.touchedPart.randomDesignation}",
          object: result.victim,
          positive: true,
          actionThread: thread);
      if (result.disabled &&
          (result.touchedPart.function == BodyPartFunction.damageDealing ||
              result.touchedPart.function == BodyPartFunction.mobile ||
              result.touchedPart.function == BodyPartFunction.wielding)) {
        assert(result.touchedPart.designation != BodyPartDesignation.teeth);
        result.touchedPart.report(s, "<subject> go<es> limp",
            negative: true, actionThread: thread);
      }
      if (result.willDropCurrentWeapon) {
        final weapon = dropCurrentWeapon(w, result.victim.id, forced: true);
        result.victim.report(s, "<subject> drop<s> <object>",
            object: weapon, negative: true, actionThread: thread);
      }
      if (result.willFall) {
        result.victim.report(s, "<subject> fall<s>{| down| to the ground}",
            negative: true, actionThread: thread);
        makeActorFall(context.world, w, s, result.victim);
      }
      inflictPain(context, result.victim.id, damage, result.touchedPart);
      if (result.wasBlinding) {
        result.victim.report(s, "<subject> <is> now blind", negative: true);
      }
    } else {
      a.report(
          s,
          "<subject> {hit<s>|land<s> <subject's> swing at} "
          "<objectOwner's> <object>",
          objectOwner: result.victim,
          object: result.touchedPart,
          positive: true,
          actionThread: thread);
      s.add('something cracks');
      killHumanoid(context, result.victim.id);
    }
    return "${a.name} blunt-swings"
        "${killed ? ' (and kills)' : ''} ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      a.currentDamageCapability.isBlunt;

  WeaponAssaultResult _executeAtDesignation(
      AttackerSituation situation,
      AttackDirection direction,
      Actor attacker,
      Actor enemy,
      RandomIntGetter randomGetter) {
    final designation = direction.toBodyPartDesignation();
    assert(attacker.currentWeaponOrBodyPart != null);
    return executeBluntHit(
        enemy, attacker.currentWeaponOrBodyPart, designation);
  }
}
