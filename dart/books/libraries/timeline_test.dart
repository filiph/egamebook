import 'package:unittest/unittest.dart';
import 'package:egamebook/scripter.dart';
import 'timeline.dart';


void main() {
  test("mainLoop works", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    isInInitBlock = false;
    timeline.elapse(10);
    var str = textBuffer.toString();
    expect(str, contains("9 past the hour"));
  });

  test("custom event at given time works", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    timeline.schedule(5, "String event.", type: TimedEvent.INFO);
    timeline.schedule(6, () => echo("Closure event."), type: TimedEvent.INFO);

    timeline.schedule(7, "Bam.", type: TimedEvent.INFO);
    timeline.schedule(7, "Bim.", priority: 10, type: TimedEvent.INFO);
    isInInitBlock = false;

    timeline.elapse(10);
    var str = textBuffer.toString();
    expect(str, contains("9 past the hour"));
    expect(str, contains("String event."));
    expect(str, contains("Closure event."));
    expect(str, contains("Bim. Bam."));
  });

  test("length works", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    timeline.maxTime = 9;
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    timeline.schedule(5, "String event.");
    timeline.schedule(6, () => echo("Closure event."));
    timeline.schedule(7, "Bam.");
    timeline.schedule(7, "Bim.", priority: 10);
    isInInitBlock = false;

    timeline.elapse(10);
    var str = textBuffer.toString();

    textBuffer.clear();
    timeline.elapse(10);
    expect(textBuffer.toString(), "");
  });

  test("elapseToTime and elapse are equivalent", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    timeline.schedule(5, "String event.");
    timeline.schedule(6, () => echo("Closure event."));
    timeline.schedule(7, "Bam.");
    timeline.schedule(7, "Bim.", priority: 10);
    isInInitBlock = false;
    timeline.time = 0;
    timeline.elapse(10);
    var str = textBuffer.toString();

    textBuffer.clear();
    timeline.time = 0;
    timeline.elapseToTime(10);
    expect(textBuffer.toString(), str);
  });

  test("advancing time one tick at a time is equivalent to in bulk", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    timeline.schedule(3, "Info action.", type: TimedEvent.INFO);
    timeline.schedule(4, "Progress action.", type: TimedEvent.TIME_PROGRESS);
    timeline.schedule(5, "String event.");
    timeline.schedule(6, () => echo("Closure event."));
    timeline.schedule(7, "Bam.");
    timeline.schedule(7, "Bim.", priority: 10);
    isInInitBlock = false;
    timeline.time = 0;
    int ticks = 10;
    timeline.elapse(ticks);
    var str = textBuffer.toString();

    textBuffer.clear();
    timeline.time = 0;
    for (int i = 0; i < ticks; i++) {
      timeline.elapse(1, interactive: i == ticks - 1);
    }
    expect(textBuffer.toString(), str);
  });

  test("progress events show in non-interactive elapses", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    timeline.schedule(4, "Progress action.", type: TimedEvent.TIME_PROGRESS);
    isInInitBlock = false;
    timeline.time = 0;
    int ticks = 10;
    timeline.elapse(ticks, interactive: false);
    var str = textBuffer.toString();

    textBuffer.clear();
    timeline.time = 0;
    for (int i = 0; i < ticks; i++) {
      timeline.elapse(1, interactive: false);
    }
    expect(textBuffer.toString(), str);
    expect(str, contains("Progress action."));
  });

  test("rescheduling works", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("Time: ${timeline.time}.");
    };
    var stringEv = timeline.schedule(null, "String event.", type: TimedEvent.INFO);
    var functionEv = timeline.schedule(null, () => echo("Closure event."), type: TimedEvent.INFO);
    timeline.schedule(7, "Bam.", type: TimedEvent.INFO);
    timeline.schedule(7, "Bim.", priority: 10, type: TimedEvent.INFO);
    isInInitBlock = false;

    timeline.elapseToTime(3);
    timeline.reschedule(stringEv, timeline.time + 1);
    timeline.reschedule(functionEv, 10);
    timeline.elapseToTime(10);
    var str = textBuffer.toString();
    expect(str, "Time: 0. Time: 1. Time: 2. Time: 3. Time: 4. String event. "
        "Time: 5. Time: 6. Time: 7. Bim. Bam. Time: 8. Time: 9. Time: 10. "
        "Closure event.");
  });

  group("major events", () {
    test("delay those after them", () {
      textBuffer.clear();
      isInInitBlock = true;
      var timeline = new Timeline();
      timeline.schedule(1, "String event on 1.", type: TimedEvent.INFO);
      timeline.schedule(5, "String event on 5.", type: TimedEvent.INFO);
      timeline.schedule(7, "Major event on 7.", type: TimedEvent.MAJOR);
      timeline.schedule(10, () => echo("Closure event on 10, but actual time "
          "is ${timeline.time}."), type: TimedEvent.INFO);
      timeline.schedule(15, "String event on 15.", type: TimedEvent.INFO);

      timeline.elapse(10);  // Only the last tick is considered interactive.
      timeline.elapse(10);

      var str = textBuffer.toString();
      expect(str, "String event on 1. String event on 5. Major event on 7. "
          "Closure event on 10, but actual time is 12. String event on 15.");
    });

    test("are fired at the end when elapse is interactive", () {
      textBuffer.clear();
      isInInitBlock = true;
      var timeline = new Timeline();
      timeline.schedule(1, "String event on 1.", type: TimedEvent.INFO);
      timeline.schedule(5, "String event on 5.", type: TimedEvent.INFO);
      timeline.schedule(7, "Major event on 7.", type: TimedEvent.MAJOR);
      timeline.schedule(10, () => echo("Closure event on 10, but actual time "
          "is ${timeline.time}."), type: TimedEvent.INFO);
      timeline.schedule(15, "String event on 15.", type: TimedEvent.INFO);

      timeline.elapse(10);

      var str = textBuffer.toString();
      expect(str, contains("Major event on 7."));
    });

    test("are fired at the end when elapse is interactive, "
        "when elapsing tick by tick", () {
      textBuffer.clear();
      isInInitBlock = true;
      var timeline = new Timeline();
      timeline.schedule(1, "String event on 1.", type: TimedEvent.INFO);
      timeline.schedule(5, "String event on 5.", type: TimedEvent.INFO);
      timeline.schedule(7, "Major event on 7.", type: TimedEvent.MAJOR);
      timeline.schedule(10, () => echo("Closure event on 10, but actual time "
          "is ${timeline.time}."), type: TimedEvent.INFO);
      timeline.schedule(15, "String event on 15.", type: TimedEvent.INFO);

      for (int i = 0; i < 10; i++) {
        timeline.elapse(1, interactive: i == 9);
      }

      var str = textBuffer.toString();
      expect(str, contains("Major event on 7."));
    });

    test("aren't fired at all when elapse is non-interactive", () {
      textBuffer.clear();
      isInInitBlock = true;
      var timeline = new Timeline();
      timeline.schedule(1, "String event on 1.", type: TimedEvent.INFO);
      timeline.schedule(5, "String event on 5.", type: TimedEvent.INFO);
      timeline.schedule(7, "Major event on 7.", type: TimedEvent.MAJOR);
      timeline.schedule(10, () => echo("Closure event on 10, but actual time "
          "is ${timeline.time}."), type: TimedEvent.INFO);
      timeline.schedule(15, "String event on 15.", type: TimedEvent.INFO);

      timeline.elapse(20, interactive: false);

      var str = textBuffer.toString();
      expect(str, "String event on 1. String event on 5.");
    });

    test("aren't fired themselves but allow non-major events scheduled on same "
        "time to be fired", () {
      textBuffer.clear();
      isInInitBlock = true;
      var timeline = new Timeline();
      timeline.schedule(1, "String event on 1.", type: TimedEvent.INFO);
      timeline.schedule(7, "String event on 7.", type: TimedEvent.INFO);
      timeline.schedule(7, "Major event on 7.", type: TimedEvent.MAJOR);
      timeline.schedule(10, () => echo("Closure event on 10, but actual time "
          "is ${timeline.time}."), type: TimedEvent.INFO);
      timeline.schedule(15, "String event on 15.", type: TimedEvent.INFO);

      timeline.elapse(10, interactive: false);

      var str = textBuffer.toString();
      expect(str, "String event on 1. String event on 7.");
    });
  });

  group("Singular events", () {
    Timeline timeline;

    setUp(() {
      textBuffer.clear();
      isInInitBlock = true;
      timeline = new Timeline();
    });

    test("are only called one by one", () {
      timeline.schedule(1, "Normal string event on 1.", type: TimedEvent.INFO);
      timeline.schedule(2, "Singular action on 2.", type: TimedEvent.SINGULAR);
      timeline.schedule(3, "Singular action on 3.", type: TimedEvent.SINGULAR);
      isInInitBlock = false;

      timeline.elapse(10);

      var str = textBuffer.toString();
      expect(str, isNot(matches("Singular action on 3.")));

      textBuffer.clear();
      timeline.elapse(10);

      str = textBuffer.toString();
      expect(str, matches("Singular action on 3."));
    });

    test("are only called one by one even when running tick by tick", () {
      timeline.schedule(1, "Normal string event on 1.", type: TimedEvent.INFO);
      timeline.schedule(2, "Singular action on 2.", type: TimedEvent.SINGULAR);
      timeline.schedule(3, "Singular action on 3.", type: TimedEvent.SINGULAR);
      isInInitBlock = false;

      int ticks = 10;
      for (int i = 0; i < ticks; i++) {
        timeline.elapse(1, interactive: i == ticks - 1);
      }

      var str = textBuffer.toString();
      expect(str, isNot(matches("Singular action on 3.")));

      textBuffer.clear();
      for (int i = 0; i < ticks; i++) {
        timeline.elapse(1, interactive: i == ticks - 1);
      }

      str = textBuffer.toString();
      expect(str, matches("Singular action on 3."));
    });



  });

  group("whileString", () {
    Timeline timeline;

    setUp(() {
      textBuffer.clear();
      isInInitBlock = true;
      timeline = new Timeline();
    });

    test("works", () {
      timeline.schedule(2, () => echo("While ${timeline.whileString} there is "
          "a loud noise coming from somewhere afar."));
      isInInitBlock = false;

      timeline.elapse(10, whileString: "you are fixing the hyperdrive");

      var str = textBuffer.toString();
      expect(str, matches("While you are fixing the hyperdrive there is "
          "a loud noise coming from somewhere afar."));
    });

    test("works also through generateWhileOutput", () {
      timeline.schedule(2, () {
        echo(timeline.generateWhileOutput("While <whileString> the Bodega "
                                          "makes another anouncement.", ""));
        echo("\"My hyperdrive seems to be ready\", the Bodega says.");
      });
      isInInitBlock = false;

      timeline.elapse(10, whileString: "you are fixing the hyperdrive");

      var str = textBuffer.toString();
      expect(str, matches("While you are fixing the hyperdrive the Bodega "
          "makes another anouncement."));
    });

    test("works also through generateWhileOutput when whileString is null", () {
      timeline.schedule(2, () {
        echo(timeline.generateWhileOutput("While <whileString> the Bodega "
                                          "makes another anouncement.", ""));
        echo("\"My hyperdrive seems to be ready\", the Bodega says.");
      });
      isInInitBlock = false;

      timeline.elapse(10);

      var str = textBuffer.toString();
      expect(str, "\"My hyperdrive seems to be ready\", the Bodega says.");
    });
  });

  test("throws outside initblock", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    isInInitBlock = false;
    expect(() {
      timeline.mainLoop = () => echo("Tick tock.");
    }, throwsA(new isInstanceOf<StateError>()));
    expect(() {
      timeline.schedule(1, "Hello.");
    }, throwsA(new isInstanceOf<StateError>()));
  });

  test("persistence works", () {
    var stringEv;
    var functionEv;
    var createNewTimeline = () {
      isInInitBlock = true;
      var timeline = new Timeline();
      timeline.mainLoop = () {
        echo("Time: ${timeline.time}.");
      };
      stringEv = timeline.schedule(null, "String event.", type: TimedEvent.INFO);
      functionEv = timeline.schedule(null, () => echo("Closure event."), type: TimedEvent.INFO);
      timeline.schedule(7, "Bam.", type: TimedEvent.INFO);
      timeline.schedule(7, "Bim.", priority: 10, type: TimedEvent.INFO);
      isInInitBlock = false;
      return timeline;
    };

    textBuffer.clear();

    Timeline t1 = createNewTimeline();
    t1.elapseToTime(3);
    t1.reschedule(stringEv, t1.time + 1);
    t1.reschedule(functionEv, 10);
    Map save = t1.toMap();

    Timeline t2 = createNewTimeline();
    t2.updateFromMap(save);
    t2.elapseToTime(10);

    var str = textBuffer.toString();
    expect(str, "Time: 0. Time: 1. Time: 2. Time: 3. Time: 4. String event. "
        "Time: 5. Time: 6. Time: 7. Bim. Bam. Time: 8. Time: 9. Time: 10. "
        "Closure event.");
  });

}
