library egb_scripter_proxy;

import "dart:async";
import 'dart:isolate';

import '../interface/interface.dart';
import '../persistence/savegame.dart';
import '../shared/message.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';
import 'package:egamebook/src/shared/user_interaction.dart';

/**
 * The methods of Scripter that are callable by Interface.
 */
abstract class EgbScripterViewedFromInterface {
  /**
   * Initializes the Scripter. In case of a Scripter in its own Isolate, this
   * creates the Isolate and waits for the UID. The returned Future completes
   * only after that.
   */
  Future init();
  String get uid;
  void restart();
  void load(EgbSavegame savegame, Set<String> playerChronology);
  void quit();
}

/**
 * A proxy/view of the Scripter that has methods callable from Interface.
 * It has direct access to the Interface object.
 */
abstract class EgbScripterProxy extends EgbScripterViewedFromInterface {
  EgbInterface interface;
  void setInterface(EgbInterface interface) {
    this.interface = interface;
    if (uid != null) {
      interface.playerProfile.currentEgamebookUid = uid;
    } else {
      throw "Setting interface before we have uid (before initialization).";
    }
  }
}

/**
 * The proxy that deals with Scripter in another Isolate.
 */
class EgbIsolateScripterProxy extends EgbScripterProxy {
  Uri _isolateUri;
  ReceivePort _receivePort;
  SendPort _scripterPort;
  String _uid;
  
  @override
  String get uid => _uid;
  
  Completer _initCompleter;
  
  EgbIsolateScripterProxy(this._isolateUri);

  @override
  Future init() {
    _initCompleter = new Completer();
    _receivePort = new ReceivePort();
    Isolate.spawnUri(_isolateUri, [], _receivePort.sendPort);
    _receivePort.listen(_onMessageFromScripterIsolate);
    return _initCompleter.future;
  }
  
  void _onMessageFromScripterIsolate(Object _message) {
    if (_message is SendPort) {
      _scripterPort = _message;
      _send(new EgbMessage.RequestBookUid());
      return;
    }
    
    assert(_message is Map);
    Map<String,Object> messageMap = _message as Map<String,Object>;
    EgbMessage message = new EgbMessage.fromMap(messageMap);
    
    if (message.type != EgbMessage.SCRIPTER_LOG) {
      INT_DEBUG("Received: $message");
    }
    
    switch (message.type) {
      case EgbMessage.END_OF_BOOK:
        interface.endBook();
//        _streamController.add("END");  // send the info to anyone listening
        return;
      case EgbMessage.SEND_BOOK_UID:
        INT_DEBUG("Book UID received ('${message.strContent}')");
        _uid = message.strContent;
        _initCompleter.complete();
//        _startNewSession(message);
        return;
      case EgbMessage.SAVE_GAME:
        EgbSavegame savegame = new EgbSavegame.fromMessage(message);
        savegame.textHistory = interface.getTextHistory();
        interface.playerProfile.save(savegame);
        interface.addSavegameBookmark(savegame);
        return;
      case EgbMessage.SAVE_PLAYER_CHRONOLOGY:
        interface.playerProfile
            .savePlayerChronology(message.listContent.toSet());
        return;
      case EgbMessage.TEXT_RESULT:
        interface.showText(message.strContent)
        .then((_) {
          _send(new EgbMessage.Continue());
        });
        return;
      case EgbMessage.NO_RESULT:
        // No visible result from Scripter. Continuing.
        _send(new EgbMessage.Continue());
        return;
      case EgbMessage.POINTS_AWARD:
        interface.awardPoints(new PointsAward.fromMessage(message))
        .then((_) {
          _send(new EgbMessage.Continue());
        });
        return;
      case EgbMessage.SET_STATS:
        interface.setStats(UIStat.statsListFromMessage(message));
        return;
      case EgbMessage.UPDATE_STATS:
        print("RUN: Received updated stats.");
        interface.updateStats(message.mapContent);
        return;
      case EgbMessage.SHOW_CHOICES:
        interface.showChoices(new EgbChoiceList.fromMessage(message))
        .then((int hash) {
          if (hash != null) {
            _send(new EgbMessage.ChoiceSelected(hash));
          } else {
            // User wants to quit (hash == null).
            quit();
          }
        });
        return;
      case EgbMessage.SCRIPTER_ERROR:
        INT_DEBUG("SCRIPTER ERROR: ${message.strContent}");
        interface.reportError("Scripter Error", message.strContent);
        return;
      case EgbMessage.SCRIPTER_LOG:
        INT_DEBUG("Scripter: ${message.strContent}");
        return;
      default:
        throw "Message $message not expected by Runner.";
    }
  }

  /**
   * Utility function that sends message to the scripter.
   */
  void _send(EgbMessage message) {
    if (_scripterPort == null) throw new StateError("Cannot send message "
                                             "when _scripterPort is null.");
    _scripterPort.send(message.toMap());
  }
  
  @override
  void load(EgbSavegame savegame, Set<String> playerChronology) {
    EgbMessage loadMessage = savegame.toMessage(EgbMessage.LOAD_GAME);
    loadMessage.listContent = playerChronology.toList(growable: false);
    _send(loadMessage);
  }

  @override
  void quit() {
    if (_scripterPort != null) {
      _send(new EgbMessage.Quit());
    }
    _receivePort.close();
  }

  @override
  void restart() {
    _send(new EgbMessage.Start());
  }
}

void INT_DEBUG(String message) {
  print("INT: $message");
}