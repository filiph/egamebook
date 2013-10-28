part of zil;

ActorSociety actors = new ActorSociety(rooms, player);

class ActorSociety {
  Set<AIActor> npcs = new Set<AIActor>();
  ZilActor player;
  
  RoomNetwork rooms;
  
  ActorSociety(this.rooms, this.player) {
    rooms.actors = this;
  }
  
  AIActor add(AIActor npc, Room location) {
    npcs.add(npc);
    npc.location = location;
  }
  
  void update(int ticks, {Room currentRoom: null}) {
    for (int i = 0; i < ticks; i++) {      
      for (AIActor npc in npcs) {
        npc.update(currentRoom: currentRoom);
      }
    }
  }
}