// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.fight_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class FightSituation
// **************************************************************************

class _$FightSituation extends FightSituation {
  final BuiltList<int> enemyTeamIds;
  final BuiltMap<int, TimedEventCallback> events;
  final BuiltList<int> playerTeamIds;
  final int time;
  _$FightSituation._(
      {this.enemyTeamIds, this.events, this.playerTeamIds, this.time})
      : super._() {
    if (enemyTeamIds == null) throw new ArgumentError('null enemyTeamIds');
    if (events == null) throw new ArgumentError('null events');
    if (playerTeamIds == null) throw new ArgumentError('null playerTeamIds');
    if (time == null) throw new ArgumentError('null time');
  }
  factory _$FightSituation([updates(FightSituationBuilder b)]) =>
      (new FightSituationBuilder()..update(updates)).build();
  FightSituation rebuild(updates(FightSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();
  _$FightSituationBuilder toBuilder() =>
      new _$FightSituationBuilder()..replace(this);
  bool operator ==(other) {
    if (other is! FightSituation) return false;
    return enemyTeamIds == other.enemyTeamIds &&
        events == other.events &&
        playerTeamIds == other.playerTeamIds &&
        time == other.time;
  }

  int get hashCode {
    return hashObjects([enemyTeamIds, events, playerTeamIds, time]);
  }

  String toString() {
    return 'FightSituation {'
        'enemyTeamIds=${enemyTeamIds.toString()}\n'
        'events=${events.toString()}\n'
        'playerTeamIds=${playerTeamIds.toString()}\n'
        'time=${time.toString()}\n'
        '}';
  }
}

class _$FightSituationBuilder extends FightSituationBuilder {
  _$FightSituationBuilder() : super._();
  void replace(FightSituation other) {
    super.enemyTeamIds = other.enemyTeamIds;
    super.events = other.events?.toBuilder();
    super.playerTeamIds = other.playerTeamIds;
    super.time = other.time;
  }

  void update(updates(FightSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  FightSituation build() {
    if (enemyTeamIds == null) throw new ArgumentError('null enemyTeamIds');
    if (events == null) throw new ArgumentError('null events');
    if (playerTeamIds == null) throw new ArgumentError('null playerTeamIds');
    if (time == null) throw new ArgumentError('null time');
    return new _$FightSituation._(
        enemyTeamIds: enemyTeamIds,
        events: events?.build(),
        playerTeamIds: playerTeamIds,
        time: time);
  }
}
