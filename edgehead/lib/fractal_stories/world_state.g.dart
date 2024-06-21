// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'world_state.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<WorldState> _$worldStateSerializer = new _$WorldStateSerializer();

class _$WorldStateSerializer implements StructuredSerializer<WorldState> {
  @override
  final Iterable<Type> types = const [WorldState, _$WorldState];
  @override
  final String wireName = 'WorldState';

  @override
  Iterable<Object?> serialize(Serializers serializers, WorldState object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'actionHistory',
      serializers.serialize(object.actionHistory,
          specifiedType: const FullType(ActionHistory)),
      'actors',
      serializers.serialize(object.actors,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Actor)])),
      'customHistory',
      serializers.serialize(object.customHistory,
          specifiedType: const FullType(CustomEventHistory)),
      'ruleHistory',
      serializers.serialize(object.ruleHistory,
          specifiedType: const FullType(RuleHistory)),
      'situations',
      serializers.serialize(object.situations,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Situation)])),
      'slayHistory',
      serializers.serialize(object.slayHistory,
          specifiedType: const FullType(SlayHistory)),
      'statefulRandomState',
      serializers.serialize(object.statefulRandomState,
          specifiedType: const FullType(int)),
      'time',
      serializers.serialize(object.time,
          specifiedType: const FullType(DateTime)),
      'visitHistory',
      serializers.serialize(object.visitHistory,
          specifiedType: const FullType(VisitHistory)),
    ];
    Object? value;
    value = object.director;
    if (value != null) {
      result
        ..add('director')
        ..add(
            serializers.serialize(value, specifiedType: const FullType(Actor)));
    }
    value = object.global;
    if (value != null) {
      result
        ..add('global')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(WorldStateFlags)));
    }
    return result;
  }

  @override
  WorldState deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new WorldStateBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'actionHistory':
          result.actionHistory.replace(serializers.deserialize(value,
              specifiedType: const FullType(ActionHistory))! as ActionHistory);
          break;
        case 'actors':
          result.actors.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Actor)]))!
              as BuiltList<Object?>);
          break;
        case 'customHistory':
          result.customHistory.replace(serializers.deserialize(value,
                  specifiedType: const FullType(CustomEventHistory))!
              as CustomEventHistory);
          break;
        case 'director':
          result.director.replace(serializers.deserialize(value,
              specifiedType: const FullType(Actor))! as Actor);
          break;
        case 'global':
          result.global = serializers.deserialize(value,
                  specifiedType: const FullType(WorldStateFlags))
              as WorldStateFlags?;
          break;
        case 'ruleHistory':
          result.ruleHistory.replace(serializers.deserialize(value,
              specifiedType: const FullType(RuleHistory))! as RuleHistory);
          break;
        case 'situations':
          result.situations.replace(serializers.deserialize(value,
                  specifiedType: const FullType(
                      BuiltList, const [const FullType(Situation)]))!
              as BuiltList<Object?>);
          break;
        case 'slayHistory':
          result.slayHistory.replace(serializers.deserialize(value,
              specifiedType: const FullType(SlayHistory))! as SlayHistory);
          break;
        case 'statefulRandomState':
          result.statefulRandomState = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'time':
          result.time = serializers.deserialize(value,
              specifiedType: const FullType(DateTime))! as DateTime;
          break;
        case 'visitHistory':
          result.visitHistory.replace(serializers.deserialize(value,
              specifiedType: const FullType(VisitHistory))! as VisitHistory);
          break;
      }
    }

    return result.build();
  }
}

class _$WorldState extends WorldState {
  @override
  final ActionHistory actionHistory;
  @override
  final BuiltList<Actor> actors;
  @override
  final CustomEventHistory customHistory;
  @override
  final Actor? director;
  @override
  final WorldStateFlags? global;
  @override
  final RuleHistory ruleHistory;
  @override
  final BuiltList<Situation> situations;
  @override
  final SlayHistory slayHistory;
  @override
  final int statefulRandomState;
  @override
  final DateTime time;
  @override
  final VisitHistory visitHistory;

  factory _$WorldState([void Function(WorldStateBuilder)? updates]) =>
      (new WorldStateBuilder()..update(updates))._build();

  _$WorldState._(
      {required this.actionHistory,
      required this.actors,
      required this.customHistory,
      this.director,
      this.global,
      required this.ruleHistory,
      required this.situations,
      required this.slayHistory,
      required this.statefulRandomState,
      required this.time,
      required this.visitHistory})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        actionHistory, r'WorldState', 'actionHistory');
    BuiltValueNullFieldError.checkNotNull(actors, r'WorldState', 'actors');
    BuiltValueNullFieldError.checkNotNull(
        customHistory, r'WorldState', 'customHistory');
    BuiltValueNullFieldError.checkNotNull(
        ruleHistory, r'WorldState', 'ruleHistory');
    BuiltValueNullFieldError.checkNotNull(
        situations, r'WorldState', 'situations');
    BuiltValueNullFieldError.checkNotNull(
        slayHistory, r'WorldState', 'slayHistory');
    BuiltValueNullFieldError.checkNotNull(
        statefulRandomState, r'WorldState', 'statefulRandomState');
    BuiltValueNullFieldError.checkNotNull(time, r'WorldState', 'time');
    BuiltValueNullFieldError.checkNotNull(
        visitHistory, r'WorldState', 'visitHistory');
  }

  @override
  WorldState rebuild(void Function(WorldStateBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  WorldStateBuilder toBuilder() => new WorldStateBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is WorldState &&
        actionHistory == other.actionHistory &&
        actors == other.actors &&
        customHistory == other.customHistory &&
        director == other.director &&
        global == other.global &&
        ruleHistory == other.ruleHistory &&
        situations == other.situations &&
        slayHistory == other.slayHistory &&
        statefulRandomState == other.statefulRandomState &&
        time == other.time &&
        visitHistory == other.visitHistory;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, actionHistory.hashCode);
    _$hash = $jc(_$hash, actors.hashCode);
    _$hash = $jc(_$hash, customHistory.hashCode);
    _$hash = $jc(_$hash, director.hashCode);
    _$hash = $jc(_$hash, global.hashCode);
    _$hash = $jc(_$hash, ruleHistory.hashCode);
    _$hash = $jc(_$hash, situations.hashCode);
    _$hash = $jc(_$hash, slayHistory.hashCode);
    _$hash = $jc(_$hash, statefulRandomState.hashCode);
    _$hash = $jc(_$hash, time.hashCode);
    _$hash = $jc(_$hash, visitHistory.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }
}

