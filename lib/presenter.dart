library egb_presenter;

import 'dart:async';
import 'dart:isolate';

import 'src/shared/user_interaction.dart';
import 'src/persistence/savegame.dart';
import 'src/shared/points_award.dart';
import 'src/shared/stat.dart';

import 'src/presenter/presenter_proxy.dart';
import 'package:egamebook/src/persistence/player_profile.dart';
import 'package:egamebook/src/book/scripter_proxy.dart';
import 'package:egamebook/src/presenter/form_proxy.dart';
import 'package:egamebook/src/shared/form.dart';

/// EgbPresenter is an interface for all presenters in application.
/// It has information about player profile and Scripter.
abstract class EgbPresenter implements EgbPresenterViewedFromScripter {
  /**
   * Outputs the text (in it's pure, non-HTMLified form) that has been shown
   * so far since the last savegame (or beginning of book).
   */
  String getTextHistory();

  /// Called on startup to create the presenter environment.
  void setup();

  /// Called when there is no more options to take in the book, and so it has
  /// ended. Presenter can choose to show a message, call-to-action, etc.
  void endBook();

  /// Called when presenter is not needed anymore. This is not necessarily the
  /// same time when the book ends ([endBook()]) -- a player can still choose
  /// to use the presenter to retry (restart or load). But when the game session
  /// is ending, for example, then this method should be called on the running
  /// user interface.
  void close() {
    playerProfile.close();
  }

  /**
   * Displays the markdown-formatted text.
   */
  Future<bool> showText(String text);

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
  Future<int> showChoices(EgbChoiceList choices);

  /// Updates the points count and, when [award.addition] is non-zero, it also
  /// informs the player about the new points.
  Future<bool> awardPoints(PointsAward award);

  /// Sets the stats to be used in the game. The presenter should create/retain
  /// the Stat objects for those and show all the stats which have
  /// [:stat.show == true:]. During the game, only the [Stat.value] and the
  /// [Stat.show] will change (via [updateStats]).
  Future<bool> setStats(List<UIStat> stats);

  /// Tells the presenter about changed stats. Presenter should update the shown
  /// value(s) and show/hide stats according to the [Stat.show] state.
  /// Feed this function with the [EgbMessage.mapContent] of the received
  /// [EgbMessage.UPDATE_STATS] message.
  Future<bool> updateStats(StatUpdateCollection updates);

  /// Shows a form in the presenter, set with the initial values. Each time the
  /// user changes a value, the new values are emitted via the returned
  /// [Stream].
  Stream<CurrentState> showForm(FormBase formProxy);

  /// Updates the values and setup of the form with given [values].
  void updateForm(FormConfiguration values);

  // TODO: toast() ?
  /// Reports error in the presenter with [title] and [text]. For example shows
  /// an error dialog.
  Future<bool> reportError(String title, String text);

  /**
   * Marks the point at which the gameplay is saved. Presenter should relay
   * the information to the player and make it possible to reload the position
   * later. (Communicated to the Runner via [stream].)
   *
   * The naming is deprecated - should just be 'save'.
   */
  @deprecated
  Future<bool> addSavegameBookmark(EgbSavegame savegame);

  /// Sets scripter to [scripterProxy].
  EgbScripterViewedFromPresenter scripter;
  void setScripter(EgbScripterViewedFromPresenter scripter) {
    this.scripter = scripter;
    assert(scripter.uid != null);
    playerProfile.currentEgamebookUid = scripter.uid;
    scripter.setPresenter(this);
  }

  /// Either loads the latest savegame or -- if missing -- creates a new one.
  Future<EgbPresenter> continueSavedGameOrCreateNew() async {
    EgbSavegame lastSavegame;
    Set<String> playerChronology;

    EgbSavegame savegame = await playerProfile.loadMostRecent();

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

  /// Getter returns player profile.
  EgbPlayerProfile get playerProfile => _playerProfile;

  /// Player profile.
  EgbPlayerProfile _playerProfile;

  /// Sets player profile to [playerProfile].
  void setPlayerProfile(EgbPlayerProfile playerProfile) {
    _playerProfile = playerProfile;
  }

  @override
  void savePlayerChronology(Set<String> playerChronology) {
    playerProfile.savePlayerChronology(playerChronology);
  }
}
