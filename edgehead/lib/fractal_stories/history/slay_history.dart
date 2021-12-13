library stranded.history.slay;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/history/history.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:meta/meta.dart';

part 'slay_history.g.dart';

/// A record of all the times any actor slayed monsters in any room.
abstract class SlayHistory implements Built<SlayHistory, SlayHistoryBuilder> {
  static Serializer<SlayHistory> get serializer => _$slayHistorySerializer;

  factory SlayHistory([void updates(SlayHistoryBuilder b)]) = _$SlayHistory;

  SlayHistory._();

  /// A map from keys (as defined by [SlayHistory.getKey]) to iterables
  /// of stored [SlayRecord]s.
  ///
  /// The records are grouped for faster access.
  BuiltListMultimap<String, SlayRecord> get records;

  /// Returns the record for the particular [room].
  ///
  /// By default, this only asks for record of the particular variant of the
  /// room. If you don't care what state the room was in when the actor
  /// visited it, set [includeVariants] to `true`.
  ///
  /// This doesn't care which actor finished the fight ([SlayRecord.actorId]).
  SerialQueryResult<SlayRecord> query(Room room,
      {bool includeVariants = false}) {
    assert(room != null);
    final key = getKey(room);
    return SerialQueryResult(records[key].where((rec) {
      if (rec.roomName == room.name) return true;
      if (includeVariants) {
        if (rec.parentRoomName != null) {
          if (rec.parentRoomName == room.name) return true;
          if (rec.parentRoomName == room.parent) return true;
        }
        if (room.parent != null) {
          if (rec.roomName == room.parent) return true;
        }
      }
      return false;
    }));
  }

  /// Slayings are grouped by rooms. More specifically, they are grouped by
  /// names of rooms, or names of parent rooms if applicable.
  ///
  /// We can't go more specific, because for slayings in variants, it's
  /// not clear whether to index by variant room name, or parent room name.
  /// So we always go with parent room name.
  static String getKey(Room room) => room.parent ?? room.name;
}

abstract class SlayRecord
    implements Record, Built<SlayRecord, SlayRecordBuilder> {
  static Serializer<SlayRecord> get serializer => _$slayRecordSerializer;

  factory SlayRecord(
      {required DateTime time,
      required int actorId,
      required String roomName,
      String? parentRoomName}) = _$SlayRecord._;

  SlayRecord._();

  /// The [Actor.id] of the actor who finished the deed (last kill).
  /// Not necessarily the player.
  int get actorId;

  String? get parentRoomName;

  String get roomName;

  @override
  DateTime get time;
}
