library stranded.world;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/util/throw_if_duplicate.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:meta/meta.dart';

import 'actor.dart';
import 'room.dart';

typedef void EventCallback(
    Simulation sim, WorldStateBuilder world, Storyline storyline);

/// This object contains everything that is completely immutable about the world
/// in which the player character lives.
///
/// For example, the set of [Room]s is part of [Simulation]. These rooms all
/// behave in some way (possible differently according to state) but they are
/// the same set of rooms at the start of play as they are at the end and
/// any time in between.
///
/// [WorldState] is where most of the mutable state lives, including state
/// of [Actor]s, the current [WorldState.time] and the stack of
/// [WorldState.situations].
///
/// In other words, the state of the system should go to [WorldState], while
/// the behavior and immutable structure of the system goes here.
@immutable
class Simulation {
  /// The (immutable) rooms of this world.
  ///
  /// Rooms are the same no matter what happens to the world.
  final Set<Room> rooms;

  /// Combine functions are the different ways an actor can score the world.
  final Map<String, CombineFunction> combineFunctions;

  Simulation(Iterable<Room> rooms, this.combineFunctions)
      : rooms = new Set<Room>.from(rooms) {
    assert(!hasDuplicities(rooms.map((r) => r.name)));
  }

  /// Generates all applicable actions for [actor] given a [world]. This goes
  /// through all [Situation.actions] as well as [Situation.actionGenerators].
  ///
  /// TODO: Let this be overridden by implementations. The [Simulation]
  ///       abstraction should support whatever game mechanic, not just
  ///       edgehead [EnemyTargetActionBuilder], [ExitActionBuilder], etc.
  Iterable<Action> generateAllActions(Actor actor, WorldState world) sync* {
    assert(
        world.currentSituation.actions.isNotEmpty ||
            world.currentSituation.actionGenerators.isNotEmpty,
        "There are no actions defined for ${world.currentSituation}");
    yield* world.currentSituation.actions;
    for (var builder in world.currentSituation.actionGenerators) {
      if (builder is EnemyTargetActionBuilder) {
        yield* _generateEnemyTargetActions(actor, world, builder);
      } else if (builder is ExitActionBuilder) {
        yield* _generateExitActions(actor, world, builder);
      } else if (builder is ItemActionBuilder) {
        yield* _generateItemActions(actor, world, builder);
      } else {
        throw new StateError("$builder is not one of the supported ones");
      }
    }
  }

  Room getRoomByName(String roomName) {
    assert(
        rooms.any((room) => room.name == roomName),
        "Room with name $roomName not defined.\n"
        "Rooms: ${rooms.map((r) => r.name).join(', ')}.\n"
        "Current world: $this.");
    return rooms.singleWhere((room) => room.name == roomName);
  }

  /// Generator generates multiple [Action] instances given a [world] and
  /// an [actor] and a [builder].
  ///
  /// For example, a builder called `hitWithStick` can take the current
  /// world and output as many actions as there are enemies to hit with a stick.
  /// Each generated action will encapsulate the enemy to hit.
  Iterable<EnemyTargetAction> _generateEnemyTargetActions(
      Actor actor, WorldState world, EnemyTargetActionBuilder builder) sync* {
    var situationActors =
        world.currentSituation.getActors(world.actors, this, world);
    var enemies = situationActors
        .where((other) => other != actor && other.isAliveAndActive);
    for (var enemy in enemies) {
      var action = builder(enemy);
      assert(action.enemy == enemy);
      if (action.isAggressive && !actor.hates(enemy, world)) continue;
      yield action;
    }
  }

  /// Generator generates multiple [ExitAction] instances given a [world] and
  /// an [actor] and a [builder].
  Iterable<ExitAction> _generateExitActions(
      Actor actor, WorldState world, ExitActionBuilder builder) sync* {
    final situation = world.currentSituation as RoomRoamingSituation;
    var room = getRoomByName(situation.currentRoomName);

    for (var exit in room.exits) {
      var action = builder(exit);
      assert(action.exit == exit);
      yield action;
    }
  }

  /// Generator generates multiple [ItemAction] instances given a [world] and
  /// an [actor] and a [builder].
  Iterable<ItemAction> _generateItemActions(
      Actor actor, WorldState world, ItemActionBuilder builder) sync* {
    final situation = world.currentSituation as FightSituation;

    for (var item in situation.droppedItems) {
      var action = builder(item);
      assert(action.item == item);
      yield action;
    }
  }
}
