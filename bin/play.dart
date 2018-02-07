import 'dart:async';
import 'dart:io';
import 'dart:math';

import 'package:args/args.dart';
import 'package:cli_menu/cli_menu.dart';
import 'package:edgehead/edgehead_lib.dart';
import 'package:edgehead/egamebook/commands/commands.dart';
import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:edgehead/egamebook/presenter.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:logging/logging.dart';
import 'package:slot_machine/result.dart' as slot;

import 'default_savegames.dart' as savegames;

Future<Null> main(List<String> args) async {
  var parser = new ArgParser()
    ..addFlag('automated',
        defaultsTo: false,
        negatable: false,
        help: "Autoselect options for the player.")
    ..addFlag('log',
        defaultsTo: false,
        negatable: false,
        help: "Log to edgehead.log in current directory.")
    ..addOption('action',
        help: "Turn off automated mode after encountering an action "
            "that matches the specified name. Useful for playtesting "
            "a specific Action.")
    ..addOption('load',
        allowed: savegames.defaultSavegames.keys,
        help: "Load one of the default savegames.")
    ..addFlag('help', abbr: 'h', negatable: false, help: 'Show this help.');

  void showUsage() {
    print("Usage:\n");
    print("  dart play.dart [options]\n");
    print(parser.usage);
  }

  ArgResults results;
  try {
    results = parser.parse(args);
  } on FormatException {
    print("Error parsing command line options.");
    showUsage();
    exitCode = 2;
    return;
  }

  if (results['help'] == true) {
    showUsage();
    exitCode = 0;
    return;
  }

  final automated = results['automated'] as bool;
  final logged = results['log'] as bool;
  RegExp actionPattern;
  if (results.wasParsed('action')) {
    actionPattern =
        new RegExp(results['action'] as String, caseSensitive: false);
  }
  final savegame = results.wasParsed('load')
      ? savegames.defaultSavegames[results['load']]
      : null;

  File file;
  if (logged) {
    file = new File("edgehead.log");
  }
  final runner = new CliRunner(automated, automated, logged ? file : null,
      actionPattern: actionPattern);
  await runner.initialize(new EdgeheadGame(
    actionPattern: actionPattern,
    saveGameSerialized: savegame,
  ));
  try {
    runner.startBook();
    await runner.bookEnd;
  } finally {
    runner.close();
  }
}

final _random = new Random();

class CliRunner extends Presenter<EdgeheadGame> {
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

  @override
  void addChoiceBlock(ChoiceBlock element) {
    final saveGameJson = element.saveGame.saveGameSerialized;
    _log.info("savegame = $saveGameJson");

    int option;

    if (automated && !book.actionPatternWasHit) {
      option = _random.nextInt(element.choices.length);
    } else if (element.choices.length == 1 &&
        element.choices.single.isImplicit) {
      option = 0;
    } else {
      assert(
          !element.choices.any((ch) => ch.isImplicit),
          "Cannot have an implicit choice "
          "when there is more than one of them.");
      final menu = new Menu(element.choices.map((ch) => ch.markdownText));
      print("");
      option = menu.choose().index;
      print("");
    }

    final selectedChoice = element.choices[option];
    book.accept(new PickChoice((b) => b..choice = selectedChoice.toBuilder()));
  }

  @override
  void addCustomElement(ElementBase element) {
    if (element is StatUpdate) {
      _hijackedPrint(
          "=== Stat(${element.name}) updated to ${element.newValue} ===");
      return;
    }
    super.addCustomElement(element);
  }

  @override
  void addError(ErrorElement error) {
    _log.severe(error.message);
  }

  @override
  void addLog(LogElement log) {
    _log.info(log.level);
  }

  @override
  void addLose(LoseGame loseGame) {
    _hijackedPrint(loseGame.markdownText);
    _hijackedPrint("=== YOU LOSE ===");
  }

  @override
  void addSavegameBookmark(SaveGame savegame) {
    throw new UnimplementedError(savegame.toString());
  }

  @override
  void addSlotMachine(SlotMachine element) {
    final result = _showSlotMachine(element.probability, element.rollReason,
        rerollable: element.rerollable,
        rerollEffectDescription: element.rerollEffectDescription);
    result.then((sessionResult) {
      book.accept(new ResolveSlotMachine((b) => b
        ..result = sessionResult.result
        ..wasRerolled = sessionResult.wasRerolled));
    });
  }

  @override
  void addText(TextOutput text) {
    _hijackedPrint(text.markdownText);
  }

  @override
  void addWin(WinGame winGame) {
    _hijackedPrint(winGame.markdownText);
    _hijackedPrint("=== YOU WIN ===");
  }

  @override
  void beforeElement() {
    if (book.actionPatternWasHit) _silent = false;
  }

  @override
  void close() {
    super.close();
    book.close();
    _loggerSubscription?.cancel();
  }

  void _hijackedPrint(Object msg) {
    _log.info(msg);
    if (!_silent) print(msg);
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
        print("Reroll?");
        final menu = new Menu(["Yes", "No"]);
        final input = menu.choose();
        if (input.value == 'No') {
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
