// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'item.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<Item> _$itemSerializer = new _$ItemSerializer();

class _$ItemSerializer implements StructuredSerializer<Item> {
  @override
  final Iterable<Type> types = const [Item, _$Item];
  @override
  final String wireName = 'Item';

  @override
  Iterable<Object?> serialize(Serializers serializers, Item object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'damageCapability',
      serializers.serialize(object.damageCapability,
          specifiedType: const FullType(DamageCapability)),
      'edibility',
      serializers.serialize(object.edibility,
          specifiedType: const FullType(Edibility)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'nameIsProperNoun',
      serializers.serialize(object.nameIsProperNoun,
          specifiedType: const FullType(bool)),
    ];
    Object? value;
    value = object.adjective;
    if (value != null) {
      result
        ..add('adjective')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(String)));
    }
    value = object.bodyPart;
    if (value != null) {
      result
        ..add('bodyPart')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(BodyPart)));
    }
    value = object.firstOwnerId;
    if (value != null) {
      result
        ..add('firstOwnerId')
        ..add(serializers.serialize(value, specifiedType: const FullType(int)));
    }
    return result;
  }

  @override
  Item deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ItemBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'adjective':
          result.adjective = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String?;
          break;
        case 'bodyPart':
          result.bodyPart.replace(serializers.deserialize(value,
              specifiedType: const FullType(BodyPart))! as BodyPart);
          break;
        case 'damageCapability':
          result.damageCapability.replace(serializers.deserialize(value,
                  specifiedType: const FullType(DamageCapability))!
              as DamageCapability);
          break;
        case 'edibility':
          result.edibility.replace(serializers.deserialize(value,
              specifiedType: const FullType(Edibility))! as Edibility);
          break;
        case 'firstOwnerId':
          result.firstOwnerId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int?;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'nameIsProperNoun':
          result.nameIsProperNoun = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$Item extends Item {
  @override
  final String? adjective;
  @override
  final BodyPart? bodyPart;
  @override
  final DamageCapability damageCapability;
  @override
  final Edibility edibility;
  @override
  final int? firstOwnerId;
  @override
  final int id;
  @override
  final String name;
  @override
  final bool nameIsProperNoun;

  factory _$Item([void Function(ItemBuilder)? updates]) =>
      (new ItemBuilder()..update(updates))._build();

  _$Item._(
      {this.adjective,
      this.bodyPart,
      required this.damageCapability,
      required this.edibility,
      this.firstOwnerId,
      required this.id,
      required this.name,
      required this.nameIsProperNoun})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        damageCapability, r'Item', 'damageCapability');
    BuiltValueNullFieldError.checkNotNull(edibility, r'Item', 'edibility');
    BuiltValueNullFieldError.checkNotNull(id, r'Item', 'id');
    BuiltValueNullFieldError.checkNotNull(name, r'Item', 'name');
    BuiltValueNullFieldError.checkNotNull(
        nameIsProperNoun, r'Item', 'nameIsProperNoun');
  }

  @override
  Item rebuild(void Function(ItemBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ItemBuilder toBuilder() => new ItemBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Item &&
        adjective == other.adjective &&
        bodyPart == other.bodyPart &&
        damageCapability == other.damageCapability &&
        edibility == other.edibility &&
        firstOwnerId == other.firstOwnerId &&
        id == other.id &&
        name == other.name &&
        nameIsProperNoun == other.nameIsProperNoun;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, adjective.hashCode);
    _$hash = $jc(_$hash, bodyPart.hashCode);
    _$hash = $jc(_$hash, damageCapability.hashCode);
    _$hash = $jc(_$hash, edibility.hashCode);
    _$hash = $jc(_$hash, firstOwnerId.hashCode);
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, nameIsProperNoun.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }
}

class ItemBuilder implements Builder<Item, ItemBuilder> {
  _$Item? _$v;

  String? _adjective;
  String? get adjective => _$this._adjective;
  set adjective(String? adjective) => _$this._adjective = adjective;

  BodyPartBuilder? _bodyPart;
  BodyPartBuilder get bodyPart => _$this._bodyPart ??= new BodyPartBuilder();
  set bodyPart(BodyPartBuilder? bodyPart) => _$this._bodyPart = bodyPart;

  DamageCapabilityBuilder? _damageCapability;
  DamageCapabilityBuilder get damageCapability =>
      _$this._damageCapability ??= new DamageCapabilityBuilder();
  set damageCapability(DamageCapabilityBuilder? damageCapability) =>
      _$this._damageCapability = damageCapability;

  EdibilityBuilder? _edibility;
  EdibilityBuilder get edibility =>
      _$this._edibility ??= new EdibilityBuilder();
  set edibility(EdibilityBuilder? edibility) => _$this._edibility = edibility;

  int? _firstOwnerId;
  int? get firstOwnerId => _$this._firstOwnerId;
  set firstOwnerId(int? firstOwnerId) => _$this._firstOwnerId = firstOwnerId;

  int? _id;
  int? get id => _$this._id;
  set id(int? id) => _$this._id = id;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  bool? _nameIsProperNoun;
  bool? get nameIsProperNoun => _$this._nameIsProperNoun;
  set nameIsProperNoun(bool? nameIsProperNoun) =>
      _$this._nameIsProperNoun = nameIsProperNoun;

  ItemBuilder();

  ItemBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _adjective = $v.adjective;
      _bodyPart = $v.bodyPart?.toBuilder();
      _damageCapability = $v.damageCapability.toBuilder();
      _edibility = $v.edibility.toBuilder();
      _firstOwnerId = $v.firstOwnerId;
      _id = $v.id;
      _name = $v.name;
      _nameIsProperNoun = $v.nameIsProperNoun;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Item other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$Item;
  }

  @override
  void update(void Function(ItemBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  Item build() => _build();

  _$Item _build() {
    _$Item _$result;
    try {
      _$result = _$v ??
          new _$Item._(
              adjective: adjective,
              bodyPart: _bodyPart?.build(),
              damageCapability: damageCapability.build(),
              edibility: edibility.build(),
              firstOwnerId: firstOwnerId,
              id: BuiltValueNullFieldError.checkNotNull(id, r'Item', 'id'),
              name:
                  BuiltValueNullFieldError.checkNotNull(name, r'Item', 'name'),
              nameIsProperNoun: BuiltValueNullFieldError.checkNotNull(
                  nameIsProperNoun, r'Item', 'nameIsProperNoun'));
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'bodyPart';
        _bodyPart?.build();
        _$failedField = 'damageCapability';
        damageCapability.build();
        _$failedField = 'edibility';
        edibility.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'Item', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
