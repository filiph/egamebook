// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.on_ground_defense_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class OnGroundDefenseSituation
// **************************************************************************

class _$OnGroundDefenseSituation extends OnGroundDefenseSituation {
  @override
  final int attacker;
  @override
  final int targetOnGround;
  @override
  final int time;

  factory _$OnGroundDefenseSituation(
          [updates(OnGroundDefenseSituationBuilder b)]) =>
      (new OnGroundDefenseSituationBuilder()..update(updates)).build();

  _$OnGroundDefenseSituation._({this.attacker, this.targetOnGround, this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (targetOnGround == null)
      throw new ArgumentError.notNull('targetOnGround');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  OnGroundDefenseSituation rebuild(
          updates(OnGroundDefenseSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$OnGroundDefenseSituationBuilder toBuilder() =>
      new _$OnGroundDefenseSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! OnGroundDefenseSituation) return false;
    return attacker == other.attacker &&
        targetOnGround == other.targetOnGround &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc($jc($jc(0, attacker.hashCode), targetOnGround.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return 'OnGroundDefenseSituation {'
        'attacker=${attacker.toString()},\n'
        'targetOnGround=${targetOnGround.toString()},\n'
        'time=${time.toString()},\n'
        '}';
  }
}

class _$OnGroundDefenseSituationBuilder
    extends OnGroundDefenseSituationBuilder {
  OnGroundDefenseSituation _$v;

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
  int get targetOnGround {
    _$this;
    return super.targetOnGround;
  }

  @override
  set targetOnGround(int targetOnGround) {
    _$this;
    super.targetOnGround = targetOnGround;
  }

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

  _$OnGroundDefenseSituationBuilder() : super._();

  OnGroundDefenseSituationBuilder get _$this {
    if (_$v != null) {
      super.attacker = _$v.attacker;
      super.targetOnGround = _$v.targetOnGround;
      super.time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(OnGroundDefenseSituation other) {
    _$v = other;
  }

  @override
  void update(updates(OnGroundDefenseSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  OnGroundDefenseSituation build() {
    final result = _$v ??
        new _$OnGroundDefenseSituation._(
            attacker: attacker, targetOnGround: targetOnGround, time: time);
    replace(result);
    return result;
  }
}
