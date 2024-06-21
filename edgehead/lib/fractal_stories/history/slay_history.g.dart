// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'slay_history.dart';

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
  Iterable<Object?> serialize(Serializers serializers, SlayHistory object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'records',
      serializers.serialize(object.records,
          specifiedType: const FullType(BuiltListMultimap,
              const [const FullType(String), const FullType(SlayRecord)])),
    ];

    return result;
  }

  @override
  SlayHistory deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new SlayHistoryBuilder();

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
                const FullType(SlayRecord)
              ]))!);
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
  Iterable<Object?> serialize(Serializers serializers, SlayRecord object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'actorId',
      serializers.serialize(object.actorId, specifiedType: const FullType(int)),
      'roomName',
      serializers.serialize(object.roomName,
          specifiedType: const FullType(String)),
      'time',
      serializers.serialize(object.time,
          specifiedType: const FullType(DateTime)),
    ];
    Object? value;
    value = object.parentRoomName;
    if (value != null) {
      result
        ..add('parentRoomName')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(String)));
    }
    return result;
  }

  @override
  SlayRecord deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new SlayRecordBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'actorId':
          result.actorId = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'parentRoomName':
          result.parentRoomName = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String?;
          break;
        case 'roomName':
          result.roomName = serializers.deserialize(value,
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

class _$SlayHistory extends SlayHistory {
  @override
  final BuiltListMultimap<String, SlayRecord> records;

  factory _$SlayHistory([void Function(SlayHistoryBuilder)? updates]) =>
      (new SlayHistoryBuilder()..update(updates))._build();

  _$SlayHistory._({required this.records}) : super._() {
    BuiltValueNullFieldError.checkNotNull(records, r'SlayHistory', 'records');
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
    var _$hash = 0;
    _$hash = $jc(_$hash, records.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SlayHistory')
          ..add('records', records))
        .toString();
  }
}

class SlayHistoryBuilder implements Builder<SlayHistory, SlayHistoryBuilder> {
  _$SlayHistory? _$v;

  ListMultimapBuilder<String, SlayRecord>? _records;
  ListMultimapBuilder<String, SlayRecord> get records =>
      _$this._records ??= new ListMultimapBuilder<String, SlayRecord>();
  set records(ListMultimapBuilder<String, SlayRecord>? records) =>
      _$this._records = records;

  SlayHistoryBuilder();

  SlayHistoryBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _records = $v.records.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SlayHistory other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SlayHistory;
  }

  @override
  void update(void Function(SlayHistoryBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SlayHistory build() => _build();

  _$SlayHistory _build() {
    _$SlayHistory _$result;
    try {
      _$result = _$v ?? new _$SlayHistory._(records: records.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'records';
        records.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'SlayHistory', _$failedField, e.toString());
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
  final String? parentRoomName;
  @override
  final String roomName;
  @override
  final DateTime time;

  factory _$SlayRecord([void Function(SlayRecordBuilder)? updates]) =>
      (new SlayRecordBuilder()..update(updates))._build();

  _$SlayRecord._(
      {required this.actorId,
      this.parentRoomName,
      required this.roomName,
      required this.time})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(actorId, r'SlayRecord', 'actorId');
    BuiltValueNullFieldError.checkNotNull(roomName, r'SlayRecord', 'roomName');
    BuiltValueNullFieldError.checkNotNull(time, r'SlayRecord', 'time');
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
    var _$hash = 0;
    _$hash = $jc(_$hash, actorId.hashCode);
    _$hash = $jc(_$hash, parentRoomName.hashCode);
    _$hash = $jc(_$hash, roomName.hashCode);
    _$hash = $jc(_$hash, time.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SlayRecord')
          ..add('actorId', actorId)
          ..add('parentRoomName', parentRoomName)
          ..add('roomName', roomName)
          ..add('time', time))
        .toString();
  }
}

class SlayRecordBuilder implements Builder<SlayRecord, SlayRecordBuilder> {
  _$SlayRecord? _$v;

  int? _actorId;
  int? get actorId => _$this._actorId;
  set actorId(int? actorId) => _$this._actorId = actorId;

  String? _parentRoomName;
  String? get parentRoomName => _$this._parentRoomName;
  set parentRoomName(String? parentRoomName) =>
      _$this._parentRoomName = parentRoomName;

  String? _roomName;
  String? get roomName => _$this._roomName;
  set roomName(String? roomName) => _$this._roomName = roomName;

  DateTime? _time;
  DateTime? get time => _$this._time;
  set time(DateTime? time) => _$this._time = time;

  SlayRecordBuilder();

  SlayRecordBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _actorId = $v.actorId;
      _parentRoomName = $v.parentRoomName;
      _roomName = $v.roomName;
      _time = $v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SlayRecord other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SlayRecord;
  }

  @override
  void update(void Function(SlayRecordBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SlayRecord build() => _build();

  _$SlayRecord _build() {
    final _$result = _$v ??
        new _$SlayRecord._(
            actorId: BuiltValueNullFieldError.checkNotNull(
                actorId, r'SlayRecord', 'actorId'),
            parentRoomName: parentRoomName,
            roomName: BuiltValueNullFieldError.checkNotNull(
                roomName, r'SlayRecord', 'roomName'),
            time: BuiltValueNullFieldError.checkNotNull(
                time, r'SlayRecord', 'time'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
