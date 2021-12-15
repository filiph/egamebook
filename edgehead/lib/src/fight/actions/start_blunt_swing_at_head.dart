import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/blunt_swing/blunt_swing_defense/blunt_swing_defense_situation.dart';
import 'package:edgehead/src/fight/blunt_swing/blunt_swing_situation.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/object2_in_command_path.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';

const String startBluntSwingAtHeadHelpMessage =
    "A heavy blow to the head is hard to pull off. On the other hand, "
    "it might end the fight quickly.";

ReasonedSuccessChance computeBluntSwingAtHeadPlayer(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.2, w.statefulRandomState, [
    const Modifier(30, CombatReason.dexterity),
    const Penalty(30, CombatReason.targetHasShield),
    const Modifier(20, CombatReason.balance),
    ...disabledModifiers,
  ]);
}

EnemyTargetAction startBluntSwingAtHead() => StartDefensibleAction(
      name: "StartBluntSwingAtHead",
      combatCommandType: CombatCommandType.body,
      commandPathTailGenerator: (w, a, target) =>
          "swing ${weaponAsObject2InCommandPath(a)} at <objectPronoun's> head",
      helpMessage: startBluntSwingAtHeadHelpMessage,
      applyStart: _startBluntSwingAtHeadReportStart,
      isApplicable: (a, sim, w, enemy) =>
          a.isPlayer &&
          a.currentDamageCapability.isBlunt &&
          a.currentDamageCapability.length > 0 &&
          !a.anatomy.isBlind &&
          !recentlyForcedToGround(a, w) &&
          enemy.pose > Pose.onGround,
      mainSituationBuilder: (a, sim, w, enemy) => createBluntSwingSituation(
          w.randomInt(), a, enemy,
          designation: BodyPartDesignation.head),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createBluntSwingDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeBluntSwingAtHeadPlayer,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <object>?",
    );

void _startBluntSwingAtHeadReportStart(Actor a, Simulation sim,
        WorldStateBuilder w, Storyline s, Actor enemy, Situation situation) =>
    a.report(
      s,
      "<subject> swing<s> "
      "<object2> at <objectOwner's> <object>",
      objectOwner: enemy,
      object: enemy.anatomy.findByDesignation(BodyPartDesignation.head),
      object2: a.currentWeapon,
    );
