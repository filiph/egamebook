library timeline;

import 'package:egamebook/src/book/scripter.dart';

typedef ScheduledFunction();

/// A singular event on the timeline.
abstract class TimedEvent {
  int get priority;
  String run();
}

class StringTimedEvent implements TimedEvent {
  final String text;
  final int priority;
  StringTimedEvent(this.text, {this.priority});
  String run() => text;
}

class FunctionTimedEvent implements TimedEvent {
  int time;
  final int priority;
  final ScheduledFunction action;
  String text;
  
  FunctionTimedEvent(this.action, {this.priority: 0}) {
    if (action == null || priority == null) {
      throw new ArgumentError("Timed event needs to have function "
                              "and priority set.");
    }
  }
  
  String run() {
    var returnValue = action();
    if (returnValue != null && returnValue is String) {
      return returnValue;
    } else {
      return null;
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
  /**
   * The current time. Do *not* set this unless you want to jump in time.
   * When you want the timeline to actually execute, use [elapse] or
   * [elapseToTime]. 
   */
  int time = -1;
  /**
   * The time after which this Timeline is finished.
   */
  int maxTime;
  
  /// A list of all events (strings and functions) - cannot change outside
  /// initBlock.
  final List<TimedEvent> _events = new List<TimedEvent>();
  /// A schedule. An event [:_events[i]:] scheduled for time [:x:] will be seen
  /// here as [:_schedule[i] == x:].
  /// This can change (and therefore, the whole [Timeline] is [Saveable] even
  /// though times of events can differ from playthrough to playthrough and 
  /// can be edited in runtime).
  final Map<int,int> _schedule = new Map<int,int>();

  
  /**
   * The time set by [:Timeline.time = x:]. This is used by [catchUp] as 
   * a target when the normal [elapse] operation was interrupted by a [:goto():]
   * or a choice. 
   */
  int _requestedTime = null;
  
  /**
   * Whenever a TimedEvent calls goto() or creates a choice, the Timeline
   * stops there. That TimedEvent has to make sure that [catchUp] is called
   * afterwards so that the time catches up with the requested time.
   * 
   * XXX: wouldn't it be better to ignore the rest of the time to elapse once
   * goto() is called? Because with the current catchUp(), something can happen
   * in the first few seconds of a long wait, the player gets transported
   * somewhere, and then he doesn't get to play before a long wait is 'caught
   * up'.
   */
  void catchUp() {
    if (_requestedTime == null) return;
    assert(_requestedTime > time);
    elapse(_requestedTime - time);
  }
  
  Function _mainLoop;
  Function get mainLoop => _mainLoop;
  set mainLoop(Function f) {
    throwIfNotInInitBlock();
    _mainLoop = f;
  }
  
  bool finished = false;
  
  Timeline() {
    throwIfNotInInitBlock();
  }
  
  /**
   * Schedules an event at a given time. When [time] is [:null:], the event
   * won't be fired unless it is later given a time using [reschedule].
   */
  TimedEvent schedule(int time, Object action, {int priority: 0}) {
    throwIfNotInInitBlock();
    TimedEvent event;
    if (action is String) {
      event = new StringTimedEvent(action, priority: priority);
    } else if (action is ScheduledFunction) {
      event = new FunctionTimedEvent(action, priority: priority);
    } else {
      throw new ArgumentError("Only String or a function can be scheduled. "
          "Instead, on object of type ${action.runtimeType} was recieved.");
    }
    _events.add(event);
    if (time != null) {
      assert(_events.lastIndexOf(event) == _events.length - 1);
      _schedule[_events.length - 1] = time;
    }
    return event;
  }
  
  /**
   * Re-schedules the event for another time.
   */
  void reschedule(TimedEvent event, int time) {
    int i = _events.indexOf(event);
    if (i == -1) {
      throw new ArgumentError("Event $event wasn't found in the timeline. "
          "You must first add it to timeline in the init block before being "
          "able to reschedule it."); 
    }
    _schedule[i] = time;
  }

  String className = "Timeline";
  Map<String,Object> toMap() {
    Map<String,Object> map = new Map<String,Object>();
    map["time"] = time;
    Map s = map["schedule"] = new Map<String,int>();
    _schedule.forEach((int key, int value) {
      // Need to do this because Map keys need to be String for JSON to work 
      // (not int).
      s["$key"] = value;
    });
    return map;
  }
  updateFromMap(Map map) {
    time = map["time"];
    _schedule.clear();
    Map s = (map["schedule"] as Map<String,int>);
    s.forEach((String key, int value) {
      _schedule[int.parse(key)] = value;
    });
  }
  
  void _handleEventOutput(String s) {
    if (s == null) return;
    // call top-level scripter function echo
    echo(s);
  }
  
  void _goOneTick() {
    if (_mainLoop != null) {
      _handleEventOutput(_mainLoop());
    }
    if (finished) return;
    
    List<TimedEvent> currentEvents = new List<TimedEvent>();
    // Need to walk through the list manually because we're interested in the
    // indices. (This would not be needed if we didn't try to make this
    // Saveable.
    for (int i = 0; i < _events.length; i++) {
      if (_schedule[i] == time) {
        currentEvents.add(_events[i]);
      }
    }
    currentEvents.sort((a, b) => b.priority - a.priority);
    for (var event in currentEvents) {
      _handleEventOutput(event.run());
      if (finished) return;
    }
  }
  
  /**
   * Elapse [t] number of discrete time units.
   * 
   * TODO: add a {betweenEchos} - makes possible to elapse a lot of time, with
   * many expected echo events. [betweenEchos] gets called between each two
   * echo events. Normally, the author can say things like "You continue
   * repairing the door".
   */
  void elapse(int t) {
    if (finished) return;
    if (time == null) time = -1;
    for (int i = 0; i < t; i++) {
      time += 1;
      _goOneTick();
      if (maxTime != null && time == maxTime) finished = true;
      if (finished) break;
      
      if (gotoPageName != null) {
        // An event called goto().
        throw new UnimplementedError("Cannot call goto() from a TimedEvent.");
      }
      // TODO: make sure there are no choices created during the _goOneTick
      // but allow choices to exist before the elapse... Or think about
      // other options (is this guard even necessary?).
//      if (!choices.isEmpty) {
//        // An event created a choice.
//        throw new UnimplementedError("Cannot create choice from a TimedEvent.");
//      }
    }
    if (time == _requestedTime) {
      _requestedTime = null;
    }
  }
  
  /**
   * Elapse time up until [time] == [t]. The [t] cannot be in the past.
   */
  void elapseToTime(int t) {
    if (time == null) time = -1;
    if (t < time) {
      throw new ArgumentError("Time cannot be in the past for elapseToTime.");
    }
    if (maxTime != null && t > maxTime) t = maxTime;
    _requestedTime = t;
    elapse(t - time);
  }
}

