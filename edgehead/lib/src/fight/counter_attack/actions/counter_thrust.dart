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
import 'package:edgehead/src/fight/thrust/thrust_defense/thrust_defense_situation.dart';
import 'package:edgehead/src/fight/thrust/thrust_situation.dart';

const String counterThrustHelpMessage =
    "The opponent is briefly vulnerable to a devastating, precise strike. "
    "If it doesn't succeed, though, it will throw me off balance.";

ReasonedSuccessChance computeCounterThrust(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.4, w.statefulRandomState, [
    const Modifier(30, CombatReason.dexterity),
    const Penalty(30, CombatReason.targetHasShield),
    const Modifier(30, CombatReason.balance),
    ...disabledModifiers,
  ]);
}

EnemyTargetAction counterThrustBuilder() => StartDefensibleAction(
      name: "CounterThrust",
      combatCommandType: CombatCommandType.reaction,
      commandPathTail: "thrust at <object>",
      helpMessage: counterThrustHelpMessage,
      applyStart: counterThrustReportStart,
      applyShortCircuit: counterThrustShortCircuitFailure,
      isApplicable: (a, sim, w, enemy) =>
          a.currentDamageCapability.isThrusting &&
          !a.isOnGround &&
          !a.anatomy.isBlind,
      mainSituationBuilder: (a, sim, w, enemy) =>
          createThrustSituation(w.randomInt(), a, enemy,
              designation: w.randomChoose([
                BodyPartDesignation.torso,
                BodyPartDesignation.primaryArm,
                BodyPartDesignation.leftEye,
                BodyPartDesignation.rightEye,
              ])),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createThrustDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeCounterThrust,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <objectPronoun>?",
      // This is a reaction to an attack.
      isProactive: false,
    );

void counterThrustReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation mainSituation) =>
    a.report(s, "<subject> thrust<s> <object2> at <object>",
        object: enemy, object2: a.currentWeapon);

void counterThrustShortCircuitFailure(Actor a, Simulation sim,
    WorldStateBuilder w, Storyline s, Actor enemy, Situation situation) {
  a.report(s, "<subject> tr<ies> to thrust <object2> at <object>",
      object: enemy, object2: a.currentWeapon);
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
