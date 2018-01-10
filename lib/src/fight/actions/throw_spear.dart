import 'package:edgehead/edgehead_lib.dart' show brianaId;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/fist.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';
import 'package:edgehead/writers_helpers.dart';

class ThrowSpear extends EnemyTargetAction {
  static const String className = "ThrowSpear";

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

  ThrowSpear(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "throw spear at <object>";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> hit <object>?";

  @override
  String applyFailure(ActionContext context) {
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
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final spear = _findSpear(a);
    _startThrowSpearReportStart(a, sim, w, s, enemy, spear);
    if (enemy.currentShield != null) {
      spear.report(s, "<subject> fl<ies> past <object-owner's> <object>",
          positive: true,
          object: enemy.currentShield,
          objectOwner: enemy,
          owner: a);
    }

    final damage = spear.thrustingDamage;
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
  num getSuccessChance(Actor a, Simulation sim, WorldState world) {
    final shieldPenalty = enemy.currentShield != null ? 0.2 : 0.0;
    return 0.4 - shieldPenalty;
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world) =>
      a.isPlayer &&
      a.isStanding &&
      (a.currentWeapon.type == WeaponType.spear ||
          a.hasWeapon(WeaponType.spear)) &&
      _isFirstTurnInFightSituation(world);

  Entity _createBodyPartEntity(Actor a, String name) {
    return new Entity(name: Randomly.parse(name), team: a.team);
  }

  Weapon _findSpear(Actor a) {
    if (a.currentWeapon != null && a.currentWeapon.type == WeaponType.spear) {
      return a.currentWeapon;
    }
    for (var weapon in a.weapons) {
      if (weapon.type == WeaponType.spear) {
        return weapon;
      }
    }
    throw new StateError("No spear found in $a");
  }

  bool _isFirstTurnInFightSituation(WorldState world) {
    final situation =
        world.getSituationByName<FightSituation>(FightSituation.className);
    return situation.time == 0;
  }

  /// Moves [spear] from actor's hand ([Actor.currentWeapon]) or inventory
  /// ([Actor.weapons]) to the ground. If actor's hand was emptied, a new
  /// weapon (or [defaultFist]) is put in it.
  void _moveSpearToGround(WorldStateBuilder w, Actor a, Weapon spear) {
    final fightSituation =
        w.getSituationByName<FightSituation>(FightSituation.className);
    if (a.currentWeapon == spear) {
      final Weapon weapon = a.findBestWeapon() ?? defaultFist;
      w.updateActorById(
          a.id,
          (b) => b
            ..currentWeapon = weapon.toBuilder()
            ..weapons.remove(weapon));
    } else {
      w.updateActorById(a.id, (b) => b..weapons.remove(spear));
    }
    w.replaceSituationById(fightSituation.id,
        fightSituation.rebuild((b) => b..droppedItems.add(spear)));
  }

  void _startThrowSpearReportStart(Actor a, Simulation sim, WorldStateBuilder w,
          Storyline s, Actor enemy, Weapon spear) =>
      a.report(
        s,
        "<subject> {throw<s>|hurl<s>|cast<s>} "
            "${entityAsObject2(a, spear)} at <object>",
        object: enemy,
      );

  static EnemyTargetAction builder(Actor enemy) => new ThrowSpear(enemy);
}
