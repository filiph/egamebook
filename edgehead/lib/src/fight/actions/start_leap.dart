import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/leap/leap_defense/leap_defense_situation.dart';
import 'package:edgehead/src/fight/leap/leap_situation.dart';

const String startLeapCommandTemplate =
    "attack <object> >> by leaping at <objectPronoun>";

const String startLeapHelpMessage =
    "Jumping and tackling an opponent is one of the most risky moves but it's "
    "a quick way to neutralize someone.";

ReasonedSuccessChance computeStartLeap(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.2, [
    const Bonus(50, CombatReason.balance),
    const Bonus(50, CombatReason.height),
    const Bonus(20, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(20, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(50, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction startLeapBuilder() => StartDefensibleAction(
    name: "StartLeap",
    commandTemplate: startLeapCommandTemplate,
    helpMessage: startLeapHelpMessage,
    applyStart: startLeapReportStart,
    isApplicable: (a, sim, w, enemy) =>
        !enemy.isOnGround &&
        !a.hasCrippledArms &&
        !recentlyForcedToGround(a, w),
    mainSituationBuilder: (a, sim, w, enemy) =>
        createLeapSituation(w.randomInt(), a, enemy),
    defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
        createLeapDefenseSituation(w.randomInt(), a, enemy, predetermination),
    successChanceGetter: computeStartLeap,
    rerollable: true,
    rerollResource: Resource.stamina,
    rollReasonTemplate: "will <subject> tackle <objectPronoun>?");

void startLeapReportStart(Actor a, Simulation sim, WorldStateBuilder w,
    Storyline s, Actor enemy, Situation mainSituation) {
  if (a.isOnGround) {
    a.report(s, "<subject> roll<s>", actionThread: mainSituation.id);
    a.report(
        s, "<subject> put<s> <subject's> feet under <subjectPronounAccusative>",
        actionThread: mainSituation.id);
  }
  a.report(
      s,
      "<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|"
      "lunge<s>} at <object>",
      object: enemy,
      actionThread: mainSituation.id);
}
