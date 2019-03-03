library randomly;

import 'dart:math';

// ignore: avoid_classes_with_only_static_members
class Randomly {
  static final Random _random = Random();

  // Function gets a list of choices, picks one of them randomly.
  static dynamic choose(List choices) {
    if (choices == null) throw ArgumentError("Cannot choose from null.");
    int number = choices.length;
    if (number == 0) {
      throw ArgumentError("Cannot randomly choose from an empty set.");
    }
    return choices[_random.nextInt(number)];
  }

  /// Returns random index, biased by weight.
  ///
  /// For example, when [weights] is `[0.5, 0.5]`, this function will return
  /// `0` or `1` without bias. If the input is `[0.1, 0.1, 0.8]`, the output
  /// will be `2` (index of the last weight) 80% of the time.
  static int chooseWeighted(Iterable<num> weights,
      {num total = 1, Random random}) {
    num pick = (random ?? _random).nextDouble() * total;
    num sum = 0;
    int index = 0;
    for (final weight in weights) {
      if (sum + weight >= pick) return index;
      sum += weight;
      index += 1;
    }
    throw ArgumentError("The weights do not add up to total=$total");
  }

  /// Returns random index, biased by weight.
  ///
  /// Same as [Randomly.chooseWeighted], but weights and total are [int] so that
  /// we avoid rounding errors.
  static int chooseWeightedPrecise(Iterable<int> weights,
      {int max = 1000, Random random}) {
    int pick = (random ?? _random).nextInt(max);
    int sum = 0;
    int index = 0;
    for (final weight in weights) {
      if (sum + weight >= pick) return index;
      sum += weight;
      index += 1;
    }
    throw ArgumentError("The weights do not add up to total=$max");
  }

  static String humanDescribeProbability(num probability) {
    if (probability >= 1.0) {
      return "sure";
    }
    if (probability >= 0.8) {
      return "almost sure";
    }
    if (probability >= 0.7) {
      return "very probable";
    }
    if (probability >= 0.6) {
      return "quite likely";
    }
    if (probability >= 0.5) {
      return "quite possible";
    }
    if (probability >= 0.4) {
      return "possible";
    }
    if (probability >= 0.3) {
      return "improbable";
    }
    if (probability >= 0.2) {
      return "quite unlikely";
    }
    if (probability >= 0.1) {
      return "very unlikely";
    }
    if (probability > 0.0) {
      return "almost impossible";
    }
    return "impossible";
  }

  /// Returns the probability in "rounded" by [precisionSteps]. So, if
  /// [precisionSteps] is [:10:], a [humanProbability] of [:0.46:]
  /// becomes "50%".
  /// When [precisionSteps] is [:5:], then it becomes "45%".
  static String humanStringifyProbability(num probability,
      {int precisionSteps = 10, String prefix = "", String postfix = "%"}) {
    num humanProbability = probability * 100 / precisionSteps; // ex. 6.4
    humanProbability = humanProbability.round(); // ex. 6.0
    humanProbability *= precisionSteps; // ex. 60
    return "$prefix${humanProbability.toStringAsFixed(0)}$postfix";
  }

  // Function gets a String in the format 'something {is fishy|doesn't add up}'
  // and outputs either 'something is fishy' or 'something doesn't add up'. This
  // works even recursively ('{I {think|guess}|Maybe} it will work.') and
  // also with empty choices ('This is {very|} interesting').
  //
  // When creating messaging that the user/player will likely see often, this will
  // make sure that they see some 'natural' variance.
  static String parse(String str) {
    int startTagIndex = str.indexOf("{");
    if (startTagIndex != -1 && startTagIndex < str.length - 1) {
      final indexes = <int>[];
      indexes.add(startTagIndex);
      int lastIndex;
      int endTagIndex;
      int depth = 1;
      for (int i = startTagIndex + 1; i < str.length; i++) {
        lastIndex = i;
        String ch = str[i];
        if (ch == "{") {
          depth++;
        } else if (ch == "|" && depth == 1) {
          indexes.add(i);
        } else if (ch == "}") {
          depth--;
          if (depth == 0) {
            endTagIndex = i;
            indexes.add(endTagIndex);
            break;
          }
        }
      }

      int numOptions = indexes.length - 1;
      if (numOptions > 1) {
        int choice = _random.nextInt(numOptions);

        StringBuffer strBuf = StringBuffer();
        strBuf.write(str.substring(0, startTagIndex));
        String choiceString =
            str.substring(indexes[choice] + 1, indexes[choice + 1]);
        strBuf.write(parse(choiceString));
        strBuf.write(str.substring(endTagIndex + 1, str.length));
        if (lastIndex == str.length - 1) {
          return strBuf.toString();
        } else {
          return parse(strBuf.toString());
        }
      } else {
        // not a real options string
        if (lastIndex == str.length - 1) {
          return str;
        } else {
          return "${str.substring(0, lastIndex + 1)}"
              "${parse(str.substring(lastIndex + 1))}";
        }
      }
    } else {
      // no startTag ("{") found
      return str;
    }
  }

  /// Randomly runs one of the provided functions.
  static void run(void script1(), void script2(),
      [void script3(), void script4()]) {
    int count = script4 != null ? 4 : script3 != null ? 3 : 2;
    int index = _random.nextInt(count);
    switch (index) {
      case 0:
        script1();
        break;
      case 1:
        script2();
        break;
      case 2:
        script3();
        break;
      case 4:
        script4();
        break;
    }
  }

  /// Resolve a 'coin toss' of the given probability.
  static bool saveAgainst(num probability, {Random random}) {
    if (probability < 0 || probability > 1.0) {
      throw RangeError.range(
          probability, 0, 1, "Probability needs to be within <0,1>.");
    }
    if (probability == 0) return false;
    if (probability == 1.0) return true;
    return (random ?? _random).nextDouble() < probability;
  }

  static bool tossCoin() => saveAgainst(0.5);
}
