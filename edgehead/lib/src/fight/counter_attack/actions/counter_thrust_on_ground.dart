import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/thrust_on_ground/thrust_on_ground_defense/thrust_defense_situation.dart';
import 'package:edgehead/src/fight/thrust_on_ground/thrust_on_ground_situation.dart';

const String counterThrustOnGroundHelpMessage =
    "The opponent is briefly vulnerable to a devastating, precise strike.";

ReasonedSuccessChance computeCounterThrustOnGround(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.4, w.statefulRandomState, [
    const Modifier(30, CombatReason.dexterity),
    const Penalty(30, CombatReason.targetHasShield),
    ...disabledModifiers,
  ]);
}

EnemyTargetAction counterThrustOnGroundBuilder() => StartDefensibleAction(
      name: "CounterThrustOnGround",
      combatCommandType: CombatCommandType.reaction,
      commandPathTail: "thrust at <object>",
      helpMessage: counterThrustOnGroundHelpMessage,
      applyStart: counterThrustOnGroundReportStart,
      applyShortCircuit: counterThrustOnGroundShortCircuitFailure,
      isApplicable: (a, sim, w, enemy) =>
          a.currentDamageCapability.isThrusting &&
          a.isOnGround &&
          !a.anatomy.isBlind,
      mainSituationBuilder: (a, sim, w, enemy) =>
          createThrustOnGroundSituation(w.randomInt(), a, enemy),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createThrustOnGroundDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeCounterThrustOnGround,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <objectPronoun>?",
      // This is a reaction to a thrust.
      isProactive: false,
    );

void counterThrustOnGroundReportStart(
        Actor a,
        Simulation sim,
        WorldStateBuilder w,
        Storyline s,
        Actor enemy,
        Situation mainSituation) =>
    a.report(s, "<subject> thrust<s> <object2> at <object>",
        object: enemy, object2: a.currentWeapon);

void counterThrustOnGroundShortCircuitFailure(Actor a, Simulation sim,
    WorldStateBuilder w, Storyline s, Actor enemy, Situation situation) {
  a.report(s, "<subject> tr<ies> to thrust <object2> at <object>",
      object: enemy, object2: a.currentWeapon);
  a.report(s, "<subject> {go<es> wide|miss<es>}", but: true, negative: true);
}
