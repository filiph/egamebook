import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/roll_out_of_way.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';

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
  assert(a.isPlayer);
  // Major bonus when the actor just rolled out of the way.
  final didRecentlyRoll = recentlyRolledOutOfWay(w, enemy);
  final hasShortBlade = (a.currentWeapon?.damageCapability?.length ?? 0) ==
      WeaponType.dagger.defaultLength;
  final base = (didRecentlyRoll ? 0.8 : 0.4) - (hasShortBlade ? 0.1 : 0);

  return getCombatMoveChance(a, enemy, base, [
    const Modifier(50, CombatReason.dexterity),
    const Penalty(30, CombatReason.targetHasShield),
    const Modifier(30, CombatReason.balance),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

EnemyTargetAction startStrikeDownBuilder() => StartDefensibleAction(
      name: "StartStrikeDown",
      combatCommandType: CombatCommandType.body,
      commandPathTail: "slash <objectPronoun> from above",
      helpMessage: startStrikeDownHelpMessage,
      applyStart: startStrikeDownReportStart,
      isApplicable: (a, sim, w, enemy) =>
          !a.anatomy.isBlind &&
          enemy.isOnGround &&
          !a.isOnGround &&
          a.currentDamageCapability.isSlashing,
      mainSituationBuilder: (a, sim, w, enemy) =>
          createStrikeSlashDownSituation(w.randomInt(), a, enemy),
      defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
          createOnGroundDefenseSituation(
              w.randomInt(), a, enemy, predetermination),
      successChanceGetter: computeStartStrikeDownPlayer,
      rerollable: true,
      rerollResource: Resource.stamina,
      rollReasonTemplate: "will <subject> hit?",
    );

void startStrikeDownReportStart(Actor a, Simulation sim, WorldStateBuilder w,
    Storyline s, Actor enemy, Situation situation) {
  Randomly.run(
    () => a.report(
        s,
        "<subject> strike<s> down "
        "at <object>",
        object: enemy),
    () => a.report(
        s,
        "<subject> strike<s> down "
        "with <object2> at <object>",
        object: enemy,
        object2: a.currentWeaponOrBodyPart),
  );
}
