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
import 'package:edgehead/src/fight/slash_on_ground/slash_on_ground_defense/slash_on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/slash_on_ground/slash_on_ground_situation.dart';

const String startSlashOnGroundHelpMessage =
    "The basic move with an edgy weapon.";

ReasonedSuccessChance computeStartSlashOnGroundPlayer(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  assert(a.isPlayer);
  return getCombatMoveChance(a, enemy, 0.1, [
    const Modifier(20, CombatReason.dexterity),
    const Penalty(60, CombatReason.targetHasShield),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction startSlashOnGroundBuilder() => StartDefensibleAction(
      name: "StartSlashOnGround",
      combatCommandType: CombatCommandType.body,
      commandPathTail: "slash at <object>",
      helpMessage: startSlashOnGroundHelpMessage,
      applyStart: startSlashOnGroundReportStart,
      isApplicable: (a, sim, w, enemy) =>
          a.isOnGround &&
          enemy.isOnGround &&
          !a.anatomy.isBlind &&
          a.currentDamageCapability.isSlashing,
      mainSituationBuilder: (a, sim, w, enemy) =>
          createSlashOnGroundSituation(w.randomInt(), a, enemy),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createSlashOnGroundDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeStartSlashOnGroundPlayer,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <objectPronoun>?",
    );

void startSlashOnGroundReportStart(Actor a, Simulation sim, WorldStateBuilder w,
    Storyline s, Actor enemy, Situation mainSituation) {
  Randomly.run(
    () => a.report(s, "<subject> slash<es> at <object>",
        object: enemy, actionThread: mainSituation.id, startsThread: true),
    () => a.report(s, "<subject> slash<es> <object2> at <object>",
        object: enemy,
        object2: a.currentWeaponOrBodyPart,
        actionThread: mainSituation.id,
        startsThread: true),
  );
}
