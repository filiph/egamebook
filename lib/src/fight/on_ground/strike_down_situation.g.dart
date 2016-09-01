// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.strike_down_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class StrikeDownSituation
// **************************************************************************

class _$StrikeDownSituation extends StrikeDownSituation {
  final int time;
  final int attacker;
  final int targetOnGround;
  _$StrikeDownSituation._({this.time, this.attacker, this.targetOnGround})
      : super._() {
    if (time == null) throw new ArgumentError('null time');
    if (attacker == null) throw new ArgumentError('null attacker');
    if (targetOnGround == null) throw new ArgumentError('null targetOnGround');
  }
  factory _$StrikeDownSituation([updates(StrikeDownSituationBuilder b)]) =>
      (new StrikeDownSituationBuilder()..update(updates)).build();
  StrikeDownSituation rebuild(updates(StrikeDownSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();
  _$StrikeDownSituationBuilder toBuilder() =>
      new _$StrikeDownSituationBuilder()..replace(this);
  bool operator ==(other) {
    if (other is! StrikeDownSituation) return false;
    return time == other.time &&
        attacker == other.attacker &&
        targetOnGround == other.targetOnGround;
  }

  int get hashCode {
    return hashObjects([time, attacker, targetOnGround]);
  }

  String toString() {
    return 'StrikeDownSituation {'
        'time=${time.toString()}\n'
        'attacker=${attacker.toString()}\n'
        'targetOnGround=${targetOnGround.toString()}\n'
        '}';
  }
}

class _$StrikeDownSituationBuilder extends StrikeDownSituationBuilder {
  _$StrikeDownSituationBuilder() : super._();
  void replace(StrikeDownSituation other) {
    super.time = other.time;
    super.attacker = other.attacker;
    super.targetOnGround = other.targetOnGround;
  }

  void update(updates(StrikeDownSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  StrikeDownSituation build() {
    if (time == null) throw new ArgumentError('null time');
    if (attacker == null) throw new ArgumentError('null attacker');
    if (targetOnGround == null) throw new ArgumentError('null targetOnGround');
    return new _$StrikeDownSituation._(
        time: time, attacker: attacker, targetOnGround: targetOnGround);
  }
}
