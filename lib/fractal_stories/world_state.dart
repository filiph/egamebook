library stranded.world_state;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/action_record.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';

part 'world_state.g.dart';

abstract class WorldState extends Built<WorldState, WorldStateBuilder> {
  static Serializer<WorldState> get serializer => _$worldStateSerializer;

  factory WorldState([void updates(WorldStateBuilder b)]) = _$WorldState;

  WorldState._();

  /// A 'memory' of actions. The queue is in reverse chronological order,
  /// with the latest record at the beginning of the queue. This is because
  /// we often want to process only the latest (or the latest few) records.
  BuiltList<ActionRecord> get actionRecords;

  /// All the actors currently in the game.
  BuiltSet<Actor> get actors;

  /// The situation on the top of the stack.
  Situation get currentSituation {
    if (situations.isEmpty) return null;
    return situations.last;
  }

  /// The global flags and counters that make up the state of the world that
  /// doesn't fit into [actors], [actionRecords], etc.
  ///
  /// Use this as sparingly as possible. Flags can be often avoided by checking
  /// for specific past actions (has "kill_jack" been performed? then Jack is
  /// dead and we don't need that flag).
  ///
  /// This object must have a hash code that is value-based so that globals
  /// with the same state have the same [Object.hashCode].
  Object get global;

  /// A stack of situations. The top-most (last) one is the [currentSituation].
  ///
  /// This is a push-down automaton.
  BuiltList<Situation> get situations;

  /// The age of this WorldState. Every 'turn', this number increases by one.
  DateTime get time;

  /// A record of all visits made by any actor to any room.
  VisitHistory get visitHistory;

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

  /// Returns `true` if action with [Action.name] equal to [name] has never been
  /// used, regardless if it was used successfully or not.
  bool actionNeverUsed(String name) {
    return timeSinceLastActionRecord(actionName: name) == null;
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
    assert(actors.where((actor) => actor.id == id).length > 0,
        "No actor of id=$id in world: $this.");
    assert(actors.where((actor) => actor.id == id).length < 2,
        "Too many actors of id=$id in world: $this.");
    return actors.singleWhere((actor) => actor.id == id);
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
  S getSituationByName<S extends Situation>(String situationName) {
    for (int i = situations.length - 1; i >= 0; i--) {
      if (situations[i].name == situationName) {
        return situations[i] as S;
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

  bool situationExists(int situationId) =>
      _findSituationIndex(situationId) != null;

  /// Returns number of seconds since an [ActionRecord] that conforms to
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
      return record.time.difference(time).inSeconds;
    }
    return null;
  }

  @override
  String toString() => "World<${actors.toSet()}>";

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

abstract class WorldStateBuilder
    implements Builder<WorldState, WorldStateBuilder> {
  ListBuilder<ActionRecord> actionRecords;

  SetBuilder<Actor> actors;

  Object global;

  ListBuilder<Situation> situations;

  DateTime time;

  VisitHistoryBuilder visitHistory;

  factory WorldStateBuilder() = _$WorldStateBuilder;

  WorldStateBuilder._();

  /// The situation on the top of the stack.
  Situation get currentSituation => build().currentSituation;

  bool actionHasBeenPerformed(String actionName) =>
      build().actionHasBeenPerformed(actionName);

  bool actionHasBeenPerformedSuccessfully(String actionName) =>
      build().actionHasBeenPerformedSuccessfully(actionName);

  /// Returns `true` if action that satisfies [actionNamePattern] is currently
  /// being performed.
  ///
  /// This is for cases like when a room description needs to know whether
  /// player has arrived via a cart or on foot.
  @deprecated
  bool actionIsBeingPerformed(
      ActionContext context, Pattern actionNamePattern) {
    if (context.currentAction == null) return false;
    return context.currentAction.name.contains(actionNamePattern);
  }

  void elapseSituationTimeIfExists(int situationId) {
    int index = build()._findSituationIndex(situationId);
    if (index == null) {
      return;
    }

    situations[index] = situations[index].elapseTime();
  }

  void elapseWorldTime() {
    time = time.add(const Duration(seconds: 1));
  }

  Actor getActorById(int id) {
    return build().getActorById(id);
  }

  Situation getSituationById(int situationId) =>
      build().getSituationById(situationId);

  S getSituationByName<S extends Situation>(String situationName) =>
      build().getSituationByName<S>(situationName);

  void popSituation(Simulation sim) {
    var removal = situations.build().last;
    removal.onPop(sim, this);
    // The onPop function could have added another situation to the stack,
    // so we can't use `situations.removeLast()`.
    situations.remove(removal);
  }

  void popSituationsUntil(String situationName, Simulation sim) {
    var built = situations.build();
    final originalLength = built.length;
    assert(built.isNotEmpty, "Tried popping situations from an empty stack.");
    while (built.isNotEmpty && built.last.name != situationName) {
      popSituation(sim);
      built = situations.build();
    }
    assert(
        built.isNotEmpty,
        "Tried to pop situations until $situationName "
        "but none was found in stack.");
    assert(built.length < originalLength,
        "popSituationsUntil($situationName) had no effect");
  }

  void pushSituation(Situation situation) {
    situations.add(situation);
  }

  void recordVisit(WorldStateBuilder w, Actor actor, Room room) {
    final key = VisitHistory.getKey(room);
    visitHistory.records.add(
        key,
        new VisitRecord(
            time: w.time,
            actorId: actor.id,
            roomName: room.name,
            parentRoomName: room.parent));
  }

  void replaceSituationById<T extends Situation>(int id, T updatedSituation) {
    int index = this.build()._findSituationIndex(id);
    if (index == null) {
      throw new ArgumentError("Situation with id $id does not "
          "exist in $situations");
    }
    situations[index] = updatedSituation;
  }

  void updateActorById(int id, void updates(ActorBuilder b)) {
    var original = getActorById(id);
    var updated = original.rebuild(updates);
    actors.remove(original);
    actors.add(updated);
  }
}

/// The object that contains custom state.
///
/// Often, these are flags like `visitedCastle` or `orcsKilled`. Most other
/// things can be saved in action records (the history of the game)
/// and in actors themselves.
abstract class WorldStateFlags {
  // Empty. Just for type checking for now.
  // TODO: actually implement after following bug is fixed:
  //       https://github.com/google/built_value.dart/issues/280
}
