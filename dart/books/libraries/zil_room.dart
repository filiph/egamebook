part of zil;

/**
 * A [Room] is the a location in the game space. It's [name] must correspond to
 * an [EgbPage] name.
 */
class Room {
  /// Must correspond to a pageName.
  final String name;
  PerformFunction onEnter;
  final List<int> coordinates;
  Iterable<Item> items;
  Set<Exit> exits;
  
  Room(this.name, Iterable exits, {this.onEnter, this.coordinates: const [0, 0, 0], this.items}) {
    //throwIfNotInInitBlock("Cannot create room on the fly.");
    this.exits = new Set.from(exits);
  }
  
  /// The RoomNetwork this Room is a part of.
  RoomNetwork network;
  
  /// Shows the text associated with the room.
  void showText() {
    storyline.add("<subject> <is> standing in $name", subject: player);
  }
  
  bool contains(Item item) => items.contains(item);  // TODO: freestanding vs in possession
}

class Exit extends Entity {
  Exit(String name) : super(name);

  Room from;
  Room to;
  CheckFunction requirement;  
}

typedef bool CheckFunction();
typedef void PerformFunction();
