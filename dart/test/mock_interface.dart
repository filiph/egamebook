library mock_interface;

import 'dart:collection';
import 'dart:async';

import 'package:egamebook/src/interface/interface.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/src/shared/points_award.dart';
import 'package:egamebook/src/shared/stat.dart';

class MockInterface extends EgbInterfaceBase {
  Queue<int> choicesToBeTaken;
  Queue<String> choicesToBeTakenByString;
  String latestOutput;
  EgbChoiceList _latestChoices;
  /// The choices that have been shown most recently.
  EgbChoiceList get latestChoices => _latestChoices;
  bool started = false;
  bool closed = false;
  List<UIStat> get visibleStats => 
      _statsList.where((stat) => stat.show == true).toList(growable: false);
  
  /// Choices that are being shown now.
  EgbChoiceList _currentChoices;
  Completer<int> _currentChoicesCompleter;
  
  /// If set to [:false:] (default), when [MockInterface] meets choices without
  /// any [choicesToBeTaken] or [choicesToBeTakenByString] set, it quits. When
  /// set to [:true:], the choice can be taken later by calling 
  /// [MockInterface.choose()].
  bool waitForChoicesToBeTaken;

  Stream _stream;
  Stream get stream => _stream;
  
  StreamController<String> _eventStreamController;
  Stream<String> _eventStream;
  /// The public stream of events that the unit tests might care about (but
  /// the generic interface shouldn't need), like new choiceLists, new toasts,
  /// etc.  
  Stream<String> get eventStream => _eventStream;
  
  static final String WAITING_FOR_INPUT_EVENT = "WAITING_FOR_INPUT";
  static final String TEXTBLOCK_SHOWN_EVENT = "TEXTBLOCK_SHOWN";
  static final String TOAST_SHOWN_EVENT = "TOAST_SHOWN";
  static final String STATS_UPDATED_EVENT = "STATS_UPDATED";
  static final String BOOK_ENDED_EVENT = "BOOK_ENDED";
  static final String POINTS_AWARDED_EVENT = "POINTS_AWARDED";

  MockInterface({bool this.waitForChoicesToBeTaken: false}) 
      : choicesToBeTaken = new Queue<int>(),
      choicesToBeTakenByString = new Queue<String>(), super() {
    _stream = streamController.stream.asBroadcastStream();
    _eventStreamController = new StreamController();
    _eventStream = _eventStreamController.stream.asBroadcastStream();
  }

  void setup() {
    started = true;
  }
  
  void endBook() {
    _eventStreamController.add(BOOK_ENDED_EVENT);
  }

  void close() {
    closed = true;
  }

  Future<bool> showText(String s) {
    print("MockInterface output: $s");
    if (s.trim() != "") {
      latestOutput = s.split("\n\n").last;
      _eventStreamController.add(TEXTBLOCK_SHOWN_EVENT);
    }
    return new Future.value(true);
  }
  
  String getTextHistory() => "Method getTextHistory() not implemented on "
                             "MockInterface.";

  Future<int> showChoices(EgbChoiceList choiceList) {
    choiceList.forEach((choice) => print("MockInterface choice: '${choice.string}'"));
    _latestChoices = choiceList;
    if (choicesToBeTaken.length > 0) {
      int choiceNumber = choicesToBeTaken.removeFirst();
      print("MockInterface pick: $choiceNumber) '${choiceList[choiceNumber].string}' "
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
        _eventStreamController.add(WAITING_FOR_INPUT_EVENT);
        return _currentChoicesCompleter.future;
      } else {
        // No predefined choices and no waiting - let's quit.
        print("MockInterface pick: NONE, Quitting");
        streamController.add(new QuitIntent());
        streamController.close();
        return new Completer().future;
      }
    }
  }
  
  int _getChoiceHashFromString(String str, EgbChoiceList list) {
    int choiceNumber = null;
    for (int i = 0; i < list.length; i++) {
      if (list[i].string == str) {
        choiceNumber = i;
        break;
      }
    }
    if (choiceNumber == null) throw "Choice $str not available.";
    print("MockInterface pick: $choiceNumber) '$str' "
        "-> ${list[choiceNumber].hash}");
    return list[choiceNumber].hash;
  }
  
  /// Choose from the current choiceList by string (or register this string
  /// for the next future choice). The future completes when scripter waits
  /// for next input or when the book ends.
  void choose(String choiceString) {
    if (_currentChoices == null) {
      choicesToBeTakenByString.addLast(choiceString);
      print("MockInterface will choose '$choiceString' on next choiceList.");
    } else {
      int hash = _getChoiceHashFromString(choiceString, _currentChoices);
      _currentChoices = null;
      _currentChoicesCompleter.complete(hash);
      _currentChoicesCompleter = null;
    }
  }
  
  void quit() {
    print("MockInterface.quit() called.");
    streamController.add(new QuitIntent());
  }
  
  void restart() {
    print("MockInterface.restart() called.");
    streamController.add(new RestartIntent());
  }
  
  /// Completes the future when interface waits for input or when the book is
  /// ended.
  Future<EgbInterface> waitForDone() =>
    eventStream.firstWhere((value) => 
        value == WAITING_FOR_INPUT_EVENT || value == BOOK_ENDED_EVENT)
        .then((_) => this);
  
  Future<bool> awardPoints(PointsAward award) {
    print("MockInterface: *** $award ***");
    _eventStreamController.add(POINTS_AWARDED_EVENT);
    _currentlyShownPoints = award.result;
    return new Future.value(true);
  }
  
  int _currentlyShownPoints = 0;  // TODO: use for unittesting
  int get currentlyShownPoints => _currentlyShownPoints;
  
  List<UIStat> _statsList;
  
  Future<bool> setStats(List<UIStat> stats) {
    _statsList = stats;
    _printStats();
  }
  
  Future<bool> updateStats(Map<String,Object> mapContent) {
    UIStat.updateStatsListFromMap(_statsList, mapContent);
    _printStats();
  }
  
  void _printStats() {
    print("Stats:");
    _statsList.where((stat) => stat.show == true).forEach((stat) {
      print("- $stat");
    });
  }
  
  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    print("==> savegame created (${savegame.uid})");
  }

  Future<bool> reportError(String title, String text) {
    print("ERROR: $title\n$text");
  }
}
