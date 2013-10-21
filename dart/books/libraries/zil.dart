library zil;

import 'package:egamebook/src/book/scripter.dart'; 
import 'actor.dart';

/** 
 * Singleton class that does all the work.
 */
class RoomNetwork {
  Set<Room> _rooms = new Set<Room>();
  
  RoomNetwork();
}

class Room {
  /// Must correspond to a pageName.
  String name;
  PerformFunction onEnter;
  List<int> coordinates = const [0, 0, 0];
  Set<Item> items;
  Set<Exit> exits;
}

class Exit {
  String name;
  Room from;
  Room to;
  CheckFunction requirement;
}

typedef bool CheckFunction();
typedef void PerformFunction();