// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.history.action;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_returning_this
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

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
  Iterable serialize(Serializers serializers, ActionHistory object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
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
  ActionHistory deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new ActionHistoryBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'latestByActorId':
          result.latestByActorId.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap, const [
                const FullType(int),
                const FullType(DateTime)
              ])) as BuiltMap<int, DateTime>);
          break;
        case 'latestProactiveByActorId':
          result.latestProactiveByActorId.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap, const [
                const FullType(int),
                const FullType(DateTime)
              ])) as BuiltMap<int, DateTime>);
          break;
        case 'records':
          result.records.replace(serializers.deserialize(value,
                  specifiedType: const FullType(
                      BuiltList, const [const FullType(ActionRecord)]))
              as BuiltList<ActionRecord>);
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
  Iterable serialize(Serializers serializers, ActionRecord object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'actionName',
      serializers.serialize(object.actionName,
          specifiedType: const FullType(String)),
      'description',
      serializers.serialize(object.description,
          specifiedType: const FullType(String)),
      'protagonist',
      serializers.serialize(object.protagonist,
          specifiedType: const FullType(int)),
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
    if (object.dataString != null) {
      result
        ..add('dataString')
        ..add(serializers.serialize(object.dataString,
            specifiedType: const FullType(String)));
    }

    return result;
  }

  @override
  ActionRecord deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new ActionRecordBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'actionName':
          result.actionName = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'dataString':
          result.dataString = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'description':
          result.description = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'protagonist':
          result.protagonist = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'sufferers':
          result.sufferers.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltSet, const [const FullType(int)]))
              as BuiltSet<int>);
          break;
        case 'time':
          result.time = serializers.deserialize(value,
              specifiedType: const FullType(DateTime)) as DateTime;
          break;
        case 'wasAggressive':
          result.wasAggressive = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'wasFailure':
          result.wasFailure = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'wasProactive':
          result.wasProactive = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'wasSuccess':
          result.wasSuccess = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$ActionHistory extends ActionHistory {
  @override
  final BuiltMap<int, DateTime> latestByActorId;
  @override
  final BuiltMap<int, DateTime> latestProactiveByActorId;
  @override
  final BuiltList<ActionRecord> records;

  factory _$ActionHistory([void updates(ActionHistoryBuilder b)]) =>
      (new ActionHistoryBuilder()..update(updates)).build();

  _$ActionHistory._(
      {this.latestByActorId, this.latestProactiveByActorId, this.records})
      : super._() {
    if (latestByActorId == null)
      throw new ArgumentError.notNull('latestByActorId');
    if (latestProactiveByActorId == null)
      throw new ArgumentError.notNull('latestProactiveByActorId');
    if (records == null) throw new ArgumentError.notNull('records');
  }

  @override
  ActionHistory rebuild(void updates(ActionHistoryBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ActionHistoryBuilder toBuilder() => new ActionHistoryBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! ActionHistory) return false;
    return latestByActorId == other.latestByActorId &&
        latestProactiveByActorId == other.latestProactiveByActorId &&
        records == other.records;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc(0, latestByActorId.hashCode),
            latestProactiveByActorId.hashCode),
        records.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('ActionHistory')
          ..add('latestByActorId', latestByActorId)
          ..add('latestProactiveByActorId', latestProactiveByActorId)
          ..add('records', records))
        .toString();
  }
}

