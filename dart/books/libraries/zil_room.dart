part of zil;

/**
 * A [Room] is the a location in the game space. It's [name] must correspond to
 * an [EgbPage] name.
 */
class Room extends Entity {
  /// Must correspond to a pageName.
  PerformFunction onEnter;
  final List<int> coordinates;
  Iterable<Item> items;
  Set<Exit> exits;
  
  Room(String name, Iterable exits, 
      {this.onEnter, this.coordinates: const [0, 0, 0], this.items}) 
      : super(name) {
    //throwIfNotInInitBlock("Cannot create room on the fly.");
    this.exits = new Set.from(exits);
    this.exits.forEach((exit) => exit.from = this);
  }
  
  /// The RoomNetwork this Room is a part of.
  RoomNetwork network;
  
  /// Shows the text associated with the room.
  void showItems() {
    storyline.add("<subject> <is> standing in $name", subject: player);
    items.forEach((Item item) => item.showText());
  }
  
  bool contains(Item item) => items.contains(item);  // TODO: freestanding vs in possession
}

typedef void PerformFunction();
