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
  final int id;
  @override
  final int targetOnGround;
  @override
  final int time;

  factory _$OnGroundDefenseSituation(
          [updates(OnGroundDefenseSituationBuilder b)]) =>
      (new OnGroundDefenseSituationBuilder()..update(updates)).build();

  _$OnGroundDefenseSituation._(
      {this.attacker, this.id, this.targetOnGround, this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
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
        id == other.id &&
        targetOnGround == other.targetOnGround &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, attacker.hashCode), id.hashCode),
            targetOnGround.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return 'OnGroundDefenseSituation {'
        'attacker=${attacker.toString()},\n'
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
      _id = _$v.id;
      _targetOnGround = _$v.targetOnGround;
      _time = _$v.time;
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
            attacker: attacker,
            id: id,
            targetOnGround: targetOnGround,
            time: time);
    replace(result);
    return result;
  }
}
