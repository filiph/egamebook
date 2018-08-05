// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.defense_situation;

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

Serializer<DefenseSituation> _$defenseSituationSerializer =
    new _$DefenseSituationSerializer();

class _$DefenseSituationSerializer
    implements StructuredSerializer<DefenseSituation> {
  @override
  final Iterable<Type> types = const [DefenseSituation, _$DefenseSituation];
  @override
  final String wireName = 'DefenseSituation';

  @override
  Iterable serialize(Serializers serializers, DefenseSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
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
      'time',
      serializers.serialize(object.time, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  DefenseSituation deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new DefenseSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'attacker':
          result.attacker = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'builtEnemyTargetActionGenerators':
          result.builtEnemyTargetActionGenerators.replace(
              serializers.deserialize(value,
                      specifiedType: const FullType(
                          BuiltList, const [const FullType(EnemyTargetAction)]))
                  as BuiltList);
          break;
        case 'builtOtherActorActionGenerators':
          result.builtOtherActorActionGenerators.replace(
              serializers.deserialize(value,
                      specifiedType: const FullType(
                          BuiltList, const [const FullType(OtherActorAction)]))
                  as BuiltList);
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'predeterminedResult':
          result.predeterminedResult = serializers.deserialize(value,
                  specifiedType: const FullType(Predetermination))
              as Predetermination;
          break;
        case 'target':
          result.target = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'time':
          result.time = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
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
  final int time;

  factory _$DefenseSituation([void updates(DefenseSituationBuilder b)]) =>
      (new DefenseSituationBuilder()..update(updates)).build();

  _$DefenseSituation._(
      {this.attacker,
      this.builtEnemyTargetActionGenerators,
      this.builtOtherActorActionGenerators,
      this.id,
      this.name,
      this.predeterminedResult,
      this.target,
      this.time})
      : super._() {
    if (attacker == null)
      throw new BuiltValueNullFieldError('DefenseSituation', 'attacker');
    if (builtEnemyTargetActionGenerators == null)
      throw new BuiltValueNullFieldError(
          'DefenseSituation', 'builtEnemyTargetActionGenerators');
    if (builtOtherActorActionGenerators == null)
      throw new BuiltValueNullFieldError(
          'DefenseSituation', 'builtOtherActorActionGenerators');
    if (id == null)
      throw new BuiltValueNullFieldError('DefenseSituation', 'id');
    if (name == null)
      throw new BuiltValueNullFieldError('DefenseSituation', 'name');
    if (predeterminedResult == null)
      throw new BuiltValueNullFieldError(
          'DefenseSituation', 'predeterminedResult');
    if (target == null)
      throw new BuiltValueNullFieldError('DefenseSituation', 'target');
    if (time == null)
      throw new BuiltValueNullFieldError('DefenseSituation', 'time');
  }

  @override
  DefenseSituation rebuild(void updates(DefenseSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  DefenseSituationBuilder toBuilder() =>
      new DefenseSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! DefenseSituation) return false;
    return attacker == other.attacker &&
        builtEnemyTargetActionGenerators ==
            other.builtEnemyTargetActionGenerators &&
        builtOtherActorActionGenerators ==
            other.builtOtherActorActionGenerators &&
        id == other.id &&
        name == other.name &&
        predeterminedResult == other.predeterminedResult &&
        target == other.target &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc(
                        $jc(
                            $jc($jc(0, attacker.hashCode),
                                builtEnemyTargetActionGenerators.hashCode),
                            builtOtherActorActionGenerators.hashCode),
                        id.hashCode),
                    name.hashCode),
                predeterminedResult.hashCode),
            target.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('DefenseSituation')
          ..add('attacker', attacker)
          ..add('builtEnemyTargetActionGenerators',
              builtEnemyTargetActionGenerators)
          ..add('builtOtherActorActionGenerators',
              builtOtherActorActionGenerators)
          ..add('id', id)
          ..add('name', name)
          ..add('predeterminedResult', predeterminedResult)
          ..add('target', target)
          ..add('time', time))
        .toString();
  }
}

class DefenseSituationBuilder
    implements Builder<DefenseSituation, DefenseSituationBuilder> {
  _$DefenseSituation _$v;

  int _attacker;
  int get attacker => _$this._attacker;
  set attacker(int attacker) => _$this._attacker = attacker;

  ListBuilder<EnemyTargetAction> _builtEnemyTargetActionGenerators;
  ListBuilder<EnemyTargetAction> get builtEnemyTargetActionGenerators =>
      _$this._builtEnemyTargetActionGenerators ??=
          new ListBuilder<EnemyTargetAction>();
  set builtEnemyTargetActionGenerators(
          ListBuilder<EnemyTargetAction> builtEnemyTargetActionGenerators) =>
      _$this._builtEnemyTargetActionGenerators =
          builtEnemyTargetActionGenerators;

  ListBuilder<OtherActorAction> _builtOtherActorActionGenerators;
  ListBuilder<OtherActorAction> get builtOtherActorActionGenerators =>
      _$this._builtOtherActorActionGenerators ??=
          new ListBuilder<OtherActorAction>();
  set builtOtherActorActionGenerators(
          ListBuilder<OtherActorAction> builtOtherActorActionGenerators) =>
      _$this._builtOtherActorActionGenerators = builtOtherActorActionGenerators;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  Predetermination _predeterminedResult;
  Predetermination get predeterminedResult => _$this._predeterminedResult;
  set predeterminedResult(Predetermination predeterminedResult) =>
      _$this._predeterminedResult = predeterminedResult;

  int _target;
  int get target => _$this._target;
  set target(int target) => _$this._target = target;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  DefenseSituationBuilder();

  DefenseSituationBuilder get _$this {
    if (_$v != null) {
      _attacker = _$v.attacker;
      _builtEnemyTargetActionGenerators =
          _$v.builtEnemyTargetActionGenerators?.toBuilder();
      _builtOtherActorActionGenerators =
          _$v.builtOtherActorActionGenerators?.toBuilder();
      _id = _$v.id;
      _name = _$v.name;
      _predeterminedResult = _$v.predeterminedResult;
      _target = _$v.target;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(DefenseSituation other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$DefenseSituation;
  }

  @override
  void update(void updates(DefenseSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$DefenseSituation build() {
    _$DefenseSituation _$result;
    try {
      _$result = _$v ??
          new _$DefenseSituation._(
              attacker: attacker,
              builtEnemyTargetActionGenerators:
                  builtEnemyTargetActionGenerators.build(),
              builtOtherActorActionGenerators:
                  builtOtherActorActionGenerators.build(),
              id: id,
              name: name,
              predeterminedResult: predeterminedResult,
              target: target,
              time: time);
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'builtEnemyTargetActionGenerators';
        builtEnemyTargetActionGenerators.build();
        _$failedField = 'builtOtherActorActionGenerators';
        builtOtherActorActionGenerators.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'DefenseSituation', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}
