import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/anatomy.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';

part 'inventory.g.dart';

/// The current state of an [Actor]'s inventory.
///
/// This is manually updated by actions. Helper functions such as
/// [Inventory.dropWeapon] or [Inventory.equip] are available.
abstract class Inventory implements Built<Inventory, InventoryBuilder> {
  static Serializer<Inventory> get serializer => _$inventorySerializer;

  factory Inventory([void updates(InventoryBuilder b)]) = _$Inventory;

  Inventory._();

  /// The shield currently held by the actor.
  ///
  /// Do not assign to this directly. Use [InventoryBuilder.equipShield]
  /// instead.
  @nullable
  Item get currentShield;

  /// The weapon currently wielded by the actor.
  ///
  /// Do not assign to this directly. Use [InventoryBuilder.equip] instead.
  @nullable
  Item get currentWeapon;

  /// Inventory of items possessed by the actor.
  ///
  /// This does not include things that are wield-able (weapons, shields) or
  /// otherwise equip-able (armor). Consider [items] more like "contents of
  /// actor's backpack": potions, books, scrolls.
  BuiltList<Item> get items;

  BuiltList<Item> get shields;

  /// This is `true` if [currentWeapon] is being held with the primary
  /// appendage (e.g. right hand of right-handed humanoids).
  ///
  /// When this is `false`, the weapon is being held in the secondary
  /// appendage (e.g. off-hand for humanoids).
  ///
  /// When [currentWeapon] is `null`, ignore this field. It's state
  /// is undefined.
  bool get weaponInPrimaryAppendage;

  /// A list of all weapons possessed by the actor. Can be in hand or
  /// in a backpack.
  ///
  /// This is a list because we want to allow having duplicate items
  /// (2 apples).
  BuiltList<Item> get weapons;

  int countWeapons(WeaponType type) {
    int count = 0;
    if (currentWeapon.damageCapability.type == type) count += 1;
    for (final weapon in weapons) {
      assert(weapon.isWeapon, "Non-weapon in Actor.weapons");
      if (weapon.damageCapability.type == type) count += 1;
    }
    return count;
  }

  /// Returns the best weapon (by [Item.value]) in [Actor.weapons].
  ///
  /// Returns `null` when there are no weapons available.
  Item findBestWeapon() {
    Item best;
    int value = -9999999;
    for (final weapon in weapons) {
      assert(weapon.isWeapon, "Non-weapon in Actor.weapons");
      if (weapon.value > value) {
        best = weapon;
        value = weapon.value;
      }
    }
    return best;
  }

  bool hasWeapon(WeaponType type) =>
      currentWeapon != null && currentWeapon.damageCapability.type == type ||
      weapons.any((w) => w.damageCapability.type == type);
}

abstract class InventoryBuilder
    implements Builder<Inventory, InventoryBuilder> {
  bool canUseShield;

  bool canUseWeapon;

  Item currentShield;

  Item currentWeapon;

  bool weaponInPrimaryAppendage;

  ListBuilder<Item> shields;

  ListBuilder<Item> items;

  ListBuilder<Item> weapons;

  factory InventoryBuilder() = _$InventoryBuilder;

  InventoryBuilder._();

  /// Add an item to inventory. Does not equip the item.
  void add(Item item) {
    if (item.isWeapon) {
      weapons.add(item);
    } else if (item.isShield) {
      shields.add(item);
    } else {
      items.add(item);
    }
  }

  /// Tries to equip [weapon] and returns the result.
  ///
  /// This can fail, for example when the [anatomy] doesn't have any viable
  /// appendages.
  WeaponEquipResult equip(Item weapon, Anatomy anatomy) {
    assert(weapon.isWeapon);
    assert(weapon.damageCapability.type != WeaponType.fist,
        "Tried to equip a body part. Use goBarehanded instead.");
    if (!anatomy.anyWeaponAppendageAvailable) {
      // Crippled actor can't equip.
      currentWeapon = null;
      // TODO: Throw instead, and provide `canEquip`.
      //       Otherwise this goes unnoticed.
      //       Remove WeaponEquipResult altogether.
      return WeaponEquipResult.noAvailableAppendage;
    }

    // Update where the weapon ends up.
    weaponInPrimaryAppendage = anatomy.primaryWeaponAppendageAvailable;

    if (!build().weapons.any((item) => item.id == weapon.id)) {
      // Weapon not in inventory.
      weapons.add(weapon);
    }
    currentWeapon = weapon;
    return WeaponEquipResult.equipped;
  }

  /// Tries to equip the best weapon in the inventory. When that fails
  /// (for example, because there is no weapon in the inventory), goes
  /// barehanded using the [anatomy] anatomy.
  WeaponEquipResult equipBestAvailable(Anatomy anatomy) {
    final Item weapon = build().findBestWeapon();
    if (weapon != null) {
      return equip(weapon, anatomy);
    }

    return goBarehanded(anatomy);
  }

  void equipShield(Item shield) {
    assert(shield.isShield);
    if (!build().shields.any((item) => item.id == shield.id)) {
      // Shield not in inventory.
      shields.add(shield);
    }
    currentShield = shield;
  }

  /// Makes the actor go barehanded. Does not remove [currentWeapon]
  /// from actor's inventory (use [remove] for that).
  ///
  /// This is useful for times when the actor forcefully loses [currentWeapon]
  /// and doesn't have time to [equipBestAvailable].
  WeaponEquipResult goBarehanded(Anatomy anatomy) {
    currentWeapon = null;

    if (anatomy.bodyPartWeapon == null) {
      return WeaponEquipResult.noAvailableAppendage;
    }
    return WeaponEquipResult.equipped;
  }

  /// Removes [item] from either [weapons], [shields] or [items]. Updates
  /// [currentWeapon] and [currentShield] if needed.
  ///
  /// Asserts that [item] exists in the inventory.
  void remove(Item item) {
    if (item.isWeapon) {
      _assertItemInList(item, weapons);
      if (currentWeapon?.id == item.id) currentWeapon = null;
      weapons.remove(item);
      return;
    }

    if (item.isShield) {
      _assertItemInList(item, shields);
      if (currentShield?.id == item.id) currentShield = null;
      shields.remove(item);
      return;
    }

    _assertItemInList(item, items);
    items.remove(item);
  }

  /// Asserts that the [item] exists in the [list] (only
  /// in assert/checked mode).
  ///
  /// Checks by [Item.id], not by value.
  void _assertItemInList(Item item, ListBuilder<Item> list) {
    assert(list.build().any((candidate) => candidate.id == item.id));
  }
}

/// The different ways an [Inventory.equip] can go.
enum WeaponEquipResult {
  /// Equipping was successful, and it was done with the main appendage.
  equipped,

  /// The was no appendage to equip _with_. For example, both hands are
  /// chopped off.
  noAvailableAppendage,
}
