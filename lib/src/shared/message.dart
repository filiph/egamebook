library egb_message;

import 'dart:convert' show JSON;
import 'package:egamebook/src/shared/form.dart';
import 'package:egamebook/src/shared/stat.dart';

/// Class Message wraps messages used for communication between Presenter
/// and Scripter parts.
class Message {
  /// Type of the message.
  final int type;

  /// List type of content.
  List listContent;

  /// String type of content.
  String strContent;

  /// Int type of content.
  int intContent;

  /// Map type of content.
  Map<String, Object> mapContent;

  // Messages from Scripter to Runner.
  /// Message type send book Uid.
  static const int SEND_BOOK_UID = 10;

  /// Message type no result.
  static const int NO_RESULT = 20;

  /// Message type text result.
  static const int TEXT_RESULT = 30;

  /// Message type show choices.
  static const int SHOW_CHOICES = 40;

  /// Message type save game.
  static const int SAVE_GAME = 50;

  /// Message type save player chronology.
  static const int SAVE_PLAYER_CHRONOLOGY = 60;

  /// Message type points award.
  static const int POINTS_AWARD = 70;

  /// Message type end of book.
  static const int END_OF_BOOK = 80;

  /// Message type set stats.
  static const int SET_STATS = 90;

  /// Message type update stats.
  static const int UPDATE_STATS = 100;

  /// Message type show form.
  static const int SHOW_FORM = 110;

  /// Message type update form.
  static const int UPDATE_FORM = 120;

  /// Message type scripter error.
  static const int SCRIPTER_ERROR = 666;

  /// Message type scripter log.
  static const int SCRIPTER_LOG = 667;

  // Messages from Runner to Scripter.
  /// Message type request book Uid.
  static const int REQUEST_BOOK_UID = 1000;

  /// Message type start.
  static const int START = 1010;

  /// Message type load game.
  static const int LOAD_GAME = 1020;

  /// Message type proceed.
  static const int PROCEED = 1040;

  /// Message type choice selected.
  static const int CHOICE_SELECTED = 1050;

  /// Message type form input.
  static const int FORM_INPUT = 1060;

  /// Message type quit.
  static const int QUIT = 1070;

  /// Returns type as a String.
  String get typeString {
    switch (type) {
      case SEND_BOOK_UID:
        return "SEND_BOOK_UID";
      case NO_RESULT:
        return "NO_RESULT";
      case TEXT_RESULT:
        return "TEXT_RESULT";
      case SHOW_CHOICES:
        return "SHOW_CHOICES";
      case SAVE_GAME:
        return "SAVE_GAME";
      case SAVE_PLAYER_CHRONOLOGY:
        return "SAVE_PLAYER_CHRONOLOGY";
      case POINTS_AWARD:
        return "POINTS_AWARD";
      case END_OF_BOOK:
        return "END_OF_BOOK";
      case SET_STATS:
        return "SET_STATS";
      case UPDATE_STATS:
        return "UPDATE_STATS";
      case SHOW_FORM:
        return "SHOW_FORM";
      case UPDATE_FORM:
        return "UPDATE_FORM";
      case SCRIPTER_ERROR:
        return "SCRIPTER_ERROR";
      case SCRIPTER_LOG:
        return "SCRIPTER_LOG";
      case REQUEST_BOOK_UID:
        return "REQUEST_BOOK_UID";
      case START:
        return "START";
      case LOAD_GAME:
        return "LOAD_GAME";
      case PROCEED:
        return "PROCEED";
      case CHOICE_SELECTED:
        return "CHOICE_SELECTED";
      case FORM_INPUT:
        return "FORM_INPUT";
      case QUIT:
        return "QUIT";
      default:
        return "Unknown type=$type";
    }
  }

  /// Returns String representation of Message with its String as a type
  /// [typeString] and if [isAsync] is [:true:].
  String toString() => "Message $typeString${isAsync ? ' (async)' : ''}";

  /// Returns true for message types that are async, ie. sender doesn't wait
  /// for the receiver to do something.
  ///
  /// Async message types are type [SAVE_GAME], [SAVE_PLAYER_CHRONOLOGY],
  /// [SET_STATS], [UPDATE_STATS], [SCRIPTER_ERROR] and [SCRIPTER_LOG].
  bool get isAsync =>
      (type == SAVE_GAME) ||
      (type == SAVE_PLAYER_CHRONOLOGY) ||
      (type == SET_STATS) ||
      (type == UPDATE_STATS) ||
      (type == SCRIPTER_ERROR) ||
      (type == SCRIPTER_LOG);

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

  /// Creates new Message with [type] and optional if it [needsAnswer].
  Message(this.type, {bool needsAnswer: true});

  /// Creates new Message of type [QUIT].
  /// It is used during the [IsolateScripterProxy]'s [:quit():].
  Message.quit() : type = QUIT;

  /// Creates new Message of type [PROCEED].
  Message.proceed() : type = PROCEED;

  /// Creates new Message of type [TEXT_RESULT] with String
  /// content [str].
  /// It is used during the [IsolatePresenterProxy]'s [:showText():].
  Message.textResult(String str) : type = TEXT_RESULT {
    strContent = str;
  }

