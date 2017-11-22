import 'dart:async';
import 'dart:io';
import 'dart:math';

import 'package:edgehead/edgehead_lib.dart';
import 'package:edgehead/egamebook/commands/commands.dart';
import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:logging/logging.dart';
import 'package:slot_machine/result.dart' as slot;

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

final _random = new Random();

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

  @deprecated
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
      print("$msg\n");
    }

    var success = Randomly.saveAgainst(probability);
    var initialResult = new slot.SessionResult(
        success ? slot.Result.success : slot.Result.failure, false);
    log.info('result = $initialResult');

    if (success) {
      // Success of initial roll.
      if (!silentWithOverride) {
        print("result = $initialResult");
      }
      return initialResult;
    } else {
      // Failure of initial roll.
      if (silentWithOverride) {
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

  try {
    var game = new EdgeheadGame(actionPattern: actionPattern);

    StreamSubscription<ElementBase> subscription;

    void quit() {
      game.close();
      subscription.cancel();
    }

    subscription = game.elements.listen((element) {
      if (game.actionPatternWasHit) silentWithOverride = false;

      if (element is TextOutput) {
        hijackedPrint(element.markdownText);
        return;
      }

      if (element is WinGame) {
        hijackedPrint(element.markdownText);
        hijackedPrint("Congrats! You won.");
        quit();
        return;
      }

      if (element is LoseGame) {
        hijackedPrint(element.markdownText);
        hijackedPrint("Oh noes.");
        quit();
        return;
      }

      if (element is ChoiceBlock) {
        if (!silentWithOverride) {
          print("");
          for (int i = 0; i < element.choices.length; i++) {
            var helpMessage = element.choices[i].helpMessage ?? '';
            var shortened = helpMessage.split(' ').take(10).join(' ');
            print("${i + 1}) "
                "${element.choices[i].markdownText} ($shortened ...)");
          }
        }

        int option;

        if (automated && !game.actionPatternWasHit) {
          option = _random.nextInt(element.choices.length);
        } else if (element.choices.length == 1 &&
            element.choices.single.isAutomatic) {
          option = 0;
        } else {
          option = int.parse(stdin.readLineSync()) - 1;
          print("");
        }
        game.accept(new PickChoice(
            (b) => b..choice = element.choices[option].toBuilder()));
        return;
      }

      if (element is SlotMachine) {
        final result = showSlotMachine(element.probability, element.rollReason,
            rerollable: element.rerollable,
            rerollEffectDescription: element.rerollEffectDescription);
        result.then((sessionResult) {
          game.accept(new ResolveSlotMachine((b) => b
            ..result = sessionResult.result
            ..wasRerolled = sessionResult.wasRerolled));
        });
        return;
      }
    });

    game.start();
    await game.closed;
  } finally {
    await loggerSubscription?.cancel();
  }
}
