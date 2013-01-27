library egb_savegame;

import 'dart:json';

import 'egb_message.dart';

/**
 * Savegame stores information of one point in time of the gameplay. This
 * includes the [currentPageName], information about visited pages
 * ([pageMapState] and [vars] defined by author. 
 */
class EgbSavegame {
  /// The page on which this savegame was created. Savegames are always created
  /// at the very end of the page, just before the player is presented with
  /// choices.
  String currentPageName;
  /// Holds information about visited pages and potentially other info.
  Map<String,dynamic> pageMapState;
  /// The serializable part of the [:vars:] map.
  Map vars;
  // TODO: points
  
  /**
   * Every savegame can define the text history that should prepend it.
   * 
   * When a savegame is opened, [textHistory] is printed so that player is
   * reminded about the context.
   * 
   * Normally, [textHistory] is the rendered contents of the current
   * page.
   */
  String textHistory;
  
  /// The [uid] uniquely defines this savegame for later retrieval.
  String uid;
  
  /// Timestamp of the moment when this savegame was created, in milliseconds
  /// since Epoch.
  int timestamp;
  
  EgbSavegame(String this.currentPageName, Map _vars, this.pageMapState) {
    vars = _filterSaveable(_vars);
    timestamp = new Date.now().millisecondsSinceEpoch;
    uid = this.hashCode.toRadixString(16);  // TODO: is this unique enough?
  }
  
  EgbSavegame.fromJson(String json) {
    Map<String,dynamic> saveMap = parse(json);
    if (!saveMap.containsKey("currentPageName") 
        || !saveMap.containsKey("vars")) {
      throw "Invalid JSON for EgbSavegame. Doesn't contain required fields "
            "'currentPageName' or 'vars'. JSON='$json'.";
    }
    currentPageName = saveMap["currentPageName"];
    timestamp = saveMap["timestamp"];
    pageMapState = saveMap["pageMapState"];
    vars = saveMap["vars"];
    if (saveMap.containsKey("previousText")) {
      textHistory = saveMap["previousText"];
    }
  }
  
  factory EgbSavegame.fromMessage(EgbMessage message) {
    return new EgbSavegame.fromJson(message.strContent);
  }
  
  EgbMessage toMessage(int type) {
    if (type != EgbMessage.MSG_SAVE_GAME && type != EgbMessage.MSG_LOAD_GAME) {
      throw "Cannot create EgbMessage of type $type. Can only be MSG_SAVE_GAME "
            "(${EgbMessage.MSG_SAVE_GAME}) or MSG_LOAD_GAME "
            "(${EgbMessage.MSG_LOAD_GAME}).";
    }
    EgbMessage message = new EgbMessage(type);
    message.strContent = toJson();
    return message;
  }
  
  String toJson() {
    Map<String,dynamic> saveMap = new Map<String,dynamic>();
    saveMap["currentPageName"] = currentPageName;
    saveMap["pageMapState"] = pageMapState;
    saveMap["vars"] = vars;
    saveMap["timestamp"] = timestamp;
    if (textHistory != null) {
      saveMap["previousText"] = textHistory;
    }
    return stringify(saveMap);
  }
  
  String toString() => toJson();
  
  /**
   * Returns true if variable is Saveable or a primitive type.
   */
  static bool _isSaveable(dynamic variable) {
    return (variable == null || variable is String || variable is int 
        || variable is num || variable is bool || variable is List 
        || variable is Map);
  }
  
  /**
   * Takes a map and recursively copies it to a Map that only points to
   * Saveable types. 
   * 
   * Right now, this only works for JSONifiable (i.e. primitive) types: num, 
   * int, String, Map and List.
   */
  static dynamic _filterSaveable(dynamic input) {
    if (input == null || input is String || input is int || input is num 
        || input is bool) {
      return input;
    } else if (input is List) {
      List outputList = new List();
      for (int i = 0; i < (input as List).length; i++) {
        if (_isSaveable((input as List)[i])) {
          outputList.add(_filterSaveable((input as List)[i]));
        }
      }
      return outputList;
    } else if (input is Map) {
      Map outputMap = new Map();
      (input as Map).forEach((dynamic key, dynamic value) {
        if (_isSaveable((input as Map)[key])) {
          outputMap[key] = _filterSaveable(value);
        }
      });
      return outputMap;
    } else {
      throw "Function _filterSaveables called with a non-saveable " 
            "argument type.";
    }
  }
}
