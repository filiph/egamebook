import 'dart:math' as math;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';

const String startSlashHelpMessage =
    "Slashing at a specific body part is really hard to pull off. Then again, "
    "disabling that particular body part might be worth the risk.";

/// There are several ways to defend against a slash. But, for simplicity,
/// _player's_ slash will assume an average effort from the defender,
/// and will compute a predetermined result from that.
///
/// The reaction is then basically selected randomly. Because success/failure
/// are predetermined, there is little difference for the planner between
/// the various defense moves.
ReasonedSuccessChance computeStartSlashAtBodyPartGenerator(
    BodyPart bodyPart, Actor a, Simulation sim, WorldState w, Actor enemy) {
  assert(a.isPlayer);

  const minBase = 0.1;
  const maxBase = 0.7;
  final relativeSlashSurface = math.min(
      math.max(bodyPart.swingSurfaceLeft, bodyPart.swingSurfaceRight) / 10, 1);
  final base = minBase + maxBase * relativeSlashSurface;

  return getCombatMoveChance(a, enemy, base, w.statefulRandomState, const [
    Modifier(30, CombatReason.dexterity),
    Modifier(30, CombatReason.balance),
    Modifier(30, CombatReason.weaponReach),
    Penalty(30, CombatReason.targetHasShield),
    ...disabledModifiers,
  ]);
}

/// Higher order function that generates an [ActionBuilder] depending on
/// the provided [BodyPartDesignation].
EnemyTargetAction startSlashAtBodyPartGenerator(
    BodyPartDesignation designation) {
  return StartDefensibleAction(
    name: "StartSlashAt$designation",
    combatCommandType: _startSlashCombatCommandType(designation),
    commandPathTail: _startSlashCommandPathTail(designation),
    helpMessage: startSlashHelpMessage,
    applyStart: startSlashReportStart(designation),
    isApplicable: (Actor a, Simulation sim, WorldState w, Actor enemy) =>
        _resolveIsApplicable(a, sim, w, enemy, designation),
    mainSituationBuilder: (a, sim, w, enemy) =>
        createSlashSituation(w.randomInt(), a, enemy, designation: designation),
    defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
        createSlashDefenseSituation(w.randomInt(), a, enemy, predetermination),
    successChanceGetter: (Actor a, Simulation sim, WorldState w, Actor enemy) {
      final bodyPart = enemy.anatomy.findByDesignation(designation)!;
      return computeStartSlashAtBodyPartGenerator(bodyPart, a, sim, w, enemy);
    },
    rerollable: true,
    rerollResource: Resource.stamina,
    rollReasonTemplate:
        "will <subject> hit <objectPronoun's> ${designation.toHumanString()}?",
  );
}

String _startSlashCommandPathTail(BodyPartDesignation designation) {
  return "slash <objectPronoun's> ${designation.toHumanString()}";
}

CombatCommandType _startSlashCombatCommandType(
    BodyPartDesignation designation) {
  bool body = designation == BodyPartDesignation.head ||
      designation == BodyPartDesignation.neck ||
      designation == BodyPartDesignation.torso;
  return body ? CombatCommandType.body : CombatCommandType.limbs;
}

/// Creates the [StartDefensibleAction.applyStart] function for given
/// [designation].
PartialApplyFunction startSlashReportStart(BodyPartDesignation designation) =>
    (Actor a, Simulation sim, WorldStateBuilder w, Storyline s, Actor enemy,
            Situation mainSituation) =>
        a.report(
            s,
            "<subject> swing<s> at "
            "<objectOwner's> <object>",
            object: enemy.anatomy.findByDesignation(designation),
            objectOwner: enemy,
            actionThread: mainSituation.id,
            startsThread: true);

bool _resolveIsApplicable(Actor a, Simulation sim, WorldState w, Actor enemy,
    BodyPartDesignation designation) {
  assert(!designation.isLeg, "Use SlashAtLeg instead.");
  assert(!designation.isArm, "Use SlashAtArm instead.");
  if (a.isOnGround) return false;
  if (enemy.isOnGround) return false;
  if (a.anatomy.isBlind) return false;
  // TODO: remove this, if the designation is a hand (I can slash hands with
  //  a knife). Maybe work with length, and allow all slashes with short
  // slashing weapons (like knife) if the enemy doesn't have a longer one.
  // Also, make knifes slashing.
  if (!a.currentDamageCapability.isSlashing) return false;
  if (enemy.holdsSomeWeapon) {
    // When armed, only allow torso slashes when enemy is (at least) extended.
    if (designation == BodyPartDesignation.torso &&
        enemy.pose > Pose.extended) {
      return false;
    }
    // When armed, only allow decapitation when enemy is (at least) off balance.
    if (designation == BodyPartDesignation.neck &&
        enemy.pose > Pose.offBalance) {
      // TODO: remove this, and instead make it very unlikely
      return false;
    }
  }
  if (enemy.isInvincible &&
      enemy.anatomy.findByDesignation(designation)!.isVital) {
    // Don't allow fatal slashes for invincible actors.
    return false;
  }
  // Don't offer to hit body parts that are already crippled.
  if (!enemy.anatomy.findByDesignation(designation)!.isAnimated) return false;

  return true;
}
