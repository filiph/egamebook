import 'dart:io';

import 'bodega_barbrawl.dart';

/// Mini helper function;
class ChoiceMock {
  ChoiceMock(this.string, this.script);
  String string;
  Function script;

  toString() => string;
}

main(List<String> arguments) {

  List<ChoiceMock> choices = [];
  Function choiceFunction = (String string, {String goto, Function script,
    String submenu, bool deferToEndOfPage, bool deferToChoiceList}) {
    var ch = new ChoiceMock(string, script);
    choices.add(ch);
  };

  var w = new BarBrawl(print, choiceFunction);

  w.init();
  w.update();

  while (choices.isNotEmpty) {
    Map<int, ChoiceMock> options = new Map<int, ChoiceMock>();
    int index = 1;

    for (var ch in choices) {
      options[index] = ch;
      index++;
    }

    print("");

    for (int i = 1; i < index; i++) {
      print("$i) ${options[i]}");
    }

    String input = stdin.readLineSync();

    int chosen;
    try {
      chosen = int.parse(input);
    } on FormatException {
      break;
    }

    choices.clear();
    options[chosen].script();
    if (w.finished) break;
    w.update();
  }

  print("Player was ${w.wasSuccessful ? 'successful' : 'unsuccessful'}.");
}