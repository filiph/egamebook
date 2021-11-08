// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/decide_slashing_hit.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/apply_slash.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/sweep_feet/sweep_feet_situation.dart';

ReasonedSuccessChance computeCounterSweepFeet(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.3, w.statefulRandomState, const [
    Modifier(30, CombatReason.dexterity),
    Modifier(20, CombatReason.balance),
    ...disabledModifiers,
  ]);
}

class CounterSweepFeet extends OtherActorAction {
  static final CounterSweepFeet singleton = CounterSweepFeet();

  static const String className = "CounterSweepFeet";

  @override
  final String helpMessage = "That's an extended leg down there. I can try "
      "attacking. I should beware, though: this move is a bit more complicated"
      " than just staying away.";

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const ["slash the leg"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> hit the leg "
      "and keep <subject's> stance?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, sweepFeetSituationName);
    a.report(s, "<subject> attempt<s> to counter <object's> foot sweep",
        object: enemy, actionThread: thread);
    a.report(s, "<subject> fail<s> to slash <object's> leg",
        object: enemy, but: true, negative: true, actionThread: thread);
    w.popSituation(context);
    return "${a.name} fails to counter sweep feet from ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, sweepFeetSituationName);
    a.report(s, "<subject> step<s> around the foot sweep",
        actionThread: thread);

    assert(
        enemy.anatomy.isHumanoid,
        "This part assumes that the enemy has legs "
        "and that those are the only 'mobile' bodyparts.");
    var leg = enemy.anatomy.allParts
        .where((part) =>
            part.function == BodyPartFunction.mobile &&
            part.isAnimatedAndActive)
        .first;

    var result = decideSlashingHit(
        enemy, a.currentWeaponOrBodyPart, w.randomInt,
        bodyPart: leg);

    assert(
        result.victim.isAnimated,
        "This assumes the enemy doesn't immediately die from "
        "the leg wound. Which is a safe bet unless they have some really "
        "weird anatomy.");

    applySlash(result, context, enemy,
        null /* we don't want to replace the above with the slash */);

    w.popSituationsUntil("FightSituation", context);

    return "${a.name} successfully counters a sweep feet from ${enemy.name} "
        "($result)";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    return computeCounterSweepFeet(a, sim, w, enemy);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.anatomy.isBlind &&
      a.currentDamageCapability.isSlashing &&
      // Never do this to the player, that would just suck.
      !enemy.isPlayer;
}
