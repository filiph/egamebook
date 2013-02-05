library egb_message;

import 'dart:json';

class EgbMessage {
  int type;

  // different types of contents
  List listContent;
  String strContent;
  int intContent;

  static final int MSG_QUIT = 0;
  static final int MSG_CONTINUE = 1;  // 0b0001
  static final int MSG_RESULT = 2;  // 0b0010
  static final int MSG_TEXT_RESULT = 4;  // 0b0100
  static final int MSG_INPUT_NEEDED = 8;
  static final int MSG_START = 16;
  static final int MSG_END_OF_BOOK = 32;
  static final int MSG_SHOW_CHOICES = 64;
  static final int MSG_OPTION_SELECTED = 128;
  static final int MSG_NO_RESULT = 256;
  static final int MSG_SAVE_GAME = 512;
  static final int MSG_LOAD_GAME = 1024;
  static final int MSG_GET_BOOK_UID = 2048;
  static final int MSG_SEND_BOOK_UID = 4096;
  static final int MSG_POINTS_AWARD = 8192;

  EgbMessage(this.type) {
  }

  EgbMessage.Quit() : type = MSG_QUIT {}

  EgbMessage.Continue() : type = MSG_CONTINUE {}

  EgbMessage.TextResult(String str) : type = MSG_TEXT_RESULT {
    strContent = str.trim();
  }

  EgbMessage.Start() : type = MSG_START {}
  
  EgbMessage.BookUid(this.strContent) : type = MSG_SEND_BOOK_UID;
  
  EgbMessage.GetBookUid() : type = MSG_GET_BOOK_UID;

  EgbMessage.EndOfBook() : type = MSG_END_OF_BOOK {}

  EgbMessage.OptionSelected(int hash) : type = MSG_OPTION_SELECTED {
    intContent = hash;
  }

  EgbMessage.NoResult() : type = MSG_NO_RESULT {}
  
  EgbMessage.SaveGame(String json) : type = MSG_SAVE_GAME {
    strContent = json;
  }
  
  EgbMessage.LoadGame(String json) : type = MSG_LOAD_GAME {
    strContent = json;
  }
  
  EgbMessage.PointsAward(int points, String justification) 
      : type = MSG_POINTS_AWARD {
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