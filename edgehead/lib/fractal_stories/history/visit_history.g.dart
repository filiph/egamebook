// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.history.visit;

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

Serializer<VisitHistory> _$visitHistorySerializer =
    new _$VisitHistorySerializer();
Serializer<VisitRecord> _$visitRecordSerializer = new _$VisitRecordSerializer();

class _$VisitHistorySerializer implements StructuredSerializer<VisitHistory> {
  @override
  final Iterable<Type> types = const [VisitHistory, _$VisitHistory];
  @override
  final String wireName = 'VisitHistory';

  @override
  Iterable serialize(Serializers serializers, VisitHistory object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'records',
      serializers.serialize(object.records,
          specifiedType: const FullType(BuiltListMultimap,
              const [const FullType(String), const FullType(VisitRecord)])),
    ];

    return result;
  }

  @override
  VisitHistory deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new VisitHistoryBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'records':
          result.records.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltListMultimap, const [
                const FullType(String),
                const FullType(VisitRecord)
              ])) as BuiltListMultimap);
          break;
      }
    }

    return result.build();
  }
}

class _$VisitRecordSerializer implements StructuredSerializer<VisitRecord> {
  @override
  final Iterable<Type> types = const [VisitRecord, _$VisitRecord];
  @override
  final String wireName = 'VisitRecord';

  @override
  Iterable serialize(Serializers serializers, VisitRecord object,
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
  VisitRecord deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new VisitRecordBuilder();

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

class _$VisitHistory extends VisitHistory {
  @override
  final BuiltListMultimap<String, VisitRecord> records;

  factory _$VisitHistory([void updates(VisitHistoryBuilder b)]) =>
      (new VisitHistoryBuilder()..update(updates)).build();

  _$VisitHistory._({this.records}) : super._() {
    if (records == null)
      throw new BuiltValueNullFieldError('VisitHistory', 'records');
  }

  @override
  VisitHistory rebuild(void updates(VisitHistoryBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  VisitHistoryBuilder toBuilder() => new VisitHistoryBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is VisitHistory && records == other.records;
  }

  @override
  int get hashCode {
    return $jf($jc(0, records.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('VisitHistory')
          ..add('records', records))
        .toString();
  }
}

class VisitHistoryBuilder
    implements Builder<VisitHistory, VisitHistoryBuilder> {
  _$VisitHistory _$v;

  ListMultimapBuilder<String, VisitRecord> _records;
  ListMultimapBuilder<String, VisitRecord> get records =>
      _$this._records ??= new ListMultimapBuilder<String, VisitRecord>();
  set records(ListMultimapBuilder<String, VisitRecord> records) =>
      _$this._records = records;

  VisitHistoryBuilder();

  VisitHistoryBuilder get _$this {
    if (_$v != null) {
      _records = _$v.records?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(VisitHistory other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$VisitHistory;
  }

  @override
  void update(void updates(VisitHistoryBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$VisitHistory build() {
    _$VisitHistory _$result;
    try {
      _$result = _$v ?? new _$VisitHistory._(records: records.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'records';
        records.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'VisitHistory', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

class _$VisitRecord extends VisitRecord {
  @override
  final int actorId;
  @override
  final String parentRoomName;
  @override
  final String roomName;
  @override
  final DateTime time;

  factory _$VisitRecord([void updates(VisitRecordBuilder b)]) =>
      (new VisitRecordBuilder()..update(updates)).build();

  _$VisitRecord._({this.actorId, this.parentRoomName, this.roomName, this.time})
      : super._() {
    if (actorId == null)
      throw new BuiltValueNullFieldError('VisitRecord', 'actorId');
    if (roomName == null)
      throw new BuiltValueNullFieldError('VisitRecord', 'roomName');
    if (time == null) throw new BuiltValueNullFieldError('VisitRecord', 'time');
  }

  @override
  VisitRecord rebuild(void updates(VisitRecordBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  VisitRecordBuilder toBuilder() => new VisitRecordBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is VisitRecord &&
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
    return (newBuiltValueToStringHelper('VisitRecord')
          ..add('actorId', actorId)
          ..add('parentRoomName', parentRoomName)
          ..add('roomName', roomName)
          ..add('time', time))
        .toString();
  }
}

class VisitRecordBuilder implements Builder<VisitRecord, VisitRecordBuilder> {
  _$VisitRecord _$v;

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

  VisitRecordBuilder();

  VisitRecordBuilder get _$this {
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
  void replace(VisitRecord other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$VisitRecord;
  }

  @override
  void update(void updates(VisitRecordBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$VisitRecord build() {
    final _$result = _$v ??
        new _$VisitRecord._(
            actorId: actorId,
            parentRoomName: parentRoomName,
            roomName: roomName,
            time: time);
    replace(_$result);
    return _$result;
  }
}
