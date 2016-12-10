// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.slash_defense_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class SlashDefenseSituation
// **************************************************************************

class _$SlashDefenseSituation extends SlashDefenseSituation {
  @override
  final int time;
  @override
  final int attacker;
  @override
  final int target;

  factory _$SlashDefenseSituation([updates(SlashDefenseSituationBuilder b)]) =>
      (new SlashDefenseSituationBuilder()..update(updates)).build();

  _$SlashDefenseSituation._({this.time, this.attacker, this.target})
      : super._() {
    if (time == null) throw new ArgumentError.notNull('time');
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (target == null) throw new ArgumentError.notNull('target');
  }

  @override
  SlashDefenseSituation rebuild(updates(SlashDefenseSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$SlashDefenseSituationBuilder toBuilder() =>
      new _$SlashDefenseSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! SlashDefenseSituation) return false;
    return time == other.time &&
        attacker == other.attacker &&
        target == other.target;
  }

  @override
  int get hashCode {
    return $jf(
        $jc($jc($jc(0, time.hashCode), attacker.hashCode), target.hashCode));
  }

  @override
  String toString() {
    return 'SlashDefenseSituation {'
        'time=${time.toString()},\n'
        'attacker=${attacker.toString()},\n'
        'target=${target.toString()},\n'
        '}';
  }
}

class _$SlashDefenseSituationBuilder extends SlashDefenseSituationBuilder {
  SlashDefenseSituation _$v;

  @override
  int get time {
    _$this;
    return super.time;
  }

  @override
  set time(int time) {
    _$this;
    super.time = time;
  }

  @override
  int get attacker {
    _$this;
    return super.attacker;
  }

  @override
  set attacker(int attacker) {
    _$this;
    super.attacker = attacker;
  }

  @override
  int get target {
    _$this;
    return super.target;
  }

  @override
  set target(int target) {
    _$this;
    super.target = target;
  }

  _$SlashDefenseSituationBuilder() : super._();

  SlashDefenseSituationBuilder get _$this {
    if (_$v != null) {
      super.time = _$v.time;
      super.attacker = _$v.attacker;
      super.target = _$v.target;
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
            time: time, attacker: attacker, target: target);
    replace(result);
    return result;
  }
}
