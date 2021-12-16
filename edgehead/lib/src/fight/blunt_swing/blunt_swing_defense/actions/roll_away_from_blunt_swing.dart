import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

ReasonedSuccessChance computeRollAwayFromBluntSwing(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.5, w.statefulRandomState, [
    const Modifier(90, CombatReason.dexterity),
    const Modifier(10, CombatReason.balance),
    const Bonus(20, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(30, CombatReason.targetHasOneEyeDisabled),
    const Bonus(50, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class RollAwayFromBluntSwing extends OtherActorAction {
  static final RollAwayFromBluntSwing singleton = RollAwayFromBluntSwing();

  static const String className = "RollAwayFromBluntSwing";

  @override
  final String helpMessage = "Roll away so that the weapon can't reach me.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => ["roll away"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> avoid the swing?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> tr<ies> to roll away "
        "but <subject> <is> {not fast enough|too slow}.",
        wholeSentence: true);
    w.popSituation(context);
    return "${a.name} fails to roll away from ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final groundMaterial = getGroundMaterial(w);
    a.report(s, "<subject> roll<s> {away|off}", positive: true);
    s.add("<owner's> <subject> {hit<s>|crash<es> into} the $groundMaterial",
        subject: enemy.currentWeaponOrBodyPart, owner: enemy);
    w.popSituationsUntil("FightSituation", context);
    return "${a.name} rolls away from ${enemy.name}'s attack";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation! as DefenseSituation;
    return situation.predeterminedChance
        .or(computeRollAwayFromBluntSwing(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      a.isOnGround;
}
