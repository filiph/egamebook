// GENERATED CODE - DO NOT MODIFY BY HAND

part of fractal_stories.items.weapon_type;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_catches_without_on_clauses
// ignore_for_file: avoid_returning_this
// ignore_for_file: lines_longer_than_80_chars
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

const WeaponType _$claw = const WeaponType._('claw');
const WeaponType _$fist = const WeaponType._('fist');
const WeaponType _$spear = const WeaponType._('spear');
const WeaponType _$sword = const WeaponType._('sword');
const WeaponType _$shield = const WeaponType._('shield');

WeaponType _$valueOf(String name) {
  switch (name) {
    case 'claw':
      return _$claw;
    case 'fist':
      return _$fist;
    case 'spear':
      return _$spear;
    case 'sword':
      return _$sword;
    case 'shield':
      return _$shield;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<WeaponType> _$values =
    new BuiltSet<WeaponType>(const <WeaponType>[
  _$claw,
  _$fist,
  _$spear,
  _$sword,
  _$shield,
]);

Serializer<WeaponType> _$weaponTypeSerializer = new _$WeaponTypeSerializer();

class _$WeaponTypeSerializer implements PrimitiveSerializer<WeaponType> {
  @override
  final Iterable<Type> types = const <Type>[WeaponType];
  @override
  final String wireName = 'WeaponType';

  @override
  Object serialize(Serializers serializers, WeaponType object,
          {FullType specifiedType = FullType.unspecified}) =>
      object.name;

  @override
  WeaponType deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      WeaponType.valueOf(serialized as String);
}
