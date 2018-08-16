import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';

ReasonedSuccessChance computeRollOutOfWay(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.9, [
    const Bonus(95, CombatReason.dexterity),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(90, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class RollOutOfWay extends OtherActorAction {
  static final RollOutOfWay singleton = new RollOutOfWay();

  static const String className = "RollOutOfWay";

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
  String get commandTemplate => "roll out of way";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate =>
      "will <subject> evade?"; // TODO: come up with something

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> tr<ies> to roll out of the way");
    a.report(s, "<subject> can't", but: true);
    w.popSituation(sim);
    return "${a.name} fails to roll out of the way";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> <is> able to roll out of the way",
        but: true, positive: true);
    if (a.isPlayer) {
      w.updateActorById(a.id, (b) => b..pose = Pose.standing);
      a.report(s, "<subject> jump<s> up on <subject's> feet", positive: true);
    }
    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} rolls out of the way of ${enemy.name}'s strike";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeRollOutOfWay(a, sim, w, enemy));
  }

  @override
  bool isApplicable(
          Actor actor, Simulation sim, WorldState world, Actor enemy) =>
      true;
}
