import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';

ReasonedSuccessChance computeOnGroundParry(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.5, [
    const Bonus(70, CombatReason.dexterity),
  ]);
}

OtherActorAction onGroundParryBuilder(Actor enemy) => new OnGroundParry(enemy);

/// TODO: find a reason why to take this choice. Maybe allow counter?
class OnGroundParry extends OtherActorAction {
  static const String className = "OnGroundParry";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final String helpMessage = "Why would you move? Just put your weapon up.";

  OnGroundParry(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "parry it";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> parry it?";

  @override
  String applyFailure(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> tr<ies> to {parry|deflect it|"
        "stop it{| with ${weaponAsObject2(a)}}}");
    Randomly.run(
        () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
        () => target.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    w.popSituation(sim);
    return "${a.name} fails to parry ${target.name}";
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> {parr<ies> it|"
        "stop<s> it with ${weaponAsObject2(a)}}",
        positive: true);
    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} parries ${target.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeOnGroundParry(a, sim, w, target));
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world) =>
      target.currentWeapon.damageCapability.isSlashing &&
      a.currentWeapon.damageCapability.type.canParrySlash;
}
