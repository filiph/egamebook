part of zil;

/**
 * Action is something that the [ZilPlayer] (or, alternately, an eligible
 * [AIActor]) can do given requirements. For the player, when all requirements
 * are met, the [Action] is presented as a [EgbChoice] with [name]. When this
 * choice is picked by the player, [function] is executed.
 * 
 * Actions cannot exist by themselves, they need to be attached either to a
 * [Room], to an [Item] or to a [ZilActor].
 * 
 *          new Action("talk to Gorilla", 
              () => storyline.add("The Gorilla just shrugs."),
              roomCheck: (room) => room.lit,
              performerCheck: (actor) => actor.isInSameRoomAs(gorilla),
              submenu: DEFAULT_SUBMENU);
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
  
  /// When this is defined, the action will only be offered if [genericCheck]()
  /// returns [:true:].
  final GenericCheck requirement;
  
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
      {this.requirement: null,
       this.roomCheck: null, this.itemCheck: null, this.performerCheck: null,
       this.needsToBeCarried: false, this.submenu: null, bool onlyOnce: false,
       int maxPerformCount: null, this.isActive: true})
      : maxPerformCount = (onlyOnce ? 1 : maxPerformCount) {
    throwIfNotInInitBlock();
  }
  
  /// A forwarding constructor than merely points to a different pageName.
  /// It is defined for convenience, as this type of action is very common.
  Action.Goto(String name, String pageName,
      {GenericCheck requirement: null, 
       RoomCheck roomCheck: null, ItemCheck itemCheck: null, 
       ActorCheck performerCheck: null, bool needsToBeCarried: false, 
       String submenu: null, bool onlyOnce: false,
       int maxPerformCount: null, bool isActive: true}) 
     : this(name, () => goto(pageName),
       requirement: requirement, roomCheck: roomCheck, itemCheck: itemCheck, 
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

    if (requirement != null && !requirement()) return false;
    if (roomCheck != null && !roomCheck(currentRoom)) return false;
    if (performerCheck != null && !performerCheck(performer)) return false;
    if (item != null && itemCheck != null && !itemCheck(item)) return false;
    return true;
  }
  
  /**
   * Creates a choice for given [player]. The method first checks 
   * whether the requirements are met (calling [_checkSuitability]).
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
      }, submenu: submenu);
    }
  }
  
  /**
   * A helper function to save the state of a given list/iterable of actions.
   * Because Actions are always attached to a [Room], and [Item] or a
   * [ZilActor], these objects are responsible for persisting their actions.
   */
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
  
  /**
   * Same as [iterableToMap] above, but for loading state from a savegame.
   */
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
typedef bool GenericCheck();
typedef bool RoomCheck(Room room);
typedef bool ActorCheck(ZilActor actor);
typedef bool ItemCheck(Item item);