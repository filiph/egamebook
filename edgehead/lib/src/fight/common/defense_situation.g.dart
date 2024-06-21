// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'defense_situation.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<DefenseSituation> _$defenseSituationSerializer =
    new _$DefenseSituationSerializer();

class _$DefenseSituationSerializer
    implements StructuredSerializer<DefenseSituation> {
  @override
  final Iterable<Type> types = const [DefenseSituation, _$DefenseSituation];
  @override
  final String wireName = 'DefenseSituation';

  @override
  Iterable<Object?> serialize(Serializers serializers, DefenseSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'attacker',
      serializers.serialize(object.attacker,
          specifiedType: const FullType(int)),
      'builtEnemyTargetActionGenerators',
      serializers.serialize(object.builtEnemyTargetActionGenerators,
          specifiedType: const FullType(
              BuiltList, const [const FullType(EnemyTargetAction)])),
      'builtOtherActorActionGenerators',
      serializers.serialize(object.builtOtherActorActionGenerators,
          specifiedType: const FullType(
              BuiltList, const [const FullType(OtherActorAction)])),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'predeterminedResult',
      serializers.serialize(object.predeterminedResult,
          specifiedType: const FullType(Predetermination)),
      'target',
      serializers.serialize(object.target, specifiedType: const FullType(int)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  DefenseSituation deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new DefenseSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'attacker':
          result.attacker = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'builtEnemyTargetActionGenerators':
          result.builtEnemyTargetActionGenerators.replace(
              serializers.deserialize(value,
                  specifiedType: const FullType(BuiltList, const [
                    const FullType(EnemyTargetAction)
                  ]))! as BuiltList<Object?>);
          break;
        case 'builtOtherActorActionGenerators':
          result.builtOtherActorActionGenerators.replace(
              serializers.deserialize(value,
                      specifiedType: const FullType(
                          BuiltList, const [const FullType(OtherActorAction)]))!
                  as BuiltList<Object?>);
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'predeterminedResult':
          result.predeterminedResult = serializers.deserialize(value,
                  specifiedType: const FullType(Predetermination))!
              as Predetermination;
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

class _$DefenseSituation extends DefenseSituation {
  @override
  final int attacker;
  @override
  final BuiltList<EnemyTargetAction> builtEnemyTargetActionGenerators;
  @override
  final BuiltList<OtherActorAction> builtOtherActorActionGenerators;
  @override
  final int id;
  @override
  final String name;
  @override
  final Predetermination predeterminedResult;
  @override
  final int target;
  @override
  final int turn;

  factory _$DefenseSituation(
          [void Function(DefenseSituationBuilder)? updates]) =>
      (new DefenseSituationBuilder()..update(updates))._build();

  _$DefenseSituation._(
      {required this.attacker,
      required this.builtEnemyTargetActionGenerators,
      required this.builtOtherActorActionGenerators,
      required this.id,
      required this.name,
      required this.predeterminedResult,
      required this.target,
      required this.turn})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        attacker, r'DefenseSituation', 'attacker');
    BuiltValueNullFieldError.checkNotNull(builtEnemyTargetActionGenerators,
        r'DefenseSituation', 'builtEnemyTargetActionGenerators');
    BuiltValueNullFieldError.checkNotNull(builtOtherActorActionGenerators,
        r'DefenseSituation', 'builtOtherActorActionGenerators');
    BuiltValueNullFieldError.checkNotNull(id, r'DefenseSituation', 'id');
    BuiltValueNullFieldError.checkNotNull(name, r'DefenseSituation', 'name');
    BuiltValueNullFieldError.checkNotNull(
        predeterminedResult, r'DefenseSituation', 'predeterminedResult');
    BuiltValueNullFieldError.checkNotNull(
        target, r'DefenseSituation', 'target');
    BuiltValueNullFieldError.checkNotNull(turn, r'DefenseSituation', 'turn');
  }

  @override
  DefenseSituation rebuild(void Function(DefenseSituationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  DefenseSituationBuilder toBuilder() =>
      new DefenseSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is DefenseSituation &&
        attacker == other.attacker &&
        builtEnemyTargetActionGenerators ==
            other.builtEnemyTargetActionGenerators &&
        builtOtherActorActionGenerators ==
            other.builtOtherActorActionGenerators &&
        id == other.id &&
        name == other.name &&
        predeterminedResult == other.predeterminedResult &&
        target == other.target &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, attacker.hashCode);
    _$hash = $jc(_$hash, builtEnemyTargetActionGenerators.hashCode);
    _$hash = $jc(_$hash, builtOtherActorActionGenerators.hashCode);
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, predeterminedResult.hashCode);
    _$hash = $jc(_$hash, target.hashCode);
    _$hash = $jc(_$hash, turn.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'DefenseSituation')
          ..add('attacker', attacker)
          ..add('builtEnemyTargetActionGenerators',
              builtEnemyTargetActionGenerators)
          ..add('builtOtherActorActionGenerators',
              builtOtherActorActionGenerators)
          ..add('id', id)
          ..add('name', name)
          ..add('predeterminedResult', predeterminedResult)
          ..add('target', target)
          ..add('turn', turn))
        .toString();
  }
}

