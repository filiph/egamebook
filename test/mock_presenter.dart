library mock_presenter;

import 'dart:async';
import 'dart:collection';

import 'package:egamebook/presenter.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/src/presenter/form_proxy.dart';
import 'package:egamebook/src/shared/form.dart';
import 'package:egamebook/src/shared/points_award.dart';
import 'package:egamebook/src/shared/stat.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import "package:logging/logging.dart";
import 'package:slot_machine/result.dart';

class MockPresenter extends Presenter {
  static final String WAITING_FOR_INPUT_EVENT = "WAITING_FOR_INPUT";
  static final String TEXTBLOCK_SHOWN_EVENT = "TEXTBLOCK_SHOWN";
  static final String TOAST_SHOWN_EVENT = "TOAST_SHOWN";
  static final String STATS_UPDATED_EVENT = "STATS_UPDATED";

  static final String BOOK_ENDED_EVENT = "BOOK_ENDED";
  static final String POINTS_AWARDED_EVENT = "POINTS_AWARDED";
  static final String PLAYER_QUIT_EVENT = "PLAYER_QUIT";
  Queue<int> choicesToBeTaken;

  Queue<String> choicesToBeTakenByString;
  String latestOutput;

  ChoiceList _latestChoices;

  bool started = false;
  bool closed = false;

  /// Choices that are being shown now.
  ChoiceList _currentChoices;

  Completer<int> _currentChoicesCompleter;
  /// If set to [:false:] (default), when [MockPresenter] meets choices without
  /// any [choicesToBeTaken] or [choicesToBeTakenByString] set, it quits. When
  /// set to [:true:], the choice can be taken later by calling
  /// [MockPresenter.choose()].
  bool waitForChoicesToBeTaken;
  StreamController<String> _debugStreamController;
  Stream<String> _debugStream;
  final Logger _log = new Logger('MockPresenter');
  int _currentlyShownPoints = 0;

  List<UIStat> _statsList;

  MockPresenter({bool this.waitForChoicesToBeTaken: false})
      : choicesToBeTaken = new Queue<int>(),
        choicesToBeTakenByString = new Queue<String>(),
        super() {
    _debugStreamController = new StreamController();
    _debugStream = _debugStreamController.stream.asBroadcastStream();
  }

  int get currentlyShownPoints => _currentlyShownPoints;

  /// The public stream of events that the unit tests might care about (but
  /// the generic presenter shouldn't need), like new choiceLists, new toasts,
  /// etc.
  Stream<String> get debugStream => _debugStream;

  Stream<String> get endOfBookReached =>
      debugStream.where((value) => value == BOOK_ENDED_EVENT);

  /// The choices that have been shown most recently.
  ChoiceList get latestChoices => _latestChoices;

  Stream<String> get playerQuit =>
      debugStream.where((value) => value == PLAYER_QUIT_EVENT);

  List<UIStat> get visibleStats =>
      _statsList.where((stat) => stat.show == true).toList(growable: false);

  Future<bool> addSavegameBookmark(Savegame savegame) {
    _log.info("==> savegame created (${savegame.uid})");
    return new Future.value(true);
  }

  Future<bool> awardPoints(PointsAward award) {
    _log.fine("MockPresenter: *** $award ***");
    _debugStreamController.add(POINTS_AWARDED_EVENT);
    _currentlyShownPoints = award.result;
    return new Future.value(true);
  }

  /// Choose from the current choiceList by string (or register this string
  /// for the next future choice). The future completes when scripter waits
  /// for next input or when the book ends.
  void choose(String choiceString) {
    if (_currentChoices == null) {
      choicesToBeTakenByString.addLast(choiceString);
      _log.fine(
          "MockPresenter will choose '$choiceString' on next choiceList.");
    } else {
      int hash = _getChoiceHashFromString(choiceString, _currentChoices);
      _currentChoices = null;
      _currentChoicesCompleter.complete(hash);
      _currentChoicesCompleter = null;
    }
  }

  void close() {
    closed = true;
  }

