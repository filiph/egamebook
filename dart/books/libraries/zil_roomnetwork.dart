part of zil;

/**
 * The global instance of [RoomNetwork]. Most games will only utilize one
 * RoomNetwork.
 */
final RoomNetwork rooms = new RoomNetwork();

/** 
 * A network of rooms.
 */
class RoomNetwork {
  Map<String,Room> _rooms = new Map<String,Room>();
  Room current = null;
  
  RoomNetwork();
  
  void addRoom(Room room) {
    //throwIfNotInInitBlock("Author can only set up room network on init.");
    assert(!_rooms.keys.contains(room.name));
    _rooms[room.name] = room;
    room.network = this;
  }
  
  /**
   * This is run after initialization of the room network and before the network
   * is used for the first time. It will connect the [Exit]s to their 
   * destination [Room]s. (We cannot do it on init because when creating the
   * exit, the two rooms might not exist yet. It would be possible to create
   * exits only after all rooms were created, but that would be much less
   * readable.)
   */
  void _setExitToFields() {
    _rooms.values.forEach((Room origin) {
      origin.exits.forEach((Exit exit) {
        assert(_rooms.keys.contains(exit.destinationPageName));
        assert(exit.from == origin);
        exit.to = _rooms[exit.destinationPageName];
      });
    });

  }

  bool _networkReady = false;
  /**
   * The network needs some setting up after all the components have been put
   * in place but before it can do things like find paths.
   */
  void _checkNetworkReady() {
    if (!_networkReady) {
      _setExitToFields();
      _networkReady = true;
    }
  }
  
  void setCurrentFromPageName(String pagename) {
    _checkNetworkReady();
    assert(_rooms.containsKey(pagename));
    current = _rooms[pagename];
  }
  
  Path findPath(Room from, Room to) {
    _checkNetworkReady();
    // TODO
    throw new UnimplementedError();
  }
}

class Path {
  final List<Room> rooms;
  
  Path(this.rooms);
}
