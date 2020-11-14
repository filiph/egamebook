library stranded.history.action;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/history/history.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';

part 'action_history.g.dart';

/// A record of all visits made to any room by any actor.
abstract class ActionHistory
    implements Built<ActionHistory, ActionHistoryBuilder> {
  static Serializer<ActionHistory> get serializer => _$actionHistorySerializer;

  factory ActionHistory([void updates(ActionHistoryBuilder b)]) =
      _$ActionHistory;

  ActionHistory._();

  /// A record of the latest aggressive action by one actor to another.
  ///
  /// The key of the map is a hash from [Actor.hashTwoActorIds]: the first
  /// [Actor.id] is the protagonist, the second is the sufferer.
  ///
  /// The value is the latest time the protagonist was aggressive towards
  /// the sufferer.
  ///
  /// This map is set from [WorldStateBuilder.recordAction].
  ///
  /// This is a performance optimization, because we're checking this a lot
  /// in [Actor.hates].
  BuiltMap<int, DateTime> get latestAggression;

  /// A record of the latest actions made by each actor.
  ///
  /// The actions are represented solely by their `DateTime`, and actors
  /// by their [Actor.id].
  BuiltMap<int, DateTime> get latestByActorId;

  /// A record of the latest _proactive_ actions made by each actor.
  ///
  /// The actions are represented solely by their `DateTime`, and actors
  /// by their [Actor.id].
  BuiltMap<int, DateTime> get latestProactiveByActorId;

  /// A list of [ActionRecord]s in chronological order (last record is most
  /// recent).
  BuiltList<ActionRecord> get records;

  /// Builds a string describing the history so far.
  String describe() {
    var all = List<ActionRecord>.from(records);
    all.sort((a, b) => a.time.compareTo(b.time));
    return all.map((a) => a.description).join(' -> ');
  }

  /// Returns the latest action performed by anyone. This is an expensive
  /// function.
  ActionRecord getLatest() => records.last;

  /// Returns the latest time when [actor] made any kind of proactive action.
  DateTime getLatestProactiveTime(Actor actor) =>
      latestProactiveByActorId[actor.id];

  /// Returns the latest time when [actor] made any kind of action.
  DateTime getLatestTime(Actor actor) => latestByActorId[actor.id];

  /// Returns the record for the particular set of parameters, in **reverse**
  /// chronological order.
  SerialQueryResult<ActionRecord> query(
      {String actionName,
      Actor actor,
      Actor sufferer,
      bool wasSuccess,
      bool wasAggressive}) {
    /// Filter the actions
    Iterable<ActionRecord> filtered = records.reversed.where((record) {
      if (actionName != null && record.actionName != actionName) return false;
      if (actor != null && record.protagonist != actor.id) return false;
      if (sufferer != null && !record.sufferers.contains(sufferer.id)) {
        return false;
      }
      if (wasSuccess != null && record.wasSuccess != wasSuccess) return false;
      if (wasAggressive != null && record.wasAggressive != wasAggressive) {
        return false;
      }
      return true;
    });

    return SerialQueryResult(filtered);
  }

  /// Returns `true` if the action has ever happened.
  bool hasHappened(
      {String actionName,
      Actor actor,
      Actor sufferer,
      bool wasSuccess,
      bool wasAggressive}) {
    return query(
            actionName: actionName,
            actor: actor,
            sufferer: sufferer,
            wasSuccess: wasSuccess,
            wasAggressive: wasAggressive)
        .hasHappened;
  }
}

/// A record of some event action that transpired.
@immutable
abstract class ActionRecord
    implements Built<ActionRecord, ActionRecordBuilder>, Record {
  static Serializer<ActionRecord> get serializer => _$actionRecordSerializer;

  factory ActionRecord([void updates(ActionRecordBuilder b)]) = _$ActionRecord;

  // ignore: prefer_const_constructors_in_immutables
  ActionRecord._();

  String get actionName;

  /// Additional data that a specific type of [Action] could save.
  ///
  /// For example, a "VisitArea" action could save the unique name of the area
  /// visited, so that later the game can check whether an area has been
  /// seen by the player.
  @nullable
  String get dataString;

  String get description;

  /// The [Actor.id] of the protagonist. The single person responsible for
  /// this action.
  ///
  /// When set to `null`, it means "environment" is to blame.
  ///
  /// The actor is represented by his/her [Actor.id] since we only care about
  /// his/her identity, not his/her state at the time of action.
  int get protagonist;

  /// The actors that have been subjected to this action as targets.
  ///
  /// IMPLEMENTATION DETAIL: Currently, maximum one sufferer is ever added.
  /// In the future, we want to be able to have actions with broad effects.
  BuiltSet<int> get sufferers;

  /// Specifies at what WorldState time this ActionRecord took place.
  @override
  DateTime get time;

  /// Specifies whether this action was _intentionally_ harmful towards
  /// the [sufferers].
  bool get wasAggressive;

  bool get wasFailure;

  /// Specifies whether this action was proactive (as opposed to being
  /// a reaction to another actor's action).
  bool get wasProactive;

  bool get wasSuccess;

  @override
  String toString() => "ActionRecord<$actionName, $description>";
}
