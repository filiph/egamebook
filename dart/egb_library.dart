#library('egb');

#import('dart:json');
#import('dart:isolate');

// TODO: if too big JS/Dart files, have a JSON file/server somewhere and instead of feeding Interface with paragraphs, just feed it with URIs.
// TODO: make save/load - interface Saveable for game objects. Objects need to implement "serialize()" and "loadFromSerialized()" or some such. Each object can choose which of it's parts it wants to serialize. Plain objects like int, List or Map are automatically Saveable. All Saveable objects (in vars) should be saved automatically on each new page. There should be a rotating history of ~10 pages.

void DEBUG_SCR(String str) {
  // print("SCR: $str");
}


class Message {
  int type;

  // different types of contents
  List listContent;
  String strContent;
  int intContent;

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
    strContent = str;
  }

  Message.Start() : type = MSG_START {}

  Message.EndOfBook() : type = MSG_END_OF_BOOK {}

  // Choices message. A list with [0] being text prepended, then choices
  Message.ShowChoices(
      List<Choice> choices,
      [String prependText="",
      bool endOfPage=false]
      ) : type = MSG_SHOW_CHOICES {
    List<Choice> choicesToSend;
    // filter out choices we don't want to show
    if (!endOfPage)
      choicesToSend = choices.filter((choice) => !choice.waitForEndOfPage && !choice.shown);
    else
      choicesToSend = choices.filter((choice) => !choice.shown);

    DEBUG_SCR("Sending choices.");

    listContent = new List<Dynamic>();
    listContent.add(prependText);
    choicesToSend.forEach((choice) {
        listContent.add( {
          "string": choice.string,
          "hash": choice.hashCode()
          } );
        choice.shown = true;
        });
  }

  Message.OptionSelected(int hash) : type = MSG_OPTION_SELECTED {
    intContent = hash;
  }

  Message.NoResult() : type = MSG_NO_RESULT {}

  /**
    Ctor that creates the Message object from a JSON string.
    XXX: this isn't needed in VM, but frog can't handle Object messages (yet?)
    */
  Message.fromJson(String json) {
    Map<String,Dynamic> data = JSON.parse(json);
    type = data["type"];

    if (type == MSG_OPTION_SELECTED) {
      intContent = data["intContent"];
    } else if (type == MSG_SHOW_CHOICES) {
      listContent = data["listContent"];
    } else if (type == MSG_TEXT_RESULT) {
      strContent = data["strContent"];
    }
  }

  /**
    Outputs message to JSON string. Useful when sending via Port to Isolate.
    */
  String toJson() {
    Map<String,Dynamic> data = new Map<String,Dynamic>();

    data["type"] = type;

    if (type == MSG_OPTION_SELECTED) {
      data["intContent"] = intContent;
    } else if (type == MSG_SHOW_CHOICES) {
      data["listContent"] = listContent;
    } else if (type == MSG_TEXT_RESULT) {
      data["strContent"] = strContent;
    }

    return JSON.stringify(data);
  }
}

class UserInteraction implements Hashable {
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
  String goto;
  bool showNow;

  Choice(this.string, [this.goto, Function then, bool showNow=false]) : super() {
    f = then;
    waitForEndOfPage = !showNow;
  }

  Choice.fromMap(Map<String,Dynamic> map) : super() {
    string = map["string"];
    goto = map["goto"];
    if (map.containsKey("showNow"))
      showNow = map["showNow"];
    f = map["then"];
  }

  Choice then(Function _f) {
    f = _f;
    return this;
  }
}

// TODO: class ChoiceList implements List

class Question extends UserInteraction {
}



/**
  Scripter is the class that runs the actual game and sends Messages to UserInterface.
  It is subclassed by ScripterImpl, which is built from .egb the file by egb_builder.
  */
class Scripter {
  SendPort _interfacePort;

  List<List> pages;
  Map<String,int> pageHandles;
  List blocks;
  int currentPage;  // the current position in the pages list
  int currentBlock;  // the current position in the current page's blocks list

  int nextPage;
  bool repeatBlockBit = false;
  /**
    When a block/script/choice call for a script to be called afterwards, it ends
    up on this FIFO stack.
    */
  List<Function> nextScriptStack;

  Scripter() : super() {
    DEBUG_SCR("Scripter has been created.");
    nextScriptStack = new List<Function>();
    initScriptEnvironment();

    // start the loop
    port.receive(callback);
  }

