import 'package:unittest/unittest.dart';
import '../../lib/src/book/scripter.dart';
import 'timeline.dart';


void main() {
  test("mainLoop works", () {
    textBuffer.clear();
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    timeline.elapse(10);
    var str = textBuffer.toString();
    expect(str, contains("9 past the hour"));
  });
  
  test("custom event at given time works", () {
    textBuffer.clear();
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    timeline.events.add(new TimedEvent(5, "String event."));
    timeline.events.add(new TimedEvent(6, () => echo("Closure event.")));
    
    timeline.events.add(new TimedEvent(7, "Bam."));
    timeline.events.add(new TimedEvent(7, "Bim.", priority: 10));
    
    timeline.elapse(10);
    var str = textBuffer.toString();
    print(str);
    expect(str, contains("9 past the hour"));
    expect(str, contains("String event."));
    expect(str, contains("Closure event."));
    expect(str, contains("Bim. Bam."));
  });
  
  test("time++ works", () {
    textBuffer.clear();
    var timeline = new Timeline();
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    timeline.events.add(new TimedEvent(5, "String event."));
    timeline.events.add(new TimedEvent(6, () => echo("Closure event.")));
    
    timeline.events.add(new TimedEvent(7, "Bam."));
    timeline.events.add(new TimedEvent(7, "Bim.", priority: 10));
    
    timeline.time += 10;
    var str = textBuffer.toString();
    print(str);
    expect(str, contains("9 past the hour"));
    expect(str, contains("String event."));
    expect(str, contains("Closure event."));
    expect(str, contains("Bim. Bam."));
  });
  
  // TODO: persistence
}
