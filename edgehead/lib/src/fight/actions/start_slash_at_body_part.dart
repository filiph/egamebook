import 'dart:math' as math;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';

const String startSlashHelpMessage =
    "Slashing at a specific body part is really hard to pull off. ";

/// There are several ways to defend against a slash. But, for simplicity,
/// _player's_ slash will assume an average effort from the defender,
/// and will compute a predetermined result from that.
///
/// The reaction is then basically selected randomly. Because success/failure
/// are predetermined, there is little difference for the planner between
/// the various defense moves.
ReasonedSuccessChance computeStartSlashAtBodyPartGenerator(
    BodyPart bodyPart, Actor a, Simulation sim, WorldState w, Actor enemy) {
  const minBase = 0.01;
  const maxBase = 0.5;
  final relativeSlashSurface = math.min(
      math.max(bodyPart.swingSurfaceLeft, bodyPart.swingSurfaceRight) / 10, 1);
  final base = minBase + maxBase * relativeSlashSurface;

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

/// Higher order function that generates an [ActionBuilder] depending on
/// the provided [BodyPartDesignation].
EnemyTargetAction startSlashAtBodyPartGenerator(
    BodyPartDesignation designation) {
  return StartDefensibleAction(
    name: "StartSlashAt$designation",
    commandTemplate: startSlashCommandTemplate(designation),
    commandPathTemplate: startSlashCommandPathTemplate(designation),
    helpMessage: startSlashHelpMessage,
    applyStart: startSlashReportStart(designation),
    isApplicable: (Actor a, Simulation sim, WorldState w, Actor enemy) =>
        _resolveIsApplicable(a, sim, w, enemy, designation),
    mainSituationBuilder: (a, sim, w, enemy) =>
        createSlashSituation(w.randomInt(), a, enemy, designation: designation),
    defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
        createSlashDefenseSituation(w.randomInt(), a, enemy, predetermination),
    successChanceGetter: (Actor a, Simulation sim, WorldState w, Actor enemy) {
      final bodyPart = enemy.anatomy.findByDesignation(designation);
      return computeStartSlashAtBodyPartGenerator(bodyPart, a, sim, w, enemy);
    },
    rerollable: true,
    rerollResource: Resource.stamina,
    rollReasonTemplate:
        "will <subject> hit <objectPronoun's> ${designation.toHumanString()}?",
  );
}

List<String> startSlashCommandPathTemplate(BodyPartDesignation designation) {
  bool kill = designation == BodyPartDesignation.head ||
      designation == BodyPartDesignation.neck ||
      designation == BodyPartDesignation.torso;
  return [
    "attack <object>",
    kill ? "kill" : "maim",
    "slash <objectPronoun's> ${designation.toHumanString()}"
  ];
}

String startSlashCommandTemplate(BodyPartDesignation designation) {
  return "slash <object's> ${designation.toHumanString()}";
}

/// Creates the [StartDefensibleAction.applyStart] function for given
/// [designation].
PartialApplyFunction startSlashReportStart(BodyPartDesignation designation) =>
    (Actor a, Simulation sim, WorldStateBuilder w, Storyline s, Actor enemy,
            Situation mainSituation) =>
        a.report(
            s,
            "<subject> swing<s> {${weaponAsObject2(a)} |}at "
            "<objectOwner's> <object>",
            object: Entity(name: designation.toHumanString()),
            objectOwner: enemy,
            actionThread: mainSituation.id,
            isSupportiveActionInThread: true);

bool _resolveIsApplicable(Actor a, Simulation sim, WorldState w, Actor enemy,
    BodyPartDesignation designation) {
  assert(!designation.isLeg, "Use SlashAtLeg instead.");
  assert(!designation.isArm, "Use SlashAtArm instead.");
  if (a.isOnGround) return false;
  if (enemy.isOnGround) return false;
  if (a.anatomy.isBlind) return false;
  if (!a.currentWeapon.damageCapability.isSlashing) return false;
  // Only allow torso slashes when enemy is (at least) extended.
  if (designation == BodyPartDesignation.torso && enemy.pose > Pose.extended) {
    return false;
  }
  // Only allow decapitation when enemy is (at least) off balance.
  if (designation == BodyPartDesignation.neck && enemy.pose > Pose.offBalance) {
    return false;
  }
  // Don't offer to hit body parts that are already crippled.
  if (!enemy.anatomy.findByDesignation(designation).isAlive) return false;

  return true;
}
