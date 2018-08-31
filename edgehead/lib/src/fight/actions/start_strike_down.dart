import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';

const String startStrikeDownCommandTemplate =
    "attack <object> >> by striking down at <objectPronoun>";

const String startStrikeDownHelpMessage =
    "Opponents on the ground are often the most "
    "vulnerable.";

/// There are several ways to defend against a downward strike. But,
/// for simplicity, _player's_ strike will assume an average effort
/// from the defender, and will compute a predetermined result from that.
///
/// The reaction is then basically selected randomly. Because success/failure
/// are predetermined, there is little difference for the planner between
/// the various defense moves.
ReasonedSuccessChance computeStartStrikeDownPlayer(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.4, [
    const Bonus(50, CombatReason.dexterity),
    const Bonus(30, CombatReason.targetWithoutShield),
    const Bonus(30, CombatReason.balance),
  ]);
}

EnemyTargetAction startStrikeDownBuilder() => StartDefensibleAction(
      name: "StartStrikeDown",
      commandTemplate: startStrikeDownCommandTemplate,
      helpMessage: startStrikeDownHelpMessage,
      applyStart: startStrikeDownReportStart,
      isApplicable: (a, sim, w, enemy) =>
          enemy.isOnGround &&
          !a.isOnGround &&
          a.currentWeapon.damageCapability.isSlashing,
      mainSituationBuilder: (a, sim, w, enemy) =>
          createStrikeDownSituation(w.randomInt(), a, enemy),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createOnGroundDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeStartStrikeDownPlayer,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit?",
    );

void startStrikeDownReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation situation) =>
    a.report(
        s,
        "<subject> strike<s> down "
        "{with ${weaponAsObject2(a)} |}at <object>",
        object: enemy);
