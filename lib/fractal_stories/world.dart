library stranded.world;

import 'package:quiver/core.dart';

import 'action_record.dart';
import 'actor.dart';
import 'item.dart';
import 'location.dart';
import 'situation.dart';

class WorldState {
  final Set<Actor> actors;
  final Set<Item> items;
  final Set<ActionRecord> actionRecords;
  final Set<Location> locations;

  /// A stack of situations. The top-most (first) one is the [currentSituation].
  ///
  /// This is a push-down automaton.
  final List<Situation> situations;

  Situation get currentSituation =>
      situations.isNotEmpty ? situations.last : null;

  /// The age of this WorldState. Every 'turn', this number increases by one.
  int time;

  WorldState(this.actors, Situation startingSituation)
      : actionRecords = new Set(),
        items = new Set(),
        locations = new Set(),
        situations = new List.from([startingSituation]),
        time = 0;

  /// Creates a deep clone of [other].
  WorldState.duplicate(WorldState other)
      : actors = new Set<Actor>(),
        actionRecords = new Set<ActionRecord>(),
        items = new Set<Item>(),
        locations = new Set(),
        situations = new List() {
    actors.addAll(other.actors);
    // TODO: duplicateActionRecord, item, etc.
    actionRecords.addAll(other.actionRecords
        .map((otherRecord) => new ActionRecord.duplicate(otherRecord)));
    items.addAll(other.items);
    locations.addAll(other.locations
        .map((otherLocation) => new Location.duplicate(otherLocation)));
    situations.addAll(other.situations);

    time = other.time;
  }

  Actor getActorById(int id) => actors.singleWhere((actor) => actor.id == id);

  void updateActorById(int id, updates(ActorBuilder b)) {
    var original = getActorById(id);
    var updated = original.rebuild(updates);
    actors.remove(original);
    actors.add(updated);
  }

  void updateSituationById(int id, updates(SituationBuilder b)) {
    int index = _findSituationIndex(id);
    if (index == null) return;

    situations[index] = situations[index].rebuild(updates);
  }

  void elapseTime() {
    time += 1;
  }

  @override
  int get hashCode {
    return hash4(hashObjects(actors), hashObjects(actionRecords),
        hashObjects(situations), time);
  }

  bool operator ==(o) => o is WorldState && hashCode == o.hashCode;

  toString() => "World<${actors.toSet()}>";

  void pushSituation(Situation situation) {
    situations.add(situation);
  }

  void popSituation() {
    situations.removeLast();
  }

  void popSituationsUntil(String situationName) {
    while (
        situations.isNotEmpty && situations.last.state.name != situationName) {
      situations.removeLast();
    }
    if (situations.isEmpty) {
      throw new ArgumentError("Tried to pop situations until $situationName "
          "but none was found in stack.");
    }
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

  Situation getSituationById(int situationId) {
    int index = _findSituationIndex(situationId);
    if (index == null) return null;
    return situations[index];
  }
}