  void callback(String messageJson, SendPort replyTo) {
    Message message = new Message.fromJson(messageJson);
    DEBUG_SCR("Received message from interface: ${message.type}.");
    _interfacePort = replyTo;
    if (message.type == Message.MSG_QUIT) {
      DEBUG_SCR("Closing port and quiting.");
      port.close();
    } else if (pages == null
        || (currentPage != null && currentPage >= pages.length)) {
      DEBUG_SCR("No more pages.");
      _interfacePort.send(new Message.EndOfBook().toJson(), port.toSendPort());
    } else {
      _interfacePort.send(goOneStep(message).toJson(), port.toSendPort());
    }
  }

  // Walks through the instructions, one block at a time.
  // Returns message for interface.
  Message goOneStep(Message incomingMessage) {
    if (incomingMessage.type == Message.MSG_START) {
      DEBUG_SCR("Starting from the beginning");
      currentPage = 0;
      currentBlock = null;
      nextScriptStack.clear();
      initScriptEnvironment();
    }

    if (incomingMessage.type == Message.MSG_OPTION_SELECTED) {
      DEBUG_SCR("An option has been selected. Resolving.");
      // TODO: make this more elegant by making ChoiceList class
      Message message;
      choices.forEach((choice) {
          if (choice.hashCode() == incomingMessage.intContent) {
            DEBUG_SCR("Found choice that was selected: ${choice.string}");
            if (choice.goto != null)
              nextPage = pageHandles[choice.goto];
            if (choice.f != null)
              message = runScriptBlock(script:choice.f);
          }
      });
      if (message != null)
        return message;
      else
        return new Message.NoResult();
    }

    // if previous script asked for nextScript()
    if (!nextScriptStack.isEmpty()) {
      Function script = nextScriptStack.removeLast();
      return runScriptBlock(script:script);
    }

    // if previous script asked to jump, then jump
    if (nextPage != null) {
      currentPage = nextPage;
      currentBlock = null;
      nextPage = null;
      choices.clear();
    }

    // increase currentBlock, but not if previous script called "repeatBlock();"
    if (currentBlock == null)
      currentBlock = 0;
    else if (repeatBlockBit)
      repeatBlockBit = false;
    else
      currentBlock++;

    DEBUG_SCR("currentPage = $currentPage, currentBlock = $currentBlock");

    blocks = pages[currentPage];
    DEBUG_SCR("Resolving block.");
    if (currentBlock >= blocks.length) {
      DEBUG_SCR("At the end of page.");
      if (choices.some((choice) => !choice.shown))
        return new Message.ShowChoices(choices, endOfPage:true);
      else
        return new Message.EndOfBook();
    } else if (blocks[currentBlock] is String) {
      // just an ordinary paragraph, no script
      Message message = new Message.TextResult(blocks[currentBlock]);
      return message;
    } else if (blocks[currentBlock] is Map) {
      choices.add(new Choice.fromMap(blocks[currentBlock]));
      return new Message.NoResult();
    } else if (blocks[currentBlock] is Function) {
      // a script paragraph
      DEBUG_SCR("Running script.");
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

    initBlock(); // run contents of <init>
  }

  // XXX: noSuchMethod not yet implemented in this form in Dart
  /*
     noSuchMethod(InvocationMirror invocation) {
     if (invocation.isGetter) {
     invocation.invokeOn(vars[invocation.memberName]);
     } else if (invocation.isSetter) {
     invocation.invokeOn(vars[invocation.memberName]);
     } else {
     throw new NoSuchMethodException(this, invocation.memberName, invocation.arguments);
     }
  // TODO: Implement "library" using noSuchMethod
  // - noSuchMethod for function invocations (combat())
  }
   */

  Dynamic noSuchMethod(String name, List args) {
    print("noSuchMethod: $name, $args");
    if (name.startsWith("get:") || name.startsWith("get ")) {
      return vars[name.substring(4)];
    } else if (name.startsWith("set:") || name.startsWith("set ")) {
      vars[name.substring(4)] = args[0];
      return null;
    } else {
      throw new NoSuchMethodException(this, name, args);
    }
  }

  void echo(String str) {
    if (textBuffer.length > 0)
      textBuffer.add(" ");
    textBuffer.add(str);
  }

  void goto(String pageHandle) {
    nextPage = pageHandles[pageHandle];
  }

  void nextScript(Function f) {
    nextScriptStack.add(f);
  }

  void repeatBlock() {
    repeatBlockBit = true;
  }

  // Utility function that creates new choice.
  Choice choice(String string, [String goto, Function then, bool showNow=false]) {
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

/**
  Interface to all user interfaces interacting with the Scripter.
  */
interface UserInterface {
  ReceivePort _receivePort;
  SendPort _scripterPort;
}

