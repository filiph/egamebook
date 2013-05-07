library egb_message;

import 'dart:json';

class EgbMessage {
  int type;

  // different types of contents
  List listContent;
  String strContent;
  int intContent;

  // Messages from Scripter to Runner.
  static const int SEND_BOOK_UID = 10;
  static const int NO_RESULT = 20;
  static const int TEXT_RESULT = 30;
  static const int SHOW_CHOICES = 40;
  static const int SAVE_GAME = 50;
  static const int SAVE_PLAYER_CHRONOLOGY = 60;
  static const int POINTS_AWARD = 70;
  static const int END_OF_BOOK = 80;
  static const int STAT_SET = 90;
  static const int STAT_UPDATE = 100;

  // Messages from Runner to Scripter.
  static const int GET_BOOK_UID = 1000;
  static const int START = 1010;
  static const int LOAD_GAME = 1020;
  static const int CONTINUE = 1040;
  static const int OPTION_SELECTED = 1050;
  static const int QUIT = 1060;
  
  /*
   * The correct handshake looks like this:
   * 
   * Runner                 Scripter
   * GET_BOOK_UID
   *                        SEND_BOOK_UID
   * LOAD_GAME/START (incl. player chronology)
   *                        NO_RESULT/TEST_RESULT/SHOW_CHOICES
   * 
   */

  EgbMessage(this.type) {
  }

  EgbMessage.Quit() : type = QUIT {}

  EgbMessage.Continue() : type = CONTINUE {}

  EgbMessage.TextResult(String str) : type = TEXT_RESULT {
    strContent = str.trim();
  }

  EgbMessage.Start() : type = START {}
  
  EgbMessage.BookUid(this.strContent) : type = SEND_BOOK_UID;
  
  EgbMessage.GetBookUid() : type = GET_BOOK_UID;

  EgbMessage.EndOfBook() : type = END_OF_BOOK {}

  EgbMessage.OptionSelected(int hash) : type = OPTION_SELECTED {
    intContent = hash;
  }

  EgbMessage.NoResult() : type = NO_RESULT {}
  
  EgbMessage.SaveGame(String json) : type = SAVE_GAME {
    strContent = json;
  }
  
  EgbMessage.LoadGame(String json) : type = LOAD_GAME {
    strContent = json;
  }
  
  EgbMessage.PointsAward(int points, String justification) 
      : type = POINTS_AWARD {
    if (points == null) throw new ArgumentError("points cannot be null.");
    intContent = points;
    strContent = justification;
  }
  
  /// Set a statistic without notifying the player.
  EgbMessage.StatSet(String statName, int value) : type = STAT_SET {
    if (statName == null) {
      throw new ArgumentError("Stat name cannot be null.");
    }
    strContent = statName;
    intContent = value;
  }

  /// Set a statistic and notify the player.
  EgbMessage.StatUpdate(String statName, int value) : type = STAT_UPDATE {
    if (statName == null) {
      throw new ArgumentError("Stat name cannot be null.");
    }
    strContent = statName;
    intContent = value;
  }
  
  EgbMessage.SavePlayerChronology(Set<String> playerChronology) 
      : type = SAVE_PLAYER_CHRONOLOGY {
    listContent = playerChronology.toList();
  }
  
  /**
    Ctor that creates the Message object from a JSON string.
    */
  EgbMessage.fromJson(String json) {
    Map<String,dynamic> data = parse(json);
    type = data["type"];

    if (data.containsKey("strContent")) {
      strContent = data["strContent"];
    }
    if (data.containsKey("listContent")) {
      listContent = data["listContent"];
    }
    if (data.containsKey("intContent")) {
      intContent = data["intContent"];
    }
  }

  /**
    Outputs message to JSON string. Useful when sending via Port to Isolate.
    */
  String toJson() {
    Map<String,dynamic> data = new Map<String,dynamic>();

    data["type"] = type;

    if (strContent != null) {
      data["strContent"] = strContent;
    }
    if (listContent != null) {
      data["listContent"] = listContent;
    }
    if (intContent != null) {
      data["intContent"] = intContent;
    }

    return stringify(data);
  }
}