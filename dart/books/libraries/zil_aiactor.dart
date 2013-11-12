part of zil;

class AIActor extends ZilActor {
  Goal currentGoal;
  
  void update({Room currentRoom: null}) {
    if (currentGoal == null || currentGoal.completed) {      
      // When nothing else is going on, switch to autonomous thinking mode.
      currentGoal = new Think(this);
      currentGoal.activate();
    }
    var reports = currentGoal._processInternal();
    if (player.isInSameRoomAs(this)) {
      // Only report if player is around.
      storyline.reports.addAll(reports);
    }
  }
  
  AIActor(String name) : super(name) {
  }
  
}