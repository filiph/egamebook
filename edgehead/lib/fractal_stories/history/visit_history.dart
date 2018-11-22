library stranded.history.visit;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/history/history.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:meta/meta.dart';

part 'visit_history.g.dart';

/// A record of all visits made to any room by any actor.
abstract class VisitHistory
    implements Built<VisitHistory, VisitHistoryBuilder> {
  static Serializer<VisitHistory> get serializer => _$visitHistorySerializer;

  factory VisitHistory([void updates(VisitHistoryBuilder b)]) = _$VisitHistory;

  VisitHistory._();

  /// A map from keys (as defined by [VisitHistory.getKey]) to iterables
  /// of stored [VisitRecord]s.
  ///
  /// The records are grouped for faster access.
  BuiltListMultimap<String, VisitRecord> get records;

  /// Returns the latest visit performed by [actor].
  VisitRecord getLatestOnly(Actor actor) {
    final visited = records.values.where((rec) => rec.actorId == actor.id);
    VisitRecord latest;
    for (final rec in visited) {
      if (latest == null) {
        latest = rec;
        continue;
      }
      if (rec.time.isAfter(latest.time)) {
        latest = rec;
      }
    }
    return latest;
  }

  /// Returns the record for the particular [actor] and the [room].
  ///
  /// By default, this only asks for record of the particular variant of the
  /// room. If you don't care what state the room was in when the actor
  /// visited it, set [includeVariants] to `true`.
  SerialQueryResult<VisitRecord> query(Actor actor, Room room,
      {bool includeVariants = false}) {
    assert(actor != null);
    assert(room != null);
    final key = getKey(room);
    return SerialQueryResult(records[key].where((rec) {
      if (rec.roomName == room.name) return true;
      if (includeVariants && rec.parentRoomName == room.name) return true;
      return false;
    }));
  }

  /// Visits are grouped by rooms. More specifically, they are grouped by
  /// names of rooms, or names of parent rooms if applicable.
  ///
  /// We can't go more specific, because for visits of variants, it's
  /// not clear whether to index by variant room name, or parent room name.
  /// So we always go with parent room name.
  static String getKey(Room room) => room.parent ?? room.name;
}

abstract class VisitRecord
    implements Record, Built<VisitRecord, VisitRecordBuilder> {
  static Serializer<VisitRecord> get serializer => _$visitRecordSerializer;

  factory VisitRecord(
      {@required DateTime time,
      @required int actorId,
      @required String roomName,
      String parentRoomName}) = _$VisitRecord._;

  VisitRecord._();

  int get actorId;

  @nullable
  String get parentRoomName;

  String get roomName;

  @override
  DateTime get time;
}
