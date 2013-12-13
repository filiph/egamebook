part of zil;

class ZilActor extends Actor implements Located {
  ZilActor(String name, {team: Actor.NEUTRAL, isPlayer: false,
    pronoun: Pronoun.IT}) 
    : super(name: name, team: team, isPlayer: isPlayer, pronoun: pronoun);
  
  Zil _zil;
  
  Room location;

  bool isIn(Room room) => location == room;
  bool isInOneOf(Iterable<Room> rooms) => rooms.any((room) => location == room); 
  bool isInSameRoomAs(ZilActor actor) => location == actor.location;
}

