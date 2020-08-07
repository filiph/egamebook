// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.stat_initialization;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<StatInitialization<Object>> _$statInitializationSerializer =
    new _$StatInitializationSerializer();

class _$StatInitializationSerializer
    implements StructuredSerializer<StatInitialization<Object>> {
  @override
  final Iterable<Type> types = const [StatInitialization, _$StatInitialization];
  @override
  final String wireName = 'StatInitialization';

  @override
  Iterable<Object> serialize(
      Serializers serializers, StatInitialization<Object> object,
      {FullType specifiedType = FullType.unspecified}) {
    final isUnderspecified =
        specifiedType.isUnspecified || specifiedType.parameters.isEmpty;
    if (!isUnderspecified) serializers.expectBuilder(specifiedType);
    final parameterT =
        isUnderspecified ? FullType.object : specifiedType.parameters[0];

    final result = <Object>[
      'initialValue',
      serializers.serialize(object.initialValue, specifiedType: parameterT),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  StatInitialization<Object> deserialize(
      Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final isUnderspecified =
        specifiedType.isUnspecified || specifiedType.parameters.isEmpty;
    if (!isUnderspecified) serializers.expectBuilder(specifiedType);
    final parameterT =
        isUnderspecified ? FullType.object : specifiedType.parameters[0];

    final result = isUnderspecified
        ? new StatInitializationBuilder<Object>()
        : serializers.newBuilder(specifiedType) as StatInitializationBuilder;

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'initialValue':
          result.initialValue =
              serializers.deserialize(value, specifiedType: parameterT);
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
      }
    }

    return result.build();
  }
}

class _$StatInitialization<T> extends StatInitialization<T> {
  @override
  final T initialValue;
  @override
  final String name;

  factory _$StatInitialization(
          [void Function(StatInitializationBuilder<T>) updates]) =>
      (new StatInitializationBuilder<T>()..update(updates)).build();

  _$StatInitialization._({this.initialValue, this.name}) : super._() {
    if (initialValue == null) {
      throw new BuiltValueNullFieldError('StatInitialization', 'initialValue');
    }
    if (name == null) {
      throw new BuiltValueNullFieldError('StatInitialization', 'name');
    }
    if (T == dynamic) {
      throw new BuiltValueMissingGenericsError('StatInitialization', 'T');
    }
  }

  @override
  StatInitialization<T> rebuild(
          void Function(StatInitializationBuilder<T>) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  StatInitializationBuilder<T> toBuilder() =>
      new StatInitializationBuilder<T>()..replace(this);

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

class StatInitializationBuilder<T>
    implements Builder<StatInitialization<T>, StatInitializationBuilder<T>> {
  _$StatInitialization<T> _$v;

  T _initialValue;
  T get initialValue => _$this._initialValue;
  set initialValue(T initialValue) => _$this._initialValue = initialValue;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  StatInitializationBuilder();

  StatInitializationBuilder<T> get _$this {
    if (_$v != null) {
      _initialValue = _$v.initialValue;
      _name = _$v.name;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(StatInitialization<T> other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$StatInitialization<T>;
  }

  @override
  void update(void Function(StatInitializationBuilder<T>) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$StatInitialization<T> build() {
    final _$result = _$v ??
        new _$StatInitialization<T>._(initialValue: initialValue, name: name);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
