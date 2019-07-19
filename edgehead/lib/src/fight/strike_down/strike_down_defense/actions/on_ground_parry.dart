import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';

ReasonedSuccessChance computeOnGroundParry(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.5, [
    const Modifier(70, CombatReason.dexterity),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

/// TODO: find a reason why to take this choice. Maybe allow counter?
class OnGroundParry extends OtherActorAction {
  static final OnGroundParry singleton = OnGroundParry();

  static const String className = "OnGroundParry";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final String helpMessage = "Why would you move? Just put your weapon up.";

  @override
  List<String> get commandPathTemplate => ["parry it"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> parry it?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> tr<ies> to {parry|deflect it|"
        "stop it{| with <object2>}}",
        object2: a.currentWeaponOrBodyPart);
    Randomly.run(
        () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    w.popSituation(sim);
    return "${a.name} fails to parry ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> {parr<ies> it|"
        "stop<s> it with <object2>}",
        object2: a.currentWeaponOrBodyPart,
        positive: true);
    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} parries ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeOnGroundParry(a, sim, w, enemy));
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      !a.anatomy.isBlind &&
      enemy.currentDamageCapability.isSlashing &&
      a.currentDamageCapability.type.canParrySlash;
}
