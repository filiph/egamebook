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
    print(str);
    expect(str, contains("9 past the hour"));
    expect(str, contains("String event."));
    expect(str, contains("Closure event."));
    expect(str, contains("Bim. Bam."));
  });
  
  test("time++ works", () {
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
    
    timeline.time += 10;
    var str = textBuffer.toString();
    print(str);
    expect(str, contains("9 past the hour"));
    expect(str, contains("String event."));
    expect(str, contains("Closure event."));
    expect(str, contains("Bim. Bam."));
  });
  
  test("length works", () {
    textBuffer.clear();
    isInInitBlock = true;
    var timeline = new Timeline();
    timeline.length = 9;
    timeline.mainLoop = () {
      echo("The hand on the clock moves to ${timeline.time} past the hour.");
    };
    timeline.schedule(5, "String event.");
    timeline.schedule(6, () => echo("Closure event."));
    timeline.schedule(7, "Bam.");
    timeline.schedule(7, "Bim.", priority: 10);
    isInInitBlock = false;
    
    timeline.time += 10;
    var str = textBuffer.toString();
    
    textBuffer.clear();
    timeline.time += 10;
    expect(textBuffer.toString(), "");
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
  
  // TODO: persistence
}
