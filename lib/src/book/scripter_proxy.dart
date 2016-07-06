library egb_scripter_proxy;

import "dart:async";
import 'dart:isolate';

import "package:logging/logging.dart";
import '../../presenter.dart';
import '../persistence/savegame.dart';
import '../shared/message.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:egamebook/src/presenter/form_proxy.dart';
import 'package:egamebook/src/shared/form.dart';
import 'package:egamebook/scripter.dart';

/**
 * The methods of Scripter that are callable by Presenter.
 */
abstract class ScripterViewedFromPresenter {
  /// Getter returns Uid.
  String get uid;

  /**
   * Initializes the Scripter. In case of a Scripter in its own Isolate, this
   * creates the Isolate and waits for the UID. The returned Future completes
   * only after that.
   */
  Future init();
  void restart();
  void load(Savegame savegame, [Set<String> playerChronology]);
  void quit();

  /// Instance of Presenter.
  Presenter presenter;

  /// Sets Presenter and also sets Presenter player profile's
  /// [:currentEgamebookUid:] to [uid] if is not [:null:].
  void setPresenter(PresenterViewedFromScripter presenter) {
    this.presenter = presenter;
  }
}

/**
 * A proxy/view of the Scripter that has methods callable from Presenter.
 * It has direct access to the Presenter object.
 */
abstract class ScripterProxy extends ScripterViewedFromPresenter {}

/**
 * The proxy that deals with Scripter in another Isolate.
 */
class IsolateScripterProxy extends ScripterProxy {
  /// Isolate URI.
  Uri _isolateUri;

  /// Own port for receiving messages from Isolate.
  ReceivePort _receivePort;

  /// Port of the calling Isolate.
  SendPort _scripterPort;

  /// Unique id.
  String _uid;

  /// Getter returns unique id.
  @override
  String get uid => _uid;

  /// Init completer.
  Completer _initCompleter;

  final Logger _log = new Logger('IsolateScripterProxy');

  /// Creates new IsolateScripterProxy with provided Isolate URI [_isolateUri].
  IsolateScripterProxy(this._isolateUri);

  @override
  Future init() {
    INT_DEBUG("Initializing the isolate at $_isolateUri");
    _initCompleter = new Completer();
    _receivePort = new ReceivePort();
    Isolate.spawnUri(_isolateUri, [], _receivePort.sendPort);
    _receivePort.listen(_onMessageFromScripterIsolate);
    return _initCompleter.future;
  }

  /// Called when message from Scripter Isolate is received.
  /// The received message has to be instance of [SendPort] or [Map].
  /// In case of Map the [Message] is then created from a given Map and
  /// according to its type the functionality is run.
  void _onMessageFromScripterIsolate(Object _message) {
    if (_message is SendPort) {
      INT_DEBUG("Received SendPort from Isolate");
      _scripterPort = _message;
      _send(new Message.requestBookUid());
      return;
    }

    assert(_message is Map);
    Map<String, Object> messageMap = _message as Map<String, Object>;
    Message message = new Message.fromMap(messageMap);

    if (message.type != Message.SCRIPTER_LOG) {
      INT_DEBUG("Received: $message");
    }

    switch (message.type) {
      case Message.END_OF_BOOK:
        presenter.endBook();
        return;
      case Message.SEND_BOOK_UID:
        INT_DEBUG("Book UID received ('${message.strContent}')");
        _uid = message.strContent;
        _initCompleter.complete();
        return;
      case Message.SAVE_GAME:
        Savegame savegame = new Savegame.fromMessage(message);
        savegame.textHistory = presenter.getTextHistory();
        presenter.save(savegame);
        return;
      case Message.SAVE_PLAYER_CHRONOLOGY:
        presenter.playerProfile
            .savePlayerChronology(message.listContent.toSet());
        return;
      case Message.TEXT_RESULT:
        presenter.showText(message.strContent).then((_) {
          // Do nothing.
        });
        return;
      case Message.NO_RESULT:
        // No visible result from Scripter. Proceeding.
        _send(new Message.proceed());
        return;
      case Message.POINTS_AWARD:
        presenter.awardPoints(new PointsAward.fromMessage(message)).then((_) {
          // Do nothing.
        });
        return;
      case Message.SET_STATS:
        presenter.setStats(
            UIStat.overwriteStatsListFromDataStructure(message.listContent));
        return;
      case Message.UPDATE_STATS:
        print("RUN: Received updated stats.");
        presenter
            .updateStats(new StatUpdateCollection.fromMap(message.mapContent));
        return;
      case Message.SHOW_CHOICES:
        INT_DEBUG("Showing choices.");
        presenter
            .showChoices(new ChoiceList.fromMessage(message))
            .then((int hash) {
          if (hash != null) {
            _send(new Message.choiceSelected(hash));
          } else {
            // User wants to quit (hash == null).
            quit();
          }
        });
        return;
      case Message.SHOW_FORM:
        INT_DEBUG("Showing form.");
        FormProxy formProxy = new FormProxy.fromMessage(message);
        presenter.showForm(formProxy).listen((CurrentState state) {
          INT_DEBUG("Form updated or submitted by player.");
          _send(new Message.formInput(state));
        });
        return;
      case Message.UPDATE_FORM:
        INT_DEBUG("Updating form.");
        FormConfiguration changedConfig =
            new FormConfiguration.fromMap(message.mapContent);
        presenter.updateForm(changedConfig);
        return;
      case Message.SCRIPTER_ERROR:
        INT_DEBUG("SCRIPTER ERROR: ${message.strContent}");
        presenter.reportError("Scripter Error", message.strContent);
        return;
      case Message.SCRIPTER_LOG:
        INT_DEBUG("Scripter: ${message.strContent}");
        return;
      default:
        throw "Message $message not expected by Runner.";
    }
  }

  /**
   * Utility function that sends message through the Scripter port.
   */
  void _send(Message message) {
    if (_scripterPort == null)
      throw new StateError("Cannot send message "
          "when _scripterPort is null.");
    _scripterPort.send(message.toMap());
  }

  /// Sends load game message from provided [savegame] to Presenter proxy.
  /// If [playerChronology] is present, it is also contained in the message.
  @override
  void load(Savegame savegame, [Set<String> playerChronology]) {
    Message loadMessage = savegame.toMessage(Message.LOAD_GAME);
    if (playerChronology != null) {
      loadMessage.listContent = playerChronology.toList(growable: false);
    } else {
      loadMessage.listContent = null; // No playerChronology needs to be sent.
    }
    _send(loadMessage);
  }

  /// Sends quit message to Presenter proxy and closes receive port.
  @override
  void quit() {
    if (_scripterPort != null) {
      _send(new Message.quit());
    }
    _receivePort.close();
  }

  /// Sends start message to Presenter proxy.
  @override
  void restart() {
    _send(new Message.start());
  }

  void INT_DEBUG(String msg) {
    _log.fine(msg);
  }
}
