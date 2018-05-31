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
import 'package:edgehead/src/predetermined_result.dart';

const String startStrikeDownCommandTemplate = "strike down at <object>";

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

EnemyTargetAction startStrikeDownBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "StartStrikeDown",
        startStrikeDownCommandTemplate,
        startStrikeDownHelpMessage,
        startStrikeDownReportStart,
        (a, sim, w, enemy) =>
            !a.isPlayer &&
            enemy.isOnGround &&
            !a.isOnGround &&
            a.currentWeapon.damageCapability.isSlashing,
        (a, sim, w, enemy) =>
            createStrikeDownSituation(w.randomInt(), a, enemy),
        (a, sim, w, enemy) => createOnGroundDefenseSituation(
            w.randomInt(), a, enemy, Predetermination.none),
        enemy);

EnemyTargetAction
    startStrikeDownPlayerBuilder(Actor enemy) =>
        new StartDefensibleAction(
            "StartStrikeDownPlayer",
            startStrikeDownCommandTemplate,
            startStrikeDownHelpMessage,
            startStrikeDownReportStart,
            (a, sim, w, enemy) =>
                a.isPlayer &&
                enemy.isOnGround &&
                !a.isOnGround &&
                a.currentWeapon.damageCapability.isSlashing,
            (a, sim, w, enemy) =>
                createStrikeDownSituation(w.randomInt(), a, enemy),
            (a, sim, w, enemy) => createOnGroundDefenseSituation(
                w.randomInt(), a, enemy, Predetermination.failureGuaranteed),
            enemy,
            rerollable: true,
            rerollResource: Resource.stamina,
            rollReasonTemplate: "will <subject> hit?",
            successChanceGetter: computeStartStrikeDownPlayer,
            applyStartOfFailure: startStrikeDownReportStart,
            defenseSituationWhenFailed: (a, sim, w, enemy) =>
                createOnGroundDefenseSituation(w.randomInt(), a, enemy,
                    Predetermination.successGuaranteed));

void startStrikeDownReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation situation) =>
    a.report(
        s,
        "<subject> strike<s> down "
        "{with ${weaponAsObject2(a)} |}at <object>",
        object: enemy);
