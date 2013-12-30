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
  
  int performCount = 0;
  /// The maximum number of times this [Action] can be performed. When set to
  /// [:null:] (the default), there is no limit. 
  final int maxPerformCount;
  
  bool isActive = true;
  
  Action(this.name, this.function,
      {this.roomCheck: null, this.itemCheck: null, this.performerCheck: null,
       this.needsToBeCarried: false, this.submenu: null, bool onlyOnce: false,
       int maxPerformCount: null, this.isActive: true})
      : maxPerformCount = (onlyOnce ? 1 : maxPerformCount) {
    throwIfNotInInitBlock();
  }
  
  /// A forwarding constructor than merely points to a different pageName.
  /// It is defined for convenience, as this type of action is very common.
  Action.Goto(String name, String pageName,
      {RoomCheck roomCheck: null, ItemCheck itemCheck: null, 
       ActorCheck performerCheck: null, bool needsToBeCarried: false, 
       String submenu: null, bool onlyOnce: false,
       int maxPerformCount: null, bool isActive: true}) 
     : this(name, () => goto(pageName),
       roomCheck: roomCheck, itemCheck: itemCheck, 
       performerCheck: performerCheck, needsToBeCarried: needsToBeCarried,
       submenu: submenu, onlyOnce: onlyOnce, maxPerformCount: maxPerformCount,
       isActive: isActive);
  
  bool _checkSuitability(Room currentRoom, ZilActor performer) {
    if (!isActive) return false;
    if (maxPerformCount != null && performCount >= maxPerformCount) {
      return false;
    }
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
  
  /**
   * Creates a choice for given [player] assuming all requirements are met.
   */
  void createChoiceForPlayer(ZilPlayer player) {
    if (_checkSuitability(player.location, player)) {
      choice(Storyline.getString(Storyline.capitalize(name), 
          subject: player), script: () {
        function();
        performCount++;
        echo(storyline.toString());
        storyline.clear();
        if (!gotoCalledRecently) {
          // If the action doesn't call a goto explicitly, it will go back to
          // the current room.
          goto(player.location.name);
        }
      });
    }
  }
  
  static Map<String,Map> iterableToMap(Iterable<Action> actions) {
    Map<String,dynamic> map = new Map<String,dynamic>();
    actions.forEach((action) {
      assert(!map.containsKey(action.name)); // Duplicate action names.
      map[action.name] = {
          "isActive": action.isActive,
          "performCount": action.performCount
      };
    });
    return map;
  }
  
  static void updateIterableFromMap(Map<String,Map> map, 
                                    Iterable<Action> actions) {
    map.forEach((key, Map actionMap) {
      Action action = actions.singleWhere((action) => action.name == key);
      action.isActive = actionMap["isActive"];
      action.performCount = actionMap["performCount"];
    });
  }
}

typedef void ActionFunction();
typedef bool RoomCheck(Room room);
typedef bool ActorCheck(ZilActor actor);
typedef bool ItemCheck(Item item);