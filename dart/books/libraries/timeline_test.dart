import 'package:unittest/unittest.dart';
import 'package:egamebook/src/book/scripter.dart';
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
    timeline.schedule(5, "String event.");
    timeline.schedule(6, () => echo("Closure event."));
    
    timeline.schedule(7, "Bam.");
    timeline.schedule(7, "Bim.", priority: 10);
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
  
  test("rescheduling works", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("Time: ${timeline.time}.");
    };
    var stringEv = timeline.schedule(null, "String event.");
    var functionEv = timeline.schedule(null, () => echo("Closure event."));
    timeline.schedule(7, "Bam.");
    timeline.schedule(7, "Bim.", priority: 10);
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
      timeline.schedule(1, "String event on 1.");
      timeline.schedule(5, "String event on 5.");
      timeline.schedule(7, "Major event on 7.", type: TimedEvent.MAJOR);
      timeline.schedule(10, () => echo("Closure event on 10, but actual time "
          "is ${timeline.time}."));
      timeline.schedule(15, "String event on 15.");
      
      timeline.elapse(10);  // Only the last tick is considered interactive.
      timeline.elapse(10);
      
      var str = textBuffer.toString();
      expect(str, "String event on 1. String event on 5. Major event on 7. "
          "Closure event on 10, but actual time is 12. String event on 15.");
    });
    
    test("aren't fired at all when elapse is non-interactive", () {
      textBuffer.clear();
      isInInitBlock = true;
      var timeline = new Timeline();
      timeline.schedule(1, "String event on 1.");
      timeline.schedule(5, "String event on 5.");
      timeline.schedule(7, "Major event on 7.", type: TimedEvent.MAJOR);
      timeline.schedule(10, () => echo("Closure event on 10, but actual time "
          "is ${timeline.time}."));
      timeline.schedule(15, "String event on 15.");
      
      timeline.elapse(20, interactive: false);
      
      var str = textBuffer.toString();
      expect(str, "String event on 1. String event on 5.");
    });
    
    test("aren't fired themselves but allow non-major events scheduled on same "
        "time to be fired", () {
      textBuffer.clear();
      isInInitBlock = true;
      var timeline = new Timeline();
      timeline.schedule(1, "String event on 1.");
      timeline.schedule(7, "String event on 7.");
      timeline.schedule(7, "Major event on 7.", type: TimedEvent.MAJOR);
      timeline.schedule(10, () => echo("Closure event on 10, but actual time "
          "is ${timeline.time}."));
      timeline.schedule(15, "String event on 15.");
      
      timeline.elapse(10, interactive: false);
      
      var str = textBuffer.toString();
      expect(str, "String event on 1. String event on 7.");
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
      stringEv = timeline.schedule(null, "String event.");
      functionEv = timeline.schedule(null, () => echo("Closure event."));
      timeline.schedule(7, "Bam.");
      timeline.schedule(7, "Bim.", priority: 10);
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
