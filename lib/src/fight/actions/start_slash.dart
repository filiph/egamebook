import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String startSlashCommandTemplate = "swing at <object>";

const String startSlashHelpMessage =
    "The basic swordfighting move is also often the "
    "most effective.";

EnemyTargetAction startSlashBuilder(Actor enemy) => new StartDefensibleAction(
    "StartSlash",
    startSlashCommandTemplate,
    startSlashHelpMessage,
    startSlashReportStart,
    (a, sim, w, enemy) =>
        !a.isPlayer &&
        a.isStanding &&
        !enemy.isOnGround &&
        a.currentWeapon.isSlashing,
    (a, sim, w, enemy) => createSlashSituation(w.randomInt(), a, enemy),
    (a, sim, w, enemy) => createSlashDefenseSituation(
        w.randomInt(), a, enemy, Predetermination.none),
    enemy);

EnemyTargetAction
    startSlashPlayerBuilder(Actor enemy) =>
        new StartDefensibleAction(
            "StartSlashPlayer",
            startSlashCommandTemplate,
            startSlashHelpMessage,
            startSlashReportStart,
            (a, sim, w, enemy) =>
                a.isPlayer &&
                a.isStanding &&
                !enemy.isOnGround &&
                a.currentWeapon.isSlashing,
            (a, sim, w, enemy) => createSlashSituation(w.randomInt(), a, enemy),
            (a, sim, w, enemy) => createSlashDefenseSituation(
                w.randomInt(), a, enemy, Predetermination.failureGuaranteed),
            enemy,
            successChanceGetter: (a, sim, w, enemy) {
              final shieldPenalty = enemy.currentShield != null ? 0.2 : 0.0;
              final balanceBonus = enemy.isStanding ? 0.0 : 0.2;
              return 0.7 - shieldPenalty + balanceBonus;
            },
            applyStartOfFailure: startSlashReportStart,
            defenseSituationWhenFailed:
                (a, sim, w, enemy) => createSlashDefenseSituation(w.randomInt(),
                    a, enemy, Predetermination.successGuaranteed),
            rerollable: true,
            rerollResource: Resource.stamina,
            rollReasonTemplate: "will <subject> hit <objectPronoun>?");

void startSlashReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation mainSituation) =>
    a.report(s, "<subject> swing<s> {${weaponAsObject2(a)} |}at <object>",
        object: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);
