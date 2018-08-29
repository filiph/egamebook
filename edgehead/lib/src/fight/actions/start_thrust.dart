import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/thrust_defense_situation.dart';
import 'package:edgehead/src/fight/thrust/thrust_situation.dart';

String startThrustCommandTemplate(BodyPartDesignation designation) {
  return "attack <object> >> by thrusting at >> <object's> $designation";
}

const String startThrustHelpMessage = "The basic move with a pointy weapon.";

/// There are several ways to defend against a thrust. But, for simplicity,
/// _player's_ thrust will assume an average effort from the defender,
/// and will compute a predetermined result from that.
///
/// The reaction is then basically selected randomly. Because success/failure
/// are predetermined, there is little difference for the planner between
/// the various defense moves.
ReasonedSuccessChance computeStartThrustSpearPlayer(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.5, [
    const Bonus(50, CombatReason.dexterity),
    const Bonus(30, CombatReason.targetWithoutShield),
    const Bonus(30, CombatReason.balance),
    const Bonus(20, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(20, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction startThrustAtBodyPartGenerator(
    BodyPartDesignation designation) {
  return StartDefensibleAction(
    name: "StartThrust",
    commandTemplate: startThrustCommandTemplate(designation),
    helpMessage: startThrustHelpMessage,
    applyStart: startThrustReportStart,
    isApplicable: (a, sim, w, enemy) =>
        !a.isOnGround &&
        !enemy.isOnGround &&
        a.anatomy.anyWeaponAppendageAvailable &&
        a.currentWeapon.damageCapability.isThrusting,
    mainSituationBuilder: (a, sim, w, enemy) => createThrustSituation(
        w.randomInt(), a, enemy,
        designation: designation),
    defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
        createThrustDefenseSituation(w.randomInt(), a, enemy, predetermination),
    successChanceGetter: computeStartThrustSpearPlayer,
    rerollable: true,
    rerollResource: Resource.stamina,
    rollReasonTemplate: "will <subject> hit <objectPronoun>?",
  );
}

void startThrustReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation mainSituation) =>
    a.report(s, "<subject> thrust<s> {${weaponAsObject2(a)} |}at <object>",
        object: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);
