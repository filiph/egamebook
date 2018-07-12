import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';

const String startSlashHelpMessage =
    "Slashing at a specific body part is really hard to pull off. ";

/// There are several ways to defend against a slash. But, for simplicity,
/// _player's_ slash will assume an average effort from the defender,
/// and will compute a predetermined result from that.
///
/// The reaction is then basically selected randomly. Because success/failure
/// are predetermined, there is little difference for the planner between
/// the various defense moves.
ReasonedSuccessChance computeStartSlashAtBodyPart(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.3 /* varies by slash surface */, [
    const Bonus(30, CombatReason.dexterity),
    const Bonus(30, CombatReason.targetWithoutShield),
    const Bonus(30, CombatReason.balance),
    // TODO: target is at hp == 1 and not a survivor - big 50% bonus
  ]);
}

String startSlashCommandTemplate(BodyPartDesignation designation) {
  return "attack <object> >> by slashing <object's> $designation";
}

void startSlashReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation mainSituation) =>
    a.report(s, "<subject> swing<s> {${weaponAsObject2(a)} |}at <object>",
        object: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);

/// Higher order function that generates an [ActionBuilder] depending on
/// the provided [BodyPartDesignation].
ActionBuilder<EnemyTargetAction, Actor> startSlashAtBodyPartGenerator(
    BodyPartDesignation designation) {
  return (Actor enemy) => new StartDefensibleAction(
        enemy,
        name: "StartSlashAt$designation",
        commandTemplate: startSlashCommandTemplate(designation),
        helpMessage: startSlashHelpMessage,
        applyStart: startSlashReportStart,
        isApplicable: (Actor a, Simulation sim, WorldState w, Actor enemy) =>
            !a.isOnGround &&
            !enemy.isOnGround &&
            a.currentWeapon.damageCapability.isSlashing,
        mainSituationBuilder: (a, sim, w, enemy) => createSlashSituation(
            w.randomInt(), a, enemy,
            designation: designation),
        defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
            createSlashDefenseSituation(
                w.randomInt(), a, enemy, predetermination),
        successChanceGetter: computeStartSlashAtBodyPart,
        rerollable: true,
        rerollResource: Resource.stamina,
        rollReasonTemplate:
            "will <subject> hit <objectPronoun's> $designation?",
      );
}
