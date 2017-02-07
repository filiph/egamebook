import 'dart:async';
import 'dart:io';
import 'dart:math';

import 'package:egamebook/src/presenter/slot_machine_roll_result.dart';
import 'package:slot_machine/result.dart' as slot;

import 'package:edgehead/edgehead_lib.dart';
import 'package:egamebook/scripter.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:logging/logging.dart';

Future<Null> main(List<String> args) async {
  var automated = args.contains("--automated");
  var logged = args.contains("--log");
  RegExp actionPattern;
  if (args.contains("--action")) {
    int index = args.indexOf("--action");
    actionPattern = new RegExp(args[index + 1], caseSensitive: false);
  }

  IOSink fileLogSink;
  try {
    if (logged) {
      var file = new File("edgehead.log");
      fileLogSink = file.openWrite();
    }
    await run(automated, automated, logged ? fileLogSink : null,
        actionPattern: actionPattern);
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
    {Level logLevel: Level.ALL, Pattern actionPattern}) async {
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

  // Silent mode can be overridden when [actionPattern] is encountered.
  bool silentWithOverride = silent;

  final Logger log = new Logger("play_run");
  void hijackedPrint(Object msg) {
    log.info(msg);
    if (!silentWithOverride) print(msg);
  }

  Future<RollResult> showSlotMachine(double probability, String rollReason,
      {bool rerollEnabled, String rerollEffectDescription}) {
    var msg = "[[ SLOT MACHINE '$rollReason' "
        "${probability.toStringAsPrecision(2)} "
        "$rerollEffectDescription (${rerollEnabled ? 'on' : 'off'} ]]";
    log.info(msg);
    if (!silentWithOverride) print("$msg\n");
    return new Future.value();
  }

  String gotoPage;

  try {
    var game = new EdgeheadGame(
        hijackedPrint,
        (String goto) => gotoPage = goto,
        choices,
        choice,
        showSlotMachine,
        new Stat<double>("hitpoints", (v) => "$v HP"),
        new Stat<int>("stamina", (v) => "$v S"),
        actionPattern: actionPattern);
    game.onFinishedGoto = "endGame";

    while (gotoPage == null) {
      await game.run();

      if (game.actionPatternWasHit) silentWithOverride = false;

      if (choices.isEmpty) continue;

      if (!silentWithOverride) {
        print("");
        for (int i = 0; i < choices.length; i++) {
          var helpMessage = choices[i].helpMessage ?? '';
          var shortened = helpMessage.split(' ').take(10).join(' ');
          print("${i + 1}) ${choices[i].string} ($shortened ...)");
        }
      }

      int option;

      if (automated && !game.actionPatternWasHit) {
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
