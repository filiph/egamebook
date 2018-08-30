// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'inventory.dart';

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
// ignore_for_file: unnecessary_const
// ignore_for_file: unnecessary_new

Serializer<Inventory> _$inventorySerializer = new _$InventorySerializer();

class _$InventorySerializer implements StructuredSerializer<Inventory> {
  @override
  final Iterable<Type> types = const [Inventory, _$Inventory];
  @override
  final String wireName = 'Inventory';

  @override
  Iterable serialize(Serializers serializers, Inventory object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'currentWeapon',
      serializers.serialize(object.currentWeapon,
          specifiedType: const FullType(Item)),
      'items',
      serializers.serialize(object.items,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Item)])),
      'shields',
      serializers.serialize(object.shields,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Item)])),
      'weaponInPrimaryAppendage',
      serializers.serialize(object.weaponInPrimaryAppendage,
          specifiedType: const FullType(bool)),
      'weapons',
      serializers.serialize(object.weapons,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Item)])),
    ];
    if (object.currentShield != null) {
      result
        ..add('currentShield')
        ..add(serializers.serialize(object.currentShield,
            specifiedType: const FullType(Item)));
    }

    return result;
  }

  @override
  Inventory deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new InventoryBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
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
              as BuiltList);
          break;
        case 'shields':
          result.shields.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Item)]))
              as BuiltList);
          break;
        case 'weaponInPrimaryAppendage':
          result.weaponInPrimaryAppendage = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'weapons':
          result.weapons.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Item)]))
              as BuiltList);
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
  final BuiltList<Item> shields;
  @override
  final bool weaponInPrimaryAppendage;
  @override
  final BuiltList<Item> weapons;

  factory _$Inventory([void updates(InventoryBuilder b)]) =>
      (new InventoryBuilder()..update(updates)).build() as _$Inventory;

  _$Inventory._(
      {this.currentShield,
      this.currentWeapon,
      this.items,
      this.shields,
      this.weaponInPrimaryAppendage,
      this.weapons})
      : super._() {
    if (currentWeapon == null)
      throw new BuiltValueNullFieldError('Inventory', 'currentWeapon');
    if (items == null) throw new BuiltValueNullFieldError('Inventory', 'items');
    if (shields == null)
      throw new BuiltValueNullFieldError('Inventory', 'shields');
    if (weaponInPrimaryAppendage == null)
      throw new BuiltValueNullFieldError(
          'Inventory', 'weaponInPrimaryAppendage');
    if (weapons == null)
      throw new BuiltValueNullFieldError('Inventory', 'weapons');
  }

  @override
  Inventory rebuild(void updates(InventoryBuilder b)) =>
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
        shields == other.shields &&
        weaponInPrimaryAppendage == other.weaponInPrimaryAppendage &&
        weapons == other.weapons;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc($jc($jc(0, currentShield.hashCode), currentWeapon.hashCode),
                    items.hashCode),
                shields.hashCode),
            weaponInPrimaryAppendage.hashCode),
        weapons.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Inventory')
          ..add('currentShield', currentShield)
          ..add('currentWeapon', currentWeapon)
          ..add('items', items)
          ..add('shields', shields)
          ..add('weaponInPrimaryAppendage', weaponInPrimaryAppendage)
          ..add('weapons', weapons))
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
  ListBuilder<Item> get shields {
    _$this;
    return super.shields ??= new ListBuilder<Item>();
  }

  @override
  set shields(ListBuilder<Item> shields) {
    _$this;
    super.shields = shields;
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

  @override
  ListBuilder<Item> get weapons {
    _$this;
    return super.weapons ??= new ListBuilder<Item>();
  }

  @override
  set weapons(ListBuilder<Item> weapons) {
    _$this;
    super.weapons = weapons;
  }

  _$InventoryBuilder() : super._();

  InventoryBuilder get _$this {
    if (_$v != null) {
      super.currentShield = _$v.currentShield;
      super.currentWeapon = _$v.currentWeapon;
      super.items = _$v.items?.toBuilder();
      super.shields = _$v.shields?.toBuilder();
      super.weaponInPrimaryAppendage = _$v.weaponInPrimaryAppendage;
      super.weapons = _$v.weapons?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Inventory other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$Inventory;
  }

  @override
  void update(void updates(InventoryBuilder b)) {
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
              shields: shields.build(),
              weaponInPrimaryAppendage: weaponInPrimaryAppendage,
              weapons: weapons.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'items';
        items.build();
        _$failedField = 'shields';
        shields.build();

        _$failedField = 'weapons';
        weapons.build();
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
