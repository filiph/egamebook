library egb_interface_cmdline;

import 'dart:async';
import 'dart:io';

import 'egb_interface.dart';
import 'egb_library.dart';

class CmdlineInterface implements EgbInterface {

  StringInputStream cmdLine;
  
  Future<bool> userQuit;
  Completer<bool> _userQuitCompleter;
  
  /**
    Constructor.
    */
  CmdlineInterface() {
    _userQuitCompleter = new Completer();
    userQuit = _userQuitCompleter.future;
  }
  
  void setup() {
    cmdLine = new StringInputStream(stdin);
  }
  
  void close() {
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
        _userQuitCompleter.complete(true);
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
}