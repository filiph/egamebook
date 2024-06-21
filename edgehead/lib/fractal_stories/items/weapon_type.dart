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
/// Note that [fist] and [claw] and [teeth] are also weapons.
class WeaponType extends EnumClass {
  /// This is only used in [DamageCapability.invalid].
  static const WeaponType invalid = _$invalid;

  /// Things that aren't really a weapon, but still could be wielded.
  ///
  /// If the player wants to repeatedly hit an orc with a glove,
  /// who am I to stop them?
  static const WeaponType harmless = _$harmless;

  /// Clothing is not only [harmless] as a weapon, it shouldn't be even
  /// allowed to be equipped. (Because that's confusing: equipping a jacket
  /// seems like putting it on, not wielding it.)
  static const WeaponType clothing = _$clothing;

  /// An animal claw.
  static const WeaponType claw = _$claw;

  /// Teeth.
  static const WeaponType teeth = _$teeth;

  /// A humanoid fist.
  static const WeaponType fist = _$fist;

  static const WeaponType spear = _$spear;

  static const WeaponType sword = _$sword;
  static const WeaponType dagger = _$dagger;
  static const WeaponType axe = _$axe;

  static const WeaponType club = _$club;

  /// A throwable piece of something hard and small. A rock, a brick,
  /// a golden nugget.
  static const WeaponType rock = _$rock;

  /// A shield.
  static const WeaponType shield = _$shield;

  /// The weapons that are not actual holdable weapons, but actually
  /// body parts.
  ///
  /// Use this for asserts, nothing more. The set may not be up-to-date.
  static Set<WeaponType> get bodyPartWeapons => const {claw, teeth, fist};

  static Serializer<WeaponType> get serializer => _$weaponTypeSerializer;

  static BuiltSet<WeaponType> get values => _$values;

  const WeaponType._(super.name);

  /// The weapon can block thrusts. Typical examples are shields.
  bool get canBlockThrust {
    if (this == shield) return true;
    return false;
  }

  /// The weapon can parry blunt weapons (like clubs and war hammers).
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
    if (this == sword || this == axe || this == club) return true;
    return false;
  }

  int get defaultBluntDamage {
    if (this == rock || this == club) return 1;
    return 0;
  }

  /// The length of the weapon.
  ///
  /// When you have a weapon that is longer than your opponents, that should
  /// make your attacks a little easier. You can keep the opponent at a
  /// distance. On the other hand, a long weapon is harder to be brought to bear
  /// in close combat.
  ///
  /// Note that even [shield] has a "length". This just means it's in front
  /// of you.
  int get defaultLength {
    if (this == invalid) return 0;
    if (this == clothing) return 0;
    if (bodyPartWeapons.contains(this)) return 0;
    if (this == harmless) return 0;
    if (this == rock) return 0;
    if (this == shield) return 1;
    if (this == dagger) return 1;
    if (this == sword) return 2;
    if (this == axe) return 2;
    if (this == club) return 2;
    if (this == spear) return 3;
    throw UnimplementedError('No length for $this');
  }

  int get defaultSlashingDamage {
    switch (this) {
      case sword:
      case axe:
        return 1;
      default:
        return 0;
    }
  }

  int get defaultTearingDamage {
    if (this == claw) return 1;
    if (this == teeth) return 1;
    return 0;
  }

  int get defaultThrustingDamage {
    switch (this) {
      case sword:
        return 1;
      case spear:
        return 1;
      case dagger:
        return 1;
      default:
        return 0;
    }
  }

  /// "Proper" weapons are things like swords, clubs, and so on. Body parts
  /// and random items are not proper weapons.
  bool get defaultIsProperWeapon {
    switch (this) {
      case sword:
      case spear:
      case dagger:
      case axe:
      case club:
      case rock:
        return true;
      case harmless:
      case clothing:
      case shield:
      case teeth:
      case claw:
      case fist:
        return false;
      default:
        throw UnimplementedError('no defaultIsProperWeapon for $this');
    }
  }

  static WeaponType valueOf(String name) => _$valueOf(name);
}
