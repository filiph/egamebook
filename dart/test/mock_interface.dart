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
  EgbChoiceList latestChoices;
  bool started = false;
  bool closed = false;

  Stream _stream;
  Stream get stream => _stream;

  MockInterface() : choicesToBeTaken = new Queue<int>(),
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
    latestChoices = choiceList;
    if (choicesToBeTaken.length > 0) {
      int choiceNumber = choicesToBeTaken.removeFirst();
      print("MockInterface pick: $choiceNumber) '${choiceList[choiceNumber].string}' "
                                "-> ${choiceList[choiceNumber].hash}");
      return new Future.value(choiceList[choiceNumber].hash);
    } else if (choicesToBeTakenByString.length > 0) {
      String choiceString = choicesToBeTakenByString.removeFirst();
      int choiceNumber = null;
      for (int i = 0; i < choiceList.length; i++) {
        if (choiceList[i].string == choiceString) {
          choiceNumber = i;
          break;
        }
      }
      if (choiceNumber == null) throw "Choice $choiceString not available.";
      print("MockInterface pick: $choiceNumber) '${choiceList[choiceNumber].string}' "
                                "-> ${choiceList[choiceNumber].hash}");
      return new Future.value(choiceList[choiceNumber].hash);
    } else {
      print("MockInterface pick: NONE, Quitting");
      streamController.sink.add(
          new PlayerIntent(PlayerIntent.QUIT));
      streamController.close();
      return new Completer().future;
    }
  }

  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    print("==> savegame created (${savegame.uid})");
  }
}
