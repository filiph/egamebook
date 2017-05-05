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
  final Predetermination predeterminedResult;
  @override
  final int targetOnGround;
  @override
  final int time;

  factory _$OnGroundDefenseSituation(
          [void updates(OnGroundDefenseSituationBuilder b)]) =>
      (new OnGroundDefenseSituationBuilder()..update(updates)).build();

  _$OnGroundDefenseSituation._(
      {this.attacker,
      this.id,
      this.predeterminedResult,
      this.targetOnGround,
      this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (id == null) throw new ArgumentError.notNull('id');
    if (predeterminedResult == null)
      throw new ArgumentError.notNull('predeterminedResult');
    if (targetOnGround == null)
      throw new ArgumentError.notNull('targetOnGround');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  OnGroundDefenseSituation rebuild(
          void updates(OnGroundDefenseSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  OnGroundDefenseSituationBuilder toBuilder() =>
      new OnGroundDefenseSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! OnGroundDefenseSituation) return false;
    return attacker == other.attacker &&
        id == other.id &&
        predeterminedResult == other.predeterminedResult &&
        targetOnGround == other.targetOnGround &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc($jc($jc(0, attacker.hashCode), id.hashCode),
                predeterminedResult.hashCode),
            targetOnGround.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return 'OnGroundDefenseSituation {'
        'attacker=${attacker.toString()},\n'
        'id=${id.toString()},\n'
        'predeterminedResult=${predeterminedResult.toString()},\n'
        'targetOnGround=${targetOnGround.toString()},\n'
        'time=${time.toString()},\n'
        '}';
  }
}

class OnGroundDefenseSituationBuilder
    implements
        Builder<OnGroundDefenseSituation, OnGroundDefenseSituationBuilder> {
  _$OnGroundDefenseSituation _$v;

  int _attacker;
  int get attacker => _$this._attacker;
  set attacker(int attacker) => _$this._attacker = attacker;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  Predetermination _predeterminedResult;
  Predetermination get predeterminedResult => _$this._predeterminedResult;
  set predeterminedResult(Predetermination predeterminedResult) =>
      _$this._predeterminedResult = predeterminedResult;

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
      _predeterminedResult = _$v.predeterminedResult;
      _targetOnGround = _$v.targetOnGround;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(OnGroundDefenseSituation other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$OnGroundDefenseSituation;
  }

  @override
  void update(void updates(OnGroundDefenseSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$OnGroundDefenseSituation build() {
    final result = _$v ??
        new _$OnGroundDefenseSituation._(
            attacker: attacker,
            id: id,
            predeterminedResult: predeterminedResult,
            targetOnGround: targetOnGround,
            time: time);
    replace(result);
    return result;
  }
}
