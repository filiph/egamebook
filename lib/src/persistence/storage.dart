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
  /// Default player uid. Used for creating of a new [EgbPlayerProfile].
  static const String DEFAULT_PLAYER_UID = "default";

  /// Saves the [value] under [key] to the storage.
  Future<bool> save(String key, String value);
  /// Loads the String value under [key] from the storage.
  Future<String> load(String key);
  /// Deletes value under [key] from the storage.
  Future<bool> delete(String key);

  /// Returns default player [EgbPlayerProfile] for the storage.
  EgbPlayerProfile getDefaultPlayerProfile() {
    return new EgbPlayerProfile(DEFAULT_PLAYER_UID, this);
  }
}

/**
 * MemoryStorage is the most primitive, mock-level storage.
 * It only stores into memory (RAM), no persistence.
 */
class MemoryStorage extends EgbStorage {
  /// Memory storage
  Map<String, String> memory;

  /// Creates new MemoryStorage.
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
}