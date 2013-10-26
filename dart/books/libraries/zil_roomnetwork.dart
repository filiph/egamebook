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
  
  void setCurrentFromPageName(String pagename) {
    assert(_rooms.containsKey(pagename));
    current = _rooms[pagename];
  }
  
  Path findPath(Room from, Room to) {
    // TODO
    throw new UnimplementedError();
  }
}

class Path {
  final List<Room> rooms;
  
  Path(this.rooms);
}
