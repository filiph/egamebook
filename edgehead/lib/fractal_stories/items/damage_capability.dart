library fractal_stories.items.weapon;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';

part 'damage_capability.g.dart';

abstract class DamageCapability
    implements Built<DamageCapability, DamageCapabilityBuilder> {
  /// A special kind of capability that has zero effect.
  ///
  /// Compare to fists, for example, which might have zero damage but at least
  /// can be used to punch the enemy.
  static DamageCapability none =
      DamageCapability(WeaponType.none, isNone: true);

  static Serializer<DamageCapability> get serializer =>
      _$damageCapabilitySerializer;

  factory DamageCapability(WeaponType type,
      {int bluntDamage,
      int slashingDamage,
      int thrustingDamage,
      int length,
      bool isNone = false}) {
    assert(type != null);
    assert(type != WeaponType.none || isNone);
    assert(
        !isNone ||
            (bluntDamage == null &&
                slashingDamage == null &&
                thrustingDamage == null),
        "Do not provide values to DamageCapability.isNone.");
    return _$DamageCapability((b) => b
      ..type = type
      ..bluntDamage = bluntDamage ?? type.defaultBluntDamage
      ..slashingDamage = slashingDamage ?? type.defaultSlashingDamage
      ..thrustingDamage = thrustingDamage ?? type.defaultThrustingDamage
      ..length = length ?? type.defaultLength
      ..isNone = isNone);
  }

  DamageCapability._();

  int get bluntDamage;

  bool get isBlunt => bluntDamage > 0;

  /// This is only set for when there is no damage capability at all. Not even
  /// fists.
  bool get isNone;

  bool get isSlashing => slashingDamage > 0;

  bool get isThrusting => thrustingDamage > 0;

  int get length;

  int get slashingDamage;

  int get thrustingDamage;

  WeaponType get type;
}
