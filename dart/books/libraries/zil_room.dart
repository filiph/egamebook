part of zil;

/**
 * A [Room] is the a location in the game space. It's [name] must correspond to
 * an [EgbPage] name.
 */
class Room extends Entity {
  //PerformFunction onEnter;
  final List<int> coordinates;
  final Set<Item> items;
  final Set<Exit> exits;
  
  String description;
  
  bool visited = false;
  
  Room(String name, this.description, Iterable exits, 
      { //this.onEnter, 
       this.coordinates: const [0, 0, 0], Iterable items: const []}) 
      : this.exits = new Set.from(exits),
        this.items = new Set.from(items),
        super(name) {
    //throwIfNotInInitBlock("Cannot create room on the fly.");
    if (description == null) description = "<subject> <is> in $name";
    this.exits.forEach((exit) => exit.from = this);
  }
  
  /// The RoomNetwork this Room is a part of.
  RoomNetwork network;
  
  /// Shows 
  void describe(ticks) {
    showDescription();
    // npcs.describe(ticks, roomsToShow: [rooms.current]);
    if (gotoCalledRecently) return;
    showItems();
    showExits();
  }
  
  /// Shows the text associated with the room.
  void showDescription() {
    storyline.add(description, subject: player);
    visited = true;
  }

  /// Shows all items currently visible in the room.
  void showItems() {
    items.where((Item item) => item.isActive)
      .forEach((Item item) => item.showText());
    // TODO: enumerate
  }
  
  /// Example: "You can leave to corridor left, squeeze through the hatchway 
  /// or use the ladder to ..."
  void showExits() {
    exits.forEach((exit) {
      storyline.add("<subject> can leave to ${exit.to.name}", subject: player);
    });
    // TODO: enumerate
  }
  
  bool contains(Item item) => items.contains(item);  // TODO: freestanding vs in possession
}

typedef void PerformFunction();
