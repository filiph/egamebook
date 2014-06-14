library randomly;

import 'dart:math';

class Randomly {
  static Random _random = new Random();
  
  /**
   * Resolve a 'coin toss' of the given probability.
   */
  static bool saveAgainst(num probability) {
    if (probability < 0 || probability > 1.0) {
      throw new ArgumentError("Probability needs to be within <0,1>.");
    }
    if (probability == 0) return false;
    if (probability == 1.0) return true;
    return _random.nextDouble() < probability;
  }
  
  static bool tossCoin() => saveAgainst(0.5);
  
  /**
   * Function gets a list of choices, picks one of them randomly.
   */
  static dynamic choose(List choices) {
    if (choices == null) throw new ArgumentError("Cannot choose from null.");
    num number = choices.length;
    if (number == 0) {
      throw new ArgumentError("Cannot randomly choose from an empty set.");
    }
    return choices[_random.nextInt(number)];
  }
  
  /**
   * Function gets a String in the format 'something {is fishy|doesn't add up}' 
   * and outputs either 'something is fishy' or 'something doesn't add up'. This
   * works even recursively ('{I {think|guess}|Maybe} it will work.') and
   * also with empty choices ('This is {very|} interesting').
   * 
   * When creating messaging that the user/player will likely see often, this will
   * make sure that they see some 'natural' variance.
   */
  static String parse(String str) {
    int startTagIndex = str.indexOf("{");
    if (startTagIndex != -1 && startTagIndex < str.length - 1) {
      List<int> indexes = new List<int>();
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
  
        StringBuffer strBuf = new StringBuffer();
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
          return "${str.substring(0,lastIndex + 1)}"
                 "${parse(str.substring(lastIndex + 1))}";
        }
      }
    } else { 
      // no startTag ("{") found
      return str;
    }
  }
  
  static String humanStringifyProbability(num probability, 
                   {int precisionSteps: 10, 
                    String prefix: "", String postfix: "%"}) {
    probability *= 100 / precisionSteps;    // ex. 6.4
    probability = probability.round();  // ex. 6.0
    probability *= precisionSteps;  // ex. 60
    return "$prefix${probability.toStringAsFixed(0)}$postfix";
  }

}