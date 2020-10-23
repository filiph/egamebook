import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';

ReasonedSuccessChance computeOnGroundParry(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.5, [
    const Modifier(70, CombatReason.dexterity),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class OnGroundParry extends OtherActorAction {
  static final OnGroundParry singleton = OnGroundParry();

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
  final String helpMessage = "Why move? I'll just put my weapon up and stop "
      "the threat mid-swing. That will leave my enemy exposed.";

  @override
  List<String> get commandPathTemplate => ["parry it"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> parry it?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> tr<ies> to {parry|deflect it}");
    Randomly.run(
        () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    w.popSituation(context);
    return "${a.name} fails to parry ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Randomly.run(
      () => a.report(s, "<subject> parr<ies> it", positive: true),
      () => a.report(s, "<subject> deflect<s> it with <object2>",
          object2: a.currentWeaponOrBodyPart, positive: true),
    );

    if (enemy.pose > Pose.extended) {
      // We have to use an entity for "this" here, so that the enemy
      // can be an object in the sentence. If enemy was a subject,
      // we would get reports such as "This leaves she extended."
      final thisEntity = Entity(name: 'this', isCommon: true);
      thisEntity.report(s, "this leaves <object> extended",
          object: enemy, negative: true);
      w.updateActorById(enemy.id, (b) => b.pose = Pose.extended);
    }

    w.popSituationsUntil("FightSituation", context);
    return "${a.name} parries ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeOnGroundParry(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      !a.anatomy.isBlind &&
      enemy.currentDamageCapability.isSlashing &&
      a.currentDamageCapability.type.canParrySlash;
}
