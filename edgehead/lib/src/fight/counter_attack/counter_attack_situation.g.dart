// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'counter_attack_situation.dart';

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
  Iterable<Object?> serialize(
      Serializers serializers, CounterAttackSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
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
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new CounterAttackSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'counterAttacker':
          result.counterAttacker = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'target':
          result.target = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'turn':
          result.turn = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
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
          [void Function(CounterAttackSituationBuilder)? updates]) =>
      (new CounterAttackSituationBuilder()..update(updates))._build();

  _$CounterAttackSituation._(
      {required this.counterAttacker,
      required this.id,
      required this.target,
      required this.turn})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        counterAttacker, r'CounterAttackSituation', 'counterAttacker');
    BuiltValueNullFieldError.checkNotNull(id, r'CounterAttackSituation', 'id');
    BuiltValueNullFieldError.checkNotNull(
        target, r'CounterAttackSituation', 'target');
    BuiltValueNullFieldError.checkNotNull(
        turn, r'CounterAttackSituation', 'turn');
  }

  @override
  CounterAttackSituation rebuild(
          void Function(CounterAttackSituationBuilder) updates) =>
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
    var _$hash = 0;
    _$hash = $jc(_$hash, counterAttacker.hashCode);
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, target.hashCode);
    _$hash = $jc(_$hash, turn.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'CounterAttackSituation')
          ..add('counterAttacker', counterAttacker)
          ..add('id', id)
          ..add('target', target)
          ..add('turn', turn))
        .toString();
  }
}

class CounterAttackSituationBuilder
    implements Builder<CounterAttackSituation, CounterAttackSituationBuilder> {
  _$CounterAttackSituation? _$v;

  int? _counterAttacker;
  int? get counterAttacker => _$this._counterAttacker;
  set counterAttacker(int? counterAttacker) =>
      _$this._counterAttacker = counterAttacker;

  int? _id;
  int? get id => _$this._id;
  set id(int? id) => _$this._id = id;

  int? _target;
  int? get target => _$this._target;
  set target(int? target) => _$this._target = target;

  int? _turn;
  int? get turn => _$this._turn;
  set turn(int? turn) => _$this._turn = turn;

  CounterAttackSituationBuilder();

  CounterAttackSituationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _counterAttacker = $v.counterAttacker;
      _id = $v.id;
      _target = $v.target;
      _turn = $v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CounterAttackSituation other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$CounterAttackSituation;
  }

  @override
  void update(void Function(CounterAttackSituationBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  CounterAttackSituation build() => _build();

  _$CounterAttackSituation _build() {
    final _$result = _$v ??
        new _$CounterAttackSituation._(
            counterAttacker: BuiltValueNullFieldError.checkNotNull(
                counterAttacker, r'CounterAttackSituation', 'counterAttacker'),
            id: BuiltValueNullFieldError.checkNotNull(
                id, r'CounterAttackSituation', 'id'),
            target: BuiltValueNullFieldError.checkNotNull(
                target, r'CounterAttackSituation', 'target'),
            turn: BuiltValueNullFieldError.checkNotNull(
                turn, r'CounterAttackSituation', 'turn'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
