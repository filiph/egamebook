library stranded.history.custom_event;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/history/history.dart';
import 'package:meta/meta.dart';

part 'custom_event_history.g.dart';

abstract class CustomEvent
    implements Record, Built<CustomEvent, CustomEventBuilder> {
  static Serializer<CustomEvent> get serializer => _$customEventSerializer;

  factory CustomEvent(
      {@required DateTime time,
      @required String name,
      Object data}) = _$CustomEvent._;

  CustomEvent._();

  String get name;

  @nullable
  Object get data;

  @override
  DateTime get time;
}

/// A record of all visits made to any room by any actor.
abstract class CustomEventHistory
    implements Built<CustomEventHistory, CustomEventHistoryBuilder> {
  static Serializer<CustomEventHistory> get serializer =>
      _$customEventHistorySerializer;

  factory CustomEventHistory([void updates(CustomEventHistoryBuilder b)]) =
      _$CustomEventHistory;

  CustomEventHistory._();

  /// A map from keys (as defined by [CustomEventHistory.getKey]) to iterables
  /// of stored [CustomEvent]s.
  ///
  /// The records are grouped for faster access.
  BuiltListMultimap<String, CustomEvent> get records;

  /// Returns the record of custom events.
  ///
  /// [name] is currently a required argument but might be optional in future
  /// versions.
  SerialQueryResult<CustomEvent> query({@required String name}) {
    final key = getKey(name);
    if (!records.containsKey(key)) return new SerialQueryResult(const []);
    return new SerialQueryResult(records[key]);
  }

  static String getKey(String eventName) => eventName;
}
