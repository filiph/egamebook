import 'package:unittest/unittest.dart';
import '../../lib/src/book/scripter.dart';
import 'randomly.dart';

void main() {
  
  group("Save Against", () {
    test("tossCoin returns as expected", () {
      expect(Randomly.tossCoin(), new isInstanceOf<bool>("bool"));
      final int n = 10000;
      int result = 0;
      for (int i = 0; i < n; i++) {
        result += (Randomly.tossCoin()) ? +1 : -1;
      }
      expect(result, closeTo(0, n / 10));
    });
  });
  
  group("Randomly.parse", () {
    test("parses simple stuff", () {
      expect(Randomly.parse("you {hit|punch} him in the face"),
          isIn(["you hit him in the face", "you punch him in the face"]));
      expect(Randomly.parse("{you|thy} have my word, {Sir|Sire}"),
          isIn(["you have my word, Sir", "thy have my word, Sir",
                "you have my word, Sire", "thy have my word, Sire"]));
    });
    test("blank options", () {
      expect(Randomly.parse("{||blank }options"), 
          isIn(["options", "blank options"]));
    });
    test("three options", () {
      expect(Randomly.parse("{1|two|3} options"),
          isIn(["1 options", "two options", "3 options"]));
    });
    test("recursion", () {
      var s = "{I am deeply {honoured|humbled}|You {honour|humble} me, Sire}.";
      var result = Randomly.parse(s);
      expect(result.startsWith("I am") || result.startsWith("You "), true);
      expect(result.endsWith("ed.") || result.endsWith("Sire."), true);
    });
    test("no tags", () {
      var s = "no tags";
      expect(Randomly.parse(s),
          equals(s));
    });
    test("leaves brackets alone when not an option string", () {
      var s = "This is {not an option string}.";
      expect(Randomly.parse(s), equals(s));
    });
    test("leaves malformed string", () {
      var s = "{}malformed {} horrible string{}";
      expect(Randomly.parse(s), equals(s));
    });
    test("leaves malformed string with unbalanced brackets", () {
      var s = "{unbalanced{g|er|e}";
      expect(Randomly.parse(s), equals(s));
    });
  });
  
  group("Randomly.humanStringify", () {
    var p0 = 0.0;
    var p15 = 0.15;
    var p51 = 0.51;
    var p68 = 0.68;
    var p99 = 0.99;
    var p100 = 1.00;
    var p112 = 1.12;
    
    test("solves for precision step of 10", () {
      humanize(num n) => Randomly.humanStringify(n, precisionSteps: 10);
      expect(humanize(p0), "0%");
      expect(humanize(p15), "20%");
      expect(humanize(p51), "50%");
      expect(humanize(p68), "70%");
      expect(humanize(p99), "100%");
      expect(humanize(p100), "100%");
      expect(humanize(p112), "110%");
    });
    
    test("solves for precision step of 5", () {
      humanize(num n) => Randomly.humanStringify(n, precisionSteps: 5);
      expect(humanize(p0), "0%");
      expect(humanize(p15), "15%");
      expect(humanize(p51), "50%");
      expect(humanize(p68), "70%");
      expect(humanize(p99), "100%");
      expect(humanize(p100), "100%");
      expect(humanize(p112), "110%");
    });
    
    test("solves for precision step of 2", () {
      humanize(num n) => Randomly.humanStringify(n, precisionSteps: 2);
      expect(humanize(p0), "0%");
      expect(humanize(p15), "16%");
      expect(humanize(p51), "52%");
      expect(humanize(p68), "68%");
      expect(humanize(p99), "100%");
      expect(humanize(p100), "100%");
      expect(humanize(p112), "112%");
    });
  });
}