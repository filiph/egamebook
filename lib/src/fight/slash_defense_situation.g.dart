// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.slash_defense_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class SlashDefenseSituation
// **************************************************************************

class _$SlashDefenseSituation extends SlashDefenseSituation {
  final int time;
  final int attacker;
  final int target;
  _$SlashDefenseSituation._({this.time, this.attacker, this.target})
      : super._() {
    if (time == null) throw new ArgumentError('null time');
    if (attacker == null) throw new ArgumentError('null attacker');
    if (target == null) throw new ArgumentError('null target');
  }
  factory _$SlashDefenseSituation([updates(SlashDefenseSituationBuilder b)]) =>
      (new SlashDefenseSituationBuilder()..update(updates)).build();
  SlashDefenseSituation rebuild(updates(SlashDefenseSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();
  _$SlashDefenseSituationBuilder toBuilder() =>
      new _$SlashDefenseSituationBuilder()..replace(this);
  bool operator ==(other) {
    if (other is! SlashDefenseSituation) return false;
    return time == other.time &&
        attacker == other.attacker &&
        target == other.target;
  }

  int get hashCode {
    return hashObjects([time, attacker, target]);
  }

  String toString() {
    return 'SlashDefenseSituation {'
        'time=${time.toString()}\n'
        'attacker=${attacker.toString()}\n'
        'target=${target.toString()}\n'
        '}';
  }
}

class _$SlashDefenseSituationBuilder extends SlashDefenseSituationBuilder {
  _$SlashDefenseSituationBuilder() : super._();
  void replace(SlashDefenseSituation other) {
    super.time = other.time;
    super.attacker = other.attacker;
    super.target = other.target;
  }

  void update(updates(SlashDefenseSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  SlashDefenseSituation build() {
    if (time == null) throw new ArgumentError('null time');
    if (attacker == null) throw new ArgumentError('null attacker');
    if (target == null) throw new ArgumentError('null target');
    return new _$SlashDefenseSituation._(
        time: time, attacker: attacker, target: target);
  }
}
