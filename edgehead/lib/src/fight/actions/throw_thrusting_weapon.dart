import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';
import 'package:edgehead/writers_helpers.dart';

ReasonedSuccessChance computeThrowSword(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.1, [
    const Modifier(40, CombatReason.dexterity),
    const Penalty(20, CombatReason.targetHasShield),
    const Modifier(20, CombatReason.balance),
    const Bonus(20, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(20, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(80, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class ThrowThrustingWeapon extends EnemyTargetAction
    with ComplexCommandPath<Actor> {
  static const String className = "ThrowThrustingWeapon";

  static final ThrowThrustingWeapon singleton = ThrowThrustingWeapon();

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  String helpMessage = "Unorthodox and unexpected, but can serve in a pinch. "
      "Especially if you have another weapon to use.`";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate =>
      ["attack <object>", "kill", "throw current weapon"];

  @override
  String get commandTemplate => "throw >> your weapon >> at <object>";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> hit <object>?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final sword = a.currentWeapon;
    _startThrowSwordReportStart(a, sim, w, s, enemy, sword);
    bool outOfReach;
    if (enemy.currentShield != null) {
      enemy.report(s, "<subject> deflects it with <subject's> <object>",
          positive: true, but: true, object: enemy.currentShield);
      outOfReach = false;
    } else {
      if (w.randomBool()) {
        enemy.report(s, "<subject> {dodge<s> it|move<s> out of the way}",
            positive: true, but: true);
        outOfReach = true;
      } else {
        sword.report(s, "<subject> land<s> flat on <object's> body",
            object: enemy, positive: false, but: true);
        sword.report(s, "<subject> bounce<s> off", positive: false);
        outOfReach = false;
      }
    }
    final ground = getGroundMaterial(w);
    sword.report(
        s,
        "<subject> land<s> on the $ground " +
            (outOfReach ? "behind <object>" : "next to <object>"),
        object: enemy);
    _moveSwordToGround(w, a, sword, outOfReach);
    return "${a.name} fails to hit ${enemy.name} with spear";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final sword = a.currentWeapon;
    assert(sword.isWeapon);
    _startThrowSwordReportStart(a, sim, w, s, enemy, sword);
    if (enemy.currentShield != null) {
      sword.report(s, "<subject> fl<ies> past <objectOwner's> <object>",
          positive: true,
          object: enemy.currentShield,
          objectOwner: enemy,
          owner: a);
    }

    final damage = sword.damageCapability.thrustingDamage;
    // TODO: pick actual part of body at random
    w.updateActorById(enemy.id, (b) => b..hitpoints -= damage);
    final updatedEnemy = w.getActorById(enemy.id);
    bool killed = !updatedEnemy.isAlive && updatedEnemy.id != brianaId;
    if (!killed) {
      final bodyPart = _createBodyPartEntity(
          a, "{shoulder|{left|right} arm|{left|right} thigh}");
      sword.report(
          s,
          "<subject> {pierce<s>|ram<s> into|drill<s> through} "
          "<objectOwner's> <object>",
          owner: a,
          objectOwner: updatedEnemy,
          object: bodyPart,
          positive: true);
      reportPain(context, updatedEnemy, damage);
    } else {
      final bodyPart = _createBodyPartEntity(a, "{chest|eye|neck}");
      sword.report(
          s,
          "<subject> {pierce<s>|ram<s> into|drill<s> through} "
          "<objectOwner's> <object>",
          owner: a,
          objectOwner: updatedEnemy,
          object: bodyPart,
          positive: true);
      killHumanoid(context, updatedEnemy);
    }

    sword.report(s, "<subject> fall<s> to the ground");
    _moveSwordToGround(w, a, sword, false);
    return "${a.name} hits ${enemy.name} with sword";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState world, Actor enemy) {
    return computeThrowSword(a, sim, world, enemy);
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      a.isPlayer /* TODO: turn into a defensible action and lose this */ &&
      a.inventory.currentWeapon.damageCapability.isThrusting &&
      !a.anatomy.isBlind &&
      !a.hasCrippledArms &&
      recentlyForcedToGround(a, world);

  Entity _createBodyPartEntity(Actor a, String name) {
    return Entity(name: Randomly.parse(name), team: a.team);
  }

  /// Moves [sword] from actor's hand ([Actor.currentWeapon]) to the ground.
  void _moveSwordToGround(
      WorldStateBuilder w, Actor a, Item sword, bool outOfReach) {
    final fightSituation =
        w.getSituationByName<FightSituation>(FightSituation.className);
    w.updateActorById(
        a.id,
        (b) => b
          ..inventory.remove(sword)
          ..inventory.goBarehanded(a.anatomy));
    w.replaceSituationById(fightSituation.id, fightSituation.rebuild((b) {
      if (outOfReach) {
        b.droppedItemsOutOfReach.add(sword);
      } else {
        b.droppedItems.add(sword);
      }
    }));
  }

  void _startThrowSwordReportStart(Actor a, Simulation sim, WorldStateBuilder w,
          Storyline s, Actor enemy, Item sword) =>
      a.report(
        s,
        "<subject> {throw<s>|hurl<s>|cast<s>} "
            "${entityAsObject2(a, sword)} at <object>",
        object: enemy,
      );
}
