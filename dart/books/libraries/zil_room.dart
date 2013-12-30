part of zil;

/**
 * A [Room] is the a location in the game space. It's [name] must correspond to
 * an [EgbPage] name.
 */
class Room extends Entity with Node implements Described {
  final List<int> coordinates;
  final Set<Item> items;
  final Set<Exit> exits;
  final Iterable<Action> actions;
  
  String description;
  
  /// A page to be shown when player first enters the room. Can be [:null:] (in
  /// which case no page will be shown automatically).
  String descriptionPage;
  
  String toString() => "Room<$name>"; 
  
  /**
   * Create a room whose [name] corresponds to an [EgbPage] name.
   */
  Room(String name, this.description, Iterable exits, 
      { this.descriptionPage, 
        this.coordinates: const [0, 0, 0], Iterable items: const [],
        this.actions: const []}) 
      : this.exits = new Set.from(exits),
        this.items = new Set.from(items),
        super(name, Pronoun.IT, Actor.NEUTRAL, false) {
    throwIfNotInInitBlock("Cannot create room on the fly.");
    if (description == null) description = name;
    this.exits.forEach((exit) => exit.from = this);
    items.forEach((Item item) => item.location = this);
    actions.forEach((action) => action.room = this);
  }
  
  /// The [Zil] object this Room is a part of.
  Zil _zil;
  
  /// Shows the room, it's inhabitants, items and exits during the next [ticks].
  /// TODO: don't repeat yourself (naive implementation = save storyline, compare)
  void update(int ticks, {bool describe: true}) {
    if (_zil != null && _zil._scripter != null && 
        !_zil._scripter.currentPage.visited && descriptionPage != null) {
      echo(storyline.toString());
      storyline.clear();
      goto(descriptionPage);
      return;
    }
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
    
    if (describe) {
      echo(storyline.toString());
      storyline.clear();
    }
  }
  
  void showActors({bool describe: true}) {
    if (describe) {
      // TODO custom reports from actors
      if (actors.length > 1) {
        storyline.addEnumeration("<subject> {|can }see<s>", 
            actors.map((ZilActor actor) => actor.name), 
            "{|in }here", subject: _zil.player);
      } else if (actors.length == 1) {
        actors.single.report("<subject> is {|in }here");
      }
    }
  }
  
  /// An iterable with all actors in the room.
  Iterable<ZilActor> get actors =>
      _zil.actors.npcs.where((ZilActor actor) => actor.isIn(this));
  
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
  /// 
  /// Note: deprecated. The Exits are obvious from choices.
  @deprecated
  void showExits({bool describe: true}) {
    if (describe) {
      storyline.addEnumeration("<subject> can {leave|exit|go}", 
          exits.map((exit) => "to ${exit.to.description}"), null, 
          subject: _zil.player, conjuction: "or");
    }
  }
  
  bool contains(Item item) => items.contains(item);  // TODO: freestanding vs in possession
  
  void createChoicesForPlayer(ZilPlayer player) {
    assert(player.location == this);
    actions.forEach((Action action) {
      action.createChoiceForPlayer(player);
    });
  }
}