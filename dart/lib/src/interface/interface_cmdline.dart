library egb_interface_cmdline;

import 'dart:async';
import 'dart:io';

import 'interface.dart';
import '../shared/savegame.dart';
import '../shared/user_interaction.dart';

class CmdlineInterface implements EgbInterface {

  StringInputStream cmdLine;
  
  StreamController<PlayerIntent> _streamController;
  Stream get stream => _streamController.stream;
  
  /**
    Constructor.
    */
  CmdlineInterface() {
    _streamController = new StreamController();
  }
  
  void setup() {
    cmdLine = new StringInputStream(stdin);
  }
  
  void close() {
    _streamController.close();
    stdin.close();
  }
  
  Future<bool> showText(String s) {
    print(s);
    return new Future.immediate(true);
  }
  

  Future<int> showChoices(EgbChoiceList choiceList) {
    var completer = new Completer();
    
    if (choiceList.question != null) {
      print(choiceList.question);
    }
    
    // let player choose
    for (int i = 0; i < choiceList.length; i++) {
      print("${i+1}) ${choiceList[i].string}");
    }
    print("");
    
    cmdLine.onLine = () {
      print("");
      var line = cmdLine.readLine();
      
      if (line.trim().toLowerCase() == "quit") {
        _streamController.sink.add(
            new PlayerIntent(PlayerIntent.QUIT));
        return new Completer().future;
      }
      
      try {
        int optionNumber = int.parse(line);
        if (optionNumber >= 1 && optionNumber <= choiceList.length) {
          completer.complete(choiceList[optionNumber - 1].hash);
        } else {
          throw new FormatException("Number outside the choiceList range.");
        }
      } on FormatException catch (e) {
        print("Input a number between 1 and ${choiceList.length}, please.");
      }
    };
    
    return completer.future;
  }
  
  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    print("==> savegame created (${savegame.uid})");
  }
}