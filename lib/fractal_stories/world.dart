library stranded.world;

import 'dart:collection';

import 'package:edgehead/fractal_stories/action.dart';
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

  /// The global flags and counters that make up the state of the world.
  ///
  /// Use this as sparingly as possible. Flags can be often avoided by checking
  /// for specific past actions (has "kill_jack" been performed? then Jack is
  /// dead and we don't need that flag).
  ///
  /// This object must have a hash code that is value-based so that globals
  /// with the same state have the same [Object.hashCode].
  dynamic global;

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

  /// This is normally `null` but is set to the current action when that action
  /// is being applied.
  ///
  /// This is so that, for example, descriptions of Rooms can access this
  /// information and provide text according to how the Room is being reached.
  ///
  /// TODO: This should exist in the 'mutable' WorldState while the immutable
  ///       worldstate shouldn't have this. Since, today, immutability of
  ///       WorldState outside action application is merely a convention, we
  ///       have it here.
  Action currentAction;

  WorldState(Iterable<Actor> actors, Iterable<Room> rooms,
      Situation startingSituation, this.global)
      : actors = new Set<Actor>.from(actors),
        actionRecords = new Queue<ActionRecord>(),
        items = new Set<Item>(),
        rooms = new Set<Room>.from(rooms),
        situations = new List<Situation>.from([startingSituation]),
        time = 0;

  /// Creates a deep clone of [other]. TODO: use BuiltValue here as well.
  WorldState.duplicate(WorldState other)
      : actors = new Set<Actor>(),
        actionRecords = new Queue<ActionRecord>(),
        items = new Set<Item>(),
        rooms = new Set(),
        situations = new List(),
        global = other.global {
    actors.addAll(other.actors);
    actionRecords.addAll(other.actionRecords);
    items.addAll(other.items);
    rooms.addAll(other.rooms);
    situations.addAll(other.situations);

    assert(!hasDuplicities(actors.map((a) => a.id)));
    assert(!hasDuplicities(rooms.map((r) => r.name)));

    time = other.time;

    assert(
        other.currentAction == null,
        "currentAction should only be non-null "
        "during application of an action.");
  }

  Situation get currentSituation =>
      situations.isNotEmpty ? situations.last : null;

  @override
  int get hashCode {
    return hash4(hashObjects(actors), hashObjects(actionRecords),
        hashObjects(situations), hash2(time, global));
  }

  @override
  bool operator ==(Object o) => o is WorldState && hashCode == o.hashCode;

  /// Returns `true` if any action in the action records (past actions)
  /// has the [Action.name] of [actionName] and was ever performed
  /// _successfully_.
  bool actionHasBeenPerformedSuccessfully(String actionName) {
    var records = getActionRecords(actionName: actionName, wasSuccess: true);
    for (var _ in records) {
      return true;
    }
    return false;
  }

  /// Returns `true` if any action in the action records (past actions)
  /// has the [Action.name] of [actionName].
  ///
  /// This returns `true` regardless of success or failure.
  bool actionHasBeenPerformed(String actionName) {
    var records = getActionRecords(actionName: actionName);
    for (var _ in records) {
      return true;
    }
    return false;
  }

  /// Returns `true` if action that satisfies [actionNamePattern] is currently
  /// being performed.
  ///
  /// This is for cases like when a room description needs to know whether
  /// player has arrived via a cart or on foot.
  bool actionIsBeingPerformed(Pattern actionNamePattern) {
    if (currentAction == null) return false;
    return currentAction.name.contains(actionNamePattern);
  }

  /// Returns `true` if action with [Action.name] equal to [name] has never been
  /// used, regardless if it was used successfully or not.
  bool actionNeverUsed(String name) {
    return timeSinceLastActionRecord(actionName: name) == null;
  }

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
      {String actionName,
      Actor protagonist,
      Actor sufferer,
      bool wasSuccess,
      bool wasAggressive}) {
    Iterable<ActionRecord> records = actionRecords;
    if (actionName != null) {
      records = records.where((rec) => rec.actionName == actionName);
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

  Actor getActorById(int id) {
    assert(actors.where((actor) => actor.id == id).length == 1,
        "Too many actors of id=$id in world: $this");
    return actors.singleWhere((actor) => actor.id == id);
  }

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

  void replaceSituationById<T extends Situation>(int id, T updatedSituation) {
    int index = _findSituationIndex(id);
    if (index == null) {
      throw new ArgumentError("Situation with id $id does not "
          "exist in $situations");
    }
    situations[index] = updatedSituation;
  }

  bool situationExists(int situationId) =>
      _findSituationIndex(situationId) != null;

  /// Returns number of turns since an [ActionRecord] that conforms to
  /// the specified named parameters was performed.
  ///
  /// Returns `null` when such a record doesn't exist.
  int timeSinceLastActionRecord(
      {String actionName,
      Actor protagonist,
      Actor sufferer,
      bool wasSuccess,
      bool wasAggressive}) {
    var records = getActionRecords(
        actionName: actionName,
        protagonist: protagonist,
        sufferer: sufferer,
        wasSuccess: wasSuccess,
        wasAggressive: wasAggressive);
    for (var record in records) {
      return time - record.time;
    }
    return null;
  }

  @override
  String toString() => "World<${actors.toSet()}>";

  void updateActorById(int id, updates(ActorBuilder b)) {
    var original = getActorById(id);
    var updated = original.rebuild(updates);
    actors.remove(original);
    actors.add(updated);
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
