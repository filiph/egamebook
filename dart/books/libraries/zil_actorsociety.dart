part of zil;

class ActorSociety {
  final Zil _zil;
  List<AIActor> npcs = new List<AIActor>();
  ZilActor player;
  
  RoomNetwork rooms;
  
  ActorSociety(this._zil);
  
  void add(AIActor npc) {
    throwIfNotInInitBlock();
    npcs.add(npc);
  }
  
  void updateAll(int ticks, {Room currentRoom: null, bool describe: true}) {
    for (int i = 0; i < ticks; i++) {
      for (AIActor npc in npcs) {
        npc.update(currentRoom: currentRoom, describe: describe);
        if (gotoCalledRecently) return;
      }
    }
  }
  
  ZilActor findByName(String name) {
    if (name == player.name) {
      return player;
    }
    return npcs.singleWhere((npc) => npc.name == name);
  }
}