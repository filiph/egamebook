// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.counter_attack_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class CounterAttackSituation
// **************************************************************************

class _$CounterAttackSituation extends CounterAttackSituation {
  final int time;
  final int counterAttacker;
  final int target;
  _$CounterAttackSituation._({this.time, this.counterAttacker, this.target})
      : super._() {
    if (time == null) throw new ArgumentError('null time');
    if (counterAttacker == null)
      throw new ArgumentError('null counterAttacker');
    if (target == null) throw new ArgumentError('null target');
  }
  factory _$CounterAttackSituation(
          [updates(CounterAttackSituationBuilder b)]) =>
      (new CounterAttackSituationBuilder()..update(updates)).build();
  CounterAttackSituation rebuild(updates(CounterAttackSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();
  _$CounterAttackSituationBuilder toBuilder() =>
      new _$CounterAttackSituationBuilder()..replace(this);
  bool operator ==(other) {
    if (other is! CounterAttackSituation) return false;
    return time == other.time &&
        counterAttacker == other.counterAttacker &&
        target == other.target;
  }

  int get hashCode {
    return hashObjects([time, counterAttacker, target]);
  }

  String toString() {
    return 'CounterAttackSituation {'
        'time=${time.toString()}\n'
        'counterAttacker=${counterAttacker.toString()}\n'
        'target=${target.toString()}\n'
        '}';
  }
}

class _$CounterAttackSituationBuilder extends CounterAttackSituationBuilder {
  _$CounterAttackSituationBuilder() : super._();
  void replace(CounterAttackSituation other) {
    super.time = other.time;
    super.counterAttacker = other.counterAttacker;
    super.target = other.target;
  }

  void update(updates(CounterAttackSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  CounterAttackSituation build() {
    if (time == null) throw new ArgumentError('null time');
    if (counterAttacker == null)
      throw new ArgumentError('null counterAttacker');
    if (target == null) throw new ArgumentError('null target');
    return new _$CounterAttackSituation._(
        time: time, counterAttacker: counterAttacker, target: target);
  }
}
