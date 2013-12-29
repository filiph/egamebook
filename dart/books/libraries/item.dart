library item;

class Item {
  
  Item._internal(this.name, this.location, this.active) {
    
  }
  
  /// The name this item is to be referred by.
  String name;
  /// The current location of the item – can be either a page name, 
  /// [:"__player__":], or [:null:].
  String location;
  static final String PLAYER_POSESSION = "__player__";
  /**
   * Whether or not this item should be shown to the player. This can be useful
   * for items that are only relevant later in the game (i.e. after player
   * does something else) or items that become irrelevant after use.
   */
  bool active = true;
  
  factory Item(String name, {String location, bool active: true}) =>
    _items.firstWhere((Item i) => i.name == name && i.location == location &&
                                  i.active == active, 
        orElse: () {
          _items.removeWhere((Item i) => i.name == name);
          var item = new Item._internal(name, location, active);
          _items.add(item);
          return item;
        }
    ); 
  
  toString() => "$name";
  
  static Set<Item> getAll() => _items;
  
  static Set<Item> getAllIn(String location, {bool onlyActive: true}) =>
    _items.where((Item i) => (i.location == location) &&
        ((onlyActive && i.active) || (!onlyActive))).toSet();
  
  static Set<Item> _items = new Set<Item>();
}