import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/actions/start_strike_down.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';

const String startThrustSpearDownCommandTemplate = "thrust >> at <object>";

const String startThrustSpearDownHelpMessage =
    "Opponents on the ground are often the most "
    "vulnerable.";

EnemyTargetAction startThrustSpearDownBuilder() => StartDefensibleAction(
      name: "StartThrustSpearDown",
      commandTemplate: startThrustSpearDownCommandTemplate,
      helpMessage: startThrustSpearDownHelpMessage,
      applyStart: startThrustSpearDownReportStart,
      isApplicable: (a, sim, w, enemy) =>
          enemy.isOnGround &&
          !a.isOnGround &&
          a.currentWeapon.damageCapability.type == WeaponType.spear,
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

void startThrustSpearDownReportStart(Actor a, Simulation sim,
        WorldStateBuilder w, Storyline s, Actor enemy, Situation situation) =>
    a.report(
        s,
        "<subject> thrust<s> down "
        "{with ${weaponAsObject2(a)} |}at <object>",
        object: enemy);
