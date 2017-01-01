// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.fight_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class RoomRoamingSituation
// **************************************************************************

class _$RoomRoamingSituation extends RoomRoamingSituation {
  @override
  final String currentRoomName;
  @override
  final int id;
  @override
  final int time;

  factory _$RoomRoamingSituation([updates(RoomRoamingSituationBuilder b)]) =>
      (new RoomRoamingSituationBuilder()..update(updates)).build();

  _$RoomRoamingSituation._({this.currentRoomName, this.id, this.time})
      : super._() {
    if (currentRoomName == null)
      throw new ArgumentError.notNull('currentRoomName');
    if (id == null) throw new ArgumentError.notNull('id');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  RoomRoamingSituation rebuild(updates(RoomRoamingSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  RoomRoamingSituationBuilder toBuilder() =>
      new RoomRoamingSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! RoomRoamingSituation) return false;
    return currentRoomName == other.currentRoomName &&
        id == other.id &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf(
        $jc($jc($jc(0, currentRoomName.hashCode), id.hashCode), time.hashCode));
  }

  @override
  String toString() {
    return 'RoomRoamingSituation {'
        'currentRoomName=${currentRoomName.toString()},\n'
        'id=${id.toString()},\n'
        'time=${time.toString()},\n'
        '}';
  }
}

class RoomRoamingSituationBuilder
    implements Builder<RoomRoamingSituation, RoomRoamingSituationBuilder> {
  RoomRoamingSituation _$v;

  String _currentRoomName;
  String get currentRoomName => _$this._currentRoomName;
  set currentRoomName(String currentRoomName) =>
      _$this._currentRoomName = currentRoomName;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  RoomRoamingSituationBuilder();

  RoomRoamingSituationBuilder get _$this {
    if (_$v != null) {
      _currentRoomName = _$v.currentRoomName;
      _id = _$v.id;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(RoomRoamingSituation other) {
    _$v = other;
  }

  @override
  void update(updates(RoomRoamingSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  RoomRoamingSituation build() {
    final result = _$v ??
        new _$RoomRoamingSituation._(
            currentRoomName: currentRoomName, id: id, time: time);
    replace(result);
    return result;
  }
}
