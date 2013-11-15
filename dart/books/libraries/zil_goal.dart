part of zil;

abstract class Goal {
  static final int INACTIVE = 0;
  static final int ACTIVE = 1;
  static final int FAILED = 2;
  static final int COMPLETED = 3;
  
  int status = INACTIVE;
  bool get _activated => status != INACTIVE;
  set _activated(bool value) => status = (value ? ACTIVE : INACTIVE);
  bool get failed {
    if (this is CompositeGoal) {
      if (status == FAILED) return true;
      // If any subgoal has failed, the overarching composite goal also fails.
      return (this as CompositeGoal).subgoals.any((Goal goal) => goal.failed);
    }
    return status == FAILED;
  }
  set failed(bool value) => status = (value ? FAILED : status);
  bool get completed => status == COMPLETED;
  set completed(bool value) {
    if (status == FAILED) return;  // Ignore if goal already failed.
    status = COMPLETED;
  }
  
  // TODO: status. When status failed => propagate
  
  
  AIActor performer;
  
  Goal(this.performer);
  
  /// Planning phase. Gets called when the goal is starting to be executed.
  List<Report> onActivate();
  /// Execution. The method is run periodically each turn until the goal is
  /// finished or failed.
  List<Report> onProcess();
  /// End. Gets called when goal is finished successfully. 
  List<Report> onTerminate();
  /// Fail. Gets called after the [fail] method.
  List<Report> onFail();
  
  /// Fail.
  List<Report> fail() {
    status = FAILED;
    return onFail();
  }
  
  List<Report> _processInternal() {
    List<Report> reports = <Report>[];
    if (!_activated) {
      reports.addAll(onActivate());
      _activated = true;
    }
    if (this is CompositeGoal) {
      reports.addAll((this as CompositeGoal)._processSubgoals());
      if (failed) return reports;  // Stop from running onProcess if any subgoal
                                   // has failed.
    }
    reports.addAll(onProcess());
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
  
  List<Report> onProcess() {
    if (currentTime >= time) {
      completed = true;
      return onTerminate();
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
    List<Report> reports = <Report>[];
    if (subgoals.isEmpty) {
      completed = true;
      reports.addAll(onTerminate());
      return reports;
    }
    while (subgoals.first.completed) {
      subgoals.removeFirst();
    }
    while (subgoals.isNotEmpty) {
      var next = subgoals.first;
      reports.addAll(next._processInternal());
      if (next.completed) {
        // Remove this subgoal and immediately start the next one.
        subgoals.removeFirst();
      } else if (next.failed) {
        // Stop processing and fail the overarching composite goal.
        reports.addAll(fail());
        return reports;
      } else {
        // Next subgoal not completed. Let it live at least until next update.
        return reports;  
      }
    }
    completed = true;
    return reports;
  }
}

class Wait extends TimedAtomicGoal {
  Wait(AIActor performer) : super(performer, 1);

  List<Report> onActivate() => [performer.report("<subject> start<s> waiting")];
  List<Report> onTerminate() => [performer.report("<subject> finish<es> waiting")];
  List<Report> onFail() => [];
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
  
  List<Report> onActivate() {
    subgoals.add(new Say(performer, "I'm gonna pick this ${item.name} up."));
    subgoals.add(new PickUpInRoom(performer, item));
    subgoals.add(new Say(performer, "Great!"));
    return [];
  }

  List<Report> onProcess() => [];
  List<Report> onTerminate() => [];
  List<Report> onFail() => [performer.report("<subject> say<s>: \"Oh crap.\"")];
}

class Say extends TimedAtomicGoal {
  String message;
  Say(AIActor performer, this.message) : super(performer, 1);

  List<Report> onActivate() => [];
  List<Report> onTerminate() => [performer.report("<subject> say<s>: \"$message\"")];
  List<Report> onFail() => [];
}

class PickUpInRoom extends TimedAtomicGoal {
  Item item;
  
  PickUpInRoom(AIActor performer, this.item) : super(performer, 1);

  List<Report> onActivate() => [];
  List<Report> onTerminate() {
    var reports = <Report>[];
    if (!item.isInSameRoomAs(performer)) {
      return fail(); 
    }
    if (!item.takeable) {
      return fail();
    }
    item.carrier = performer;
    return [performer.report("<subject> pick<s> up <object>", object: item)];
  }

  List<Report> onFail() => [];
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

  List<Report> onActivate() => [performer.report("<subject> leave<s> towards $to")];
  List<Report> onTerminate() => [performer.report("<subject> arrive<s> from $from")];
  List<Report> onFail() => [];
}

class GoToRoom extends CompositeGoal {
  final Room targetRoom;
  GoToRoom(AIActor performer, this.targetRoom) : super(performer);

  List<Report> onActivate() {
    // TODO implement this method
  }

  List<Report> onProcess() {
    // TODO implement this method
  }

  List<Report> onTerminate() {
    // TODO implement this method
  }

  List<Report> onFail() {
    // TODO implement this method
  }
}

class Think extends CompositeGoal {
  Think(AIActor performer) : super(performer);

  List<Report> onActivate() {
    completed = false;
    subgoals.clear();
    subgoals.add(new Wait(performer));
    return [];
  }

  List<Report> onProcess() => [];
  List<Report> onTerminate() => [];
  List<Report> onFail() {
    // TODO re-plan.
    return [];
  }
}