import 'package:unittest/unittest.dart';
import '../../lib/src/book/scripter.dart';
import 'randomly.dart';

void main() {
  
  group("randomlyParse", () {
    test("parses simple stuff", () {
      expect(randomlyParse("you {hit|punch} him in the face"),
          isIn(["you hit him in the face", "you punch him in the face"]));
      expect(randomlyParse("{you|thy} have my word, {Sir|Sire}"),
          isIn(["you have my word, Sir", "thy have my word, Sir",
                "you have my word, Sire", "thy have my word, Sire"]));
    });
    test("blank options", () {
      expect(randomlyParse("{||blank }options"), 
          isIn(["options", "blank options"]));
    });
    test("three options", () {
      expect(randomlyParse("{1|two|3} options"),
          isIn(["1 options", "two options", "3 options"]));
    });
    test("recursion", () {
      var s = "{I am deeply {honoured|humbled}|You {honour|humble} me, Sire}.";
      var result = randomlyParse(s);
      expect(result.startsWith("I am") || result.startsWith("You "), true);
      expect(result.endsWith("ed.") || result.endsWith("Sire."), true);
    });
    test("no tags", () {
      var s = "no tags";
      expect(randomlyParse(s),
          equals(s));
    });
    test("leaves brackets alone when not an option string", () {
      var s = "This is {not an option string}.";
      expect(randomlyParse(s), equals(s));
    });
    test("leaves malformed string", () {
      var s = "{}malformed {} horrible string{}";
      expect(randomlyParse(s), equals(s));
    });
    test("leaves malformed string with unbalanced brackets", () {
      var s = "{unbalanced{g|er|e}";
      expect(randomlyParse(s), equals(s));
    });
  });
}