import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/break_neck/break_neck_situation.dart';
import 'package:edgehead/src/fight/break_neck/wrestle_defense/wrestle_defense_situation.dart';

class StartBreakNeckOnGround extends EnemyTargetAction {
  static const String className = "StartBreakNeckOnGround";

  @override
  final String helpMessage =
      "This move is hard, but when succesful, it's decisive.";

  @override
  final bool isAggressive = true;

  StartBreakNeckOnGround(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "break <object's> neck";

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => null;

  @override
  String get rollReasonTemplate => null;

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",
        object: enemy);
    w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
    var breakNeckOnGroundSituation =
        new BreakNeckOnGroundSituation.initialized(a, enemy);
    w.pushSituation(breakNeckOnGroundSituation);
    var onGroundWrestleDefenseSituation =
        new OnGroundWrestleDefenseSituation.initialized(a, enemy);
    w.pushSituation(onGroundWrestleDefenseSituation);
    return "${a.name} throws self down on ${enemy.name} to break neck";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      !a.isPlayer && enemy.isOnGround;

  static EnemyTargetAction builder(Actor enemy) =>
      new StartBreakNeckOnGround(enemy);
}
