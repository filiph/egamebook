library egb_presenter;

import 'dart:async';

import 'package:slot_machine/result.dart' as slot;

import 'package:egamebook/src/book/scripter_proxy.dart';
import 'package:egamebook/src/persistence/player_profile.dart';

import 'src/persistence/savegame.dart';
import 'src/presenter/presenter_proxy.dart';
import 'src/shared/points_award.dart';
import 'package:egamebook/stat/stat.dart';
import 'src/shared/user_interaction.dart';

/// Presenter is an interface for all presenters in application.
/// It has information about player profile and Scripter.
abstract class Presenter implements PresenterViewedFromScripter {
  /// Sets scripter to [scripterProxy].
  ScripterViewedFromPresenter scripter;

  /// Player profile.
  PlayerProfile _playerProfile;

  /// Getter returns player profile.
  PlayerProfile get playerProfile => _playerProfile;

  /**
   * Marks the point at which the gameplay is saved. Presenter should relay
   * the information to the player and make it possible to reload the position
   * later. (Communicated to the Runner via [stream].)
   *
   * The naming is deprecated - should just be 'save'.
   */
  @deprecated
  Future<bool> addSavegameBookmark(Savegame savegame);

  /// Updates the points count and, when [award.addition] is non-zero, it also
  /// informs the player about the new points.
  Future<bool> awardPoints(PointsAward award);

  /// Called when presenter is not needed anymore. This is not necessarily the
  /// same time when the book ends ([endBook()]) -- a player can still choose
  /// to use the presenter to retry (restart or load). But when the game session
  /// is ending, for example, then this method should be called on the running
  /// user interface.
  void close() {
    playerProfile.close();
  }

  /// Either loads the latest savegame or -- if missing -- creates a new one.
  Future<Presenter> continueSavedGameOrCreateNew() async {
    Savegame savegame = await playerProfile.loadMostRecent();

    Set<String> chronology = new Set<String>();
    if (savegame != null) {
      chronology = await playerProfile.loadPlayerChronology();
      scripter.load(savegame, chronology);
      log("Loaded a savegame.");
    } else {
      scripter.restart();
      log("No savegame found, restarting.");
    }
    return this;
  }

  /// Called when there is no more options to take in the book, and so it has
  /// ended. Presenter can choose to show a message, call-to-action, etc.
  void endBook();

  /**
   * Outputs the text (in it's pure, non-HTMLified form) that has been shown
   * so far since the last savegame (or beginning of book).
   */
  String getTextHistory();

  /// Reports error in the presenter with [title] and [text]. For example shows
  /// an error dialog.
  Future<bool> reportError(String title, String text);

  @override
  void savePlayerChronology(Set<String> playerChronology) {
    playerProfile.savePlayerChronology(playerChronology);
  }

  /// Sets player profile to [playerProfile].
  void setPlayerProfile(PlayerProfile playerProfile) {
    _playerProfile = playerProfile;
  }

  // TODO: toast() ?
  void setScripter(ScripterViewedFromPresenter scripter) {
    this.scripter = scripter;
    assert(scripter.uid != null);
    playerProfile.currentEgamebookUid = scripter.uid;
    scripter.setPresenter(this);
  }

  /// Sets the stats to be used in the game. The presenter should create/retain
  /// the Stat objects for those and show all the stats which have
  /// [:stat.show == true:]. During the game, only the [Stat.value] and the
  /// [Stat.show] will change (via [updateStats]).
  Future<bool> setStats(List<UIStat> stats);

  /// Called on startup to create the presenter environment.
  void setup();

  /**
   * Presenter gets choices, presents them to user. When user selects
   * the choice, the returned Future completes with the selected choice's
   * hash.
   *
   * This also displays the HTML-formatted question, if it is set in ChoiceList.
   * The question should disappear after one of the choices is picked.
   *
   * Completes with null when user wants to quit.
   */
  Future<int> showChoices(ChoiceList choices);

  /// Show a slot machine visualization and return Future that completes
  /// it has started running.
  ///
  /// The slot machine shows [rollReason] next to its visualization. An example
  /// of roll reason can be "Will you hit him?" or "Does Joe avoid the missile?"
  Future<slot.SessionResult> showSlotMachine(
      double probability, String rollReason,
      {bool rerollable, String rerollEffectDescription});

  /**
   * Displays the markdown-formatted text.
   */
  Future<bool> showText(String text);

  /// Tells the presenter about changed stats. Presenter should update the shown
  /// value(s) and show/hide stats according to the [Stat.show] state.
  /// Feed this function with the [Message.mapContent] of the received
  /// [Message.UPDATE_STATS] message.
  Future<bool> updateStats(StatUpdateCollection updates);
}
