library egb_storage;

import 'dart:async';
import 'player_profile.dart';

/**
 * Storage is the abstract class that can be implemented via any kind of 
 * actual storage mechanism (file i/o, HTML5 localStorage, cloud).
 * 
 * Storage is used to save and load player profile and savegames.
 */
abstract class EgbStorage {
  static const String DEFAULT_PLAYER_UID = "default";
  
  Future<bool> save(String key, String value);
  Future<String> load(String key);
  Future<bool> delete(String key);

  /// Returns default player [EgbPlayerProfile] for the storage.
  EgbPlayerProfile getDefaultPlayerProfile();
}

/**
 * The most primitive, mock-level storage. Only stores into memory (RAM),
 * no persistence.
 */
class MemoryStorage implements EgbStorage {
  Map<String, String> memory;
  
  MemoryStorage() {
    memory = new Map();
  }
  
  Future<bool> save(String key, String value) {
    memory[key] = value;
    return new Future.value(true);
  }
  
  Future<String> load(String key) {
    var result = memory[key];
    return new Future.value(result);
  }
  
  Future<bool> delete(String key) {
    memory.remove(key);
    return new Future.value(true);
  }
  
  EgbPlayerProfile getDefaultPlayerProfile() {
    return new EgbPlayerProfile(EgbStorage.DEFAULT_PLAYER_UID, 
                                             this);
  }  
}