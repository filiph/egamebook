// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.world_state;

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

Serializer<WorldState> _$worldStateSerializer = new _$WorldStateSerializer();

class _$WorldStateSerializer implements StructuredSerializer<WorldState> {
  @override
  final Iterable<Type> types = const [WorldState, _$WorldState];
  @override
  final String wireName = 'WorldState';

  @override
  Iterable serialize(Serializers serializers, WorldState object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'actionHistory',
      serializers.serialize(object.actionHistory,
          specifiedType: const FullType(ActionHistory)),
      'actors',
      serializers.serialize(object.actors,
          specifiedType:
              const FullType(BuiltSet, const [const FullType(Actor)])),
      'customHistory',
      serializers.serialize(object.customHistory,
          specifiedType: const FullType(CustomEventHistory)),
      'global',
      serializers.serialize(object.global,
          specifiedType: const FullType(Object)),
      'ruleHistory',
      serializers.serialize(object.ruleHistory,
          specifiedType: const FullType(RuleHistory)),
      'situations',
      serializers.serialize(object.situations,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Situation)])),
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

    return result;
  }

  @override
  WorldState deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new WorldStateBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'actionHistory':
          result.actionHistory.replace(serializers.deserialize(value,
              specifiedType: const FullType(ActionHistory)) as ActionHistory);
          break;
        case 'actors':
          result.actors.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltSet, const [const FullType(Actor)]))
              as BuiltSet<Actor>);
          break;
        case 'customHistory':
          result.customHistory.replace(serializers.deserialize(value,
                  specifiedType: const FullType(CustomEventHistory))
              as CustomEventHistory);
          break;
        case 'global':
          result.global = serializers.deserialize(value,
              specifiedType: const FullType(Object));
          break;
        case 'ruleHistory':
          result.ruleHistory.replace(serializers.deserialize(value,
              specifiedType: const FullType(RuleHistory)) as RuleHistory);
          break;
        case 'situations':
          result.situations.replace(serializers.deserialize(value,
                  specifiedType: const FullType(
                      BuiltList, const [const FullType(Situation)]))
              as BuiltList<Situation>);
          break;
        case 'statefulRandomState':
          result.statefulRandomState = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'time':
          result.time = serializers.deserialize(value,
              specifiedType: const FullType(DateTime)) as DateTime;
          break;
        case 'visitHistory':
          result.visitHistory.replace(serializers.deserialize(value,
              specifiedType: const FullType(VisitHistory)) as VisitHistory);
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
  final BuiltSet<Actor> actors;
  @override
  final CustomEventHistory customHistory;
  @override
  final Object global;
  @override
  final RuleHistory ruleHistory;
  @override
  final BuiltList<Situation> situations;
  @override
  final int statefulRandomState;
  @override
  final DateTime time;
  @override
  final VisitHistory visitHistory;

  factory _$WorldState([void updates(WorldStateBuilder b)]) =>
      (new WorldStateBuilder()..update(updates)).build() as _$WorldState;

  _$WorldState._(
      {this.actionHistory,
      this.actors,
      this.customHistory,
      this.global,
      this.ruleHistory,
      this.situations,
      this.statefulRandomState,
      this.time,
      this.visitHistory})
      : super._() {
    if (actionHistory == null) throw new ArgumentError.notNull('actionHistory');
    if (actors == null) throw new ArgumentError.notNull('actors');
    if (customHistory == null) throw new ArgumentError.notNull('customHistory');
    if (global == null) throw new ArgumentError.notNull('global');
    if (ruleHistory == null) throw new ArgumentError.notNull('ruleHistory');
    if (situations == null) throw new ArgumentError.notNull('situations');
    if (statefulRandomState == null)
      throw new ArgumentError.notNull('statefulRandomState');
    if (time == null) throw new ArgumentError.notNull('time');
    if (visitHistory == null) throw new ArgumentError.notNull('visitHistory');
  }

  @override
  WorldState rebuild(void updates(WorldStateBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$WorldStateBuilder toBuilder() => new _$WorldStateBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! WorldState) return false;
    return actionHistory == other.actionHistory &&
        actors == other.actors &&
        customHistory == other.customHistory &&
        global == other.global &&
        ruleHistory == other.ruleHistory &&
        situations == other.situations &&
        statefulRandomState == other.statefulRandomState &&
        time == other.time &&
        visitHistory == other.visitHistory;
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
                                $jc($jc(0, actionHistory.hashCode),
                                    actors.hashCode),
                                customHistory.hashCode),
                            global.hashCode),
                        ruleHistory.hashCode),
                    situations.hashCode),
                statefulRandomState.hashCode),
            time.hashCode),
        visitHistory.hashCode));
  }
}

