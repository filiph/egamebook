import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';

ReasonedSuccessChance computeCatchProjectile(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.05, [
    const Modifier(30, CombatReason.dexterity),
    const Modifier(10, CombatReason.balance),
    const Penalty(30, CombatReason.performerHasLimitedVision),
  ]);
}

class CatchProjectile extends OtherActorAction {
  static final CatchProjectile singleton = CatchProjectile();

  static const String className = "CatchProjectile";

  @override
  final String helpMessage =
      "Catching a missile as it flies at you is not only "
      "a net trick. It also lets you immediately use it.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const ["catch"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> catch it?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Item projectile = enemy.currentWeapon;
    a.report(
        s,
        "<subject> {tr<ies>|attempt<s>} to catch <object> "
        "{in the air|as <object> flies towards <subjectPronounAccusative>} "
        "but <subject> <is> {not fast enough|too slow}.",
        object: projectile,
        wholeSentence: true);
    w.popSituation(sim);
    return "${a.name} fails to catch projectile from ${enemy.name}";
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
        "<subject> catch<es> <object> "
        "{in the air|as <object> flies towards <subjectPronounAccusative>}",
        object: projectile,
        positive: true);

    assert(projectile == enemy.currentWeapon);
    w.updateActorById(
        enemy.id,
        (b) => b
          ..inventory.remove(projectile)
          ..inventory.goBarehanded(enemy.anatomy));
    w.updateActorById(a.id, (b) => b..inventory.equip(projectile, a.anatomy));

    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} catches ${enemy.name}'s projectile in air";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeCatchProjectile(a, sim, w, enemy));
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      !a.anatomy.isBlind &&
      a.anatomy.anyWeaponAppendageAvailable &&
      // Only dexterous people can do this.
      a.dexterity > 100;
}
