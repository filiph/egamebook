// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.stat_initialization;

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
        initialValue, 'StatInitialization', 'initialValue');
    BuiltValueNullFieldError.checkNotNull(name, 'StatInitialization', 'name');
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
    return $jf($jc($jc(0, initialValue.hashCode), name.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('StatInitialization')
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
                initialValue, 'StatInitialization', 'initialValue'),
            name: BuiltValueNullFieldError.checkNotNull(
                name, 'StatInitialization', 'name'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,no_leading_underscores_for_local_identifiers,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
