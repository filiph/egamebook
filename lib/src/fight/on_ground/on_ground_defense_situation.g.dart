// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.on_ground_defense_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class OnGroundDefenseSituation
// **************************************************************************

class _$OnGroundDefenseSituation extends OnGroundDefenseSituation {
  final int attacker;
  final int targetOnGround;
  final int time;
  _$OnGroundDefenseSituation._({this.attacker, this.targetOnGround, this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError('null attacker');
    if (targetOnGround == null) throw new ArgumentError('null targetOnGround');
    if (time == null) throw new ArgumentError('null time');
  }
  factory _$OnGroundDefenseSituation(
          [updates(OnGroundDefenseSituationBuilder b)]) =>
      (new OnGroundDefenseSituationBuilder()..update(updates)).build();
  OnGroundDefenseSituation rebuild(
          updates(OnGroundDefenseSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();
  _$OnGroundDefenseSituationBuilder toBuilder() =>
      new _$OnGroundDefenseSituationBuilder()..replace(this);
  bool operator ==(other) {
    if (other is! OnGroundDefenseSituation) return false;
    return attacker == other.attacker &&
        targetOnGround == other.targetOnGround &&
        time == other.time;
  }

  int get hashCode {
    return hashObjects([attacker, targetOnGround, time]);
  }

  String toString() {
    return 'OnGroundDefenseSituation {'
        'attacker=${attacker.toString()}\n'
        'targetOnGround=${targetOnGround.toString()}\n'
        'time=${time.toString()}\n'
        '}';
  }
}

class _$OnGroundDefenseSituationBuilder
    extends OnGroundDefenseSituationBuilder {
  _$OnGroundDefenseSituationBuilder() : super._();
  void replace(OnGroundDefenseSituation other) {
    super.attacker = other.attacker;
    super.targetOnGround = other.targetOnGround;
    super.time = other.time;
  }

  void update(updates(OnGroundDefenseSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  OnGroundDefenseSituation build() {
    if (attacker == null) throw new ArgumentError('null attacker');
    if (targetOnGround == null) throw new ArgumentError('null targetOnGround');
    if (time == null) throw new ArgumentError('null time');
    return new _$OnGroundDefenseSituation._(
        attacker: attacker, targetOnGround: targetOnGround, time: time);
  }
}
