part of zil;

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
    return npc;
  }
  
  void updateAll(int ticks, {Room currentRoom: null, bool describe: true}) {
    for (int i = 0; i < ticks; i++) {      
      for (AIActor npc in npcs) {
        npc.update(currentRoom: currentRoom, describe: describe);
        if (gotoCalledRecently) return;
      }
    }
  }
}