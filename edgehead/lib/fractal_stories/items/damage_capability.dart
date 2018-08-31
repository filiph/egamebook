library fractal_stories.items.weapon;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';

part 'damage_capability.g.dart';

abstract class DamageCapability
    implements Built<DamageCapability, DamageCapabilityBuilder> {
  static Serializer<DamageCapability> get serializer =>
      _$damageCapabilitySerializer;

  factory DamageCapability(WeaponType type,
          {int bluntDamage,
          int slashingDamage,
          int thrustingDamage,
          int length}) =>
      _$DamageCapability((b) => b
        ..type = type
        ..bluntDamage = bluntDamage ?? type.defaultBluntDamage
        ..slashingDamage = slashingDamage ?? type.defaultSlashingDamage
        ..thrustingDamage = thrustingDamage ?? type.defaultThrustingDamage
        ..length = length ?? type.defaultLength);

  DamageCapability._();

  int get bluntDamage;

  bool get isBlunt => bluntDamage > 0;

  /// If this is `true`, then the weapon just designates a non-existent one.
  bool get isNone => type == WeaponType.none;

  bool get isSlashing => slashingDamage > 0;

  bool get isThrusting => thrustingDamage > 0;

  int get length;

  int get slashingDamage;

  int get thrustingDamage;

  WeaponType get type;
}
