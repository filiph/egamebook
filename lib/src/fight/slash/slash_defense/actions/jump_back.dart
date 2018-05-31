import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';

ReasonedSuccessChance computeJumpBackSlash(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.9, [
    const Bonus(90, CombatReason.dexterity),
    const Bonus(10, CombatReason.balance),
  ]);
}

EnemyTargetAction jumpBackFromSlashBuilder(Actor enemy) =>
    new JumpBackFromSlash(enemy);

class JumpBackFromSlash extends EnemyTargetAction {
  static const String className = "JumpBackFromSlash";

  @override
  final String helpMessage = "Jump back and the weapon can't reach you.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  JumpBackFromSlash(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "jump back";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> avoid the slash?";

  @override
  String applyFailure(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> {jump<s>|leap<s>} {back|backward} "
        "but <subject> <is> {not fast enough|too slow}.",
        wholeSentence: true);
    w.popSituation(sim);
    return "${a.name} fails to jump back from ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",
        positive: true);
    s.add("<owner's> <subject> {slash<es>|cut<s>} empty air",
        subject: enemy.currentWeapon, owner: enemy);
    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} jumps back from ${enemy.name}'s attack";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeJumpBackSlash(a, sim, w, enemy));
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) =>
      a.isBarehanded && enemy.currentWeapon.damageCapability.isSlashing;
}
