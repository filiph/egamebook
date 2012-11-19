library egb_storage;

import 'egb_savegame.dart';

/**
 * Allows the Runner to save and load games from/to a storage. This can be
 * memory, a file, a database, or – more specifically – HTML5 localStorage. 
 */
abstract class EgbStorage {
  
  String egbUid;
  String playerUid;
  
  /**
   * Number of savegames to keep in storage per given egamebook and player.
   */
  int _maxSaves = 10;
  get maxSaves;
  set maxSaves(int value);
  
  Queue<String> savegameUids;
  
  EgbStorage(String this.egbUid, String this.playerUid) {
  }
  
  /**
   * Saves the savegame data and files it under the given egamebook UID and 
   * player UID.
   * 
   * Gets rid of old savegames if there is more than [maxSaves] present in 
   * the storage.
   * 
   * Returns UID of the saved resource (for later manipulation).
   */
  Future<String> save(EgbSavegame savegame);
  
  Future<EgbSavegame> load(String savegameUid);
  
  Future<EgbSavegame> loadMostRecent();
}
