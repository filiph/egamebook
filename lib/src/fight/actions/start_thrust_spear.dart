import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String startThrustCommandTemplate = "thrust at <object>";

const String startThrustHelpMessage = "The basic move with a spear.";

EnemyTargetAction
    startThrustSpearBuilder(Actor enemy) =>
        new StartDefensibleAction(
            "StartThrustSpear",
            startThrustCommandTemplate,
            startThrustHelpMessage,
            startThrustSpearReportStart,
            (a, sim, w, enemy) =>
                !a.isPlayer &&
                a.isStanding &&
                !enemy.isOnGround &&
                a.currentWeapon.type == WeaponType.spear,
            (a, sim, w, enemy) => createSlashSituation(a, enemy),
            (a, sim, w, enemy) =>
                createSlashDefenseSituation(a, enemy, Predetermination.none),
            enemy);

EnemyTargetAction startThrustSpearPlayerBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "StartThrustSpearPlayer",
        startThrustCommandTemplate,
        startThrustHelpMessage,
        startThrustSpearReportStart,
        (a, sim, w, enemy) =>
            a.isPlayer &&
            a.isStanding &&
            !enemy.isOnGround &&
            a.currentWeapon.type == WeaponType.spear,
        (a, sim, w, enemy) => createSlashSituation(a, enemy),
        (a, sim, w, enemy) => createSlashDefenseSituation(
            a, enemy, Predetermination.failureGuaranteed),
        enemy,
        successChanceGetter: (a, sim, w, enemy) {
          final shieldPenalty = enemy.currentShield != null ? 0.2 : 0.0;
          return 0.7 - shieldPenalty;
        },
        applyStartOfFailure: startThrustSpearReportStart,
        defenseSituationWhenFailed: (a, sim, w, enemy) =>
            createSlashDefenseSituation(
                a, enemy, Predetermination.successGuaranteed),
        rerollable: true,
        rerollResource: Resource.stamina,
        rollReasonTemplate: "will <subject> hit <objectPronoun>?");

void startThrustSpearReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation mainSituation) =>
    a.report(s, "<subject> thrust<s> {${weaponAsObject2(a)} |}at <object>",
        object: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);
