// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.strike_down_situation;

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

Serializer<StrikeDownSituation> _$strikeDownSituationSerializer =
    new _$StrikeDownSituationSerializer();

class _$StrikeDownSituationSerializer
    implements StructuredSerializer<StrikeDownSituation> {
  @override
  final Iterable<Type> types = const [
    StrikeDownSituation,
    _$StrikeDownSituation
  ];
  @override
  final String wireName = 'StrikeDownSituation';

  @override
  Iterable serialize(Serializers serializers, StrikeDownSituation object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'attacker',
      serializers.serialize(object.attacker,
          specifiedType: const FullType(int)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'targetOnGround',
      serializers.serialize(object.targetOnGround,
          specifiedType: const FullType(int)),
      'time',
      serializers.serialize(object.time, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  StrikeDownSituation deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new StrikeDownSituationBuilder();

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
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'targetOnGround':
          result.targetOnGround = serializers.deserialize(value,
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

class _$StrikeDownSituation extends StrikeDownSituation {
  @override
  final int attacker;
  @override
  final int id;
  @override
  final int targetOnGround;
  @override
  final int time;

  factory _$StrikeDownSituation([void updates(StrikeDownSituationBuilder b)]) =>
      (new StrikeDownSituationBuilder()..update(updates)).build();

  _$StrikeDownSituation._(
      {this.attacker, this.id, this.targetOnGround, this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (id == null) throw new ArgumentError.notNull('id');
    if (targetOnGround == null)
      throw new ArgumentError.notNull('targetOnGround');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  StrikeDownSituation rebuild(void updates(StrikeDownSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  StrikeDownSituationBuilder toBuilder() =>
      new StrikeDownSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! StrikeDownSituation) return false;
    return attacker == other.attacker &&
        id == other.id &&
        targetOnGround == other.targetOnGround &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, attacker.hashCode), id.hashCode),
            targetOnGround.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('StrikeDownSituation')
          ..add('attacker', attacker)
          ..add('id', id)
          ..add('targetOnGround', targetOnGround)
          ..add('time', time))
        .toString();
  }
}

class StrikeDownSituationBuilder
    implements Builder<StrikeDownSituation, StrikeDownSituationBuilder> {
  _$StrikeDownSituation _$v;

  int _attacker;
  int get attacker => _$this._attacker;
  set attacker(int attacker) => _$this._attacker = attacker;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _targetOnGround;
  int get targetOnGround => _$this._targetOnGround;
  set targetOnGround(int targetOnGround) =>
      _$this._targetOnGround = targetOnGround;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  StrikeDownSituationBuilder();

  StrikeDownSituationBuilder get _$this {
    if (_$v != null) {
      _attacker = _$v.attacker;
      _id = _$v.id;
      _targetOnGround = _$v.targetOnGround;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(StrikeDownSituation other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$StrikeDownSituation;
  }

  @override
  void update(void updates(StrikeDownSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$StrikeDownSituation build() {
    final _$result = _$v ??
        new _$StrikeDownSituation._(
            attacker: attacker,
            id: id,
            targetOnGround: targetOnGround,
            time: time);
    replace(_$result);
    return _$result;
  }
}
