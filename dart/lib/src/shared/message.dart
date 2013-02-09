library egb_message;

import 'dart:json';

class EgbMessage {
  int type;

  // different types of contents
  List listContent;
  String strContent;
  int intContent;

  // Messages from Scripter to Runner.
  static const int SEND_BOOK_UID = 1;
  static const int NO_RESULT = 2;
  static const int TEXT_RESULT = 3;
  static const int SHOW_CHOICES = 4;
  static const int SAVE_GAME = 5;
  static const int POINTS_AWARD = 6;
  static const int END_OF_BOOK = 7;

  // Messages from Runner to Scripter.
  static const int GET_BOOK_UID = 64;
  static const int START = 65;
  static const int LOAD_GAME = 66;
  static const int CONTINUE = 67;
  static const int OPTION_SELECTED = 68;
  static const int QUIT = 69;

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

  /**
    Ctor that creates the Message object from a JSON string.
    XXX: this isn't needed in VM, but frog can't handle Object messages (yet?)
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