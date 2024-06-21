// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'weapon_type.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const WeaponType _$invalid = const WeaponType._('invalid');
const WeaponType _$harmless = const WeaponType._('harmless');
const WeaponType _$clothing = const WeaponType._('clothing');
const WeaponType _$claw = const WeaponType._('claw');
const WeaponType _$teeth = const WeaponType._('teeth');
const WeaponType _$fist = const WeaponType._('fist');
const WeaponType _$spear = const WeaponType._('spear');
const WeaponType _$sword = const WeaponType._('sword');
const WeaponType _$dagger = const WeaponType._('dagger');
const WeaponType _$axe = const WeaponType._('axe');
const WeaponType _$club = const WeaponType._('club');
const WeaponType _$rock = const WeaponType._('rock');
const WeaponType _$shield = const WeaponType._('shield');

WeaponType _$valueOf(String name) {
  switch (name) {
    case 'invalid':
      return _$invalid;
    case 'harmless':
      return _$harmless;
    case 'clothing':
      return _$clothing;
    case 'claw':
      return _$claw;
    case 'teeth':
      return _$teeth;
    case 'fist':
      return _$fist;
    case 'spear':
      return _$spear;
    case 'sword':
      return _$sword;
    case 'dagger':
      return _$dagger;
    case 'axe':
      return _$axe;
    case 'club':
      return _$club;
    case 'rock':
      return _$rock;
    case 'shield':
      return _$shield;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<WeaponType> _$values =
    new BuiltSet<WeaponType>(const <WeaponType>[
  _$invalid,
  _$harmless,
  _$clothing,
  _$claw,
  _$teeth,
  _$fist,
  _$spear,
  _$sword,
  _$dagger,
  _$axe,
  _$club,
  _$rock,
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

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
