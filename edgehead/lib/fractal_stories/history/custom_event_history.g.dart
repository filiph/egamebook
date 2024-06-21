// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'custom_event_history.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<CustomEvent> _$customEventSerializer = new _$CustomEventSerializer();
Serializer<CustomEventHistory> _$customEventHistorySerializer =
    new _$CustomEventHistorySerializer();

class _$CustomEventSerializer implements StructuredSerializer<CustomEvent> {
  @override
  final Iterable<Type> types = const [CustomEvent, _$CustomEvent];
  @override
  final String wireName = 'CustomEvent';

  @override
  Iterable<Object?> serialize(Serializers serializers, CustomEvent object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'time',
      serializers.serialize(object.time,
          specifiedType: const FullType(DateTime)),
    ];
    Object? value;
    value = object.actorId;
    if (value != null) {
      result
        ..add('actorId')
        ..add(serializers.serialize(value, specifiedType: const FullType(int)));
    }
    value = object.data;
    if (value != null) {
      result
        ..add('data')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(Object)));
    }
    return result;
  }

  @override
  CustomEvent deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new CustomEventBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'actorId':
          result.actorId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int?;
          break;
        case 'data':
          result.data = serializers.deserialize(value,
              specifiedType: const FullType(Object));
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'time':
          result.time = serializers.deserialize(value,
              specifiedType: const FullType(DateTime))! as DateTime;
          break;
      }
    }

    return result.build();
  }
}

class _$CustomEventHistorySerializer
    implements StructuredSerializer<CustomEventHistory> {
  @override
  final Iterable<Type> types = const [CustomEventHistory, _$CustomEventHistory];
  @override
  final String wireName = 'CustomEventHistory';

  @override
  Iterable<Object?> serialize(
      Serializers serializers, CustomEventHistory object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'records',
      serializers.serialize(object.records,
          specifiedType: const FullType(BuiltListMultimap,
              const [const FullType(String), const FullType(CustomEvent)])),
    ];

    return result;
  }

  @override
  CustomEventHistory deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new CustomEventHistoryBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'records':
          result.records.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltListMultimap, const [
                const FullType(String),
                const FullType(CustomEvent)
              ]))!);
          break;
      }
    }

    return result.build();
  }
}

class _$CustomEvent extends CustomEvent {
  @override
  final int? actorId;
  @override
  final Object? data;
  @override
  final String name;
  @override
  final DateTime time;

  factory _$CustomEvent([void Function(CustomEventBuilder)? updates]) =>
      (new CustomEventBuilder()..update(updates))._build();

  _$CustomEvent._(
      {this.actorId, this.data, required this.name, required this.time})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(name, r'CustomEvent', 'name');
    BuiltValueNullFieldError.checkNotNull(time, r'CustomEvent', 'time');
  }

  @override
  CustomEvent rebuild(void Function(CustomEventBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  CustomEventBuilder toBuilder() => new CustomEventBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is CustomEvent &&
        actorId == other.actorId &&
        data == other.data &&
        name == other.name &&
        time == other.time;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, actorId.hashCode);
    _$hash = $jc(_$hash, data.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, time.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'CustomEvent')
          ..add('actorId', actorId)
          ..add('data', data)
          ..add('name', name)
          ..add('time', time))
        .toString();
  }
}

class CustomEventBuilder implements Builder<CustomEvent, CustomEventBuilder> {
  _$CustomEvent? _$v;

  int? _actorId;
  int? get actorId => _$this._actorId;
  set actorId(int? actorId) => _$this._actorId = actorId;

  Object? _data;
  Object? get data => _$this._data;
  set data(Object? data) => _$this._data = data;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  DateTime? _time;
  DateTime? get time => _$this._time;
  set time(DateTime? time) => _$this._time = time;

  CustomEventBuilder();

  CustomEventBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _actorId = $v.actorId;
      _data = $v.data;
      _name = $v.name;
      _time = $v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CustomEvent other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$CustomEvent;
  }

  @override
  void update(void Function(CustomEventBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  CustomEvent build() => _build();

  _$CustomEvent _build() {
    final _$result = _$v ??
        new _$CustomEvent._(
            actorId: actorId,
            data: data,
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'CustomEvent', 'name'),
            time: BuiltValueNullFieldError.checkNotNull(
                time, r'CustomEvent', 'time'));
    replace(_$result);
    return _$result;
  }
}

class _$CustomEventHistory extends CustomEventHistory {
  @override
  final BuiltListMultimap<String, CustomEvent> records;

  factory _$CustomEventHistory(
          [void Function(CustomEventHistoryBuilder)? updates]) =>
      (new CustomEventHistoryBuilder()..update(updates))._build();

  _$CustomEventHistory._({required this.records}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        records, r'CustomEventHistory', 'records');
  }

  @override
  CustomEventHistory rebuild(
          void Function(CustomEventHistoryBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  CustomEventHistoryBuilder toBuilder() =>
      new CustomEventHistoryBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is CustomEventHistory && records == other.records;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, records.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'CustomEventHistory')
          ..add('records', records))
        .toString();
  }
}

class CustomEventHistoryBuilder
    implements Builder<CustomEventHistory, CustomEventHistoryBuilder> {
  _$CustomEventHistory? _$v;

  ListMultimapBuilder<String, CustomEvent>? _records;
  ListMultimapBuilder<String, CustomEvent> get records =>
      _$this._records ??= new ListMultimapBuilder<String, CustomEvent>();
  set records(ListMultimapBuilder<String, CustomEvent>? records) =>
      _$this._records = records;

  CustomEventHistoryBuilder();

  CustomEventHistoryBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _records = $v.records.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CustomEventHistory other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$CustomEventHistory;
  }

  @override
  void update(void Function(CustomEventHistoryBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  CustomEventHistory build() => _build();

  _$CustomEventHistory _build() {
    _$CustomEventHistory _$result;
    try {
      _$result = _$v ?? new _$CustomEventHistory._(records: records.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'records';
        records.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'CustomEventHistory', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
