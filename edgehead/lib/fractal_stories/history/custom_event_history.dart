// @dart=2.9

library stranded.history.custom_event;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/history/history.dart';
import 'package:meta/meta.dart';

part 'custom_event_history.g.dart';

abstract class CustomEvent
    implements Record, Built<CustomEvent, CustomEventBuilder> {
  /// An event that marks death of an actor with [actorId].
  static const String actorDeath = 'actor_death';

  /// Marks a successful necromancy when nowhere near a normal corpse
  /// (which results in raising an insect, like a housefly).
  static const String actorRaisedInsect = 'raised_insect';

  /// Marks the raising of [actorId].
  static const String actorRaisingUndead = 'actor_turning_undead';

  /// Marks when an insect was put to rest.
  static const String actorPuttingInsectToRest = 'put_insect_to_rest';

  /// Marks putting an undead actor to rest.
  static const String actorPuttingUndeadToRest = 'actor_undead_put_to_rest';

  static Serializer<CustomEvent> get serializer => _$customEventSerializer;

  factory CustomEvent({
    @required DateTime time,
    @required String name,
    int actorId,
    Object data,
  }) = _$CustomEvent._;

  CustomEvent._();

  /// [Actor.id] of the actor to which the event is attached.
  ///
  /// It should be clear from [name] what exactly this field means. For example,
  /// for an event called `"fell_down"`, it's clear that the [actorId] is
  /// referring to the actor who fell down. As another example, for an event
  /// called `"performed_a_kill"`, it's clear that the [actorId] is referring
  /// to the actor who did the killing. On the other hand, a [name] such
  /// as `"kill"` is very unclear. You might not guess correctly whether the
  /// [actorId] refers to the attacker or the victim.
  @nullable
  int get actorId;

  /// Additional data for the event. Optional and untyped.
  ///
  /// You need to make sure this is serializable.
  @nullable
  Object get data;

  /// A custom name of the event. There is no namespacing, so choose as unique
  /// a name as possible.
  String get name;

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
  ///
  /// If you provide [actorId], only events with a corresponding
  /// [CustomEvent.actorId] will be returned.
  SerialQueryResult<CustomEvent> query(
      {@required String name, int actorId, Object data}) {
    final key = getKey(name);
    if (!records.containsKey(key)) return SerialQueryResult(const []);
    var results = records[key].reversed;
    if (actorId != null) {
      results = results.where((event) => event.actorId == actorId);
    }
    if (data != null) {
      results = results.where((event) => event.data == data);
    }
    return SerialQueryResult(results);
  }

  static String getKey(String eventName) => eventName;
}
