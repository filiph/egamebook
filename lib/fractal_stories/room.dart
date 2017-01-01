library stranded.room;

import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';

/// Rooms are mostly closed-off places that don't allow free roaming.
///
/// In that, they differ from [Location], which is a place on a map that
/// allows the player to go to any other location on that map.
///
/// Rooms define [Room.exits] that explicitly specify which other Rooms are
/// connected.
class Room {
  BuiltList<Exit> _exits;

  final String name;

  Room(this.name, Iterable<Exit> exits) {
    _exits = new ListBuilder<Exit>(exits).build();
  }

  BuiltList<Exit> get exits => _exits;

  @override
  int get hashCode => name.hashCode;

  @override
  bool operator ==(Object other) => other is Room && other.name == name;
}
