// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/strike_from_ground/strike_from_ground_situation.dart';

ReasonedSuccessChance computeStepBack(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.7, w.statefulRandomState, [
    const Modifier(95, CombatReason.dexterity),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(90, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class StepBackFromStrikeFromGround extends OtherActorAction {
  static final StepBackFromStrikeFromGround singleton =
      StepBackFromStrikeFromGround();

  static const String className = "StepBackFromStrikeFromGround";

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
  List<String> get commandPathTemplate => const ["step back"];

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
    return "${a.name} fails to step back in time";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Simulation sim = context.simulation;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, strikeFromGroundSituationName);
    a.report(s, "<subject> <is> able to step back in time",
        but: true, positive: true, actionThread: thread);
    w.popSituationsUntil("FightSituation", context);
    return "${a.name} steps back from ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance.or(computeStepBack(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      true;
}