class ActionHistoryBuilder
    implements Builder<ActionHistory, ActionHistoryBuilder> {
  _$ActionHistory _$v;

  MapBuilder<int, DateTime> _latestByActorId;
  MapBuilder<int, DateTime> get latestByActorId =>
      _$this._latestByActorId ??= new MapBuilder<int, DateTime>();
  set latestByActorId(MapBuilder<int, DateTime> latestByActorId) =>
      _$this._latestByActorId = latestByActorId;

  MapBuilder<int, DateTime> _latestProactiveByActorId;
  MapBuilder<int, DateTime> get latestProactiveByActorId =>
      _$this._latestProactiveByActorId ??= new MapBuilder<int, DateTime>();
  set latestProactiveByActorId(
          MapBuilder<int, DateTime> latestProactiveByActorId) =>
      _$this._latestProactiveByActorId = latestProactiveByActorId;

  ListBuilder<ActionRecord> _records;
  ListBuilder<ActionRecord> get records =>
      _$this._records ??= new ListBuilder<ActionRecord>();
  set records(ListBuilder<ActionRecord> records) => _$this._records = records;

  ActionHistoryBuilder();

  ActionHistoryBuilder get _$this {
    if (_$v != null) {
      _latestByActorId = _$v.latestByActorId?.toBuilder();
      _latestProactiveByActorId = _$v.latestProactiveByActorId?.toBuilder();
      _records = _$v.records?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ActionHistory other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$ActionHistory;
  }

  @override
  void update(void updates(ActionHistoryBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$ActionHistory build() {
    final _$result = _$v ??
        new _$ActionHistory._(
            latestByActorId: latestByActorId?.build(),
            latestProactiveByActorId: latestProactiveByActorId?.build(),
            records: records?.build());
    replace(_$result);
    return _$result;
  }
}

class _$ActionRecord extends ActionRecord {
  @override
  final String actionName;
  @override
  final String dataString;
  @override
  final String description;
  @override
  final int protagonist;
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

  factory _$ActionRecord([void updates(ActionRecordBuilder b)]) =>
      (new ActionRecordBuilder()..update(updates)).build();

  _$ActionRecord._(
      {this.actionName,
      this.dataString,
      this.description,
      this.protagonist,
      this.sufferers,
      this.time,
      this.wasAggressive,
      this.wasFailure,
      this.wasProactive,
      this.wasSuccess})
      : super._() {
    if (actionName == null) throw new ArgumentError.notNull('actionName');
    if (description == null) throw new ArgumentError.notNull('description');
    if (protagonist == null) throw new ArgumentError.notNull('protagonist');
    if (sufferers == null) throw new ArgumentError.notNull('sufferers');
    if (time == null) throw new ArgumentError.notNull('time');
    if (wasAggressive == null) throw new ArgumentError.notNull('wasAggressive');
    if (wasFailure == null) throw new ArgumentError.notNull('wasFailure');
    if (wasProactive == null) throw new ArgumentError.notNull('wasProactive');
    if (wasSuccess == null) throw new ArgumentError.notNull('wasSuccess');
  }

  @override
  ActionRecord rebuild(void updates(ActionRecordBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ActionRecordBuilder toBuilder() => new ActionRecordBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! ActionRecord) return false;
    return actionName == other.actionName &&
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
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc(
                        $jc(
                            $jc(
                                $jc(
                                    $jc($jc(0, actionName.hashCode),
                                        dataString.hashCode),
                                    description.hashCode),
                                protagonist.hashCode),
                            sufferers.hashCode),
                        time.hashCode),
                    wasAggressive.hashCode),
                wasFailure.hashCode),
            wasProactive.hashCode),
        wasSuccess.hashCode));
  }
}

class ActionRecordBuilder
    implements Builder<ActionRecord, ActionRecordBuilder> {
  _$ActionRecord _$v;

  String _actionName;
  String get actionName => _$this._actionName;
  set actionName(String actionName) => _$this._actionName = actionName;

  String _dataString;
  String get dataString => _$this._dataString;
  set dataString(String dataString) => _$this._dataString = dataString;

  String _description;
  String get description => _$this._description;
  set description(String description) => _$this._description = description;

  int _protagonist;
  int get protagonist => _$this._protagonist;
  set protagonist(int protagonist) => _$this._protagonist = protagonist;

  SetBuilder<int> _sufferers;
  SetBuilder<int> get sufferers => _$this._sufferers ??= new SetBuilder<int>();
  set sufferers(SetBuilder<int> sufferers) => _$this._sufferers = sufferers;

  DateTime _time;
  DateTime get time => _$this._time;
  set time(DateTime time) => _$this._time = time;

  bool _wasAggressive;
  bool get wasAggressive => _$this._wasAggressive;
  set wasAggressive(bool wasAggressive) =>
      _$this._wasAggressive = wasAggressive;

  bool _wasFailure;
  bool get wasFailure => _$this._wasFailure;
  set wasFailure(bool wasFailure) => _$this._wasFailure = wasFailure;

  bool _wasProactive;
  bool get wasProactive => _$this._wasProactive;
  set wasProactive(bool wasProactive) => _$this._wasProactive = wasProactive;

  bool _wasSuccess;
  bool get wasSuccess => _$this._wasSuccess;
  set wasSuccess(bool wasSuccess) => _$this._wasSuccess = wasSuccess;

  ActionRecordBuilder();

  ActionRecordBuilder get _$this {
    if (_$v != null) {
      _actionName = _$v.actionName;
      _dataString = _$v.dataString;
      _description = _$v.description;
      _protagonist = _$v.protagonist;
      _sufferers = _$v.sufferers?.toBuilder();
      _time = _$v.time;
      _wasAggressive = _$v.wasAggressive;
      _wasFailure = _$v.wasFailure;
      _wasProactive = _$v.wasProactive;
      _wasSuccess = _$v.wasSuccess;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ActionRecord other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$ActionRecord;
  }

  @override
  void update(void updates(ActionRecordBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$ActionRecord build() {
    final _$result = _$v ??
        new _$ActionRecord._(
            actionName: actionName,
            dataString: dataString,
            description: description,
            protagonist: protagonist,
            sufferers: sufferers?.build(),
            time: time,
            wasAggressive: wasAggressive,
            wasFailure: wasFailure,
            wasProactive: wasProactive,
            wasSuccess: wasSuccess);
    replace(_$result);
    return _$result;
  }
}
