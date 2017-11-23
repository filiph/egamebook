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

  File file;
  if (logged) {
    file = new File("edgehead.log");
  }
  final runner = new CliRunner(automated, automated, logged ? file : null,
      actionPattern: actionPattern);
  await runner.play();
}

final _random = new Random();

class CliRunner {
  final bool automated;

  final File _logFile;

  final Pattern actionPattern;

  StreamSubscription _loggerSubscription;

  final Logger _log = new Logger("play_run");

  /// Silent mode can be overridden when [actionPattern] is encountered.
  bool _silent;

  /// Instantiate the runner.
  ///
  /// The runner will not print anything if [silent] is `true`.
  /// But, when [actionPattern] is encountered, the [silent] bit will
  /// flipped to true.
  CliRunner(this.automated, bool silent, File logFile,
      {Level logLevel: Level.FINE, this.actionPattern})
      : _logFile = logFile {
    _silent = silent;

    if (_logFile != null) {
      Logger.root.level = logLevel;
      _loggerSubscription = Logger.root.onRecord.listen((record) {
        _logFile.writeAsStringSync(
            '${record.time.toIso8601String()} - '
            '[${record.loggerName}] - '
            '[${record.level.name}] - '
            '${record.message}\n',
            mode: FileMode.APPEND);
      });
    }
  }

  Future<Null> play() async {
    try {
      await _runToCompletion();
    } finally {
      await _loggerSubscription?.cancel();
    }
  }

  void _handleChoiceBlock(ChoiceBlock element, EdgeheadGame game) {
    if (!_silent) {
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
    game.accept(
        new PickChoice((b) => b..choice = element.choices[option].toBuilder()));
  }

  void _handleSlotMachine(SlotMachine element, EdgeheadGame game) {
    final result = _showSlotMachine(element.probability, element.rollReason,
        rerollable: element.rerollable,
        rerollEffectDescription: element.rerollEffectDescription);
    result.then((sessionResult) {
      game.accept(new ResolveSlotMachine((b) => b
        ..result = sessionResult.result
        ..wasRerolled = sessionResult.wasRerolled));
    });
  }

  @deprecated
  void _hijackedPrint(Object msg) {
    _log.info(msg);
    if (!_silent) print(msg);
  }

  Future<Null> _runToCompletion() async {
    var game = new EdgeheadGame(actionPattern: actionPattern);

    StreamSubscription<ElementBase> subscription;

    void quit() {
      game.close();
      subscription.cancel();
    }

    subscription = game.elements.listen((element) {
      if (game.actionPatternWasHit) _silent = false;

      if (element is TextOutput) {
        _hijackedPrint(element.markdownText);
        return;
      }

      if (element is WinGame) {
        _hijackedPrint(element.markdownText);
        _hijackedPrint("Congrats! You won.");
        quit();
        return;
      }

      if (element is LoseGame) {
        _hijackedPrint(element.markdownText);
        _hijackedPrint("Oh noes.");
        quit();
        return;
      }

      if (element is ChoiceBlock) {
        _handleChoiceBlock(element, game);
        return;
      }

      if (element is SlotMachine) {
        _handleSlotMachine(element, game);
        return;
      }
    });

    game.start();
    await game.closed;
  }

  Future<slot.SessionResult> _showSlotMachine(
      double probability, String rollReason,
      {bool rerollable, String rerollEffectDescription}) async {
    var msg = "[[ SLOT MACHINE '$rollReason' "
        "${probability.toStringAsPrecision(2)} "
        "$rerollEffectDescription "
        "(enabled: ${rerollable ? 'on' : 'off'}) ]]";
    _log.info(msg);
    if (!_silent) {
      print("$msg\n");
    }

    var success = Randomly.saveAgainst(probability);
    var initialResult = new slot.SessionResult(
        success ? slot.Result.success : slot.Result.failure, false);
    _log.info('result = $initialResult');

    if (success) {
      // Success of initial roll.
      if (!_silent) {
        print("result = $initialResult");
      }
      return initialResult;
    } else {
      // Failure of initial roll.
      if (_silent) {
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
}
