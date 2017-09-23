// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.wrestle_defense_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: annotate_overrides
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

class _$OnGroundWrestleDefenseSituation
    extends OnGroundWrestleDefenseSituation {
  @override
  final int attacker;
  @override
  final int id;
  @override
  final Predetermination predeterminedResult;
  @override
  final int target;
  @override
  final int time;

  factory _$OnGroundWrestleDefenseSituation(
          [void updates(OnGroundWrestleDefenseSituationBuilder b)]) =>
      (new OnGroundWrestleDefenseSituationBuilder()..update(updates)).build();

  _$OnGroundWrestleDefenseSituation._(
      {this.attacker,
      this.id,
      this.predeterminedResult,
      this.target,
      this.time})
      : super._() {
    if (attacker == null) throw new ArgumentError.notNull('attacker');
    if (id == null) throw new ArgumentError.notNull('id');
    if (predeterminedResult == null)
      throw new ArgumentError.notNull('predeterminedResult');
    if (target == null) throw new ArgumentError.notNull('target');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  OnGroundWrestleDefenseSituation rebuild(
          void updates(OnGroundWrestleDefenseSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  OnGroundWrestleDefenseSituationBuilder toBuilder() =>
      new OnGroundWrestleDefenseSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! OnGroundWrestleDefenseSituation) return false;
    return attacker == other.attacker &&
        id == other.id &&
        predeterminedResult == other.predeterminedResult &&
        target == other.target &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc($jc($jc(0, attacker.hashCode), id.hashCode),
                predeterminedResult.hashCode),
            target.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('OnGroundWrestleDefenseSituation')
          ..add('attacker', attacker)
          ..add('id', id)
          ..add('predeterminedResult', predeterminedResult)
          ..add('target', target)
          ..add('time', time))
        .toString();
  }
}

class OnGroundWrestleDefenseSituationBuilder
    implements
        Builder<OnGroundWrestleDefenseSituation,
            OnGroundWrestleDefenseSituationBuilder> {
  _$OnGroundWrestleDefenseSituation _$v;

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

  int _target;
  int get target => _$this._target;
  set target(int target) => _$this._target = target;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  OnGroundWrestleDefenseSituationBuilder();

  OnGroundWrestleDefenseSituationBuilder get _$this {
    if (_$v != null) {
      _attacker = _$v.attacker;
      _id = _$v.id;
      _predeterminedResult = _$v.predeterminedResult;
      _target = _$v.target;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(OnGroundWrestleDefenseSituation other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$OnGroundWrestleDefenseSituation;
  }

  @override
  void update(void updates(OnGroundWrestleDefenseSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$OnGroundWrestleDefenseSituation build() {
    final _$result = _$v ??
        new _$OnGroundWrestleDefenseSituation._(
            attacker: attacker,
            id: id,
            predeterminedResult: predeterminedResult,
            target: target,
            time: time);
    replace(_$result);
    return _$result;
  }
}
