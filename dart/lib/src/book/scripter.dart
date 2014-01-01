library egb_scripter;


import 'dart:isolate';
import 'dart:collection';
import 'dart:mirrors';

import '../shared/message.dart';
import '../shared/user_interaction.dart';
import '../persistence/savegame.dart';
import '../shared/page.dart';
import '../shared/points_award.dart';
import 'author_script_exception.dart';

import '../shared/stat.dart';
export '../shared/stat.dart';

import '../persistence/saveable.dart';
export '../persistence/saveable.dart';

part 'scripter_page.dart';
part 'points_counter.dart';

/**
 * The StringBuffer which collects all echo()'d strings to put them all
 * together at the end of a script block and send them to the Runner 
 * (and therefore, the player). [textBuffer] is only used for text output
 * generated inside <script> tags (through [echo()]).
 */
final StringBuffer textBuffer = new StringBuffer();

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

/**
 * This is the page name that was most recently called in a [:goto(name):]
 * statement (or [:null:] if there was no recent call). Author should
 * seldom access this field. Instead, they should use the [goto] function.
 * 
 * The variable is automatically reset to [:null:] by Scripter once the jump
 * has been done.
 */
String gotoPageName;
bool get gotoCalledRecently => gotoPageName != null;

/**
 * By calling [goto()], you're saying you want to change page to [pageName].
 * You can specify the page name in full (i.e. including the group name)
 * or in short (i.e. without group name).
 * 
 * This is a global, author-facing function. It will store
 * the name of the page in a variable that is later used to get the actual
 * page inside [EgbScripter]. 
 */
