// GENERATED CODE - DO NOT MODIFY BY HAND

part of fractal_stories.items.weapon;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_returning_this
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

Serializer<Weapon> _$weaponSerializer = new _$WeaponSerializer();

class _$WeaponSerializer implements StructuredSerializer<Weapon> {
  @override
  final Iterable<Type> types = const [Weapon, _$Weapon];
  @override
  final String wireName = 'Weapon';

  @override
  Iterable serialize(Serializers serializers, Weapon object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'bluntDamage',
      serializers.serialize(object.bluntDamage,
          specifiedType: const FullType(int)),
      'length',
      serializers.serialize(object.length, specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'nameIsProperNoun',
      serializers.serialize(object.nameIsProperNoun,
          specifiedType: const FullType(bool)),
      'slashingDamage',
      serializers.serialize(object.slashingDamage,
          specifiedType: const FullType(int)),
      'thrustingDamage',
      serializers.serialize(object.thrustingDamage,
          specifiedType: const FullType(int)),
      'type',
      serializers.serialize(object.type,
          specifiedType: const FullType(WeaponType)),
    ];

    return result;
  }

  @override
  Weapon deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new WeaponBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'bluntDamage':
          result.bluntDamage = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'length':
          result.length = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'nameIsProperNoun':
          result.nameIsProperNoun = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'slashingDamage':
          result.slashingDamage = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'thrustingDamage':
          result.thrustingDamage = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'type':
          result.type = serializers.deserialize(value,
              specifiedType: const FullType(WeaponType)) as WeaponType;
          break;
      }
    }

    return result.build();
  }
}

class _$Weapon extends Weapon {
  @override
  final int bluntDamage;
  @override
  final int length;
  @override
  final String name;
  @override
  final bool nameIsProperNoun;
  @override
  final int slashingDamage;
  @override
  final int thrustingDamage;
  @override
  final WeaponType type;

  factory _$Weapon([void updates(WeaponBuilder b)]) =>
      (new WeaponBuilder()..update(updates)).build();

  _$Weapon._(
      {this.bluntDamage,
      this.length,
      this.name,
      this.nameIsProperNoun,
      this.slashingDamage,
      this.thrustingDamage,
      this.type})
      : super._() {
    if (bluntDamage == null) throw new ArgumentError.notNull('bluntDamage');
    if (length == null) throw new ArgumentError.notNull('length');
    if (name == null) throw new ArgumentError.notNull('name');
    if (nameIsProperNoun == null)
      throw new ArgumentError.notNull('nameIsProperNoun');
    if (slashingDamage == null)
      throw new ArgumentError.notNull('slashingDamage');
    if (thrustingDamage == null)
      throw new ArgumentError.notNull('thrustingDamage');
    if (type == null) throw new ArgumentError.notNull('type');
  }

  @override
  Weapon rebuild(void updates(WeaponBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  WeaponBuilder toBuilder() => new WeaponBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! Weapon) return false;
    return bluntDamage == other.bluntDamage &&
        length == other.length &&
        name == other.name &&
        nameIsProperNoun == other.nameIsProperNoun &&
        slashingDamage == other.slashingDamage &&
        thrustingDamage == other.thrustingDamage &&
        type == other.type;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc($jc($jc(0, bluntDamage.hashCode), length.hashCode),
                        name.hashCode),
                    nameIsProperNoun.hashCode),
                slashingDamage.hashCode),
            thrustingDamage.hashCode),
        type.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Weapon')
          ..add('bluntDamage', bluntDamage)
          ..add('length', length)
          ..add('name', name)
          ..add('nameIsProperNoun', nameIsProperNoun)
          ..add('slashingDamage', slashingDamage)
          ..add('thrustingDamage', thrustingDamage)
          ..add('type', type))
        .toString();
  }
}

class WeaponBuilder implements Builder<Weapon, WeaponBuilder> {
  _$Weapon _$v;

  int _bluntDamage;
  int get bluntDamage => _$this._bluntDamage;
  set bluntDamage(int bluntDamage) => _$this._bluntDamage = bluntDamage;

  int _length;
  int get length => _$this._length;
  set length(int length) => _$this._length = length;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  bool _nameIsProperNoun;
  bool get nameIsProperNoun => _$this._nameIsProperNoun;
  set nameIsProperNoun(bool nameIsProperNoun) =>
      _$this._nameIsProperNoun = nameIsProperNoun;

  int _slashingDamage;
  int get slashingDamage => _$this._slashingDamage;
  set slashingDamage(int slashingDamage) =>
      _$this._slashingDamage = slashingDamage;

  int _thrustingDamage;
  int get thrustingDamage => _$this._thrustingDamage;
  set thrustingDamage(int thrustingDamage) =>
      _$this._thrustingDamage = thrustingDamage;

  WeaponType _type;
  WeaponType get type => _$this._type;
  set type(WeaponType type) => _$this._type = type;

  WeaponBuilder();

  WeaponBuilder get _$this {
    if (_$v != null) {
      _bluntDamage = _$v.bluntDamage;
      _length = _$v.length;
      _name = _$v.name;
      _nameIsProperNoun = _$v.nameIsProperNoun;
      _slashingDamage = _$v.slashingDamage;
      _thrustingDamage = _$v.thrustingDamage;
      _type = _$v.type;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Weapon other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$Weapon;
  }

  @override
  void update(void updates(WeaponBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$Weapon build() {
    final _$result = _$v ??
        new _$Weapon._(
            bluntDamage: bluntDamage,
            length: length,
            name: name,
            nameIsProperNoun: nameIsProperNoun,
            slashingDamage: slashingDamage,
            thrustingDamage: thrustingDamage,
            type: type);
    replace(_$result);
    return _$result;
  }
}
