library stranded.item;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/items/damage_capability.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:meta/meta.dart';

part 'item.g.dart';

abstract class Item extends Object
    with EntityBehavior
    implements Built<Item, ItemBuilder>, Entity {
  static Serializer<Item> get serializer => _$itemSerializer;

  /// Create a generic item.
  ///
  /// For weapons, use [Item.weapon] instead.
  ///
  /// If no [damageCapability] is provided, then the item will be
  /// of [WeaponType.harmless].
  factory Item(int id,
      {@required String name,
      String adjective,
      bool nameIsProperNoun = false,
      DamageCapabilityBuilder damageCapability,
      int firstOwnerId}) {
    return _$Item((b) => b
      ..id = id
      ..damageCapability =
          damageCapability ?? DamageCapability(WeaponType.harmless).toBuilder()
      ..name = name
      ..nameIsProperNoun = nameIsProperNoun
      ..adjective = adjective
      ..firstOwnerId = firstOwnerId);
  }

  factory Item.weapon(int id, WeaponType type,
      {String name,
      String adjective,
      bool nameIsProperNoun = false,
      int bluntDamage,
      int slashingDamage,
      int thrustingDamage,
      int tearingDamage,
      int firstOwnerId}) {
    assert(
        nameIsProperNoun || adjective != null,
        "All items that are not unique must have an adjective: "
        "$name with id=$id doesn't");
    final damageCapability = DamageCapability(type,
        bluntDamage: bluntDamage,
        slashingDamage: slashingDamage,
        thrustingDamage: thrustingDamage,
        tearingDamage: tearingDamage);
    return Item(id,
        name: name ?? type.name,
        nameIsProperNoun: nameIsProperNoun,
        adjective: adjective,
        damageCapability: damageCapability.toBuilder(),
        firstOwnerId: firstOwnerId);
  }

  Item._();

  @override
  @nullable
  String get adjective;

  DamageCapability get damageCapability;

  String get description => throw UnimplementedError();

  @override
  @nullable
  int get firstOwnerId;

  @override
  int get id;

  @override
  bool get isActive => true;

  @override
  bool get isAnimated => false;

  @override
  bool get isCommon => false;

  @override
  bool get isPlayer => false;

  bool get isShield => damageCapability.type == WeaponType.shield;

  bool get isWeapon =>
      !damageCapability.isInvalid && damageCapability.type != WeaponType.shield;

  @override
  String get name;

  @override
  bool get nameIsProperNoun;

  @override
  Pronoun get pronoun => Pronoun.IT;

  @override
  Team get team => neutralTeam;

  /// Intrinsic value of the item.
  ///
  /// This is a heuristic for deciding which item is worth more, in general.
  /// It is not a monetary value.
  ///
  /// Bonus point is added when the item is named ([nameIsProperNoun]
  /// is `true`), such us "Excalibur".
  int get value {
    int score = 0;
    if (nameIsProperNoun) score += 1;
    if (isShield) score += 1;
    assert(!WeaponType.bodyPartWeapons.contains(damageCapability.type),
        "Getting value of a body part weapon: ${damageCapability.type}.");
    score += 1;
    score += damageCapability.length;
    score += damageCapability.slashingDamage;
    score += damageCapability.thrustingDamage;
    score += damageCapability.bluntDamage;
    score += damageCapability.tearingDamage;
    return score;
  }

  @override
  String toString() =>
      'Item<$name, $id, adj=$adjective,${isCommon ? ' common,' : ''} '
      'dmg=$damageCapability>';
}
