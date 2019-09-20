import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/object2_in_command_path.dart';
import 'package:edgehead/src/fight/throw/throw_defense/throw_defense_situation.dart';
import 'package:edgehead/src/fight/throw/throw_situation.dart';

const String startThrowThrustingWeaponHelpMessage =
    "Successfully hitting with a thrusting weapon is generally harder than "
    "if you thrust with it, but it does have the advantage of keeping you "
    "at a distance.";

ReasonedSuccessChance computeThrowThrustingWeaponPlayer(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  final hasSpear =
      a.currentWeapon?.damageCapability?.type == WeaponType.spear ?? false;
  return getCombatMoveChance(a, enemy, hasSpear ? 0.3 : 0.1, [
    const Modifier(20, CombatReason.dexterity),
    const Penalty(20, CombatReason.targetHasShield),
    const Modifier(20, CombatReason.balance),
    const Bonus(20, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(20, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(80, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction startThrowThrustingWeapon() => StartDefensibleAction(
      name: "StartThrowThrustingWeapon",
      combatCommandType: CombatCommandType.body,
      commandPathTailGenerator: (w, a, target) =>
          "throw ${weaponAsObject2InCommandPath(a)} at <objectPronoun>",
      helpMessage: startThrowThrustingWeaponHelpMessage,
      applyStart: _startThrowThrustingWeaponReportStart,
      isApplicable: (a, sim, w, enemy) =>
          (a.currentWeapon?.damageCapability?.isThrusting ?? false) &&
          !a.anatomy.isBlind &&
          !recentlyForcedToGround(a, w),
      mainSituationBuilder: (a, sim, w, enemy) =>
          createThrowSituation(w.randomInt(), a, enemy),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createThrowDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeThrowThrustingWeaponPlayer,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <object>?",
    );

void _startThrowThrustingWeaponReportStart(Actor a, Simulation sim,
    WorldStateBuilder w, Storyline s, Actor enemy, Situation situation) {
  a.report(
    s,
    "<subject> {throw<s>|hurl<s>|cast<s>} "
    "<object2> at <object>",
    object: enemy,
    actionThread: situation.id,
    startsThread: true,
    object2: a.currentWeapon,
  );
}
