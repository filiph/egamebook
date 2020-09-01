// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.history.slay;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<SlayHistory> _$slayHistorySerializer = new _$SlayHistorySerializer();
Serializer<SlayRecord> _$slayRecordSerializer = new _$SlayRecordSerializer();

class _$SlayHistorySerializer implements StructuredSerializer<SlayHistory> {
  @override
  final Iterable<Type> types = const [SlayHistory, _$SlayHistory];
  @override
  final String wireName = 'SlayHistory';

  @override
  Iterable<Object> serialize(Serializers serializers, SlayHistory object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'records',
      serializers.serialize(object.records,
          specifiedType: const FullType(BuiltListMultimap,
              const [const FullType(String), const FullType(SlayRecord)])),
    ];

    return result;
  }

  @override
  SlayHistory deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new SlayHistoryBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'records':
          result.records.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltListMultimap,
                  const [const FullType(String), const FullType(SlayRecord)])));
          break;
      }
    }

    return result.build();
  }
}

class _$SlayRecordSerializer implements StructuredSerializer<SlayRecord> {
  @override
  final Iterable<Type> types = const [SlayRecord, _$SlayRecord];
  @override
  final String wireName = 'SlayRecord';

  @override
  Iterable<Object> serialize(Serializers serializers, SlayRecord object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'actorId',
      serializers.serialize(object.actorId, specifiedType: const FullType(int)),
      'roomName',
      serializers.serialize(object.roomName,
          specifiedType: const FullType(String)),
      'time',
      serializers.serialize(object.time,
          specifiedType: const FullType(DateTime)),
    ];
    if (object.parentRoomName != null) {
      result
        ..add('parentRoomName')
        ..add(serializers.serialize(object.parentRoomName,
            specifiedType: const FullType(String)));
    }
    return result;
  }

  @override
  SlayRecord deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new SlayRecordBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'actorId':
          result.actorId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'parentRoomName':
          result.parentRoomName = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'roomName':
          result.roomName = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'time':
          result.time = serializers.deserialize(value,
              specifiedType: const FullType(DateTime)) as DateTime;
          break;
      }
    }

    return result.build();
  }
}

class _$SlayHistory extends SlayHistory {
  @override
  final BuiltListMultimap<String, SlayRecord> records;

  factory _$SlayHistory([void Function(SlayHistoryBuilder) updates]) =>
      (new SlayHistoryBuilder()..update(updates)).build();

  _$SlayHistory._({this.records}) : super._() {
    if (records == null) {
      throw new BuiltValueNullFieldError('SlayHistory', 'records');
    }
  }

  @override
  SlayHistory rebuild(void Function(SlayHistoryBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SlayHistoryBuilder toBuilder() => new SlayHistoryBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SlayHistory && records == other.records;
  }

  @override
  int get hashCode {
    return $jf($jc(0, records.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('SlayHistory')..add('records', records))
        .toString();
  }
}

class SlayHistoryBuilder implements Builder<SlayHistory, SlayHistoryBuilder> {
  _$SlayHistory _$v;

  ListMultimapBuilder<String, SlayRecord> _records;
  ListMultimapBuilder<String, SlayRecord> get records =>
      _$this._records ??= new ListMultimapBuilder<String, SlayRecord>();
  set records(ListMultimapBuilder<String, SlayRecord> records) =>
      _$this._records = records;

  SlayHistoryBuilder();

  SlayHistoryBuilder get _$this {
    if (_$v != null) {
      _records = _$v.records?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SlayHistory other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$SlayHistory;
  }

  @override
  void update(void Function(SlayHistoryBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$SlayHistory build() {
    _$SlayHistory _$result;
    try {
      _$result = _$v ?? new _$SlayHistory._(records: records.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'records';
        records.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'SlayHistory', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

class _$SlayRecord extends SlayRecord {
  @override
  final int actorId;
  @override
  final String parentRoomName;
  @override
  final String roomName;
  @override
  final DateTime time;

  factory _$SlayRecord([void Function(SlayRecordBuilder) updates]) =>
      (new SlayRecordBuilder()..update(updates)).build();

  _$SlayRecord._({this.actorId, this.parentRoomName, this.roomName, this.time})
      : super._() {
    if (actorId == null) {
      throw new BuiltValueNullFieldError('SlayRecord', 'actorId');
    }
    if (roomName == null) {
      throw new BuiltValueNullFieldError('SlayRecord', 'roomName');
    }
    if (time == null) {
      throw new BuiltValueNullFieldError('SlayRecord', 'time');
    }
  }

  @override
  SlayRecord rebuild(void Function(SlayRecordBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SlayRecordBuilder toBuilder() => new SlayRecordBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SlayRecord &&
        actorId == other.actorId &&
        parentRoomName == other.parentRoomName &&
        roomName == other.roomName &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, actorId.hashCode), parentRoomName.hashCode),
            roomName.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('SlayRecord')
          ..add('actorId', actorId)
          ..add('parentRoomName', parentRoomName)
          ..add('roomName', roomName)
          ..add('time', time))
        .toString();
  }
}

class SlayRecordBuilder implements Builder<SlayRecord, SlayRecordBuilder> {
  _$SlayRecord _$v;

  int _actorId;
  int get actorId => _$this._actorId;
  set actorId(int actorId) => _$this._actorId = actorId;

  String _parentRoomName;
  String get parentRoomName => _$this._parentRoomName;
  set parentRoomName(String parentRoomName) =>
      _$this._parentRoomName = parentRoomName;

  String _roomName;
  String get roomName => _$this._roomName;
  set roomName(String roomName) => _$this._roomName = roomName;

  DateTime _time;
  DateTime get time => _$this._time;
  set time(DateTime time) => _$this._time = time;

  SlayRecordBuilder();

  SlayRecordBuilder get _$this {
    if (_$v != null) {
      _actorId = _$v.actorId;
      _parentRoomName = _$v.parentRoomName;
      _roomName = _$v.roomName;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SlayRecord other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$SlayRecord;
  }

  @override
  void update(void Function(SlayRecordBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$SlayRecord build() {
    final _$result = _$v ??
        new _$SlayRecord._(
            actorId: actorId,
            parentRoomName: parentRoomName,
            roomName: roomName,
            time: time);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
