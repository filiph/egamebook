part of zil;

/**
 *          new Action("check the gun", 
              () => echo("You check the gun. It's okay."),
              roomCheck: (room) => room.lit,
              performerCheck: (actor) => actor.isHuman,
              targetActorCheck: (targetCandidate) => true,
              targetItemCheck: (targetCandidate) => true,
              itemCheck: (item) => item.isActive,
              needsToBeInPossession: true,
              submenu: DEFAULT_SUBMENU)
 */
class Action {
  final String name;
  final ActionFunction function;
  /// The item this action is associated with. Action will be offered only when
  /// this item is in the same room as the performer (player, by default).
  Item item;
  /// The room this action is associated with. Action won't be offered 
  /// elsewhere.
  Room room;
  /// The actor this action is associated with. The action won't be offered
  /// unless this actor is in room.
  ZilActor actor;
  
  /// When this is defined, the action won't be shown unless 
  /// [:roomCheck(rooms.current) == true:]. This is useful when you want to make
  /// sure that the player is offered to perform this action only in places
  /// where it makes sense.
  final RoomCheck roomCheck;
  
  /// Useful when the action should only be performed when the performer
  /// is in a certain state (e.g. player is almost dead).
  final ActorCheck performerCheck;
  // TODO allow the action to walk the actors in the room and offer itself for
  //      every suitable target
  // final ActorCheck targetActorCheck;
  // final ItemCheck targetItemCheck;
  
  /// Useful when the action should only be performed when the associated item
  /// is in a certain state (e.g. gun has ammo). 
  final ItemCheck itemCheck;
  
  /// If true, performer cannot do the action unless they have the associated
  /// item in possession (i.e. being in the same room doesn't allow the action).
  final bool needsToBeCarried;
  
  /// If defined, the action will not be shown among the default choices, but
  /// will instead be 'hidden' in a submenu.
  final String submenu;
  
  Action(this.name, this.function,
      {this.roomCheck: null, this.itemCheck: null, this.performerCheck: null,
       this.needsToBeCarried: false, this.submenu: null});
  
  bool checkSuitabilityForPlayer() => _checkSuitability(rooms.current, player); 
  
  bool _checkSuitability(Room currentRoom, ZilActor performer) {
    if (room != null && currentRoom != room) return false;
    if (item != null && !item.isIn(currentRoom)) return false;
    if (needsToBeCarried && !item.isCarriedBy(performer)) return false;
    if (actor != null && !actor.isIn(currentRoom)) return false;
    
    // TODO: don't run this multiple times. Action is associated with: actor, room, item. Only run once.
    
    if (roomCheck != null && !roomCheck(currentRoom)) return false;
    if (performerCheck != null && !performerCheck(performer)) return false;
    if (item != null && itemCheck != null && !itemCheck(item)) return false;
    return true;
  }
  
  void createChoice() {
    choice(Randomly.parse(name), script: function);
  }
  
  //void execute() => function();
}

typedef void ActionFunction();
typedef bool RoomCheck(Room room);
typedef bool ActorCheck(ZilActor actor);
typedef bool ItemCheck(Item item);