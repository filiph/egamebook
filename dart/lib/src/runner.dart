library egb_runner;

import 'dart:async';
import 'dart:isolate';

import 'interface/interface.dart';
import 'persistence/savegame.dart';
import 'persistence/player_profile.dart';
import 'shared/user_interaction.dart';
import 'shared/message.dart';
import 'shared/points_award.dart';
import 'shared/stat.dart';

/**
 * EgbRunner manages communication between the Book and the Interface.
 * It is interface-agnostic.
 */
class EgbRunner {
  ReceivePort _receivePort;
  SendPort _scripterPort;
  EgbInterface _interface;
  
  EgbPlayerProfile _playerProfile;
  
  bool started = false;
  bool ended = false;
  
  StreamController<String> _streamController;
  Stream<String> get stream => _streamController.stream;
  Stream<String> get endOfBookReached => 
      stream.where((value) => value == "END");
  
  EgbRunner(this._receivePort, this._scripterPort, 
      this._interface, this._playerProfile) {
    print("RUN: Runner started.");
    _streamController = new StreamController();
    
    // Handling player intents (actions) that are 'out of order' - i.e. scripter
    // is not asking for them at the moment.
    _interface.stream.listen((playerIntent) {
      switch (playerIntent.type) {
        case (PlayerIntent.RESTART):
          print("RUN: Restarting book.");
          _send(new EgbMessage.Start());
          started = true;
          break;
        case (PlayerIntent.QUIT):
          stop();
          break;
        case (PlayerIntent.LOAD):
          // load saved state for the bookUid from playerProfile
          // TODO: dry with below ([_startNewSession])
          _playerProfile.load((playerIntent as LoadIntent).uid)
          .then((EgbSavegame savegame) {
            if (savegame == null) {
              // no savegames for this egamebook
              _send(new EgbMessage.Start());
            } else {
              _interface.showText(savegame.textHistory);
              _send(savegame.toMessage(EgbMessage.LOAD_GAME));
            }
          });
          started = true;
          break;
      }
    });
    
    _receivePort.listen(receiveFromScripter);
  }
  
  void run() {
    print("RUN: Runner.run() called.");
    _interface.setup();
    if (_scripterPort != null) {
      _send(new EgbMessage.GetBookUid());  // TODO: send with .call(), immediately process the book UID
    }
    readyToRun = true;
  }
  bool readyToRun = false;
  
  void stop() {
    _playerProfile.close();
    _interface.close();
    if (_scripterPort != null) {  // For when Runner is stopped too soon.
      _send(new EgbMessage.Quit());
    }
    _receivePort.close();
  }
  
  /**
   * Utilify function that sends message to the scripter.
   */
  void _send(EgbMessage message) {
    if (_scripterPort == null) throw new StateError("Cannot send message "
                                             "when _scripterPort is null.");
    print("RUN: Sending message (${message.type})");
    _scripterPort.send(message.toJson());
  }
  
  /**
   * Main loop function. Receives a message from scripter, and either
   * responds immediately, or asks for input via [_interface], then responds.
   */
  void receiveFromScripter(Object _message) {
    print(_message);
    if (_message is SendPort) {
      _scripterPort = _message;
      if (readyToRun) _send(new EgbMessage.GetBookUid());
      return;
    }
    String messageJson = _message as String;
    EgbMessage message = new EgbMessage.fromJson(messageJson);
    
    switch (message.type) {
      case EgbMessage.END_OF_BOOK:
        ended = true;  // TODO: not needed, Runner is not ended, Scripter is
        _interface.endBook();
        _streamController.add("END");  // send the info to anyone listening
        return;
      case EgbMessage.SEND_BOOK_UID:
        print("RUN: Book UID received ('${message.strContent}')");
        _startNewSession(message);
        return;
      case EgbMessage.SAVE_GAME:
        EgbSavegame savegame = new EgbSavegame.fromMessage(message);
        savegame.textHistory = _interface.getTextHistory();
        _playerProfile.save(savegame);
        _interface.addSavegameBookmark(savegame);
        return;
      case EgbMessage.SAVE_PLAYER_CHRONOLOGY:
        _playerProfile.savePlayerChronology(message.listContent);
        return;
      case EgbMessage.TEXT_RESULT:
        _interface.showText(message.strContent)
        .then((_) {
          // Since this is a text result waiting for a Continue message on
          // a special port (because EgbScripter._send() uses port.call()),
          // we need to do the sending explicitly, not through _send().
          _scripterPort.send(new EgbMessage.Continue().toJson());
        });
        return;
      case EgbMessage.NO_RESULT:
        // No visible result from Scripter. Continuing.
        _send(new EgbMessage.Continue());
        return;
      case EgbMessage.POINTS_AWARD:
        _interface.awardPoints(new PointsAward.fromMessage(message))
        .then((_) {
          _send(new EgbMessage.Continue());
        });
        return;
      case EgbMessage.SET_STATS:
        _interface.setStats(Stat.statsListFromMessage(message));
        return;
      case EgbMessage.UPDATE_STATS:
        print("RUN: Received updated stats.");
        _interface.updateStats(message.mapContent);
        return;
      case EgbMessage.SHOW_CHOICES:
        _showChoices(message);
        return;
    }
  }

  /**
   * Shows choices, waits for the interface and player to pick one of them,
   * then sends the result back to Scripter.
   */
  void _showChoices(EgbMessage message) {
    if (message.listContent[0] != null) {
      // Show question text if available.
      _interface.showText(message.listContent[0]);
    }
    
    EgbChoiceList choices = new EgbChoiceList.fromMessage(message);
    
    if (choices.length == 1 && choices[0].string.trim() == "") {
      // An auto-choice (without a string) means we should pick it silently.
      _send(new EgbMessage.ChoiceSelected(choices[0].hash));
    } else {
      // Let player choose.
      _interface.showChoices(choices)
      .then((int hash) {
        if (hash != null) {
          _send(new EgbMessage.ChoiceSelected(hash));
        } else {
          // User wants to quit (hash == null).
          stop();
        }
      });
    }
  }
  
  /**
   * Runner receives gamebook UID from Scripter, typically just after opening
   * the session with this particular book. If [_playerProfile] has any saves
   * for this particular book, Runner will automatically load the most recent.
   * If not, Runner will just start the book from start.
   */
  EgbMessage _startNewSession(EgbMessage message) {
    // Get bookUid from Scripter.
    _playerProfile.currentEgamebookUid = message.strContent;
    // Load latest saved state for the bookUid from playerProfile.
    _playerProfile.loadMostRecent()
    .then((EgbSavegame savegame) {
      if (savegame == null) {
        // No savegames for this egamebook.
        print("RUN: No savegames for this egamebook. Starting anew.");
        _send(new EgbMessage.Start());
      } else {
        _playerProfile.loadPlayerChronology()
        .then((List<String> playerChronology) {
          print("RUN: Saved state found. Loading.");
          _interface.showText(savegame.textHistory);
          // Create LOAD_GAME message with scripter state in strContent (json).
          var loadgameMsg = savegame.toMessage(EgbMessage.LOAD_GAME);
          // Add playerChronology as listContent.
          loadgameMsg.listContent = playerChronology;
          _send(loadgameMsg);
        });
      }
    });
    started = true;
  }
  
}