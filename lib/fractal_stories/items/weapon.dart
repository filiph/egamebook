library fractal_stories.items.weapon;

import 'dart:math';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/unique_id.dart';

part 'weapon.g.dart';

abstract class Weapon extends ItemLike implements
 Built<Weapon, WeaponBuilder> {
  static Serializer<Weapon> get serializer => _$weaponSerializer;

  factory Weapon(WeaponType type,
          {int id, String name,
          bool nameIsProperNoun: false,
          int bluntDamage,
          int slashingDamage,
          int thrustingDamage,
          int length}) =>
      new _$Weapon((b) => b
        ..id = (id ?? uniqueIdMaker.generateNext())
        ..type = type
        ..name = name ?? type.name
        ..nameIsProperNoun = nameIsProperNoun
        ..bluntDamage = bluntDamage ?? type.defaultBluntDamage
        ..slashingDamage = slashingDamage ?? type.defaultSlashingDamage
        ..thrustingDamage = thrustingDamage ?? type.defaultThrustingDamage
        ..length = length ?? type.defaultLength);

  Weapon._();

  @override
  int get id;

  int get bluntDamage;

  @override
  BuiltList<String> get categories => new BuiltList(["weapon"]);

  bool get isBlunt => bluntDamage > 0;

  bool get isShield => type == WeaponType.shield;

  // TODO: add categories like sword when appropriate
  bool get isSlashing => slashingDamage > 0;

  bool get isThrusting => thrustingDamage > 0;

  int get length;

  @override
  String get name;

  @override
  bool get nameIsProperNoun;

  int get slashingDamage;

  int get thrustingDamage;

  WeaponType get type;

  /// Intrinsic value of the weapon.
  ///
  /// This is a heuristic for deciding which weapon is worth more, in general.
  /// It is not a monetary value.
  ///
  /// Bonus point is added when the weapon is named ([nameIsProperNoun]
  /// is `true`), such us "Excalibur".
  @override
  int get value =>
      (isShield ? 1 : 0) +
      length +
      slashingDamage +
      thrustingDamage +
      bluntDamage +
      (nameIsProperNoun ? 1 : 0);
}
