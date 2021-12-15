import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/fatality_on_ground/fatality_on_ground.dart';
import 'package:edgehead/src/fight/fatality_on_ground/wrestle_defense/wrestle_defense_situation.dart';

const String startBreakNeckOnGroundHelpMessage =
    "This move is hard, but when succesful, it's decisive.";

ReasonedSuccessChance computeBreakNeckOnGroundChance(
        Actor a, Simulation sim, WorldState w, Actor enemy) =>
    getCombatMoveChance(a, enemy, 0.6, w.statefulRandomState, [
      const Modifier(50, CombatReason.dexterity),
      ...disabledModifiers,
    ]);

EnemyTargetAction startBreakNeckOnGroundBuilder() => StartDefensibleAction(
      name: "StartBreakNeckOnGround",
      combatCommandType: CombatCommandType.body,
      commandPathTail: "break neck",
      helpMessage: startBreakNeckOnGroundHelpMessage,
      isApplicable: (a, sim, w, enemy) =>
          !a.anatomy.isBlind && enemy.isOnGround && enemy.holdsNoWeapon,
      applyStart: startBreakNeckOnGroundReportStart,
      mainSituationBuilder: createFatalityOnGroundSituation,
      defenseSituationBuilder: createOnGroundWrestleDefenseSituation,
      successChanceGetter: computeBreakNeckOnGroundChance,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> succeed?",
    );

void startBreakNeckOnGroundReportStart(Actor a, Simulation sim,
    WorldStateBuilder w, Storyline s, Actor enemy, Situation mainSituation) {
  assert(
      a.anatomy.isHumanoid,
      "We assume a humanoid physique for this, "
      "especially hands. We need hands to break a neck.");

  if (a.holdsSomeWeapon) {
    a.report(s, '<subject> drop<s> <object>', object: a.currentWeapon);
    dropCurrentWeapon(w, a.id, forced: false);
  }

  if (a.isOnGround) {
    a.report(s, '<subject> crawl<s> over {to|towards} <object>', object: enemy);
  } else {
    a.report(s, "<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",
        object: enemy, positive: true);
    w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
  }
}
