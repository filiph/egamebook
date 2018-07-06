import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/break_neck/break_neck_situation.dart';
import 'package:edgehead/src/fight/break_neck/wrestle_defense/wrestle_defense_situation.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';

const String startBreakNeckOnGroundCommandTemplate = "break <object's> neck";

const String startBreakNeckOnGroundHelpMessage =
    "This move is hard, but when succesful, it's decisive.";

ReasonedSuccessChance computeBreakNeckOnGroundChance(
        Actor a, Simulation sim, WorldState w, Actor enemy) =>
    getCombatMoveChance(a, enemy, 0.6, [
      const Bonus(50, CombatReason.dexterity),
    ]);

EnemyTargetAction startBreakNeckOnGroundBuilder(Actor enemy) =>
    new StartDefensibleAction(
      enemy,
      name: "StartBreakNeckOnGround",
      commandTemplate: startBreakNeckOnGroundCommandTemplate,
      helpMessage: startBreakNeckOnGroundHelpMessage,
      isApplicable: (a, sim, w, enemy) =>
          enemy.isOnGround && a.isBarehanded && enemy.isBarehanded,
      applyStart: startBreakNeckOnGroundReportStart,
      mainSituationBuilder: createBreakNeckOnGroundSituation,
      defenseSituationBuilder: createOnGroundWrestleDefenseSituation,
      successChanceGetter: computeBreakNeckOnGroundChance,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> succeed?",
    );

void startBreakNeckOnGroundReportStart(Actor a, Simulation sim,
    WorldStateBuilder w, Storyline s, Actor enemy, Situation mainSituation) {
  a.report(s, "<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",
      object: enemy);
  w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
}
