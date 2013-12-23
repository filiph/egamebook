part of zil;

/**
 * A [Room] is the a location in the game space. It's [name] must correspond to
 * an [EgbPage] name.
 */
class Room extends Entity with Node implements Described {
  //PerformFunction onEnter;
  final List<int> coordinates;
  final Set<Item> items;
  final Set<Exit> exits;
  
  String description;
  // TODO: custom "you are in"
  
  String toString() => "Room<$name>"; 
  
  bool visited = false;
  
  /**
   * Create a room whose [name] corresponds to an [EgbPage] name.
   */
  Room(String name, this.description, Iterable exits, 
      { //this.onEnter, 
       this.coordinates: const [0, 0, 0], Iterable items: const []}) 
      : this.exits = new Set.from(exits),
        this.items = new Set.from(items),
        super(name, Pronoun.IT, Actor.NEUTRAL, false) {
    throwIfNotInInitBlock("Cannot create room on the fly.");
    if (description == null) description = name;
    this.exits.forEach((exit) => exit.from = this);
    items.forEach((Item item) => item.location = this);
  }
  
  /// The RoomNetwork this Room is a part of.
  Zil _zil;
  
  /// Shows the room, it's inhabitants, items and exits during the next [ticks].
  /// TODO: don't repeat yourself (naive implementation = save storyline, compare)
  void update(int ticks, {bool describe: true}) {
    showDescription(describe: describe);
    if (describe) storyline.addParagraph();
    if (_zil.rooms.actors != null) {
      showActors(describe: describe);
      for (int i = 0; i < ticks; i++) {
        _zil.actors.updateAll(1, currentRoom: _zil.player.location, 
            describe: describe);
        if (gotoCalledRecently) return;
        if (_zil.timeline != null) {
          _zil.timeline.elapse(1);
        }
        if (gotoCalledRecently) return;
      }
    }
    if (describe) storyline.addParagraph();
    showItems(describe: describe);
    showExits(describe: describe);
    
    if (describe) {
      echo(storyline.toString());
      storyline.clear();
    }
  }
  
  void showActors({bool describe: true}) {
    if (describe) {
      // TODO custom reports from actors
      var presentActors = _zil.actors.npcs.where((ZilActor actor) => actor.isIn(this));
      if (presentActors.length > 1) {
        storyline.addEnumeration("<subject> {|can }see<s>", 
            presentActors.map((ZilActor actor) => actor.name), 
            "{|in }here", subject: _zil.player);
      } else if (presentActors.length == 1) {
        presentActors.single.report("<subject> is {|in }here");
      }
    }
  }
  
  /// Shows the text associated with the room.
  void showDescription({bool describe: true}) {
    if (describe) {
      // TODO  custom
      storyline.add("<subject> <is> in $description", subject: _zil.player);
      visited = true;
    }
  }

  /// Shows all items currently visible in the room.
  void showItems({bool describe: true}) {
    if (describe) {
      // TODO: first, show items that can handle their own description.
      storyline.addEnumeration("{<subject> can see|there is} <also>", 
          items.map((item) => item.description), "{in |}here", subject: _zil.player);
    }
  }
  
  /// Example: "You can leave to corridor left, squeeze through the hatchway 
  /// or use the ladder to ..."
  void showExits({bool describe: true}) {
    if (describe) {
      storyline.addEnumeration("<subject> can {leave|exit|go}", 
          exits.map((exit) => "to ${exit.to.description}"), null, 
          subject: _zil.player, conjuction: "or");
    }
  }
  
  bool contains(Item item) => items.contains(item);  // TODO: freestanding vs in possession
}

typedef void PerformFunction();
