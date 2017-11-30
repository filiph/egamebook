import 'dart:async';
import 'dart:io';
import 'dart:math';

import 'package:edgehead/edgehead_lib.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:egamebook/scripter.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:logging/logging.dart';
import 'package:slot_machine/result.dart' as slot;

Future<Null> main(List<String> args) async {
  var automated = args.contains("--automated");
  var silent = args.contains("--silent");
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
    await run(automated, silent, logged ? fileLogSink : null,
        actionPattern: actionPattern);
  } finally {
    await fileLogSink?.close();
  }
}

final ChoiceList choices = new ChoiceList();

Stat<double> hitpoints = new Stat<double>("Health", (double value) {
  if (value == 0.0) {
    return "💀"; // dead, skull
  }
  if (value <= 0.5) {
    return "😣"; // bleeding, persevering face
  }
  if (value < 1.0) {
    return "😧"; // cut, anguished face
  }
  return "😐"; // fine, neutral face
}, description: "Your physical state", initialValue: 100.0, show: true);

Stat<int> stamina = new Stat<int>("Stamina", (int value) => "$value 🔆",
    description: "Spare physical energy", show: true);

Stat<int> gold = new Stat<int>("Gold", (int value) => "$value 💰",
    description: "Gold coins", show: true);

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

  Future<slot.SessionResult> showSlotMachine(
      double probability, String rollReason,
      {bool rerollable, String rerollEffectDescription}) async {
    var msg = "[[ SLOT MACHINE '$rollReason' "
        "${probability.toStringAsPrecision(2)} "
        "$rerollEffectDescription "
        "(enabled: ${rerollable ? 'on' : 'off'}) ]]";
    log.info(msg);
    if (!silentWithOverride) {
//      print("$msg\n");
    }

    var success = Randomly.saveAgainst(probability);
    var initialResult = new slot.SessionResult(
        success ? slot.Result.success : slot.Result.failure, false);
    log.info('result = $initialResult');

    if (success) {
      // Success of initial roll.
      if (!silentWithOverride) {
//        print("result = $initialResult");
      }
      return initialResult;
    } else {
      // Failure of initial roll.
      if (automated) {
        // We're in silent mode. TODO: figure out if we want to reroll
        return initialResult;
      }
      print("Initial roll failure.");

      if (rerollable) {
        print(rerollEffectDescription);
        print("Reroll? (y/n)");
        var input = stdin.readLineSync().trim().toLowerCase();
        if (input != 'y') {
          print('No reroll');
          return initialResult;
        }

        var rerollSuccess = Randomly.saveAgainst(1 - pow(1 - probability, 2));
        if (rerollSuccess) {
          print("Reroll success!");
          return new slot.SessionResult(slot.Result.success, true);
        }
        print("Reroll failure.");
        return new slot.SessionResult(slot.Result.failure, true);
      }

      print("Reroll impossible. So: $initialResult");
      return initialResult;
    }
  }

  String gotoPage;

  try {
    var game = new EdgeheadGame(hijackedPrint, (String goto) => gotoPage = goto,
        choices, choice, showSlotMachine, hitpoints, stamina, gold,
        actionPattern: actionPattern);
    game.onFinishedGoto = "endGame";

    while (gotoPage == null) {
      await game.run();

      if (game.actionPatternWasHit) silentWithOverride = false;

      if (choices.isEmpty) continue;

      print("");
      if (false) {
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
      } else if (choices.length == 1 && choices.single.isAutomatic) {
        option = 0;
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
