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
  // Major penalization when the actor just rolled out of the way.
  final didRecentlyRoll = recentlyRolledOutOfWay(w, a);
  final base = didRecentlyRoll ? 0.3 : 0.9;

  return getCombatMoveChance(a, enemy, base, w.statefulRandomState, [
    const Modifier(70, CombatReason.dexterity),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(90, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

bool recentlyRolledOutOfWay(WorldState w, Actor a) {
  // Major penalization when the actor just rolled out of the way.
  final recency = w.timeSinceLastActionRecord(
          actionName: RollOutOfWay.className, protagonist: a) ??
      1000;
  return recency < 5;
}

class RollOutOfWay extends OtherActorAction {
  static final RollOutOfWay singleton = RollOutOfWay();

  static const String className = "RollOutOfWay";

  @override
  final String? helpMessage = null;

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const ["roll out of way"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate =>
      "will <subject> evade?"; // TODO: come up with something

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> tr<ies> to roll out of the way");
    a.report(s, "<subject> can't", but: true);
    w.popSituation(context);
    return "${a.name} fails to roll out of the way";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> <is> able to roll out of the way",
        but: true, positive: true);
    if (a.isPlayer && a.anatomy.hasHealthyLegs) {
      w.updateActorById(a.id, (b) => b..pose = Pose.standing);
      a.report(s, "<subject> jump<s> up on <subject's> feet", positive: true);
    }
    w.popSituationsUntil("FightSituation", context);
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
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      !a.anatomy.isBlind;
}
