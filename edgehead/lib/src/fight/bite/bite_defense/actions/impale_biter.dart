import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_thrusting_damage.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/bite/bite_situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';

class ImpaleBiter extends OtherActorAction {
  static final ImpaleBiter singleton = ImpaleBiter();

  static const String className = "ImpaleBiter";

  @override
  final String helpMessage = "You can move your weapon to point at "
      "the attacker. If successful, the weapon will pierce the attacker "
      "with the force of his own lunge.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => ["impale"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> impale <objectPronoun>?";

  /// This is a 99% copy of [ImpaleLeaper.applyFailure] (except for situation
  /// name in [getThreadId]).
  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, biteSituationName);

    a.report(
        s,
        "<subject> tr<ies> to {move|swing|shift} "
        "<object2> between <subjectPronounSelf> "
        "and <object>",
        object: enemy,
        object2: a.currentWeaponOrBodyPart,
        actionThread: thread);
    if (a.pose == Pose.offBalance) {
      a.report(s, "<subject> <is> out of balance",
          but: true, actionThread: thread);
    } else if (a.pose == Pose.extended) {
      a.report(s, "<subject> <is> extended", but: true, actionThread: thread);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {can't|fail<s>|<does>n't succeed}",
              but: true, actionThread: thread),
          () => a.report(s, "<subject> {<is> too slow|<isn't> fast enough}",
              but: true, actionThread: thread));
    }
    w.popSituation(sim);
    return "${a.name} fails to impale ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final situation =
        w.getSituationByName<AttackerSituation>(biteSituationName);
    final thread = situation.id;

    a.report(
        s,
        "<subject> {move<s>|swing<s>|shift<s>} "
        "<object2> between <subjectPronounSelf> "
        "and <object>",
        object: enemy,
        object2: a.currentWeaponOrBodyPart,
        positive: true,
        actionThread: thread);
    enemy.report(s, "<subject> {leap<s>|run<s>|lunge<s>} right into it",
        actionThread: thread, negative: true);

    // Picks a body part randomly, giving torso a higher chance.
    final designation = w.randomChoose(const <BodyPartDesignation>[
      BodyPartDesignation.torso,
      BodyPartDesignation.torso,
      BodyPartDesignation.neck,
      BodyPartDesignation.leftEye,
      BodyPartDesignation.rightEye,
    ]);

    const damage = 1;
    final result =
        executeThrustingHit(enemy, a.currentWeaponOrBodyPart, designation);

    // The following is taken almost verbatim from finish_thrust.dart.
    w.updateActorById(enemy.id, (b) => b.replace(result.victim));
    bool killed = !result.victim.isAnimated && !result.victim.isInvincible;
    if (!killed) {
      a.currentWeaponOrBodyPart.report(
          s,
          "<subject> {cut<s> into|pierce<s>|go<es> into} "
          "<objectOwner's> <object>",
          objectOwner: result.victim,
          object: result.touchedPart,
          actionThread: thread);

      // Summarize since beginning.
      enemy.report(
          s,
          "<subject> {lunge<s>|spring<s>|launch<es> <subjectPronounSelf>} "
          "at <objectOwner's> <object>, "
          "{teeth bared|jaws open|"
          "ready to {bite|gnaw|sink <subject's> teeth into <object>}}",
          endSentence: true,
          objectOwner: a,
          object: a.anatomy.findByDesignation(
              situation.attackDirection.toBodyPartDesignation()),
          actionThread: thread,
          replacesThread: true);
      enemy.report(
          s,
          "<subject> only impale<s> <subject's> <object2> "
          "on <objectOwner's> <object>",
          but: true,
          object2: result.touchedPart,
          objectOwner: a,
          object: a.currentWeaponOrBodyPart,
          negative: true,
          actionThread: thread,
          replacesThread: true);

      // Other effects.
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
      inflictPain(context, enemy.id, damage,
          extremePain: result.touchedPart.designation.isHumanoidEye);
      if (result.wasBlinding) {
        result.victim.report(s, "<subject> <is> now blind", negative: true);
      }
    } else {
      // Killed.
      a.currentWeaponOrBodyPart.report(
          s,
          "<subject> {go<es> right through|completely impale<s>|"
          "bore<s> through} <objectOwner's> <object>",
          objectOwner: result.victim,
          object: result.touchedPart,
          actionThread: thread);

      // Summarize since beginning.
      enemy.report(
          s,
          "<subject> {lunge<s>|spring<s>|launch<es> <subjectPronounSelf>} "
          "at <objectOwner's> <object>, "
          "{teeth bared|jaws open|"
          "ready to {bite|gnaw|sink <subject's> teeth into <object>}}",
          endSentence: true,
          objectOwner: a,
          object: a.anatomy.findByDesignation(
              situation.attackDirection.toBodyPartDesignation()),
          actionThread: thread,
          replacesThread: true);
      enemy.report(
          s,
          "<subject> only impale<s> <subject's> <object2> "
          "on <objectOwner's> <object>",
          but: true,
          object2: result.touchedPart,
          objectOwner: a,
          object: a.currentWeaponOrBodyPart,
          negative: true,
          actionThread: thread,
          replacesThread: true);

      killHumanoid(context, enemy.id);
    }

    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} impales ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final chance = getCombatMoveChance(a, enemy, 0.3, [
      const Modifier(40, CombatReason.dexterity),
      const Modifier(30, CombatReason.height),
      const Modifier(20, CombatReason.balance),
      const Bonus(30, CombatReason.targetHasOneLegDisabled),
      const Bonus(50, CombatReason.targetHasAllLegsDisabled),
      const Bonus(50, CombatReason.targetHasAllEyesDisabled),
    ]);
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance.or(chance);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.isOnGround &&
      !a.anatomy.isBlind &&
      a.currentDamageCapability.isThrusting;
}
