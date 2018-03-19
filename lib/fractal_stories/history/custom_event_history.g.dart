// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.history.custom_event;

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

Serializer<CustomEvent> _$customEventSerializer = new _$CustomEventSerializer();
Serializer<CustomEventHistory> _$customEventHistorySerializer =
    new _$CustomEventHistorySerializer();

class _$CustomEventSerializer implements StructuredSerializer<CustomEvent> {
  @override
  final Iterable<Type> types = const [CustomEvent, _$CustomEvent];
  @override
  final String wireName = 'CustomEvent';

  @override
  Iterable serialize(Serializers serializers, CustomEvent object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'time',
      serializers.serialize(object.time,
          specifiedType: const FullType(DateTime)),
    ];
    if (object.data != null) {
      result
        ..add('data')
        ..add(serializers.serialize(object.data,
            specifiedType: const FullType(Object)));
    }

    return result;
  }

  @override
  CustomEvent deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new CustomEventBuilder();

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
        case 'data':
          result.data = serializers.deserialize(value,
              specifiedType: const FullType(Object));
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

class _$CustomEventHistorySerializer
    implements StructuredSerializer<CustomEventHistory> {
  @override
  final Iterable<Type> types = const [CustomEventHistory, _$CustomEventHistory];
  @override
  final String wireName = 'CustomEventHistory';

  @override
  Iterable serialize(Serializers serializers, CustomEventHistory object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'records',
      serializers.serialize(object.records,
          specifiedType: const FullType(BuiltListMultimap,
              const [const FullType(String), const FullType(CustomEvent)])),
    ];

    return result;
  }

  @override
  CustomEventHistory deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new CustomEventHistoryBuilder();

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
                const FullType(CustomEvent)
              ])) as BuiltListMultimap<String, CustomEvent>);
          break;
      }
    }

    return result.build();
  }
}

class _$CustomEvent extends CustomEvent {
  @override
  final String name;
  @override
  final Object data;
  @override
  final DateTime time;

  factory _$CustomEvent([void updates(CustomEventBuilder b)]) =>
      (new CustomEventBuilder()..update(updates)).build();

  _$CustomEvent._({this.name, this.data, this.time}) : super._() {
    if (name == null) throw new ArgumentError.notNull('name');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  CustomEvent rebuild(void updates(CustomEventBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  CustomEventBuilder toBuilder() => new CustomEventBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! CustomEvent) return false;
    return name == other.name && data == other.data && time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc($jc($jc(0, name.hashCode), data.hashCode), time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('CustomEvent')
          ..add('name', name)
          ..add('data', data)
          ..add('time', time))
        .toString();
  }
}

class CustomEventBuilder implements Builder<CustomEvent, CustomEventBuilder> {
  _$CustomEvent _$v;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  Object _data;
  Object get data => _$this._data;
  set data(Object data) => _$this._data = data;

  DateTime _time;
  DateTime get time => _$this._time;
  set time(DateTime time) => _$this._time = time;

  CustomEventBuilder();

  CustomEventBuilder get _$this {
    if (_$v != null) {
      _name = _$v.name;
      _data = _$v.data;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CustomEvent other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$CustomEvent;
  }

  @override
  void update(void updates(CustomEventBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$CustomEvent build() {
    final _$result =
        _$v ?? new _$CustomEvent._(name: name, data: data, time: time);
    replace(_$result);
    return _$result;
  }
}

class _$CustomEventHistory extends CustomEventHistory {
  @override
  final BuiltListMultimap<String, CustomEvent> records;

  factory _$CustomEventHistory([void updates(CustomEventHistoryBuilder b)]) =>
      (new CustomEventHistoryBuilder()..update(updates)).build();

  _$CustomEventHistory._({this.records}) : super._() {
    if (records == null) throw new ArgumentError.notNull('records');
  }

  @override
  CustomEventHistory rebuild(void updates(CustomEventHistoryBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  CustomEventHistoryBuilder toBuilder() =>
      new CustomEventHistoryBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! CustomEventHistory) return false;
    return records == other.records;
  }

  @override
  int get hashCode {
    return $jf($jc(0, records.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('CustomEventHistory')
          ..add('records', records))
        .toString();
  }
}

class CustomEventHistoryBuilder
    implements Builder<CustomEventHistory, CustomEventHistoryBuilder> {
  _$CustomEventHistory _$v;

  ListMultimapBuilder<String, CustomEvent> _records;
  ListMultimapBuilder<String, CustomEvent> get records =>
      _$this._records ??= new ListMultimapBuilder<String, CustomEvent>();
  set records(ListMultimapBuilder<String, CustomEvent> records) =>
      _$this._records = records;

  CustomEventHistoryBuilder();

  CustomEventHistoryBuilder get _$this {
    if (_$v != null) {
      _records = _$v.records?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CustomEventHistory other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$CustomEventHistory;
  }

  @override
  void update(void updates(CustomEventHistoryBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$CustomEventHistory build() {
    final _$result =
        _$v ?? new _$CustomEventHistory._(records: records?.build());
    replace(_$result);
    return _$result;
  }
}
