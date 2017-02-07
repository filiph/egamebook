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
  final bool extraForce;
  @override
  final int id;
  @override
  final int target;
  @override
  final int time;

  factory _$SlashSituation([updates(SlashSituationBuilder b)]) =>
      (new SlashSituationBuilder()..update(updates)).build();

  _$SlashSituation._(
      {this.attacker, this.extraForce, this.id, this.target, this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (extraForce == null) throw new ArgumentError.notNull('extraForce');
    if (id == null) throw new ArgumentError.notNull('id');
    if (target == null) throw new ArgumentError.notNull('target');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  SlashSituation rebuild(updates(SlashSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  SlashSituationBuilder toBuilder() =>
      new SlashSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! SlashSituation) return false;
    return attacker == other.attacker &&
        extraForce == other.extraForce &&
        id == other.id &&
        target == other.target &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc($jc($jc(0, attacker.hashCode), extraForce.hashCode),
                id.hashCode),
            target.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return 'SlashSituation {'
        'attacker=${attacker.toString()},\n'
        'extraForce=${extraForce.toString()},\n'
        'id=${id.toString()},\n'
        'target=${target.toString()},\n'
        'time=${time.toString()},\n'
        '}';
  }
}

class SlashSituationBuilder
    implements Builder<SlashSituation, SlashSituationBuilder> {
  SlashSituation _$v;

  int _attacker;
  int get attacker => _$this._attacker;
  set attacker(int attacker) => _$this._attacker = attacker;

  bool _extraForce;
  bool get extraForce => _$this._extraForce;
  set extraForce(bool extraForce) => _$this._extraForce = extraForce;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _target;
  int get target => _$this._target;
  set target(int target) => _$this._target = target;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  SlashSituationBuilder();

  SlashSituationBuilder get _$this {
    if (_$v != null) {
      _attacker = _$v.attacker;
      _extraForce = _$v.extraForce;
      _id = _$v.id;
      _target = _$v.target;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SlashSituation other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other;
  }

  @override
  void update(updates(SlashSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  SlashSituation build() {
    final result = _$v ??
        new _$SlashSituation._(
            attacker: attacker,
            extraForce: extraForce,
            id: id,
            target: target,
            time: time);
    replace(result);
    return result;
  }
}
