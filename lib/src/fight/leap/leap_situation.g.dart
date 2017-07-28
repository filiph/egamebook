// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.leap_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class LeapSituation
// **************************************************************************

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
    return 'LeapSituation {'
        'attacker=${attacker.toString()},\n'
        'id=${id.toString()},\n'
        'target=${target.toString()},\n'
        'time=${time.toString()},\n'
        '}';
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
    final result = _$v ??
        new _$LeapSituation._(
            attacker: attacker, id: id, target: target, time: time);
    replace(result);
    return result;
  }
}
