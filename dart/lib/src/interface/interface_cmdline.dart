library egb_interface_cmdline;

import 'dart:async';
import 'dart:io';

import 'interface.dart';
import '../persistence/savegame.dart';
import '../shared/user_interaction.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';

class CmdlineInterface extends EgbInterfaceBase {
  Stream<String> _cmdLine;
  StreamSubscription<String> _cmdLineSubscription;
  
  StringBuffer _textHistory = new StringBuffer();
  String getTextHistory() => _textHistory.toString();
  
  /**
    Constructor.
    */
  CmdlineInterface() : super();
  
  void setup() {
    _cmdLine = stdin
              .transform(new StringDecoder())
              .transform(new LineTransformer());
    _cmdLineSubscription = _cmdLine.listen(_handleCmdLine);
    _cmdLineSubscription.pause();
  }
  
  void endBook() {
    print("=== END OF BOOK ===");
  }
  
  void close() {
    streamController.close();
    print("Closing cmdline");
    _cmdLineSubscription.cancel();
  }
  
  Future<bool> showText(String s) {
    print(s);
    _textHistory.writeln(s);
    return new Future.value(true);
  }
  
  void _handleCmdLine(String line) {
    if (_currentChoiceList == null || _choiceCompleter == null) {
      print("Ignoring user input when not asked for.");
    }
    
    print("[got: '$line']");
    
    if (line.trim().toLowerCase() == "quit") {
      streamController.add(new QuitIntent());
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
    
    // TODO: add choice text to _textHistory
    
    return _choiceCompleter.future;
  }
  
  Future<bool> awardPoints(PointsAward award) {
    print("*** $award ***");
    return new Future.value(true);
  }
  
  List<Stat> _statsList;
  
  Future<bool> setStats(List<Stat> stats) {
    _statsList = stats;
    _printStats();
  }
  
  Future<bool> updateStats(Map<String,Object> mapContent) {
    Stat.updateStatsListFromMap(_statsList, mapContent);
    _printStats();
  }
  
  void _printStats() {
    print("Stats:");
    _statsList.where((stat) => stat.show == true).forEach((stat) {
      print("- $stat");
    });
  }
  
  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    _textHistory.clear();
    print("==> savegame created (${savegame.uid})");
  }
}