// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/bite/bite_situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';

ReasonedSuccessChance computeJumpBackBite(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.9, w.statefulRandomState, [
    const Modifier(90, CombatReason.dexterity),
    const Modifier(10, CombatReason.balance),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(90, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class JumpBackFromBite extends OtherActorAction {
  static final JumpBackFromBite singleton = JumpBackFromBite();

  static const String className = "JumpBackFromBite";

  @override
  final String helpMessage = "Jump back and the teeth can't reach me.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => ["jump back"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> avoid the teeth?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, biteSituationName);
    a.report(
        s,
        "<subject> {jump<s>|leap<s>} {back|backward} "
        "but <subject> <is> {not fast enough|too slow}.",
        wholeSentence: true,
        actionThread: thread);

    w.popSituation(context);
    return "${a.name} fails to jump back from ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final situation =
        w.getSituationByName<AttackerSituation>(biteSituationName);
    final thread = situation.id;
    a.report(s, "<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",
        positive: true, actionThread: thread);
    s.add("<owner's> <subject> {snap<s> at|bite<s>} empty air",
        subject: enemy.currentWeaponOrBodyPart,
        owner: enemy,
        actionThread: thread);

    w.popSituationsUntil("FightSituation", context);
    return "${a.name} jumps back from ${enemy.name}'s attack";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeJumpBackBite(a, sim, w, enemy));
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      !a.anatomy.isBlind && a.holdsNoWeapon && !a.isOnGround;
}
