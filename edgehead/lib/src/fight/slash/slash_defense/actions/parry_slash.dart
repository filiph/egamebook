// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';

ReasonedSuccessChance computeParrySlash(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.6, w.statefulRandomState, [
    const Modifier(50, CombatReason.dexterity),
    const Modifier(70, CombatReason.balance),
    ...disabledModifiers,
  ]);
}

class ParrySlash extends OtherActorAction {
  static final ParrySlash singleton = ParrySlash();

  static const String className = "ParrySlash";

  @override
  final String helpMessage = "Parrying means deflecting my opponent's move "
      "with my weapon. When successful, "
      "it will give me an opportunity for a counter attack. It won't "
      "throw my opponent off balance like dodging does, but it's also "
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
  List<String> get commandPathTemplate => ["parry and counter"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> parry?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> tr<ies> to {parry|deflect it|fend it off}");
    if (a.pose == Pose.offBalance) {
      a.report(s, "<subject> <is> out of balance", but: true);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
          () => enemy.report(s, "<subject> <is> too quick for <object>",
              object: a, but: true));
    }
    w.popSituation(context);
    return "${a.name} fails to parry ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    if (enemy.pose == Pose.offBalance) {
      s.add("<subject> <is> out of balance",
          subject: enemy, negative: true, startSentence: true);
      s.add("so <ownerPronoun's> <subject> is {weak|feeble}",
          owner: enemy,
          subject: MoveEntity.getFromAttackerSituation(context.world));
      a.report(
          s,
          "<subject> {parr<ies> it easily|"
          "easily meet<s> it|"
          "fend<s> it off easily} with <object2>",
          object2: a.currentWeaponOrBodyPart,
          positive: true);
    } else {
      a.report(
          s,
          "<subject> {parr<ies> it|"
          "meet<s> it|"
          "fend<s> it off} with <object2>",
          object2: a.currentWeaponOrBodyPart,
          positive: true);
    }
    w.popSituationsUntil("FightSituation", context);

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
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.anatomy.isBlind && a.currentDamageCapability.type.canParrySlash;
}
