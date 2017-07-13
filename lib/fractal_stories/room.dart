library stranded.room;

import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:meta/meta.dart';

/// Describer that doesn't output any text at all.
final RoomDescriber emptyRoomDescription = (a, w, s) {};

/// This is the magic [currentRoomGame] that, when reached, makes
/// the room roaming situation stop.
final Room endOfRoam = new Room("__END_OF_ROAM__", emptyRoomDescription,
    emptyRoomDescription, null, null, []);

/// This generator creates a [FightSituation].
///
/// TODO: remove the dependency on [FightSituation] and [RoomRoamingSituation]
///       or pull out Room into RoomRoaming instead of having it here.
typedef FightSituation FightGenerator(WorldState world,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party);

typedef Iterable<Item> ItemGenerator(WorldState world);

/// A function that should use [s] to report on what the player sees when
/// entering the room.
typedef void RoomDescriber(Actor a, WorldState w, Storyline s);

// TODO: add noItemsInRoom and noMonstersInRoom to be used instead of `null`
//       similar to emptyRoomDescription

/// Rooms are mostly closed-off places that don't allow free roaming.
///
/// In that, they differ from [Location], which is a place on a map that
/// allows the player to go to any other location on that map.
///
/// Rooms define [Room.exits] that explicitly specify which other Rooms are
/// connected.
@immutable
class Room {
  final BuiltList<Exit> _exits;

  final String name;

  /// Fully describes the room according to current state of the world.
  final RoomDescriber describe;

  /// Describes the room with a short blurb, after player has already visited
  /// it once.
  final RoomDescriber shortDescribe;

  /// A function that builds the fight situation in the Room when player arrives
  /// for the first time.
  ///
  /// It's a function instead of a constant because we want to only
  /// initialize the fight situation and the monsters when we get to them
  /// (so that they don't take memory and CPU) and sometimes we might like
  /// varying fights according to current [WorldState].
  final FightGenerator fightGenerator;

  /// A function that creates items that are in the Room when player arrives
  /// for the first time.
  ///
  /// It's a function instead of a constant list because we want to only
  /// initialize items when we get to them (so that they don't take memory
  /// and CPU) and sometimes we might like varying items according to
  /// current [WorldState].
  final ItemGenerator itemGenerator;

  final String groundMaterial;

  // TODO: add possibility to make custom events for FightSituation
  // these will be "copied" to the fight situation in TakeExitAction

  Room(this.name, this.describe, this.shortDescribe, this.fightGenerator,
      this.itemGenerator, Iterable<Exit> exits,
      {this.groundMaterial: "ground"})
      : _exits = new ListBuilder<Exit>(exits).build();

  BuiltList<Exit> get exits => _exits;

  @override
  int get hashCode => name.hashCode;

  @override
  bool operator ==(Object other) => other is Room && other.name == name;

  @override
  String toString() => "Room<$name>";
}
