// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.stat_update;

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

Serializer<StatUpdate> _$statUpdateSerializer = new _$StatUpdateSerializer();

class _$StatUpdateSerializer implements StructuredSerializer<StatUpdate> {
  @override
  final Iterable<Type> types = const [StatUpdate, _$StatUpdate];
  @override
  final String wireName = 'StatUpdate';

  @override
  Iterable serialize(Serializers serializers, StatUpdate object,
      {FullType specifiedType = FullType.unspecified}) {
    final isUnderspecified =
        specifiedType.isUnspecified || specifiedType.parameters.isEmpty;
    if (!isUnderspecified) serializers.expectBuilder(specifiedType);
    final parameterT =
        isUnderspecified ? FullType.object : specifiedType.parameters[0];

    final result = <Object>[
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'newValue',
      serializers.serialize(object.newValue, specifiedType: parameterT),
    ];

    return result;
  }

  @override
  StatUpdate deserialize(Serializers serializers, Iterable serialized,
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
  final String name;
  @override
  final T newValue;

  factory _$StatUpdate([void updates(StatUpdateBuilder<T> b)]) =>
      (new StatUpdateBuilder<T>()..update(updates)).build();

  _$StatUpdate._({this.name, this.newValue}) : super._() {
    if (name == null) throw new BuiltValueNullFieldError('StatUpdate', 'name');
    if (newValue == null)
      throw new BuiltValueNullFieldError('StatUpdate', 'newValue');
    if (T == dynamic)
      throw new BuiltValueMissingGenericsError('StatUpdate', 'T');
  }

  @override
  StatUpdate<T> rebuild(void updates(StatUpdateBuilder<T> b)) =>
      (toBuilder()..update(updates)).build();

  @override
  StatUpdateBuilder<T> toBuilder() => new StatUpdateBuilder<T>()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is StatUpdate &&
        name == other.name &&
        newValue == other.newValue;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, name.hashCode), newValue.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('StatUpdate')
          ..add('name', name)
          ..add('newValue', newValue))
        .toString();
  }
}

class StatUpdateBuilder<T>
    implements Builder<StatUpdate<T>, StatUpdateBuilder<T>> {
  _$StatUpdate<T> _$v;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  T _newValue;
  T get newValue => _$this._newValue;
  set newValue(T newValue) => _$this._newValue = newValue;

  StatUpdateBuilder();

  StatUpdateBuilder<T> get _$this {
    if (_$v != null) {
      _name = _$v.name;
      _newValue = _$v.newValue;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(StatUpdate<T> other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$StatUpdate<T>;
  }

  @override
  void update(void updates(StatUpdateBuilder<T> b)) {
    if (updates != null) updates(this);
  }

  @override
  _$StatUpdate<T> build() {
    final _$result =
        _$v ?? new _$StatUpdate<T>._(name: name, newValue: newValue);
    replace(_$result);
    return _$result;
  }
}
