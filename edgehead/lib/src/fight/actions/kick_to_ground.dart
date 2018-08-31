import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

ReasonedSuccessChance computeKickToGround(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.6, [
    const Bonus(70, CombatReason.dexterity),
    const Bonus(50, CombatReason.balance),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(50, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class KickToGround extends EnemyTargetAction {
  static const String className = "KickToGround";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  String helpMessage = "Sweeping opponents off their feet doesn't deal much "
      "damage but on the ground they will be much easier targets for you "
      "and your allies.";

  @override
  String get commandTemplate =>
      "attack <object> >> by kicking <objectPronoun> to the ground";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> kick "
      "<object> prone?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    Randomly.run(() {
      a.report(s, "<subject> kick<s> {at|towards} <object's> feet",
          object: enemy);
      a.report(s, "<subject> mi<sses>", but: true);
    }, () {
      a.report(s, "<subject> kick<s> <object's> shin", object: enemy);
      enemy.report(s, "<subject> <does>n't budge", but: true);
    });
    return "${a.name} fails to sweep ${enemy.name} off feet";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    var groundMaterial = getGroundMaterial(w);
    Randomly.run(() {
      a.report(
          s,
          "<subject> kick<s> <object> off <object's> feet "
          "and to the ground",
          object: enemy,
          positive: true,
          endSentence: true);
    }, () {
      a.report(s, "<subject> kick<s> <object's> {right|left} shin",
          object: enemy, positive: true);
      enemy.report(s, "<subject> {grunt|shriek}<s>");
      enemy.report(s, "<subject> fall<s> to the $groundMaterial",
          negative: true);
    });
    w.updateActorById(enemy.id, (b) => b..pose = Pose.onGround);
    w.recordCustom(fellToGroundCustomEventName, actor: enemy);
    return "${a.name} sweeps ${enemy.name} off feet";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState world, Actor enemy) =>
      computeKickToGround(a, sim, world, enemy);

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      (a.isStanding || a.isOffBalance) && !enemy.isOnGround;

  static final KickToGround singleton = KickToGround();
}
