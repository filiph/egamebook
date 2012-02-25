#library('egb');

class Instruction {
}

class PrintInstruction extends Instruction {
  String msg;

  PrintInstruction(this.msg) {
  }
}

class ScriptInstruction extends Instruction {
}

class Message {
  final int type;
  var content;

  static final int MSG_QUIT = 0;
  static final int MSG_CONTINUE = 1;  // 0b0001
  static final int MSG_RESULT = 2;  // 0b0010
  static final int MSG_TEXT_RESULT = 4;  // 0b0100
  static final int MSG_INPUT_NEEDED = 8;
  static final int MSG_START = 16;
  static final int MSG_END_OF_BOOK = 32;
  static final int MSG_SHOW_CHOICES = 64;
  static final int MSG_OPTION_SELECTED = 128;
  static final int MSG_NO_RESULT = 256;

  Message(this.type) {
  }

  Message.Quit() : type = MSG_QUIT {}

  Message.Continue() : type = MSG_CONTINUE {}

  Message.TextResult(String str) : type = MSG_TEXT_RESULT {
    content = str;
  }

  Message.Start() : type = MSG_START {}

  Message.EndOfBook() : type = MSG_END_OF_BOOK {}

  // Choices message. A list with [0] being text prepended, then choices
  Message.ShowChoices(
      List<Choice> choices, 
      [String prependText, 
      bool endOfPage=false]
      ) : type = MSG_SHOW_CHOICES {
    List<Choice> choicesToSend;
    // filter out choices we don't want to show
    if (!endOfPage)
      choicesToSend = choices.filter((choice) => !choice.waitForEndOfPage && !choice.shown);
    else
      choicesToSend = choices.filter((choice) => !choice.shown);

    print("SCR: Sending choices.");

    content = new List<Dynamic>();
    content.add(prependText);
    choicesToSend.forEach((choice) {
      content.add( {
	"string": choice.string,
	"hash": choice.hashCode()
      } );
      choice.shown = true;
    });
  }

  Message.OptionSelected(int hash) : type = MSG_OPTION_SELECTED {
    content = hash;
  }
  
  Message.NoResult() : type = MSG_NO_RESULT {}
}

class UserInteraction implements Hashable { // TODO: extends Hashable?
  bool shown = false;
  bool waitForEndOfPage;
  int hash;

  UserInteraction() {
    hash = (Math.random() * 30000).toInt();
  }

  int hashCode() => hash;
}

class Choice extends UserInteraction {
  String string;
  Function f;
  int goto;

  Choice(this.string, [this.goto, Function then, bool showNow=false]) : super() {
    f = then;
    waitForEndOfPage = !showNow;
  }
}

// TODO: class ChoiceList implements List

class Question extends UserInteraction {
}

class Scripter extends Isolate {
  SendPort _interfacePort;

  List<List> pages;
  List blocks;
  int currentPage;  // the current position in the pages list
  int currentBlock;  // the current position in the current page's blocks list

  int nextPage;
  bool repeatBlockBit = false;

  Scripter() : super() {
    print("Scripter has been created.");
  }

  void main() {
    port.receive(callback);
  }

  void callback(var message, SendPort replyTo) {
    print("SCR: Received message from interface: ${message.type}.");
    print("SCR: currentPage = $currentPage, currentBlock = $currentBlock");
    _interfacePort = replyTo;
    if (message.type == Message.MSG_QUIT) {
      print("SCR: Closing port and quiting.");
      port.close();
    } else if (pages == null 
	   || (currentPage != null && currentPage >= pages.length)) {
      print("SCR: No more pages.");
      _interfacePort.send(new Message.EndOfBook(), port);
    } else {
      _interfacePort.send(goOneStep(message), port);
    }
  }

  // Walks through the instructions, one block at a time.
  // Returns message for interface.
  Message goOneStep(Message incomingMessage) {
    if (incomingMessage.type == Message.MSG_START) {
      print("SCR: Starting from the beginning");
      currentPage = 0;
      currentBlock = null;
      initScriptEnvironment();
    }

    // if previous script asked to jump, then jump
    if (nextPage != null) {
      currentPage = nextPage;
      currentBlock = null;
      nextPage = null;
    }

    if (incomingMessage.type == Message.MSG_OPTION_SELECTED) {
      print("SCR: An option has been selected. Resolving.");
      // TODO: make this more elegant by making ChoiceList class
      choices.forEach((choice) {
	if (choice.hashCode() == incomingMessage.content) {
          if (choice.goto != null)
	    nextPage = choice.goto;
	  if (choice.f != null)
	    return runScriptBlock(script:choice.f);
	  else
	    return new Message.NoResult();
	}
      });
    }

    // increase currentBlock, but not if previous script called "repeatBlock();"
    if (currentBlock == null)
      currentBlock = 0;
    else if (repeatBlockBit)
      repeatBlockBit = false;
    else
      currentBlock++;

    blocks = pages[currentPage];
    print("SCR: Resolving block.");
    if (currentBlock >= blocks.length) {
      // at the end of page
      if (choices.some((choice) => !choice.shown)) 
	return new Message.ShowChoices(choices);
      else
	return new Message.EndOfBook();
    } else if (blocks[currentBlock] is String) {
      // just an ordinary paragraph, no script
      Message message = new Message.TextResult(blocks[currentBlock]); 
      return message;
    } else if (blocks[currentBlock] is Function) {
      // a script paragraph
      print("SCR: Running script.");
      return runScriptBlock(blocks[currentBlock]);
    }

  }


  // TODO: TBD if we want to build a class (ScriptEnvironment) for the below

  List<Choice> choices;
  Map<String, Dynamic> vars;
  StringBuffer textBuffer;

  void initScriptEnvironment() {
    choices = new List<Choice>();
    vars = new Map<String, Dynamic>();
  }

  // making sure calls like "a = 5" will work in scripts 
  // XXX: noSuchMethod not yet implemented in Dart!
  /*
  noSuchMethod(InvocationMirror invocation) {
    if (invocation.isGetter) {
      invocation.invokeOn(vars[invocation.memberName]);
    } else if (invocation.isSetter) {
      invocation.invokeOn(vars[invocation.memberName]);
    } else {
      throw new NoSuchMethodException(this, invocation.memberName, invocation.arguments);
    }
  }
  */

  void echo(String str) {
    if (textBuffer.length > 0)
      textBuffer.add(" ");
    textBuffer.add(str);
  }

  void goto(int pageNumber) {
    nextPage = pageNumber;
  }

  void repeatBlock() {
    repeatBlockBit = true;
  }

  // Utility function that creates new choice.
  Choice choice(String string, [int goto, Function then, bool showNow=false]) {
    Choice choice = new Choice(string, goto:goto, then:then, showNow:showNow);
    choices.add(choice);
    return choice;
  }

  // runs the current block or the specified block
  Message runScriptBlock([Function script]) {
      // clean up
      textBuffer = new StringBuffer();
      // delete choices that have already been shown
      choices = choices.filter((Choice choice) => !choice.shown);
      
      // run the actual script
      if (script == null)
	blocks[currentBlock]();
      else
	script();

      // catch text and choices
      if (choices.some((choice) => !choice.waitForEndOfPage))
	return new Message.ShowChoices(choices, prependText:textBuffer.toString());
      return new Message.TextResult(textBuffer.toString());
  }
}

