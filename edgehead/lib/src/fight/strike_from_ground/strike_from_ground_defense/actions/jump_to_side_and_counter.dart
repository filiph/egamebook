import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/strike_from_ground/strike_from_ground_situation.dart';

ReasonedSuccessChance computeJumpToSide(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.4, [
    const Modifier(60, CombatReason.dexterity),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(30, CombatReason.targetHasOneEyeDisabled),
    const Bonus(70, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class JumpToSideFromStrikeFromGround extends OtherActorAction {
  static final JumpToSideFromStrikeFromGround singleton =
      JumpToSideFromStrikeFromGround();

  static const String className = "JumpToSideFromStrikeFromGround";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const ["jump to side & counter"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> evade?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Simulation sim = context.simulation;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, strikeFromGroundSituationName);
    a.report(s, "<subject> tr<ies> to evade", actionThread: thread);
    a.report(s, "<subject> can't", actionThread: thread, but: true);
    w.popSituation(context);
    return "${a.name} fails to jump to side";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Simulation sim = context.simulation;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, strikeFromGroundSituationName);
    a.report(s, "<subject> jump<s> to the side",
        but: true, positive: true, actionThread: thread);
    w.popSituationsUntil("FightSituation", context);

    var counterAttackSituation =
        CounterAttackSituation.initialized(w.randomInt(), a, enemy);
    w.pushSituation(counterAttackSituation);

    return "${a.name} jumps away from ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeJumpToSide(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      a.anatomy.hasHealthyLegs;
}
