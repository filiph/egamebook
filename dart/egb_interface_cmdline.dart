#import('egb_library.dart');

#import('samples/test_project.dart');

class CmdlineInterface {
  ReceivePort _receivePort;
  SendPort _scripterPort;

  CmdlineInterface() {
    print("CMD: Command line interface starting.");
    _receivePort = new ReceivePort();
    _receivePort.receive(receiveFromScripter);

    ScripterImpl scripter = new ScripterImpl();
    scripter.spawn().then((SendPort port) {
      _scripterPort = port;
      print("CMD: Scripter is now ready! Sending message.");
      port.send(new Message.Continue(), _receivePort);
    });
  }

  void receiveFromScripter(var message, SendPort replyTo) {
    print("CMD: We have a message from Scripter: ${message.type}.");
    if (message.type == Message.MSG_QUIT) {
      print("CMD: We are quitting.");
      _receivePort.close();
    } else {
      if (message.type == Message.MSG_TEXT_RESULT) {
        // TODO: ... show stuff
        print("CMD: Showing text from scripter.");
        print(message.content);
      } else {
        // TODO: resolve stuff
      }
      // finaly, ask scripter to continue
      _scripterPort.send(
        new Message.Continue(), 
        _receivePort
      );
    }
  }
}

void main() {
  new CmdlineInterface();
}
