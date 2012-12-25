library egb_scripter;

import 'dart:isolate';
import 'dart:json';

import 'egb_utils.dart';

import 'egb_message.dart';
import 'egb_user_interaction.dart';
import 'egb_savegame.dart';


/**
  Scripter is the class that runs the actual game and sends Messages to UserInterface.
  It is subclassed by ScripterImpl, which is built from .egb the file by egb_builder.
  */
abstract class EgbScripter {
  // exposed members (to be used by ScripterImpl)

  List<List> pages;
  Map<String,int> pageHandles; // TODO: make this into Map<String,Page>
  
  String get currentPageName {
    if (currentPageIndex == null) {
      return null;
    }
    for (var key in pageHandles.keys) {
      if (pageHandles[key] == currentPageIndex) {
        return key;
      }
    }
    throw "Current page index ($currentPageIndex) is not among pageHandles.";
  }
  
  String get currentGroupName {
    var currentPage = currentPageName;
    int index = currentPage.indexOf(": ");
    if (index > 0) {
      return currentPage.substring(0, index);
    } else {
      return null;
    }
  }
  
  void initBlock();
  
  List blocks;
  int currentPageIndex;  // the current position in the pages list
  int currentBlock;  // the current position in the current page's blocks list
  
  EgbChoiceList choices;
  Map<String, dynamic> vars;
  StringBuffer textBuffer;

  void echo(String str) {
    if (textBuffer.length > 0) {
      textBuffer.add(" ");
    }
    textBuffer.add(str);
  }

  void goto(String dest) {
    if (currentGroupName != null
        && pageHandles.containsKey("$currentGroupName: $dest")) {
      _nextPageIndex = pageHandles["$currentGroupName: $dest"];
    } else if (pageHandles.containsKey(dest)) {
      _nextPageIndex = pageHandles[dest];
    } else {
      throw "Function goto() called with an invalid argument '$dest' (no such page).";
    }
  }

  void nextScript(Function f) {
    _nextScriptStack.add(f);
  }

  void repeatBlock() {
    _repeatBlockBit = true;
  }

  // Utility function that creates new choice.
  EgbChoice choice(String string, [String goto, Function then, bool showNow=false]) {
    EgbChoice choice = new EgbChoice(string, goto:goto, then:then, showNow:showNow);
    choices.add(choice);
    return choice;
  }

  // -- private members below

  SendPort _interfacePort;
  
  int _nextPageIndex;
  bool _repeatBlockBit = false;
  /**
    When a block/script/choice call for a script to be called afterwards, it ends
    up on this FIFO stack.
    */
  List<Function> _nextScriptStack;
  
  EgbScripter() : super() {
    DEBUG_SCR("Scripter has been created.");
    _nextScriptStack = new List<Function>();
    _initScriptEnvironment();

    // start the loop
    port.receive(_messageReceiveCallback);
  }

  void _messageReceiveCallback(String messageJson, SendPort replyTo) {
    EgbMessage message = new EgbMessage.fromJson(messageJson);
    DEBUG_SCR("Received message from interface: ${message.type}.");
    _interfacePort = replyTo;
    if (message.type == EgbMessage.MSG_QUIT) {
      DEBUG_SCR("Closing port and quiting.");
      port.close();
    } else if (pages == null
        || (currentPageIndex != null && currentPageIndex >= pages.length)) {
      DEBUG_SCR("No more pages.");
      _interfacePort.send(new EgbMessage.EndOfBook().toJson(), port.toSendPort());
    } else {
      _interfacePort.send(_goOneStep(message).toJson(), port.toSendPort());
    }
  }

