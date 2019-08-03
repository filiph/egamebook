import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/throw/move_projectile_to_ground.dart';

ReasonedSuccessChance computeShieldBlockThrow(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.7, [
    const Modifier(50, CombatReason.dexterity),
    const Modifier(30, CombatReason.balance),
    const Penalty(100, CombatReason.performerHasLimitedVision),
    const Penalty(20, CombatReason.performerHasLimitedMobility),
  ]);
}

class ShieldBlockThrow extends OtherActorAction {
  static final ShieldBlockThrow singleton = ShieldBlockThrow();

  static const String className = "ShieldBlockThrow";

  @override
  final String helpMessage = "A shield blocks missiles with the least "
      "amount of energy and movement. It also keeps the projectile at hand: "
      "the projectile bounces off the shield and falls close by.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const ["block with shield"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> block it?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Item projectile = enemy.currentWeapon;
    a.report(
        s,
        "<subject> tr<ies> to {block|stop|deflect} the <object> "
        "with <object2>",
        object2: a.currentShield,
        object: projectile);
    if (a.pose == Pose.offBalance) {
      a.report(s, "<subject> <is> out of balance", but: true);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
          () => a.report(s, "<subject> <is> too slow", but: true),
          () => enemy.report(
              s,
              "<subject> {<is>|fl<ies>} too quick "
              "for <object>",
              object: projectile,
              but: true));
    }
    w.popSituation(sim);
    return "${a.name} fails to block ${enemy.name}'s throw with shield";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Item projectile = enemy.currentWeapon;
    a.report(
        s,
        "<subject> {block<s>|stop<s>|deflect<s>} the <object> "
        "with <object2>",
        object2: a.currentShield,
        object: projectile,
        positive: true);
    projectile.report(s, "<subject> bounce<s> off the shield");
    projectile.report(s, "<subject> fall<s> to ground");
    moveProjectileToGround(w, enemy, projectile, false);
    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} blocks ${enemy.name} with a shield";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeShieldBlockThrow(a, sim, w, enemy));
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      !a.anatomy.isBlind && a.currentShield != null;
}
