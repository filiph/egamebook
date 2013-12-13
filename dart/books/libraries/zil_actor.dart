part of zil;

class ZilActor extends Actor implements Located {
  ZilActor(String name, {team: Actor.NEUTRAL, isPlayer: false,
    pronoun: Pronoun.IT}) 
    : super(name: name, team: team, isPlayer: isPlayer, pronoun: pronoun);
  
  Zil _zil;
  
  Room location;
  
  /**
   * Sets this ZilActor's location to the one described by the Scripter's
   * [currentPage]'s name. Alternately, when the optional [pageName] argument
   * is provided, that room will be used.
   */
  void setLocationFromCurrentPage([String pageName]) {
    if (pageName == null) {
      assert(_zil != null);
      assert(_zil._scripter != null);
      assert(_zil._scripter.currentPage != null);
      pageName = _zil._scripter.currentPage.name;
    }
    location = _zil.rooms.getFromPageName(pageName);
  }

  bool isIn(Room room) => location == room;
  bool isInOneOf(Iterable<Room> rooms) => rooms.any((room) => location == room); 
  bool isInSameRoomAs(ZilActor actor) => location == actor.location;
}

