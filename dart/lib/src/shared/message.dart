library egb_message;

import 'dart:convert' show JSON;
import 'package:egamebook/src/shared/form.dart';

class EgbMessage {
  final int type;

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
  static const int SHOW_FORM = 110;
  static const int UPDATE_FORM = 120;
  static const int SCRIPTER_ERROR = 666;
  static const int SCRIPTER_LOG = 667;

  // Messages from Runner to Scripter.
  static const int REQUEST_BOOK_UID = 1000;
  static const int START = 1010;
  static const int LOAD_GAME = 1020;
  static const int CONTINUE = 1040;
  static const int CHOICE_SELECTED = 1050;
  static const int FORM_INPUT = 1060;
  static const int QUIT = 1070;
  
  String get typeString {
    switch (type) {
      case SEND_BOOK_UID: return "SEND_BOOK_UID";
      case NO_RESULT: return "NO_RESULT";
      case TEXT_RESULT: return "TEXT_RESULT";
      case SHOW_CHOICES: return "SHOW_CHOICES";
      case SAVE_GAME: return "SAVE_GAME";
      case SAVE_PLAYER_CHRONOLOGY: return "SAVE_PLAYER_CHRONOLOGY";
      case POINTS_AWARD: return "POINTS_AWARD";
      case END_OF_BOOK: return "END_OF_BOOK";
      case SET_STATS: return "SET_STATS";
      case UPDATE_STATS: return "UPDATE_STATS";
      case SHOW_FORM: return "SHOW_FORM";
      case UPDATE_FORM: return "UPDATE_FORM";
      case SCRIPTER_ERROR: return "SCRIPTER_ERROR";
      case SCRIPTER_LOG: return "SCRIPTER_LOG";
      case REQUEST_BOOK_UID: return "REQUEST_BOOK_UID";
      case START: return "START";
      case LOAD_GAME: return "LOAD_GAME";
      case CONTINUE: return "CONTINUE";
      case CHOICE_SELECTED: return "CHOICE_SELECTED";
      case FORM_INPUT: return "FORM_INPUT";
      case QUIT: return "QUIT";
      default: return "Unknown type=$type";
    }
  }
  
  toString() => "EgbMessage $typeString${isAsync ? ' (async)' : ''}";
  
  /// Returns true for message types that are async, ie. sender doesn't wait
  /// for the receiver to do something.
  bool get isAsync => (type == SAVE_GAME) || (type == SAVE_PLAYER_CHRONOLOGY) ||
      (type == SET_STATS) || (type == UPDATE_STATS) || 
      (type == SCRIPTER_ERROR) || (type == SCRIPTER_LOG);
  
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
  
  EgbMessage.RequestBookUid() : type = REQUEST_BOOK_UID;

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
  
  EgbMessage.ShowForm(Form form) : type = SHOW_FORM {
    mapContent = form.toMap();
  }
  
  EgbMessage.UpdateForm(FormConfiguration formConfiguration) 
      : type = UPDATE_FORM {
    mapContent = formConfiguration.toMap();
  }
  
  EgbMessage.FormInput(CurrentState state) : type = FORM_INPUT {
    mapContent = state.toMap();
  }
  
  EgbMessage.ScripterError(String message) : type = SCRIPTER_ERROR {
    strContent = message;
  }
  
  EgbMessage.ScripterLog(String message) : type = SCRIPTER_LOG {
    strContent = message;
  }
  
  /**
    Ctor that creates the Message object from a JSON string.
    */
  EgbMessage.fromJson(String json) : this.fromMap(JSON.decode(json));
  
  EgbMessage.fromMap(Map<String,Object> map) : type = map["type"] {
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

class EgbMessageException implements Exception {
  final String message;
  const EgbMessageException(this.message);
  String toString() => "EgbMessageException: $message";
}