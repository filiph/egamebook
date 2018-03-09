library stranded.history;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:meta/meta.dart';

part 'history.g.dart';

abstract class QueryResult<T extends Record> {
  bool get hasHappened;
  T get latest;
}

abstract class Record {
  DateTime get time;
}

abstract class RuleHistory implements Built<RuleHistory, RuleHistoryBuilder> {
  factory RuleHistory([void updates(RuleHistoryBuilder b)]) = _$RuleHistory;

  RuleHistory._();

  BuiltMap<int, RuleRecord> get records;

  SingleQueryResult<RuleRecord> query(int ruleId) {
    return new SingleQueryResult(records[ruleId]);
  }
}

class RuleRecord implements Record {
  int ruleId;

  @override
  DateTime time;

  RuleRecord(this.ruleId, this.time);
}

class SerialQueryResult<T extends Record> implements QueryResult<T> {
  Iterable<T> _records;

  bool _walked = false;

  SerialQueryResult(this._records);

  @override
  bool get hasHappened {
    _checkUnwalked();

    for (final _ in _records) {
      return true;
    }

    return false;
  }

  @override
  T get latest {
    _checkUnwalked();

    for (final record in _records) {
      return record;
    }

    return null;
  }

  /// Ensures that the [_records] iterable isn't walked more than once. This
  /// means that [QueryResult] can only be used once.
  void _checkUnwalked() {
    if (_walked) throw new StateError("Trying to walk query twice.");
    _walked = true;
  }
}

class SingleQueryResult<T extends Record> implements QueryResult<T> {
  T _record;

  SingleQueryResult(this._record);

  @override
  bool get hasHappened => _record != null;

  @override
  T get latest => _record;
}

abstract class VisitHistory
    implements Built<VisitHistory, VisitHistoryBuilder> {
  factory VisitHistory([void updates(VisitHistoryBuilder b)]) = _$VisitHistory;

  VisitHistory._();

  BuiltListMultimap<int, VisitRecord> get records;

  VisitHistory add(
      DateTime time, int actorId, String roomName, {String parentRoomName}) {
    final key = getKey(actorId);
    return rebuild((b) => b
      ..records.add(
          key,
          new VisitRecord(
              time: time,
              actorId: actorId,
              roomName: roomName,
              parentRoomName: parentRoomName)));
  }

  SerialQueryResult<VisitRecord> query(int actorId, String roomName,
      {bool includeVariants: false}) {
    assert(actorId != null);
    assert(roomName != null);
    final key = getKey(actorId);
    return new SerialQueryResult(records[key].where((rec) {
      if (rec.roomName == roomName) return true;
      if (includeVariants && rec.parentRoomName == roomName) return true;
      return false;
    }));
  }

  /// Visits are grouped by actors.
  ///
  /// We can't go more specific, because for visits of variants, it's
  /// not clear whether to index by variant room name, or parent room name.
  static int getKey(int actorId) => actorId;
}

abstract class VisitRecord
    implements Record, Built<VisitRecord, VisitRecordBuilder> {
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
