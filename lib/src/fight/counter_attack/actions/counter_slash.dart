import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String counterSlashCommandTemplate = "swing back at <object>";

const String counterSlashHelpMessage =
    "You can deal serious damage when countering "
    "because your opponent is often caught off guard. On the other hand, "
    "counters require fast reaction and could throw you out of balance.";

void counterSlashApplyFailure(Actor a, Simulation sim, WorldStateBuilder w,
    Storyline s, Actor enemy, Situation situation) {
  a.report(s, "<subject> tr<ies> to swing back");
  a.report(s, "<subject> {go<es> wide|miss<es>}", but: true, negative: true);
  if (a.isStanding) {
    w.updateActorById(a.id, (b) => b..pose = Pose.offBalance);
    a.report(s, "<subject> lose<s> balance because of that",
        negative: true, endSentence: true);
  } else if (a.isOffBalance) {
    w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
    a.report(s, "<subject> lose<s> balance because of that", negative: true);
    a.report(s, "<subject> fall<s> to the ground",
        negative: true, endSentence: true);
  }
}

EnemyTargetAction counterSlashBuilder(Actor enemy) => new StartDefensibleAction(
    "CounterSlash",
    counterSlashCommandTemplate,
    counterSlashHelpMessage,
    counterSlashReportStart,
    (a, sim, w, enemy) =>
        !a.isPlayer && a.currentWeapon.isSlashing && !a.isOnGround,
    (a, sim, w, enemy) => createSlashSituation(w.randomInt(), a, enemy),
    (a, sim, w, enemy) => createSlashDefenseSituation(
        w.randomInt(), a, enemy, Predetermination.none),
    enemy,
    successChanceGetter: (_, __, ___, enemy) => enemy.isStanding ? 0.7 : 0.9,
    applyStartOfFailure: counterSlashApplyFailure,
    buildSituationsOnFailure: false);

EnemyTargetAction counterSlashPlayerBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "CounterSlashPlayer",
        counterSlashCommandTemplate,
        counterSlashHelpMessage,
        counterSlashReportStart,
        (a, sim, w, enemy) =>
            a.isPlayer && a.currentWeapon.isSlashing && !a.isOnGround,
        (a, sim, w, enemy) => createSlashSituation(w.randomInt(), a, enemy),
        (a, sim, w, enemy) => createSlashDefenseSituation(
            w.randomInt(), a, enemy, Predetermination.failureGuaranteed),
        enemy,
        successChanceGetter: (_, __, ___, enemy) =>
            enemy.isStanding ? 0.7 : 0.9,
        applyStartOfFailure: counterSlashApplyFailure,
        buildSituationsOnFailure: false,
        rerollable: true,
        rerollResource: Resource.stamina,
        rollReasonTemplate: "will <subject> hit <objectPronoun>?");

void counterSlashReportStart(Actor a, Simulation sim, WorldStateBuilder w,
        Storyline s, Actor enemy, Situation mainSituation) =>
    a.report(s, "<subject> swing<s> back", object: enemy);
