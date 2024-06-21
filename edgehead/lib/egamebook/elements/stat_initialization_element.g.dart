// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'stat_initialization_element.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<StatInitialization> _$statInitializationSerializer =
    new _$StatInitializationSerializer();

class _$StatInitializationSerializer
    implements StructuredSerializer<StatInitialization> {
  @override
  final Iterable<Type> types = const [StatInitialization, _$StatInitialization];
  @override
  final String wireName = 'StatInitialization';

  @override
  Iterable<Object?> serialize(
      Serializers serializers, StatInitialization object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'initialValue',
      serializers.serialize(object.initialValue,
          specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  StatInitialization deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new StatInitializationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'initialValue':
          result.initialValue = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
      }
    }

    return result.build();
  }
}

class _$StatInitialization extends StatInitialization {
  @override
  final int initialValue;
  @override
  final String name;

  factory _$StatInitialization(
          [void Function(StatInitializationBuilder)? updates]) =>
      (new StatInitializationBuilder()..update(updates))._build();

  _$StatInitialization._({required this.initialValue, required this.name})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        initialValue, r'StatInitialization', 'initialValue');
    BuiltValueNullFieldError.checkNotNull(name, r'StatInitialization', 'name');
  }

  @override
  StatInitialization rebuild(
          void Function(StatInitializationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  StatInitializationBuilder toBuilder() =>
      new StatInitializationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is StatInitialization &&
        initialValue == other.initialValue &&
        name == other.name;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, initialValue.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'StatInitialization')
          ..add('initialValue', initialValue)
          ..add('name', name))
        .toString();
  }
}

class StatInitializationBuilder
    implements Builder<StatInitialization, StatInitializationBuilder> {
  _$StatInitialization? _$v;

  int? _initialValue;
  int? get initialValue => _$this._initialValue;
  set initialValue(int? initialValue) => _$this._initialValue = initialValue;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  StatInitializationBuilder();

  StatInitializationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _initialValue = $v.initialValue;
      _name = $v.name;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(StatInitialization other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$StatInitialization;
  }

  @override
  void update(void Function(StatInitializationBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  StatInitialization build() => _build();

  _$StatInitialization _build() {
    final _$result = _$v ??
        new _$StatInitialization._(
            initialValue: BuiltValueNullFieldError.checkNotNull(
                initialValue, r'StatInitialization', 'initialValue'),
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'StatInitialization', 'name'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