class _$WorldStateBuilder extends WorldStateBuilder {
  _$WorldState _$v;

  @override
  ActionHistoryBuilder get actionHistory {
    _$this;
    return super.actionHistory ??= new ActionHistoryBuilder();
  }

  @override
  set actionHistory(ActionHistoryBuilder actionHistory) {
    _$this;
    super.actionHistory = actionHistory;
  }

  @override
  SetBuilder<Actor> get actors {
    _$this;
    return super.actors ??= new SetBuilder<Actor>();
  }

  @override
  set actors(SetBuilder<Actor> actors) {
    _$this;
    super.actors = actors;
  }

  @override
  CustomEventHistoryBuilder get customHistory {
    _$this;
    return super.customHistory ??= new CustomEventHistoryBuilder();
  }

  @override
  set customHistory(CustomEventHistoryBuilder customHistory) {
    _$this;
    super.customHistory = customHistory;
  }

  @override
  Object get global {
    _$this;
    return super.global;
  }

  @override
  set global(Object global) {
    _$this;
    super.global = global;
  }

  @override
  RuleHistoryBuilder get ruleHistory {
    _$this;
    return super.ruleHistory ??= new RuleHistoryBuilder();
  }

  @override
  set ruleHistory(RuleHistoryBuilder ruleHistory) {
    _$this;
    super.ruleHistory = ruleHistory;
  }

  @override
  ListBuilder<Situation> get situations {
    _$this;
    return super.situations ??= new ListBuilder<Situation>();
  }

  @override
  set situations(ListBuilder<Situation> situations) {
    _$this;
    super.situations = situations;
  }

  @override
  int get statefulRandomState {
    _$this;
    return super.statefulRandomState;
  }

  @override
  set statefulRandomState(int statefulRandomState) {
    _$this;
    super.statefulRandomState = statefulRandomState;
  }

  @override
  DateTime get time {
    _$this;
    return super.time;
  }

  @override
  set time(DateTime time) {
    _$this;
    super.time = time;
  }

  @override
  VisitHistoryBuilder get visitHistory {
    _$this;
    return super.visitHistory ??= new VisitHistoryBuilder();
  }

  @override
  set visitHistory(VisitHistoryBuilder visitHistory) {
    _$this;
    super.visitHistory = visitHistory;
  }

  _$WorldStateBuilder() : super._();

  WorldStateBuilder get _$this {
    if (_$v != null) {
      super.actionHistory = _$v.actionHistory?.toBuilder();
      super.actors = _$v.actors?.toBuilder();
      super.customHistory = _$v.customHistory?.toBuilder();
      super.global = _$v.global;
      super.ruleHistory = _$v.ruleHistory?.toBuilder();
      super.situations = _$v.situations?.toBuilder();
      super.statefulRandomState = _$v.statefulRandomState;
      super.time = _$v.time;
      super.visitHistory = _$v.visitHistory?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(WorldState other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$WorldState;
  }

  @override
  void update(void updates(WorldStateBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$WorldState build() {
    final _$result = _$v ??
        new _$WorldState._(
            actionHistory: actionHistory?.build(),
            actors: actors?.build(),
            customHistory: customHistory?.build(),
            global: global,
            ruleHistory: ruleHistory?.build(),
            situations: situations?.build(),
            statefulRandomState: statefulRandomState,
            time: time,
            visitHistory: visitHistory?.build());
    replace(_$result);
    return _$result;
  }
}
