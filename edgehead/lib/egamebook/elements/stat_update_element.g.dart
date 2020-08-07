// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.stat_update;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<StatUpdate<Object>> _$statUpdateSerializer =
    new _$StatUpdateSerializer();

class _$StatUpdateSerializer
    implements StructuredSerializer<StatUpdate<Object>> {
  @override
  final Iterable<Type> types = const [StatUpdate, _$StatUpdate];
  @override
  final String wireName = 'StatUpdate';

  @override
  Iterable<Object> serialize(Serializers serializers, StatUpdate<Object> object,
      {FullType specifiedType = FullType.unspecified}) {
    final isUnderspecified =
        specifiedType.isUnspecified || specifiedType.parameters.isEmpty;
    if (!isUnderspecified) serializers.expectBuilder(specifiedType);
    final parameterT =
        isUnderspecified ? FullType.object : specifiedType.parameters[0];

    final result = <Object>[
      'change',
      serializers.serialize(object.change, specifiedType: parameterT),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'newValue',
      serializers.serialize(object.newValue, specifiedType: parameterT),
    ];

    return result;
  }

  @override
  StatUpdate<Object> deserialize(
      Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final isUnderspecified =
        specifiedType.isUnspecified || specifiedType.parameters.isEmpty;
    if (!isUnderspecified) serializers.expectBuilder(specifiedType);
    final parameterT =
        isUnderspecified ? FullType.object : specifiedType.parameters[0];

    final result = isUnderspecified
        ? new StatUpdateBuilder<Object>()
        : serializers.newBuilder(specifiedType) as StatUpdateBuilder;

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'change':
          result.change =
              serializers.deserialize(value, specifiedType: parameterT);
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'newValue':
          result.newValue =
              serializers.deserialize(value, specifiedType: parameterT);
          break;
      }
    }

    return result.build();
  }
}

class _$StatUpdate<T> extends StatUpdate<T> {
  @override
  final T change;
  @override
  final String name;
  @override
  final T newValue;

  factory _$StatUpdate([void Function(StatUpdateBuilder<T>) updates]) =>
      (new StatUpdateBuilder<T>()..update(updates)).build();

  _$StatUpdate._({this.change, this.name, this.newValue}) : super._() {
    if (change == null) {
      throw new BuiltValueNullFieldError('StatUpdate', 'change');
    }
    if (name == null) {
      throw new BuiltValueNullFieldError('StatUpdate', 'name');
    }
    if (newValue == null) {
      throw new BuiltValueNullFieldError('StatUpdate', 'newValue');
    }
    if (T == dynamic) {
      throw new BuiltValueMissingGenericsError('StatUpdate', 'T');
    }
  }

  @override
  StatUpdate<T> rebuild(void Function(StatUpdateBuilder<T>) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  StatUpdateBuilder<T> toBuilder() => new StatUpdateBuilder<T>()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is StatUpdate &&
        change == other.change &&
        name == other.name &&
        newValue == other.newValue;
  }

  @override
  int get hashCode {
    return $jf(
        $jc($jc($jc(0, change.hashCode), name.hashCode), newValue.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('StatUpdate')
          ..add('change', change)
          ..add('name', name)
          ..add('newValue', newValue))
        .toString();
  }
}

class StatUpdateBuilder<T>
    implements Builder<StatUpdate<T>, StatUpdateBuilder<T>> {
  _$StatUpdate<T> _$v;

  T _change;
  T get change => _$this._change;
  set change(T change) => _$this._change = change;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  T _newValue;
  T get newValue => _$this._newValue;
  set newValue(T newValue) => _$this._newValue = newValue;

  StatUpdateBuilder();

  StatUpdateBuilder<T> get _$this {
    if (_$v != null) {
      _change = _$v.change;
      _name = _$v.name;
      _newValue = _$v.newValue;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(StatUpdate<T> other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$StatUpdate<T>;
  }

  @override
  void update(void Function(StatUpdateBuilder<T>) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$StatUpdate<T> build() {
    final _$result = _$v ??
        new _$StatUpdate<T>._(change: change, name: name, newValue: newValue);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
