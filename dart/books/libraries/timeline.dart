library timeline;

import '../../lib/src/book/scripter.dart';

/// Type for the closure to be called at specified time(s). Returns [:true:]
/// when Timeline should continue, [:false:] if it's finished.
typedef bool EventClosure(Timeline timeline);

/// A singular event on the timeline.
class TimedEvent {
  final int time;
  final int priority;
  EventClosure f;
  String text;
  TimedEvent(this.time, dynamic action, {this.priority: 0}) {
    if (time == null || action == null || priority == null) {
      throw new ArgumentError("Timed event needs to have time, closure "
                              "and priority set.");
    }
    if (action is String) {
      text = action;
    } else if (action is EventClosure) {
      f = action;
    } else {
      throw new ArgumentError("Second parameter in TimedEvent() constructor "
                              "must either be a String or a function.");
    }
  }
  
  bool run(Timeline timeline) {
    if (f != null) {
      return f(timeline);
    } else if (text != null) {
      echo(text);
      return true;
    } else {
      throw "Invalid state of TimedEvent: both text and f are null.";
    }
  }
}

/**
 * The [Timeline] contains a series of scheduled events. Events are then
 * executed according to what the time is.
 * 
 * Only the current [time] is saved and loaded. The rest needs to be
 * defined in the [:<variables>:] block. 
 */
class Timeline implements Saveable {
  int time;
  
  EventClosure mainLoop;
  Set<TimedEvent> events;
  bool finished;
  
  Timeline() {
    finished = false;
    events = new Set<TimedEvent>();
  }

  toMap() => {"time": time, "_class": "Timeline"};
  updateFromMap(map) => time = map["time"];
  
  bool goOneTick() {
    var canContinue;
    if (mainLoop != null) {
      canContinue = mainLoop(this);
    }
    if (canContinue != null && !canContinue) return false;
    
    List<TimedEvent> currentEvents = events.where((ev) => ev.time == time)
                                      .toList();
    currentEvents.sort((a, b) => b.priority - a.priority);
    for (var event in currentEvents) {
      canContinue = event.run(this);
      if (canContinue != null && !canContinue) return false;
    }
    return true;
  }
  
  /**
   * Elapse [t] number of discrete time units.
   */
  void elapse([int t = 1]) {
    if (finished) return;
    if (time == null) time = -1;
    for (int i = 0; i < t; i++) {
      time += 1;
      var canContinue = goOneTick();
      if (!canContinue) {
        finished = true;
        break;
      }
    }
  }
}

