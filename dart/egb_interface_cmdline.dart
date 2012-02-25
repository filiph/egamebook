#import('egb_library.dart');

#import('samples/test_project.dart');

#import('dart:io');


class CmdlineInterface {
  ReceivePort _receivePort;
  SendPort _scripterPort;

  StringInputStream cmdLine;
  List choices;

  CmdlineInterface() {
    print("CMD: Command line interface starting.");
    _receivePort = new ReceivePort();
    _receivePort.receive(receiveFromScripter);

    ScripterImpl scripter = new ScripterImpl();
    scripter.spawn().then((SendPort port) {
      _scripterPort = port;
      print("CMD: Scripter is now ready! Sending message.");
      port.send(new Message.Start(), _receivePort);
    });

    cmdLine = new StringInputStream(stdin);
  }

  void receiveFromScripter(var message, SendPort replyTo) {
    print("CMD: We have a message from Scripter: ${message.type}.");
    if (message.type == Message.MSG_END_OF_BOOK) {
      print("CMD: We are at the end of book. Closing.");
      stdin.close();
      _scripterPort.send(new Message.Quit());
      _receivePort.close();
    } else {
      if (message.type == Message.MSG_TEXT_RESULT) {
        print("CMD: Showing text from scripter.");
        print("\n${message.content}\n");
	_scripterPort.send(new Message.Continue(), _receivePort);
      } else if (message.type == Message.MSG_NO_RESULT) {
	print("CMD: No visible result. Continuing.");
	_scripterPort.send(new Message.Continue(), _receivePort);
      } else if (message.type == Message.MSG_SHOW_CHOICES) {
        print("CMD: We have choices to show!");
	if (message.content[0] != "")
	  print("\n${message.content[0]}\n");
	choices = new List.from(message.content);
	for (int i = 1; i < choices.length; i++) {
	  print("$i) ${choices[i]['string']}");
	}
	print("");
        // let player choose
	cmdLine.lineHandler = () {
	  try {
	    int optionNumber = Math.parseInt(cmdLine.readLine());
	    if (optionNumber > 0 && optionNumber < choices.length)
	      _scripterPort.send(
		  new Message.OptionSelected(choices[optionNumber]['hash']),
		  _receivePort
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
