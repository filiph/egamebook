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

  EgbMessage(this.type) {
  }

  EgbMessage.Quit() : type = MSG_QUIT {}

  EgbMessage.Continue() : type = MSG_CONTINUE {}

  EgbMessage.TextResult(String str) : type = MSG_TEXT_RESULT {
    strContent = str.trim();
  }

  EgbMessage.Start() : type = MSG_START {}

  EgbMessage.EndOfBook() : type = MSG_END_OF_BOOK {}

  EgbMessage.OptionSelected(int hash) : type = MSG_OPTION_SELECTED {
    intContent = hash;
  }

  EgbMessage.NoResult() : type = MSG_NO_RESULT {}

  /**
    Ctor that creates the Message object from a JSON string.
    XXX: this isn't needed in VM, but frog can't handle Object messages (yet?)
    */
  EgbMessage.fromJson(String json) {
    Map<String,dynamic> data = JSON.parse(json);
    type = data["type"];

    if (type == MSG_OPTION_SELECTED) {
      intContent = data["intContent"];
    } else if (type == MSG_SHOW_CHOICES) {
      listContent = data["listContent"];
    } else if (type == MSG_TEXT_RESULT) {
      strContent = data["strContent"];
    }
  }

  /**
    Outputs message to JSON string. Useful when sending via Port to Isolate.
    */
  String toJson() {
    Map<String,dynamic> data = new Map<String,dynamic>();

    data["type"] = type;

    if (type == MSG_OPTION_SELECTED) {
      data["intContent"] = intContent;
    } else if (type == MSG_SHOW_CHOICES) {
      data["listContent"] = listContent;
    } else if (type == MSG_TEXT_RESULT) {
      data["strContent"] = strContent;
    }

    return JSON.stringify(data);
  }
}