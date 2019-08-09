library stranded.world_state;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/history/action_history.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/history/rule_history.dart';
import 'package:edgehead/fractal_stories/history/visit_history.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:meta/meta.dart';

part 'world_state.g.dart';

/// A reusable instance of [StatefulRandom]. Never use this before
/// first calling [StatefulRandom.loadState].
final _rnd = StatefulRandom(42);

abstract class WorldState implements Built<WorldState, WorldStateBuilder> {
  static Serializer<WorldState> get serializer => _$worldStateSerializer;

  factory WorldState([void updates(WorldStateBuilder b)]) = _$WorldState;

  WorldState._();

  /// A 'memory' of actions.
  ActionHistory get actionHistory;

  /// All the actors currently in the game.
  BuiltSet<Actor> get actors;

  /// The situation on the top of the stack.
  Situation get currentSituation {
    if (situations.isEmpty) return null;
    return situations.last;
  }

  /// History of custom events, such as "killed Akatosh" or "saw rainbow".
  CustomEventHistory get customHistory;

  /// The global flags and counters that make up the state of the world that
  /// doesn't fit into [actors], [actionRecords], etc.
  ///
  /// Use this as sparingly as possible. Flags can be often avoided by checking
  /// for specific past actions (has "kill_jack" been performed? then Jack is
  /// dead and we don't need that flag).
  ///
  /// This object must have a hash code that is value-based so that globals
  /// with the same state have the same [Object.hashCode].
  @nullable
  WorldStateFlags get global;

  /// The history of rules as they were triggered through different rulesets.
  RuleHistory get ruleHistory;

  /// A stack of situations. The top-most (last) one is the [currentSituation].
  ///
  /// This is a push-down automaton.
  BuiltList<Situation> get situations;

  /// The state of statefulRandom. This is changed every time
  /// [WorldStateBuilder.randomInt] or [WorldStateBuilder.randomDouble]
  /// or [WorldStateBuilder.randomChoose] is called.
  int get statefulRandomState;

  /// The age of this WorldState. Every 'turn', this number increases by one.
  DateTime get time;

  /// A record of all visits made by any actor to any room.
  VisitHistory get visitHistory;

  /// Returns `true` if any action in the action records (past actions)
  /// has the [Action.name] of [actionName].
  ///
  /// This returns `true` regardless of success or failure.
  bool actionHasBeenPerformed(String actionName) {
    return actionHistory.hasHappened(actionName: actionName);
  }

  /// Returns `true` if any action in the action records (past actions)
  /// has the [Action.name] of [actionName] and was ever performed
  /// _successfully_.
  bool actionHasBeenPerformedSuccessfully(String actionName) {
    return actionHistory
        .query(actionName: actionName, wasSuccess: true)
        .hasHappened;
  }

  /// Returns `true` if action with [Action.name] equal to [name] has never been
  /// used, regardless if it was used successfully or not.
  bool actionNeverUsed(String actionName) {
    return !actionHasBeenPerformed(actionName);
  }

  Actor getActorById(int id) {
    assert(actors.where((actor) => actor.id == id).isNotEmpty,
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
    throw ArgumentError("No situation with name=$situationName found.");
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
    final latest = actionHistory
        .query(
            actionName: actionName,
            actor: protagonist,
            sufferer: sufferer,
            wasSuccess: wasSuccess,
            wasAggressive: wasAggressive)
        .latest;
    if (latest == null) {
      // ignore: avoid_returning_null
      return null;
    }
    return time.difference(latest.time).inSeconds;
  }

  /// Returns number of seconds since a [CustomEvent] that conforms to
  /// the specified named parameters occurred.
  ///
  /// Returns `null` when such a record doesn't exist.
  int timeSinceLastCustomRecord({@required String name, int actorId}) {
    final latest = customHistory.query(name: name, actorId: actorId).latest;
    if (latest == null) {
      // ignore: avoid_returning_null
      return null;
    }
    return time.difference(latest.time).inSeconds;
  }

  @override
  String toString() => "World<${actors.toSet()}>";

  /// Returns true if [Actor] with [actorId] has been slain.
  ///
  /// This will work correctly even if the actor with [actorId] hasn't
  /// been created yet. This happens when the actor is yet to be
  /// built with a fight situation generator, for example. Since this function
  /// checks [customHistory] for [CustomEvent.actorDeath] events, it's safe
  /// to use it even for NPCs that haven't yet been generated.
  bool wasKilled(int actorId) {
    return customHistory
        .query(name: CustomEvent.actorDeath, actorId: actorId)
        .hasHappened;
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

abstract class WorldStateBuilder
    implements Builder<WorldState, WorldStateBuilder> {
  ActionHistoryBuilder actionHistory;

  RuleHistoryBuilder ruleHistory;

  SetBuilder<Actor> actors;

  int statefulRandomState;

  WorldStateFlags global;

  ListBuilder<Situation> situations;

  CustomEventHistoryBuilder customHistory;

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

  void elapseSituationTimeIfExists(int situationId) {
    int index = build()._findSituationIndex(situationId);
    if (index == null) {
      return;
    }

    situations[index] = situations[index].elapseTurn();
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

  bool randomBool() {
    _rnd.loadState(statefulRandomState);
    final result = _rnd.nextBool();
    statefulRandomState = _rnd.saveState();
    return result;
  }

  T randomChoose<T>(List<T> options) {
    _rnd.loadState(statefulRandomState);
    final result = _rnd.nextInt(options.length);
    statefulRandomState = _rnd.saveState();
    return options[result];
  }

  double randomDouble() {
    _rnd.loadState(statefulRandomState);
    final result = _rnd.nextDouble();
    statefulRandomState = _rnd.saveState();
    return result;
  }

  int randomInt([int max]) {
    _rnd.loadState(statefulRandomState);
    final result = max == null ? _rnd.next() : _rnd.nextInt(max);
    statefulRandomState = _rnd.saveState();
    return result;
  }

  void recordAction(ActionRecord record) {
    actionHistory.records.add(record);
    actionHistory.latestByActorId[record.protagonist] = record.time;
    if (record.wasProactive) {
      actionHistory.latestProactiveByActorId[record.protagonist] = record.time;
    }
  }

  void recordCustom(String eventName, {Object data, Actor actor}) {
    customHistory.records.add(
        CustomEventHistory.getKey(eventName),
        CustomEvent(
          time: time,
          name: eventName,
          data: data,
          actorId: actor?.id,
        ));
  }

  void recordRule(Rule rule) {
    ruleHistory.records[rule.hash] = RuleRecord(ruleId: rule.hash, time: time);
  }

  void recordVisit(Actor actor, Room room) {
    final key = VisitHistory.getKey(room);
    visitHistory.records.add(
        key,
        VisitRecord(
            time: time,
            actorId: actor.id,
            roomName: room.name,
            parentRoomName: room.parent));
  }

  void replaceSituationById<T extends Situation>(int id, T updatedSituation) {
    int index = build()._findSituationIndex(id);
    if (index == null) {
      throw ArgumentError("Situation with id $id does not "
          "exist in $situations");
    }
    situations[index] = updatedSituation;
  }

  void updateActorById(int id, void updates(ActorBuilder b)) {
    var original = getActorById(id);
    var updated = original.rebuild(updates);
    assert(original.id == updated.id);
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
