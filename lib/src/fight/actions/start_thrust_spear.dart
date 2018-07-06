import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_damage.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';

const String startThrustCommandTemplate = "thrust at <object>";

const String startThrustHelpMessage = "The basic move with a spear.";

/// There are several ways to defend against a thrust. But, for simplicity,
/// _player's_ thrust will assume an average effort from the defender,
/// and will compute a predetermined result from that.
///
/// The reaction is then basically selected randomly. Because success/failure
/// are predetermined, there is little difference for the planner between
/// the various defense moves.
ReasonedSuccessChance computeStartThrustSpearPlayer(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.5, [
    const Bonus(50, CombatReason.dexterity),
    const Bonus(30, CombatReason.targetWithoutShield),
    const Bonus(30, CombatReason.balance),
  ]);
}

/// TODO: Fix to create a thrust situation, not a slash one
EnemyTargetAction startThrustSpearBuilder(Actor enemy) =>
    new StartDefensibleAction(
      enemy,
      name: "StartThrustSpear",
      commandTemplate: startThrustCommandTemplate,
      helpMessage: startThrustHelpMessage,
      applyStart: startThrustSpearReportStart,
      isApplicable: (a, sim, w, enemy) =>
          a.isStanding &&
          !enemy.isOnGround &&
          a.currentWeapon.damageCapability.type == WeaponType.spear,
      mainSituationBuilder: (a, sim, w, enemy) =>
          createSlashSituation(w.randomInt(), a, enemy, SlashDirection.right),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createSlashDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeStartThrustSpearPlayer,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit <objectPronoun>?",
    );

void startThrustSpearReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation mainSituation) =>
    a.report(s, "<subject> thrust<s> {${weaponAsObject2(a)} |}at <object>",
        object: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);
