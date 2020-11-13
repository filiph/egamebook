import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/punch_on_ground/punch_defense/punch_defense_situation.dart';
import 'package:edgehead/src/fight/punch_on_ground/punch_situation.dart';

const String startPunchOnGroundHelpMessage =
    "Punching someone hard enough can seriously throw them off. "
    "And it hurts. "
    "On the other hand, it makes me vulnerable to a counter-attack.";

ReasonedSuccessChance computeStartPunchOnGround(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.7, [
    const Modifier(75, CombatReason.dexterity),
    ...disabledModifiers,
  ]);
}

EnemyTargetAction startPunchOnGroundBuilder() => StartDefensibleAction(
      name: "StartPunchOnGround",
      combatCommandType: CombatCommandType.body,
      commandPathTail: "punch",
      helpMessage: startPunchOnGroundHelpMessage,
      applyStart: startPunchOnGroundReportStart,
      isApplicable: (a, sim, w, enemy) =>
          // Only available to the player. Otherwise, NPCs overuse it,
          // and then the prose is like "I punch the goblin.
          // Tamara punches the goblin." And so on.
          a.isPlayer &&
          !a.anatomy.isBlind &&
          !a.isUndead &&
          a.isOnGround &&
          enemy.isOnGround &&
          (a.isBarehanded || a.anatomy.secondaryWeaponAppendageAvailable),
      mainSituationBuilder: (a, sim, w, enemy) =>
          createPunchOnGroundSituation(w.randomInt(), a, enemy),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createPunchOnGroundDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeStartPunchOnGround,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <objectPronoun>?",
    );

void startPunchOnGroundReportStart(Actor a, Simulation sim, WorldStateBuilder w,
    Storyline s, Actor enemy, Situation mainSituation) {
  var offHand = a.anatomy.primaryWeaponAppendageAvailable ? "" : "off hand ";
  s.add(
      "<subject> {thrust<s>|swing<s>} "
      "<subject's> ${offHand}fist at <object>",
      subject: a,
      object: enemy,
      actionThread: mainSituation.id,
      startsThread: true);
}
