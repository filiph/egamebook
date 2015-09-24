library egb_presenter_proxy;

import "dart:async";
import 'dart:isolate';

import '../persistence/savegame.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';
import '../shared/user_interaction.dart';
import '../shared/message.dart';
import '../../scripter.dart';
import 'package:egamebook/src/book/scripter_proxy.dart';
import 'package:egamebook/src/presenter/form_proxy.dart';

/**
 * The methods of Presenter that are callable by Scripter (mostly through
 * a [PresenterProxy], but conceivably also directly).
 */
abstract class PresenterViewedFromScripter {
  Future awardPoints(PointsAward award);
  void endBook();
  void reportError(String title, String text);
  void log(String text);
  void setStats(List<UIStat> stats);
  Future<int> showChoices(ChoiceList choices);
  Future<bool> showText(String text);
  void updateStats(StatUpdateCollection updates);
  void savePlayerChronology(Set<String> playerChronology);
  void save(Savegame savegame);
  Stream<CurrentState> showForm(FormProxy form);
  void updateForm(FormConfiguration values);

  /// Instance of Scripter.
  Scripter scripter;
  /// Sets scripter to [scripter].
  void setScripter(Scripter scripter);
}

/**
 * A proxy/view of the Presenter that has methods callable from Scripter.
 * It has direct access to the Scripter object.
 */
abstract class PresenterProxy extends PresenterViewedFromScripter {

}

/**
 * The proxy that deals with Presenter in another Isolate.
 */
class IsolatePresenterProxy extends PresenterProxy {
  /// Port of the calling Isolate.
  SendPort mainIsolatePort;

  /// Own port for receiving messages from main Isolate.
  ReceivePort port;

  /// Creates new IsolatePresenterProxy with provided [mainIsolatePort] used
  /// for sending messages.
  IsolatePresenterProxy(this.mainIsolatePort) {
    assert(mainIsolatePort != null);
    port = new ReceivePort();
    port.listen(_onMessageFromMainIsolate);
    mainIsolatePort.send(port.sendPort);
  }

  /// Sets scripter to [scripterProxy].
  Scripter scripter;
  void setScripter(Scripter scripter) {
    this.scripter = scripter;
    scripter.setPresenter(this);
  }

  /// Called when message from main Isolate is received.
  /// The received message has to be instance of [Map]. The [Message]
  /// is then created from a given Map and according to its type the
  /// functionality is run.
  void _onMessageFromMainIsolate(Object _message) {
    // Convert primitive Map to message.
    assert(_message is Map);
    Map<String, Object> messageMap = _message as Map<String, Object>;
    Message message = new Message.fromMap(messageMap);

    // Handle low-level messages, and either answer them directly, or forward
    // their substance to Scripter.
    switch (message.type) {
      case Message.QUIT:
        // Just close the book, no need to answer.
        if (_choiceSelectedCompleter != null) {
          _choiceSelectedCompleter.completeError(
              new AsyncOperationOverridenException("Book Quit before choice "
                  "was selected."));
          _choiceSelectedCompleter = null;
        }
        port.close();
        return;
      case Message.REQUEST_BOOK_UID:
        // Identify this egamebook by UID.
        // TODO: get UID from meta information
        DEBUG_SCR("GET_BOOK_UID received.");
        _send(new Message.bookUid(scripter.uid));
        return;
      case Message.CHOICE_SELECTED:
        int choiceHash = message.intContent;
        assert(_choiceSelectedCompleter != null);
        _choiceSelectedCompleter.complete(choiceHash);
        _choiceSelectedCompleter = null;
        return;
      case Message.FORM_INPUT:
        DEBUG_SCR("New form state from player received.");
        CurrentState state = new CurrentState.fromMap(message.mapContent);
        _formInputStreamController.add(state);
        return;
      case Message.START:
        DEBUG_SCR("Starting book from scratch.");
        if (_choiceSelectedCompleter != null) {
          _choiceSelectedCompleter.completeError(
              new AsyncOperationOverridenException("Book Restart before "
                  "choice was selected."));
          _choiceSelectedCompleter = null;
        }
        try {
          scripter.restart();
        } catch (e, stacktrace) {
          _send(new Message.scripterError(
              "An error occured when initializing: $e.\n" "$stacktrace"));
          throw e;
        }
        _send(new Message.statsInit(Stat.createStatList()));
        _send(new PointsAward(0, 0).toMessage());
        return;
      case Message.LOAD_GAME:
        DEBUG_SCR("Loading a saved game.");
        if (_choiceSelectedCompleter != null) {
          _choiceSelectedCompleter.completeError(
              new AsyncOperationOverridenException("Book Load before choice "
                  "was selected."));
          _choiceSelectedCompleter = null;
        }
        try {
          var savegame = new Savegame.fromMessage(message);
          var playerChronology = message.listContent.toSet();
          if (playerChronology != null) {
            scripter.load(savegame, playerChronology);
          } else {
            scripter.load(savegame);
          }
        } on IncompatibleSavegameException catch (e, stacktrace) {
          // don't
          _send(new Message.scripterError(
              "Load failed due to incompatibility: $e.\n" "$stacktrace"));
          scripter.restart();
        } catch (e, stacktrace) {
          // XXX: get rid of this once all possible errors are encapsulated in SavegameExpceptions?
          _send(new Message.scripterError(
              "Load failed for unknown reason: $e.\n" "$stacktrace"));
          scripter.restart();
        }
        try {
          _send(new Message.statsInit(Stat.createStatList()));
        } catch (e, stacktrace) {
          _send(new Message.scripterError(
              "Sending Stats failed for unknown reason: $e.\n" "$stacktrace"));
          throw e;
        }
        int pointSum = scripter.getPoints().sum;
        _send(new PointsAward(0, pointSum).toMessage());
        return;
      case Message.PROCEED:
        // Solve backlog. TODO: do better or drop completely
        if (_messageBacklog != null) {
          _send(_messageBacklog);
          _messageBacklog = null;
          return;
        }
        scripter.walk();
        return;
      default:
        _send(new Message.scripterError("Wrong message type received by "
            "Scripter - ${message.type}."));
//        throw new MessageException("Wrong message type received by "
//            "Scripter - ${message.type}.");
    }
  }

