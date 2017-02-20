import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class SweepOffFeet extends EnemyTargetAction {
  static const String className = "SweepOffFeet";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  String helpMessage = "Sweeping opponents off their feet doesn't deal much "
      "damage but on the ground they will be much easier targets for you "
      "and your allies.";

  SweepOffFeet(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "sweep <object> off <objectPronoun's> feet";

  @override
  String get rollReasonTemplate => "will <subject> knock "
      "<object> down?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    Randomly.run(() {
      a.report(s, "<subject> sweep<s> <subject's> legs at <object's> feet",
          object: enemy);
      s.add("they don't connect", but: true, endSentence: true);
    }, () {
      a.report(s, "<subject> kick<s> <object's> shin", object: enemy);
      enemy.report(s, "<subject> <does>n't budge", but: true);
    });
    return "${a.name} fails to sweep ${enemy.name} off feet";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    var groundMaterial =
        w.getSituationByName<FightSituation>("FightSituation").groundMaterial;
    Randomly.run(() {
      a.report(s, "<subject> sweep<s> <object> off <object's> feet",
          object: enemy);
      if (Randomly.tossCoin()) {
        enemy.report(s, "<subject> flail<s> <subject's> arms");
      }
      enemy.report(s, "<subject> fall<s>{| to the $groundMaterial}",
          negative: true);
    }, () {
      a.report(s, "<subject> kick<s> <object's> {right|left} ankle",
          object: enemy, positive: true);
      enemy.report(s, "<subject> {grunt|shriek}<s>");
      enemy.report(s, "<subject> fall<s> to the $groundMaterial",
          negative: true);
    });
    w.updateActorById(enemy.id, (b) => b..pose = Pose.onGround);
    return "${a.name} sweeps ${enemy.name} off feet";
  }

  @override
  num getSuccessChance(Actor a, WorldState world) {
    num outOfBalancePenalty = a.pose == Pose.standing ? 0 : 0.2;
    if (a.isPlayer) return 0.7 - outOfBalancePenalty;
    return 0.5 - outOfBalancePenalty;
  }

  @override
  bool isApplicable(Actor a, WorldState world) =>
      (a.pose == Pose.standing || a.pose == Pose.offBalance) &&
      (enemy.pose != Pose.onGround);

  static EnemyTargetAction builder(Actor enemy) => new SweepOffFeet(enemy);
}
