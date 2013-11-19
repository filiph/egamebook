library egb_message;

import 'dart:convert' show JSON;

class EgbMessage {
  int type;

  // different types of contents
  List listContent;
  String strContent;
  int intContent;
  Map<String,Object> mapContent;
  
  // Messages from Scripter to Runner.
  static const int SEND_BOOK_UID = 10;
  static const int NO_RESULT = 20;
  static const int TEXT_RESULT = 30;
  static const int SHOW_CHOICES = 40;
  static const int SAVE_GAME = 50;
  static const int SAVE_PLAYER_CHRONOLOGY = 60;
  static const int POINTS_AWARD = 70;
  static const int END_OF_BOOK = 80;
  static const int SET_STATS = 90;
  static const int UPDATE_STATS = 100;

  // Messages from Runner to Scripter.
  static const int GET_BOOK_UID = 1000;
  static const int START = 1010;
  static const int LOAD_GAME = 1020;
  static const int CONTINUE = 1040;
  static const int CHOICE_SELECTED = 1050;
  static const int QUIT = 1060;
  
  /// Returns true for message types that are async, ie. sender doesn't wait
  /// for the receiver to do something.
  bool get isAsync => (type == SAVE_GAME) || (type == SAVE_PLAYER_CHRONOLOGY) ||
      (type == SET_STATS) || (type == UPDATE_STATS);
  
  /*
   * The correct handshake looks like this:
   * 
   * Runner                 Scripter
   * GET_BOOK_UID
   *                        SEND_BOOK_UID
   * LOAD_GAME/START (incl. player chronology)
   *                        NO_RESULT/TEXT_RESULT/SHOW_CHOICES
   * 
   */

  EgbMessage(this.type, {bool needsAnswer: true});

  EgbMessage.Quit() : type = QUIT;

  EgbMessage.Continue() : type = CONTINUE;

  EgbMessage.TextResult(String str) : type = TEXT_RESULT {
    strContent = str;
  }

  EgbMessage.Start() : type = START;
  
  EgbMessage.BookUid(this.strContent) 
      : type = SEND_BOOK_UID;
  
  EgbMessage.GetBookUid() : type = GET_BOOK_UID;

  EgbMessage.EndOfBook() : type = END_OF_BOOK;

  // EgbMessage containing ChoiceList is created in EgbChoiceList.toMessage(). 
  
  EgbMessage.ChoiceSelected(int hash) 
      : type = CHOICE_SELECTED {
    intContent = hash;
  }

  EgbMessage.NoResult() : type = NO_RESULT;
  
  EgbMessage.SaveGame(String json) : type = SAVE_GAME {
    strContent = json;
  }
  
  EgbMessage.LoadGame(String json) : type = LOAD_GAME {
    strContent = json;
  }
  
  // PointsAward messages are made and deconstructed in points_award.dart.
  
  // Stats messages are made and deconstructed in stat.dart.
  
  EgbMessage.SavePlayerChronology(Set<String> playerChronology) 
      : type = SAVE_PLAYER_CHRONOLOGY {
    listContent = playerChronology.toList();
  }
  
  /**
    Ctor that creates the Message object from a JSON string.
    */
  EgbMessage.fromJson(String json) : this.fromMap(JSON.decode(json));
  
  EgbMessage.fromMap(Map<String,Object> map) {
    type = map["type"];

    if (map.containsKey("strContent")) {
      strContent = map["strContent"];
    }
    if (map.containsKey("listContent")) {
      listContent = map["listContent"];
    }
    if (map.containsKey("intContent")) {
      intContent = map["intContent"];
    }
    if (map.containsKey("mapContent")) {
      mapContent = map["mapContent"];
    }
  }

  /**
    Outputs message to JSON string. Useful when sending via Port to Isolate.
    */
  String toJson() {
    return JSON.encode(toMap());
  }
  
  Map<String,Object> toMap() {
    Map<String,Object> map = new Map<String,Object>();

    map["type"] = type;

    if (strContent != null) {
      map["strContent"] = strContent;
    }
    if (listContent != null) {
      map["listContent"] = listContent;
    }
    if (intContent != null) {
      map["intContent"] = intContent;
    }
    if (mapContent != null) {
      map["mapContent"] = mapContent;
    }
    
    return map;
  }
}