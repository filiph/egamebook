// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/clash/clash_situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';

ReasonedSuccessChance computeCounterClash(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.2, w.statefulRandomState, const [
    Modifier(20, CombatReason.dexterity),
    Modifier(20, CombatReason.balance),
    ...disabledModifiers,
  ]);
}

class CounterAttackClash extends OtherActorAction {
  static final CounterAttackClash singleton = CounterAttackClash();

  static const String className = "CounterAttackClash";

  @override
  final String helpMessage = "By countering, I can try and steal "
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
    final thread = getThreadId(sim, w, clashSituationName);
    a.report(s, "<subject's> attempt to counter <objectOwner's> <object> fails",
        objectOwner: enemy,
        object: MoveEntity.getFromAttackerSituation(context.world),
        negative: true,
        actionThread: thread);
    w.popSituation(context);
    return "${a.name} fails to counter a clash from ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, clashSituationName);
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

    return "${a.name} successfully counters a clash from ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    return computeCounterClash(a, sim, w, enemy);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.anatomy.isBlind;
}
