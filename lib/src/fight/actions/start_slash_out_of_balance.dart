import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String startSlashOutOfBalanceCommand =
    "swing at <object> (while out of balance)";

const String startSlashOutOfBalanceHelp =
    "It's always better to fight with your feet "
    "firmly on the ground. But sometimes, it's necessary to act quickly.";

void startSlashOutOfBalanceApplyFailure(
        Actor a, WorldState w, Storyline s, Actor enemy, _) =>
    a.report(
        s,
        "<subject> completely miss<es> <object> with "
        "<subject's> ${a.currentWeapon.name}",
        object: enemy,
        negative: true);

EnemyTargetAction startSlashOutOfBalanceBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "StartSlashOutOfBalance",
        startSlashOutOfBalanceCommand,
        startSlashOutOfBalanceHelp,
        startSlashOutOfBalanceReportStart,
        (a, w, enemy) =>
            !a.isPlayer &&
            a.isOffBalance &&
            !enemy.isOnGround &&
            a.currentWeapon.isSlashing,
        (a, w, enemy) => new SlashSituation.initialized(a, enemy),
        (a, w, enemy) => new SlashDefenseSituation.initialized(a, enemy),
        enemy,
        successChanceGetter: (_, __, ___) => 0.7,
        applyStartOfFailure: startSlashOutOfBalanceApplyFailure,
        buildSituationsOnFailure: false);

EnemyTargetAction startSlashOutOfBalancePlayerBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "StartSlashOutOfBalancePlayer",
        startSlashOutOfBalanceCommand,
        startSlashOutOfBalanceHelp,
        startSlashOutOfBalanceReportStart,
        (a, w, enemy) =>
            a.isPlayer &&
            a.isOffBalance &&
            !enemy.isOnGround &&
            a.currentWeapon.isSlashing,
        (a, w, enemy) => new SlashSituation.initialized(a, enemy),
        (a, w, enemy) => new SlashDefenseSituation.initialized(a, enemy,
            predeterminedResult: Predetermination.failureGuaranteed),
        enemy,
        successChanceGetter: (_, __, ___) => 0.7,
        applyStartOfFailure: startSlashOutOfBalanceApplyFailure,
        buildSituationsOnFailure: false);

void startSlashOutOfBalanceReportStart(Actor a, WorldState w, Storyline s,
        Actor enemy, Situation mainSituation) =>
    a.report(
        s,
        "<subject> swing<s> "
        "{<subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);
