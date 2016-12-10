// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.strike_down_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class StrikeDownSituation
// **************************************************************************

class _$StrikeDownSituation extends StrikeDownSituation {
  @override
  final int time;
  @override
  final int attacker;
  @override
  final int targetOnGround;

  factory _$StrikeDownSituation([updates(StrikeDownSituationBuilder b)]) =>
      (new StrikeDownSituationBuilder()..update(updates)).build();

  _$StrikeDownSituation._({this.time, this.attacker, this.targetOnGround})
      : super._() {
    if (time == null) throw new ArgumentError.notNull('time');
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (targetOnGround == null)
      throw new ArgumentError.notNull('targetOnGround');
  }

  @override
  StrikeDownSituation rebuild(updates(StrikeDownSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$StrikeDownSituationBuilder toBuilder() =>
      new _$StrikeDownSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! StrikeDownSituation) return false;
    return time == other.time &&
        attacker == other.attacker &&
        targetOnGround == other.targetOnGround;
  }

  @override
  int get hashCode {
    return $jf($jc($jc($jc(0, time.hashCode), attacker.hashCode),
        targetOnGround.hashCode));
  }

  @override
  String toString() {
    return 'StrikeDownSituation {'
        'time=${time.toString()},\n'
        'attacker=${attacker.toString()},\n'
        'targetOnGround=${targetOnGround.toString()},\n'
        '}';
  }
}

class _$StrikeDownSituationBuilder extends StrikeDownSituationBuilder {
  StrikeDownSituation _$v;

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
  int get targetOnGround {
    _$this;
    return super.targetOnGround;
  }

  @override
  set targetOnGround(int targetOnGround) {
    _$this;
    super.targetOnGround = targetOnGround;
  }

  _$StrikeDownSituationBuilder() : super._();

  StrikeDownSituationBuilder get _$this {
    if (_$v != null) {
      super.time = _$v.time;
      super.attacker = _$v.attacker;
      super.targetOnGround = _$v.targetOnGround;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(StrikeDownSituation other) {
    _$v = other;
  }

  @override
  void update(updates(StrikeDownSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  StrikeDownSituation build() {
    final result = _$v ??
        new _$StrikeDownSituation._(
            time: time, attacker: attacker, targetOnGround: targetOnGround);
    replace(result);
    return result;
  }
}
