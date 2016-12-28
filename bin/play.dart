import 'dart:io';

import 'package:egamebook/scripter.dart';
import 'package:egamebook/src/shared/user_interaction.dart';

import 'package:edgehead/edgehead_lib.dart';

final ChoiceList choices = new ChoiceList();

Choice choice(String string,
    {String goto,
    ScriptBlock script,
    String submenu,
    bool deferToEndOfPage: false,
    bool deferToChoiceList: false,
    String helpMessage}) {
  Choice choice = new Choice(string,
      goto: goto,
      script: script,
      submenu: submenu,
      deferToEndOfPage: deferToEndOfPage,
      deferToChoiceList: deferToChoiceList,
      helpMessage: helpMessage);
  choices.add(choice);
  return choice;
}

main() async {
  String gotoPage = null;

  var game = new EdgeheadGame(print, (String goto) => gotoPage = goto, choices, choice);
  game.onFinishedGoto = "endGame";

  while (gotoPage == null) {
    await game.run();

    if (choices.isEmpty) continue;

    for (int i = 0; i < choices.length; i++) {
      print("${i+1}");
      print(choices[i].string);
      print(choices[i].helpMessage);
    }

    int option = int.parse(stdin.readLineSync());
    choices[option - 1].f();
    choices.clear();
  }
}
