import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/throw/throw_defense/throw_defense_situation.dart';
import 'package:edgehead/src/fight/throw/throw_situation.dart';

const String startThrowRockHelpMessage =
    "A good way to put the enemy off balance, from afar. Ideally, dealing "
    "some damage in the process.";

ReasonedSuccessChance computeThrowRockPlayer(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.3, [
    const Modifier(50, CombatReason.dexterity),
    const Penalty(30, CombatReason.targetHasShield),
    const Modifier(20, CombatReason.balance),
    const Bonus(10, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(10, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(80, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction startThrowRock() => StartDefensibleAction(
      name: "StartThrowRock",
      combatCommandType: CombatCommandType.stance,
      commandPathTailGenerator: (w, a, target) =>
          "throw ${weaponAsObject2(a)} at <objectPronoun>",
      helpMessage: startThrowRockHelpMessage,
      applyStart: _startThrowRockReportStart,
      isApplicable: (a, sim, w, enemy) =>
          a.isPlayer &&
          (a.currentWeapon?.damageCapability?.type == WeaponType.rock ??
              false) &&
          !a.anatomy.isBlind &&
          !recentlyForcedToGround(a, w) &&
          enemy.pose > Pose.onGround,
      mainSituationBuilder: (a, sim, w, enemy) =>
          createThrowSituation(w.randomInt(), a, enemy),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createThrowDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeThrowRockPlayer,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <object>?",
    );

void _startThrowRockReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation situation) =>
    a.report(
      s,
      "<subject> {throw<s>|hurl<s>|cast<s>} "
      "${entityAsObject2(a, a.currentWeapon)} at <object>",
      object: enemy,
    );
