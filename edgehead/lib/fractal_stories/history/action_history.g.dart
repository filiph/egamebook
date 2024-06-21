// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'action_history.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<ActionHistory> _$actionHistorySerializer =
    new _$ActionHistorySerializer();
Serializer<ActionRecord> _$actionRecordSerializer =
    new _$ActionRecordSerializer();

class _$ActionHistorySerializer implements StructuredSerializer<ActionHistory> {
  @override
  final Iterable<Type> types = const [ActionHistory, _$ActionHistory];
  @override
  final String wireName = 'ActionHistory';

  @override
  Iterable<Object?> serialize(Serializers serializers, ActionHistory object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'latestAggression',
      serializers.serialize(object.latestAggression,
          specifiedType: const FullType(
              BuiltMap, const [const FullType(int), const FullType(DateTime)])),
      'latestByActorId',
      serializers.serialize(object.latestByActorId,
          specifiedType: const FullType(
              BuiltMap, const [const FullType(int), const FullType(DateTime)])),
      'latestProactiveByActorId',
      serializers.serialize(object.latestProactiveByActorId,
          specifiedType: const FullType(
              BuiltMap, const [const FullType(int), const FullType(DateTime)])),
      'records',
      serializers.serialize(object.records,
          specifiedType:
              const FullType(BuiltList, const [const FullType(ActionRecord)])),
    ];

    return result;
  }

  @override
  ActionHistory deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ActionHistoryBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'latestAggression':
          result.latestAggression.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap,
                  const [const FullType(int), const FullType(DateTime)]))!);
          break;
        case 'latestByActorId':
          result.latestByActorId.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap,
                  const [const FullType(int), const FullType(DateTime)]))!);
          break;
        case 'latestProactiveByActorId':
          result.latestProactiveByActorId.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap,
                  const [const FullType(int), const FullType(DateTime)]))!);
          break;
        case 'records':
          result.records.replace(serializers.deserialize(value,
                  specifiedType: const FullType(
                      BuiltList, const [const FullType(ActionRecord)]))!
              as BuiltList<Object?>);
          break;
      }
    }

    return result.build();
  }
}

class _$ActionRecordSerializer implements StructuredSerializer<ActionRecord> {
  @override
  final Iterable<Type> types = const [ActionRecord, _$ActionRecord];
  @override
  final String wireName = 'ActionRecord';

  @override
  Iterable<Object?> serialize(Serializers serializers, ActionRecord object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'actionName',
      serializers.serialize(object.actionName,
          specifiedType: const FullType(String)),
      'description',
      serializers.serialize(object.description,
          specifiedType: const FullType(String)),
      'sufferers',
      serializers.serialize(object.sufferers,
          specifiedType: const FullType(BuiltSet, const [const FullType(int)])),
      'time',
      serializers.serialize(object.time,
          specifiedType: const FullType(DateTime)),
      'wasAggressive',
      serializers.serialize(object.wasAggressive,
          specifiedType: const FullType(bool)),
      'wasFailure',
      serializers.serialize(object.wasFailure,
          specifiedType: const FullType(bool)),
      'wasProactive',
      serializers.serialize(object.wasProactive,
          specifiedType: const FullType(bool)),
      'wasSuccess',
      serializers.serialize(object.wasSuccess,
          specifiedType: const FullType(bool)),
    ];
    Object? value;
    value = object.dataString;
    if (value != null) {
      result
        ..add('dataString')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(String)));
    }
    value = object.protagonist;
    if (value != null) {
      result
        ..add('protagonist')
        ..add(serializers.serialize(value, specifiedType: const FullType(int)));
    }
    return result;
  }

  @override
  ActionRecord deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ActionRecordBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'actionName':
          result.actionName = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'dataString':
          result.dataString = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String?;
          break;
        case 'description':
          result.description = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'protagonist':
          result.protagonist = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int?;
          break;
        case 'sufferers':
          result.sufferers.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltSet, const [const FullType(int)]))!
              as BuiltSet<Object?>);
          break;
        case 'time':
          result.time = serializers.deserialize(value,
              specifiedType: const FullType(DateTime))! as DateTime;
          break;
        case 'wasAggressive':
          result.wasAggressive = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'wasFailure':
          result.wasFailure = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'wasProactive':
          result.wasProactive = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'wasSuccess':
          result.wasSuccess = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$ActionHistory extends ActionHistory {
  @override
  final BuiltMap<int, DateTime> latestAggression;
  @override
  final BuiltMap<int, DateTime> latestByActorId;
  @override
  final BuiltMap<int, DateTime> latestProactiveByActorId;
  @override
  final BuiltList<ActionRecord> records;

  factory _$ActionHistory([void Function(ActionHistoryBuilder)? updates]) =>
      (new ActionHistoryBuilder()..update(updates))._build();

  _$ActionHistory._(
      {required this.latestAggression,
      required this.latestByActorId,
      required this.latestProactiveByActorId,
      required this.records})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        latestAggression, r'ActionHistory', 'latestAggression');
    BuiltValueNullFieldError.checkNotNull(
        latestByActorId, r'ActionHistory', 'latestByActorId');
    BuiltValueNullFieldError.checkNotNull(
        latestProactiveByActorId, r'ActionHistory', 'latestProactiveByActorId');
    BuiltValueNullFieldError.checkNotNull(records, r'ActionHistory', 'records');
  }

  @override
  ActionHistory rebuild(void Function(ActionHistoryBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ActionHistoryBuilder toBuilder() => new ActionHistoryBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ActionHistory &&
        latestAggression == other.latestAggression &&
        latestByActorId == other.latestByActorId &&
        latestProactiveByActorId == other.latestProactiveByActorId &&
        records == other.records;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, latestAggression.hashCode);
    _$hash = $jc(_$hash, latestByActorId.hashCode);
    _$hash = $jc(_$hash, latestProactiveByActorId.hashCode);
    _$hash = $jc(_$hash, records.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'ActionHistory')
          ..add('latestAggression', latestAggression)
          ..add('latestByActorId', latestByActorId)
          ..add('latestProactiveByActorId', latestProactiveByActorId)
          ..add('records', records))
        .toString();
  }
}

