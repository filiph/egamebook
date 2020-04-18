import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
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

const String startThrowHarmlessHelpMessage =
    "It might throw them of balance, or even confuse them.";

ReasonedSuccessChance computeThrowHarmlessPlayer(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.2, [
    const Modifier(30, CombatReason.dexterity),
    const Penalty(30, CombatReason.targetHasShield),
    const Modifier(10, CombatReason.balance),
    const Bonus(10, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(10, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(10, CombatReason.targetHasOneLegDisabled),
    const Bonus(20, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(80, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction startThrowHarmless() => StartDefensibleAction(
      name: "StartThrowHarmless",
      combatCommandType: CombatCommandType.stance,
      commandPathTailGenerator: (w, a, target) =>
          "throw ${weaponAsObject2InCommandPath(a)} at <objectPronoun>",
      helpMessage: startThrowHarmlessHelpMessage,
      applyStart: _startThrowHarmlessReportStart,
      isApplicable: (a, sim, w, enemy) =>
          a.isPlayer &&
          (a.currentWeapon?.damageCapability?.isHarmless ?? false) &&
          !a.anatomy.isBlind &&
          !recentlyForcedToGround(a, w),
      mainSituationBuilder: (a, sim, w, enemy) =>
          createThrowSituation(w.randomInt(), a, enemy),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createThrowDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeThrowHarmlessPlayer,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <object>?",
    );

void _startThrowHarmlessReportStart(Actor a, Simulation sim,
        WorldStateBuilder w, Storyline s, Actor enemy, Situation situation) =>
    a.report(
      s,
      "<subject> {throw<s>|hurl<s>|cast<s>} "
      "<object2> at <object>",
      object: enemy,
      object2: a.currentWeapon,
    );
