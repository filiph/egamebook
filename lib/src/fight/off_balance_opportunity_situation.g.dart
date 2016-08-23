// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.off_balance_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class OffBalanceOpportunitySituation
// **************************************************************************

class _$OffBalanceOpportunitySituation extends OffBalanceOpportunitySituation {
  final int time;
  final int actorId;
  final int culpritId;
  _$OffBalanceOpportunitySituation._({this.time, this.actorId, this.culpritId})
      : super._() {
    if (time == null) throw new ArgumentError('null time');
    if (actorId == null) throw new ArgumentError('null actorId');
  }
  factory _$OffBalanceOpportunitySituation(
          [updates(OffBalanceOpportunitySituationBuilder b)]) =>
      (new OffBalanceOpportunitySituationBuilder()..update(updates)).build();
  OffBalanceOpportunitySituation rebuild(
          updates(OffBalanceOpportunitySituationBuilder b)) =>
      (toBuilder()..update(updates)).build();
  _$OffBalanceOpportunitySituationBuilder toBuilder() =>
      new _$OffBalanceOpportunitySituationBuilder()..replace(this);
  bool operator ==(other) {
    if (other is! OffBalanceOpportunitySituation) return false;
    return time == other.time &&
        actorId == other.actorId &&
        culpritId == other.culpritId;
  }

  int get hashCode {
    return hashObjects([time, actorId, culpritId]);
  }

  String toString() {
    return 'OffBalanceOpportunitySituation {'
        'time=${time.toString()}\n'
        'actorId=${actorId.toString()}\n'
        'culpritId=${culpritId.toString()}\n'
        '}';
  }
}

class _$OffBalanceOpportunitySituationBuilder
    extends OffBalanceOpportunitySituationBuilder {
  _$OffBalanceOpportunitySituationBuilder() : super._();
  void replace(OffBalanceOpportunitySituation other) {
    super.time = other.time;
    super.actorId = other.actorId;
    super.culpritId = other.culpritId;
  }

  void update(updates(OffBalanceOpportunitySituationBuilder b)) {
    if (updates != null) updates(this);
  }

  OffBalanceOpportunitySituation build() {
    if (time == null) throw new ArgumentError('null time');
    if (actorId == null) throw new ArgumentError('null actorId');
    return new _$OffBalanceOpportunitySituation._(
        time: time, actorId: actorId, culpritId: culpritId);
  }
}
