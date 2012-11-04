library egb_runner;

import 'dart:isolate';
import 'egb_interface.dart';
import 'egb_library.dart';

void DEBUG_CMD(String str) {
  // print("CMD: $str");
}

/**
 * EgbRunner manages communication between the Scripter and the Interface.
 * It is interface-agnostic.
 */
class EgbRunner {
  ReceivePort _receivePort;
  SendPort _scripterPort;
  EgbInterface _interface;
  
  EgbRunner(this._receivePort, this._scripterPort, this._interface) {
    _receivePort.receive(receiveFromScripter);
  }
  
  void run() {
    _interface.setup();
    _scripterPort.send(
        new Message.Start().toJson(),
        _receivePort.toSendPort()
    );
  }
  
  /**
   * Main loop function. Receives a message from scripter, and either
   * responds immediately, or asks for input via [interface].
   */
  void receiveFromScripter(String messageJson, SendPort replyTo) {
    Message message = new Message.fromJson(messageJson);
    DEBUG_CMD("We have a message from Scripter: ${message.type}.");
    if (message.type == Message.MSG_END_OF_BOOK) {
      DEBUG_CMD("We are at the end of book. Closing.");
      _interface.close();
      _scripterPort.send(new Message.Quit().toJson());
      _receivePort.close();
    } else {
      if (message.type == Message.MSG_TEXT_RESULT) {
        DEBUG_CMD("Showing text from scripter.");
        _interface.showText(message.strContent);
        _scripterPort.send(new Message.Continue().toJson(), 
            _receivePort.toSendPort());
      } else if (message.type == Message.MSG_NO_RESULT) {
        DEBUG_CMD("No visible result. Continuing.");
        _scripterPort.send(new Message.Continue().toJson(), 
            _receivePort.toSendPort());
      } else if (message.type == Message.MSG_SHOW_CHOICES) {
        DEBUG_CMD("We have choices to show!");
        
        if (message.listContent[0] != null) {
          // prepend text
          _interface.showText(message.listContent[0]);
        }
        
        ChoiceList choices = new ChoiceList.fromMessage(message);
        
        if (choices.length == 1 && choices[0].string.trim() == "") {
          // An auto-choice (without a string) means we should pick it silently
          _scripterPort.send(
              new Message.OptionSelected(choices[0].hash).toJson(),
              _receivePort.toSendPort()
          );
        } else {
          // let player choose
          _interface.showChoices(choices)
          .then((int hash) {
            _scripterPort.send(
                new Message.OptionSelected(hash).toJson(),
                _receivePort.toSendPort()
            );
          });
        }
      }
    }
  }
}