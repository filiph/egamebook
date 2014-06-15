part of zil;

/**
 * A [Room] is the a location in the game space. It's [name] must correspond to
 * an [EgbPage] name.
 */
class Room extends Entity with Node implements Described, ZilSaveable {
  /// The 3D coordinates of the room in the game world. The are given by
  /// a [:List<int>:] of length [:3:]. 
  /// 
  /// For example, a location at the center of the hypothetical world would have
  /// [coordinates] set to [:[0, 0, 0]:]. Another room above it would have
  /// [:[0, 0, 1]:] as its coordinates.
  /// 
  /// Coordinates are used for path-finding.
  final List<int> coordinates;
  final Set<Exit> exits;
  final Iterable<Action> actions;
  
  /// The player-facing name of the room.
  final String description;
  
  /// A page to be shown when player first enters the room. Can be [:null:] (in
  /// which case no page will be shown).
  final String descriptionPage;
  
  /// Whether or not this room has been visited by the player.
  /// 
  /// Must be separate from [EgbScripterPage.visitCount] because we can be
  /// currently on a different [EgbScripterPage] than is associated with the
  /// [Room] (for example, when an [Action] is described on a separate page
  /// but still needs to update time, the EgbScripterPage could (correctly)
  /// report visitCount to be 0). 
  bool visited = false;
  
  String toString() => "Room<$name>"; 
  
  /**
   * Create a room whose [name] corresponds to an [EgbPage] name.
   */
  Room(this._zil, String pageName, this.description, Iterable exits, 
      { this.descriptionPage,
        String properName,
        this.coordinates: const [0, 0, 0], 
        Iterable<Item> items: const [],
        Iterable<AIActor> actors: const [],
        this.actions: const []}) 
      : this.exits = new Set.from(exits),
        super(pageName, properName, Pronoun.IT, Actor.NEUTRAL, false) {
    throwIfNotInInitBlock("Cannot create room on the fly.");
    this.exits.forEach((exit) => exit.from = this);  // TODO: guard all against null here
    items.forEach((Item item) => item.location = this);
    actions.forEach((action) => action.room = this);
    items.forEach((item) {
      item.location = this;
    });
    actors.forEach((AIActor actor) {
      actor.location = this;
      // Actors are added to Zil by their own constructor.
    });
    _zil.rooms.add(this);
  }
  
  /// The [Zil] object this Room is a part of.
  final Zil _zil;
  
  /// Shows the room, it's inhabitants, items and exits during the next [ticks].
  /// TODO: don't repeat yourself (naive implementation = save storyline, compare)
  void update(int ticks, {bool describe: true}) {
    if (descriptionPage != null && !visited) {
      // Go to descriptionPage.
      echo(storyline.toString());
      storyline.clear();
      goto(descriptionPage);
      visited = true;
      _zil.player._lastTickLocation = null;  // Make sure player.justArrived
                                             // will still be true when player
                                             // 'returns' from descriptionPage.
      return;
    }
    visited = true;
    if (_zil != null && _zil.actors != null && _zil.player.justArrived) {
      showActors(describe: describe);
    }
    for (int i = 0; i < ticks; i++) {
      if (_zil != null && _zil.actors != null) {
        _zil.actors.updateAll(1, currentRoom: _zil.player.location, 
            describe: describe);
        if (gotoCalledRecently) return;
      }
      if (_zil != null && _zil.timeline != null) {
        _zil.timeline.elapse(1);
        if (gotoCalledRecently) return;
      }
    }
    if (_zil.player.justArrived) {
      if (describe) storyline.addParagraph();
      showItems(describe: describe);
    }
    
    echo(storyline.toString());
    storyline.clear();
    
    _zil.player._lastTickLocation = this;
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
      actors.where((actor) => actor is AIActor && actor.currentGoal != null)
        .forEach((AIActor actor) {
        storyline.reports.add(actor.currentGoal.createReportGoalInProgress());
      });
    }
  }
  
  /// An iterable with all actors in the room.
  Iterable<ZilActor> get actors =>
      _zil.actors.npcs.where((ZilActor actor) => actor.isIn(this));
  
  Iterable<Item> get items =>
      _zil.items.items.where((Item item) => 
          item.isIn(this, countIfInPossession: false));
  
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
  
  void createChoicesForPlayer(ZilPlayer player) {
    assert(player.location == this);
    actions.forEach((Action action) {
      action.createChoiceForPlayer(player);
    });
  }
  
  Map<String, dynamic> toMap() => {
    "isActive": isActive,
    "team": team,
    "visited": visited,
    "actions": Action.iterableToMap(actions),
    "exits": Exit.iterableToMap(exits)
  };

  void updateFromMap(Map<String, dynamic> map) {
    isActive = map["isActive"];
    team = map["team"];
    visited = map["visited"];
    Action.updateIterableFromMap(map["actions"], actions);
    Exit.updateIterableFromMap(map["exits"], exits);
  }
}