import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/damage_reports.dart';

import 'slash_defense_situation.dart';
import 'slash_situation.dart';

class FinishSlash extends EnemyTargetAction {
  FinishSlash(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "kill <object> "
      "(WARNING should not be user-visible)";

  @override
  final String helpMessage = null;

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    w.updateActorById(enemy.id, (b) => b..hitpoints -= 1);
    bool killed = w.getActorById(enemy.id).isAlive;
    if (killed) {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} <object's> "
          "{shoulder|abdomen|thigh}",
          object: enemy,
          positive: true);
      reportPain(s, enemy);
    } else {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} {across|through} <object's> "
          "{neck|abdomen|lower body}",
          object: enemy,
          positive: true);
      reportDeath(s, enemy);
    }
    return "${a.name} slashes${killed ? ' (and kills)' : ''} ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState w) => a.wields(ItemType.SWORD);

  static EnemyTargetAction builder(Actor enemy) => new FinishSlash(enemy);
}

class StartSlash extends EnemyTargetAction {
  StartSlash(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "swing at <object>";

  @override
  final String helpMessage = "The basic swordfighting move is also often the "
      "most effective.";

  @override
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
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
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      a.pose == Pose.standing &&
      enemy.pose != Pose.onGround &&
      a.wields(ItemType.SWORD);

  static EnemyTargetAction builder(Actor enemy) => new StartSlash(enemy);
}
