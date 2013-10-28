part of zil;

class AIActor extends ZilActor {
  
  Goal currentGoal;
  int _currentGoalElapsed = 0;
  
  void update({Room currentRoom: null}) {
    currentGoal.process(currentRoom: currentRoom);
  }
  
  AIActor(String name) : super(name) {
    currentGoal = new Think(this);
    currentGoal.activate();
  }
  
}