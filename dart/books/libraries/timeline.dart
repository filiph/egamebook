library timeline;

import 'package:egamebook/scripter.dart';

/// Return type is purposefully left dynamic.
typedef ScheduledFunction();

/// A singular event on the timeline.
abstract class TimedEvent {
  int get type;
  int get priority;
  String run();

  /// Info events are often simple, short messages. They need to be run and
  /// presented to the player, but they are not immediately actionable, and
  /// they do not call [goto].
  ///
  /// You normally want to use [SINGULAR] events (those are default with
  /// [Timeline.schedule]) because those guarantee that during a longer stretch
  /// of elapsed time, you won't see many events one right after another.
  ///
  /// Example: "The ship computer announces end of red alert."
  static const int INFO = 1;
  /// Time progress events are events that can be skipped if needed. They are
  /// there to give a sense of elapsing time. When two or more time progress
  /// events meet next to each other, only the second one is displayed.
  ///
  /// Example: "You are feeling more and more sick."
  static const int TIME_PROGRESS = 2;
  /// Singular events can happen in stretches of non-interactive timespans,
  /// but they must be the only events presented there.
  ///
  /// This helps from having several different events one right after another.
  ///
  /// Example: "While $whileString, the Bodega starts ranting about ..."
  static const int SINGULAR = 4;
  /// Major events are those that cannot be skipped, and that shouldn't happen
  /// inside other 'scripted' events. They often call [goto]. They should be
  /// immediately actionable right after they have been fired. Thus, we
  /// shouldn't advance time after a major event was fired unless player
  /// had a chance to react to it. This would create bizarre situations in which
  /// the player is, say, repairing a hatch, then a huge explosion happens
  /// somewhere on the ship, after which the player continues with the repair
  /// like nothing happened.
  ///
  /// The implementation of [Timeline] moves these events (and every event that
  /// comes after them) until it knows that the player will be able to act
  /// on them.
  ///
  /// Example: "There is a sudden explosion on the ship! ..."
  static const int MAJOR = 3;

  bool get isMajor => type == TimedEvent.MAJOR;
  bool get isSingular => type == TimedEvent.SINGULAR;
}

class StringTimedEvent extends TimedEvent {
  final int type;
  final String text;
  final int priority;
  StringTimedEvent(this.text, {this.priority: 0, this.type: TimedEvent.INFO});
  String run() => text;
}

class FunctionTimedEvent extends TimedEvent {
  final int type;
  final ScheduledFunction action;
  final int priority;
  String text;

