// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'stat_update_element.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<StatUpdate> _$statUpdateSerializer = new _$StatUpdateSerializer();

class _$StatUpdateSerializer implements StructuredSerializer<StatUpdate> {
  @override
  final Iterable<Type> types = const [StatUpdate, _$StatUpdate];
  @override
  final String wireName = 'StatUpdate';

  @override
  Iterable<Object?> serialize(Serializers serializers, StatUpdate object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'change',
      serializers.serialize(object.change, specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'newValue',
      serializers.serialize(object.newValue,
          specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  StatUpdate deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new StatUpdateBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'change':
          result.change = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'newValue':
          result.newValue = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
      }
    }

    return result.build();
  }
}

class _$StatUpdate extends StatUpdate {
  @override
  final int change;
  @override
  final String name;
  @override
  final int newValue;

  factory _$StatUpdate([void Function(StatUpdateBuilder)? updates]) =>
      (new StatUpdateBuilder()..update(updates))._build();

  _$StatUpdate._(
      {required this.change, required this.name, required this.newValue})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(change, r'StatUpdate', 'change');
    BuiltValueNullFieldError.checkNotNull(name, r'StatUpdate', 'name');
    BuiltValueNullFieldError.checkNotNull(newValue, r'StatUpdate', 'newValue');
  }

  @override
  StatUpdate rebuild(void Function(StatUpdateBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  StatUpdateBuilder toBuilder() => new StatUpdateBuilder()..replace(this);

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
    var _$hash = 0;
    _$hash = $jc(_$hash, change.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, newValue.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'StatUpdate')
          ..add('change', change)
          ..add('name', name)
          ..add('newValue', newValue))
        .toString();
  }
}

class StatUpdateBuilder implements Builder<StatUpdate, StatUpdateBuilder> {
  _$StatUpdate? _$v;

  int? _change;
  int? get change => _$this._change;
  set change(int? change) => _$this._change = change;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  int? _newValue;
  int? get newValue => _$this._newValue;
  set newValue(int? newValue) => _$this._newValue = newValue;

  StatUpdateBuilder();

  StatUpdateBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _change = $v.change;
      _name = $v.name;
      _newValue = $v.newValue;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(StatUpdate other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$StatUpdate;
  }

  @override
  void update(void Function(StatUpdateBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  StatUpdate build() => _build();

  _$StatUpdate _build() {
    final _$result = _$v ??
        new _$StatUpdate._(
            change: BuiltValueNullFieldError.checkNotNull(
                change, r'StatUpdate', 'change'),
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'StatUpdate', 'name'),
            newValue: BuiltValueNullFieldError.checkNotNull(
                newValue, r'StatUpdate', 'newValue'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
