import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/inventory.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/loot/loot_situation.dart';

class AutoLoot extends Action<Nothing> {
  static final AutoLoot singleton = AutoLoot();

  static const String className = "AutoLoot";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  bool isImplicit = true;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  List<String> get commandPathTemplate => const [];

  @override
  String get helpMessage => null;

  @override
  String get name => className;

  @override
  String applyFailure(_, __) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, void _) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldState initialWorld = context.world;
    WorldStateBuilder world = context.outputWorld;
    Storyline s = context.outputStoryline;
    assert(_noDuplicateItems(world));
    assert(_noCurrentWeaponsMissingFromInventory(world));

    var situation =
        world.getSituationByName<LootSituation>(LootSituation.className);

    for (final actor in initialWorld.actors) {
      if (actor.isInvincible && actor.isActive && !actor.isAlive) {
        // Invincible actors cannot die.
        a.report(s, "<subject> kneel<s> next to <object>", object: actor);
        a.report(s, "<subject> help<s> <object> to <object's> feet",
            object: actor);
        actor.report(s, "\"I'll live,\" <subject> say<s>.",
            wholeSentence: true);

        final actorBuilder = actor.toBuilder();

        actorBuilder
          ..pose = Pose.offBalance
          ..hitpoints = 1;

        // Revive each body part of an invincible actor.
        deepReplaceBodyPart(
          actor,
          actorBuilder,
          (part) => part.designation == BodyPartDesignation.torso,
          (b, isDescendant) {
            if (b.hitpoints == 0) {
              b.hitpoints = 1;
            }
          },
        );

        world.updateActorById(actor.id, (b) => b.replace(actorBuilder.build()));

        assert(world.getActorById(actor.id).isAlive);
      }
    }

    Item takenWeapon;
    Item takenShield;
    List<Item> takenItems = [];
    for (final item in situation.droppedItems) {
      final currentActor = world.getActorById(a.id);
      // TODO: generalize sword for spear for other weapons
      final isSwordForSpear =
          currentActor.currentWeapon?.damageCapability?.type ==
                  WeaponType.spear &&
              item.isWeapon &&
              item.damageCapability.type == WeaponType.sword;
      if (currentActor.anatomy.anyWeaponAppendageAvailable &&
          item.isWeapon &&
          !item.isShield &&
          (item.value > (currentActor.currentWeapon?.value ?? 0) ||
              isSwordForSpear)) {
        // Arm player with the best weapon available.
        world.updateActorById(a.id, (b) {
          // Wield the new weapon.
          var result = b.inventory.equip(item, currentActor.anatomy);
          assert(result == WeaponEquipResult.equipped);
        });
        takenWeapon = item;
      } else if (currentActor.anatomy.secondaryWeaponAppendageAvailable &&
          item.isShield &&
          currentActor.currentShield == null) {
        world.updateActorById(
            a.id, (b) => b.inventory.equipShield(item, a.anatomy));
        takenShield = item;
      } else {
        // Put the rest to inventory.
        world.updateActorById(a.id, (b) => b..inventory.add(item));
        takenItems.add(item);
      }
    }

    if (takenWeapon != null) {
      a.report(s, "<subject> pick<s> up <object>", object: takenWeapon);
      a.report(s, "<subject> wield<s> <object>", object: takenWeapon);
    }

    if (takenShield != null) {
      a.report(s, "<subject> pick<s> up <object>", object: takenShield);
      a.report(s, "<subject> wield<s> <object>", object: takenShield);
    }

    _distributeWeapons(takenItems, a, situation, sim, world, s);
    _distributeShields(takenItems, a, situation, sim, world, s);

    if (takenItems.isNotEmpty) {
      s.addEnumeration("<subject> <also> take<s>", takenItems, null,
          subject: a);
    }

    assert(_noDuplicateItems(world));
    assert(_noCurrentWeaponsMissingFromInventory(world));

    return "${a.name} auto-loots";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, void _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor actor, Simulation sim, WorldState world, void _) =>
      actor.isPlayer;

  /// Give shields to unshielded teammates.
  void _distributeShields(
      List<Item> takenItems,
      Actor player,
      LootSituation situation,
      Simulation sim,
      WorldStateBuilder world,
      Storyline s) {
    var shields = List<Item>.from(takenItems.where((item) => item.isShield));
    for (final shield in player.inventory.shields) {
      if (player.currentShield == shield) {
        // Player doesn't share the shield in his hand.
        continue;
      }
      shields.add(shield);
    }
    if (shields.isEmpty) return;
    shields.sort((a, b) => a.value.compareTo(b.value));
    assert(player.isPlayer, "Following line assumes only player does this.");
    var unshielded = situation.playerTeamIds
        .map((id) => world.getActorById(id))
        .where((a) =>
            a.isAliveAndActive && a.currentShield == null && a.id != player.id);
    for (final friend in unshielded) {
      if (shields.isEmpty) break;
      var shield = shields.removeLast();
      world.updateActorById(
          friend.id, (b) => b.inventory.equipShield(shield, friend.anatomy));
      takenItems.remove(shield);
      world.updateActorById(
          player.id, (b) => b.inventory.shields.remove(shield));
      player.report(s, "<subject> give<s> the ${shield.name} to <object>",
          object: friend);
    }
  }

  /// Give weapons to unarmed teammates of player.
  void _distributeWeapons(
      List<Item> takenItems,
      Actor player,
      LootSituation situation,
      Simulation sim,
      WorldStateBuilder world,
      Storyline s) {
    var weapons = List<Item>.from(takenItems.where((item) => item.isWeapon));
    for (final weapon in player.inventory.weapons) {
      if (player.currentWeapon == weapon) {
        // Player doesn't share the weapon in his hand.
        continue;
      }
      weapons.add(weapon);
    }
    if (weapons.isEmpty) return;
    weapons.sort((a, b) => a.value.compareTo(b.value));
    assert(player.isPlayer, "Following line assumes only player does this.");
    var couldUseWeapon = situation.playerTeamIds
        .map((id) => world.getActorById(id))
        .where((a) =>
            a.isAliveAndActive &&
            a.currentWeapon == null &&
            a.anatomy.anyWeaponAppendageAvailable &&
            a.id != player.id);
    for (final friend in couldUseWeapon) {
      if (weapons.isEmpty) break;
      var weapon = weapons.removeLast();
      world.updateActorById(
          friend.id, (b) => b.inventory.equip(weapon, friend.anatomy));
      takenItems.remove(weapon);
      world.updateActorById(
          player.id, (b) => b.inventory.weapons.remove(weapon));
      player.report(s, "<subject> give<s> the ${weapon.name} to <object>",
          object: friend);
    }
  }

  /// Returns `false` if any item in the inventory of any actor is a duplicate
  /// of any other item.
  bool _noDuplicateItems(WorldStateBuilder world) {
    final ids = <int>{};

    for (final actor in world.build().actors) {
      for (final item in actor.inventory.items
          .followedBy(actor.inventory.weapons)
          .followedBy(actor.inventory.shields)) {
        if (ids.contains(item.id)) {
          log.severe("Duplicate item: $item was previously seen");
          assert(
              false,
              "Item $item held by ${actor.name} was seen before "
              "in ${world.build()}");
          return false;
        }
        ids.add(item.id);
      }
    }
    return true;
  }

  bool _noCurrentWeaponsMissingFromInventory(WorldStateBuilder world) {
    for (final actor in world.build().actors) {
      if (actor.currentWeapon != null &&
          !actor.inventory.weapons.contains(actor.currentWeapon)) {
        assert(
            false,
            "Weapon ${actor.currentWeapon.name} held by ${actor.name} "
            "isn't in their inventory.");
        return false;
      }
      if (actor.currentShield != null &&
          !actor.inventory.shields.contains(actor.currentShield)) {
        assert(
            false,
            "Shield ${actor.currentShield.name} held by ${actor.name} "
            "isn't in their inventory.");
        return false;
      }
    }
    return true;
  }
}
