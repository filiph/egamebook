import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/lerp.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/thrust_defense_situation.dart';
import 'package:edgehead/src/fight/thrust/thrust_situation.dart';

const String startThrustHelpMessage = "The basic move with a pointy weapon.";

ReasonedSuccessChance computeThrustAtBodyPartChance(
    BodyPartDesignation designation,
    Actor a,
    Simulation sim,
    WorldState w,
    Actor enemy) {
  assert(a.isPlayer);
  final bodyPart = enemy.anatomy.findByDesignation(designation);

  const minBase = 0.01;
  const maxBase = 0.3;
  final base = lerpDouble(bodyPart.thrustSurface, 0, 8, minBase, maxBase);

  return getCombatMoveChance(a, enemy, base, [
    const Modifier(30, CombatReason.dexterity),
    const Penalty(30, CombatReason.targetHasShield),
    const Modifier(30, CombatReason.balance),
    const Bonus(20, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(50, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(90, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction startThrustAtBodyPartGenerator(
    BodyPartDesignation designation) {
  return StartDefensibleAction(
    name: "StartThrust",
    combatCommandType: _startThrustCombatCommandType(designation),
    commandPathTail: _startThrustCommandPathTail(designation),
    helpMessage: startThrustHelpMessage,
    applyStart: startThrustReportStart(designation),
    isApplicable: (a, sim, w, enemy) =>
        !a.isOnGround &&
        !enemy.isOnGround &&
        !a.anatomy.isBlind &&
        a.currentDamageCapability.isThrusting &&
        // Only allow thrusting when stance is worse than combat stance.
        enemy.pose < Pose.combat &&
        // Don't allow fatal slashes for invincible actors.
        !(enemy.isInvincible &&
            enemy.anatomy.findByDesignation(designation).isVital),
    mainSituationBuilder: (a, sim, w, enemy) => createThrustSituation(
        w.randomInt(), a, enemy,
        designation: designation),
    defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
        createThrustDefenseSituation(w.randomInt(), a, enemy, predetermination),
    successChanceGetter: (Actor a, Simulation sim, WorldState w, Actor enemy) {
      return computeThrustAtBodyPartChance(designation, a, sim, w, enemy);
    },
    rerollable: true,
    rerollResource: Resource.stamina,
    rollReasonTemplate: "will <subject> hit <objectPronoun>?",
  );
}

String _startThrustCommandPathTail(BodyPartDesignation designation) {
  return "stab <objectPronoun's> ${designation.toHumanString()}";
}

CombatCommandType _startThrustCombatCommandType(
    BodyPartDesignation designation) {
  bool body = designation == BodyPartDesignation.head ||
      designation == BodyPartDesignation.neck ||
      designation == BodyPartDesignation.torso;
  return body ? CombatCommandType.body : CombatCommandType.limbs;
}

PartialApplyFunction startThrustReportStart(BodyPartDesignation designation) =>
    (Actor a, Simulation sim, WorldStateBuilder w, Storyline s, Actor enemy,
        Situation mainSituation) {
      Randomly.run(
        () => a.report(
            s,
            "<subject> thrust<s> at "
            "<objectOwner's> <object>",
            object: Entity(name: designation.toHumanString()),
            objectOwner: enemy,
            actionThread: mainSituation.id,
            startsThread: true),
        () => a.report(
            s,
            "<subject> thrust<s> <object2> at "
            "<objectOwner's> <object>",
            object: Entity(name: designation.toHumanString()),
            objectOwner: enemy,
            object2: a.currentWeapon,
            actionThread: mainSituation.id,
            startsThread: true),
      );
    };
