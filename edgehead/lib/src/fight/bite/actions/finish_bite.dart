import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_tearing_damage.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/bite/bite_situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';

class FinishBite extends OtherActorAction {
  static final FinishBite singleton = FinishBite();

  static const String className = "FinishBite";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  /// The action that initiated the bite might have been proactive, but
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
    final damage = a.currentDamageCapability.tearingDamage;
    final situation = context.world.currentSituation as AttackerSituation;
    assert(situation.name == biteSituationName);

    final designation = situation.attackDirection.toBodyPartDesignation();
    assert(a.currentWeaponOrBodyPart != null);
    final result =
        executeTearingHit(enemy, a.currentWeaponOrBodyPart, designation);

    w.updateActorById(enemy.id, (b) => b.replace(result.victim));
    final thread = getThreadId(sim, w, biteSituationName);
    bool killed = !result.victim.isAnimated && !result.victim.isInvincible;
    if (!killed) {
      a.report(
          s,
          "<subject> {sink<s> <subject's> teeth|bite<s>} into "
          "<objectOwner's> <object>",
          objectOwner: result.victim,
          object: result.touchedPart,
          positive: true,
          actionThread: thread);

      // Summarize.
      a.report(s, "<subject> {lunge<s>|launch<es> <subjectPronounSelf>}",
          positive: true, actionThread: thread, replacesThread: true);
      a.report(
          s,
          "<subject> {sink<s> <subject's> teeth|bite<s>} into "
          "<objectOwner's> <object>",
          objectOwner: result.victim,
          object: result.touchedPart,
          positive: true,
          actionThread: thread,
          replacesThread: true);

      if (result.disabled &&
          (result.touchedPart.function == BodyPartFunction.damageDealing ||
              result.touchedPart.function == BodyPartFunction.mobile ||
              result.touchedPart.function == BodyPartFunction.wielding)) {
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
      inflictPain(context, result.victim.id, damage);
      if (result.wasBlinding) {
        result.victim.report(s, "<subject> <is> now blind", negative: true);
      }
    } else {
      a.report(
          s,
          "<subject's> teeth {rip|tear|bite} into "
          "<objectOwner's> <object>",
          objectOwner: result.victim,
          object: result.touchedPart,
          positive: true,
          actionThread: thread);

      // Summarize.
      a.report(s, "<subject> {lunge<s>|launch<es> <subjectPronounSelf>}",
          positive: true, actionThread: thread, replacesThread: true);
      a.report(
          s,
          "<subject's> teeth {rip|tear|bite} into "
          "<objectOwner's> <object>",
          objectOwner: result.victim,
          object: result.touchedPart,
          positive: true,
          actionThread: thread,
          replacesThread: true);

      killHumanoid(context, result.victim.id);
    }
    return "${a.name} bites${killed ? ' (and kills)' : ''} ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      a.currentDamageCapability.isTearing;
}
