#import('egb_library.dart');

// this will be rewritten with the actual file
#import('samples/unit-testing.markdown.dart');

#import('dart:io');
#import('dart:isolate');

void DEBUG_CMD(String str) {
//  print("CMD: $str");
}

class CmdlineInterface implements UserInterface {
  ReceivePort _receivePort;
  SendPort _scripterPort;

  /**
    Constructor.
    */
  CmdlineInterface() {
    DEBUG_CMD("Command line interface starting.");
    connect(receiveFromScripter).then((SendPort port) {
        DEBUG_CMD("Scripter is now ready! Sending message.");
        port.send(new Message.Start().toJson(), _receivePort.toSendPort());
    });

    cmdLine = new StringInputStream(stdin);
  }

  /**
    Connects to the Scripter isolate, attaches [receiveCallback] to the 
    _receivePort. Returns a future to SendPort.

    You can call e.g.
    [:connect(callback).then((port) {port.send(something, _receivePort)});:].
  */
  Future<SendPort> connect(Function receiveCallback) {
    Completer completer = new Completer();

    _receivePort = new ReceivePort();
    _receivePort.receive(receiveCallback);

    ScripterImpl scripter = new ScripterImpl();
    scripter.spawn().then((SendPort port) {
      _scripterPort = port;
      completer.complete(port);
    });

    return completer.future;
  }

  StringInputStream cmdLine;
  List choices;

  void receiveFromScripter(String messageJson, SendPort replyTo) {
    Message message = new Message.fromJson(messageJson);
    DEBUG_CMD("We have a message from Scripter: ${message.type}.");
    if (message.type == Message.MSG_END_OF_BOOK) {
      DEBUG_CMD("We are at the end of book. Closing.");
      stdin.close();
      _scripterPort.send(new Message.Quit().toJson());
      _receivePort.close();
    } else {
      if (message.type == Message.MSG_TEXT_RESULT) {
        DEBUG_CMD("Showing text from scripter.");
        print("\n${message.strContent}\n");
        _scripterPort.send(new Message.Continue().toJson(), _receivePort.toSendPort());
      } else if (message.type == Message.MSG_NO_RESULT) {
        DEBUG_CMD("No visible result. Continuing.");
        _scripterPort.send(new Message.Continue().toJson(), _receivePort.toSendPort());
      } else if (message.type == Message.MSG_SHOW_CHOICES) {
        DEBUG_CMD("We have choices to show!");
        if (message.listContent[0] != "")
          print("\n${message.listContent[0]}\n");
        choices = new List.from(message.listContent);
        for (int i = 1; i < choices.length; i++) {
          print("$i) ${choices[i]['string']}");
        }
        print("");
        // let player choose
        cmdLine.onLine = () {
          print("");
          try {
            int optionNumber = Math.parseInt(cmdLine.readLine());
            if (optionNumber > 0 && optionNumber < choices.length)
              _scripterPort.send(
                  new Message.OptionSelected(choices[optionNumber]['hash']).toJson(),
                  _receivePort.toSendPort()
                  );
          } catch (BadNumberFormatException e) {
            print("Input a number, please!");
          }
        };
      }
    }
  }
}

void main() {
  new CmdlineInterface();
}
