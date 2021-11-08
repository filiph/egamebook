// GENERATED CODE - DO NOT MODIFY BY HAND
// @dart=2.9

part of 'inventory.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<Inventory> _$inventorySerializer = new _$InventorySerializer();

class _$InventorySerializer implements StructuredSerializer<Inventory> {
  @override
  final Iterable<Type> types = const [Inventory, _$Inventory];
  @override
  final String wireName = 'Inventory';

  @override
  Iterable<Object> serialize(Serializers serializers, Inventory object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'items',
      serializers.serialize(object.items,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Item)])),
      'weaponInPrimaryAppendage',
      serializers.serialize(object.weaponInPrimaryAppendage,
          specifiedType: const FullType(bool)),
    ];
    Object value;
    value = object.currentShield;
    if (value != null) {
      result
        ..add('currentShield')
        ..add(
            serializers.serialize(value, specifiedType: const FullType(Item)));
    }
    value = object.currentWeapon;
    if (value != null) {
      result
        ..add('currentWeapon')
        ..add(
            serializers.serialize(value, specifiedType: const FullType(Item)));
    }
    return result;
  }

  @override
  Inventory deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new InventoryBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final Object value = iterator.current;
      switch (key) {
        case 'currentShield':
          result.currentShield = serializers.deserialize(value,
              specifiedType: const FullType(Item)) as Item;
          break;
        case 'currentWeapon':
          result.currentWeapon = serializers.deserialize(value,
              specifiedType: const FullType(Item)) as Item;
          break;
        case 'items':
          result.items.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Item)]))
              as BuiltList<Object>);
          break;
        case 'weaponInPrimaryAppendage':
          result.weaponInPrimaryAppendage = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$Inventory extends Inventory {
  @override
  final Item currentShield;
  @override
  final Item currentWeapon;
  @override
  final BuiltList<Item> items;
  @override
  final bool weaponInPrimaryAppendage;

  factory _$Inventory([void Function(InventoryBuilder) updates]) =>
      (new InventoryBuilder()..update(updates)).build() as _$Inventory;

  _$Inventory._(
      {this.currentShield,
      this.currentWeapon,
      this.items,
      this.weaponInPrimaryAppendage})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(items, 'Inventory', 'items');
    BuiltValueNullFieldError.checkNotNull(
        weaponInPrimaryAppendage, 'Inventory', 'weaponInPrimaryAppendage');
  }

  @override
  Inventory rebuild(void Function(InventoryBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  _$InventoryBuilder toBuilder() => new _$InventoryBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Inventory &&
        currentShield == other.currentShield &&
        currentWeapon == other.currentWeapon &&
        items == other.items &&
        weaponInPrimaryAppendage == other.weaponInPrimaryAppendage;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, currentShield.hashCode), currentWeapon.hashCode),
            items.hashCode),
        weaponInPrimaryAppendage.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Inventory')
          ..add('currentShield', currentShield)
          ..add('currentWeapon', currentWeapon)
          ..add('items', items)
          ..add('weaponInPrimaryAppendage', weaponInPrimaryAppendage))
        .toString();
  }
}

class _$InventoryBuilder extends InventoryBuilder {
  _$Inventory _$v;

  @override
  Item get currentShield {
    _$this;
    return super.currentShield;
  }

  @override
  set currentShield(Item currentShield) {
    _$this;
    super.currentShield = currentShield;
  }

  @override
  Item get currentWeapon {
    _$this;
    return super.currentWeapon;
  }

  @override
  set currentWeapon(Item currentWeapon) {
    _$this;
    super.currentWeapon = currentWeapon;
  }

  @override
  ListBuilder<Item> get items {
    _$this;
    return super.items ??= new ListBuilder<Item>();
  }

  @override
  set items(ListBuilder<Item> items) {
    _$this;
    super.items = items;
  }

  @override
  bool get weaponInPrimaryAppendage {
    _$this;
    return super.weaponInPrimaryAppendage;
  }

  @override
  set weaponInPrimaryAppendage(bool weaponInPrimaryAppendage) {
    _$this;
    super.weaponInPrimaryAppendage = weaponInPrimaryAppendage;
  }

  _$InventoryBuilder() : super._();

  InventoryBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      super.currentShield = $v.currentShield;
      super.currentWeapon = $v.currentWeapon;
      super.items = $v.items.toBuilder();
      super.weaponInPrimaryAppendage = $v.weaponInPrimaryAppendage;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Inventory other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$Inventory;
  }

  @override
  void update(void Function(InventoryBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$Inventory build() {
    _$Inventory _$result;
    try {
      _$result = _$v ??
          new _$Inventory._(
              currentShield: currentShield,
              currentWeapon: currentWeapon,
              items: items.build(),
              weaponInPrimaryAppendage: BuiltValueNullFieldError.checkNotNull(
                  weaponInPrimaryAppendage,
                  'Inventory',
                  'weaponInPrimaryAppendage'));
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'items';
        items.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'Inventory', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
