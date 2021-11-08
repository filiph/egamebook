// @dart=2.9

import 'dart:math' as math;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/bite/bite_defense/bite_defense_situation.dart';
import 'package:edgehead/src/fight/bite/bite_situation.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';

const String startBiteHelpMessage = "Hmm, a body part. Delicious!";

/// There are several ways to defend against a bite. But, for simplicity,
/// _player's_ bite will assume an average effort from the defender,
/// and will compute a predetermined result from that.
///
/// This is almost identical to [computeStartSlashAtBodyPartGenerator].
ReasonedSuccessChance computeStartBiteAtBodyPartGenerator(
    BodyPart bodyPart, Actor a, Simulation sim, WorldState w, Actor enemy) {
  assert(a.isPlayer);

  const minBase = 0.2;
  const maxBase = 0.5;
  final relativeBiteSurface = math.min(
      math.max(bodyPart.swingSurfaceLeft, bodyPart.swingSurfaceRight) / 10, 1);
  final base = minBase + maxBase * relativeBiteSurface;

  return getCombatMoveChance(a, enemy, base, w.statefulRandomState, [
    const Modifier(30, CombatReason.dexterity),
    const Penalty(30, CombatReason.targetHasShield),
    const Modifier(30, CombatReason.balance),
    ...disabledModifiers,
  ]);
}

/// Higher order function that generates an [ActionBuilder] depending on
/// the provided [BodyPartDesignation].
EnemyTargetAction startBiteAtBodyPartGenerator(
    BodyPartDesignation designation) {
  return StartDefensibleAction(
    name: "StartBiteAt$designation",
    combatCommandType: _startBiteCombatCommandType(designation),
    commandPathTail: _startBiteCommandPathTail(designation),
    helpMessage: startBiteHelpMessage,
    applyStart: startBiteReportStart(designation),
    isApplicable: (Actor a, Simulation sim, WorldState w, Actor enemy) =>
        _resolveIsApplicable(a, sim, w, enemy, designation),
    mainSituationBuilder: (a, sim, w, enemy) =>
        createBiteSituation(w.randomInt(), a, enemy, designation: designation),
    defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
        createBiteDefenseSituation(w.randomInt(), a, enemy, predetermination),
    successChanceGetter: (Actor a, Simulation sim, WorldState w, Actor enemy) {
      final bodyPart = enemy.anatomy.findByDesignation(designation);
      return computeStartBiteAtBodyPartGenerator(bodyPart, a, sim, w, enemy);
    },
    rerollable: true,
    rerollResource: Resource.stamina,
    rollReasonTemplate: "will <subject's> teeth dig into "
        "<objectPronoun's> ${designation.toHumanString()}?",
  );
}

/// Creates the [StartDefensibleAction.applyStart] function for given
/// [designation].
PartialApplyFunction startBiteReportStart(BodyPartDesignation designation) =>
    (Actor a, Simulation sim, WorldStateBuilder w, Storyline s, Actor enemy,
        Situation mainSituation) {
      final goesDown = enemy.isOnGround && !a.isOnGround;
      w.updateActorById(a.id, (b) => b.pose == Pose.onGround);
      final down = goesDown ? 'down ' : ' ';
      a.report(
          s,
          "<subject> {lunge<s>|spring<s>|launch<es> <subjectPronounSelf>} "
          "${down}at <objectOwner's> <object>, "
          "{teeth bared|jaws open|"
          "ready to {bite|gnaw|sink <subject's> teeth into <object>}}",
          endSentence: true,
          object: enemy.anatomy.findByDesignation(designation),
          objectOwner: enemy,
          actionThread: mainSituation.id,
          startsThread: true);
    };

bool _resolveIsApplicable(Actor a, Simulation sim, WorldState w, Actor enemy,
    BodyPartDesignation designation) {
  if (a.anatomy.isBlind) return false;
  if (!a.currentDamageCapability.isTearing) return false;
  if (a.isOnGround && !designation.isLeg) return false;
  // Do not let upright humanoids gnaw at leg.
  if (designation.isLeg && a.anatomy.isHumanoid && !a.isOnGround) return false;
  if (enemy.holdsSomeWeapon) {
    // When armed, only allow torso bites when enemy is (at least) extended.
    if (designation == BodyPartDesignation.torso &&
        enemy.pose > Pose.extended) {
      return false;
    }
    // When armed, only allow neck bites when enemy is (at least) off balance.
    if (designation == BodyPartDesignation.neck &&
        enemy.pose > Pose.offBalance) {
      return false;
    }
  }
  // Don't offer to hit body parts that are already crippled.
  if (!enemy.anatomy.findByDesignation(designation).isAnimated) return false;

  return true;
}

CombatCommandType _startBiteCombatCommandType(BodyPartDesignation designation) {
  bool body = designation == BodyPartDesignation.head ||
      designation == BodyPartDesignation.neck ||
      designation == BodyPartDesignation.torso;
  return body ? CombatCommandType.body : CombatCommandType.limbs;
}

String _startBiteCommandPathTail(BodyPartDesignation designation) {
  return "bite <objectPronoun's> ${designation.toHumanString()}";
}