class ActionHistoryBuilder
    implements Builder<ActionHistory, ActionHistoryBuilder> {
  _$ActionHistory? _$v;

  MapBuilder<int, DateTime>? _latestAggression;
  MapBuilder<int, DateTime> get latestAggression =>
      _$this._latestAggression ??= new MapBuilder<int, DateTime>();
  set latestAggression(MapBuilder<int, DateTime>? latestAggression) =>
      _$this._latestAggression = latestAggression;

  MapBuilder<int, DateTime>? _latestByActorId;
  MapBuilder<int, DateTime> get latestByActorId =>
      _$this._latestByActorId ??= new MapBuilder<int, DateTime>();
  set latestByActorId(MapBuilder<int, DateTime>? latestByActorId) =>
      _$this._latestByActorId = latestByActorId;

  MapBuilder<int, DateTime>? _latestProactiveByActorId;
  MapBuilder<int, DateTime> get latestProactiveByActorId =>
      _$this._latestProactiveByActorId ??= new MapBuilder<int, DateTime>();
  set latestProactiveByActorId(
          MapBuilder<int, DateTime>? latestProactiveByActorId) =>
      _$this._latestProactiveByActorId = latestProactiveByActorId;

  ListBuilder<ActionRecord>? _records;
  ListBuilder<ActionRecord> get records =>
      _$this._records ??= new ListBuilder<ActionRecord>();
  set records(ListBuilder<ActionRecord>? records) => _$this._records = records;

  ActionHistoryBuilder();

  ActionHistoryBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _latestAggression = $v.latestAggression.toBuilder();
      _latestByActorId = $v.latestByActorId.toBuilder();
      _latestProactiveByActorId = $v.latestProactiveByActorId.toBuilder();
      _records = $v.records.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ActionHistory other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ActionHistory;
  }

  @override
  void update(void Function(ActionHistoryBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  ActionHistory build() => _build();

  _$ActionHistory _build() {
    _$ActionHistory _$result;
    try {
      _$result = _$v ??
          new _$ActionHistory._(
              latestAggression: latestAggression.build(),
              latestByActorId: latestByActorId.build(),
              latestProactiveByActorId: latestProactiveByActorId.build(),
              records: records.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'latestAggression';
        latestAggression.build();
        _$failedField = 'latestByActorId';
        latestByActorId.build();
        _$failedField = 'latestProactiveByActorId';
        latestProactiveByActorId.build();
        _$failedField = 'records';
        records.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'ActionHistory', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

class _$ActionRecord extends ActionRecord {
  @override
  final String actionName;
  @override
  final String? dataString;
  @override
  final String description;
  @override
  final int? protagonist;
  @override
  final BuiltSet<int> sufferers;
  @override
  final DateTime time;
  @override
  final bool wasAggressive;
  @override
  final bool wasFailure;
  @override
  final bool wasProactive;
  @override
  final bool wasSuccess;

  factory _$ActionRecord([void Function(ActionRecordBuilder)? updates]) =>
      (new ActionRecordBuilder()..update(updates))._build();

  _$ActionRecord._(
      {required this.actionName,
      this.dataString,
      required this.description,
      this.protagonist,
      required this.sufferers,
      required this.time,
      required this.wasAggressive,
      required this.wasFailure,
      required this.wasProactive,
      required this.wasSuccess})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        actionName, r'ActionRecord', 'actionName');
    BuiltValueNullFieldError.checkNotNull(
        description, r'ActionRecord', 'description');
    BuiltValueNullFieldError.checkNotNull(
        sufferers, r'ActionRecord', 'sufferers');
    BuiltValueNullFieldError.checkNotNull(time, r'ActionRecord', 'time');
    BuiltValueNullFieldError.checkNotNull(
        wasAggressive, r'ActionRecord', 'wasAggressive');
    BuiltValueNullFieldError.checkNotNull(
        wasFailure, r'ActionRecord', 'wasFailure');
    BuiltValueNullFieldError.checkNotNull(
        wasProactive, r'ActionRecord', 'wasProactive');
    BuiltValueNullFieldError.checkNotNull(
        wasSuccess, r'ActionRecord', 'wasSuccess');
  }

  @override
  ActionRecord rebuild(void Function(ActionRecordBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ActionRecordBuilder toBuilder() => new ActionRecordBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ActionRecord &&
        actionName == other.actionName &&
        dataString == other.dataString &&
        description == other.description &&
        protagonist == other.protagonist &&
        sufferers == other.sufferers &&
        time == other.time &&
        wasAggressive == other.wasAggressive &&
        wasFailure == other.wasFailure &&
        wasProactive == other.wasProactive &&
        wasSuccess == other.wasSuccess;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, actionName.hashCode);
    _$hash = $jc(_$hash, dataString.hashCode);
    _$hash = $jc(_$hash, description.hashCode);
    _$hash = $jc(_$hash, protagonist.hashCode);
    _$hash = $jc(_$hash, sufferers.hashCode);
    _$hash = $jc(_$hash, time.hashCode);
    _$hash = $jc(_$hash, wasAggressive.hashCode);
    _$hash = $jc(_$hash, wasFailure.hashCode);
    _$hash = $jc(_$hash, wasProactive.hashCode);
    _$hash = $jc(_$hash, wasSuccess.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }
}

class ActionRecordBuilder
    implements Builder<ActionRecord, ActionRecordBuilder> {
  _$ActionRecord? _$v;

  String? _actionName;
  String? get actionName => _$this._actionName;
  set actionName(String? actionName) => _$this._actionName = actionName;

  String? _dataString;
  String? get dataString => _$this._dataString;
  set dataString(String? dataString) => _$this._dataString = dataString;

  String? _description;
  String? get description => _$this._description;
  set description(String? description) => _$this._description = description;

  int? _protagonist;
  int? get protagonist => _$this._protagonist;
  set protagonist(int? protagonist) => _$this._protagonist = protagonist;

  SetBuilder<int>? _sufferers;
  SetBuilder<int> get sufferers => _$this._sufferers ??= new SetBuilder<int>();
  set sufferers(SetBuilder<int>? sufferers) => _$this._sufferers = sufferers;

  DateTime? _time;
  DateTime? get time => _$this._time;
  set time(DateTime? time) => _$this._time = time;

  bool? _wasAggressive;
  bool? get wasAggressive => _$this._wasAggressive;
  set wasAggressive(bool? wasAggressive) =>
      _$this._wasAggressive = wasAggressive;

  bool? _wasFailure;
  bool? get wasFailure => _$this._wasFailure;
  set wasFailure(bool? wasFailure) => _$this._wasFailure = wasFailure;

  bool? _wasProactive;
  bool? get wasProactive => _$this._wasProactive;
  set wasProactive(bool? wasProactive) => _$this._wasProactive = wasProactive;

  bool? _wasSuccess;
  bool? get wasSuccess => _$this._wasSuccess;
  set wasSuccess(bool? wasSuccess) => _$this._wasSuccess = wasSuccess;

  ActionRecordBuilder();

  ActionRecordBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _actionName = $v.actionName;
      _dataString = $v.dataString;
      _description = $v.description;
      _protagonist = $v.protagonist;
      _sufferers = $v.sufferers.toBuilder();
      _time = $v.time;
      _wasAggressive = $v.wasAggressive;
      _wasFailure = $v.wasFailure;
      _wasProactive = $v.wasProactive;
      _wasSuccess = $v.wasSuccess;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ActionRecord other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ActionRecord;
  }

  @override
  void update(void Function(ActionRecordBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  ActionRecord build() => _build();

  _$ActionRecord _build() {
    _$ActionRecord _$result;
    try {
      _$result = _$v ??
          new _$ActionRecord._(
              actionName: BuiltValueNullFieldError.checkNotNull(
                  actionName, r'ActionRecord', 'actionName'),
              dataString: dataString,
              description: BuiltValueNullFieldError.checkNotNull(
                  description, r'ActionRecord', 'description'),
              protagonist: protagonist,
              sufferers: sufferers.build(),
              time: BuiltValueNullFieldError.checkNotNull(
                  time, r'ActionRecord', 'time'),
              wasAggressive: BuiltValueNullFieldError.checkNotNull(
                  wasAggressive, r'ActionRecord', 'wasAggressive'),
              wasFailure: BuiltValueNullFieldError.checkNotNull(
                  wasFailure, r'ActionRecord', 'wasFailure'),
              wasProactive: BuiltValueNullFieldError.checkNotNull(
                  wasProactive, r'ActionRecord', 'wasProactive'),
              wasSuccess: BuiltValueNullFieldError.checkNotNull(
                  wasSuccess, r'ActionRecord', 'wasSuccess'));
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'sufferers';
        sufferers.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'ActionRecord', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
