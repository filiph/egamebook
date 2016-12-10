// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.fight_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class FightSituation
// **************************************************************************

class _$FightSituation extends FightSituation {
  @override
  final BuiltList<int> enemyTeamIds;
  @override
  final BuiltMap<int, TimedEventCallback> events;
  @override
  final BuiltList<int> playerTeamIds;
  @override
  final int time;

  factory _$FightSituation([updates(FightSituationBuilder b)]) =>
      (new FightSituationBuilder()..update(updates)).build();

  _$FightSituation._(
      {this.enemyTeamIds, this.events, this.playerTeamIds, this.time})
      : super._() {
    if (enemyTeamIds == null) throw new ArgumentError.notNull('enemyTeamIds');
    if (events == null) throw new ArgumentError.notNull('events');
    if (playerTeamIds == null) throw new ArgumentError.notNull('playerTeamIds');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  FightSituation rebuild(updates(FightSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$FightSituationBuilder toBuilder() =>
      new _$FightSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! FightSituation) return false;
    return enemyTeamIds == other.enemyTeamIds &&
        events == other.events &&
        playerTeamIds == other.playerTeamIds &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, enemyTeamIds.hashCode), events.hashCode),
            playerTeamIds.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return 'FightSituation {'
        'enemyTeamIds=${enemyTeamIds.toString()},\n'
        'events=${events.toString()},\n'
        'playerTeamIds=${playerTeamIds.toString()},\n'
        'time=${time.toString()},\n'
        '}';
  }
}

class _$FightSituationBuilder extends FightSituationBuilder {
  FightSituation _$v;

  @override
  BuiltList<int> get enemyTeamIds {
    _$this;
    return super.enemyTeamIds;
  }

  @override
  set enemyTeamIds(BuiltList<int> enemyTeamIds) {
    _$this;
    super.enemyTeamIds = enemyTeamIds;
  }

  @override
  MapBuilder<int, TimedEventCallback> get events {
    _$this;
    return super.events ??= new MapBuilder<int, TimedEventCallback>();
  }

  @override
  set events(MapBuilder<int, TimedEventCallback> events) {
    _$this;
    super.events = events;
  }

  @override
  BuiltList<int> get playerTeamIds {
    _$this;
    return super.playerTeamIds;
  }

  @override
  set playerTeamIds(BuiltList<int> playerTeamIds) {
    _$this;
    super.playerTeamIds = playerTeamIds;
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

  _$FightSituationBuilder() : super._();

  FightSituationBuilder get _$this {
    if (_$v != null) {
      super.enemyTeamIds = _$v.enemyTeamIds;
      super.events = _$v.events?.toBuilder();
      super.playerTeamIds = _$v.playerTeamIds;
      super.time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(FightSituation other) {
    _$v = other;
  }

  @override
  void update(updates(FightSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  FightSituation build() {
    final result = _$v ??
        new _$FightSituation._(
            enemyTeamIds: enemyTeamIds,
            events: events?.build(),
            playerTeamIds: playerTeamIds,
            time: time);
    replace(result);
    return result;
  }
}
