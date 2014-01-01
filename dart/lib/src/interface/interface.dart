library egb_interface;

import 'dart:async';
import 'dart:isolate';

import '../shared/user_interaction.dart';
import '../persistence/savegame.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';

abstract class EgbInterface {
  ReceivePort _receivePort;
  SendPort _scripterPort;
  
  /**
   * Outputs the text (in it's pure, non-HTMLified form) that has been shown
   * so far since the last savegame (or beginning of book).
   */
  String getTextHistory();
  
  /// Called on startup to create the interface environment.
  void setup();
  /// Called when there is no more options to take in the book, and so it has
  /// ended. Interface can choose to show a message, call-to-action, etc.
  void endBook();
  /// Called when interface is not needed anymore. This is not necessarily the
  /// same time when the book ends ([endBook()]) -- a player can still choose
  /// to use the interface to retry (restart or load).
  void close();

  /**
   * Displays the markdown-formated text.
   */
  Future<bool> showText(String text);
  
  /**
   * Interface gets choices, presents them to user. When user selects 
   * the choice, the returned Future completes with the selected choice's
   * hash.
   * 
   * This also displays the HTML-formated question, if it is set in ChoiceList. 
   * The question hould disappear after one of the choices is picked.
   * 
   * Completes with null when user wants to quit.
   */
  Future<int> showChoices(EgbChoiceList choices);
  
  /// Updates the points count and, when [award.addition] is non-zero, it also
  /// informs the player about the new points.
  Future<bool> awardPoints(PointsAward award);
  
  /// Sets the stats to be used in the game. The interface should create/retain
  /// the Stat objects for those and show all the stats which have
  /// [:stat.show == true:]. During the game, only the [Stat.value] and the 
  /// [Stat.show] will change (via [updateStats]).
  Future<bool> setStats(List<UIStat> stats);
  
  /// Tells the interface about changed stats. Interface should update the shown
  /// value(s) and show/hide stats according to the [Stat.show] state.
  /// Feed this function with the [EgbMessage.mapContent] of the received
  /// [EgbMessage.UPDATE_STATS] message.  
  Future<bool> updateStats(Map<String,Object> mapContent); 
  
  // TODO: toast() ?
  Future<bool> reportError(String title, String text);
  
  /**
   * Marks the point at which the gameplay is saved. Interface should relay
   * the information to the player and make it possible to reload the position
   * later. (Communicated to the Runner via [stream].)
   */
  Future<bool> addSavegameBookmark(EgbSavegame savegame);
  
  /// Stream that sends player's interactions (apart from choice selection).
  /// These interactions include loading game states, starting a gamebook
  /// from scratch, etc.
  Stream<PlayerIntent> get stream;
}

abstract class EgbInterfaceBase implements EgbInterface {
  StreamController<PlayerIntent> streamController;
  Stream<PlayerIntent> get stream => streamController.stream;
  
  EgbInterfaceBase() {
    streamController = new StreamController();
  }
  
  void close() {
    streamController.close();
  }
  
  void sendRestartIntent() {
    streamController.add(new RestartIntent());
  }
  
  void sendLoadIntent(String savegameUid) {
    streamController.add(new LoadIntent(savegameUid));
  }
  
  void sendQuitIntent() {
    streamController.add(new QuitIntent());
  }
}
