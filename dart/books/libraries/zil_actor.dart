part of zil;

class ZilActor extends Actor implements Located, ZilSaveable {
  ZilActor(this._zil, String name, {int team: Actor.NEUTRAL,
    bool isPlayer: false, Pronoun pronoun: Pronoun.IT,
    Iterable<Item> items: const [], this.actions: const []})
    : super(name: name, team: team, isPlayer: isPlayer, pronoun: pronoun) {
    throwIfNotInInitBlock();
    actions.forEach((action) => action.actor = this);
    items.forEach((item) {
      item.carrier = this;
      _zil.items.add(item);
    });
    if (this is AIActor) {
      _zil.actors.add(this);
    } else if (this is ZilPlayer) {
      _zil.actors.player = this;  // TODO: guard against overwriting player
    }
  }
  
  bool isAlive = true;
  
  final Zil _zil;
  
  Room location;
  final Iterable<Action> actions;
  
  Iterable<Item> get items => 
      _zil.items.items.where((item) => has(item));
  
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
  bool isInOneOf(Iterable<Room> rooms) => 
      rooms.any((room) => location == room) && isActive;
  bool isInSameRoomAs(ZilActor actor) => location == actor.location &&
      isActive && actor.isActive;
  
  bool has(Item item) => item.carrier == this && item.isActive && isActive;
  
  void createChoicesForPlayer(ZilPlayer player) {
    assert(player.location == this.location);
    actions.forEach((Action action) {
      action.createChoiceForPlayer(player);
    });
  }
  
  Map<String, dynamic> toMap() => {
    "isActive": isActive,
    "team": team,
    "isAlive": isAlive,
    "location": (location != null ? location.name : null)
  };

  void updateFromMap(Map<String, dynamic> map) {
    isActive = map["isActive"];
    team = map["team"];
    isAlive = map["isAlive"];
    if (map["location"] != null) {
      location = _zil.rooms.getFromPageName(map["location"]);
    } else {
      location = null;
    }
  }
}

class ZilPlayer extends ZilActor {
  ZilPlayer(Zil zil, String name) : super(zil, name, pronoun: Pronoun.YOU,
      team: Actor.FRIEND, isPlayer: true);
  
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