library egb_player_profile;

import 'dart:json';

import 'egb_savegame.dart';
import 'egb_storage.dart';

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
class EgbPlayerProfile {

  const String PREFERENCES_KEY = "prefs";
  
  EgbPlayerProfile(this.playerUid, this._storage) {
    _loadPreferences();
  }
  
  String playerUid;
  String currentEgamebookUid;
  
  Map<String,dynamic> preferences;
  
  Future<bool> _savePreferences() {
    return _storage.save("$playerUid::$PREFERENCES_KEY", 
                         JSON.stringify(preferences));
  }
  
  Future<bool> _loadPreferences() {
    var completer = new Completer();
    _storage.load("$playerUid::$PREFERENCES_KEY")
    .then((json) {
      if (json == null || json == "") {
        preferences = new Map();
      } else {
        preferences = JSON.parse(json);
      }
      completer.complete(true);
    });
    return completer.future;
  }
  
  /// Curent egamebook's savegames for the current player profile.
  /// There is up to [maxSaves] of them.
  Queue<EgbSavegame> savegames;
  
  EgbStorage _storage;
  
  /**
   * Number of savegames to keep in storage per given egamebook and player.
   */
  int _maxSaves = 10;
  get maxSaves => _maxSaves;
  set maxSaves(int value) => _maxSaves = value; // TODO fix queue etc.
  
  /// Helper function that prepends [playerUid] and [currentEgamebookUid] to
  /// the key, then saves to the storage.
  /// Throws if [currentEgamebookUid] is not set.
  Future<bool> _save(String key, String value) {
    if (currentEgamebookUid == null) throw "currentEgamebookUid not set"; //TODO
    return _storage.save("$playerUid::$currentEgamebookUid::$key", value);
  }
  
  /// Helper function that prepends [playerUid] and [currentEgamebookUid] to
  /// the key, then loads from the storage.
  /// Throws if [currentEgamebookUid] is not set.
  Future<String> _load(String key) {
    if (currentEgamebookUid == null) throw "currentEgamebookUid not set"; //TODO
    return _storage.load("$playerUid::$currentEgamebookUid::$key");
  }
  
  /**
   * Adds the savegame to the existing [savegames] Queue, then saves to
   * storage. Files it under the [currentEgamebookUid] and [playerUid].
   * 
   * Gets rid of old savegames if there is more than [maxSaves] present in 
   * the storage.
   */
  Future<bool> save(EgbSavegame savegame) {
    savegames.addLast(savegame);
    if (savegames.length > maxSaves) savegames.removeFirst();
    
    var savegameList = new List<EgbSavegame>.from(savegames);
    return _save("savegames", savegameList.toString());
  }
  
  /// Loads the [offset]th latest savegame. Returns [:null:] when there are 
  /// no savegames.
  Future<EgbSavegame> load([int offset=0]) {
    if (offset >= maxSaves) throw "Offset must be lower than maxSaves.";
    if (offset != 0) throw "Loading games older than the most recent is not "
                           "implemented yet";

    var completer = new Completer<EgbSavegame>();
    
    // TODO: do we need to go to the storage all the time? we have the savegames
    // in memory...
    
    _load("savegames")
    .then((json) {
      List<EgbSavegame> savegameList = JSON.parse(json);
      if (savegameList.isEmpty) {
        completer.complete(null);
      } else {
        savegames = new Queue<EgbSavegame>.from(savegameList);
        completer.complete(savegames.last);
      }
    });
    
    return completer.future;
  }
  
  /// Loads the latest savegame. Returns [:null:] when there are 
  /// no savegames.
  Future<EgbSavegame> loadMostRecent() => load(0);
}
