library egb_interface_proxy;

import "dart:async";
import 'dart:isolate';

import '../persistence/savegame.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';
import '../shared/user_interaction.dart';
import '../shared/message.dart';
import '../book/scripter.dart';

/**
 * The methods of EgbInterface that are callable by EgbScripter.
 */
abstract class EgbInterfaceScripterView {
  void awardPoints(PointsAward award);

  void endBook();

  void reportError(String title, String text);

  void setStats(List<UIStat> stats);

  Future<int> showChoices(EgbChoiceList choices);

  Future<bool> showText(String text);

  void updateStats(Map<String, Object> mapContent);
  
  void savePlayerChronology(Set<String> playerChronology);
  
  void save(EgbSavegame savegame);
}

/**
 * A proxy/view of the Interface that has methods callable from Scripter.
 * It has direct access to the Scripter object.
 */
abstract class EgbInterfaceProxy extends EgbInterfaceScripterView {
  EgbScripter scripter;
  void setScripter(EgbScripter scripter) {
    this.scripter = scripter;
  }
}

class EgbIsolateInterfaceProxy extends EgbInterfaceProxy {

  /// Port of the calling isolate.
  SendPort mainIsolatePort;

  /// Own port for receiving messages from main Isolate.
  ReceivePort port;

  EgbIsolateInterfaceProxy(this.mainIsolatePort) {
    assert(mainIsolatePort != null);
    port = new ReceivePort();
    port.listen(_onMessageFromMainIsolate);
    mainIsolatePort.send(port.sendPort);
  }

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
        port.close();
        return;
      case EgbMessage.REQUEST_BOOK_UID:
        // Identify this egamebook by UID.
        // TODO: get UID from meta information
        DEBUG_SCR("GET_BOOK_UID received.");
        _send(new EgbMessage.BookUid("DEFAULT_BOOK_UID"));
        return;
      case EgbMessage.CHOICE_SELECTED:
        int choiceHash = message.intContent;
        assert(_choiceSelectedCompleter != null);
        _choiceSelectedCompleter.complete(choiceHash);        
        _choiceSelectedCompleter = null;
        scripter.handleChoiceSelected(choiceHash);  // TODO: do we need this?
        scripter.walk();
        return;
      case EgbMessage.START:
        DEBUG_SCR("Starting book from scratch.");
        try {
          scripter.restart();
        } catch (e, stacktrace) {
          _send(new EgbMessage.ScripterError(
              "An error occured when initializing: $e.\n" "$stacktrace"));
          throw e;
        }
        _send(Stat.toMessage());  // This works because Stat is a singleton.
                                  // TODO: more elegant (scripter should have
                                  //       a Stat getter?)
        _send(new PointsAward(0, 0).toMessage());
        return;
      case EgbMessage.LOAD_GAME:
        DEBUG_SCR("Loading a saved game.");
        try {
          var savegame = new EgbSavegame.fromMessage(message);
          var playerChronology = message.listContent;
          scripter.loadFromSaveGame(savegame, playerChronology);
        } on IncompatibleSavegameException catch (e, stacktrace) {
          // don't
          _send(new EgbMessage.ScripterError(
              "Load failed due to incompatibility: $e.\n" "$stacktrace"));
          scripter.restart();
        } catch (e, stacktrace) {
          // XXX: get rid of this once all possible errors are encapsulated in SavegameExpceptions?
          _send(new EgbMessage.ScripterError(
              "Load failed for unknown reason: $e.\n" "$stacktrace"));
          scripter.restart();
        }
        try {
          _send(Stat.toMessage());
        } catch (e, stacktrace) {
          _send(new EgbMessage.ScripterError(
              "Sending Stats failed for unknown reason: $e.\n" "$stacktrace"));
          throw e;
        }
        int pointSum = scripter.getPoints().sum;
        _send(new PointsAward(0, pointSum).toMessage());
        return;
      case EgbMessage.CONTINUE:
        // Solve backlog. TODO: do better or drop completely
        if (_messageBacklog != null) {
          _send(_messageBacklog);
          _messageBacklog = null;
          return;
        }
        scripter.walk();
        return;
      default:
        throw new EgbMessageException("Wrong message type received by "
            "Scripter - ${message.type}.");
    }
  }

  /// A cache of text messages so we can send them all together instead of
  /// one by one.
  final List<EgbMessage> _textMessageCache = new List<EgbMessage>();  // TODO: get rid of this (no ZipMessage!)
  EgbMessage _messageBacklog;  // TODO: get rid of this (no ZipMessage!)
  
  /**
   * Utilify function [_send] sends message through the [_runnerPort] to the
   * Runner. 
   */
  void _send(EgbMessage message) {
    if (message.isAsync) {
      //DEBUG_SCR("Sending nonText async message (${message.type})");
      mainIsolatePort.send(message.toMap());
      return;
    }
    if (message.type == EgbMessage.TEXT_RESULT) {
      // Put text result into the _textMessageCache.
      if (message.strContent != "") _textMessageCache.add(message);
      mainIsolatePort.send(new EgbMessage.NoResult().toMap());
          // TODO: this is here just because we need to keep the loop going – get rid of it
    } else if (_textMessageCache.isEmpty) {
      DEBUG_SCR("Sending nonText message ($message)");
      mainIsolatePort.send(message.toMap());
    } else {
      // When we have something in the _textMessageCache and we are about to
      // send something new, we first zip the text messages into one huge
      // message, wait for it to be shown (through port.call()), and only then
      // send the original message.
      var stringBuffer = new StringBuffer();
      while (_textMessageCache.isNotEmpty) {
        if (stringBuffer.isNotEmpty) stringBuffer.write("\n\n");
        stringBuffer.write(_textMessageCache.removeAt(0).strContent);
      }
      var zipMessage = new EgbMessage.TextResult(stringBuffer.toString());
      DEBUG_SCR("Sending a zip message ($zipMessage)");
      mainIsolatePort.send(zipMessage.toMap());
      DEBUG_SCR("Adding message ($message) to the backlog.");
      _messageBacklog = message;
    }
  }


  @override
  void awardPoints(PointsAward award) {
    _send(award.toMessage());
  }

  @override
  void endBook() {
    _send(new EgbMessage.EndOfBook());
  }

  @override
  void reportError(String title, String text) {
    _send(new EgbMessage.ScripterError("$title: $text"));
    // TODO: Should close port!?
  }

  @override
  void savePlayerChronology(Set<String> playerChronology) {
    // TODO: implement savePlayerChronology
  }

  @override
  void setStats(List<UIStat> stats) {
    // TODO: implement setStats
  }

  Completer<int> _choiceSelectedCompleter;
  
  @override
  Future<int> showChoices(EgbChoiceList choices) {
    // Make sure we aren't still waiting for another choice to be picked.
    assert(_choiceSelectedCompleter == null);
    _choiceSelectedCompleter = new Completer<int>();
    _send(choices.toMessage());
    return _choiceSelectedCompleter.future;
  }

  @override
  Future<bool> showText(String text) {
    _send(new EgbMessage.TextResult(text));
    return new Future.value();  // TODO: wait for interface to return
                                //       EgbMessage.TEXT_SHOWN
  }

  @override
  Future<bool> updateStats(Map<String, Object> mapContent) {
    // TODO: implement updateStats
  }

  @override
  void save(EgbSavegame savegame) {
    // TODO: implement save
  }
}

void DEBUG_SCR(String message) {
  print(message);
}
