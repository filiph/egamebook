// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.counter_attack_situation;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<CounterAttackSituation> _$counterAttackSituationSerializer =
    new _$CounterAttackSituationSerializer();

class _$CounterAttackSituationSerializer
    implements StructuredSerializer<CounterAttackSituation> {
  @override
  final Iterable<Type> types = const [
    CounterAttackSituation,
    _$CounterAttackSituation
  ];
  @override
  final String wireName = 'CounterAttackSituation';

  @override
  Iterable serialize(Serializers serializers, CounterAttackSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'counterAttacker',
      serializers.serialize(object.counterAttacker,
          specifiedType: const FullType(int)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'target',
      serializers.serialize(object.target, specifiedType: const FullType(int)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  CounterAttackSituation deserialize(
      Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new CounterAttackSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'counterAttacker':
          result.counterAttacker = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'target':
          result.target = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'turn':
          result.turn = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
      }
    }

    return result.build();
  }
}

class _$CounterAttackSituation extends CounterAttackSituation {
  @override
  final int counterAttacker;
  @override
  final int id;
  @override
  final int target;
  @override
  final int turn;

  factory _$CounterAttackSituation(
          [void updates(CounterAttackSituationBuilder b)]) =>
      (new CounterAttackSituationBuilder()..update(updates)).build();

  _$CounterAttackSituation._(
      {this.counterAttacker, this.id, this.target, this.turn})
      : super._() {
    if (counterAttacker == null) {
      throw new BuiltValueNullFieldError(
          'CounterAttackSituation', 'counterAttacker');
    }
    if (id == null) {
      throw new BuiltValueNullFieldError('CounterAttackSituation', 'id');
    }
    if (target == null) {
      throw new BuiltValueNullFieldError('CounterAttackSituation', 'target');
    }
    if (turn == null) {
      throw new BuiltValueNullFieldError('CounterAttackSituation', 'turn');
    }
  }

  @override
  CounterAttackSituation rebuild(
          void updates(CounterAttackSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  CounterAttackSituationBuilder toBuilder() =>
      new CounterAttackSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is CounterAttackSituation &&
        counterAttacker == other.counterAttacker &&
        id == other.id &&
        target == other.target &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, counterAttacker.hashCode), id.hashCode),
            target.hashCode),
        turn.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('CounterAttackSituation')
          ..add('counterAttacker', counterAttacker)
          ..add('id', id)
          ..add('target', target)
          ..add('turn', turn))
        .toString();
  }
}

class CounterAttackSituationBuilder
    implements Builder<CounterAttackSituation, CounterAttackSituationBuilder> {
  _$CounterAttackSituation _$v;

  int _counterAttacker;
  int get counterAttacker => _$this._counterAttacker;
  set counterAttacker(int counterAttacker) =>
      _$this._counterAttacker = counterAttacker;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _target;
  int get target => _$this._target;
  set target(int target) => _$this._target = target;

  int _turn;
  int get turn => _$this._turn;
  set turn(int turn) => _$this._turn = turn;

  CounterAttackSituationBuilder();

  CounterAttackSituationBuilder get _$this {
    if (_$v != null) {
      _counterAttacker = _$v.counterAttacker;
      _id = _$v.id;
      _target = _$v.target;
      _turn = _$v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CounterAttackSituation other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$CounterAttackSituation;
  }

  @override
  void update(void updates(CounterAttackSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$CounterAttackSituation build() {
    final _$result = _$v ??
        new _$CounterAttackSituation._(
            counterAttacker: counterAttacker,
            id: id,
            target: target,
            turn: turn);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
