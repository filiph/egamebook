import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/common/fall.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/leap/leap_situation.dart';

class ImpaleLeaper extends EnemyTargetAction {
  static final ImpaleLeaper singleton = ImpaleLeaper();

  static const String className = "ImpaleLeaper";

  @override
  final String helpMessage = "I can move my weapon to point at "
      "the attacker. If successful, the weapon will pierce the attacker "
      "with the force of his own leap.";

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

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, leapSituationName);
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
    w.popSituation(context);
    return "${a.name} fails to impale ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, leapSituationName);
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
        negative: true);
    final damage = enemy.isInvincible ? 0 : 1;
    w.updateActorById(enemy.id, (b) => b..hitpoints -= damage);
    final updatedEnemy = w.getActorById(enemy.id);
    bool killed = !updatedEnemy.isAnimated && !enemy.isInvincible;
    if (!killed) {
      a.currentWeaponOrBodyPart.report(
          s,
          "<subject> {cut<s> into|pierce<s>|go<es> into} "
          "<object's> flesh",
          object: updatedEnemy);
      inflictPain(context, enemy.id, damage,
          enemy.anatomy.findByDesignation(BodyPartDesignation.torso));
      updatedEnemy.report(s, "<subject> fall<s> to the ground");
      makeActorFall(context.world, w, s, updatedEnemy);
    } else {
      a.currentWeaponOrBodyPart.report(
          s,
          "<subject> {go<es> right through|completely impale<s>|"
          "bore<s> through} <object's> {body|chest|stomach|neck}",
          object: updatedEnemy);
      updatedEnemy.report(s, "<subject> go<es> down", negative: true);
      makeActorFall(context.world, w, s, updatedEnemy);
      killHumanoid(context, enemy.id);
    }

    w.popSituationsUntil("FightSituation", context);
    return "${a.name} impales ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final chance = getCombatMoveChance(a, enemy, 0.4, [
      const Modifier(50, CombatReason.dexterity),
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
      !a.anatomy.isBlind && a.currentDamageCapability.isThrusting;
}
