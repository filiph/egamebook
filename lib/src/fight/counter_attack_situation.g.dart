// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.counter_attack_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class CounterAttackSituation
// **************************************************************************

class _$CounterAttackSituation extends CounterAttackSituation {
  @override
  final int time;
  @override
  final int counterAttacker;
  @override
  final int target;

  factory _$CounterAttackSituation(
          [updates(CounterAttackSituationBuilder b)]) =>
      (new CounterAttackSituationBuilder()..update(updates)).build();

  _$CounterAttackSituation._({this.time, this.counterAttacker, this.target})
      : super._() {
    if (time == null) throw new ArgumentError.notNull('time');
    if (counterAttacker == null)
      throw new ArgumentError.notNull('counterAttacker');
    if (target == null) throw new ArgumentError.notNull('target');
  }

  @override
  CounterAttackSituation rebuild(updates(CounterAttackSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$CounterAttackSituationBuilder toBuilder() =>
      new _$CounterAttackSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! CounterAttackSituation) return false;
    return time == other.time &&
        counterAttacker == other.counterAttacker &&
        target == other.target;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc(0, time.hashCode), counterAttacker.hashCode), target.hashCode));
  }

  @override
  String toString() {
    return 'CounterAttackSituation {'
        'time=${time.toString()},\n'
        'counterAttacker=${counterAttacker.toString()},\n'
        'target=${target.toString()},\n'
        '}';
  }
}

class _$CounterAttackSituationBuilder extends CounterAttackSituationBuilder {
  CounterAttackSituation _$v;

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
  int get counterAttacker {
    _$this;
    return super.counterAttacker;
  }

  @override
  set counterAttacker(int counterAttacker) {
    _$this;
    super.counterAttacker = counterAttacker;
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

  _$CounterAttackSituationBuilder() : super._();

  CounterAttackSituationBuilder get _$this {
    if (_$v != null) {
      super.time = _$v.time;
      super.counterAttacker = _$v.counterAttacker;
      super.target = _$v.target;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CounterAttackSituation other) {
    _$v = other;
  }

  @override
  void update(updates(CounterAttackSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  CounterAttackSituation build() {
    final result = _$v ??
        new _$CounterAttackSituation._(
            time: time, counterAttacker: counterAttacker, target: target);
    replace(result);
    return result;
  }
}