  void endBook() {
    _log.info("MockPresenter: End of Book");
    _debugStreamController.add(BOOK_ENDED_EVENT);
  }

  String getTextHistory() => "Method getTextHistory() not implemented on "
      "MockPresenter.";

  @override
  void log(String text) {
    // TODO: implement log
  }

  void quit() {
    _log.info("MockPresenter.quit() called.");
    playerProfile.close();
    scripter.quit();
    _debugStreamController.add(PLAYER_QUIT_EVENT);
  }

  Future<bool> reportError(String title, String text) {
    _log.severe("ERROR: $title\n$text");
    return new Future.value(true);
  }

  void restart() {
    _log.info("MockPresenter.restart() called.");
    scripter.restart();
  } // TODO: use for unittesting
  @override
  void save(Savegame savegame) {
    playerProfile.save(savegame);
  }

  Future<bool> setStats(List<UIStat> stats) {
    _statsList = stats;
    _printStats();
    return new Future.value(true);
  }

  void setup() {
    started = true;
  }

  Future<int> showChoices(ChoiceList choiceList) {
    choiceList.forEach(
        (choice) => _log.fine("MockPresenter choice: '${choice.string}'"));
    _latestChoices = choiceList;
    if (choicesToBeTaken.length > 0) {
      int choiceNumber = choicesToBeTaken.removeFirst();
      _log.info(
          "MockPresenter pick: $choiceNumber) '${choiceList[choiceNumber].string}' "
          "-> ${choiceList[choiceNumber].hash}");
      return new Future.value(choiceList[choiceNumber].hash);
    } else if (choicesToBeTakenByString.length > 0) {
      String choiceString = choicesToBeTakenByString.removeFirst();
      int hash = _getChoiceHashFromString(choiceString, choiceList);
      return new Future.value(hash);
    } else {
      if (waitForChoicesToBeTaken) {
        _currentChoices = choiceList;
        _currentChoicesCompleter = new Completer();
        _debugStreamController.add(WAITING_FOR_INPUT_EVENT);
        return _currentChoicesCompleter.future;
      } else {
        // No predefined choices and no waiting - let's quit.
        _log.info("MockPresenter pick: NONE, Quitting");
        quit();
        return new Future.value(null);
      }
    }
  }

  @override
  Stream<CurrentState> showForm(FormProxy formProxy) {
    throw new UnimplementedError();
  }

  @override
  Future<Null> showSlotMachine(double probability, Result predeterminedResult) {
    throw new UnimplementedError();
  }

  Future<bool> showText(String s) {
    _log.fine("MockPresenter output: $s");
    if (s.trim() != "") {
      latestOutput = s.split("\n\n").last;
      _debugStreamController.add(TEXTBLOCK_SHOWN_EVENT);
    }
    return new Future.value(true);
  }

  @override
  void updateForm(FormConfiguration values) {
    // TODO: implement updateForm
  }

  Future<bool> updateStats(StatUpdateCollection updates) {
    UIStat.updateStatsList(_statsList, updates);
    _printStats();
    return new Future.value(true);
  }

  /// Completes the future when Presenter waits for input or when the book is
  /// ended.
  Future<Presenter> waitForDone() => debugStream
      .firstWhere((value) =>
          value == WAITING_FOR_INPUT_EVENT || value == BOOK_ENDED_EVENT)
      .then((_) => this);

  int _getChoiceHashFromString(String str, ChoiceList list) {
    int choiceNumber;
    for (int i = 0; i < list.length; i++) {
      if (list[i].string == str) {
        choiceNumber = i;
        break;
      }
    }
    if (choiceNumber == null) throw "Choice $str not available.";
    _log.fine("MockPresenter pick: $choiceNumber) '$str' "
        "-> ${list[choiceNumber].hash}");
    return list[choiceNumber].hash;
  }

  void _printStats() {
    _log.fine("Stats:");
    _statsList.where((stat) => stat.show == true).forEach((stat) {
      _log.fine("- $stat");
    });
  }
}