class DefenseSituationBuilder
    implements Builder<DefenseSituation, DefenseSituationBuilder> {
  _$DefenseSituation? _$v;

  int? _attacker;
  int? get attacker => _$this._attacker;
  set attacker(int? attacker) => _$this._attacker = attacker;

  ListBuilder<EnemyTargetAction>? _builtEnemyTargetActionGenerators;
  ListBuilder<EnemyTargetAction> get builtEnemyTargetActionGenerators =>
      _$this._builtEnemyTargetActionGenerators ??=
          new ListBuilder<EnemyTargetAction>();
  set builtEnemyTargetActionGenerators(
          ListBuilder<EnemyTargetAction>? builtEnemyTargetActionGenerators) =>
      _$this._builtEnemyTargetActionGenerators =
          builtEnemyTargetActionGenerators;

  ListBuilder<OtherActorAction>? _builtOtherActorActionGenerators;
  ListBuilder<OtherActorAction> get builtOtherActorActionGenerators =>
      _$this._builtOtherActorActionGenerators ??=
          new ListBuilder<OtherActorAction>();
  set builtOtherActorActionGenerators(
          ListBuilder<OtherActorAction>? builtOtherActorActionGenerators) =>
      _$this._builtOtherActorActionGenerators = builtOtherActorActionGenerators;

  int? _id;
  int? get id => _$this._id;
  set id(int? id) => _$this._id = id;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  Predetermination? _predeterminedResult;
  Predetermination? get predeterminedResult => _$this._predeterminedResult;
  set predeterminedResult(Predetermination? predeterminedResult) =>
      _$this._predeterminedResult = predeterminedResult;

  int? _target;
  int? get target => _$this._target;
  set target(int? target) => _$this._target = target;

  int? _turn;
  int? get turn => _$this._turn;
  set turn(int? turn) => _$this._turn = turn;

  DefenseSituationBuilder();

  DefenseSituationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _attacker = $v.attacker;
      _builtEnemyTargetActionGenerators =
          $v.builtEnemyTargetActionGenerators.toBuilder();
      _builtOtherActorActionGenerators =
          $v.builtOtherActorActionGenerators.toBuilder();
      _id = $v.id;
      _name = $v.name;
      _predeterminedResult = $v.predeterminedResult;
      _target = $v.target;
      _turn = $v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(DefenseSituation other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$DefenseSituation;
  }

  @override
  void update(void Function(DefenseSituationBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  DefenseSituation build() => _build();

  _$DefenseSituation _build() {
    _$DefenseSituation _$result;
    try {
      _$result = _$v ??
          new _$DefenseSituation._(
              attacker: BuiltValueNullFieldError.checkNotNull(
                  attacker, r'DefenseSituation', 'attacker'),
              builtEnemyTargetActionGenerators:
                  builtEnemyTargetActionGenerators.build(),
              builtOtherActorActionGenerators:
                  builtOtherActorActionGenerators.build(),
              id: BuiltValueNullFieldError.checkNotNull(
                  id, r'DefenseSituation', 'id'),
              name: BuiltValueNullFieldError.checkNotNull(
                  name, r'DefenseSituation', 'name'),
              predeterminedResult: BuiltValueNullFieldError.checkNotNull(
                  predeterminedResult,
                  r'DefenseSituation',
                  'predeterminedResult'),
              target: BuiltValueNullFieldError.checkNotNull(
                  target, r'DefenseSituation', 'target'),
              turn: BuiltValueNullFieldError.checkNotNull(
                  turn, r'DefenseSituation', 'turn'));
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'builtEnemyTargetActionGenerators';
        builtEnemyTargetActionGenerators.build();
        _$failedField = 'builtOtherActorActionGenerators';
        builtOtherActorActionGenerators.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'DefenseSituation', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