  /// Creates new Message of type [START].
  /// It is used during the [IsolatePresenterProxy]'s [:restart():].
  Message.start() : type = START;

  /// Creates new Message of type [SEND_BOOK_UID]
  /// with String content [strContent].
  Message.bookUid(this.strContent) : type = SEND_BOOK_UID;

  /// Creates new Message of type [REQUEST_BOOK_UID].
  Message.requestBookUid() : type = REQUEST_BOOK_UID;

  /// Creates new Message of type [END_OF_BOOK].
  /// It is used during the [IsolatePresenterProxy]'s [:endBook():].
  Message.endOfBook() : type = END_OF_BOOK;

  // Message containing ChoiceList is created in ChoiceList.toMessage().

  /// Creates new Message of type [CHOICE_SELECTED] with provided [hash]
  /// used as [intContent].
  Message.choiceSelected(int hash) : type = CHOICE_SELECTED {
    intContent = hash;
  }

  /// Creates new Message of type [UPDATE_STATS] with provided
  /// StatUpdateCollection [updates] used as a [mapContent].
  /// It is used during the [IsolatePresenterProxy]'s [:updateStats():].
  Message.statUpdates(StatUpdateCollection updates) : type = UPDATE_STATS {
    mapContent = updates.toMap();
  }

  /// Creates new Message of type [SET_STATS] with provided [list] used as
  /// a [listContent].
  /// It is also used during the [IsolatePresenterProxy]'s [:setStats():].
  Message.statsInit(List<Map<String, Object>> list) : type = SET_STATS {
    listContent = list;
  }

  /// Creates new Message of type [NO_RESULT].
  Message.noResult() : type = NO_RESULT;

  /// Creates new Message of type [SAVE_GAME] with provided [json] used
  /// as [strContent].
  Message.saveGame(String json) : type = SAVE_GAME {
    strContent = json;
  }

  /// Creates new Message of type [LOAD_GAME] with provided [json] used
  /// as [strContent].
  Message.loadGame(String json) : type = LOAD_GAME {
    strContent = json;
  }

  // PointsAward messages are made and deconstructed in points_award.dart.

  // Stats messages are made and deconstructed in stat.dart.

  /// Creates new Message of type [SAVE_PLAYER_CHRONOLOGY] with provided
  /// [playerChronology] used as [listContent].
  /// It is used during the [IsolatePresenterProxy]'s [:savePlayerChronology():].
  Message.savePlayerChronology(Set<String> playerChronology)
      : type = SAVE_PLAYER_CHRONOLOGY {
    listContent = playerChronology.toList();
  }

  /// Creates new Message of type [SHOW_FORM] with provided [form]
  /// used as [mapContent].
  /// It is used during the [IsolatePresenterProxy]'s [:showForm():].
  Message.showForm(Form form) : type = SHOW_FORM {
    mapContent = form.toMap();
  }

  /// Creates new Message of type [UPDATE_FORM] with provided
  /// [formConfiguration] used as [mapContent].
  /// It is used during the [IsolatePresenterProxy]'s [:updateForm():].
  Message.updateForm(FormConfiguration formConfiguration) : type = UPDATE_FORM {
    mapContent = formConfiguration.toMap();
  }

  /// Creates new Message of type [FORM_INPUT] with provided
  /// [state] used as [mapContent].
  Message.formInput(CurrentState state) : type = FORM_INPUT {
    mapContent = state.toMap();
  }

  /// Creates new Message of type [SCRIPTER_ERROR] with provided
  /// [message] used as [strContent].
  /// This message is used when some error appears. and is also used during
  /// the [IsolatePresenterProxy]'s [:reportError():].
  Message.scripterError(String message) : type = SCRIPTER_ERROR {
    strContent = message;
  }

  /// Creates new Message of type [SCRIPTER_LOG] with provided
  /// [message] used as [strContent].
  /// It is used during the [IsolatePresenterProxy]'s [:log():].
  Message.scripterLog(String message) : type = SCRIPTER_LOG {
    strContent = message;
  }

  /// Creates new Message from provided [json] String.
  Message.fromJson(String json) : this.fromMap(JSON.decode(json));

  /// Creates new Message from provided [map].
  /// It fills all the parts of [Message] - [type], [strContent],
  /// [listContent], [intContent] and [mapContent] if provided.
  Message.fromMap(Map<String, Object> map) : type = map["type"] {
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

  /// Outputs message to JSON string. Useful when sending via Port to Isolate.
  String toJson() {
    return JSON.encode(toMap());
  }

  /// Returns current message as a Map filled with all necessary attributes as
  /// a [type], [strContent], [listContent], [intContent] and [mapContent]
  /// if provided.
  Map<String, Object> toMap() {
    Map<String, Object> map = new Map<String, Object>();

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

/// Class MessageException wraps exception for Message.
class MessageException implements Exception {
  /// Message describing the exception.
  final String message;

  /// Creates new MessageException with error [message].
  const MessageException(this.message);

  /// Returns text describing MessageException with its [message].
  String toString() => "MessageException: $message";
}
