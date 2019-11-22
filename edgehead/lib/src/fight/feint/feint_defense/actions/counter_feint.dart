import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/feint/feint_situation.dart';

ReasonedSuccessChance computeCounterFeint(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.3, const [
    Modifier(20, CombatReason.dexterity),
    Modifier(20, CombatReason.balance),
    Bonus(20, CombatReason.targetHasPrimaryArmDisabled),
    Bonus(30, CombatReason.targetHasOneLegDisabled),
    Bonus(50, CombatReason.targetHasOneEyeDisabled),
    Bonus(50, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class CounterAttackFeint extends OtherActorAction {
  static final CounterAttackFeint singleton = CounterAttackFeint();

  static const String className = "CounterAttackFeint";

  @override
  final String helpMessage = "By calling the bluff, I can try and steal "
      "the initiative.";

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => ["counter-attack"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject's> counter attack succeed?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, feintSituationName);
    a.report(s, "<subject's> attempt to counter <object's> feint fails",
        object: enemy, negative: true, actionThread: thread);
    w.popSituation(context);
    return "${a.name} fails to counter a feint from ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, feintSituationName);
    a.report(s, "<subject> <isn't> fooled", actionThread: thread);
    a.report(
        s,
        "<subject> {retain<s>|keep<s>} "
        "<subject's> {stance|footing}",
        positive: true,
        actionThread: thread);
    w.popSituationsUntil("FightSituation", context);

    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }

    var counterAttackSituation =
        CounterAttackSituation.initialized(w.randomInt(), a, enemy);
    w.pushSituation(counterAttackSituation);

    return "${a.name} successfully counters a feint from ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeCounterFeint(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.anatomy.isBlind;
}
