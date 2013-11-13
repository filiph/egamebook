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
  
  AIActor(String name, {team: Actor.NEUTRAL, isPlayer: false,
    pronoun: Pronoun.IT}) : super(name, team: team, isPlayer: isPlayer,
        pronoun: pronoun);
  
}