library egb_scripter;


import 'dart:isolate';
import 'dart:json';
import 'dart:collection';

import '../shared/utils.dart';
import '../shared/message.dart';
import '../shared/user_interaction.dart';
import '../persistence/savegame.dart';
import '../shared/page.dart';

import '../persistence/saveable.dart';
export '../persistence/saveable.dart';

part 'scripter_page.dart';
part 'points.dart';

/**
 * The StringBuffer which collects all echo()'d strings to put them all
 * together at the end of a block and send them to the Runner (and therefore,
 * the player).
 */
StringBuffer textBuffer = new StringBuffer();

/**
 * The top level function that can be called from script blocks or library
 * functions.
 */
void echo(String str) {
  if (textBuffer.length > 0) {
    textBuffer.write(" ");  // Implicitly add space between each echo().
  }
  textBuffer.write(str);
}

String _gotoPageName;

/**
 * By calling [goto()], you're saying you want to change page to [dest].
 * You can specify the page name in full (i.e. including the group name)
 * or in short (i.e. without group name).
 * 
 * This is a global, author-facing function. It will store
 * the name of the page in a variable that is later used to get the actual
 * page inside [Scripter]. 
 */
void goto(String pageName) {
  _gotoPageName = pageName;
}

/**
 * While set to true, no points will actually be added. This is set (and unset)
 * automatically when player picks a choice that he has previously seen
 * but didn't pick. (No points for second guessing.)
 */
bool _pointsEmbargo = false;

/**
 * The interface with which the author can award player with points. Author
 * can either use [:points += 6:] or [:points.add(6):] or - in case he
 * wants to add a justification - [:points.add(6, "clever use of resources"):].
 */
PointsCounter _points = new PointsCounter();

/**
 * List of choices to be shown to the player.
 */
EgbChoiceList choices = new EgbChoiceList();

/**
 * Utility shortcut for creating new choices.
 */
EgbChoice choice(String string, [String goto, ScriptBlock script, 
                                 bool showNow=true]) {
  EgbChoice choice = new EgbChoice(string, goto:goto, script:script, showNow:showNow);
  choices.add(choice);
  return choice;
}

/**
 * The map holding all author-defined variables. This is accessed either
 * by [:var["name"]:], but thanks to noSuchMethod override, 
 * also by just [:name:] (not in libraries, though).
 */
Map<String, dynamic> vars = new Map<String, dynamic>();

/**
 * The current block should be repeated after its execution.
 */
bool _repeatBlockBit = false;

/**
 * Call this function when you want the current script block to be repeated
 * after execution. Useful for looping a script block until something (fight,
 * minigame, etc.) is resolved.
 */
void repeatBlock() {
  _repeatBlockBit = true;
}

/**
When a block/script/choice call for a script to be called afterwards,
it ends up on this FIFO stack.
 */
List<ScriptBlock> _nextScriptStack;

/// Adds a script to the stack of scripts.
void nextScript(ScriptBlock f) {
  _nextScriptStack.add(f);
}


/**
  Scripter is the class that runs the actual game and sends Messages to UserInterface.
  It is subclassed by ScripterImpl, which is built from .egb the file by egb_builder.
  */
abstract class EgbScripter {
  /// The unique id of this particular gamebook. Used for saving.
  String gamebookUid;

  /// Information about all pages, their visit counts, and more.
  EgbScripterPageMap pageMap;
  /// The starting page of the book.
  EgbScripterPage firstPage;
  /// The page and block that called goto() that resulted in jumping to
  /// currentPage.
  EgbScripterBlockPointer _preGotoPosition;
  /// The page visited previously.
  EgbScripterPage get previousPage => _preGotoPosition == null
      ? null
      : _preGotoPosition.page;
  /// Page that is currently being read.
  EgbScripterPage currentPage;
  
  /// The ChoiceList to be shown on next occasion.
  EgbSavegame _choicesToShow;
  
  /// Goto links (page1 -> page 2) that have been shown to the player, but
  /// not picked. Links are represented by hashes created by
  /// [_createLinkHash].
  /// This is important for the  "No points for second guessing" rule.
  Set<String> _playerChronology;
  
