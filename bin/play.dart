import 'dart:async';
import 'dart:io';
import 'dart:math';

import 'package:edgehead/edgehead_lib.dart';
import 'package:egamebook/scripter.dart';
import 'package:egamebook/src/shared/user_interaction.dart';

main(List<String> args) async {
  var automated = args.contains("--automated");

  await run(automated);
}

final ChoiceList choices = new ChoiceList();

final _random = new Random();

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

Future run(bool automated) async {
  String gotoPage = null;

  var game = new EdgeheadGame(
      print, (String goto) => gotoPage = goto, choices, choice);
  game.onFinishedGoto = "endGame";

  while (gotoPage == null) {
    await game.run();

    if (choices.isEmpty) continue;

    for (int i = 0; i < choices.length; i++) {
      print("${i+1}");
      print(choices[i].string);
      print(choices[i].helpMessage);
    }

    int option;

    if (automated) {
      option = _random.nextInt(choices.length);
    } else {
      option = int.parse(stdin.readLineSync()) - 1;
    }
    choices[option].f();
    choices.clear();
  }

  assert(gotoPage == "endGame");
}
