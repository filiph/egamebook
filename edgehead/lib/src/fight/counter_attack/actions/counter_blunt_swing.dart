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
import 'package:edgehead/src/fight/common/start_defensible_action.dart';

const String counterBluntSwingHelpMessage =
    "I can deal serious damage when countering "
    "because my opponent is caught off guard. On the other hand, "
    "counters require fast reaction and could throw me out of balance.";

/// Will the actor be able to even execute the counter?
ReasonedSuccessChance computeCounterBluntSwing(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.6, [
    const Modifier(50, CombatReason.dexterity),
    const Penalty(50, CombatReason.targetHasShield),
    const Modifier(50, CombatReason.balance),
    const Modifier(50, CombatReason.height),
    const Bonus(20, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(50, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction counterBluntSwingBuilder() => StartDefensibleAction(
      name: "CounterBluntSwing",
      combatCommandType: CombatCommandType.reaction,
      commandPathTail: "swing back at <object>",
      helpMessage: counterBluntSwingHelpMessage,
      applyStart: counterBluntSwingReportStart,
      applyShortCircuit: counterBluntSwingShortCircuitFailure,
      isApplicable: (a, sim, w, enemy) =>
          a.currentDamageCapability.isBlunt &&
          !a.isOnGround &&
          !a.anatomy.isBlind,
      mainSituationBuilder: (a, sim, w, enemy) => createBluntSwingSituation(
          w.randomInt(), a, enemy,
          designation: BodyPartDesignation.head),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createBluntSwingDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeCounterBluntSwing,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <objectPronoun>?",
      // This is a reaction to a slash.
      isProactive: false,
    );

void counterBluntSwingReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation mainSituation) =>
    a.report(s, "<subject> swing<s> back");

void counterBluntSwingShortCircuitFailure(Actor a, Simulation sim,
    WorldStateBuilder w, Storyline s, Actor enemy, Situation situation) {
  a.report(s, "<subject> tr<ies> to swing back");
  a.report(s, "<subject> {go<es> wide|miss<es>}", but: true, negative: true);
  if (a.pose > Pose.offBalance) {
    w.updateActorById(a.id, (b) => b..pose = Pose.offBalance);
    a.report(s, "<subject> lose<s> balance because of that",
        negative: true, endSentence: true);
  } else if (a.pose == Pose.offBalance) {
    w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
    a.report(s, "<subject> lose<s> balance because of that", negative: true);
    a.report(s, "<subject> fall<s> to the ground",
        negative: true, endSentence: true);
  }
}
