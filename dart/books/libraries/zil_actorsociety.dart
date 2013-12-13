part of zil;

class ActorSociety {
  final Zil _zil;
  Set<AIActor> npcs = new Set<AIActor>();
  ZilActor player;
  
  RoomNetwork rooms;
  
  ActorSociety(this._zil, this.player) {
    _zil.rooms.actors = this;
  }
  
  AIActor add(AIActor npc, Room location) {
    npcs.add(npc);
    npc.location = location;
    npc._zil = _zil;
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