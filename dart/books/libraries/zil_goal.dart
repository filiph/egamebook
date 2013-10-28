part of zil;

abstract class Goal {
//  static final int INACTIVE = 0;
//  static final int ACTIVE = 1;
//  static final int FAILED = 2;
//  static final int COMPLETED = 3;
//  
//  int status = INACTIVE;
  
  bool completed = false;
  AIActor performer;
  
  Goal(this.performer);
  
  /// Planning phase.
  void activate();
  /// Execution.
  void process({Room currentRoom: null});
  /// End.
  void terminate();
}

abstract class AtomicGoal extends Goal {
  /// Time needed to complete the goal.
  final int time;
  final Function endFunction;
  
  AtomicGoal(AIActor performer, int time, Function endFunction) 
      : this.time = time, this.endFunction = endFunction, super(performer);
  
}

abstract class CompositeGoal extends Goal {
  final Queue<Goal> subgoals = new Queue<Goal>();
  int get time => subgoals.fold(0, (int sum, component) => sum + component.time);
  
  CompositeGoal(AIActor performer) : super(performer);
  
  void processSubgoals({Room currentRoom: null}) {
    if (subgoals.isEmpty) {
      completed = true;
      return;
    }
    while (subgoals.first.completed) {
      subgoals.removeFirst();
    }
    while (subgoals.isNotEmpty) {
      var next = subgoals.first;
      next.process(currentRoom: currentRoom);
      if (next.completed) {
        subgoals.removeFirst();
      } else {
        return;  // Next subgoal not completed. Let it live at least until next update.
      }
    }
    completed = true;
  }
}

class Wait extends AtomicGoal {
  Wait(AIActor performer) : super(performer, 1, () => [new Report("the wait is over")]);
  
  int currentTime = 0;
  bool completed = false;
  
  void activate() {
    currentTime = 0;
    completed = false;
  }
  
  void process({Room currentRoom: null}) {
    if (currentTime >= time) {
      completed = true;
      Iterable<Report> reports = endFunction();
      if (reports != null && currentRoom != null && 
          performer.isIn(currentRoom)) {
        storyline.reports.addAll(reports);
      }
      return;
    }
    currentTime++;
  }
  
  void terminate() {}
}

class Think extends CompositeGoal {
  Think(AIActor performer) : super(performer);

  void activate() {
    completed = false;
    subgoals.clear();
  }

  void process({Room currentRoom: null}) {
    if (completed) {
      subgoals.addFirst(new Wait(performer));
      completed = false;
    }
    processSubgoals(currentRoom: currentRoom);
  }

  void terminate() {}
}