// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.slash_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class SlashSituation
// **************************************************************************

class _$SlashSituation extends SlashSituation {
  final int attacker;
  final int target;
  final int time;
  _$SlashSituation._({this.attacker, this.target, this.time}) : super._() {
    if (attacker == null) throw new ArgumentError('null attacker');
    if (target == null) throw new ArgumentError('null target');
    if (time == null) throw new ArgumentError('null time');
  }
  factory _$SlashSituation([updates(SlashSituationBuilder b)]) =>
      (new SlashSituationBuilder()..update(updates)).build();
  SlashSituation rebuild(updates(SlashSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();
  _$SlashSituationBuilder toBuilder() =>
      new _$SlashSituationBuilder()..replace(this);
  bool operator ==(other) {
    if (other is! SlashSituation) return false;
    return attacker == other.attacker &&
        target == other.target &&
        time == other.time;
  }

  int get hashCode {
    return hashObjects([attacker, target, time]);
  }

  String toString() {
    return 'SlashSituation {'
        'attacker=${attacker.toString()}\n'
        'target=${target.toString()}\n'
        'time=${time.toString()}\n'
        '}';
  }
}

class _$SlashSituationBuilder extends SlashSituationBuilder {
  _$SlashSituationBuilder() : super._();
  void replace(SlashSituation other) {
    super.attacker = other.attacker;
    super.target = other.target;
    super.time = other.time;
  }

  void update(updates(SlashSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  SlashSituation build() {
    if (attacker == null) throw new ArgumentError('null attacker');
    if (target == null) throw new ArgumentError('null target');
    if (time == null) throw new ArgumentError('null time');
    return new _$SlashSituation._(
        attacker: attacker, target: target, time: time);
  }
}
