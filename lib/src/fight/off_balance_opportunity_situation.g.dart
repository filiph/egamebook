// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.off_balance_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class OffBalanceOpportunitySituation
// **************************************************************************

class _$OffBalanceOpportunitySituation extends OffBalanceOpportunitySituation {
  @override
  final int time;
  @override
  final int actorId;
  @override
  final int culpritId;

  factory _$OffBalanceOpportunitySituation(
          [updates(OffBalanceOpportunitySituationBuilder b)]) =>
      (new OffBalanceOpportunitySituationBuilder()..update(updates)).build();

  _$OffBalanceOpportunitySituation._({this.time, this.actorId, this.culpritId})
      : super._() {
    if (time == null) throw new ArgumentError.notNull('time');
    if (actorId == null) throw new ArgumentError.notNull('actorId');
  }

  @override
  OffBalanceOpportunitySituation rebuild(
          updates(OffBalanceOpportunitySituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$OffBalanceOpportunitySituationBuilder toBuilder() =>
      new _$OffBalanceOpportunitySituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! OffBalanceOpportunitySituation) return false;
    return time == other.time &&
        actorId == other.actorId &&
        culpritId == other.culpritId;
  }

  @override
  int get hashCode {
    return $jf(
        $jc($jc($jc(0, time.hashCode), actorId.hashCode), culpritId.hashCode));
  }

  @override
  String toString() {
    return 'OffBalanceOpportunitySituation {'
        'time=${time.toString()},\n'
        'actorId=${actorId.toString()},\n'
        'culpritId=${culpritId.toString()},\n'
        '}';
  }
}

class _$OffBalanceOpportunitySituationBuilder
    extends OffBalanceOpportunitySituationBuilder {
  OffBalanceOpportunitySituation _$v;

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
  int get actorId {
    _$this;
    return super.actorId;
  }

  @override
  set actorId(int actorId) {
    _$this;
    super.actorId = actorId;
  }

  @override
  int get culpritId {
    _$this;
    return super.culpritId;
  }

  @override
  set culpritId(int culpritId) {
    _$this;
    super.culpritId = culpritId;
  }

  _$OffBalanceOpportunitySituationBuilder() : super._();

  OffBalanceOpportunitySituationBuilder get _$this {
    if (_$v != null) {
      super.time = _$v.time;
      super.actorId = _$v.actorId;
      super.culpritId = _$v.culpritId;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(OffBalanceOpportunitySituation other) {
    _$v = other;
  }

  @override
  void update(updates(OffBalanceOpportunitySituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  OffBalanceOpportunitySituation build() {
    final result = _$v ??
        new _$OffBalanceOpportunitySituation._(
            time: time, actorId: actorId, culpritId: culpritId);
    replace(result);
    return result;
  }
}
