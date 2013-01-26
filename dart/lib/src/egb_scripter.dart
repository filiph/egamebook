library egb_scripter;

import 'dart:isolate';
import 'dart:json';

import 'egb_utils.dart';

import 'egb_message.dart';
import 'egb_user_interaction.dart';
import 'egb_savegame.dart';
import 'egb_page.dart';

/**
 * In the context of [EgbScripter], we also have the actual data + logic of
 * the page in the [blocks] list.
 */
class EgbScripterPage extends EgbPage {
  /// The text and/or logic of each block inside this page. 
  final List<dynamic> blocks;
  
  /// Number of times this page has been visited by player.
  int visitedCount = 0;
  
  /// Whether or not this page has been visited by player.
  bool get visited => visitedCount > 0;
  
  /**
   * Default constructor only takes blocks List, and optionally page options.
   * Name is copied from Map key when added to [EgbScripterPageMap].
   */
  EgbScripterPage(
      List<dynamic> this.blocks,
      {bool visitOnce: false, bool showOnce: false}) : 
        super(visitOnce: visitOnce, showOnce: showOnce);
}

/**
 * [EgbScripterPageList] is the container for the whole of the text and logic
 * content of each book.
 */
class EgbScripterPageMap {
  /// A map of page name -> page object.
  Map<String, EgbScripterPage> pages;
  
  EgbScripterPageMap() {
    pages = new Map<String, EgbScripterPage>();
  }
  
  /// Returns page of exactly the name [key].
  EgbScripterPage operator [](String key) => pages[key];
  
  /**
   * Returns page with name [name]. If [groupName] is given, then the function
   * will first search for key in the format [:groupName: name:]. 
   * 
   * Returns [:null:] if there is no page of any compatible name.
   */
  EgbScripterPage getPage(String name, {String currentGroupName: null}) {
    if (currentGroupName != null && 
        pages.containsKey("$currentGroupName: $name")) {
      return pages["$currentGroupName: $name"];
    } else if (pages.containsKey(name)) {
      return pages[name];
    } else {
      return null;
    }
  }
  
  operator []=(String key, EgbScripterPage newPage) {
    pages[key] = newPage;
    // Copy the "key" to the name of the page.
    newPage.name = key;
  }
  

}


/**
  Scripter is the class that runs the actual game and sends Messages to UserInterface.
  It is subclassed by ScripterImpl, which is built from .egb the file by egb_builder.
  */
abstract class EgbScripter {
  //List<List> pages;
  //Map<String,int> pageHandles; // TODO: make this into Map<String,Page>
  
  /// The unique id of this particular gamebook. Used for saving.
  String gamebookUid;
  
  EgbScripterPageMap pageMap;
  EgbScripterPage firstPage;
  EgbScripterPage currentPage;
  EgbScripterPage _nextPage;
  
  void initBlock();
  
  int currentBlockIndex;  // the current position in the current page's blocks list
  
  EgbChoiceList choices;
  Map<String, dynamic> vars;
  StringBuffer textBuffer;

  void echo(String str) {
    if (textBuffer.length > 0) {
      textBuffer.add(" ");  // Implicitly add space between each echo().
    }
    textBuffer.add(str);
  }

  /**
   * By calling [goto()], you're saying you want to change page to [dest].
   * You can specify the page name in full (i.e. including the group name)
   * or in short (i.e. without group name).
   * 
   * Function throws when requested page doesn't exist. 
   */
  void goto(String dest) {
    _nextPage = pageMap.getPage(dest, currentGroupName: currentPage.groupName);
    if (_nextPage == null) {
      throw "Function goto() called with an invalid argument '$dest'. "
            "No such page.";
    }
  }

  /// Adds a script to the stack of scripts.
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
  
