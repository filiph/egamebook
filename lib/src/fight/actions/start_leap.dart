import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/leap/leap_defense/leap_defense_situation.dart';
import 'package:edgehead/src/fight/leap/leap_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String startLeapCommandTemplate = "leap at <object>";

const String startLeapHelpMessage =
    "Jumping and tackling an opponent is one of the most risky moves but it's "
    "a quick way to neutralize someone.";

EnemyTargetAction startLeapBuilder(Actor enemy) => new StartDefensibleAction(
    "StartLeap",
    startLeapCommandTemplate,
    startLeapHelpMessage,
    startLeapReportStart,
    (a, sim, w, enemy) =>
        !a.isPlayer &&
        (a.isBarehanded || a.team.isFriendWith(defaultEnemyTeam)) &&
        !enemy.isOnGround &&
        !recentlyForcedToGround(a, w),
    (a, sim, w, enemy) => createLeapSituation(a, enemy),
    (a, sim, w, enemy) => new LeapDefenseSituation.initialized(a, enemy),
    enemy);

EnemyTargetAction startLeapPlayerBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "StartLeapPlayer",
        startLeapCommandTemplate,
        startLeapHelpMessage,
        startLeapReportStart,
        (a, sim, w, enemy) =>
            a.isPlayer &&
            a.isBarehanded &&
            !enemy.isOnGround &&
            !recentlyForcedToGround(a, w),
        (a, sim, w, enemy) => createLeapSituation(a, enemy),
        (a, sim, w, enemy) => new LeapDefenseSituation.initialized(a, enemy,
            predeterminedResult: Predetermination.failureGuaranteed),
        enemy,
        successChanceGetter: (a, sim, w, s) => a.isStanding ? 0.4 : 0.2,
        applyStartOfFailure: startLeapReportStart,
        defenseSituationWhenFailed: (a, sim, w, enemy) =>
            new LeapDefenseSituation.initialized(a, enemy,
                predeterminedResult: Predetermination.successGuaranteed),
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
