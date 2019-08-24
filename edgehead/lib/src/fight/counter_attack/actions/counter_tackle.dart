import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

ReasonedSuccessChance computeCounterTackle(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.5, [
    const Modifier(90, CombatReason.dexterity),
    const Modifier(50, CombatReason.balance),
    const Bonus(50, CombatReason.targetHasOneLegDisabled),
    const Bonus(70, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class CounterTackle extends EnemyTargetAction {
  static const String className = "CounterTackle";

  static final CounterTackle singleton = CounterTackle();

  @override
  final String helpMessage = "When an opponent misses you like that, it's "
      "a rare (though still dangerous) opportunity to bring them down.";

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => ["tackle <object>"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> tackle <objectPronoun>?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> tr<ies> to tackle <object>", object: enemy);
    Randomly.run(
        () => a.report(s, "<subject> go<es> wide", but: true),
        () =>
            enemy.report(s, "<subject> {evade<s>|sidestep<s>} it", but: true));
    a.report(
        s, "<subject> land<s> on the ${getGroundMaterial(w)} next to <object>",
        object: enemy);
    w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
    return "${a.name} fails to tackle ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> tackle<s> <object> to the ground", object: enemy);
    w.updateActorById(enemy.id, (b) => b..pose = Pose.onGround);
    w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
    return "${a.name} tackles ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    return computeCounterTackle(a, sim, w, enemy);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.isOnGround && !a.anatomy.isBlind;
}
