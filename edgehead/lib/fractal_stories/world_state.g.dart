// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.world_state;

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
  Iterable<Object> serialize(Serializers serializers, WorldState object,
      {FullType specifiedType = FullType.unspecified}) {
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
    if (object.director != null) {
      result
        ..add('director')
        ..add(serializers.serialize(object.director,
            specifiedType: const FullType(Actor)));
    }
    if (object.global != null) {
      result
        ..add('global')
        ..add(serializers.serialize(object.global,
            specifiedType: const FullType(WorldStateFlags)));
    }
    return result;
  }

  @override
  WorldState deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
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
              as BuiltSet<dynamic>);
          break;
        case 'customHistory':
          result.customHistory.replace(serializers.deserialize(value,
                  specifiedType: const FullType(CustomEventHistory))
              as CustomEventHistory);
          break;
        case 'director':
          result.director.replace(serializers.deserialize(value,
              specifiedType: const FullType(Actor)) as Actor);
          break;
        case 'global':
          result.global = serializers.deserialize(value,
                  specifiedType: const FullType(WorldStateFlags))
              as WorldStateFlags;
          break;
        case 'ruleHistory':
          result.ruleHistory.replace(serializers.deserialize(value,
              specifiedType: const FullType(RuleHistory)) as RuleHistory);
          break;
        case 'situations':
          result.situations.replace(serializers.deserialize(value,
                  specifiedType: const FullType(
                      BuiltList, const [const FullType(Situation)]))
              as BuiltList<dynamic>);
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
  final Actor director;
  @override
  final WorldStateFlags global;
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

  factory _$WorldState([void Function(WorldStateBuilder) updates]) =>
      (new WorldStateBuilder()..update(updates)).build() as _$WorldState;

  _$WorldState._(
      {this.actionHistory,
      this.actors,
      this.customHistory,
      this.director,
      this.global,
      this.ruleHistory,
      this.situations,
      this.statefulRandomState,
      this.time,
      this.visitHistory})
      : super._() {
    if (actionHistory == null) {
      throw new BuiltValueNullFieldError('WorldState', 'actionHistory');
    }
    if (actors == null) {
      throw new BuiltValueNullFieldError('WorldState', 'actors');
    }
    if (customHistory == null) {
      throw new BuiltValueNullFieldError('WorldState', 'customHistory');
    }
    if (ruleHistory == null) {
      throw new BuiltValueNullFieldError('WorldState', 'ruleHistory');
    }
    if (situations == null) {
      throw new BuiltValueNullFieldError('WorldState', 'situations');
    }
    if (statefulRandomState == null) {
      throw new BuiltValueNullFieldError('WorldState', 'statefulRandomState');
    }
    if (time == null) {
      throw new BuiltValueNullFieldError('WorldState', 'time');
    }
    if (visitHistory == null) {
      throw new BuiltValueNullFieldError('WorldState', 'visitHistory');
    }
  }

  @override
  WorldState rebuild(void Function(WorldStateBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  _$WorldStateBuilder toBuilder() => new _$WorldStateBuilder()..replace(this);

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
                                $jc(
                                    $jc($jc(0, actionHistory.hashCode),
                                        actors.hashCode),
                                    customHistory.hashCode),
                                director.hashCode),
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
  ActorBuilder get director {
    _$this;
    return super.director ??= new ActorBuilder();
  }

  @override
  set director(ActorBuilder director) {
    _$this;
    super.director = director;
  }

  @override
  WorldStateFlags get global {
    _$this;
    return super.global;
  }

  @override
  set global(WorldStateFlags global) {
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
      super.director = _$v.director?.toBuilder();
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
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$WorldState;
  }

  @override
  void update(void Function(WorldStateBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$WorldState build() {
    _$WorldState _$result;
    try {
      _$result = _$v ??
          new _$WorldState._(
              actionHistory: actionHistory.build(),
              actors: actors.build(),
              customHistory: customHistory.build(),
              director: super.director?.build(),
              global: global,
              ruleHistory: ruleHistory.build(),
              situations: situations.build(),
              statefulRandomState: statefulRandomState,
              time: time,
              visitHistory: visitHistory.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'actionHistory';
        actionHistory.build();
        _$failedField = 'actors';
        actors.build();
        _$failedField = 'customHistory';
        customHistory.build();
        _$failedField = 'director';
        super.director?.build();

        _$failedField = 'ruleHistory';
        ruleHistory.build();
        _$failedField = 'situations';
        situations.build();

        _$failedField = 'visitHistory';
        visitHistory.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'WorldState', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
