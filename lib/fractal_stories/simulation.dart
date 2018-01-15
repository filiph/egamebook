library stranded.world;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/util/throw_if_duplicate.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
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
  /// TODO: create "RoomState" in [_state] for rooms that can change
  final Set<Room> rooms;

  /// Combine functions are the different ways an actor can score the world.
  final Map<String, CombineFunction> combineFunctions;

  Simulation(Iterable<Room> rooms, this.combineFunctions)
      : rooms = new Set<Room>.from(rooms) {
    assert(!hasDuplicities(rooms.map((r) => r.name)));
  }

  Room getRoomByName(String roomName) {
    assert(
        rooms.any((room) => room.name == roomName),
        "Room with name $roomName not defined.\n"
        "Rooms: ${rooms.map((r) => r.name).join(', ')}.\n"
        "Current world: $this.");
    return rooms.singleWhere((room) => room.name == roomName);
  }
}
