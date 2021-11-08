// @dart=2.9

import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:test/test.dart';

void main() {
  group("Save Against", () {
    test("tossCoin returns as expected", () {
      expect(Randomly.tossCoin(), const TypeMatcher<bool>());
      const int n = 10000;
      int result = 0;
      for (int i = 0; i < n; i++) {
        result += (Randomly.tossCoin()) ? 1 : -1;
      }
      expect(result, closeTo(0, n / 10));
    });
  });

  group("Randomly.chooseWeighted", () {
    test("[0.5, 0.5] = 50%", () {
      const int n = 10000;
      final weights = [0.5, 0.5];
      int result = 0;
      for (int i = 0; i < n; i++) {
        result += (Randomly.chooseWeighted(weights) == 0) ? 1 : -1;
      }
      expect(result, closeTo(0, n / 10));
    });

    test("[0.1, 0.1, 0.8]", () {
      const int n = 10000;
      final weights = [0.1, 0.1, 0.8];
      int result = 0;
      for (int i = 0; i < n; i++) {
        result += (Randomly.chooseWeighted(weights) == 2) ? 1 : 0;
      }
      expect(result, closeTo(n * 0.8, n / 10));
    });

    test("[0.1, 0.5] throws (does not add up to 1.0)", () {
      void run() {
        const int n = 10000;
        final weights = [0.1, 0.5];
        for (int i = 0; i < n; i++) {
          Randomly.chooseWeighted(weights);
        }
      }

      expect(run, throwsArgumentError);
    });
  });

  group("Randomly.parse", () {
    test("parses simple stuff", () {
      expect(
          Randomly.parse("you {hit|punch} him in the face"),
          unorderedEquals(<String>[
            "you hit him in the face",
            "you punch him in the face"
          ]));
      expect(
          Randomly.parse("{you|thy} have my word, {Sir|Sire}"),
          unorderedEquals(<String>[
            "you have my word, Sir",
            "thy have my word, Sir",
            "you have my word, Sire",
            "thy have my word, Sire"
          ]));
    });
    test("blank options", () {
      expect(Randomly.parse("{||blank }options"),
          unorderedEquals(<String>["options", "options", "blank options"]));
    });
    test("three options", () {
      expect(Randomly.parse("{1|two|3} options"),
          unorderedEquals(<String>["1 options", "two options", "3 options"]));
    });
    test("recursion", () {
      var s = "{I am deeply {honoured|humbled}|You {honour|humble} me, Sire}.";
      expect(
          Randomly.parse(s),
          unorderedEquals(<String>[
            "I am deeply honoured.",
            "I am deeply humbled.",
            "You honour me, Sire.",
            "You humble me, Sire."
          ]));
    });
    test("no tags", () {
      var s = "no tags";
      expect(Randomly.parse(s), hasLength(1));
    });
    test("leaves brackets alone when not an option string", () {
      var s = "This is {not an option string}.";
      expect(Randomly.parse(s), unorderedEquals(<String>[s]));
    });
    test("leaves malformed string", () {
      var s = "{}malformed {} horrible string{}";
      expect(Randomly.parse(s), unorderedEquals(<String>[s]));
    });
    test("leaves malformed string with unbalanced brackets", () {
      var s = "{unbalanced{g|er|e}";
      expect(Randomly.parse(s), unorderedEquals(<String>[s]));
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
      String humanize(num n) =>
          Randomly.humanStringifyProbability(n, precisionSteps: 10);
      expect(humanize(p0), "0%");
      expect(humanize(p15), "20%");
      expect(humanize(p51), "50%");
      expect(humanize(p68), "70%");
      expect(humanize(p99), "100%");
      expect(humanize(p100), "100%");
      expect(humanize(p112), "110%");
    });

    test("solves for precision step of 5", () {
      String humanize(num n) =>
          Randomly.humanStringifyProbability(n, precisionSteps: 5);
      expect(humanize(p0), "0%");
      expect(humanize(p15), "15%");
      expect(humanize(p51), "50%");
      expect(humanize(p68), "70%");
      expect(humanize(p99), "100%");
      expect(humanize(p100), "100%");
      expect(humanize(p112), "110%");
    });

    test("solves for precision step of 2", () {
      String humanize(num n) =>
          Randomly.humanStringifyProbability(n, precisionSteps: 2);
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
