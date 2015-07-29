library egb_presenter_proxy;

import "dart:async";
import 'dart:isolate';

import '../persistence/savegame.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';
import '../shared/user_interaction.dart';
import '../shared/message.dart';
import '../../scripter.dart';

/**
 * The methods of EgbPresenter that are callable by EgbScripter (mostly through
 * a [EgbPresenterProxy], but conceivably also directly).
 */
abstract class EgbPresenterViewedFromScripter {
  void awardPoints(PointsAward award);
  void endBook();
  void reportError(String title, String text);
  void log(String text);
  void setStats(List<UIStat> stats);
  Future<int> showChoices(EgbChoiceList choices);
  Future<bool> showText(String text);
  void updateStats(StatUpdateCollection updates);
  void savePlayerChronology(Set<String> playerChronology);
  void save(EgbSavegame savegame);
  Stream<CurrentState> showForm(FormBase form);
  void updateForm(FormConfiguration values);
}

/**
 * A proxy/view of the Presenter that has methods callable from Scripter.
 * It has direct access to the Scripter object.
 */
abstract class EgbPresenterProxy extends EgbPresenterViewedFromScripter {
  /// Instance of Scripter.
  EgbScripter scripter;
  /// Sets scripter to [scripter].
  void setScripter(EgbScripter scripter) {
    this.scripter = scripter;
  }
}

/**
 * The proxy that deals with Presenter in another Isolate.
 */
class EgbIsolatePresenterProxy extends EgbPresenterProxy {

  /// Port of the calling isolate.
  SendPort mainIsolatePort;

  /// Own port for receiving messages from main Isolate.
  ReceivePort port;

  /// Creates new EgbIsolatePresenterProxy with provided [mainIsolatePort] used
  /// for sending messages.
  EgbIsolatePresenterProxy(this.mainIsolatePort) {
    assert(mainIsolatePort != null);
    port = new ReceivePort();
    port.listen(_onMessageFromMainIsolate);
    mainIsolatePort.send(port.sendPort);
  }

