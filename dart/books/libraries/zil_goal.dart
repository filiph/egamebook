part of zil;

abstract class Goal {
//  static final int INACTIVE = 0;
//  static final int ACTIVE = 1;
//  static final int FAILED = 2;
//  static final int COMPLETED = 3;
//  
//  int status = INACTIVE;
  
  // TODO: status. When status failed => propagate
  
  bool completed = false;
  AIActor performer;
  
  Goal(this.performer);
  
  /// Planning phase.
  List<Report> activate();
  /// Execution.
  List<Report> process();
  /// End.
  List<Report> terminate();
  
  bool _activated = false;
  List<Report> _processInternal() {
    List<Report> reports = [];
    if (!_activated) {
      reports.addAll(activate());
      _activated = true;
    }
    if (this is CompositeGoal) {
      reports.addAll((this as CompositeGoal)._processSubgoals());
    }
    reports.addAll(process());
    return reports;
  }
}

abstract class AtomicGoal extends Goal {
  /// Time needed to complete the goal.
  final int time;
  
  AtomicGoal(AIActor performer, int time) 
      : this.time = time, super(performer);
}

abstract class TimedAtomicGoal extends AtomicGoal {
  int currentTime = 0;
  TimedAtomicGoal(AIActor performer, int time) : super(performer, time);
  
  List<Report> process() {
    if (currentTime >= time) {
      completed = true;
      return terminate();
    }
    currentTime += 1;
    return [];
  }
}

abstract class CompositeGoal extends Goal {
  final Queue<Goal> subgoals = new Queue<Goal>();
  int get time => subgoals.fold(0, (int sum, component) => sum + component.time);
  
  CompositeGoal(AIActor performer) : super(performer);
  
  List<Report> _processSubgoals() {
    List<Report> reports = [];
    if (subgoals.isEmpty) {
      completed = true;
      reports.addAll(terminate());
      return reports;
    }
    while (subgoals.first.completed) {
      subgoals.removeFirst();
    }
    while (subgoals.isNotEmpty) {
      var next = subgoals.first;
      reports.addAll(next._processInternal());
      if (next.completed) {
        subgoals.removeFirst();
      } else {
        return reports;  // Next subgoal not completed. Let it live at least until next update.
      }
    }
    completed = true;
    return reports;
  }
}

class Wait extends TimedAtomicGoal {
  Wait(AIActor performer) : super(performer, 1);

  List<Report> activate() => [performer.report("<subject> start<s> waiting")];
  List<Report> terminate() => [performer.report("<subject> finish<es> waiting")];
}

//class GoPickUp extends CompositeGoal {
//  GoPickUp(AIActor performer) : super(performer);
//
//  void activate() {
//    // TODO implement this method
//  }
//
//  void process({Room currentRoom: null}) {
//    // TODO implement this method
//  }
//
//  void terminate() {
//    // TODO implement this method
//  }
//}

class TestPickUpAndComment extends CompositeGoal {
  Item item;
  TestPickUpAndComment(AIActor performer, this.item) : super(performer);
  
  List<Report> activate() {
    subgoals.add(new Say(performer, "I'm gonna pick this ${item.name} up."));
    subgoals.add(new PickUpInRoom(performer, item));
    subgoals.add(new Say(performer, "Great!"));
    return [];
  }

  List<Report> process() => [];

  List<Report> terminate() => [];
}

class Say extends TimedAtomicGoal {
  String message;
  Say(AIActor performer, this.message) : super(performer, 1);
  

  List<Report> activate() => [];
  List<Report> terminate() => [performer.report("<subject> say<s>: \"$message\"")];
}

class PickUpInRoom extends TimedAtomicGoal {
  Item item;
  
  PickUpInRoom(AIActor performer, this.item) : super(performer, 1);

  List<Report> activate() {
    assert(item.isInSameRoomAs(performer));
    assert(item.takeable);
    return [];
  }

  List<Report> terminate() {
    item.carrier = performer;
    return [performer.report("<subject> pick<s> up <object>", object: item)];
  }
}

class TraverseFromRoomToRoom extends TimedAtomicGoal {
  Room from, to;
  TraverseFromRoomToRoom(AIActor performer, Room from, Room to) 
    : super(performer, 
        from.exits.firstWhere((Exit exit) => exit.to == to, // Gets travel cost.
          orElse: throw new Exception("Cannot traverse from $from to $to.")
        ).cost) {
    this.from = from;
    this.to = to;
  }

  List<Report> activate() => [performer.report("<subject> leave<s> towards $to")];
  List<Report> terminate() => [performer.report("<subject> arrive<s> from $from")];
}

class Think extends CompositeGoal {
  Think(AIActor performer) : super(performer);

  List<Report> activate() {
    completed = false;
    subgoals.clear();
    subgoals.add(new Wait(performer));
    return [];
  }

  List<Report> process() => [];
  List<Report> terminate() => [];

}