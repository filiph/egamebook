import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
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
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

ReasonedSuccessChance computeDodgeBite(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.5, [
    const Modifier(60, CombatReason.dexterity),
    const Modifier(50, CombatReason.balance),
    const Bonus(50, CombatReason.targetHasOneLegDisabled),
    const Bonus(90, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class DodgeBite extends OtherActorAction {
  static final DodgeBite singleton = DodgeBite();

  static const String className = "DodgeBite";

  @override
  final String helpMessage = "Dodging means moving my body out of harm's "
      "way. When done correctly, the enemy's momentum will carry them "
      "right past me, and I'll have a chance to counter attack. "
      "When botched, I will get bitten.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => ["dodge and counter"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> dodge?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, biteSituationName);

    final dodgeDescription =
        a.isOnGround ? '{dodge|roll out of the way}' : '{dodge|sidestep}';
    a.report(s, "<subject> tr<ies> to $dodgeDescription", actionThread: thread);
    if (a.pose == Pose.offBalance) {
      a.report(s, "<subject> <is> out of balance",
          but: true, actionThread: thread);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {can't|fail<s>|<does>n't succeed}",
              but: true, actionThread: thread),
          () => enemy.report(s, "<subject> <is> too quick for <object>",
              object: a, but: true, actionThread: thread));
    }
    w.popSituation(context);
    return "${a.name} fails to dodge ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, biteSituationName);

    if (a.isOnGround) {
      a.report(s, "<subject> roll<s> out of the way",
          positive: true, actionThread: thread);
    } else {
      a.report(s, "<subject> {dodge<s>|sidestep<s>} <objectPronoun>",
          object: MoveEntity.getFromAttackerSituation(context.world),
          positive: true,
          actionThread: thread);
    }

    assert(enemy.anatomy.isHumanoid,
        "Not prepared for non-humanoids. They should fall to ground.");

    if (a.isOnGround) {
      // If the actor is on the ground, the enemy must have landed
      // on the ground as well.
      final groundMaterial = getGroundMaterial(w);
      enemy.report(
          s,
          "<subject> {land<s>|crash<es>|hit<s> the $groundMaterial} "
          "next to <object>",
          object: a,
          negative: true,
          actionThread: thread);
      w.updateActorById(enemy.id, (b) => b.pose = Pose.onGround);
    } else if (enemy.pose > Pose.offBalance) {
      // If the actor _isn't_ on the ground, then the attacker
      // at least staggers.
      enemy.report(
          s,
          "<subject> {stagger<s>|stumble<s>|lurch<es>|sway<s>} "
          "next to <object>",
          object: a,
          negative: true,
          actionThread: thread);
      w.updateActorById(enemy.id, (b) => b.pose = Pose.offBalance);
    }

    w.popSituationsUntil("FightSituation", context);

    if (a.isOnGround) {
      // No counter attack from ground.
      return "${a.name} dodges ${enemy.name} on ground";
    }

    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }
    var counterAttackSituation =
        CounterAttackSituation.initialized(w.randomInt(), a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} dodges ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance.or(computeDodgeBite(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.anatomy.isBlind;
}
