library egb_interface_cmdline;

import 'dart:async';
import 'dart:io';

import 'interface.dart';
import '../persistence/savegame.dart';
import '../shared/user_interaction.dart';

class CmdlineInterface implements EgbInterface {

  Stream<String> _cmdLine;
  StreamSubscription<String> _cmdLineSubscription;
  
  StreamController<PlayerIntent> _streamController;
  Stream get stream => _streamController.stream;
  
  /**
    Constructor.
    */
  CmdlineInterface() {
    _streamController = new StreamController();
  }
  
  void setup() {
    _cmdLine = stdin
              .transform(new StringDecoder())
              .transform(new LineTransformer());
    _cmdLineSubscription = _cmdLine.listen(_handleCmdLine);
    _cmdLineSubscription.pause();
  }
  
  void close() {
    _streamController.close();
    print("Closing cmdline");
    _cmdLineSubscription.cancel();
  }
  
  Future<bool> showText(String s) {
    print(s);
    return new Future.immediate(true);
  }
  
  void _handleCmdLine(String line) {
    if (_currentChoiceList == null || _choiceCompleter == null) {
      print("Ignoring user input when not asked for.");
    }
    
    print("[got: '$line']");
    
    if (line.trim().toLowerCase() == "quit") {
      _streamController.sink.add(
          new PlayerIntent(PlayerIntent.QUIT));
      return;
    }
    
    try {
      int optionNumber = int.parse(line);
      if (optionNumber >= 1 && optionNumber <= _currentChoiceList.length) {
        _cmdLineSubscription.pause();
        _choiceCompleter.complete(_currentChoiceList[optionNumber - 1].hash);
        _choiceCompleter = null;
        _currentChoiceList = null;
      } else {
        throw new FormatException("Number outside the choiceList range.");
      }
    } on FormatException catch (e) {
      print("Input a number between 1 and ${_currentChoiceList.length}, please.");
    }
  }
  
  EgbChoiceList _currentChoiceList;
  Completer _choiceCompleter;

  Future<int> showChoices(EgbChoiceList choiceList) {
    if (choiceList.question != null) {
      print(choiceList.question);
    }
    
    // let player choose
    for (int i = 0; i < choiceList.length; i++) {
      print("${i+1}) ${choiceList[i].string}");
    }
    print("");
    
    assert(_choiceCompleter == null);
    
    _choiceCompleter = new Completer();
    _currentChoiceList = choiceList;
    _cmdLineSubscription.resume();
    
    return _choiceCompleter.future;
  }
  
  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    print("==> savegame created (${savegame.uid})");
  }
}