  /// [_playerChronlogy] has changed and needs to be sent to Runner.
  bool _playerChronologyChanged = false;
  
  /// Create a unique hash that identifies a path from one page to another.
  String _createLinkHash(EgbScripterPage from, EgbScripterPage to) =>
      "${from.name}>>${to.name}";  // TODO: make this better
      
  /// Checks whether this choice has already been presented to the player
  /// but wasn't picked. This means we shouldn't add any points on this
  /// page. (No points for second guessing.)
  bool _alreadyOffered(EgbScripterPage from, EgbScripterPage to) =>
      _playerChronology.contains(_createLinkHash(from, to));

  void initBlock();

  int currentBlockIndex;  // the current position in the current page's blocks list

  /**
   * This Map is filled in ScripterImpl automatically by the Builder. 
   * The purpose of [_constructors] is to make it possible to assemble
   * [vars] variables of custom types (by [Class.fromMap()] constructors) 
   * without the need of full scale reflection.
   * 
   * See https://www.pivotaltracker.com/story/show/43483599 for more context.
   * 
   * An example definition of [_constructors]:
   * 
   *     _constructors = {
   *       "ClassA": (map) => new ClassA.fromMap(map),
   *       "ClassB": (map) => new ClassB.fromMap(map)
   *     };
   */
  Map<String,Function> _constructors;

  // -- private members below
  SendPort _runnerPort;

  EgbScripter() : super() {
    DEBUG_SCR("Scripter has been created.");
    _nextScriptStack = new List<ScriptBlock>();
    _playerChronology = new Set<String>();
    _initScriptEnvironment();

    // start the loop
    port.receive(_messageReceiveCallback);
  }
  
  /**
   * Utilify function [_send] sends message through the [_runnerPort] to the
   * Runner.
   */
  void _send(EgbMessage message) {
    if (_runnerPort == null) throw new StateError("Cannot send message "
                                             "when _runnerPort is null.");
    _runnerPort.send(message.toJson(), port.toSendPort());
  }

  /**
   * Called on receiving a message from Runner. Handles the message and replies
   * when needed.
   */
  void _messageReceiveCallback(String messageJson, SendPort replyTo) {
    EgbMessage message = new EgbMessage.fromJson(messageJson);
    _runnerPort = replyTo;

    switch (message.type) {
      case EgbMessage.QUIT:
        // Just close the book, no need to answer.
        port.close();
        return;
      case EgbMessage.GET_BOOK_UID:
        // Identify this egamebook by UID.
        // TODO: get UID from meta information
        _send(new EgbMessage.BookUid("DEFAULT_BOOK_UID")); 
        return;
      case EgbMessage.OPTION_SELECTED:
        _send(_handleOptionSelected(message));
        return;
      case EgbMessage.START:
        currentBlockIndex = null;
        _nextScriptStack.clear();
        choices.clear();
        _initScriptEnvironment();
        pageMap.clearState();
        _playerChronology.clear();
        _playerChronologyChanged = true;
        currentPage = firstPage;
        break;
      case EgbMessage.LOAD_GAME:
        currentBlockIndex = null;
        _nextScriptStack.clear();
        choices.clear();
        _initScriptEnvironment();
        pageMap.clearState();
        _loadFromSaveGameMessage(message);
        break;
    }
    
    if (!_points.pointsAwards.isEmpty) {
      var award = _points.pointsAwards.removeFirst();
      _send(new EgbMessage.PointsAward(award.points, award.justification));
      return;
    }
    
    if (_playerChronologyChanged) {
      _playerChronologyChanged = false;
      _send(new EgbMessage.SavePlayerChronology(_playerChronology));
      return;
    }
    
    // We can now handle the next block on the page.
    _send(_goOneStep(message));
  }
  
