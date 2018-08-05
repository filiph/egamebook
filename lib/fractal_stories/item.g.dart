// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.item;

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

Serializer<Item> _$itemSerializer = new _$ItemSerializer();

class _$ItemSerializer implements StructuredSerializer<Item> {
  @override
  final Iterable<Type> types = const [Item, _$Item];
  @override
  final String wireName = 'Item';

  @override
  Iterable serialize(Serializers serializers, Item object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'nameIsProperNoun',
      serializers.serialize(object.nameIsProperNoun,
          specifiedType: const FullType(bool)),
    ];
    if (object.damageCapability != null) {
      result
        ..add('damageCapability')
        ..add(serializers.serialize(object.damageCapability,
            specifiedType: const FullType(DamageCapability)));
    }

    return result;
  }

  @override
  Item deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ItemBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'damageCapability':
          result.damageCapability.replace(serializers.deserialize(value,
                  specifiedType: const FullType(DamageCapability))
              as DamageCapability);
          break;
        case 'id':
          result.id = serializers.deserialize(value,
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
      }
    }

    return result.build();
  }
}

class _$Item extends Item {
  @override
  final DamageCapability damageCapability;
  @override
  final int id;
  @override
  final String name;
  @override
  final bool nameIsProperNoun;

  factory _$Item([void updates(ItemBuilder b)]) =>
      (new ItemBuilder()..update(updates)).build();

  _$Item._({this.damageCapability, this.id, this.name, this.nameIsProperNoun})
      : super._() {
    if (id == null) throw new BuiltValueNullFieldError('Item', 'id');
    if (name == null) throw new BuiltValueNullFieldError('Item', 'name');
    if (nameIsProperNoun == null)
      throw new BuiltValueNullFieldError('Item', 'nameIsProperNoun');
  }

  @override
  Item rebuild(void updates(ItemBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ItemBuilder toBuilder() => new ItemBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! Item) return false;
    return damageCapability == other.damageCapability &&
        id == other.id &&
        name == other.name &&
        nameIsProperNoun == other.nameIsProperNoun;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, damageCapability.hashCode), id.hashCode), name.hashCode),
        nameIsProperNoun.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Item')
          ..add('damageCapability', damageCapability)
          ..add('id', id)
          ..add('name', name)
          ..add('nameIsProperNoun', nameIsProperNoun))
        .toString();
  }
}

class ItemBuilder implements Builder<Item, ItemBuilder> {
  _$Item _$v;

  DamageCapabilityBuilder _damageCapability;
  DamageCapabilityBuilder get damageCapability =>
      _$this._damageCapability ??= new DamageCapabilityBuilder();
  set damageCapability(DamageCapabilityBuilder damageCapability) =>
      _$this._damageCapability = damageCapability;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  bool _nameIsProperNoun;
  bool get nameIsProperNoun => _$this._nameIsProperNoun;
  set nameIsProperNoun(bool nameIsProperNoun) =>
      _$this._nameIsProperNoun = nameIsProperNoun;

  ItemBuilder();

  ItemBuilder get _$this {
    if (_$v != null) {
      _damageCapability = _$v.damageCapability?.toBuilder();
      _id = _$v.id;
      _name = _$v.name;
      _nameIsProperNoun = _$v.nameIsProperNoun;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Item other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$Item;
  }

  @override
  void update(void updates(ItemBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$Item build() {
    _$Item _$result;
    try {
      _$result = _$v ??
          new _$Item._(
              damageCapability: _damageCapability?.build(),
              id: id,
              name: name,
              nameIsProperNoun: nameIsProperNoun);
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'damageCapability';
        _damageCapability?.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'Item', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}
