// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.defense_situation;

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
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'builtActionGenerators',
      serializers.serialize(object.builtActionGenerators,
          specifiedType: const FullType(
              BuiltList, const [const FullType(EnemyTargetActionBuilder)])),
      'predeterminedResult',
      serializers.serialize(object.predeterminedResult,
          specifiedType: const FullType(Predetermination)),
      'attacker',
      serializers.serialize(object.attacker,
          specifiedType: const FullType(int)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'target',
      serializers.serialize(object.target, specifiedType: const FullType(int)),
      'time',
      serializers.serialize(object.time, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  DefenseSituation deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new DefenseSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'builtActionGenerators':
          result.builtActionGenerators.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltList, const [
                const FullType(EnemyTargetActionBuilder)
              ])) as BuiltList<EnemyTargetActionBuilder>);
          break;
        case 'predeterminedResult':
          result.predeterminedResult = serializers.deserialize(value,
                  specifiedType: const FullType(Predetermination))
              as Predetermination;
          break;
        case 'attacker':
          result.attacker = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
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
  final BuiltList<EnemyTargetActionBuilder> builtActionGenerators;
  @override
  final Predetermination predeterminedResult;
  @override
  final int attacker;
  @override
  final int id;
  @override
  final String name;
  @override
  final int target;
  @override
  final int time;

  factory _$DefenseSituation([void updates(DefenseSituationBuilder b)]) =>
      (new DefenseSituationBuilder()..update(updates)).build();

  _$DefenseSituation._(
      {this.builtActionGenerators,
      this.predeterminedResult,
      this.attacker,
      this.id,
      this.name,
      this.target,
      this.time})
      : super._() {
    if (builtActionGenerators == null)
      throw new ArgumentError.notNull('builtActionGenerators');
    if (predeterminedResult == null)
      throw new ArgumentError.notNull('predeterminedResult');
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (id == null) throw new ArgumentError.notNull('id');
    if (name == null) throw new ArgumentError.notNull('name');
    if (target == null) throw new ArgumentError.notNull('target');
    if (time == null) throw new ArgumentError.notNull('time');
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
    return builtActionGenerators == other.builtActionGenerators &&
        predeterminedResult == other.predeterminedResult &&
        attacker == other.attacker &&
        id == other.id &&
        name == other.name &&
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
                        $jc($jc(0, builtActionGenerators.hashCode),
                            predeterminedResult.hashCode),
                        attacker.hashCode),
                    id.hashCode),
                name.hashCode),
            target.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('DefenseSituation')
          ..add('builtActionGenerators', builtActionGenerators)
          ..add('predeterminedResult', predeterminedResult)
          ..add('attacker', attacker)
          ..add('id', id)
          ..add('name', name)
          ..add('target', target)
          ..add('time', time))
        .toString();
  }
}

class DefenseSituationBuilder
    implements Builder<DefenseSituation, DefenseSituationBuilder> {
  _$DefenseSituation _$v;

  ListBuilder<EnemyTargetActionBuilder> _builtActionGenerators;
  ListBuilder<EnemyTargetActionBuilder> get builtActionGenerators =>
      _$this._builtActionGenerators ??=
          new ListBuilder<EnemyTargetActionBuilder>();
  set builtActionGenerators(
          ListBuilder<EnemyTargetActionBuilder> builtActionGenerators) =>
      _$this._builtActionGenerators = builtActionGenerators;

  Predetermination _predeterminedResult;
  Predetermination get predeterminedResult => _$this._predeterminedResult;
  set predeterminedResult(Predetermination predeterminedResult) =>
      _$this._predeterminedResult = predeterminedResult;

  int _attacker;
  int get attacker => _$this._attacker;
  set attacker(int attacker) => _$this._attacker = attacker;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  int _target;
  int get target => _$this._target;
  set target(int target) => _$this._target = target;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  DefenseSituationBuilder();

  DefenseSituationBuilder get _$this {
    if (_$v != null) {
      _builtActionGenerators = _$v.builtActionGenerators?.toBuilder();
      _predeterminedResult = _$v.predeterminedResult;
      _attacker = _$v.attacker;
      _id = _$v.id;
      _name = _$v.name;
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
    final _$result = _$v ??
        new _$DefenseSituation._(
            builtActionGenerators: builtActionGenerators?.build(),
            predeterminedResult: predeterminedResult,
            attacker: attacker,
            id: id,
            name: name,
            target: target,
            time: time);
    replace(_$result);
    return _$result;
  }
}
