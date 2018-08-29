import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';
import 'package:edgehead/writers_helpers.dart';

ReasonedSuccessChance computeThrowSpear(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.1, [
    const Bonus(20, CombatReason.dexterity),
    const Bonus(20, CombatReason.targetWithoutShield),
    const Bonus(20, CombatReason.balance),
    const Bonus(20, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(20, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(80, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class ThrowSpear extends EnemyTargetAction {
  static const String className = "ThrowSpear";

  static final ThrowSpear singleton = ThrowSpear();

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  String helpMessage = "The enemy is far enough for you to throw a spear "
      "at them and ready your other weapon before they close in.";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  String get commandTemplate => "throw spear at <object>";

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
    final spear = _findSpear(a);
    _startThrowSpearReportStart(a, sim, w, s, enemy, spear);
    if (enemy.currentShield != null) {
      enemy.report(s, "<subject> deflects it with <subject's> <object>",
          positive: true, but: true, object: enemy.currentShield);
    } else {
      enemy.report(s, "<subject> {dodge<s> it|move<s> out of the way}",
          positive: true, but: true);
    }
    final ground = getGroundMaterial(w);
    spear.report(
        s,
        "<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the $ground"
        "{| nearby| not far from here}");
    _moveSpearToGround(w, a, spear);
    return "${a.name} fails to hit ${enemy.name} with spear";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final spear = _findSpear(a);
    assert(spear.isWeapon);
    _startThrowSpearReportStart(a, sim, w, s, enemy, spear);
    if (enemy.currentShield != null) {
      spear.report(s, "<subject> fl<ies> past <object-owner's> <object>",
          positive: true,
          object: enemy.currentShield,
          objectOwner: enemy,
          owner: a);
    }

    final damage = spear.damageCapability.thrustingDamage;
    w.updateActorById(enemy.id, (b) => b..hitpoints -= damage);
    final updatedEnemy = w.getActorById(enemy.id);
    bool killed = !updatedEnemy.isAlive && updatedEnemy.id != brianaId;
    if (!killed) {
      final bodyPart = _createBodyPartEntity(
          a, "{shoulder|{left|right} arm|{left|right} thigh}");
      spear.report(
          s,
          "<subject> {pierce<s>|ram<s> into|drill<s> through} "
          "<object-owner's> <object>",
          owner: a,
          objectOwner: updatedEnemy,
          object: bodyPart,
          positive: true);
      reportPain(context, updatedEnemy, damage);
    } else {
      final bodyPart = _createBodyPartEntity(a, "{chest|eye|neck}");
      spear.report(
          s,
          "<subject> {pierce<s>|ram<s> into|drill<s> through} "
          "<object-owner's> <object>",
          owner: a,
          objectOwner: updatedEnemy,
          object: bodyPart,
          positive: true);
      killHumanoid(context, updatedEnemy);
    }
    _moveSpearToGround(w, a, spear);
    return "${a.name} hits ${enemy.name} with spear";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState world, Actor enemy) {
    return computeThrowSpear(a, sim, world, enemy);
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      a.isPlayer &&
      a.isStanding &&
      a.inventory.hasWeapon(WeaponType.spear) &&
      a.anatomy.anyWeaponAppendageAvailable &&
      _isFirstTurnInFightSituation(world, enemy);

  Entity _createBodyPartEntity(Actor a, String name) {
    return Entity(name: Randomly.parse(name), team: a.team);
  }

  Item _findSpear(Actor a) {
    if (a.currentWeapon != null &&
        a.currentWeapon.damageCapability.type == WeaponType.spear) {
      return a.currentWeapon;
    }
    for (var weapon in a.inventory.weapons) {
      if (weapon.damageCapability.type == WeaponType.spear) {
        return weapon;
      }
    }
    throw StateError("No spear found in $a");
  }

  bool _isFirstTurnInFightSituation(WorldState world, Actor enemy) {
    final situation =
        world.getSituationByName<FightSituation>(FightSituation.className);
    return situation.time == 0;
  }

  /// Moves [spear] from actor's hand ([Actor.currentWeapon]) or inventory
  /// ([Actor.weapons]) to the ground. If actor's hand was emptied, a new
  /// weapon (or a fist/claw) is put in it.
  void _moveSpearToGround(WorldStateBuilder w, Actor a, Item spear) {
    final fightSituation =
        w.getSituationByName<FightSituation>(FightSituation.className);
    if (a.currentWeapon == spear) {
      w.updateActorById(a.id, (b) {
        return b
          ..inventory.remove(spear)
          ..inventory.equipBestAvailable(a.anatomy);
      });
    } else {
      w.updateActorById(a.id, (b) => b.inventory.remove(spear));
    }
    w.replaceSituationById(fightSituation.id,
        fightSituation.rebuild((b) => b..droppedItems.add(spear)));
  }

  void _startThrowSpearReportStart(Actor a, Simulation sim, WorldStateBuilder w,
          Storyline s, Actor enemy, Item spear) =>
      a.report(
        s,
        "<subject> {throw<s>|hurl<s>|cast<s>} "
            "${entityAsObject2(a, spear)} at <object>",
        object: enemy,
      );
}
