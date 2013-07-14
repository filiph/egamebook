library timeline;

import 'package:egamebook/src/book/scripter.dart';
import 'storyline.dart';

typedef void ScheduledFunction();

/// A singular event on the timeline.
class TimedEvent {
  final int time;
  final int priority;
  ScheduledFunction f;
  String text;
  
  TimedEvent(this.time, dynamic action, {this.priority: 0}) {
    if (time == null || action == null || priority == null) {
      throw new ArgumentError("Timed event needs to have time, closure "
                              "and priority set.");
    }
    if (action is String) {
      text = action;
    } else if (action is ScheduledFunction) {
      f = action;
    } else {
      throw new ArgumentError("Second parameter in TimedEvent() constructor "
                              "must either be a String or a function.");
    }
  }
  
  TimedEvent.string(this.time, this.text, {this.priority: 0});
  
  TimedEvent.function(this.time, this.f, {this.priority: 0});
  
  String run() {
    if (f != null) {
      var returnValue = f();
      if (returnValue != null && returnValue is String) {
        return returnValue;
      } else {
        return null;
      }
    } else if (text != null) {
      return text;
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
  int _time = -1;
  int length;
  
  int get time => _time;
  set time(value) {
    if (_time == null) _time = -1;
    if (value < _time) throw new ArgumentError("Cannot go back in time.");
    if (length != null && value > length) value = length;
    elapse(value - _time);
  }
  
  Function _mainLoop;
  Function get mainLoop => _mainLoop;
  set mainLoop(Function f) {
    throwIfNotInInitBlock();
    _mainLoop = f;
  }
  
  Set<TimedEvent> _events;
  bool finished = false;
  
  Storyline storyline;
  
  Timeline({this.storyline}) {
    throwIfNotInInitBlock();
    _events = new Set<TimedEvent>();
  }
  
  void schedule(int time, Object action, {int priority: 0}) {
    throwIfNotInInitBlock();
    _events.add(new TimedEvent(time, action, priority: priority));
  }

  String className = "Timeline";
  toMap() => {"time": _time};
  updateFromMap(map) => _time = map["time"];
  
  // TODO add event
  // TODO mainLoop = just another event, but with null time => priority!
  
  void _handleEventOutput(String s) {
    if (s == null) return;
    if (this.storyline != null) {
      storyline.add(s, time: _time);
    } else {
      // call top-level scripter function echo
      echo(s);
    }
  }
  
  void _goOneTick() {
    if (_mainLoop != null) {
      _handleEventOutput(_mainLoop());
    }
    if (finished) return;
    
    List<TimedEvent> currentEvents = _events.where((ev) => ev.time == _time)
                                      .toList();
    currentEvents.sort((a, b) => b.priority - a.priority);
    for (var event in currentEvents) {
      _handleEventOutput(event.run());
      if (finished) return;
    }
  }
  
  /**
   * Elapse [t] number of discrete time units.
   */
  void elapse([int t = 1]) {
    if (finished) return;
    if (_time == null) _time = -1;
    for (int i = 0; i < t; i++) {
      _time += 1;
      _goOneTick();
      if (length != null && _time == length) finished = true;
      if (finished) break;
    }
  }
}

