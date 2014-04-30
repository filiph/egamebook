library egb_interface;

import 'dart:async';
import 'dart:isolate';

import '../shared/user_interaction.dart';
import '../persistence/savegame.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';

import 'interface_proxy.dart';
import 'package:egamebook/src/persistence/player_profile.dart';
import 'package:egamebook/src/book/scripter_proxy.dart';
import 'package:egamebook/src/interface/form_proxy.dart';
import 'package:egamebook/src/shared/form.dart';

abstract class EgbInterface implements EgbInterfaceViewedFromScripter {
  ReceivePort _receivePort;
  SendPort _scripterPort;
  
  /**
   * Outputs the text (in it's pure, non-HTMLified form) that has been shown
   * so far since the last savegame (or beginning of book).
   */
  String getTextHistory();
  
  /// Called on startup to create the interface environment.
  void setup();
  
  /// Either loads the latest savegame or -- if missing -- creates a new one.
  Future continueSavedGameOrCreateNew();
  
  /// Called when there is no more options to take in the book, and so it has
  /// ended. Interface can choose to show a message, call-to-action, etc.
  void endBook();
  
  /// Called when interface is not needed anymore. This is not necessarily the
  /// same time when the book ends ([endBook()]) -- a player can still choose
  /// to use the interface to retry (restart or load). But when the game session
  /// is ending, for example, then this method should be called on the running
  /// user interface. 
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
  
  /// Shows a form in the interface, set with the initial values. Each time the
  /// user changes a value, the new values are emitted via the returned 
  /// [Stream].
  Stream<CurrentState> showForm(FormProxy formProxy);
  
  /// Updates the values and setup of the form with given [values].
  void updateForm(FormConfiguration values);
  
  // TODO: toast() ?
  Future<bool> reportError(String title, String text);
  
  /**
   * Marks the point at which the gameplay is saved. Interface should relay
   * the information to the player and make it possible to reload the position
   * later. (Communicated to the Runner via [stream].)
   */
  @deprecated
  Future<bool> addSavegameBookmark(EgbSavegame savegame);
  
  EgbPlayerProfile get playerProfile;
  
  void setPlayerProfile(EgbPlayerProfile playerProfile);
  
  void setScripter(EgbScripterProxy scripterProxy);
}

abstract class EgbInterfaceBase implements EgbInterface {
  
  EgbScripterProxy scripterProxy;
  void setScripter(EgbScripterProxy scripterProxy) {
    this.scripterProxy = scripterProxy;
  }
  
  Future<EgbInterface> continueSavedGameOrCreateNew() {
    EgbSavegame lastSavegame;
    Set<String> playerChronology;
    
    return playerProfile.loadMostRecent()
    .then((EgbSavegame savegame) {
      lastSavegame = savegame;
      
      if (lastSavegame == null) {
        return new Set<String>();
      } else {
        return playerProfile.loadPlayerChronology();
      }
    })
    .then((Set<String> chronology) {
      playerChronology = chronology;
      
      if (lastSavegame != null) {
        scripterProxy.load(lastSavegame, playerChronology);
      } else {
        scripterProxy.restart();
      }
      
      return this;
    });
  }
  
  @override
  EgbPlayerProfile get playerProfile => _playerProfile;
  
  EgbPlayerProfile _playerProfile;
  void setPlayerProfile(EgbPlayerProfile playerProfile) {
    _playerProfile = playerProfile;
  }
  
  @override
  void savePlayerChronology(Set<String> playerChronology) {
    playerProfile.savePlayerChronology(playerChronology);
  }
  
  void close() {
    playerProfile.close();
  }
}
