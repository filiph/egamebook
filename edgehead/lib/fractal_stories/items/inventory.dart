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
  Item? get currentShield;

  /// The weapon currently wielded by the actor.
  ///
  /// Do not assign to this directly. Use [InventoryBuilder.equip] instead.
  Item? get currentWeapon;

  /// Inventory of items possessed by the actor.
  ///
  /// This includes all items possessed by the actor, whether wielded or
  /// in a backpack.
  ///
  /// This includes all types of items, from apples to letters to war hammers.
  BuiltList<Item> get items;

  Iterable<Item> get shields =>
      items.where((item) => item.damageCapability.isShield);

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
  Iterable<Item> get weapons =>
      items.where((item) => item.damageCapability.isProperWeapon);

  int countWeapons(WeaponType type) {
    int count = 0;
    for (final weapon in weapons) {
      if (weapon.damageCapability.type == type) count += 1;
    }
    return count;
  }

  /// Returns the best weapon (by [Item.value]) in [Actor.weapons].
  ///
  /// The optional [type] argument makes this method only find weapons of the
  /// given type.
  ///
  /// Returns `null` when there are no weapons available.
  Item? findBestWeapon({WeaponType? type}) {
    Item? best;
    int value = -9999999;
    for (final weapon in weapons) {
      if (type != null && weapon.damageCapability.type != type) continue;
      if (weapon.value > value) {
        best = weapon;
        value = weapon.value;
      }
    }
    return best;
  }

  bool hasWeapon(WeaponType type) =>
      currentWeapon != null && currentWeapon!.damageCapability.type == type ||
      weapons.any((w) => w.damageCapability.type == type);
}

abstract class InventoryBuilder
    implements Builder<Inventory, InventoryBuilder> {
  bool? canUseShield;

  bool? canUseWeapon;

  Item? currentShield;

  Item? currentWeapon;

  bool? weaponInPrimaryAppendage;

  ListBuilder<Item> items = ListBuilder<Item>();

  factory InventoryBuilder() = _$InventoryBuilder;

  InventoryBuilder._();

  /// Add an item to inventory. Does not equip the item.
  void add(Item item) {
    assert(
        items.build().where((e) => e.id == item.id).isEmpty,
        'Adding item that is already in the inventory: $item, '
        'items: ${items.build().map((i) => i.toString()).join(', ')}');
    items.add(item);
  }

  /// Tries to equip [weapon] and returns the result.
  ///
  /// This can fail, for example when the [anatomy] doesn't have any viable
  /// appendages.
  WeaponEquipResult equip(Item weapon, Anatomy anatomy) {
    assert(!WeaponType.bodyPartWeapons.contains(weapon.damageCapability.type),
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

    var currentInventory = build();

    assert(
        currentWeapon == null || currentInventory.items.contains(currentWeapon),
        "Before equiping $weapon, actor was wielding a weapon ($currentWeapon) "
        "that wasn't in their inventory");

    if (!currentInventory.items.any((item) => item.id == weapon.id)) {
      // Weapon not in inventory.
      add(weapon);
    }
    currentWeapon = weapon;
    return WeaponEquipResult.equipped;
  }

  /// Tries to equip the best weapon in the inventory. When that fails
  /// (for example, because there is no weapon in the inventory), goes
  /// barehanded using the [anatomy] anatomy.
  WeaponEquipResult equipBestAvailable(Anatomy anatomy) {
    final Item? weapon = build().findBestWeapon();
    if (weapon != null) {
      return equip(weapon, anatomy);
    }

    return goBarehanded(anatomy);
  }

  void equipShield(Item shield, Anatomy anatomy) {
    assert(shield.isShield);
    if (!anatomy.secondaryWeaponAppendageAvailable) {
      // Crippled actor can't equip.
      throw StateError('Cannot equip shield.');
    }

    if (!build().items.any((item) => item.id == shield.id)) {
      // Weapon not in inventory.
      add(shield);
    }
    currentShield = shield;
  }

  /// Makes the actor go barehanded. Does not remove [currentWeapon]
  /// from actor's inventory (use [remove] for that).
  ///
  /// This is useful for times when the actor forcefully loses [currentWeapon]
  /// and doesn't have time to [equipBestAvailable].
  WeaponEquipResult goBarehanded(Anatomy anatomy) {
    assert(
        currentWeapon == null || build().items.contains(currentWeapon),
        "Before going barehanded, actor was wielding a weapon ($currentWeapon) "
        "that wasn't in their inventory");

    currentWeapon = null;

    if (anatomy.bodyPartWeapon == null) {
      return WeaponEquipResult.noAvailableAppendage;
    }
    return WeaponEquipResult.equipped;
  }

  /// Removes [item] from [items]. Updates [currentWeapon] and [currentShield]
  /// if needed.
  ///
  /// Asserts that [item] exists in the inventory.
  void remove(Item item) {
    if (item.isWeapon) {
      if (currentWeapon?.id == item.id) currentWeapon = null;
    } else if (item.isShield) {
      if (currentShield?.id == item.id) currentShield = null;
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