  /// Called when message from main Isolate is received.
  /// The received message has to be instance of [Map]. The [EgbMessage]
  /// is then created from a given Map and according to its type the
  /// functionality is run.
  void _onMessageFromMainIsolate(Object _message) {
    // Convert primitive Map to message.
    assert(_message is Map);
    Map<String, Object> messageMap = _message as Map<String, Object>;
    EgbMessage message = new EgbMessage.fromMap(messageMap);

    // Handle low-level messages, and either answer them directly, or forward
    // their substance to Scripter.
    switch (message.type) {
      case EgbMessage.QUIT:
        // Just close the book, no need to answer.
        if (_choiceSelectedCompleter != null) {
          _choiceSelectedCompleter.completeError(
              new EgbAsyncOperationOverridenException("Book Quit before choice "
                  "was selected."));
          _choiceSelectedCompleter = null;
        }
        port.close();
        return;
      case EgbMessage.REQUEST_BOOK_UID:
        // Identify this egamebook by UID.
        // TODO: get UID from meta information
        DEBUG_SCR("GET_BOOK_UID received.");
        _send(new EgbMessage.bookUid("DEFAULT_BOOK_UID"));
        return;
      case EgbMessage.CHOICE_SELECTED:
        int choiceHash = message.intContent;
        assert(_choiceSelectedCompleter != null);
        _choiceSelectedCompleter.complete(choiceHash);
        _choiceSelectedCompleter = null;
        return;
      case EgbMessage.FORM_INPUT:
        DEBUG_SCR("New form state from player received.");
        CurrentState state = new CurrentState.fromMap(message.mapContent);
        _formInputStreamController.add(state);
        return;
      case EgbMessage.START:
        DEBUG_SCR("Starting book from scratch.");
        if (_choiceSelectedCompleter != null) {
          _choiceSelectedCompleter.completeError(
              new EgbAsyncOperationOverridenException("Book Restart before "
                  "choice was selected."));
          _choiceSelectedCompleter = null;
        }
        try {
          scripter.restart();
        } catch (e, stacktrace) {
          _send(new EgbMessage.scripterError(
              "An error occured when initializing: $e.\n" "$stacktrace"));
          throw e;
        }
        _send(new EgbMessage.statsInit(Stat.createStatList()));
        _send(new PointsAward(0, 0).toMessage());
        return;
      case EgbMessage.LOAD_GAME:
        DEBUG_SCR("Loading a saved game.");
        if (_choiceSelectedCompleter != null) {
          _choiceSelectedCompleter.completeError(
              new EgbAsyncOperationOverridenException("Book Load before choice "
                  "was selected."));
          _choiceSelectedCompleter = null;
        }
        try {
          var savegame = new EgbSavegame.fromMessage(message);
          var playerChronology = message.listContent;
          if (playerChronology != null) {
            scripter.loadFromSaveGame(savegame, playerChronology);
          } else {
            scripter.loadFromSaveGame(savegame);
          }
        } on IncompatibleSavegameException catch (e, stacktrace) {
          // don't
          _send(new EgbMessage.scripterError(
              "Load failed due to incompatibility: $e.\n" "$stacktrace"));
          scripter.restart();
        } catch (e, stacktrace) {
          // XXX: get rid of this once all possible errors are encapsulated in SavegameExpceptions?
          _send(new EgbMessage.scripterError(
              "Load failed for unknown reason: $e.\n" "$stacktrace"));
          scripter.restart();
        }
        try {
          _send(new EgbMessage.statsInit(Stat.createStatList()));
        } catch (e, stacktrace) {
          _send(new EgbMessage.scripterError(
              "Sending Stats failed for unknown reason: $e.\n" "$stacktrace"));
          throw e;
        }
        int pointSum = scripter.getPoints().sum;
        _send(new PointsAward(0, pointSum).toMessage());
        return;
      case EgbMessage.PROCEED:
        // Solve backlog. TODO: do better or drop completely
        if (_messageBacklog != null) {
          _send(_messageBacklog);
          _messageBacklog = null;
          return;
        }
        scripter.walk();
        return;
      default:
        _send(new EgbMessage.scripterError("Wrong message type received by "
            "Scripter - ${message.type}."));
//        throw new EgbMessageException("Wrong message type received by "
//            "Scripter - ${message.type}.");
    }
  }

  /// A cache of text messages so we can send them all together instead of
  /// one by one.
  final List<EgbMessage> _textMessageCache = new List<EgbMessage>();
  /// Message backglog. TODO solve.
  EgbMessage _messageBacklog; // TODO: get rid of this (no ZipMessage!)

  /**
   * Utility function [_send] sends [EgbMessage] message as a [Map] representation
   * through the [mainIsolatePort] to the Scripter.
   */
  void _send(EgbMessage message) {
    mainIsolatePort.send(message.toMap());
//    if (message.isAsync) {
//      //DEBUG_SCR("Sending nonText async message (${message.type})");
//      mainIsolatePort.send(message.toMap());
//      return;
//    }
//    if (message.type == EgbMessage.TEXT_RESULT) {
//      // Put text result into the _textMessageCache.
//      if (message.strContent != "") _textMessageCache.add(message);
//      mainIsolatePort.send(new EgbMessage.NoResult().toMap());
//      // TODO: this is here just because we need to keep the loop going – get rid of it
//    } else if (_textMessageCache.isEmpty) {
//      DEBUG_SCR("Sending nonText message ($message)");
//      mainIsolatePort.send(message.toMap());
//    } else {
//      // When we have something in the _textMessageCache and we are about to
//      // send something new, we first zip the text messages into one huge
//      // message, wait for it to be shown (through port.call()), and only then
//      // send the original message.
//      var stringBuffer = new StringBuffer();
//      while (_textMessageCache.isNotEmpty) {
//        if (stringBuffer.isNotEmpty) stringBuffer.write("\n\n");
//        stringBuffer.write(_textMessageCache.removeAt(0).strContent);
//      }
//      var zipMessage = new EgbMessage.TextResult(stringBuffer.toString());
//      DEBUG_SCR("Sending a zip message ($zipMessage)");
//      mainIsolatePort.send(zipMessage.toMap());
//      DEBUG_SCR("Adding message ($message) to the backlog.");
//      _messageBacklog = message;
//    }
  }


