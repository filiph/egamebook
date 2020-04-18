library fractal_stories.items.weapon;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';

part 'damage_capability.g.dart';

abstract class DamageCapability
    implements Built<DamageCapability, DamageCapabilityBuilder> {
  /// A special kind of capability that has zero effect, and tells us that
  /// the item with such capability cannot be used. For example, a crippled
  /// hand will not be able to strike the enemy. It has an [invalid]
  /// damage capability.
  ///
  /// Compare to fists, for example, which might have zero damage but at least
  /// can be used to punch the enemy.
  ///
  /// Also compare to [WeaponType.harmless], which is reserved for items such
  /// as a piece of paper or an apple. You _can_ hit with a piece of paper
  /// (i.e. it is not invalid) but it won't do any harm.
  static DamageCapability invalid = DamageCapability(WeaponType.invalid);

  static Serializer<DamageCapability> get serializer =>
      _$damageCapabilitySerializer;

  factory DamageCapability(WeaponType type,
      {int bluntDamage,
      int slashingDamage,
      int thrustingDamage,
      int tearingDamage,
      int length}) {
    assert(type != null);
    assert(
        type != WeaponType.invalid ||
            (bluntDamage == null &&
                slashingDamage == null &&
                thrustingDamage == null &&
                tearingDamage == null),
        "Do not provide values to DamageCapability.isNone.");
    return _$DamageCapability((b) => b
      ..type = type
      ..bluntDamage = bluntDamage ?? type.defaultBluntDamage
      ..slashingDamage = slashingDamage ?? type.defaultSlashingDamage
      ..thrustingDamage = thrustingDamage ?? type.defaultThrustingDamage
      ..tearingDamage = tearingDamage ?? type.defaultTearingDamage
      ..length = length ?? type.defaultLength);
  }

  DamageCapability._();

  int get bluntDamage;

  bool get isBlunt => bluntDamage > 0;

  /// This is only set for items and body parts that _cannot_ be used
  /// in a fight, such as a crippled arm.
  bool get isInvalid => type == WeaponType.invalid;

  /// "Proper" weapons are things like swords, clubs, and so on. Body parts
  /// and random items are not proper weapons.
  bool get isProperWeapon => type.defaultIsProperWeapon;

  bool get isShield => type == WeaponType.shield;

  bool get isSlashing => slashingDamage > 0;

  /// Tearing damage is something done by teeth or claws. It's different
  /// from slashing damage because it _chomps_ on its target. It tears
  /// skin and muscle.
  bool get isTearing => tearingDamage > 0;

  bool get isThrusting => thrustingDamage > 0;

  int get length;

  int get slashingDamage;

  int get tearingDamage;

  int get thrustingDamage;

  WeaponType get type;

  @override
  String toString() => 'DamageCapability<${type.name}, len=$length, '
      'blunt=$bluntDamage, slash=$slashingDamage, tear=$tearingDamage, '
      'thrust=$thrustingDamage>';
}
