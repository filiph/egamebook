// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.slash_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class SlashSituation
// **************************************************************************

class _$SlashSituation extends SlashSituation {
  @override
  final int attacker;
  @override
  final int target;
  @override
  final int time;

  factory _$SlashSituation([updates(SlashSituationBuilder b)]) =>
      (new SlashSituationBuilder()..update(updates)).build();

  _$SlashSituation._({this.attacker, this.target, this.time}) : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (target == null) throw new ArgumentError.notNull('target');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  SlashSituation rebuild(updates(SlashSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$SlashSituationBuilder toBuilder() =>
      new _$SlashSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! SlashSituation) return false;
    return attacker == other.attacker &&
        target == other.target &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf(
        $jc($jc($jc(0, attacker.hashCode), target.hashCode), time.hashCode));
  }

  @override
  String toString() {
    return 'SlashSituation {'
        'attacker=${attacker.toString()},\n'
        'target=${target.toString()},\n'
        'time=${time.toString()},\n'
        '}';
  }
}

class _$SlashSituationBuilder extends SlashSituationBuilder {
  SlashSituation _$v;

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

  _$SlashSituationBuilder() : super._();

  SlashSituationBuilder get _$this {
    if (_$v != null) {
      super.attacker = _$v.attacker;
      super.target = _$v.target;
      super.time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SlashSituation other) {
    _$v = other;
  }

  @override
  void update(updates(SlashSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  SlashSituation build() {
    final result = _$v ??
        new _$SlashSituation._(attacker: attacker, target: target, time: time);
    replace(result);
    return result;
  }
}
