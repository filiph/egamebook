library egb_runner;

import 'dart:isolate';

import 'egb_utils.dart';

import 'egb_interface.dart';
import 'egb_library.dart';

import 'egb_storage.dart';
import 'egb_savegame.dart';
import 'egb_player_profile.dart';

/**
 * EgbRunner manages communication between the Scripter and the Interface.
 * It is interface-agnostic.
 */
class EgbRunner {
  ReceivePort _receivePort;
  SendPort _scripterPort;
  EgbInterface _interface;
  
  EgbPlayerProfile _playerProfile;
  
  bool started = false;
  bool ended = false;
  
  EgbRunner(this._receivePort, this._scripterPort, 
      this._interface, this._playerProfile) {
    
    // get bookUid from scripter
    // load latest saved state for the bookUid from playerProfile
    
    _receivePort.receive(receiveFromScripter);
  }
  
  void run() {
    _interface.setup();
    _scripterPort.send(
        new EgbMessage.Start().toJson(),
        _receivePort.toSendPort()
    );
    started = true;
  }
  
  void stop() {
    _playerProfile.close();
    _interface.close();
    _scripterPort.send(new EgbMessage.Quit().toJson());
    _receivePort.close();
    ended = true;
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
      stop();
    } else {
      if (message.type == EgbMessage.MSG_SAVE_GAME) {
        EgbSavegame savegame = new EgbSavegame.fromMessage(message);
        // TODO: _playerProfile.save(savegame) // optionaly prepend text
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