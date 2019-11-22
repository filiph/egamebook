import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/sweep_feet/sweep_feet_situation.dart';

ReasonedSuccessChance computeAvoidSweep(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.7, const [
    Modifier(30, CombatReason.dexterity),
    Modifier(20, CombatReason.balance),
    Bonus(30, CombatReason.targetHasOneLegDisabled),
    Bonus(50, CombatReason.targetHasOneEyeDisabled),
    Bonus(50, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class AvoidSweepFeet extends OtherActorAction {
  static final AvoidSweepFeet singleton = AvoidSweepFeet();

  static const String className = "AvoidSweepFeet";

  @override
  final String helpMessage = "The safest bet is to just avoid the sweep.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const ["avoid"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> avoid the sweep?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    w.popSituation(context);
    return "${a.name} fails to avoid a sweep from ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, sweepFeetSituationName);
    a.report(s, "<subject> avoid<s> the foot sweep", actionThread: thread);
    a.report(s, "<subject> {keep<s> standing|stay<s> upright}",
        positive: true, actionThread: thread);
    w.popSituationsUntil("FightSituation", context);
    return "${a.name} avoid a sweep from ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeAvoidSweep(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.anatomy.isBlind;
}