  /// A cache of text messages so we can send them all together instead of
  /// one by one.
  final List<Message> _textMessageCache = new List<Message>();
  /// Message backglog. TODO solve.
  Message _messageBacklog; // TODO: get rid of this (no ZipMessage!)

  /**
   * Utility function [_send] sends [Message] message as a [Map] representation
   * through the [mainIsolatePort] to the Scripter proxy.
   */
  void _send(Message message) {
    mainIsolatePort.send(message.toMap());
//    if (message.isAsync) {
//      //DEBUG_SCR("Sending nonText async message (${message.type})");
//      mainIsolatePort.send(message.toMap());
//      return;
//    }
//    if (message.type == Message.TEXT_RESULT) {
//      // Put text result into the _textMessageCache.
//      if (message.strContent != "") _textMessageCache.add(message);
//      mainIsolatePort.send(new Message.noResult().toMap());
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
//      var zipMessage = new Message.textResult(stringBuffer.toString());
//      DEBUG_SCR("Sending a zip message ($zipMessage)");
//      mainIsolatePort.send(zipMessage.toMap());
//      DEBUG_SCR("Adding message ($message) to the backlog.");
//      _messageBacklog = message;
//    }
  }


  /// Sends [PointsAward] as a message to Scripter proxy.
  @override
  Future awardPoints(PointsAward award) {
    _send(award.toMessage());
    return new Future.value();
  }

  /// Sends end of book message to Scripter proxy.
  @override
  void endBook() {
    _send(new Message.endOfBook());
  }

  /// Sends scripter error message with provided [title] and [text]
  /// to Scripter proxy.
  @override
  void reportError(String title, String text) {
    _send(new Message.scripterError("$title: $text"));
    // TODO: Should close port!?
  }

  /// Sends scripter log message with provided [text] to Scripter.
  @override
  void log(String text) {
    _send(new Message.scripterLog(text));
  }

  /// Sends save player chronology message from provided [playerChronology]
  /// to Scripter proxy.
  @override
  void savePlayerChronology(Set<String> playerChronology) {
    _send(new Message.savePlayerChronology(playerChronology));
  }

  /// Sends set stats message from provided List of UIStat [stats]
  /// to Scripter proxy.
  @override
  void setStats(List<UIStat> stats) {
    _send(new Message.statsInit(Stat.createStatList()));
  }

  /// Completer for showing of choices.
  Completer<int> _choiceSelectedCompleter;

  /// Sends show choices message from provided ChoiceList [choices]
  /// to Scripter proxy.
  @override
  Future<int> showChoices(ChoiceList choices) {
    // Make sure we aren't still waiting for another choice to be picked.
    if (_choiceSelectedCompleter != null) {
      _choiceSelectedCompleter.completeError(
          new AsyncOperationOverridenException("Showing new "
          "choice before previous one was selected."));
      _choiceSelectedCompleter = null;
    }
    _choiceSelectedCompleter = new Completer<int>();
    _send(choices.toMessage());
    return _choiceSelectedCompleter.future;
  }

  /// Sends text result message from provided [text] to Scripter proxy.
  @override
  Future<bool> showText(String text) {
    _send(new Message.textResult(text));
    return new Future.value(); // TODO: wait for presenter to return
    //       Message.TEXT_SHOWN
  }

  /// Sends update stats message from provided StatUpdateCollection [updates]
  /// to Scripter proxy.
  @override
  Future<bool> updateStats(StatUpdateCollection updates) {
    _send(new Message.statUpdates(updates));
    return new Future.value(true);
  }

  /// Sends save game message from provided Savegame [savegame]
  /// to Scripter proxy.
  @override
  void save(Savegame savegame) {
    _send(savegame.toMessage(Message.SAVE_GAME));
  }

  /// Sends debug [message].
  void DEBUG_SCR(String message) {
    //print(message);
    log(message);
  }

  /// Form input stream controller.
  StreamController<CurrentState> _formInputStreamController;

  /// Sends show form message from provided FormBase [form] to Scripter proxy.
  @override
  Stream<CurrentState> showForm(FormBase form) {
    DEBUG_SCR("Scripter asks to show form.");
    _formInputStreamController = new StreamController<CurrentState>();
    _send(new Message.showForm(form));
    return _formInputStreamController.stream;
  }

  /// Sends update form message from provided FormConfiguration [values]
  /// to Scripter.
  @override
  void updateForm(FormConfiguration values) {
    DEBUG_SCR("Scripter sends newly updated values.");
    _send(new Message.updateForm(values));
  }
}

/// AsyncOperationOverridenException wraps around exceptions that are
/// generated when some event happens before expected operation.
///
/// For example Book Quit before choice was selected.
class AsyncOperationOverridenException implements Exception {
  /// Message describing the exception.
  final String message;
  /// Creates new AsyncOperationOverridenException with error [message].
  const AsyncOperationOverridenException(this.message);
  /// Returns text describing AsyncOperationOverridenException with its
  /// [message].
  String toString() => "AsyncOperationOverridenException: $message.";
}
