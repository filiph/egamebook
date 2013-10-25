library zil;

import 'package:egamebook/src/book/scripter.dart' show goto, echo, choice; 
import 'actor.dart';

/**
 * The global instance of [RoomNetwork]. Most games will only utilize one
 * RoomNetwork.
 */
final RoomNetwork rooms = new RoomNetwork();

/** 
 * A network of rooms.
 */
class RoomNetwork {
  Set<Room> _rooms = new Set<Room>();
  
  RoomNetwork();
  
  Path findPath(Room from, Room to) {
    // TODO
    throw new UnimplementedError();
  }
}

/**
 * A [Room] is the a location in the game space. It's [name] corresponds to
 * an [EgbPage] name.
 */
class Room {
  /// Must correspond to a pageName.
  String name;
  PerformFunction onEnter;
  List<int> coordinates = const [0, 0, 0];
  Set<Item> items;
  Set<Exit> exits;
  
  /// The RoomNetwork this Room is a part of.
  RoomNetwork network;
}

class Exit {
  String name;
  Room from;
  Room to;
  CheckFunction requirement;
}

typedef bool CheckFunction();
typedef void PerformFunction();

class Path {
  final List<Room> rooms;
  
  Path(this.rooms);
}
