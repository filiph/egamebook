// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.leap_situation;

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

Serializer<LeapSituation> _$leapSituationSerializer =
    new _$LeapSituationSerializer();

class _$LeapSituationSerializer implements StructuredSerializer<LeapSituation> {
  @override
  final Iterable<Type> types = const [LeapSituation, _$LeapSituation];
  @override
  final String wireName = 'LeapSituation';

  @override
  Iterable serialize(Serializers serializers, LeapSituation object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'attacker',
      serializers.serialize(object.attacker,
          specifiedType: const FullType(int)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'target',
      serializers.serialize(object.target, specifiedType: const FullType(int)),
      'time',
      serializers.serialize(object.time, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  LeapSituation deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new LeapSituationBuilder();

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

class _$LeapSituation extends LeapSituation {
  @override
  final int attacker;
  @override
  final int id;
  @override
  final int target;
  @override
  final int time;

  factory _$LeapSituation([void updates(LeapSituationBuilder b)]) =>
      (new LeapSituationBuilder()..update(updates)).build();

  _$LeapSituation._({this.attacker, this.id, this.target, this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (id == null) throw new ArgumentError.notNull('id');
    if (target == null) throw new ArgumentError.notNull('target');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  LeapSituation rebuild(void updates(LeapSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  LeapSituationBuilder toBuilder() => new LeapSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! LeapSituation) return false;
    return attacker == other.attacker &&
        id == other.id &&
        target == other.target &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, attacker.hashCode), id.hashCode), target.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('LeapSituation')
          ..add('attacker', attacker)
          ..add('id', id)
          ..add('target', target)
          ..add('time', time))
        .toString();
  }
}

class LeapSituationBuilder
    implements Builder<LeapSituation, LeapSituationBuilder> {
  _$LeapSituation _$v;

  int _attacker;
  int get attacker => _$this._attacker;
  set attacker(int attacker) => _$this._attacker = attacker;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _target;
  int get target => _$this._target;
  set target(int target) => _$this._target = target;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  LeapSituationBuilder();

  LeapSituationBuilder get _$this {
    if (_$v != null) {
      _attacker = _$v.attacker;
      _id = _$v.id;
      _target = _$v.target;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(LeapSituation other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$LeapSituation;
  }

  @override
  void update(void updates(LeapSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$LeapSituation build() {
    final _$result = _$v ??
        new _$LeapSituation._(
            attacker: attacker, id: id, target: target, time: time);
    replace(_$result);
    return _$result;
  }
}
