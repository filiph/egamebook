library egb_runner;

import 'dart:async';
import 'dart:isolate';

import 'shared/utils.dart';

import 'interface/interface.dart';
import 'persistence/storage.dart';
import 'persistence/savegame.dart';
import 'persistence/player_profile.dart';
import 'shared/user_interaction.dart';
import 'shared/message.dart';

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
  Stream<String> get endOfBookReached => stream.where((value) => value == "END");
  
  EgbRunner(this._receivePort, this._scripterPort, 
      this._interface, this._playerProfile) {
    _streamController = new StreamController();
    
    _interface.stream.listen((playerIntent) {
      switch (playerIntent.type) {
        case (PlayerIntent.RESTART):
          _scripterPort.send(new EgbMessage.Start().toJson(), 
              _receivePort.toSendPort());
          started = true;
          break;
        case (PlayerIntent.QUIT):
          stop();
          break;
        case (PlayerIntent.LOAD):
          // load latest saved state for the bookUid from playerProfile
          // TODO: dry with below
          _playerProfile.load((playerIntent as LoadIntent).uid)
          .then((EgbSavegame savegame) {
            if (savegame == null) {
              // no savegames for this egamebook
              _scripterPort.send(new EgbMessage.Start().toJson(), 
                  _receivePort.toSendPort());
            } else {
              _scripterPort.send(savegame.toMessage(EgbMessage.MSG_LOAD_GAME).toJson(), 
                  _receivePort.toSendPort());
            }
          });
          started = true;
          break;
      }
    });
    
    _receivePort.receive(receiveFromScripter);
  }
  
  void run() {
    _interface.setup();
    _scripterPort.send(
        new EgbMessage.GetBookUid().toJson(),
        _receivePort.toSendPort()
    );
  }
  
  void stop() {
    _playerProfile.close();
    _interface.close();
    _scripterPort.send(new EgbMessage.Quit().toJson());
    _receivePort.close();
  }
  
  /**
   * Main loop function. Receives a message from scripter, and either
   * responds immediately, or asks for input via [interface].
   */
  void receiveFromScripter(String messageJson, SendPort replyTo) {
    EgbMessage message = new EgbMessage.fromJson(messageJson);
    DEBUG_CMD("We have a message from Scripter: ${message.type}.");
    if (message.type == EgbMessage.MSG_END_OF_BOOK) {
      DEBUG_CMD("We are at the end of book. Closing.");
      _streamController.sink.add("END");
      ended = true;
      // stop();
    } else if (message.type == EgbMessage.MSG_SEND_BOOK_UID) {
      // get bookUid from scripter
      _playerProfile.currentEgamebookUid = message.strContent;
      // load latest saved state for the bookUid from playerProfile
      _playerProfile.loadMostRecent()
      .then((EgbSavegame savegame) {
        if (savegame == null) {
          // no savegames for this egamebook
          _scripterPort.send(new EgbMessage.Start().toJson(), 
              _receivePort.toSendPort());
        } else {
          _scripterPort.send(savegame.toMessage(EgbMessage.MSG_LOAD_GAME).toJson(), 
              _receivePort.toSendPort());
        }
      });
      started = true;
    } else {
      if (message.type == EgbMessage.MSG_SAVE_GAME) {
        EgbSavegame savegame = new EgbSavegame.fromMessage(message);
        _playerProfile.save(savegame);
        _interface.addSavegameBookmark(savegame);
        _scripterPort.send(new EgbMessage.Continue().toJson(), 
            _receivePort.toSendPort());
      } else if (message.type == EgbMessage.MSG_TEXT_RESULT) {
        DEBUG_CMD("Showing text from scripter.");
        _interface.showText(message.strContent);
        _scripterPort.send(new EgbMessage.Continue().toJson(), 
            _receivePort.toSendPort());
      } else if (message.type == EgbMessage.MSG_NO_RESULT) {
        DEBUG_CMD("No visible result. Continuing.");
        _scripterPort.send(new EgbMessage.Continue().toJson(), 
            _receivePort.toSendPort());
      } else if (message.type == EgbMessage.MSG_POINTS_AWARD) {
        var text;
        if (message.strContent != null) {
          text = "+${message.intContent} points for ${message.strContent}";
        } else {
          text = "+${message.intContent} points";
        }
        _interface.showText(text);
        _scripterPort.send(new EgbMessage.Continue().toJson(), 
            _receivePort.toSendPort());
      } else if (message.type == EgbMessage.MSG_SHOW_CHOICES) {
        DEBUG_CMD("We have choices to show!");
        
        if (message.listContent[0] != null) {
          // prepend text
          _interface.showText(message.listContent[0]);
        }
        
        EgbChoiceList choices = new EgbChoiceList.fromMessage(message);
        
        if (choices.length == 1 && choices[0].string.trim() == "") {
          // An auto-choice (without a string) means we should pick it silently
          _scripterPort.send(
              new EgbMessage.OptionSelected(choices[0].hash).toJson(),
              _receivePort.toSendPort()
          );
        } else {
          // let player choose
          _interface.showChoices(choices)
          .then((int hash) {
            if (hash != null) {
              _scripterPort.send(
                  new EgbMessage.OptionSelected(hash).toJson(),
                  _receivePort.toSendPort()
              );
            } else {
              // user wants to quit
              stop();
            }
          });
        }
      }
    }
  }
}