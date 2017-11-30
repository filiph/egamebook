// GENERATED CODE - DO NOT MODIFY BY HAND

part of writers_input;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_returning_this
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

class _$GuardpostAboveChurchTakeShieldRescueSituation
    extends GuardpostAboveChurchTakeShieldRescueSituation {
  @override
  final int id;
  @override
  final int time;

  factory _$GuardpostAboveChurchTakeShieldRescueSituation(
          [void updates(
              GuardpostAboveChurchTakeShieldRescueSituationBuilder b)]) =>
      (new GuardpostAboveChurchTakeShieldRescueSituationBuilder()
            ..update(updates))
          .build();

  _$GuardpostAboveChurchTakeShieldRescueSituation._({this.id, this.time})
      : super._() {
    if (id == null) throw new ArgumentError.notNull('id');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  GuardpostAboveChurchTakeShieldRescueSituation rebuild(
          void updates(
              GuardpostAboveChurchTakeShieldRescueSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  GuardpostAboveChurchTakeShieldRescueSituationBuilder toBuilder() =>
      new GuardpostAboveChurchTakeShieldRescueSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! GuardpostAboveChurchTakeShieldRescueSituation) return false;
    return id == other.id && time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, id.hashCode), time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(
            'GuardpostAboveChurchTakeShieldRescueSituation')
          ..add('id', id)
          ..add('time', time))
        .toString();
  }
}

class GuardpostAboveChurchTakeShieldRescueSituationBuilder
    implements
        Builder<GuardpostAboveChurchTakeShieldRescueSituation,
            GuardpostAboveChurchTakeShieldRescueSituationBuilder> {
  _$GuardpostAboveChurchTakeShieldRescueSituation _$v;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  GuardpostAboveChurchTakeShieldRescueSituationBuilder();

  GuardpostAboveChurchTakeShieldRescueSituationBuilder get _$this {
    if (_$v != null) {
      _id = _$v.id;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(GuardpostAboveChurchTakeShieldRescueSituation other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$GuardpostAboveChurchTakeShieldRescueSituation;
  }

  @override
  void update(
      void updates(GuardpostAboveChurchTakeShieldRescueSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$GuardpostAboveChurchTakeShieldRescueSituation build() {
    final _$result = _$v ??
        new _$GuardpostAboveChurchTakeShieldRescueSituation._(
            id: id, time: time);
    replace(_$result);
    return _$result;
  }
}
