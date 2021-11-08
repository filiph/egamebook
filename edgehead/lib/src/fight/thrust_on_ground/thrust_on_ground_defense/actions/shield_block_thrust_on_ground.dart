// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';

ReasonedSuccessChance computeShieldBlockThrustOnGround(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.9, w.statefulRandomState, [
    const Modifier(20, CombatReason.dexterity),
    const Bonus(70, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class ShieldBlockThrustOnGround extends OtherActorAction {
  static final ShieldBlockThrustOnGround singleton =
      ShieldBlockThrustOnGround();

  static const String className = "ShieldBlockThrustOnGround";

  @override
  final String helpMessage = "A shield blocks enemy attacks with the least "
      "amount of energy and movement. It is easy and quick to launch "
      "a counter-attack when the enemy's weapon is stopped in this way.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate =>
      const ["block with shield and counter"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> block the thrust?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> tr<ies> to {block|stop|deflect} the {thrust|attack|strike} "
        "with <object2>",
        object2: a.currentShield);
    Randomly.run(
        () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
        () => a.report(s, "<subject> <is> too slow", but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    w.popSituation(context);
    return "${a.name} fails to block ${enemy.name} with shield while on ground";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;

    a.report(
        s,
        "<subject> {block<s>|stop<s>|deflect<s>} the {thrust|attack|strike} "
        "with <object2>",
        object2: a.currentShield,
        positive: true);

    w.popSituationsUntil("FightSituation", context);
    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }
    var counterAttackSituation =
        CounterAttackSituation.initialized(w.randomInt(), a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} blocks ${enemy.name} with a shield while on the ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeShieldBlockThrustOnGround(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.anatomy.isBlind && a.currentShield != null;
}
