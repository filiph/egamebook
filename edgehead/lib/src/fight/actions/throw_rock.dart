import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

ReasonedSuccessChance computeThrowRock(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.3, [
    const Modifier(50, CombatReason.dexterity),
    const Penalty(30, CombatReason.targetHasShield),
    const Modifier(20, CombatReason.balance),
    const Bonus(10, CombatReason.targetHasSecondaryArmDisabled),
    const Bonus(10, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(50, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(80, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class ThrowRock extends EnemyTargetAction with CombatCommandPath {
  static const String className = "ThrowRock";

  static final ThrowRock singleton = ThrowRock();

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  String helpMessage = "A good way to put the enemy off balance, from afar.";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  CombatCommandType get combatCommandType => CombatCommandType.stance;

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
    final rock = a.currentWeapon;
    _startThrowRockReportStart(a, sim, w, s, enemy, rock);
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
        rock.report(s, "<subject> land<s> flat on <object's> body",
            object: enemy, positive: false, but: true);
        rock.report(s, "<subject> bounce<s> off", positive: false);
        outOfReach = false;
      }
    }
    final ground = getGroundMaterial(w);
    rock.report(
        s,
        "<subject> land<s> on the $ground " +
            (outOfReach ? "behind <object>" : "next to <object>"),
        object: enemy);
    _moveRockToGround(w, a, rock, outOfReach);
    return "${a.name} fails to hit ${enemy.name} with rock";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final rock = a.currentWeapon;
    assert(rock.isWeapon);
    _startThrowRockReportStart(a, sim, w, s, enemy, rock);
    if (enemy.currentShield != null) {
      rock.report(s, "<subject> fl<ies> past <objectOwner's> <object>",
          positive: true,
          object: enemy.currentShield,
          objectOwner: enemy,
          owner: a);
    }

    final bodyPart = _createBodyPartEntity(
        a, "{shoulder|{left|right} arm|{left|right} thigh|chest|stomach}");
    rock.report(
        s,
        "<subject> {hit<s>|strike<s>} "
        "<objectOwner's> <object>",
        owner: a,
        objectOwner: enemy,
        object: bodyPart,
        positive: true);
    enemy.report(
        s,
        "<subject> "
        "{step<s> back|take<s> two steps back|falter<s>|waver<s>}",
        negative: true);

    if (enemy.pose > Pose.offBalance) {
      enemy.report(s, "<subject> barely keep<s> <subject's> {balance|footing}",
          negative: true);
      w.updateActorById(enemy.id, (b) => b.pose = Pose.offBalance);
    } else {
      enemy.report(s, "<subject> <is> knocked to the ground", negative: true);
      w.updateActorById(enemy.id, (b) => b.pose = Pose.onGround);
      w.recordCustom(fellToGroundCustomEventName, actor: enemy);
    }

    _moveRockToGround(w, a, rock, false);
    return "${a.name} hits ${enemy.name} with rock";
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) {
    return "throw ${weaponAsObject2(context.actor)} at <object>";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState world, Actor enemy) {
    return computeThrowRock(a, sim, world, enemy);
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      a.isPlayer /* TODO: turn into a defensible action and lose this */ &&
      (a.currentWeapon?.damageCapability?.type == WeaponType.rock ?? false) &&
      !a.anatomy.isBlind &&
      !recentlyForcedToGround(a, world) &&
      enemy.pose > Pose.onGround;

  Entity _createBodyPartEntity(Actor a, String name) {
    return Entity(name: Randomly.parse(name), team: a.team);
  }

  /// Moves [rock] from actor's hand ([Actor.currentWeapon]) to the ground.
  void _moveRockToGround(
      WorldStateBuilder w, Actor a, Item rock, bool outOfReach) {
    w.updateActorById(
        a.id,
        (b) => b
          ..inventory.remove(rock)
          ..inventory.goBarehanded(a.anatomy));

    if (outOfReach) {
      // Rocks that fall out of reach just disappear from play.
      return;
    }

    final fightSituation =
        w.getSituationByName<FightSituation>(FightSituation.className);
    w.replaceSituationById(fightSituation.id, fightSituation.rebuild((b) {
      b.droppedItems.add(rock);
    }));
  }

  void _startThrowRockReportStart(Actor a, Simulation sim, WorldStateBuilder w,
          Storyline s, Actor enemy, Item rock) =>
      a.report(
        s,
        "<subject> {throw<s>|hurl<s>|cast<s>} "
        "${entityAsObject2(a, rock)} at <object>",
        object: enemy,
      );
}
