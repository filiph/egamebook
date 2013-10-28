part of zil;

abstract class Located {
  /// Location of the entity in game. It is set to [:null:] for objects/actors 
  /// that are 'nowhere'.
  Room get location;
  
  bool isIn(Room room) => location == room;
  bool isInSameRoomAs(ZilActor actor) => location == actor.location;
}

//abstract class Described {
//  String get description;
//  
//}

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
class Item extends Entity implements Located {
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
  
  Set<Item> contents = new Set<Item>();
  
  Item(String name, this.actions, {
      this.takeable: true, this.container: false, bool isActive: true,
      this.plural: false, this.count: 1,
      Iterable<Item> contents: const [],
      Pronoun pronoun: Pronoun.IT, this.firstDescription: null}) 
      : super(name, pronoun: pronoun) {
        
    actions.forEach((action) => action.item = this);
    if (!container) {
      assert(contents.isEmpty);
    } else {
      this.contents.addAll(contents);
    }
    if (!plural) assert(count == 1);
    this.isActive = isActive;
  }
  
  Room _location;
  ZilActor carrier;
  
  bool get isBeingCarried => carrier != null;
  bool isCarriedBy(ZilActor actor) => carrier == actor;
  bool isInRoomFreeStanding(Room room) => carrier == null && _location == room;
  
  Room get location {
    if (carrier != null) return carrier.location;
    return _location;
  }
  
  bool isIn(Room room) => location == room;
  bool isInSameRoomAs(ZilActor actor) => location == actor.location;
  
  void showText() {
    storyline.add("there is $name here");
  }
  
  // TODO: droppable - some items just shouldn't be even giving the option to be dropped
  // TODO: get inspiration from item.dart
  
  // TODO: containers ?
}