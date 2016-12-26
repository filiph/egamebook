// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.slash_defense_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class SlashDefenseSituation
// **************************************************************************

class _$SlashDefenseSituation extends SlashDefenseSituation {
  @override
  final int attacker;
  @override
  final int id;
  @override
  final int target;
  @override
  final int time;

  factory _$SlashDefenseSituation([updates(SlashDefenseSituationBuilder b)]) =>
      (new SlashDefenseSituationBuilder()..update(updates)).build();

  _$SlashDefenseSituation._({this.attacker, this.id, this.target, this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (id == null) throw new ArgumentError.notNull('id');
    if (target == null) throw new ArgumentError.notNull('target');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  SlashDefenseSituation rebuild(updates(SlashDefenseSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  SlashDefenseSituationBuilder toBuilder() =>
      new SlashDefenseSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! SlashDefenseSituation) return false;
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
    return 'SlashDefenseSituation {'
        'attacker=${attacker.toString()},\n'
        'id=${id.toString()},\n'
        'target=${target.toString()},\n'
        'time=${time.toString()},\n'
        '}';
  }
}

class SlashDefenseSituationBuilder
    implements Builder<SlashDefenseSituation, SlashDefenseSituationBuilder> {
  SlashDefenseSituation _$v;

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

  SlashDefenseSituationBuilder();

  SlashDefenseSituationBuilder get _$this {
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
  void replace(SlashDefenseSituation other) {
    _$v = other;
  }

  @override
  void update(updates(SlashDefenseSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  SlashDefenseSituation build() {
    final result = _$v ??
        new _$SlashDefenseSituation._(
            attacker: attacker, id: id, target: target, time: time);
    replace(result);
    return result;
  }
}
