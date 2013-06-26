library mock_interface;

import 'dart:collection';
import 'dart:async';

import 'package:egamebook/src/interface/interface.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:egamebook/src/persistence/savegame.dart';


class MockInterface extends EgbInterfaceBase {
  Queue<int> choicesToBeTaken;
  Queue<String> choicesToBeTakenByString;
  String latestOutput;
  EgbChoiceList _latestChoices;
  /// The choices that have been shown most recently.
  EgbChoiceList get latestChoices => _latestChoices;
  bool started = false;
  bool closed = false;
  
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

  MockInterface({bool this.waitForChoicesToBeTaken: false}) 
      : choicesToBeTaken = new Queue<int>(),
      choicesToBeTakenByString = new Queue<String>(), super() {
    _stream = streamController.stream.asBroadcastStream();
  }

  void setup() {
    started = true;
  }

  void close() {
    closed = true;
  }

  Future<bool> showText(String s) {
    print("MockInterface output: $s");
    if (s.trim() != "") {
      latestOutput = s;
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
        return _currentChoicesCompleter.future;
      } else {
        // No predefined choices and no waiting - let's quit.
        print("MockInterface pick: NONE, Quitting");
        streamController.sink.add(
            new PlayerIntent(PlayerIntent.QUIT));
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
  
  void choose(String choiceString) {
    if (_currentChoices == null) {
      choicesToBeTakenByString.addLast(choiceString);
      print("MockInterface will choose '$choiceString' on next choiceList.");
      return;
    }
    int hash = _getChoiceHashFromString(choiceString, _currentChoices);
    _currentChoices = null;
    _currentChoicesCompleter.complete(hash);
    _currentChoicesCompleter = null;
  }
  
  void quit() {
    print("MockInterface.quit() called.");
    streamController.sink.add(
        new PlayerIntent(PlayerIntent.QUIT));
  }
  
  // TODO: stream [ended] and stream [waitingForInput]
  
  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    print("==> savegame created (${savegame.uid})");
  }
}
