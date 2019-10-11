import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/thrust_on_ground/thrust_on_ground_defense/thrust_defense_situation.dart';
import 'package:edgehead/src/fight/thrust_on_ground/thrust_on_ground_situation.dart';

const String startThrustOnGroundHelpMessage =
    "The basic move with a pointy weapon.";

/// There are several ways to defend against a thrust. But,
/// for simplicity, _player's_ strike will assume an average effort
/// from the defender, and will compute a predetermined result from that.
///
/// The reaction is then basically selected randomly. Because success/failure
/// are predetermined, there is little difference for the planner between
/// the various defense moves.
ReasonedSuccessChance computeStartThrustOnGroundPlayer(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  assert(a.isPlayer);
  return getCombatMoveChance(a, enemy, 0.1, [
    const Modifier(20, CombatReason.dexterity),
    const Penalty(60, CombatReason.targetHasShield),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction startThrustOnGroundBuilder() => StartDefensibleAction(
      name: "StartThrustOnGround",
      combatCommandType: CombatCommandType.body,
      commandPathTail: "thrust at <object>",
      helpMessage: startThrustOnGroundHelpMessage,
      applyStart: startThrustOnGroundReportStart,
      isApplicable: (a, sim, w, enemy) =>
          a.isOnGround &&
          enemy.isOnGround &&
          !a.anatomy.isBlind &&
          a.currentDamageCapability.isThrusting,
      mainSituationBuilder: (a, sim, w, enemy) =>
          createThrustOnGroundSituation(w.randomInt(), a, enemy),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createThrustOnGroundDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeStartThrustOnGroundPlayer,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <objectPronoun>?",
    );

void startThrustOnGroundReportStart(Actor a, Simulation sim,
    WorldStateBuilder w, Storyline s, Actor enemy, Situation mainSituation) {
  Randomly.run(
    () => a.report(s, "<subject> thrust<s> at <object>",
        object: enemy, actionThread: mainSituation.id, startsThread: true),
    () => a.report(s, "<subject> thrust<s> <object2> at <object>",
        object: enemy,
        object2: a.currentWeapon,
        actionThread: mainSituation.id,
        startsThread: true),
  );
}
