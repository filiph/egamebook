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
import 'package:edgehead/src/fight/strike_from_ground/strike_from_ground_defense/strike_from_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_from_ground/strike_from_ground_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

ReasonedSuccessChance computeStartPullDown(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.05, [
    const Modifier(20, CombatReason.dexterity),
    const Modifier(10, CombatReason.balance),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(10, CombatReason.targetHasOneEyeDisabled),
    const Bonus(30, CombatReason.targetHasAllEyesDisabled),
    const Penalty(50, CombatReason.performerHasLimitedMobility),
    const Penalty(50, CombatReason.performerHasLimitedVision),
  ]);
}

/// This is a desperate move when the actor cannot stand up and has
/// no weapon to throw or use against a standing opponent..
class PullDown extends StartDefensibleActionBase {
  static const String className = "PullDownWhileCrippled";

  static final PullDown singleton = PullDown();

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final String helpMessage =
      "Risky move. The opponent is standing and I am not. "
      "This is one way to level the field.";

  @override
  CombatCommandType get combatCommandType => CombatCommandType.stance;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> bring <object> down?";

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
    actor.report(storyline, "<subject> crawl<s> toward <object>",
        object: enemy, actionThread: mainSituation.id, startsThread: true);
    actor.report(storyline, "<subject> tr<ies> to bring <object> down",
        object: enemy, actionThread: mainSituation.id);
  }

  @override
  DefenseSituation defenseSituationBuilder(Actor actor, Simulation sim,
      WorldStateBuilder world, Actor enemy, Predetermination predetermination) {
    return createStrikeFromGroundDefenseSituation(
        world.randomInt(), actor, enemy, predetermination);
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) =>
      "pull down";

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      a.pose == Pose.onGround && !enemy.isOnGround && !a.anatomy.isBlind;

  @override
  Situation mainSituationBuilder(
      Actor actor, Simulation sim, WorldStateBuilder world, Actor enemy) {
    return createStrikeFromGroundSituation(world.randomInt(), actor, enemy);
  }

  @override
  ReasonedSuccessChance successChanceGetter(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    return computeStartPullDown(a, sim, w, enemy);
  }
}
