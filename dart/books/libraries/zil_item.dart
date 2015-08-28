part of zil;

abstract class Located {
  /// Location of the entity in game. It is set to [:null:] for objects/actors
  /// that are 'nowhere'.
  Room get location;

  bool isIn(Room room) => location == room;
  bool isInSameRoomAs(ZilActor actor) =>
      location == actor.location && actor.isAliveAndActive;
}

abstract class Described {
  String get description;
}

/**
 * Item is anything inanimate that can be manipulated by the player or by
 * NPCs. 
 * 
 *     var captainsGun = new Item("captain's {gun|pistol}", 
          actions: [
           new Action("check the gun", 
              () => echo("You check the gun. It's okay."))
          ],
          takeable: true
      );
 */
class Item extends Entity implements Located, Described, ZilSaveable {
  final Iterable<Action> actions;
  bool takeable;
  final bool plural;
  int count;

  // TODO: droppable - some items just shouldn't be even giving the option to be dropped
  // TODO: containers: means that an Item can have a location, a carrier, or a container
  //Item container;

  /// This is the description of the item in it's initial state (in a room).
  /// It is equivalent to FDESC in ZIL. After the player has taken the item or
  /// has done anything with it, a generic description will be used (something
  /// like [:"There is $name in here.":]).
  /// When not provided (or explicitly set to [:null:]), the generic
  /// description will always be provided.
  final String firstDescription;
  bool describedForTheFirstTimeAlready = false;

  String description;

  final String _takeDescription;
  String get takeDescription {
    if (_takeDescription != null) {
      return _takeDescription;
    }
    return "<subject> take<s> the $description";
  }

  final String _takeInfinitive;
  String get takeInfinitive {
    if (_takeInfinitive != null) {
      return _takeInfinitive;
    }
    return "take the $description";
  }

  final Zil _zil;

  Item(this._zil, String name, {bool nameIsProperNoun: false,
      this.actions: const [], this.description, this.takeable: true,
      bool isActive: true, this.plural: false, this.count: 1,
      Pronoun pronoun: Pronoun.IT, this.firstDescription: null,
      String takeDescription, String takeInfinitive})
      : _takeDescription = takeDescription,
        _takeInfinitive = takeInfinitive,
        super(name, nameIsProperNoun, pronoun, Actor.NEUTRAL, false) {
    throwIfNotInInitOrDeclareBlock();
    actions.forEach((action) => action.item = this);
    this.isActive = isActive;

    if (description == null) description = name;
    _zil.items.add(this);
  }

  Room _location;
  ZilActor _carrier;

  ZilActor get carrier => _carrier;
  set carrier(ZilActor value) {
    _location = null;
    _carrier = value;
  }

  Room get location => _location;
  set location(Room value) {
    _carrier = null;
    _location = value;
  }

  bool get isBeingCarried =>
      _carrier != null && _carrier.isAliveAndActive && isActive;
  bool isCarriedBy(ZilActor actor) =>
      _carrier == actor && actor.isActive && isActive;
  bool isInRoomFreeStanding(Room room) =>
      _carrier == null && _location == room && isActive;

  /**
   * Returns [:true:] if the item is in the [room] and [isActive]. When
   * [countIfInPossession] is [:true:] (default), the item is considered to
   * be in the room even if it is carried by a [ZilActor] (including player) who
   * is currently in the room. Otherwise, only items that are 'lying on the
   * floor' (their [location] equals [room]) will return [:true:].
   */
  bool isIn(Room room, {bool countIfInPossession: true}) {
    if (!isActive) return false;
    if (countIfInPossession && carrier != null && carrier.location == room) {
      return true;
    }
    return location == room;
  }
  bool isInSameRoomAs(ZilActor actor) =>
      location == actor.location && isActive && actor.isAliveAndActive;

  void createChoicesForPlayer(ZilPlayer player) {
    assert(player.location == this.location || this.carrier == player);
    if (takeable && !player.has(this)) {
      choice(Storyline.getString(Storyline.capitalize(takeInfinitive),
          subject: player, object: this), script: () {
        storyline.add(takeDescription, subject: player, object: this);
        carrier = player;
        goto(player.location.name);
      });
    }
    actions.forEach((Action action) {
      action.createChoiceForPlayer(player);
    });
  }

  Map<String, dynamic> toMap() => {
    "isActive": isActive,
    "team": team,
    "location": (location != null ? location.name : null),
    "carrier": (carrier != null ? carrier.name : null),
    "takeable": takeable,
    "count": count,
    "describedForTheFirstTimeAlready": describedForTheFirstTimeAlready,
    "actions": Action.iterableToMap(actions)
  };

  void updateFromMap(Map<String, dynamic> map) {
    isActive = map["isActive"];
    team = map["team"];
    if (map["location"] != null) {
      location = _zil.rooms.getFromPageName(map["location"]);
    } else if (map["carrier"] != null) {
      carrier = _zil.actors.findByName(map["carrier"]);
    } else {
      location = null;
      carrier = null;
    }
    takeable = map["takeable"];
    count = map["count"];
    describedForTheFirstTimeAlready = map["describedForTheFirstTimeAlready"];
    Action.updateIterableFromMap(map["actions"], actions);
  }
}
