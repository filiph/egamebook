// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.slash_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class SlashSituation
// **************************************************************************

class _$SlashSituation extends SlashSituation {
  final int time;
  final int attacker;
  final int target;
  _$SlashSituation._({this.time, this.attacker, this.target}) : super._() {
    if (time == null) throw new ArgumentError('null time');
    if (attacker == null) throw new ArgumentError('null attacker');
    if (target == null) throw new ArgumentError('null target');
  }
  factory _$SlashSituation([updates(SlashSituationBuilder b)]) =>
      (new SlashSituationBuilder()..update(updates)).build();
  SlashSituation rebuild(updates(SlashSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();
  _$SlashSituationBuilder toBuilder() =>
      new _$SlashSituationBuilder()..replace(this);
  bool operator ==(other) {
    if (other is! SlashSituation) return false;
    return time == other.time &&
        attacker == other.attacker &&
        target == other.target;
  }

  int get hashCode {
    return hashObjects([time, attacker, target]);
  }

  String toString() {
    return 'SlashSituation {'
        'time=${time.toString()}\n'
        'attacker=${attacker.toString()}\n'
        'target=${target.toString()}\n'
        '}';
  }
}

class _$SlashSituationBuilder extends SlashSituationBuilder {
  _$SlashSituationBuilder() : super._();
  void replace(SlashSituation other) {
    super.time = other.time;
    super.attacker = other.attacker;
    super.target = other.target;
  }

  void update(updates(SlashSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  SlashSituation build() {
    if (time == null) throw new ArgumentError('null time');
    if (attacker == null) throw new ArgumentError('null attacker');
    if (target == null) throw new ArgumentError('null target');
    return new _$SlashSituation._(
        time: time, attacker: attacker, target: target);
  }
}
