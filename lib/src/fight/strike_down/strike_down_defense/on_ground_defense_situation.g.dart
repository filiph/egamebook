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
  final bool extraForce;
  @override
  final int id;
  @override
  final int targetOnGround;
  @override
  final int time;

  factory _$OnGroundDefenseSituation(
          [updates(OnGroundDefenseSituationBuilder b)]) =>
      (new OnGroundDefenseSituationBuilder()..update(updates)).build();

  _$OnGroundDefenseSituation._(
      {this.attacker, this.extraForce, this.id, this.targetOnGround, this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (extraForce == null) throw new ArgumentError.notNull('extraForce');
    if (id == null) throw new ArgumentError.notNull('id');
    if (targetOnGround == null)
      throw new ArgumentError.notNull('targetOnGround');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  OnGroundDefenseSituation rebuild(
          updates(OnGroundDefenseSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  OnGroundDefenseSituationBuilder toBuilder() =>
      new OnGroundDefenseSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! OnGroundDefenseSituation) return false;
    return attacker == other.attacker &&
        extraForce == other.extraForce &&
        id == other.id &&
        targetOnGround == other.targetOnGround &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc($jc($jc(0, attacker.hashCode), extraForce.hashCode),
                id.hashCode),
            targetOnGround.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return 'OnGroundDefenseSituation {'
        'attacker=${attacker.toString()},\n'
        'extraForce=${extraForce.toString()},\n'
        'id=${id.toString()},\n'
        'targetOnGround=${targetOnGround.toString()},\n'
        'time=${time.toString()},\n'
        '}';
  }
}

class OnGroundDefenseSituationBuilder
    implements
        Builder<OnGroundDefenseSituation, OnGroundDefenseSituationBuilder> {
  OnGroundDefenseSituation _$v;

  int _attacker;
  int get attacker => _$this._attacker;
  set attacker(int attacker) => _$this._attacker = attacker;

  bool _extraForce;
  bool get extraForce => _$this._extraForce;
  set extraForce(bool extraForce) => _$this._extraForce = extraForce;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _targetOnGround;
  int get targetOnGround => _$this._targetOnGround;
  set targetOnGround(int targetOnGround) =>
      _$this._targetOnGround = targetOnGround;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  OnGroundDefenseSituationBuilder();

  OnGroundDefenseSituationBuilder get _$this {
    if (_$v != null) {
      _attacker = _$v.attacker;
      _extraForce = _$v.extraForce;
      _id = _$v.id;
      _targetOnGround = _$v.targetOnGround;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(OnGroundDefenseSituation other) {
    if (other == null) throw new ArgumentError.notNull('other');
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
            attacker: attacker,
            extraForce: extraForce,
            id: id,
            targetOnGround: targetOnGround,
            time: time);
    replace(result);
    return result;
  }
}
