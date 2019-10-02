import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/throw/move_projectile_to_ground.dart';

ReasonedSuccessChance computeDodgeThrow(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.6, [
    const Modifier(60, CombatReason.dexterity),
    const Modifier(50, CombatReason.balance),
    const Penalty(100, CombatReason.performerHasLimitedVision),
    const Penalty(50, CombatReason.performerHasLimitedMobility),
  ]);
}

class DodgeThrow extends OtherActorAction {
  static final DodgeThrow singleton = DodgeThrow();

  static const String className = "DodgeThrow";

  @override
  final String helpMessage = "Dodging means moving my body out of harm's "
      "way. When done correctly, the projectile will fly past me and I will "
      "keep my balance.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const ["dodge"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> dodge?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Item projectile = enemy.currentWeapon;
    final dodgeDescription =
        a.isOnGround ? '{dodge|roll out of the way}' : '{dodge|sidestep}';
    a.report(s, "<subject> tr<ies> to $dodgeDescription");
    if (a.pose == Pose.offBalance) {
      a.report(s, "<subject> <is> out of balance", but: true);
    } else {
      projectile.report(s, "<subject> fl<ies> too fast", but: true);
    }
    w.popSituation(sim);
    return "${a.name} fails to dodge ${enemy.name}'s throw";
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
        "<subject> "
        "{{dodge<s>|avoid<s>} <object>|move<s> out of <object's> way}",
        object: projectile,
        positive: true);
    moveProjectileToGround(w, enemy, projectile, true);
    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} dodges ${enemy.name}'s throw";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeDodgeThrow(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.anatomy.isBlind;
}
