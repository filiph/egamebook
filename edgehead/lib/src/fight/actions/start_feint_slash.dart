import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/feint/feint_defense/feint_defense_situation.dart';
import 'package:edgehead/src/fight/feint/feint_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';
import 'package:meta/meta.dart';

ReasonedSuccessChance computeStartFeint(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.8, const [
    Modifier(95, CombatReason.dexterity),
    Modifier(50, CombatReason.balance),
    Bonus(20, CombatReason.targetHasPrimaryArmDisabled),
    Bonus(30, CombatReason.targetHasOneLegDisabled),
    Bonus(50, CombatReason.targetHasOneEyeDisabled),
    Bonus(50, CombatReason.targetHasAllEyesDisabled),
    Bonus(50, CombatReason.performerIsPlayer),
  ]);
}

class FeintSlash extends StartDefensibleActionBase {
  static const String className = "FaintSlash";

  static final FeintSlash singleton = FeintSlash();

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  String helpMessage = "Feinting an attack helps luring your opponent from "
      "a defensive position. If successful, the enemy will be extended, "
      "and therefore vulnerable to follow up attack.";

  @protected
  String get attackVerb => 'slash';

  @override
  CombatCommandType get combatCommandType => CombatCommandType.stance;

  @protected
  FeintType get feintType => FeintType.slash;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> spoil "
      "<object's> stance?";

  @override
  bool get shouldShortCircuitWhenFailed => false;

  @override
  void applyShortCircuit(Actor actor, Simulation sim, WorldStateBuilder world,
      Storyline storyline, Actor enemy, Situation mainSituation) {
    throw StateError("This action doesn't short-circuit on failure.");
  }

  @override
  void applyStart(Actor actor, Simulation sim, WorldStateBuilder world,
      Storyline storyline, Actor enemy, Situation mainSituation) {
    actor.report(
        storyline,
        "<subject> tr<ies> to ruin <object's> stance "
        "with a feinted $attackVerb",
        object: enemy,
        actionThread: mainSituation.id);
  }

  @override
  DefenseSituation defenseSituationBuilder(Actor actor, Simulation sim,
      WorldStateBuilder world, Actor enemy, Predetermination predetermination) {
    return createFeintDefenseSituation(
        world.randomInt(), actor, enemy, predetermination);
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) =>
      'feint';

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      !a.isOnGround &&
      !a.anatomy.isBlind &&
      !enemy.anatomy.isBlind &&
      enemy.pose > Pose.extended &&
      !enemy.isBarehanded &&
      a.currentDamageCapability.isSlashing;

  @override
  Situation mainSituationBuilder(
      Actor actor, Simulation sim, WorldStateBuilder world, Actor enemy) {
    return createFeintSituation(world.randomInt(), actor, enemy, feintType);
  }

  @override
  ReasonedSuccessChance successChanceGetter(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    return computeStartFeint(a, sim, w, enemy);
  }
}
