part of zil;

abstract class Located {
  /// Location of the entity in game. It is set to [:null:] for objects/actors 
  /// that are 'nowhere'.
  Room get location;
  
  bool isIn(Room room) => location == room;
  bool isInSameRoomAs(ZilActor actor) => location == actor.location;
}

abstract class Described {
  String get description;
}

/**
 *     var captainsGun = new Item("captains {gun|pistol}", 
          [
           new Action("check the gun", 
              () => echo("You check the gun. It's okay."))
           ],
        count: 1,  // can be >1 for things like bullets
        container: true,
        contents: NO_ITEMS,
        takeable: true,
        visible: true
      );
 */
class Item extends Entity implements Located, Described {
  final Iterable<Action> actions;
  bool takeable;
  final bool container;
  final bool plural;
  int count;

  /// This is the description of the item in it's initial state (in a room). 
  /// It is equivalent to FDESC in ZIL. After the player has taken the item or 
  /// has done anything with it, a generic description will be used (something
  /// like [:"There is $name in here.":]).
  /// When not provided (or explicitly set to [:null:]), the generic 
  /// description will always be provided. 
  final String firstDescription;
  
  String description;
  
  final String _takeDescription;
  String get takeDescription {
    if (_takeDescription != null) {
      return _takeDescription;
    }
    return "<subject> take<s> $description";
  }
  
  final String _takeInfinitive;
  String get takeInfinitive {
    if (_takeInfinitive != null) {
      return _takeInfinitive;
    }
    return "take $description";
  }
  
  Set<Item> contents = new Set<Item>();
  
  Item(String name, this.actions, {
      this.description,
      this.takeable: true, this.container: false, bool isActive: true,
      this.plural: false, this.count: 1,
      Iterable<Item> contents: const [],
      Pronoun pronoun: Pronoun.IT, this.firstDescription: null,
      String takeDescription, String takeInfinitive}) 
      : _takeDescription = takeDescription, _takeInfinitive = takeInfinitive,
        super(name, pronoun, Actor.NEUTRAL, false) {
        
    actions.forEach((action) => action.item = this);
    if (!container) {
      assert(contents.isEmpty);
    } else {
      this.contents.addAll(contents);
    }
    if (!plural) assert(count == 1);
    this.isActive = isActive;
    
    if (description == null) description = name;
  }
  
  Room _location;
  ZilActor _carrier;
  
  ZilActor get carrier => _carrier;
  set carrier(ZilActor value) {
    if (_location != null && value != null) {
      _location.items.remove(this);
      _location = null;
    }
    if (_carrier != null) {
      _carrier.items.remove(this);
    }
    _carrier = value;
    if (_carrier != null) {
      _carrier.items.add(this);
    }
  }
  
  bool get isBeingCarried => _carrier != null && _carrier.isAliveAndActive &&
      isActive;
  bool isCarriedBy(ZilActor actor) => _carrier == actor && actor.isActive &&
      isActive;
  bool isInRoomFreeStanding(Room room) => _carrier == null &&
      _location == room && isActive;
  
  Room get location {
    if (carrier != null) return carrier.location;
    return _location;
  }
  
  set location(Room value) {
    if (_location != null) {
      _location.items.remove(this);
    }
    _location = value;
    _location.items.add(this);
    _carrier = null;
  }
  
  bool isIn(Room room) => location == room && isActive;
  bool isInSameRoomAs(ZilActor actor) => location == actor.location &&
      isActive && actor.isAliveAndActive;
  
  void showText() {
    storyline.add("there is $name here");
  }
  
  // TODO: droppable - some items just shouldn't be even giving the option to be dropped
  // TODO: get inspiration from item.dart
  
  // TODO: containers ?
  
  void createChoicesForPlayer(ZilPlayer player) {
    assert(player.location == this.location);
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
}