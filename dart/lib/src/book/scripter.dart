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
    textBuffer.add(" ");  // Implicitly add space between each echo().
  }
  textBuffer.add(str);
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
EgbChoice choice(String string, [String goto, Function script, bool showNow=true]) {
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
  Scripter is the class that runs the actual game and sends Messages to UserInterface.
  It is subclassed by ScripterImpl, which is built from .egb the file by egb_builder.
  */
abstract class EgbScripter {
  /// The unique id of this particular gamebook. Used for saving.
  String gamebookUid;

  EgbScripterPageMap pageMap;
  EgbScripterPage firstPage;
  EgbScripterPage previousPage;
  EgbScripterPage currentPage;
  EgbScripterPage _nextPage;
  
  /// Goto links (page1 -> page 2) that have been shown to the player, but
  /// not picked. Links are represented by hashes created by
  /// [_createLinkHash].
  /// This is important for the  "No points for second guessing" rule.
  Set<String> _playerChronology;
  
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

  // -- private members below

  SendPort _runnerPort;

  /**
    When a block/script/choice call for a script to be called afterwards,
    it ends up on this FIFO stack.
    */
  List<Function> _nextScriptStack;

  EgbScripter() : super() {
    DEBUG_SCR("Scripter has been created.");
    _nextScriptStack = new List<Function>();
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
      case EgbMessage.MSG_QUIT:
        // Just close the book, no need to answer.
        port.close();
        return;
      case EgbMessage.MSG_GET_BOOK_UID:
        // Identify this egamebook by UID.
        // TODO: get UID from meta information
        _send(new EgbMessage.BookUid("DEFAULT_BOOK_UID")); 
        return;
      case EgbMessage.MSG_OPTION_SELECTED:
        _send(_handleOptionSelected(message));
        return;
      case EgbMessage.MSG_START:
        currentBlockIndex = null;
        _nextScriptStack.clear();
        choices.clear();
        _initScriptEnvironment();
        pageMap.clearState();
        _playerChronology.clear();
        currentPage = firstPage;
        break;
      case EgbMessage.MSG_LOAD_GAME:
        currentBlockIndex = null;
        _nextScriptStack.clear();
        choices.clear();
        _initScriptEnvironment();
        pageMap.clearState();
        _loadFromSaveGameMessage(message);
        break;
    }
    _send(_goOneStep(message));
  }
  
  /**
   * Handles the Runner's reply to MSG_SHOW_CHOICES (i.e. the choice picked).
   * Returns either EgbMessage.NoResult or an EgbMessage with the text that 
   * the selected choice's inline script returned.
   */
  EgbMessage _handleOptionSelected(EgbMessage message) {
    EgbMessage returnMessage;
    choices.forEach((choice) {
      if (choice.hash == message.intContent) {
        // This choice was taken.
        DEBUG_SCR("Found choice that was selected: ${choice.string}");
        if (choice.goto != null) {
          goto(choice.goto);
        }
        if (choice.f != null) {
          returnMessage = _runScriptBlock(script:choice.f);
        }
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
        }
      }
    });
    if (returnMessage != null) {
      return returnMessage;
    } else {
      return new EgbMessage.NoResult();
    }
  }

  /** 
   * Walks through the instructions, one block at a time.
   * Returns message for Runner.
   */
  EgbMessage _goOneStep(EgbMessage incomingMessage) {
    if (!_points.pointsAwards.isEmpty) {
      // Send awarded points before continuing.
      var award = _points.pointsAwards.removeFirst();
      return new EgbMessage.PointsAward(award.points, award.justification);
    }

    // if previous script asked for nextScript()
    if (!_nextScriptStack.isEmpty) {
      Function script = _nextScriptStack.removeLast();
      return _runScriptBlock(script:script);
    }

    // if previous script asked to jump to a new page, then jump
    if (_nextPage != null) {
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
        // TODO: save previousPage in savegame!
      }
      
      // Raise or lower the points embargo (no points for second-guessing,
      // and no points for visiting for the second time). 
      _pointsEmbargo = _alreadyOffered(currentPage, _nextPage) ||
          _nextPage.visited;
      
      previousPage = currentPage;
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
        // (choiceList). Jump there.
        currentBlockIndex = currentPage.blocks.length - 1;
      } else {
        currentBlockIndex = 0;
      }
      currentPage.visitCount += 1;
    } else if (_repeatBlockBit) {
      _repeatBlockBit = false;
    } else {
      currentBlockIndex++;
    }

    // Resolve current block.
    if (currentBlockIndex >= currentPage.blocks.length) {
      // At the end of page.
      if (choices.any((choice) => !choice.shown)) {
        return choices.toMessage(
                  endOfPage: true,
                  filterOut: _leadsToIllegalPage);
      } else {
        return new EgbMessage.EndOfBook();
      }
    } else if (currentPage.blocks[currentBlockIndex] is String) {
      // Just an ordinary paragraph, no script.
      return new EgbMessage.TextResult(currentPage.blocks[currentBlockIndex]);
    } else if (currentPage.blocks[currentBlockIndex] is List) {
      // ChoiceList.
      choices.addFromScripterList(currentPage.blocks[currentBlockIndex]);
      if (currentBlockIndex == currentPage.blocks.length - 1 &&
          choices.areActionable) {
        // Last block on page. Save the game.
        return _createSaveGame();
      } else {
        return choices.toMessage(
                  endOfPage: false,
                  filterOut: _leadsToIllegalPage);
      }
    } else if (currentPage.blocks[currentBlockIndex] is Function) {
      // A script paragraph.
      return _runScriptBlock(script: currentPage.blocks[currentBlockIndex]);
    }
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
  EgbMessage _runScriptBlock({Function script}) {
    // clean up
    textBuffer.clear();
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
    var savegame = new EgbSavegame(currentPage.name, vars,
        pageMap.exportState());
    var message = savegame.toMessage(EgbMessage.MSG_SAVE_GAME);
    return message;
  }

  void _loadFromSaveGameMessage(EgbMessage message) {
    var savegame = new EgbSavegame.fromMessage(message);

    if (pageMap[savegame.currentPageName] == null) {
      throw "Trying to load page '${savegame.currentPageName}' which doesn't "
            "exist in current egamebook.";
    }

    DEBUG_SCR("Starting from a savegame");
    currentPage = pageMap[savegame.currentPageName];

    pageMap.importState(savegame.pageMapState);

    // copy saved variables over vars
    var _constructors = {};
    EgbSavegame.importSavegameToVars(savegame, vars, 
                                     constructors: _constructors); // TODO
  }
}