  /**
   * Handles the Runner's reply to MSG_SHOW_CHOICES (i.e. the choice picked).
   * Returns either EgbMessage.NoResult or an EgbMessage with the text that 
   * the selected choice's inline script returned.
   */
  EgbMessage _handleOptionSelected(EgbMessage message) {
    choices.forEach((choice) {
      if (choice.hash == message.intContent) {
        // This choice was taken.
        DEBUG_SCR("Found choice that was selected: ${choice.string}");
        _pickChoice(choice);
      } else {
        // This choice was offered but not taken. Put into the
        // _gotoLinksAlreadyOffered set. The selected choice will
        // be put there after the player walked through the page till
        // the end (otherwise, no points would ever be awarded).
        if (choice.goto != null) {
          _playerChronology.add(
              _createLinkHash(currentPage, 
                  pageMap.getPage(
                      choice.goto, 
                      currentGroupName: currentPage.groupName)));
          _playerChronologyChanged = true;
        }
      }
    });
    return new EgbMessage.NoResult();
  }

  void _pickChoice(EgbChoice choice) {
    if (choice.f != null) {
      nextScript(choice.f);
    }
    if (choice.goto != null) {
      _performGoto(choice.goto);
    }
    choice.shown = true;  // Mark as shown even if it was picked automatically.
  }

  /** 
   * Walks through the instructions, one block at a time.
   * Returns message for Runner.
   */
  EgbMessage _goOneStep(EgbMessage incomingMessage) {
    bool endOfPage = currentBlockIndex == currentPage.blocks.length - 1;
    
    choices.removeWhere((choice) => choice.shown || 
        _leadsToIllegalPage(choice));
    if (!choices.isEmpty) {
      DEBUG_SCR("$choices");
      if (choices.any((choice) => choice.isActionable(endOfPage: endOfPage))) {
        return choices.toMessage(endOfPage: endOfPage);
      } else {
        _pickChoice(choices.firstWhere((choice) => choice.isAutomatic));
      }
    }
    
    if (!_nextScriptStack.isEmpty) {
      // previous script asked for nextScript()
      ScriptBlock script = _nextScriptStack.removeLast();
      return _runScriptBlock(script:script);
    }
    
    if (_gotoPageName != null) {
      // someone called the top level function [goto]
      _performGoto(_gotoPageName);
      _gotoPageName = null;
      return new EgbMessage.NoResult();
    }

    // increase currentBlock, but not if previous script called "repeatBlock();"
    if (currentBlockIndex == null) {
      // we just came to this page
      if (incomingMessage.type == EgbMessage.LOAD_GAME) {
        // SaveGames are always made just before the page's last block
        // (choiceList). Jump there.
        currentBlockIndex = currentPage.blocks.length - 1;
      } else {
        currentBlockIndex = 0;
      }
    } else if (_repeatBlockBit) {
      _repeatBlockBit = false;
    } else {
      currentBlockIndex++;
    }

    // Resolve current block.
    if (currentBlockIndex >= currentPage.blocks.length) {
      // At the end of page.
      assert(!choices.any((choice) => !choice.shown));
      DEBUG_SCR("End of book.");
      // TODO: Make the saving, then ending a little less hacky.
      if (currentBlockIndex == currentPage.blocks.length) {
        return _createSaveGame().toMessage(EgbMessage.SAVE_GAME);
      }
      return new EgbMessage.EndOfBook();
    } else if (currentPage.blocks[currentBlockIndex] is String) {
      // Just an ordinary paragraph, no script.
      return new EgbMessage.TextResult(currentPage.blocks[currentBlockIndex]);
    } else if (currentPage.blocks[currentBlockIndex] is List) {
      // A ChoiceList block.
      choices.addFromScripterList(currentPage.blocks[currentBlockIndex]);
      if (choices.any((choice) => choice.isActionable(endOfPage: endOfPage,
            filterOut: _leadsToIllegalPage)) && 
          currentBlockIndex == currentPage.blocks.length - 1) {
          // Last block on page. Save the game.
          return _createSaveGame().toMessage(EgbMessage.SAVE_GAME);
      }
      return new EgbMessage.NoResult();
    } else if (currentPage.blocks[currentBlockIndex] is ScriptBlock) {
      // A script block.
      return _runScriptBlock(script: currentPage.blocks[currentBlockIndex]);
    }
  }