void goto(String pageName) {
  gotoPageName = pageName;
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
 * 
 * Points are a special kind of [Stat] in that they, for example, cannot be
 * received twice for visiting one page, and they aren't awarded when player
 * goes back and second-guesses a choice.
 */
final PointsCounter _points = new PointsCounter();

/**
 * List of choices to be shown to the player.
 */
final EgbChoiceList choices = new EgbChoiceList();

/**
 * Utility shortcut for creating new choices. 
 * 
 * When [deferToChoiceList] is set to [:true:], the choice will not be shown 
 * until there is a choiceList on the page.
 */
EgbChoice choice(String string, {String goto, ScriptBlock script, 
                                 bool deferToEndOfPage: false, 
                                 bool deferToChoiceList: false}) {
  EgbChoice choice = new EgbChoice(string, goto:goto, script:script, 
      deferToEndOfPage: deferToEndOfPage, deferToChoiceList: deferToChoiceList);
  choices.add(choice);
  return choice;
}

/**
 * The map holding all author-defined variables. This is accessed either
 * by [:vars["name"]:], but thanks to noSuchMethod override, 
 * also by just [:name:].
 */
final Map<String, dynamic> vars = new Map<String, dynamic>();

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
it ends up on this FILO stack.
 */
final Queue<ScriptBlock> _nextScriptStack = new Queue<ScriptBlock>();

/// Adds a script to the stack of scripts.
void nextScript(ScriptBlock f) {
  _nextScriptStack.addLast(f);
}

/// Constructors and functions can check for [isInInitBlock] and might choose
/// to throw an Exception. For example, if an unsaveable property is changed
/// during a <script> block.
void throwIfNotInInitBlock([String customMessage = ""]) {
  if (isInInitBlock == false) {
    throw new StateError("An initialization code meant for the initBlock "
        "(inside the <variables> tag) was called outside of it (probably "
        "in a <script> tag). $customMessage");
  }
}

/// Internal state variable for [_throwIfNotInInitBlock].
bool isInInitBlock = false;

/**
 * Scripter is the class that runs the actual game and sends Messages to
 * the Interface through Runner. It is subclassed by ScripterImpl, which is 
 * built from .egb file by egb_builder.
 */
abstract class EgbScripter {
  /// The unique id of this particular gamebook. Used for saving.
  String gamebookUid;

  /// Information about all pages, their visit counts, and more.
  final EgbScripterPageMap pageMap = new EgbScripterPageMap();
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
  final Set<String> _playerChronology  = new Set<String>();
  
  /// Signifies that the [_playerChronology] has changed and needs to be
  /// sent to Runner.
  bool _playerChronologyChanged = false;
  
  /// Create a unique hash that identifies a path from one page to another.
  String _createLinkHash(EgbScripterPage from, EgbScripterPage to) =>
      "${from.name}>>${to.name}";  // TODO: make this better
      
  /// Checks whether this choice has already been presented to the player
  /// but wasn't picked. This means we shouldn't add any points on this
  /// page. (No points for second guessing.)
  bool _alreadyOffered(EgbScripterPage from, EgbScripterPage to) =>
      _playerChronology.contains(_createLinkHash(from, to));

  /// The block in which variables are set (it corresponds to the <variables>
  /// block in .egb).
  void initBlock();

  /// The current position in the current page's blocks list.
  int currentBlockIndex;

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

  /// Port for communication with the Runner (and through it, the Interface,
  /// and the player).
  SendPort _runnerPort;
  
  ReceivePort port;

  EgbScripter(SendPort mainIsolatePort) {
    DEBUG_SCR("Scripter has been created.");

    _runnerPort = mainIsolatePort;
    port = new ReceivePort();
    // Register the callback for communication with the Runner.
    port.listen(_messageReceiveCallback);
    _runnerPort.send(port.sendPort);
  }
  
  /// A cache of text messages so we can send them all together instead of
  /// one by one.
  final List<EgbMessage> _textMessageCache = new List<EgbMessage>();
  EgbMessage _messageBacklog;
  
  /**
   * Utilify function [_send] sends message through the [_runnerPort] to the
   * Runner. 
   */
  void _send(EgbMessage message) {
    if (_runnerPort == null) {
      // No big deal when trying to send a log (console) message.
      if (message.type == EgbMessage.SCRIPTER_LOG) return;  
      // Big deal in other circumstances.
      throw new StateError("Cannot send message when _runnerPort is null.");
    }
    if (message.isAsync) {
      //DEBUG_SCR("Sending nonText async message (${message.type})");
      _runnerPort.send(message.toMap());
      return;
    }
    if (message.type == EgbMessage.TEXT_RESULT) {
      // Put text result into the _textMessageCache.
      if (message.strContent != "") _textMessageCache.add(message);
      _runnerPort.send(new EgbMessage.NoResult().toMap()); // TODO: this is here just because we need to keep the loop going – get rid of it
    } else if (_textMessageCache.isEmpty) {
      DEBUG_SCR("Sending nonText message ($message)");
      _runnerPort.send(message.toMap());
    } else {
      // When we have something in the _textMessageCache and we are about to
      // send something new, we first zip the text messages into one huge
      // message, wait for it to be shown (through port.call()), and only then
      // send the original message.
      var stringBuffer = new StringBuffer();
      while (_textMessageCache.isNotEmpty) {
        if (stringBuffer.isNotEmpty) stringBuffer.write("\n\n");
        stringBuffer.write(_textMessageCache.removeAt(0).strContent);
      }
      var zipMessage = new EgbMessage.TextResult(stringBuffer.toString());
      DEBUG_SCR("Sending a zip message ($zipMessage)");
      _runnerPort.send(zipMessage.toMap());
      DEBUG_SCR("Adding message ($message) to the backlog.");
      _messageBacklog = message;
    }
  }
  
  /**
   * Called on receiving a message from Runner. Handles the message and replies
   * when needed.
   */
  void _messageReceiveCallback(Object _message) {
    if (_message is SendPort) {
      _runnerPort.send(port.sendPort);
      return;
    }
    Map<String,Object> messageMap = _message as Map<String,Object>;
    EgbMessage message = new EgbMessage.fromMap(messageMap);
    
    // Solve backlog. TODO: do better
    if (_messageBacklog != null) {
      assert(message.type == EgbMessage.CONTINUE);
      _send(_messageBacklog);
      _messageBacklog = null;
      return;
    }

    switch (message.type) {
      case EgbMessage.QUIT:
        // Just close the book, no need to answer.
        port.close();
        return;
      case EgbMessage.REQUEST_BOOK_UID:
        // Identify this egamebook by UID.
        // TODO: get UID from meta information
        DEBUG_SCR("GET_BOOK_UID received.");
        _send(new EgbMessage.BookUid("DEFAULT_BOOK_UID")); 
        return;
      case EgbMessage.CHOICE_SELECTED:
        _handleChoiceSelected(message);
        break;
      case EgbMessage.START:
        DEBUG_SCR("Starting book from scratch.");
        try {
          _restart();
        } catch (e, stacktrace) {
          _send(new EgbMessage.ScripterError(
              "An error occured when initializing: $e.\n"
              "$stacktrace"));
          throw e;
        }
        _send(Stat.toMessage());
        _send(new PointsAward(0, 0).toMessage());
        return;
      case EgbMessage.LOAD_GAME:
        DEBUG_SCR("Loading a saved game.");
        try {
          _initScriptEnvironment();
        } catch (e, stacktrace) {
          _send(new EgbMessage.ScripterError(
              "An error occured when initializing: $e.\n"
              "$stacktrace"));
          throw e;
        }
        try {
          _loadFromSaveGameMessage(message);
        } on IncompatibleSavegameException catch (e, stacktrace) { 
          // don't 
          _send(new EgbMessage.ScripterError(
              "Load failed due to incompatibility: $e.\n"
              "$stacktrace"));
          _restart();
        } catch (e, stacktrace) { 
          // XXX: get rid of this once all possible errors are encapsulated in SavegameExpceptions?
          _send(new EgbMessage.ScripterError(
              "Load failed for unknown reason: $e.\n"
              "$stacktrace"));
          _restart();
        }
        _send(Stat.toMessage());
        _send(new PointsAward(0, _points.sum).toMessage());
        return;
    }
    
    if (!_points.pointsAwards.isEmpty) {
      DEBUG_SCR("Awarding points.");
      var award = _points.pointsAwards.removeFirst();
      _send(new PointsAward(award.addition, award.result, award.justification)
            .toMessage());
      return;
    }
    
    if (Stat.someChanged) {
      DEBUG_SCR("Sending updated stats.");
      _send(Stat.toMessage(changedOnly: true));
    }
    
    if (_playerChronologyChanged) {
      DEBUG_SCR("Saving player chronology.");
      _playerChronologyChanged = false;
      _send(new EgbMessage.SavePlayerChronology(_playerChronology));
      //print(_playerChronology);
    }
    
    // We can now handle the current block on the page.
    EgbMessage returnMessage;
    do {
      DEBUG_SCR("Calling _goOneStep().");
      try {
        returnMessage = _goOneStep(message);
      } on AuthorScriptException catch (e, stacktrace) {
        _send(new EgbMessage.ScripterError("$e\nStacktrace: $stacktrace"));
        port.close();
        return;
      } catch (e, stacktrace) {
        _send(new EgbMessage.ScripterError("$e\nStacktrace: $stacktrace"));
        port.close();
        return;
      }
    } while (returnMessage == null);
    _send(returnMessage);
  }

  /**
   * Restarts the Scripter environment to the beginning.
   */
  void _restart() {
    _initScriptEnvironment();
    _playerChronology.clear();
    _playerChronologyChanged = true;
    currentPage = firstPage;
  }
  
  /**
   * Handles the Runner's reply to MSG_SHOW_CHOICES (i.e. the choice picked).
   */
  void _handleChoiceSelected(EgbMessage message) {
    assert(message.type == EgbMessage.CHOICE_SELECTED);
    EgbChoice pickedChoice;
    choices.forEach((choice) {
      if (choice.hash == message.intContent) {
        // This choice was taken.
        DEBUG_SCR("Found choice that was selected: ${choice.string}");
        pickedChoice = choice;
      } else {
        // This choice was offered but not taken. Put into the
        // _gotoLinksAlreadyOffered set. 
        // Note that the _selected_ choice (above) will
        // be put there after the player walked through the page till
        // the end (otherwise, no points would ever be awarded).
        if (choice.goto != null) {
          EgbScripterPage toPage;
          if (EgbChoice.GO_BACK.hasMatch(choice.goto)) {
            toPage = _preGotoPosition.page;
          } else {
            toPage = pageMap.getPage(choice.goto,
                currentGroupName: currentPage.groupName);
          }
          
          if (toPage != null) {
            _playerChronology.add(_createLinkHash(currentPage, toPage));
            _playerChronologyChanged = true;
          }
        }
      }
    });
    if (pickedChoice == null) {
      throw new ArgumentError("The sent choice hash is not one of those "
          "offered.");
    }
    _pickChoice(pickedChoice);
  }

  /**
   * Picks the given [choice], i.e. runs the script and performs the goto.
   */
  void _pickChoice(EgbChoice choice) {
    if (choice.f != null) {
      nextScript(choice.f);  // Wait for next iteration before running the 
                             // script. 
    }
    if (choice.goto != null) {
      _performGoto(choice.goto);
    }
    choice.shown = true;  // Mark as shown even if it was picked automatically.
  }

  /** 
   * Walks through the instructions, one block at a time.
   * Returns message for Runner (with text, choices, etc.) or [:null:] when 
   * there is no message needed (and therefore, the method can be called
   * another time).
   */
  EgbMessage _goOneStep(EgbMessage incomingMessage) {
    bool atEndOfPage = currentBlockIndex == currentPage.blocks.length - 1;
    bool atStaticChoiceList = 
        currentBlockIndex != null &&
        currentBlockIndex < currentPage.blocks.length &&
        currentPage.blocks[currentBlockIndex] is List;
    DEBUG_SCR("atEndOfPage = $atEndOfPage, atStaticChoiceList = $atStaticChoiceList");
    
    choices.removeWhere((choice) => choice.shown || 
        _leadsToIllegalPage(choice));
    if (!choices.isEmpty) {
      DEBUG_SCR("We have choices.");
      bool someChoicesAreActionable = choices.any((EgbChoice choice) =>
        choice.isActionable(
            atEndOfPage: atEndOfPage,
            atChoiceList: atStaticChoiceList));
      if (someChoicesAreActionable) {
        return choices.toMessage(
            atEndOfPage: atEndOfPage, 
            atChoiceList: atStaticChoiceList);
      } else {
        EgbChoice autoChoice = 
            choices.firstWhere((choice) => choice.isAutomatic,
                orElse: () => null);
        if (autoChoice != null) {
          _pickChoice(autoChoice);
        }
      }
    }
    
    if (!_nextScriptStack.isEmpty) {
      // previous script asked for nextScript()
      ScriptBlock script = _nextScriptStack.removeLast();
      return _runScriptBlock(script);
    }
    
    if (gotoPageName != null) {
      // someone called the top level function [goto]
      _performGoto(gotoPageName);
      gotoPageName = null;
      return null;
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

    // Because currentBlockIndex could have changed, we need to update
    // also atEndOfPage.
    atEndOfPage = currentBlockIndex == currentPage.blocks.length - 1;
    
    // Resolve current block.
    DEBUG_SCR("Resolving block: '${currentPage.name}' block $currentBlockIndex.");
    if (currentBlockIndex == currentPage.blocks.length) {
      // At the end of page.
      assert(!choices.any((choice) => !choice.shown));  // Should have been handled above.
      DEBUG_SCR("End of book.");
      _send(_createSaveGame().toMessage(EgbMessage.SAVE_GAME));  // End book save.
      return new EgbMessage.EndOfBook();
    }
    
    if (currentPage.blocks[currentBlockIndex] is String) {
      // Just an ordinary paragraph, no script.
      // TODO: create _textMessageCache here and not in _send()
      return new EgbMessage.TextResult(currentPage.blocks[currentBlockIndex]);
    } else if (currentPage.blocks[currentBlockIndex] is List) {
      // A ChoiceList block.
      DEBUG_SCR("A ChoiceList encountered.");
      try {
        choices.addFromScripterList(currentPage.blocks[currentBlockIndex]);
      } on AuthorScriptException catch (e, stacktrace) {
        _send(new EgbMessage.ScripterError("$e\nStacktrace: $stacktrace"));
      }
      DEBUG_SCR("- choices added");
      if (choices.any((choice) => choice.isActionable(  // TODO: make DRY
            atEndOfPage: atEndOfPage,
            atChoiceList: true,
            filterOut: _leadsToIllegalPage)) && 
          currentBlockIndex == currentPage.blocks.length - 1) {
          // Last block on page. Save the game.
          DEBUG_SCR("Creating & sending savegame");
          _send(_createSaveGame().toMessage(EgbMessage.SAVE_GAME));
      }
    } else if (currentPage.blocks[currentBlockIndex] is ScriptBlock) {
      // A script block.
      // TODO: create _textMessageCache here and not in _send()
      var savegame = null;
      if (currentBlockIndex == currentPage.blocks.length - 1) {
        // Last block on page. Save the game.
        savegame = _createSaveGame();
      }
      var scriptMessage = 
          _runScriptBlock(currentPage.blocks[currentBlockIndex]);
      
      if (choices.any((choice) => choice.isActionable(
            atEndOfPage: atEndOfPage,
            atChoiceList: true,
            filterOut: _leadsToIllegalPage)) &&
          currentBlockIndex == currentPage.blocks.length - 1) {
        assert(savegame != null);
        // TODO deep compare assert((savegame as EgbSavegame).vars == _createSaveGame().vars);
        _send(savegame.toMessage(EgbMessage.SAVE_GAME));
      }
      return scriptMessage;
    }
  }

  /**
   * Takes the [dest] string and converts it to an actual [EgbScripterPage].
   * Solves for special goto destination [:<<<:] (i.e. go back) and for when
   * the page groupName is omitted.
   */
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
      // The [:<<<:] not only goes to a page, but also to an exact block on that
      // page. We are decresing block index by one because it will be 
      // automatically increased in _goOneStep.
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
    // When previous page was visited before, that means it's a recurring
    // node and therefore links leading from it should not be embargoed.
    // See https://www.pivotaltracker.com/story/show/52581979
    _pointsEmbargo = 
        (_alreadyOffered(currentPage, _gotoPage) || _gotoPage.visited) &&
        (previousPage != null && !previousPage.visited);
    
    _preGotoPosition = new EgbScripterBlockPointer(currentPage, 
        currentBlockIndex);
    currentPage = _gotoPage;
    currentBlockIndex = _gotoBlockIndex;
    previousPage.visitCount += 1;
  }
  
  /// (Re-)initializes the environment after starting or loading a new game.
  void _initScriptEnvironment() {
    currentBlockIndex = null;
    _nextScriptStack.clear();
    choices.clear();
    vars.clear();
    vars["points"] = _points;
    _points.clear();
    if (pageMap != null) pageMap.clearState();

    isInInitBlock = true;
    initBlock();  // run contents of <variables>
    isInInitBlock = false;
  }

  noSuchMethod(Invocation invocation) {
    String memberName = MirrorSystem.getName(invocation.memberName);
    if (invocation.isGetter) {
      return vars[memberName];
    } else if (invocation.isSetter) {
      memberName = memberName.replaceAll("=", ""); // fix feature in Dart that sets memberName to "variable=" when setter
      vars[memberName] = invocation.positionalArguments[0];
      return null;
    } else if (invocation.isMethod && vars.containsKey(memberName) && 
        vars[memberName] is Function) {
      return Function.apply(vars[memberName], invocation.positionalArguments,
          invocation.namedArguments);
    } else {
      throw new NoSuchMethodError(this, invocation.memberName,
          invocation.positionalArguments, 
          null //TODO: invocation.namedArguments
          );
    }
  }

  /// Runs the specified script block, catches exceptions and returns generated
  /// text.
  EgbMessage _runScriptBlock(ScriptBlock script) {
    // clean up
    textBuffer.clear();

    // run the actual script
    try {
      script();
    } catch (e, stacktrace) {
      textBuffer.write("<code><pre>ERROR: $e\n\n$stacktrace</pre></code>");
      throw new AuthorScriptException(e.toString());
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
    if (targetPage == null) {
      DEBUG_SCR("Target page '${choice.goto}' was not found.");
      return true;
    }
    bool revisitingVisitOncePage = targetPage.visitOnce && targetPage.visited;
    if (revisitingVisitOncePage) {
      DEBUG_SCR("Trying to revisit a visitOnce page.");
      return true;
    } else {
      return false;
    }
  }

  EgbSavegame _createSaveGame() {
    try {
      return new EgbSavegame(currentPage.name, vars,
          pageMap.exportState());
    } catch (e, stacktrace) {
      _send(new EgbMessage.ScripterError("Error when creating savegame: $e\n"
          "$stacktrace"));
      throw e;
    }
  }

  /**
   * Take EgbMessage of type LOAD_GAME and populate the current game
   * state with its contents. This includes both the Story Chronology (where
   * the story is right now) and the Player Chronology (what the player has
   * seen already, including blind alleys and consecutive reloads).
   */
  void _loadFromSaveGameMessage(EgbMessage message) {
    if (message.type != EgbMessage.LOAD_GAME) {
      throw new ArgumentError("Invalid message type (${message.type}).");
    }
    var savegame = new EgbSavegame.fromMessage(message);

    if (pageMap[savegame.currentPageName] == null) {
      throw new IncompatibleSavegameException("Trying to load page "
          "'${savegame.currentPageName}' which doesn't exist in current "
          "egamebook.");
    }
    currentPage = pageMap[savegame.currentPageName];

    DEBUG_SCR("Importing state from savegame.");
    pageMap.importState(savegame.pageMapState);
    
    if (message.listContent != null) {
      // This happens only at each new game session start. Normal LOAD_GAME
      // messages have listContent == null.
      DEBUG_SCR("Importing player chronology.");
      _playerChronology.addAll(message.listContent);
    }

    var _constructors = {};
    
    // copy saved variables over vars
    DEBUG_SCR("Copying save variables into vars.");
    EgbSavegame.importSavegameToVars(savegame, vars, 
                                     constructors: _constructors); // TODO
    DEBUG_SCR("_loadFromSaveGameMessage() done.");
  }
  
  void DEBUG_SCR(String message) {
    _send(new EgbMessage.ScripterLog(message));
  }
}

/// A [ScriptBlock] (the Dart code between [:<script>:] and [:</script>:])
/// takes no arguments and doesn't return value.
typedef void ScriptBlock();