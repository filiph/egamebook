library egb_player_profile;

import 'dart:collection';
import 'dart:async';
import 'dart:convert' show JSON;

import 'savegame.dart';
import 'storage.dart';

/**
 * Encapsulates info about a unique player of current egamebook.
 * A player can have preferences and up to [maxSaves] savegames for the current
 * egamebook.
 *
 * Note: this class does not reveal savegames for other egamebooks. It
 * theoretically could, but there is no reason, so it only works with
 * the [currentEgamebookUid].
 *
 * Allows the Runner to save and load games from/to a storage. This can be
 * memory, a file, a database, or – more specifically – HTML5 localStorage.
 */
class PlayerProfile {
  /// Is used as a part of name for shared preferences key.
  static const String PREFERENCES_KEY = "prefs";

  /// Creates new PlayerProfile with given Uid of player [playerUid] and
  /// instance of Store [_store].
  PlayerProfile(this.playerUid, this._store) {
    _loadPreferences();
  }

  /// Called to close player profile. Saves story chronology and preferences
  /// to the storage.
  void close() {
    if (storyChronology != null) _saveStoryChronology();
    _savePreferences();
  }

  /// Uid of the player this profile is associated with.
  String playerUid;

  /// Uid of current gamebook. *Must* be set for saving and loading to work.
  /// TODO: get rid of this. All calls to playerProfile should explicitly state
  /// the UID.
  String currentEgamebookUid;

  /**
   * Global (non-gamebook-specific) preferences of the player.
   */
  Map<String, dynamic> preferences;

  /// Saves preferences for the player to the storage.
  Future<bool> _savePreferences() {
    return _store.save(
        "$playerUid::$PREFERENCES_KEY", JSON.encode(preferences));
  }

  /// Loads preferences for the player from the storage.
  Future<bool> _loadPreferences() {
    var completer = new Completer();
    _store.load("$playerUid::$PREFERENCES_KEY").then((json) {
      if (json == null || json == "") {
        preferences = new Map();
      } else {
        preferences = JSON.decode(json);
      }
      completer.complete(true);
    });
    return completer.future;
  }

  /// A queue of [savegame] [:uid:] fields. Make it easier to find the oldest
  /// or newest savegame, as well as sorting them. (Without resorting to sort
  /// by timestamp each time.)
  /// Updated automatically on each save.
  Queue<String> storyChronology;

  /// Instance of Store to use.
  Store _store;

  /**
   * Number of maximum savegames to keep in storage per given egamebook and player.
   */
  int _maxSaves = 10;

  /// Getter returns maximum number of savegames.
  int get maxSaves => _maxSaves;

  /// Setter sets [value] to maximum number of savegames.
  set maxSaves(int value) => _maxSaves = value; // TODO fix queue etc.

  /// Helper function that prepends [playerUid] and [currentEgamebookUid] to
  /// the [key], then saves to the storage.
  /// Throws if [currentEgamebookUid] is [:null:].
  Future<bool> _save(String key, String value) {
    if (currentEgamebookUid == null) throw "currentEgamebookUid not set"; //TODO
    return _store.save("$playerUid::$currentEgamebookUid::$key", value);
  }

  /// Helper function that prepends [playerUid] and [currentEgamebookUid] to
  /// the [key], then loads from the storage.
  /// Throws if [currentEgamebookUid] is [:null:].
  Future<String> _load(String key) {
    if (currentEgamebookUid == null) throw "currentEgamebookUid not set"; //TODO
    return _store.load("$playerUid::$currentEgamebookUid::$key");
  }

  /// Helper function that prepends [playerUid] and [currentEgamebookUid] to
  /// the key, then deletes the key-value pair from the storage.
  /// Throws if [currentEgamebookUid] is [:null:].
  Future<bool> _delete(String key) {
    if (currentEgamebookUid == null) throw "currentEgamebookUid not set"; //TODO
    return _store.delete("$playerUid::$currentEgamebookUid::$key");
  }

  /// Saves a story chronology to the storage.
  Future<bool> _saveStoryChronology() {
    return _save("_storyChronology", JSON.encode(storyChronology.toList()));
  }

  /// Loads a story chronology and saves it to the [storyChronology].
  Future<bool> _loadStoryChronology() {
    return _load("_storyChronology").then((json) {
      if (json != null) {
        List<String> list = JSON.decode(json);
        storyChronology = new Queue<String>.from(list);
      } else {
        storyChronology = new Queue<String>();
      }
      return true;
    });
  }

  /// Saves a player chronology from a given [playerChronology] to the storage.
  Future<bool> savePlayerChronology(Set<String> playerChronology) {
    return _save("_playerChronology",
        JSON.encode(playerChronology.toList(growable: false)));
  }

  /// Loads a player chronology as a Set from the storage.
  Future<Set<String>> loadPlayerChronology() {
    return _load("_playerChronology")
        .then((String s) => (JSON.decode(s) as List<String>).toSet());
  }

  /**
   * Saves the [savegame] to the storage.
   * Files it to the storage under the [currentEgamebookUid] and [playerUid].
   *
   * Gets rid of old savegames if there is more than [maxSaves] present in
   * the story chronology.
   */
  Future<bool> save(Savegame savegame) {
    if (storyChronology == null) {
      // We haven't retrieved savegamesChronology from the _store yet.
      // This code goes fetch it, re-runs the save() method, then forwards the
      // result to the caller of this function.
      var completer = new Completer();
      _loadStoryChronology().then((_) => save(savegame).then((value) {
            completer.complete(value);
          }));
      return completer.future;
    }

    if (storyChronology.length > maxSaves) {
      var hashToRemove = storyChronology.removeFirst();
      _delete(hashToRemove);
    }

    storyChronology.addLast(savegame.uid);
    _saveStoryChronology();
    return _save(savegame.uid, savegame.toJson());
  }

  /// Loads the savegame by [uid]. Returns [:null:] when there is
  /// no savegame with that [uid] in memory.
  Future<Savegame> load(String uid) {
    var completer = new Completer<Savegame>();

    _load(uid).then((json) {
      if (json == null) {
        completer.complete(null);
      } else {
        // extract savegame from JSON
        var savegame = new Savegame.fromJson(json);
        completer.complete(savegame);
      }
    });

    return completer.future;
  }

  /// Loads the most recent savegame. Returns [:null:] when there are
  /// no savegames.
  Future<Savegame> loadMostRecent() {
    if (storyChronology == null) {
      // We haven't retrieved savegamesChronology from the _store yet.
      // This code goes fetch it, re-runs the loadMostRecent() method, then
      // forwards the result to the caller of this function.
      // TODO: dry with save() ?
      var completer = new Completer();
      _loadStoryChronology().then((_) => loadMostRecent().then((value) {
            completer.complete(value);
          }));
      return completer.future;
    }

    if (storyChronology.isEmpty) return new Future.value(null);
    return load(storyChronology.last);
  }
}
