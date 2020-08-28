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
import 'package:meta/meta.dart';
import 'package:slot_machine/result.dart' as slot;
import 'package:slot_machine/result.dart';

import 'default_savegames.dart' as savegames;

Future<void> main(List<String> args) async {
  var parser = ArgParser()
    ..addFlag('automated',
        defaultsTo: false,
        negatable: false,
        help: 'Autoselect options for the player.')
    ..addFlag('forever',
        defaultsTo: false,
        negatable: false,
        help: "Play the game in an infinite loop. Handy if you're trying to "
            'find a bug. Assumes --automated.')
    ..addFlag('log',
        defaultsTo: false,
        negatable: false,
        help: 'Log to edgehead.log in current directory.')
    ..addOption('action',
        help: 'Turn off automated mode after encountering an action '
            'that matches the specified name. Useful for playtesting '
            'a specific Action.')
    ..addOption('load',
        allowed: savegames.defaultSavegames.keys,
        help: 'Load one of the default savegames.')
    ..addFlag('help', abbr: 'h', negatable: false, help: 'Show this help.');

  void showUsage() {
    print('Usage:\n');
    print('  dart play.dart [options]\n');
    print(parser.usage);
  }

  ArgResults results;
  try {
    results = parser.parse(args);
  } on FormatException {
    print('Error parsing command line options.');
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
  final forever = results['forever'] as bool;
  final logged = results['log'] as bool;
  RegExp actionPattern;
  if (results.wasParsed('action')) {
    actionPattern = RegExp(results['action'] as String, caseSensitive: false);
  }
  final savegame = results.wasParsed('load')
      ? savegames.defaultSavegames[results['load']]
      : null;

  File file;
  if (logged) {
    file = File("edgehead.log");
  }

  Future<void> play() async {
    final runner = CliRunner(automated, automated, logged ? file : null,
        logLevel: Level.FINE, actionPattern: actionPattern);
    await runner.initialize(EdgeheadGame(
      actionPattern: actionPattern,
      saveGameSerialized: savegame,
      randomizeAfterPlayerChoice: false,
    ));
    try {
      runner.startBook();
      await runner.bookEnd.first;
    } finally {
      runner.close();
    }
  }

  if (forever) {
    // ignore: literal_only_boolean_expressions
    while (true) {
      await play();
    }
  } else {
    await play();
  }
}

class CliRunner extends Presenter<EdgeheadGame> {
  static final Logger _log = Logger("play_run");

  final Random _random;

  final bool automated;

  /// A counter of choices. When [automated] is `true` and when
  /// this counter reaches [maxAutomatedChoicesTaken], we bail out
  /// of the game. This is because we don't want automated tests
  /// to go on forever.
  int _automatedChoicesTaken = 0;

  final int maxAutomatedChoicesTaken;

  /// The maximum amount of time the runner will keep going in automated
  /// mode.
  final Duration maxTimeAutomated;

  /// Marks the time when [this] was constructed. The value is used
  /// to determine whether [maxTimeAutomated] has been reached.
  final DateTime _timeStarted;

  final File _logFile;

  final Pattern actionPattern;

  StreamSubscription _loggerSubscription;

  /// Silent mode can be overridden when [actionPattern] is encountered.
  bool _silent;

  /// The latest savegame received from the [book].
  @visibleForTesting
  String latestSaveGame;

  /// When user selects an option using `s` instead of enter, they will
  /// succeed on the next slot-machine roll.
  bool _forceSuccessOnNextSlotMachine = false;

  /// When user selects an option using `f` instead of enter, they will
  /// fail on the next slot-machine roll.
  bool _forceFailureOnNextSlotMachine = false;

  /// Instantiate the runner.
  ///
  /// The runner will not print anything if [silent] is `true`.
  /// But, when [actionPattern] is encountered, the [silent] bit will
  /// flipped to true.
  ///
  /// If [random] is provided, it will be used for choosing options. Injecting
  /// a seeded [Random] will therefore lead to a predictable walkthrough.
  /// (Two walkthroughs with the same seed will have exactly the same result,
  /// because edgehead itself has predictable randomness, and the injected
  /// [random] makes sure we predictably choose the same options.)
  CliRunner(
    this.automated,
    bool silent,
    File logFile, {
    Level logLevel = Level.FINE,
    this.actionPattern,
    Random random,
    this.maxAutomatedChoicesTaken = 0xFFFFFF,
    this.maxTimeAutomated = const Duration(days: 365),
  })  : _logFile = logFile,
        _random = random ?? Random(),
        _timeStarted = DateTime.now() {
    _silent = silent;

    if (_logFile != null) {
      Logger.root.level = logLevel;
      _loggerSubscription = Logger.root.onRecord.listen((record) {
        _logFile.writeAsStringSync(
            '${record.time.toIso8601String()} - '
            '[${record.loggerName}] - '
            '[${record.level.name}] - '
            '${record.message}\n',
            mode: FileMode.append,
            flush: true);
      });
    }
  }

  @override
  void addChoiceBlock(ChoiceBlock element) {
    final saveGameJson = element.saveGame.saveGameSerialized;
    latestSaveGame = saveGameJson;
    _log.fine("savegame = $saveGameJson");

    if (element.choices.length == 1 && element.choices.single.isImplicit) {
      // Implicit choice.
      final selectedChoice = element.choices.single;
      book.accept(PickChoice((b) => b..choice = selectedChoice.toBuilder()));
      return;
    }

    if (automated && _automatedChoicesTaken >= maxAutomatedChoicesTaken) {
      _log.info('We have reached the limit of automated choices: '
          '$_automatedChoicesTaken');
      add(LoseGame(
          (b) => b.markdownText = 'Automated run reached limit of choices: '
              '$_automatedChoicesTaken'));
      return;
    }

    if (automated &&
        DateTime.now().difference(_timeStarted) > maxTimeAutomated) {
      _log.info('We have reached the time limit of automated running: '
          '$maxTimeAutomated');
      add(LoseGame(
          (b) => b.markdownText = 'Automated run reached maxTimeAutomated: '
              '$maxTimeAutomated'));
      return;
    }

    int option;

    // Exercise ChoiceTree parsing of ChoiceBlock, to catch bugs.
    ChoiceTree tree = ChoiceTree(element);
    _log.fine("ChoiceTree root choices: ${tree.root.choices}");
    _log.fine("ChoiceTree root groups: ${tree.root.groups}");

    if (automated && !book.actionPatternWasHit) {
      option = _random.nextInt(element.choices.length);
      _automatedChoicesTaken += 1;
    } else {
      assert(
          !element.choices.any((ch) => ch.isImplicit),
          "Cannot have an implicit choice "
          "when there is more than one of them.");
      String describeChoice(Choice ch) => '${ch.commandPath.join(' >> ')} '
          '(${(ch.successChance * 100).round()}%) '
          '(${ch.helpMessage})';
      final menu = Menu(element.choices.map(describeChoice),
          modifierKeys: ["s" /* force success */, "f" /* force failure */]);
      print("");
      final choice = menu.choose();
      option = choice.index;
      _forceSuccessOnNextSlotMachine = choice.modifierKey == "s";
      _forceFailureOnNextSlotMachine = choice.modifierKey == "f";
      print("");
    }

    final selectedChoice = element.choices[option];
    if (!automated || book.actionPatternWasHit) {
      print(selectedChoice.commandSentence);
      print("");
    }
    book.accept(PickChoice((b) => b..choice = selectedChoice.toBuilder()));
  }

  @override
  void addCustomElement(ElementBase element) {
    if (element is StatInitialization) {
      _hijackedPrint("=== Stat(${element.name}) initialized "
          "to ${element.initialValue} ===");
      return;
    }
    if (element is StatUpdate) {
      _hijackedPrint("=== Stat(${element.name}) updated "
          "to ${element.newValue} ===");
      return;
    }
    super.addCustomElement(element);
  }

  @override
  void addError(ErrorElement error) {
    _log.severe(error.message);
    _log.severe(error.stackTrace);
    _log.severe('latestSavegame: $latestSaveGame');
    throw StateError("Egamebook error: ${error.message}\n"
        "Stacktrace: ${error.stackTrace}");
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
    throw UnimplementedError(savegame.toString());
  }

  @override
  void addSlotMachine(SlotMachine element) {
    if (_forceSuccessOnNextSlotMachine || _forceFailureOnNextSlotMachine) {
      book.accept(ResolveSlotMachine((b) => b
        ..result =
            _forceSuccessOnNextSlotMachine ? Result.success : Result.failure
        ..wasRerolled = false));
      _forceSuccessOnNextSlotMachine = false;
      _forceFailureOnNextSlotMachine = false;
      return;
    }
    final result = _showSlotMachine(element.probability, element.rollReason,
        rerollable: element.rerollable,
        rerollEffectDescription: element.rerollEffectDescription);
    result.then((sessionResult) {
      book.accept(ResolveSlotMachine((b) => b
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
    _log.fine(msg);
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

    var success = Randomly.saveAgainst(probability, random: _random);
    var initialResult = slot.SessionResult(
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
        // We're in silent mode. We never reroll in silent mode.
        return initialResult;
      }
      print("Initial roll failure.");

      if (rerollable) {
        print(rerollEffectDescription);
        print("Reroll?");
        final menu = Menu(["Yes", "No"]);
        final input = menu.choose();
        if (input.value == 'No') {
          print('No reroll');
          return initialResult;
        }

        var rerollSuccess =
            Randomly.saveAgainst(1 - pow(1 - probability, 2), random: _random);
        if (rerollSuccess) {
          print("Reroll success!");
          return const slot.SessionResult(slot.Result.success, true);
        }
        print("Reroll failure.");
        return const slot.SessionResult(slot.Result.failure, true);
      }

      print("Reroll impossible. So: $initialResult");
      return initialResult;
    }
  }
}