  /// Sends [PointsAward] as a message to Scripter.
  @override
  void awardPoints(PointsAward award) {
    _send(award.toMessage());
  }

  /// Sends end of book message to Scripter.
  @override
  void endBook() {
    _send(new EgbMessage.endOfBook());
  }

  /// Sends scripter error message with provided [title] and [text] to Scripter.
  @override
  void reportError(String title, String text) {
    _send(new EgbMessage.scripterError("$title: $text"));
    // TODO: Should close port!?
  }

  /// Sends scripter log message with provided [text] to Scripter.
  @override
  void log(String text) {
    _send(new EgbMessage.scripterLog(text));
  }

  /// Sends save player chronology message from provided [playerChronology]
  /// to Scripter.
  @override
  void savePlayerChronology(Set<String> playerChronology) {
    _send(new EgbMessage.savePlayerChronology(playerChronology));
  }

  /// Sends set stats message from provided List of UIStat [stats] to Scripter.
  @override
  void setStats(List<UIStat> stats) {
    _send(new EgbMessage.statsInit(Stat.createStatList()));
  }

  /// Completer for showing of choices.
  Completer<int> _choiceSelectedCompleter;

  /// Sends show choices message from provided EgbChoiceList [choices]
  /// to Scripter.
  @override
  Future<int> showChoices(EgbChoiceList choices) {
    // Make sure we aren't still waiting for another choice to be picked.
    if (_choiceSelectedCompleter != null) {
      _choiceSelectedCompleter.completeError(
          new EgbAsyncOperationOverridenException("Showing new "
          "choice before previous one was selected."));
      _choiceSelectedCompleter = null;
    }
    _choiceSelectedCompleter = new Completer<int>();
    _send(choices.toMessage());
    return _choiceSelectedCompleter.future;
  }

  /// Sends text result message from provided [text] to Scripter.
  @override
  Future<bool> showText(String text) {
    _send(new EgbMessage.textResult(text));
    return new Future.value(); // TODO: wait for presenter to return
    //       EgbMessage.TEXT_SHOWN
  }

  /// Sends update stats message from provided StatUpdateCollection [updates]
  /// to Scripter.
  @override
  Future<bool> updateStats(StatUpdateCollection updates) {
    _send(new EgbMessage.statUpdates(updates));
    return new Future.value(true);
  }

  /// Sends save game message from provided EgbSavegame [savegame]
  /// to Scripter.
  @override
  void save(EgbSavegame savegame) {
    _send(savegame.toMessage(EgbMessage.SAVE_GAME));
  }

  /// Sends debug [message].
  void DEBUG_SCR(String message) {
    //print(message);
    log(message);
  }

  /// Form input stream controller.
  StreamController<CurrentState> _formInputStreamController;

  /// Sends show form message from provided FormBase [form] to Scripter.
  @override
  Stream<CurrentState> showForm(FormBase form) {
    DEBUG_SCR("Scripter asks to show form.");
    _formInputStreamController = new StreamController<CurrentState>();
    _send(new EgbMessage.showForm(form));
    return _formInputStreamController.stream;
  }

  /// Sends update form message from provided FormConfiguration [values]
  /// to Scripter.
  @override
  void updateForm(FormConfiguration values) {
    DEBUG_SCR("Scripter sends newly updated values.");
    _send(new EgbMessage.updateForm(values));
  }
}

/// EgbAsyncOperationOverridenException wraps around exceptions that are
/// generated when some event happens before expected operation.
///
/// For example Book Quit before choice was selected.
class EgbAsyncOperationOverridenException implements Exception {
  /// Message describing the exception.
  final String message;
  /// Creates new EgbAsyncOperationOverridenException with error [message].
  const EgbAsyncOperationOverridenException(this.message);
  /// Returns text describing EgbAsyncOperationOverridenException with its
  /// [message].
  String toString() => "EgbAsyncOperationOverridenException: $message.";
}
