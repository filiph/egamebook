// @dart=2.9

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
import 'package:edgehead/src/fight/sweep_feet/sweep_feet_defense/sweep_feet_defense_situation.dart';
import 'package:edgehead/src/fight/sweep_feet/sweep_feet_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

ReasonedSuccessChance computeStartSweepFeet(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  assert(a.isPlayer);
  return getCombatMoveChance(a, enemy, 0.6, w.statefulRandomState, [
    const Modifier(70, CombatReason.dexterity),
    const Modifier(70, CombatReason.balance),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class SweepFeet extends StartDefensibleActionBase {
  static const String className = "SweepFeet";

  static final SweepFeet singleton = SweepFeet();

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final String helpMessage = "Sweeping the opponent's feet away doesn't "
      "deal much damage but on the ground they will be much easier targets "
      "for me and my allies.";

  @override
  CombatCommandType get combatCommandType => CombatCommandType.stance;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> trip <object> up?";

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
    actor.report(storyline,
        "<subject> tr<ies> to kick <object's> feet from under <object>",
        object: enemy, actionThread: mainSituation.id, startsThread: true);
  }

  @override
  DefenseSituation defenseSituationBuilder(Actor actor, Simulation sim,
      WorldStateBuilder world, Actor enemy, Predetermination predetermination) {
    return createSweepFeetDefenseSituation(
        world.randomInt(), actor, enemy, predetermination);
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) =>
      "sweep feet";

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      a.pose > Pose.onGround &&
      a.anatomy.hasHealthyLegs &&
      !enemy.isOnGround &&
      !a.anatomy.isBlind &&
      enemy.pose <= Pose.extended;

  @override
  Situation mainSituationBuilder(
      Actor actor, Simulation sim, WorldStateBuilder world, Actor enemy) {
    return createSweepFeetSituation(world.randomInt(), actor, enemy);
  }

  @override
  ReasonedSuccessChance successChanceGetter(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    return computeStartSweepFeet(a, sim, w, enemy);
  }
}