  void _performGoto(String dest) {
    EgbScripterPage _gotoPage;
    int _gotoBlockIndex;
    
    if (EgbChoice.GO_BACK.hasMatch(dest)) {
      // A [<<<] goto.
      if (_preGotoPosition == null) {
        throw new StateError("Cannot use [${EgbChoice.GO_BACK}] when there is "
            "no _preGotoPosition.");
      }
      _gotoPage = _preGotoPosition.page;
      // Decresing block index by one because it will be automatically increased
      // in _goOneStep.
      _gotoBlockIndex = _preGotoPosition.blockIndex - 1;
    } else {
      // Normal goto.
      _gotoPage = pageMap.getPage(
          dest, currentGroupName: currentPage.groupName);
      _gotoBlockIndex = null;
      if (_gotoPage == null) {
        throw "Function goto() called with an invalid argument '$dest'. "
            "No such page.";
      }
    }
    
    if (previousPage != null) {
      // Now that we're through this page, we should add the link that
      // lead the player here. This will prevent the player from getting
      // points twice (even from the PlayerChronology perspective).
      // This is an acceptable punishment for loading.
      // If this wasn't here:
      //   - going back and choosing the same path would award the same points
      //     (okay)
      //   - going back and choosing different path would not award anything
      //     (okay)
      //   - going back again and choosing the old path would suddenly _not_
      //     award any points (because the link is now among
      //     _gotoLinksAlreadyOffered) (confusing)
      _playerChronology.add(
          _createLinkHash(previousPage, currentPage));
      _playerChronologyChanged = true;
      // TODO: save _preGotoPosition in savegame!
    }
    
    // Raise or lower the points embargo (no points for second-guessing,
    // and no points for visiting for the second time). 
    _pointsEmbargo = _alreadyOffered(currentPage, _gotoPage) ||
        _gotoPage.visited;
    
    _preGotoPosition = new EgbScripterBlockPointer(currentPage, 
        currentBlockIndex);
    currentPage = _gotoPage;
    currentBlockIndex = _gotoBlockIndex;
    previousPage.visitCount += 1;
  }
  
  void _initScriptEnvironment() {
    choices.clear();
    vars.clear();
    vars["points"] = _points;
    _points.clear();

    initBlock();  // run contents of <variables>
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
  EgbMessage _runScriptBlock({ScriptBlock script}) {
    // clean up
    textBuffer = new StringBuffer();

    // run the actual script
    try {
      if (script == null) {
        currentPage.blocks[currentBlockIndex]();
      } else {
        script();
      }
    } catch (e, stacktrace) {
      textBuffer.write("<code><pre>ERROR: $e\n\n$stacktrace</pre></code>");
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
    if (EgbChoice.GO_BACK.hasMatch(choice.goto)) return false;
    var targetPage =
        pageMap.getPage(choice.goto, currentGroupName: currentPage.groupName);
    if (targetPage == null) return true;
    return targetPage.visitOnce && targetPage.visited;
  }

  EgbSavegame _createSaveGame() {
    return new EgbSavegame(currentPage.name, vars,
        pageMap.exportState());
  }

  /**
   * Tak EgbMessage of type LOAD_GAME and populate the current game
   * state with its contents. This includes both the Story Chronology (where
   * the story is right now) and the Player Chronology (what the player has
   * seen already, including blind alleys and consecutive reloads).
   */
  void _loadFromSaveGameMessage(EgbMessage message) {
    if (message.type != EgbMessage.LOAD_GAME) throw new ArgumentError("Invalid "
                                             "message type (${message.type}).");
    var savegame = new EgbSavegame.fromMessage(message);

    if (pageMap[savegame.currentPageName] == null) {
      throw "Trying to load page '${savegame.currentPageName}' which doesn't "
            "exist in current egamebook.";
    }
    currentPage = pageMap[savegame.currentPageName];

    pageMap.importState(savegame.pageMapState);
    
    if (message.listContent != null) {
      // This happens only at each new game session start. Normal LOAD_GAME
      // messages have listContent == null.
      _playerChronology.addAll(message.listContent);
    }

    var _constructors = {};
    // copy saved variables over vars
    EgbSavegame.importSavegameToVars(savegame, vars, 
                                     constructors: _constructors); // TODO
  }
}

typedef void ScriptBlock();