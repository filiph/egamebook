import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_blunt_damage.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';
import 'package:edgehead/src/fight/common/fall.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/leap/leap_situation.dart';

class SwingBluntAtLeaper extends EnemyTargetAction {
  static final SwingBluntAtLeaper singleton = SwingBluntAtLeaper();

  static const String className = "SwingBluntAtLeaper";

  @override
  final String helpMessage = "I can swing at the enemy as they are leaping at "
      "me, exposed.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => ["swing"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> hit <objectPronoun>?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, leapSituationName);
    a.report(s, "<subject> tr<ies> to swing <object2> at <object>",
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
    w.popSituation(context);
    return "${a.name} fails to swing blunt weapon at ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;

    final groundMaterial = getGroundMaterial(w);

    final thread = getThreadId(sim, w, leapSituationName);
    a.report(s, "<subject> swing<s> <object2> at <object>",
        object: enemy,
        object2: a.currentWeaponOrBodyPart,
        positive: true,
        actionThread: thread);
    enemy.report(s, "<subject> {leap<s>|run<s>|lunge<s>} right into it",
        negative: true);

    const damage = 0;
    final result = executeBluntHit(
        enemy,
        a.currentWeaponOrBodyPart,
        enemy.isInvincible
            ? BodyPartDesignation.torso
            : BodyPartDesignation.head);

    w.updateActorById(enemy.id, (b) => b.replace(result.victim));
    bool killed = !result.victim.isAnimated && !result.victim.isInvincible;
    if (!killed) {
      a.report(
          s,
          "<subject> hit<s> <object's> "
          "${result.touchedPart.randomDesignation}",
          object: result.victim,
          positive: true,
          actionThread: thread);
      enemy.report(s, "<subject> {crash<es> to|land<s> on} the $groundMaterial",
          negative: true);
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
      enemy.report(s, "<subject> {crash<es> to|land<s> on} the $groundMaterial",
          negative: true);
      killHumanoid(context, result.victim.id);
    }

    // Mark this as "fell to ground" because the leap didn't go well.
    makeActorFall(context.world, w, s, result.victim);

    w.popSituationsUntil("FightSituation", context);
    return "${a.name} swings blunt weapon at ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final chance = getCombatMoveChance(a, enemy, 0.2, [
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
      !a.anatomy.isBlind && a.currentDamageCapability.isBlunt;
}
