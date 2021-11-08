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

ReasonedSuccessChance computeEvadeOnGroundChance(
        Actor a, Simulation sim, WorldState w, Actor enemy) =>
    getCombatMoveChance(a, enemy, 0.6, w.statefulRandomState, [
      const Modifier(50, CombatReason.dexterity),
      const Penalty(50, CombatReason.performerHasLimitedVision),
    ]);

class EvadeOnGround extends OtherActorAction {
  static const String className = "EvadeOnGround";

  static final EvadeOnGround singleton = EvadeOnGround();

  @override
  final String helpMessage = "This looks dangerous. Trying to evade this "
      "close-quarter move seems prudent.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => ["evade"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> evade?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    if (enemy.isOnGround) {
      a.report(s, "<subject> tr<ies> to {evade|break free}");
    } else {
      a.report(s, "<subject> tr<ies> to {dodge|roll away}");
    }
    Randomly.run(
        () => a.report(s, "<subject> {can't|fail<s>}", but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    w.popSituation(context);
    return "${a.name} fails to evade ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    if (enemy.isOnGround) {
      a.report(s, "<subject> {evade<s>|break<s> free}", positive: true);
    } else {
      a.report(s, "<subject> {dodge<s>|roll<s> away}", positive: true);
    }
    w.popSituationsUntil("FightSituation", context);
    return "${a.name} evades ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeEvadeOnGroundChance(enemy, sim, w, a));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      true;
}
