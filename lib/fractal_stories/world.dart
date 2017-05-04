library stranded.world;

import 'dart:collection';

import 'package:edgehead/fractal_stories/util/throw_if_duplicate.dart';
import 'package:quiver/core.dart';

import 'action_record.dart';
import 'actor.dart';
import 'item.dart';
import 'room.dart';
import 'situation.dart';

class WorldState {
  final Set<Actor> actors;
  final Set<Item> items;

  /// A 'memory' of actions. The queue is in reverse chronological order,
  /// with the latest record at the beginning of the queue. This is because
  /// we often want to process only the latest (or the latest few) records.
  final Queue<ActionRecord> actionRecords;

  final Set<Room> rooms;

  /// A stack of situations. The top-most (first) one is the [currentSituation].
  ///
  /// This is a push-down automaton.
  final List<Situation> situations;

  /// The age of this WorldState. Every 'turn', this number increases by one.
  int time;

  WorldState(
      Iterable<Actor> actors, Iterable<Room> rooms, Situation startingSituation)
      : actors = new Set<Actor>.from(actors),
        actionRecords = new Queue<ActionRecord>(),
        items = new Set<Item>(),
        rooms = new Set<Room>.from(rooms),
        situations = new List<Situation>.from([startingSituation]),
        time = 0;

  /// Creates a deep clone of [other].
  WorldState.duplicate(WorldState other)
      : actors = new Set<Actor>(),
        actionRecords = new Queue<ActionRecord>(),
        items = new Set<Item>(),
        rooms = new Set(),
        situations = new List() {
    actors.addAll(other.actors);
    actionRecords.addAll(other.actionRecords);
    items.addAll(other.items);
    rooms.addAll(other.rooms);
    situations.addAll(other.situations);

    assert(!hasDuplicities(actors.map((a) => a.id)));
    assert(!hasDuplicities(rooms.map((r) => r.name)));

    time = other.time;
  }

  Situation get currentSituation =>
      situations.isNotEmpty ? situations.last : null;

  @override
  int get hashCode {
    return hash4(hashObjects(actors), hashObjects(actionRecords),
        hashObjects(situations), time);
  }

  @override
  bool operator ==(Object o) => o is WorldState && hashCode == o.hashCode;

  void elapseSituationTime(int situationId) {
    int index = _findSituationIndex(situationId);
    if (index == null) {
      throw new StateError("Tried to elapseSituationTime of situation "
          "id=$situationId that doesn't exist in situations ($situations).");
    }

    situations[index] = situations[index].elapseTime();
  }

  void elapseTime() {
    time += 1;
  }

  /// Returns a lazy iterable of action records conforming to specified input,
  /// in reverse chronological order.
  ///
  /// When none of the named parameters is provided, all [actionRecords] are
  /// returned.
  Iterable<ActionRecord> getActionRecords(
      {Pattern actionNamePattern,
      Actor protagonist,
      Actor sufferer,
      bool wasSuccess,
      bool wasAggressive}) {
    Iterable<ActionRecord> records = actionRecords;
    if (actionNamePattern != null) {
      records =
          records.where((rec) => rec.actionName.contains(actionNamePattern));
    }
    if (protagonist != null) {
      records = records.where((rec) => rec.protagonist == protagonist.id);
    }
    if (sufferer != null) {
      records = records.where((rec) => rec.sufferers.contains(sufferer.id));
    }
    if (wasSuccess != null) {
      records = records.where((rec) => rec.wasSuccess == wasSuccess);
    }
    if (wasAggressive != null) {
      records = records.where((rec) => rec.wasAggressive == wasAggressive);
    }
    return records;
  }

  /// Returns number of turns since an [ActionRecord] that conforms to
  /// the specified named parameters was performed.
  ///
  /// Returns `null` when such a record doesn't exist.
  int timeSinceLastActionRecord(
      {Pattern actionNamePattern,
      Actor protagonist,
      Actor sufferer,
      bool wasSuccess,
      bool wasAggressive}) {
    var records = getActionRecords(
        actionNamePattern: actionNamePattern,
        protagonist: protagonist,
        sufferer: sufferer,
        wasSuccess: wasSuccess,
        wasAggressive: wasAggressive);
    for (var record in records) {
      return time - record.time;
    }
    return null;
  }

  /// Returns `true` if action that satisfies [actionNamePattern] has been
  /// _successfully_ performed, ever.
  ///
  /// To satisfie [actionNamePattern], the [Action.name] must contain the
  /// pattern.
  bool actionHasBeenPerformed(Pattern actionNamePattern) {
    var records = getActionRecords(actionNamePattern: actionNamePattern,
      wasSuccess: true);
    for (var _ in records) {
      return true;
    }
    return false;
  }

  Actor getActorById(int id) => actors.singleWhere((actor) => actor.id == id);

  Room getRoomByName(String roomName) {
    assert(
        rooms.any((room) => room.name == roomName),
        "Room with name $roomName not defined.\n"
        "Rooms: ${rooms.map((r) => r.name).join(', ')}.\n"
        "Current world: $this.");
    return rooms.singleWhere((room) => room.name == roomName);
  }

  Situation getSituationById(int situationId) {
    int index = _findSituationIndex(situationId);
    if (index == null) return null;
    return situations[index];
  }

  /// Returns the [Situation] of the provided [situationName] that is highest
  /// on the [situations] stack.
  ///
  /// [situationName] must correspond to [Situation.name]. So this is really
  /// finding situations by type. That is why this is a generic method. The
  /// intended use can look like this:
  ///
  ///     var s = world.getSituationByName<SomeSituation>("SomeSituation");
  ///
  /// Throws an [ArgumentError] if there is no Situation of that name on the
  /// stack.
  T getSituationByName<T extends Situation>(String situationName) {
    for (int i = situations.length - 1; i >= 0; i--) {
      if (situations[i].name == situationName) {
        return situations[i] as T;
      }
    }
    throw new ArgumentError("No situation with name=$situationName found.");
  }

  bool actionNeverUsed(String name) {
    return timeSinceLastActionRecord(actionNamePattern: name) == null;
  }

  bool hasAliveActor(int actorId) {
    var actor =
        actors.firstWhere((actor) => actor.id == actorId, orElse: () => null);
    if (actor == null) return false;
    return actor.isAlive;
  }

  void popSituation() {
    situations.last.onPop(this);
    situations.removeLast();
  }

  void popSituationsUntil(String situationName) {
    while (situations.isNotEmpty && situations.last.name != situationName) {
      popSituation();
    }
    if (situations.isEmpty) {
      throw new ArgumentError("Tried to pop situations until $situationName "
          "but none was found in stack.");
    }
  }

  void pushSituation(Situation situation) {
    situations.add(situation);
  }

  bool situationExists(int situationId) =>
      _findSituationIndex(situationId) != null;

  @override
  String toString() => "World<${actors.toSet()}>";

  void updateActorById(int id, updates(ActorBuilder b)) {
    var original = getActorById(id);
    var updated = original.rebuild(updates);
    actors.remove(original);
    actors.add(updated);
  }

  void replaceSituationById<T extends Situation>(int id, T updatedSituation) {
    int index = _findSituationIndex(id);
    if (index == null) {
      throw new ArgumentError("Situation with id $id does not "
          "exist in $situations");
    }
    situations[index] = updatedSituation;
  }

  /// Returns the index at which the [Situation] with [situationId] resides
  /// in the [situations] list.
  int _findSituationIndex(int situationId) {
    int index;
    for (int i = 0; i < situations.length; i++) {
      if (situations[i].id == situationId) {
        index = i;
        break;
      }
    }
    return index;
  }
}