  bool _repeatBlockBit = false;
  /**
    When a block/script/choice call for a script to be called afterwards, 
    it ends up on this FIFO stack.
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

    // TODO: make into switch 
    if (message.type == EgbMessage.MSG_QUIT) {
      DEBUG_SCR("Closing port and quiting.");
      port.close();
    } else if (message.type == EgbMessage.MSG_GET_BOOK_UID) {
      DEBUG_SCR("First contact from Runner. Reply with uid of this book.");
      _interfacePort.send(
          new EgbMessage.BookUid("DEFAULT_BOOK_UID").toJson(), // TODO: get UID from meta information
          port.toSendPort());
//    } else if (message.type == EgbMessage.MSG_LOAD_GAME) {
//      _loadFromSaveGameMessage(message);
//      // TODO handle errors
//      _interfacePort.send(new EgbMessage.NoResult().toJson(), port.toSendPort());
    } else {
      _interfacePort.send(
          _goOneStep(message).toJson(), port.toSendPort());
    }
  }

  // Walks through the instructions, one block at a time.
  // Returns message for interface.
  EgbMessage _goOneStep(EgbMessage incomingMessage) {
    if (incomingMessage.type == EgbMessage.MSG_START ||
        incomingMessage.type == EgbMessage.MSG_LOAD_GAME) {
      currentBlockIndex = null;
      _nextScriptStack.clear();
      _initScriptEnvironment();
    }
    if (incomingMessage.type == EgbMessage.MSG_START) {
      DEBUG_SCR("Starting new game.");
      currentPage = firstPage;
    }
    if (incomingMessage.type == EgbMessage.MSG_LOAD_GAME) {
      DEBUG_SCR("Starting new game.");
      _loadFromSaveGameMessage(incomingMessage);
    }
    
    if (incomingMessage.type == EgbMessage.MSG_OPTION_SELECTED) {
      DEBUG_SCR("An option has been selected. Resolving.");
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
    if (_nextPage != null) {
      currentPage = _nextPage;
      currentBlockIndex = null;
      _nextPage = null;
      choices.clear();
      return new EgbMessage.NoResult();
    }

    // increase currentBlock, but not if previous script called "repeatBlock();"
    if (currentBlockIndex == null) {
      // we just came to this page
      if (incomingMessage.type == EgbMessage.MSG_LOAD_GAME) {
        // SaveGames are always made just before the page's last block 
        // (choiceList).
        currentBlockIndex = currentPage.blocks.length - 1;
      } else {
        currentBlockIndex = 0;
      }
      currentPage.visitedCount += 1;
    } else if (_repeatBlockBit) {
      _repeatBlockBit = false;
    } else {
      currentBlockIndex++;
    }

    DEBUG_SCR("currentPage = $currentPage, currentBlock = $currentBlockIndex");

    DEBUG_SCR("Resolving block.");
    if (currentBlockIndex >= currentPage.blocks.length) {
      DEBUG_SCR("At the end of page.");
      if (choices.any((choice) => !choice.shown)) {
        return choices.toMessage(
                  endOfPage: true,
                  filterOut: _leadsToIllegalPage);
      } else {
        return new EgbMessage.EndOfBook();
      }
    } else if (currentPage.blocks[currentBlockIndex] is String) {
      // just an ordinary paragraph, no script
      return new EgbMessage.TextResult(currentPage.blocks[currentBlockIndex]);
    } else if (currentPage.blocks[currentBlockIndex] is List) {
      // choiceList
      choices.addFromScripterList(currentPage.blocks[currentBlockIndex]);
      if (currentBlockIndex == currentPage.blocks.length - 1) {
        // Last block on page. Save the game.
        return _createSaveGame();
      } else {
        return choices.toMessage(
                  endOfPage: false,
                  filterOut: _leadsToIllegalPage);
      }
    } else if (currentPage.blocks[currentBlockIndex] is Function) {
      // a script paragraph
      return _runScriptBlock(script: currentPage.blocks[currentBlockIndex]);
    }

  }

  void _initScriptEnvironment() {
    choices = new EgbChoiceList();
    vars = new Map<String, dynamic>();

    initBlock(); // run contents of <init>
  }
  
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
  
  // XXX: invokeOn not yet implemented in Dart
  /*
  noSuchMethod(InvocationMirror invocation) => 
      invocation.invokeOn(vars[invocation.memberName]);
  */

  // XXX: this doesn't work either, membername is with "set:" and is always method

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
    choices = new EgbChoiceList.from(
        choices.where((choice) => !choice.shown)
        );  // TODO: choices.removeMatching((choice) => choice.shown);

    // run the actual script
    if (script == null) {
      currentPage.blocks[currentBlockIndex]();
    } else {
      script();
    }

    // catch text and choices
    if (choices.any((choice) => !choice.waitForEndOfPage)) {
      return choices.toMessage(
          prependText: textBuffer.toString(),
          filterOut: _leadsToIllegalPage);
    }
    return new EgbMessage.TextResult(textBuffer.toString());
  }
  
  /**
   * When a page is only visitable once ([:visitOnce:] option) and has been
   * visited, then it's an illegal page to visit. This helper function
   * checks for this.
   */
  bool _leadsToIllegalPage(EgbChoice choice) {
    if (choice.goto == null) return false;
    var targetPage = 
        pageMap.getPage(choice.goto, currentGroupName: currentPage.groupName);
    if (targetPage == null) return true;
    if (targetPage.visitOnce && targetPage.visited) {
      return true;
    } else {
      return false;
    }
  }
  
  EgbMessage _createSaveGame() {
    var savegame = new EgbSavegame(currentPage.name, vars); // TODO: save also counts in pageMap
    return savegame.toMessage(EgbMessage.MSG_SAVE_GAME);
  }
  
  void _loadFromSaveGameMessage(EgbMessage message) {
    var savegame = new EgbSavegame.fromMessage(message);
    
    if (pageMap[savegame.currentPageName] == null) {
      throw "Trying to load page '${savegame.currentPageName}' which doesn't "
            "exist in current egamebook.";
    }
    
    DEBUG_SCR("Starting from a savegame");
    currentPage = pageMap[savegame.currentPageName];
    
    // copy saved variables over vars
    savegame.vars.forEach((key, value) {
      vars[key] = value;
    });
    
  }
}