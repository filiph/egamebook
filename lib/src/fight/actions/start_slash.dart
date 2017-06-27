import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
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
    (a, w, enemy) =>
        !a.isPlayer &&
        a.isStanding &&
        !enemy.isOnGround &&
        a.wields(ItemType.sword),
    (a, w, enemy) => new SlashSituation.initialized(a, enemy),
    (a, w, enemy) => new SlashDefenseSituation.initialized(a, enemy),
    enemy);

EnemyTargetAction
    startSlashPlayerBuilder(Actor enemy) =>
        new StartDefensibleAction(
            "StartSlashPlayer",
            startSlashCommandTemplate,
            startSlashHelpMessage,
            startSlashReportStart,
            (a, w, enemy) =>
                a.isPlayer &&
                a.isStanding &&
                !enemy.isOnGround &&
                a.wields(ItemType.sword),
            (a, w, enemy) => new SlashSituation.initialized(a, enemy),
            (a, w, enemy) => new SlashDefenseSituation.initialized(a, enemy,
                predeterminedResult: Predetermination.failureGuaranteed),
            enemy,
            successChanceGetter: (_, __, ___) => 0.7,
            applyStartOfFailure: startSlashReportStart,
            defenseSituationWhenFailed:
                (a, w, enemy) => new SlashDefenseSituation.initialized(a, enemy,
                    predeterminedResult: Predetermination.successGuaranteed),
            rerollable: true,
            rerollResource: Resource.stamina,
            rollReasonTemplate: "will <subject> hit <objectPronoun>?");

void startSlashReportStart(Actor a, WorldState w, Storyline s, Actor enemy,
        Situation mainSituation) =>
    a.report(
        s,
        "<subject> swing<s> "
        "{<subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);
