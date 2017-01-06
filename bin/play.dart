import 'dart:async';
import 'dart:io';
import 'dart:math';

import 'package:slot_machine/result.dart' as slot;

import 'package:edgehead/edgehead_lib.dart';
import 'package:egamebook/scripter.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:logging/logging.dart';

Future<Null> main(List<String> args) async {
  var automated = args.contains("--automated");
  var logged = args.contains("--log");

  IOSink fileLogSink;
  try {
    if (logged) {
      var file = new File("edgehead.log");
      fileLogSink = file.openWrite();
    }
    await run(automated, automated, logged ? fileLogSink : null);
  } finally {
    await fileLogSink?.close();
  }
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

Future<Null> run(bool automated, bool silent, StringSink logSink,
    {Level logLevel: Level.ALL}) async {
  StreamSubscription loggerSubscription;
  if (logSink != null) {
    Logger.root.level = logLevel;
    loggerSubscription = Logger.root.onRecord.listen((record) {
      logSink.writeln('${record.time.toIso8601String()} - '
          '[${record.loggerName}] - '
          '[${record.level.name}] - '
          '${record.message}');
    });
  }

  final Logger log = new Logger("play_run");
  void hijackedPrint(Object msg) {
    log.info(msg);
    if (!silent) print(msg);
  }

  Future<Null> showSlotMachine(
      double probability, slot.Result predeterminedResult) {
    var msg = "[[ SLOT MACHINE ${probability.toStringAsPrecision(2)} "
        "$predeterminedResult ]]";
    log.info(msg);
    if (!silent) print("$msg\n");
    return new Future.value();
  }

  String gotoPage;

  try {
    var game = new EdgeheadGame(hijackedPrint, (String goto) => gotoPage = goto,
        choices, choice, showSlotMachine);
    game.onFinishedGoto = "endGame";

    while (gotoPage == null) {
      await game.run();

      if (choices.isEmpty) continue;

      if (!silent) {
        print("");
        for (int i = 0; i < choices.length; i++) {
          var helpMessage = choices[i].helpMessage ?? '';
          var shortened = helpMessage.split(' ').take(10).join(' ');
          print("${i + 1}) ${choices[i].string} ($shortened ...)");
        }
      }

      int option;

      if (automated) {
        option = _random.nextInt(choices.length);
      } else {
        option = int.parse(stdin.readLineSync()) - 1;
        print("");
      }
      await choices[option].f();
      choices.clear();
    }

    assert(gotoPage == "endGame");
  } finally {
    await loggerSubscription?.cancel();
  }
}