  FunctionTimedEvent(this.action,
      {this.priority: 0, this.type: TimedEvent.INFO}) {
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

  /// This string will be set during the time of [elapse]. It can be used by
  /// TimedEvents to provide a linguistic bridge.
  ///
  /// For example, this call:
  ///
  ///     timeline.elapse(6, whileString: "you are repairing the hyperdrive");
  ///
  /// coupled with this event:
  ///
  ///     TimedEvent(() => echo("While ${timeline.whileString}, the lights "
  ///                           "flicker for a moment"));
  ///
  /// will generate:
  ///
  ///     While you are repairing the hyperdrive, the lights flicker
  ///     for a moment.
  String get whileString => _whileString;

  String _whileString;

  /// Utility function that outputs [otherwise] when [whileString] is [:null:]
  /// or it uses the [template] with the current value of [whileString].
  ///
  /// [template] should include the string [:<whileString>:] – it will be
  /// replaced with the current value of [whileString].
  String generateWhileOutput(String template, String otherwise) {
    if (whileString == null) return otherwise;
    return template.replaceAll(WHILE_TEMPLATE_STRING, whileString);
  }

  static const String WHILE_TEMPLATE_STRING = "<whileString>";

  /// A list of all events (strings and functions) - cannot change outside
  /// initBlock.
  final List<TimedEvent> _events = new List<TimedEvent>();
  /// A schedule. An event [:_events[i]:] scheduled for time [:x:] will be seen
  /// here as [:_schedule[i] == x:].
  /// This can change (and therefore, the whole [Timeline] is [Saveable] even
  /// though times of events can differ from playthrough to playthrough and
  /// can be edited in runtime).
  final Map<int, int> _schedule = new Map<int, int>();

  Function _mainLoop;
  Function get mainLoop => _mainLoop;
  set mainLoop(Function f) {
    throwIfNotInInitOrDeclareBlock();
    _mainLoop = f;
  }

  bool finished = false;

  Timeline() {
    throwIfNotInInitOrDeclareBlock();
  }

  /**
   * Schedules an event at a given time. When [time] is [:null:], the event
   * won't be fired unless it is later given a time using [reschedule].
   *
   * When scheduling events that call [goto], the author should be aware that
   * once such an even is called, the flow of time is cut off. For example,
   * if the [time] is 15, an event with a [:goto("somewhere");:] line is
   * scheduled for time 20, and we call [:elapse(10):], the elapse function
   * will stop prematurely (at [:time == 20:]). Any next call to [elapse] will
   * continue from time 20.
   */
  TimedEvent schedule(int time, Object action,
      {int priority: 0, int type: TimedEvent.SINGULAR}) {
    throwIfNotInInitOrDeclareBlock();
    TimedEvent event;
    if (action is String) {
      event = new StringTimedEvent(action, priority: priority, type: type);
    } else if (action is ScheduledFunction) {
      event = new FunctionTimedEvent(action, priority: priority, type: type);
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
  Map<String, Object> toMap() {
    Map<String, Object> map = new Map<String, Object>();
    map["time"] = time;
    Map s = map["schedule"] = new Map<String, int>();
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
    Map s = (map["schedule"] as Map<String, int>);
    s.forEach((String key, int value) {
      _schedule[int.parse(key)] = value;
    });
  }

  void _handleEventOutput(String s) {
    if (s == null) return;
    // call top-level scripter function echo
    echo(s);
  }

  void _goOneTick(bool interactive) {
    if (_mainLoop != null) {
      _handleEventOutput(_mainLoop());
    }
    if (finished) return;

    List<TimedEvent> currentEvents = _getOrPostponeEvents(interactive);

    currentEvents.sort((a, b) => b.priority - a.priority);
    for (var event in currentEvents) {
      _handleEventOutput(event.run());
      if (event.isSingular) {
        _singularAlreadyFired = true;
        return;
      }
      if (finished) return;
    }
  }

  /// Goes through events, takes those that should run in this [time] and either
  /// returns them, or postpones them (when they're major and we are not in
  /// interactive mode, for example).
  List<TimedEvent> _getOrPostponeEvents(bool interactive) {
    List<TimedEvent> currentEvents = new List<TimedEvent>();
    // Need to walk through the list manually because we're interested in the
    // indices. (This would not be needed if we didn't try to make this
    // Saveable.)
    for (int i = 0; i < _events.length; i++) {
      if (_schedule[i] == time) {
        currentEvents.add(_events[i]);
      }
    }

    bool waitingForInteractivity =
        !interactive && currentEvents.any((TimedEvent e) => e.isMajor);
    bool waitingBecauseOfSingularEvent = _singularAlreadyFired &&
        currentEvents.any((TimedEvent e) => e.isSingular);

    if (waitingForInteractivity || waitingBecauseOfSingularEvent) {
      // Push all upcoming events by one tick.
      Set<int> indexesToPush = new Set<int>();
      _schedule.forEach((int eventIndex, int eventTime) {
        if (eventTime > time ||
            // Move only major events, the rest can stay and be run below.
            (waitingForInteractivity &&
                eventTime == time &&
                _events[eventIndex].isMajor) ||
            waitingBecauseOfSingularEvent && eventTime >= time) {
          indexesToPush.add(eventIndex);
          currentEvents.remove(_events[eventIndex]);
        }
      });
      indexesToPush.forEach((int index) => _schedule[index] += 1);
    }
    return currentEvents;
  }

  /**
   * Elapse [t] number of discrete time units. Fire events scheduled for
   * that time.
   *
   * If [interactive] is [:true:] (default), the last tick is considered
   * interactive, which means that [TimedEvent.MAJOR] events can occur on the
   * last tick. Otherwise, these events (and every other events that are
   * scheduled after them) are shifted until just after [t].
   *
   * TODO: add a {betweenEchos} - makes possible to elapse a lot of time, with
   * many expected echo events. [betweenEchos] gets called between each two
   * echo events. Normally, the author can say things like "You continue
   * repairing the door".
   */
  void elapse(int t, {bool interactive: true, String whileString}) {
    if (finished) return;
    if (time == null) time = -1;
    _whileString = whileString;
    for (int i = 0; i < t; i++) {
      time += 1;
      _goOneTick(interactive && (i == t - 1));
      if (maxTime != null && time == maxTime) finished = true;
      if (finished) break;

      if (gotoCalledRecently) {
        break;
      }
      // TODO: make sure there are no choices created during the _goOneTick
      // but allow choices to exist before the elapse... Or think about
      // other options (is this guard even necessary?).
//      if (!choices.isEmpty) {
//        // An event created a choice.
//        throw new UnimplementedError("Cannot create choice from a TimedEvent.");
//      }
    }
    // Reset singular _after_ the last tick of elapse, if interactive.
    if (interactive) _singularAlreadyFired = false;
    _whileString = null;
  }

  bool _singularAlreadyFired = false;

  /**
   * Elapse time up until [time] == [t]. The [t] cannot be in the past.
   */
  void elapseToTime(int t, {bool interactive: true}) {
    if (time == null) time = -1;
    if (t < time) {
      throw new ArgumentError("Time cannot be in the past for elapseToTime.");
    }
    if (maxTime != null && t > maxTime) t = maxTime;
    elapse(t - time, interactive: interactive);
  }

  /// Returns true if the provided [t] is the same as current value of [time].
  bool currentlyAtTime(int t) => t == time;

  /// Returns true if the provided [t] is one less than [time]. This means that
  /// an action that happened at time [t] happened "just a second ago".
  ///
  /// Returns false if [t] is null.
  bool oneTickAheadOf(int t) => (t == null) ? false : t == time - 1;
}
