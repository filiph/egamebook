part of zil;

/** 
 * [RoomNetwork] contains all the rooms in the game environment and takes care
 * of their persistance. It also provides methods for pathfinding.
 */
class RoomNetwork implements Graph<Room>, ZilSaveable {
  final Zil _zil;
  Map<String, Room> _rooms = new Map<String, Room>();

  AStar aStar;

  RoomNetwork(this._zil) {
    // Nothing to do here.
  }

  void add(Room room) {
    throwIfNotInInitOrDeclareBlock(
        "Author can only set up room network on init.");
    assert(!_rooms.keys.contains(room.name));
    _rooms[room.name] = room;
  }

  Room getFromPageName(String pageName) {
    if (!_rooms.containsKey(pageName)) {
      throw new PageNotDefinedInZilException(pageName);
    }
    return _rooms[pageName];
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
        if (!_rooms.keys.contains(exit.destinationPageName)) {
          throw new ZilException("Couldn't find '${exit.destinationPageName}' "
              "among the rooms in the RoomNetwork. This is linked from "
              "the page '${exit.from.name}'");
        }
        assert(exit.from == origin);
        exit.to = _rooms[exit.destinationPageName];
      });
    });
  }

  /**
   * This is also run after initialization and before first use. It sets up
   * the [aStar] instance for finding paths.
   */
  void _createAStar() {
    aStar = new AStar(this);
  }

  bool _networkReady = false;
  /**
   * The network needs some setting up after all the components have been put
   * in place but before it can do things like find paths.
   */
  void _checkNetworkReady() {
    if (!_networkReady) {
      _setExitToFields();
      _createAStar();
      _networkReady = true;
    }
  }

  Queue<Room> findPath(Room from, Room to) {
    _checkNetworkReady();
    return aStar.findPathSync(from, to);
  }

  // TODO: take into account exit prerequisites - different paths for different actors

  Iterable<Room> get allNodes => _rooms.values;

  num getDistance(Room a, Room b) {
    Exit exitToB =
        a.exits.firstWhere((Exit exit) => exit.to == b, orElse: null);
    if (exitToB == null) return null;
    if (!exitToB.isActive) return null;
    return exitToB.cost;
  }

  num getHeuristicDistance(Room a, Room b) {
    assert(a.coordinates.length == 3);
    assert(b.coordinates.length == 3);
    if (a == b) return 0;
    num xd = b.coordinates[0] - a.coordinates[0];
    num yd = b.coordinates[1] - a.coordinates[1];
    num zd = b.coordinates[2] - a.coordinates[2];
    return Math.sqrt(xd * xd + yd * yd + zd * zd);
  }

  Iterable<Room> getNeighboursOf(Room room) =>
      room.exits.map((Exit exit) => exit.to);

  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map<String, dynamic>();
    _rooms.forEach((name, room) {
      map[name] = room.toMap();
    });
    return map;
  }

  void updateFromMap(Map<String, dynamic> map) {
    assert(map.length == _rooms.length);
    _rooms.forEach((name, room) {
      room.updateFromMap(map[name]);
    });
  }
}
