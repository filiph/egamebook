part of zil;

class ZilActor extends Actor implements Located {
  ZilActor(String name, {team: Actor.NEUTRAL, isPlayer: false,
    pronoun: Pronoun.IT, Iterable items: const [], this.actions: const []}) 
    : this.items = new Set.from(items),
      super(name: name, team: team, isPlayer: isPlayer, pronoun: pronoun) {
    throwIfNotInInitBlock();
    actions.forEach((action) => action.actor = this);      
  }
  
  bool isAlive = true;
  
  Zil _zil;
  
  Room location;
  final Set<Item> items;
  final Iterable<Action> actions;
  
  /**
   * Sets this ZilActor's location to the one described by the Scripter's
   * [currentPage]'s name. Alternately, when the optional [pageName] argument
   * is provided, that room will be used.
   */
  void setLocationFromCurrentPage([String pageName]) {
    if (pageName == null) {
      assert(_zil != null);
      assert(_zil._scripter != null);
      assert(_zil._scripter.currentPage != null);
      pageName = _zil._scripter.currentPage.name;
    }
    location = _zil.rooms.getFromPageName(pageName);
  }

  bool isIn(Room room) => location == room && isActive;
  bool isInOneOf(Iterable<Room> rooms) => rooms.any((room) => location == room) &&
      isActive; 
  bool isInSameRoomAs(ZilActor actor) => location == actor.location &&
      isActive && actor.isActive;
  
  bool has(Item item) => items.contains(item) && item.isActive && isActive;
  
  void createChoicesForPlayer(ZilPlayer player) {
    assert(player.location == this.location);
    actions.forEach((Action action) {
      action.createChoiceForPlayer(player);
    });
  }
}

class ZilPlayer extends ZilActor {
  ZilPlayer(String name) : super(name, pronoun: Pronoun.YOU, team: Actor.FRIEND,
      isPlayer: true);
  
  void createChoices() {
    // Actions associated with the room.
    location.createChoicesForPlayer(this);
    // Actors in the room.
    location.actors.forEach((ZilActor actor) {
      actor.createChoicesForPlayer(this);
    });
    // Items in player's possession.
    items.forEach((Item item) {
      item.createChoicesForPlayer(this);
    });
    // Items in the room.
    location.items.forEach((Item item) {
      item.createChoicesForPlayer(this);
    });
    // Exits from the room.
    location.exits.forEach((exit) {
      exit.createChoiceForPlayer(_zil, this);
    });
  }
}