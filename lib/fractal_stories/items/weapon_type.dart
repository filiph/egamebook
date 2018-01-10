library fractal_stories.items.weapon_type;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'weapon_type.g.dart';

/// Each weapons has a type that affects how the weapon can be used
/// (which actions are available).
///
/// We are going for a little more specificity than blunt/slashing/piercing
/// because each weapon can have only one type and we want to have versatile
/// weapons (sword is both slashing and piercing, for example).
///
/// Note that [fist] and [claw] are also weapons.
class WeaponType extends EnumClass {
  static const WeaponType claw = _$claw;
  static const WeaponType fist = _$fist;
  static const WeaponType spear = _$spear;
  static const WeaponType sword = _$sword;
  static const WeaponType shield = _$shield;

  static Serializer<WeaponType> get serializer => _$weaponTypeSerializer;

  static BuiltSet<WeaponType> get values => _$values;

  const WeaponType._(String name) : super(name);

  /// The weapon can block thrusts. Typical examples are shields.
  bool get canBlockThrust {
    if (this == shield) return true;
    return false;
  }

  /// The weapon can parry blunt weapons (like clubs and warhammers).
  /// Typical examples include other blunt weapons, and shields. Rapiers and
  /// knives, on the other hand, cannot parry blunt weapons.
  bool get canParryBlunt {
    if (this == shield) return true;
    return false;
  }

  /// The weapon can parry a slashing weapon (like a sword). Typical examples
  /// are swords and reinforced blunt weapons. Knives and non-reinforced staffs
  /// cannot parry slashes.
  bool get canParrySlash {
    if (this == sword) return true;
    return false;
  }

  int get defaultBluntDamage {
    // TODO: implement blunt weapons
    return 0;
  }

  int get defaultLength {
    // TODO: implement lengths
    return 2;
  }

  int get defaultSlashingDamage {
    switch (this) {
      case sword:
        return 1;
      default:
        return 0;
    }
  }

  int get defaultThrustingDamage {
    switch (this) {
      case sword:
        return 1;
      case spear:
        return 1;
      default:
        return 0;
    }
  }

  static WeaponType valueOf(String name) => _$valueOf(name);
}
