library dice;

import 'dart:math';
import 'package:egamebook/scripter.dart';

Random _random = new Random();

int throwDice([sidedness = 6]) {
  return _random.nextInt(sidedness) + 1;
}

void reportDiceSave(int dice, int target) {
  if (dice >= target) {
    echo("You threw a $dice and made the throw against $target.");
  } else {
    echo("You threw a $dice and so your save against $target was "
        "unsuccessful.");
  }
}
