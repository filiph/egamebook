import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/damage_reports.dart';

import 'slash_defense_situation.dart';
import 'slash_situation.dart';

class FinishSlash extends EnemyTargetAction {
  @override
  final String helpMessage = null;

  FinishSlash(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "kill <object> "
      "(WARNING should not be user-visible)";

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    final extraForce = (w.currentSituation as SlashSituation).extraForce;
    final damage = extraForce ? 2 : 1;
    w.updateActorById(enemy.id, (b) => b..hitpoints -= damage);
    bool killed = !w.getActorById(enemy.id).isAlive;
    if (!killed) {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} <object's> "
          "{shoulder|abdomen|thigh}"
          "${extraForce ? ' with all <subjectPronoun\'s> {power|might}' : ''}",
          object: enemy,
          positive: true);
      reportPain(s, enemy);
    } else {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} "
          "{across|through} <object's> "
          "{neck|abdomen|lower body}"
          "${extraForce ? ' with all <subjectPronoun\'s> {power|might}' : ''}",
          object: enemy,
          positive: true);
      reportDeath(s, enemy);
    }
    return "${a.name} slashes${killed ? ' (and kills)' : ''} ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState w) => a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) => new FinishSlash(enemy);
}

class StartSlash extends EnemyTargetAction {
  @override
  final String helpMessage = "The basic swordfighting move is also often the "
      "most effective.";

  StartSlash(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "swing at <object>";

  @override
  String get rollReasonTemplate => "will <subject> swing with extra force?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> swing<s> "
        "{<subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy);
    var slashSituation = new SlashSituation.initialized(a, enemy);
    w.pushSituation(slashSituation);
    var slashDefenseSituation = new SlashDefenseSituation.initialized(a, enemy);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} starts a slash at ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    Randomly.run(
        () => a.report(s, "<subject> swing<s> powerfuly at <object>",
            object: enemy, positive: true),
        () => a.report(
            s,
            "<subject> swing<s> "
            "{<subject's> ${a.currentWeapon.name} |}at <object> "
            "with great force",
            object: enemy, positive: true));

    var slashSituation =
        new SlashSituation.initialized(a, enemy, extraForce: true);
    w.pushSituation(slashSituation);
    var slashDefenseSituation =
        new SlashDefenseSituation.initialized(a, enemy, extraForce: true);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} starts a slash at ${enemy.name} with extra force";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) =>
      actor.isPlayer ? 0.9 : 0.3;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      a.pose == Pose.standing &&
      enemy.pose != Pose.onGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) => new StartSlash(enemy);
}
