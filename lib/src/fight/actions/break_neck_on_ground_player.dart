import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/break_neck_on_ground.dart';
import 'package:edgehead/src/fight/break_neck/break_neck_situation.dart';
import 'package:edgehead/src/fight/break_neck/wrestle_defense/wrestle_defense_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

class StartBreakNeckOnGroundPlayer extends StartBreakNeckOnGround {
  @override
  bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  StartBreakNeckOnGroundPlayer(Actor enemy) : super(enemy);

  @override
  String get rollReasonTemplate => "will <subject> succeed?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    _applyPredetermined(a, s, w, Predetermination.successGuaranteed);
    return "${a.name} throws self down on ${enemy.name} to (failed) break neck";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    _applyPredetermined(a, s, w, Predetermination.failureGuaranteed);
    return "${a.name} throws self down on ${enemy.name} "
        "to (successful) break neck";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 0.7;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      a.isPlayer && enemy.isOnGround;

  void _applyPredetermined(
      Actor a, Storyline s, WorldState w, Predetermination predetermination) {
    a.report(s, "<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",
        object: enemy);
    w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
    var breakNeckOnGroundSituation =
        new BreakNeckOnGroundSituation.initialized(a, enemy);
    w.pushSituation(breakNeckOnGroundSituation);
    var onGroundWrestleDefenseSituation =
        new OnGroundWrestleDefenseSituation.initialized(a, enemy,
            predeterminedResult: predetermination);
    w.pushSituation(onGroundWrestleDefenseSituation);
  }

  static EnemyTargetAction builder(Actor enemy) =>
      new StartBreakNeckOnGroundPlayer(enemy);
}
