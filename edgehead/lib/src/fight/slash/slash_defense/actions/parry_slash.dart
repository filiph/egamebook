import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';

final Entity swing =
    Entity(name: "swing", team: neutralTeam, nameIsProperNoun: true);

ReasonedSuccessChance computeParrySlash(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.4, [
    const Bonus(50, CombatReason.dexterity),
    const Bonus(70, CombatReason.balance),
    const Bonus(50, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(90, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class ParrySlash extends OtherActorAction {
  static final ParrySlash singleton = ParrySlash();

  static const String className = "ParrySlash";

  @override
  final String helpMessage = "Parrying means deflecting your opponent's move "
      "with your weapon. When successful, "
      "it will give you an opportunity for a counter attack. It won't "
      "throw your opponent off balance like dodging does, but it's also "
      "slightly easier to do.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  String get commandTemplate => "parry and counter";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> parry?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> tr<ies> to {parry|deflect it|"
        "meet it with ${weaponAsObject2(a)}|"
        "fend it off}");
    if (a.isOffBalance) {
      a.report(s, "<subject> <is> out of balance", but: true);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
          () => enemy.report(s, "<subject> <is> too quick for <object>",
              object: a, but: true));
    }
    w.popSituation(sim);
    return "${a.name} fails to parry ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    if (enemy.isOffBalance) {
      s.add("<subject> <is> out of balance",
          subject: enemy, negative: true, startSentence: true);
      s.add("so <ownerPronoun's> <subject> is {weak|feeble}",
          owner: enemy, subject: swing);
      a.report(
          s,
          "<subject> {parr<ies> it easily|"
          "easily meet<s> it with ${weaponAsObject2(a)}|"
          "fend<s> it off easily}",
          positive: true);
    } else {
      a.report(
          s,
          "<subject> {parr<ies> it|"
          "meet<s> it with ${weaponAsObject2(a)}|"
          "fend<s> it off}",
          positive: true);
    }
    w.popSituationsUntil("FightSituation", sim);

    if (context.world.situations
        .any((situation) => situation is CounterAttackSituation)) {
      return "${a.name} dodges ${enemy.name} (and doesn't get to create "
          "a counter attack because we're already inside one)";
    }

    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }
    var counterAttackSituation =
        CounterAttackSituation.initialized(w.randomInt(), a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} parries ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeParrySlash(a, sim, w, enemy));
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      a.currentWeapon.damageCapability.type.canParrySlash;
}