class WorldStateBuilder implements Builder<WorldState, WorldStateBuilder> {
  _$WorldState? _$v;

  ActionHistoryBuilder? _actionHistory;
  ActionHistoryBuilder get actionHistory =>
      _$this._actionHistory ??= new ActionHistoryBuilder();
  set actionHistory(ActionHistoryBuilder? actionHistory) =>
      _$this._actionHistory = actionHistory;

  ListBuilder<Actor>? _actors;
  ListBuilder<Actor> get actors => _$this._actors ??= new ListBuilder<Actor>();
  set actors(ListBuilder<Actor>? actors) => _$this._actors = actors;

  CustomEventHistoryBuilder? _customHistory;
  CustomEventHistoryBuilder get customHistory =>
      _$this._customHistory ??= new CustomEventHistoryBuilder();
  set customHistory(CustomEventHistoryBuilder? customHistory) =>
      _$this._customHistory = customHistory;

  ActorBuilder? _director;
  ActorBuilder get director => _$this._director ??= new ActorBuilder();
  set director(ActorBuilder? director) => _$this._director = director;

  WorldStateFlags? _global;
  WorldStateFlags? get global => _$this._global;
  set global(WorldStateFlags? global) => _$this._global = global;

  RuleHistoryBuilder? _ruleHistory;
  RuleHistoryBuilder get ruleHistory =>
      _$this._ruleHistory ??= new RuleHistoryBuilder();
  set ruleHistory(RuleHistoryBuilder? ruleHistory) =>
      _$this._ruleHistory = ruleHistory;

  ListBuilder<Situation>? _situations;
  ListBuilder<Situation> get situations =>
      _$this._situations ??= new ListBuilder<Situation>();
  set situations(ListBuilder<Situation>? situations) =>
      _$this._situations = situations;

  SlayHistoryBuilder? _slayHistory;
  SlayHistoryBuilder get slayHistory =>
      _$this._slayHistory ??= new SlayHistoryBuilder();
  set slayHistory(SlayHistoryBuilder? slayHistory) =>
      _$this._slayHistory = slayHistory;

  int? _statefulRandomState;
  int? get statefulRandomState => _$this._statefulRandomState;
  set statefulRandomState(int? statefulRandomState) =>
      _$this._statefulRandomState = statefulRandomState;

  DateTime? _time;
  DateTime? get time => _$this._time;
  set time(DateTime? time) => _$this._time = time;

  VisitHistoryBuilder? _visitHistory;
  VisitHistoryBuilder get visitHistory =>
      _$this._visitHistory ??= new VisitHistoryBuilder();
  set visitHistory(VisitHistoryBuilder? visitHistory) =>
      _$this._visitHistory = visitHistory;

  WorldStateBuilder() {
    WorldState._initializeValues(this);
  }

  WorldStateBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _actionHistory = $v.actionHistory.toBuilder();
      _actors = $v.actors.toBuilder();
      _customHistory = $v.customHistory.toBuilder();
      _director = $v.director?.toBuilder();
      _global = $v.global;
      _ruleHistory = $v.ruleHistory.toBuilder();
      _situations = $v.situations.toBuilder();
      _slayHistory = $v.slayHistory.toBuilder();
      _statefulRandomState = $v.statefulRandomState;
      _time = $v.time;
      _visitHistory = $v.visitHistory.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(WorldState other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$WorldState;
  }

  @override
  void update(void Function(WorldStateBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  WorldState build() => _build();

  _$WorldState _build() {
    _$WorldState _$result;
    try {
      _$result = _$v ??
          new _$WorldState._(
              actionHistory: actionHistory.build(),
              actors: actors.build(),
              customHistory: customHistory.build(),
              director: _director?.build(),
              global: global,
              ruleHistory: ruleHistory.build(),
              situations: situations.build(),
              slayHistory: slayHistory.build(),
              statefulRandomState: BuiltValueNullFieldError.checkNotNull(
                  statefulRandomState, r'WorldState', 'statefulRandomState'),
              time: BuiltValueNullFieldError.checkNotNull(
                  time, r'WorldState', 'time'),
              visitHistory: visitHistory.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'actionHistory';
        actionHistory.build();
        _$failedField = 'actors';
        actors.build();
        _$failedField = 'customHistory';
        customHistory.build();
        _$failedField = 'director';
        _director?.build();

        _$failedField = 'ruleHistory';
        ruleHistory.build();
        _$failedField = 'situations';
        situations.build();
        _$failedField = 'slayHistory';
        slayHistory.build();

        _$failedField = 'visitHistory';
        visitHistory.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'WorldState', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
