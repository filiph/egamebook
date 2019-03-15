import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_slashing_damage.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';

const String counterSlashCommandTemplate = "swing back at <object>";

const String counterSlashHelpMessage =
    "You can deal serious damage when countering "
    "because your opponent is often caught off guard. On the other hand, "
    "counters require fast reaction and could throw you out of balance.";

/// Will the actor be able to even execute the counter slash?
///
/// If not, then the slash completely misses the mark. If so, then
/// it either automatically does damage (if the actor is player) or
/// it lets the enemy defend (otherwise).
ReasonedSuccessChance computeCounterSlash(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.6, [
    const Modifier(50, CombatReason.dexterity),
    const Penalty(50, CombatReason.targetHasShield),
    const Modifier(50, CombatReason.balance),
    const Bonus(20, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(50, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

/// TODO: This currently assumes that actor will always want to counter slash
/// from left. Add another option or make explicit that
/// this is what's happening.
EnemyTargetAction counterSlashBuilder() => StartDefensibleAction(
      name: "CounterSlash",
      commandTemplate: counterSlashCommandTemplate,
      commandPathTemplate: const [counterSlashCommandTemplate],
      helpMessage: counterSlashHelpMessage,
      applyStart: counterSlashReportStart,
      applyShortCircuit: counterSlashShortCircuitFailure,
      isApplicable: (a, sim, w, enemy) =>
          a.currentWeapon.damageCapability.isSlashing &&
          !a.isOnGround &&
          !a.hasCrippledArms,
      mainSituationBuilder: (a, sim, w, enemy) => createSlashSituation(
          w.randomInt(), a, enemy,
          direction: SlashDirection.left),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createSlashDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeCounterSlash,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <objectPronoun>?",
      // This is a reaction to a slash.
      isProactive: false,
    );

void counterSlashReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation mainSituation) =>
    a.report(s, "<subject> swing<s> back", object: enemy);

void counterSlashShortCircuitFailure(Actor a, Simulation sim,
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
