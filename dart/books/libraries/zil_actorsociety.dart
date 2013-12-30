part of zil;

class ActorSociety implements ZilSaveable {
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

  Map<String, dynamic> toMap() => {
    "npcs": npcs.map((actor) => actor.toMap()).toList(),
    "player": player.toMap()
  };

  void updateFromMap(Map<String, dynamic> map) {
    List<Map<String,dynamic>> list = map["npcs"];
    assert(list.length == npcs.length);
    for (int i = 0; i < npcs.length; i++) {
      npcs[i].updateFromMap(list[i]);
    }
    player.updateFromMap(map["player"]);
  }
}