  // Walks through the instructions, one block at a time.
  // Returns message for interface.
  EgbMessage _goOneStep(EgbMessage incomingMessage) {
    if (incomingMessage.type == EgbMessage.MSG_START) {
      DEBUG_SCR("Starting from the beginning");
      currentPageIndex = 0;
      // TODO: currentPageName
      currentBlock = null;
      _nextScriptStack.clear();
      _initScriptEnvironment();
    }

    if (incomingMessage.type == EgbMessage.MSG_OPTION_SELECTED) {
      DEBUG_SCR("An option has been selected. Resolving.");
      // TODO: make this more elegant by making ChoiceList class
      EgbMessage message;
      choices.forEach((choice) {
          if (choice.hash == incomingMessage.intContent) {
            DEBUG_SCR("Found choice that was selected: ${choice.string}");
            if (choice.goto != null) {
              goto(choice.goto);
            }
            if (choice.f != null) {
              message = _runScriptBlock(script:choice.f);
            }
          }
      });
      if (message != null) {
        return message;
      } else {
        return new EgbMessage.NoResult();
      }
    }

    // if previous script asked for nextScript()
    if (!_nextScriptStack.isEmpty) {
      Function script = _nextScriptStack.removeLast();
      return _runScriptBlock(script:script);
    }

    // if previous script asked to jump to a new page, then jump
    if (_nextPageIndex != null) {
      currentPageIndex = _nextPageIndex;
      currentBlock = null;
      _nextPageIndex = null;
      choices.clear();
      return _createSaveGame();
    }

    // increase currentBlock, but not if previous script called "repeatBlock();"
    if (currentBlock == null) {
      currentBlock = 0;
    } else if (_repeatBlockBit) {
      _repeatBlockBit = false;
    } else {
      currentBlock++;
    }

    DEBUG_SCR("currentPageIndex = $currentPageIndex, currentBlock = $currentBlock");

    blocks = pages[currentPageIndex];
    DEBUG_SCR("Resolving block.");
    if (currentBlock >= blocks.length) {
      DEBUG_SCR("At the end of page.");
      if (choices.some((choice) => !choice.shown)) {
        return choices.toMessage(endOfPage:true); //new Message.ShowChoices(choices, endOfPage:true);
      } else {
        return new EgbMessage.EndOfBook();
      }
    } else if (blocks[currentBlock] is String) {
      // just an ordinary paragraph, no script
      EgbMessage message = new EgbMessage.TextResult(blocks[currentBlock]);
      return message;
    } else if (blocks[currentBlock] is Map) {
      Map map = blocks[currentBlock] as Map<String,dynamic>;
      if (map.containsKey("question")) {
        // we have a question
        choices.question = map["question"];
      } else {
        // not a question, so it must be a choice, TODO: check
        choices.add(new EgbChoice.fromMap(blocks[currentBlock]));
      }
      return new EgbMessage.NoResult();
    } else if (blocks[currentBlock] is Function) {
      // a script paragraph
      DEBUG_SCR("Running script.");
      return _runScriptBlock(script:blocks[currentBlock]);
    }

  }

  void _initScriptEnvironment() {
    choices = new EgbChoiceList();
    vars = new Map<String, dynamic>();

    initBlock(); // run contents of <init>
  }

  // XXX: invokeOn not yet implemented in Dart
  /*
  noSuchMethod(InvocationMirror invocation) => 
      invocation.invokeOn(vars[invocation.memberName]);
  */

  // XXX: this doesn't work either, membername is with "set:" and is always method
  
  dynamic noSuchMethod(InvocationMirror invocation) {
    if (invocation.isGetter) {
      return vars[invocation.memberName];
    } else if (invocation.isSetter) {
      var memberName = invocation.memberName.replaceAll("=", ""); // fix bug in Dart that sets memberName to "variable=" when setter
      vars[memberName] = invocation.positionalArguments[0];
      return null;
    } else {
      throw new NoSuchMethodError(this, invocation.memberName, 
          invocation.positionalArguments, invocation.namedArguments);
    }
  }
  

  /*
  dynamic noSuchMethod(InvocationMirror invocation) {
    var name = invocation.memberName;
    if (name.startsWith("get:") || name.startsWith("get ")) {
      // TODO: throw error if not set
      return vars[name.substring(4)];
    } else if (name.startsWith("set:") || name.startsWith("set ")) {
      vars[name.substring(4)] = invocation.positionalArguments[0];
      return null;
    } else {
      throw new NoSuchMethodError(this, name, invocation.positionalArguments, 
          invocation.namedArguments);
    }
  }
  */

  // runs the current block or the specified block
  EgbMessage _runScriptBlock({Function script}) {
    // clean up
    textBuffer = new StringBuffer();
    // delete choices that have already been shown
    choices = choices.filter((EgbChoice choice) => !choice.shown);

    // run the actual script
    if (script == null) {
      blocks[currentBlock]();
    } else {
      script();
    }

    // catch text and choices
    if (choices.some((choice) => !choice.waitForEndOfPage)) {
      return choices.toMessage(prependText:textBuffer.toString()); // new Message.ShowChoices(choices, prependText:textBuffer.toString());
    }
    return new EgbMessage.TextResult(textBuffer.toString());
  }
  
  EgbMessage _createSaveGame() {
    EgbSavegame savegame = new EgbSavegame(currentPageName, vars);
    return savegame.toMessage(EgbMessage.MSG_SAVE_GAME);
  }
}