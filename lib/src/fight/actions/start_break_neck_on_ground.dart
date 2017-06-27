import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/break_neck/break_neck_situation.dart';
import 'package:edgehead/src/fight/break_neck/wrestle_defense/wrestle_defense_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String startBreakNeckOnGroundCommandTemplate = "break <object's> neck";

const String startBreakNeckOnGroundHelpMessage =
    "This move is hard, but when succesful, it's decisive.";

EnemyTargetAction startBreakNeckOnGroundBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "StartBreakNeckOnGround",
        startBreakNeckOnGroundCommandTemplate,
        startBreakNeckOnGroundHelpMessage,
        startBreakNeckOnGroundReportStart,
        (a, w, enemy) => !a.isPlayer && enemy.isOnGround && a.isBarehanded,
        (a, w, enemy) => new BreakNeckOnGroundSituation.initialized(a, enemy),
        (a, w, enemy) =>
            new OnGroundWrestleDefenseSituation.initialized(a, enemy),
        enemy);

EnemyTargetAction startBreakNeckOnGroundPlayerBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "StartBreakNeckOnGroundPlayer",
        startBreakNeckOnGroundCommandTemplate,
        startBreakNeckOnGroundHelpMessage,
        startBreakNeckOnGroundReportStart,
        (a, w, enemy) => a.isPlayer && enemy.isOnGround && a.isBarehanded,
        (a, w, enemy) => new BreakNeckOnGroundSituation.initialized(a, enemy),
        (a, w, enemy) => new OnGroundWrestleDefenseSituation.initialized(
            a, enemy, predeterminedResult: Predetermination.failureGuaranteed),
        enemy,
        successChanceGetter: (a, w, enemy) => 0.7,
        defenseSituationWhenFailed: (a, w, enemy) =>
            new OnGroundWrestleDefenseSituation.initialized(a, enemy,
                predeterminedResult: Predetermination.successGuaranteed),
        applyStartOfFailure: startBreakNeckOnGroundReportStart,
        rerollable: true,
        rerollResource: Resource.stamina,
        rollReasonTemplate: "will <subject> succeed?");

void startBreakNeckOnGroundReportStart(
    Actor a, WorldState w, Storyline s, Actor enemy, Situation mainSituation) {
  a.report(s, "<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",
      object: enemy);
  w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
}
