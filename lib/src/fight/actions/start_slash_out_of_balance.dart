import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/actions/start_slash.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
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
        "${weaponAsObject2(a)}",
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
        successChanceGetter: (_, __, ___) =>
            0.7 /* 30% chance of complete miss */,
        applyStartOfFailure: startSlashOutOfBalanceApplyFailure,
        buildSituationsOnFailure: false);

/// This is different from simple StartSlashPlayer in that a failure is
/// a complete miss (no enemy defense needed) while success is a complete
/// success (enemy defense is guaranteed to fail). This is due to technical
/// limitation of [StartDefensibleAction] more than anything else.
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
        enemy, successChanceGetter: (a, w, enemy) {
      // This is intentional. Since the action can only lead to either
      // complete miss (attacker's failure) or guaranteed failure
      // of enemy's defense (attacker's success), we do need to count
      // defender's shield here. Let's say the attacking player tries
      // not to hit the shield and therefore misses completely.
      final shieldPenalty = enemy.currentShield != null ? 0.2 : 0.0;
      return 0.5 - shieldPenalty;
    },
        applyStartOfFailure: startSlashOutOfBalanceApplyFailure,
        buildSituationsOnFailure: false);

void startSlashOutOfBalanceReportStart(Actor a, WorldState w, Storyline s,
        Actor enemy, Situation mainSituation) =>
    startSlashReportStart(a, w, s, enemy, mainSituation);
