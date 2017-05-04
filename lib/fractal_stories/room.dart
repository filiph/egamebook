library stranded.room;

import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:meta/meta.dart';

/// This is the magic [currentRoomGame] that, when reached, makes
/// the room roaming situation stop.
final Room endOfRoam = new Room("__END_OF_ROAM__", "", "", null, null, []);

typedef Iterable<Item> ItemGenerator(WorldState world);
typedef Iterable<Actor> MonsterGenerator(WorldState world);

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

  final String description;

  final String shortDescription;

  /// A function that creates monsters that are in the Room when player arrives
  /// for the first time.
  ///
  /// It's a function instead of a constant list because we want to only
  /// initialize monsters when we get to them (so that they don't take memory
  /// and CPU) and sometimes we might like varying monsters according to
  /// current [WorldState].
  final MonsterGenerator monsterGenerator;

  /// A function that creates items that are in the Room when player arrives
  /// for the first time.
  ///
  /// It's a function instead of a constant list because we want to only
  /// initialize items when we get to them (so that they don't take memory
  /// and CPU) and sometimes we might like varying items according to
  /// current [WorldState].
  final MonsterGenerator itemGenerator;

  final String groundMaterial;

  // TODO: add possibility to make custom events for FightSituation
  // these will be "copied" to the fight situation in TakeExitAction

  Room(this.name, this.description, this.shortDescription,
      this.monsterGenerator, this.itemGenerator, Iterable<Exit> exits,
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
