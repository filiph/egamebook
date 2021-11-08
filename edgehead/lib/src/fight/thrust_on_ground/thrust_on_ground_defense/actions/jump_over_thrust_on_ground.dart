// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';

ReasonedSuccessChance computeJumpOverThrustOnGround(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.9, w.statefulRandomState, [
    const Modifier(30, CombatReason.dexterity),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
    const Penalty(70, CombatReason.performerHasLimitedMobility),
  ]);
}

class JumpOverThrustOnGround extends OtherActorAction {
  static final JumpOverThrustOnGround singleton = JumpOverThrustOnGround();

  static const String className = "JumpOverThrustOnGround";

  @override
  final String helpMessage = "A thrust by someone lying on the ground "
      "is relatively easy to avoid by just jumping over it.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const ["jump over it & counter"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> avoid it?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> tr<ies> to jump out of the way");
    Randomly.run(
        () => a.report(s, "<subject> {can't|fail<s>|<does>n't succeed}",
            but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    w.popSituation(context);
    return "${a.name} fails to jump over ${enemy.name}'s thrust on ground";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
      s,
      "<subject> jump<s> over <objectPronoun>",
      object: MoveEntity.getFromAttackerSituation(context.world),
      positive: true,
    );
    w.popSituationsUntil("FightSituation", context);
    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }

    var counterAttackSituation =
        CounterAttackSituation.initialized(w.randomInt(), a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} jumps over ${enemy.name}'s thrust on ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeJumpOverThrustOnGround(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      enemy.isOnGround && !a.isOnGround && !a.anatomy.isBlind;
}
