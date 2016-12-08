library egb_scripter;

import 'dart:collection';

import 'src/shared/user_interaction.dart';
import 'src/persistence/savegame.dart';
import 'src/shared/page.dart';
import 'src/shared/points_award.dart';
import 'src/book/author_script_exception.dart';

import 'src/presenter/presenter_proxy.dart';
export 'src/presenter/presenter_proxy.dart';

import 'src/shared/stat.dart';
export 'src/shared/stat.dart';

import 'src/shared/form.dart';
export 'src/shared/form.dart';

import 'src/persistence/saveable.dart';
import 'dart:async';
export 'src/persistence/saveable.dart';

import "src/book/scripter_proxy.dart";
import 'package:egamebook/src/presenter/form_proxy.dart';

part 'src/book/scripter_page.dart';
part 'src/book/points_counter.dart';

/**
 * The StringBuffer which collects all echo()'d strings to put them all
 * together at the end of a script block and send them to the Runner
 * (and therefore, the player). [textBuffer] is only used for text output
 * generated inside <script> tags (through [echo()]).
 */
final StringBuffer textBuffer = new StringBuffer();

/**
 * The top level function that can be called from script blocks or library
 * functions. It writes [str] to [textBuffer].
 */
void echo(String str) {
  if (textBuffer.length > 0) {
    textBuffer.write(" "); // Implicitly add space between each echo().
  }
  textBuffer.write(str);
}

/**
 * This is the page name that was most recently called in a [:goto(name):]
 * statement (or [:null:] if there was no recent call). Author should
 * seldom access this field. Instead, they should use the [goto] function.
 *
 * The variable is automatically reset to [:null:] by Scripter once the jump
 * to this page name has been done.
 */
String gotoPageName;

/// Returns [:true:] if [goto] was called recently - e.g. [gotoPageName]
/// is not [:null:].
bool get gotoCalledRecently => gotoPageName != null;

/**
 * By calling [goto()], you're saying you want to change page to [pageName].
 * You can specify the page name in full (i.e. including the group name)
 * or in short (i.e. without group name).
 *
 * This is a global, author-facing function. It will store
 * the name of the page in a variable that is later used to get the actual
 * page inside [Scripter].
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
final ChoiceList choices = new ChoiceList();

/**
 * Utility shortcut for creating new choices.
 *
 * When [deferToChoiceList] is set to [:true:], the choice will not be shown
 * until there is a choiceList on the page.
 */
Choice choice(String string,
    {String goto,
    ScriptBlock script,
    String submenu,
    bool deferToEndOfPage: false,
    bool deferToChoiceList: false,
    String helpMessage}) {
  Choice choice = new Choice(string,
      goto: goto,
      script: script,
      submenu: submenu,
      deferToEndOfPage: deferToEndOfPage,
      deferToChoiceList: deferToChoiceList,
      helpMessage: helpMessage);
  choices.add(choice);
  return choice;
}

/// Current form.
Form _currentForm;

/// Getter returns current form.
Form get currentForm => _currentForm;
/**
 * Show the [form]. Sets current form.
 */
void showForm(Form form) {
  _currentForm = form;
}

/**
 * The map holding all author-defined variables. This is accessed either
 * by [:vars["name"]:], but thanks to noSuchMethod override,
 * also by just [:name:].
 */
final Map<String, Object> vars = new Map<String, Object>();

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
 * When a block/script/choice call for a script to be called afterwards,
 * it ends up on this FILO stack.
 */
final Queue<ScriptBlock> _nextScriptStack = new Queue<ScriptBlock>();

/// Adds a script to the stack of scripts.
void nextScript(ScriptBlock f) {
  _nextScriptStack.addLast(f);
}

/// Constructors and functions can check for [isInInitOrDeclareBlock] and might choose
/// to throw an Exception. For example, if an unsaveable property is changed
/// during a <script> block.
void throwIfNotInInitOrDeclareBlock([String customMessage = ""]) {
  if (isInInitOrDeclareBlock == false) {
    throw new StateError("An initialization code meant for the initBlock "
        "(inside the <variables> tag) was called outside of it (probably "
        "in a <script> tag). $customMessage");
  }
}

/// Internal state variable for [_throwIfNotInInitBlock].
bool isInInitOrDeclareBlock = true;

/**
 * Scripter is the class that runs the actual game and sends Messages to
 * the Presenter through Runner. It is subclassed by ScripterImpl, which is
 * built from .egb file by egb_builder.
 */
abstract class Scripter extends ScripterViewedFromPresenter {
  /// The unique id of this particular gamebook. Used for saving.
  String get uid;

  /// Information about all pages, their visit counts, and more.
  final ScripterPageMap pageMap = new ScripterPageMap();

  /// The starting page of the book.
  ScripterPage firstPage;

  /// The page and block that called goto() that resulted in jumping to
  /// currentPage.
  ScripterBlockPointer _preGotoPosition;

  /// The page visited previously.
  ScripterPage get previousPage =>
      _preGotoPosition == null ? null : _preGotoPosition.page;

  /// Page that is currently being read.
  ScripterPage currentPage;

  /// Getter returns awarded points to player.
  PointsCounter get points => _points;

  /// Goto links (page1 -> page 2) that have been shown to the player, but
  /// not picked. Links are represented by hashes created by
  /// [_createLinkHash].
  /// This is important for the  "No points for second guessing" rule.
  final Set<String> _playerChronology = new Set<String>();

  /// Signifies that the [_playerChronology] has changed and needs to be
  /// sent to Runner.
  bool _playerChronologyChanged = false;

  /// Create a unique hash that identifies a path from one page to another.
  String _createLinkHash(ScripterPage from, ScripterPage to) =>
      "${from.name}>>${to.name}"; // TODO: make this better

  /// Checks whether this choice has already been presented to the player
  /// but wasn't picked. This means we shouldn't add any points on this
  /// page. (No points for second guessing.)
  bool _alreadyOffered(ScripterPage from, ScripterPage to) =>
      _playerChronology.contains(_createLinkHash(from, to));

  /// The block in which variables are set (it corresponds to the <variables>
  /// block in .egb).
  void initBlock();

  /// Initializes the scripter. In this particular case, since this is
  /// [Scripter] proper (and not a proxy behind an isolate or anything),
  /// we don't do anything and return an immediate Future.
  Future init() => new Future.value();

  /// As with [init], since this is [Scripter] proper, we don't really need
  /// to destroy anything.
  void quit() {
    // Do nothing.
  }

  /// The current position in the current page's blocks list.
  int currentBlockIndex;

  /// Signifies that [currentBlockIndex] should point to the last block on page
  /// at the next [_goOneStep]. This is just after a savegame [load].
  int LAST_BLOCK_ON_PAGE = -9999;

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
  Map<String, Function> _constructors;

  /// Creates new Scripter.
  Scripter();

  /// Presenter proxy.
  PresenterViewedFromScripter presenter;

  /// Sets Presenter and Scripter to given [presenter].
  void setPresenter(PresenterViewedFromScripter presenter) {
    this.presenter = presenter;
  }

  /// This method will be generated by Builder. It populates [vars] with
  /// the current state of the variables that were declared in the
  /// [:<declare>:] blocks.
  void populateVarsFromState();

  /// This method will be generated by Builder. It populates the variables that
  /// were declared in the [:<declare>:] blocks with what is in [vars].
  /// (This is done mostly after [vars] was updated from a savegame.
  void extractStateFromVars();

  /**
   * Function is called when we're ready for the next batch of outputs from the
   * Scripter. Goes through the blocks on the page or processes previously
   * registered actions.
   */
  Future<Null> walk() async {
    if (Stat.someChanged) {
      DEBUG_SCR("Sending updated stats.");
      presenter.updateStats(Stat.createUpdates());
    }

    if (_playerChronologyChanged) {
      DEBUG_SCR("Saving player chronology.");
      _playerChronologyChanged = false;
      presenter.savePlayerChronology(_playerChronology);
    }

    // We can now handle the current block on the page.
    bool loop;
    do {
      DEBUG_SCR("Calling _goOneStep().");
      try {
        loop = await _goOneStep();
      } on AuthorScriptException catch (e, stacktrace) {
        presenter.reportError(
            "AuthorScriptException", "$e\nStacktrace: $stacktrace");
        return;
      } catch (e, stacktrace) {
        presenter.reportError("Unknown Error (probably in egamebook itself)",
            "$e\nStacktrace: $stacktrace");
        return;
      }
      assert(loop != null);
    } while (loop == _CONTINUE);
    DEBUG_SCR("Ending _goOneStep() loop.");
  }

  /**
   * Restarts the Scripter environment to the beginning.
   */
  void restart() {
    _initScriptEnvironment();
    _playerChronology.clear();
    _playerChronologyChanged = true;
    currentPage = firstPage;
    presenter.setStats(
        UIStat.overwriteStatsListFromDataStructure(Stat.createStatList()));
    // TODO presenter.resetPoints();
    walk();
  }

  /**
   * Handles the Runner's reply to SHOW_CHOICES message (i.e. the choice picked).
   */
  void _handleChoiceSelected(int choiceHash) {
    Choice pickedChoice;
    choices.forEach((choice) {
      choice.shown = true;
      if (choice.hash == choiceHash) {
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
          ScripterPage toPage;
          if (Choice.GO_BACK.hasMatch(choice.goto)) {
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
      throw new ArgumentError("The sent choice hash ($choiceHash) is not one "
          "of those offered ($choices)");
    }
    _pickChoice(pickedChoice);
    walk();
  }

  /**
   * Picks the given [choice], i.e. runs the script and performs the goto.
   */
  void _pickChoice(Choice choice) {
    if (choice.f != null) {
      nextScript(choice.f); // Wait for next iteration before running the
      // script.
    }
    if (choice.goto != null) {
      _performGoto(choice.goto);
    }
  }

  static final bool _STOP = true;
  static final bool _CONTINUE = false;

  /**
   * Walks through the instructions, one block at a time.
   * Returns [bool] which is either [:true:] when the execution needs to stop,
   * or [:false:] when the method can be called another time.
   */
  Future<bool> _goOneStep() async {
    if (!_points.pointsAwards.isEmpty) {
      DEBUG_SCR("Awarding points.");
      var award = _points.pointsAwards.removeFirst();
      presenter
          .awardPoints(new PointsAward(
              award.addition, award.result, award.justification))
          .then((_) => walk());
      return _STOP;
    }

    // LAST_BLOCK_ON_PAGE here is irrelevant, but we still need to make sure
    // it doesn't break this. TODO fix: more elegant looping.
    bool atEndOfPage = currentBlockIndex == currentPage.blocks.length - 1 ||
        currentBlockIndex == LAST_BLOCK_ON_PAGE;
    bool atStaticChoiceList = currentBlockIndex != LAST_BLOCK_ON_PAGE &&
        currentBlockIndex != null &&
        currentBlockIndex < currentPage.blocks.length &&
        currentPage.blocks[currentBlockIndex] is List;
    DEBUG_SCR(
        "atEndOfPage = $atEndOfPage, atStaticChoiceList = $atStaticChoiceList");

    choices
        .removeWhere((choice) => choice.shown || _leadsToIllegalPage(choice));
    if (!choices.isEmpty) {
      DEBUG_SCR("We have choices.");
      ChoiceList actionableChoices = new ChoiceList.fromList(
          choices
              .where((Choice choice) => choice.isActionable(
                  atEndOfPage: atEndOfPage, atChoiceList: atStaticChoiceList))
              .toList(),
          choices.question);
      if (actionableChoices.isNotEmpty) {
        presenter
            .showChoices(actionableChoices)
            .then(_handleChoiceSelected)
            .catchError((e) => DEBUG_SCR("$e"),
                test: (e) => e is AsyncOperationOverridenException);
        return _STOP;
      } else {
        Choice autoChoice = choices.firstWhere((choice) => choice.isAutomatic,
            orElse: () => null);
        if (autoChoice != null) {
          _pickChoice(autoChoice);
          choices.remove(autoChoice);
        }
      }
    }

    if (_currentForm != null) {
      DEBUG_SCR("We have a form.");
      // XXX: we shouldn't need to convert Form to Map only to convert it
      // to FormProxy. Maybe getting rid of FormProxy altogether?
      FormProxy proxy = new FormProxy.fromMap(_currentForm.toMap());
      Stream<CurrentState> stream = presenter.showForm(proxy);
      StreamSubscription subscription;
      subscription = stream.listen((CurrentState values) {
        DEBUG_SCR("New values = $values.");
        FormConfiguration changedConfig;
        try {
          changedConfig = _currentForm.receiveUserInput(values);
        } catch (e, stacktrace) {
          presenter.reportError(
              "Error while handling user input in Form", "$e\n$stacktrace");
          throw e;
        }
        if (!values.submitted) {
          presenter.updateForm(changedConfig);
        } else {
          DEBUG_SCR("The form has been submitted.");
          subscription.cancel();
          _currentForm = null;
          walk();
        }
      });

      return _STOP;
    }

    if (!_nextScriptStack.isEmpty) {
      // previous script asked for nextScript()
      ScriptBlock script = _nextScriptStack.removeLast();
      return await _runScriptBlock(script);
    }

    if (gotoPageName != null) {
      // someone called the top level function [goto]
      _performGoto(gotoPageName);
      gotoPageName = null;
      return _CONTINUE;
    }

    // increase currentBlock, but not if previous script called "repeatBlock();"
    if (currentBlockIndex == null) {
      currentBlockIndex = 0;
    } else if (currentBlockIndex == LAST_BLOCK_ON_PAGE) {
      // Just after load.
      currentBlockIndex = currentPage.blocks.length - 1;
    } else if (_repeatBlockBit) {
      _repeatBlockBit = false;
    } else {
      currentBlockIndex++;
    }

    // Because currentBlockIndex could have changed, we need to update
    // also atEndOfPage.
    atEndOfPage = currentBlockIndex == currentPage.blocks.length - 1;

    // Resolve current block.
    DEBUG_SCR(
        "Resolving block: '${currentPage.name}' block $currentBlockIndex.");
    if (currentBlockIndex == currentPage.blocks.length) {
      // At the end of page.
      assert(!choices.any((choice) => !choice.shown));
      // Should have been handled above.
      DEBUG_SCR("End of book.");
      presenter.save(_createSaveGame()); // End book save
      presenter.endBook();
      return _STOP;
    }

    if (currentPage.blocks[currentBlockIndex] is String) {
      // Just an ordinary paragraph, no script.
      presenter
          .showText(currentPage.blocks[currentBlockIndex])
          .then((_) => walk());
      return _STOP; // TODO: Find out if we can use _CONTINUE here.
    } else if (currentPage.blocks[currentBlockIndex] is List) {
      // A ChoiceList block.
      DEBUG_SCR("A ChoiceList encountered.");
      try {
        choices.addFromScripterList(currentPage.blocks[currentBlockIndex]);
      } on AuthorScriptException catch (e, stacktrace) {
        presenter.reportError(
            "AuthorScriptException", "$e\nStacktrace: $stacktrace");
        return _STOP;
      }
      DEBUG_SCR("- choices added");
      if (choices.any((choice) => choice.isActionable(
              // TODO: make DRY
              atEndOfPage: atEndOfPage,
              atChoiceList: true,
              filterOut: _leadsToIllegalPage)) &&
          currentBlockIndex == currentPage.blocks.length - 1) {
        // Last block on page. Save the game.
        DEBUG_SCR("Creating & sending savegame");
        presenter.save(_createSaveGame());
        return _CONTINUE;
      }
      return _CONTINUE;
    } else if (currentPage.blocks[currentBlockIndex] is ScriptBlock) {
      // A script block.
      // TODO: create _textMessageCache here and not in _send()
      Savegame savegame;
      if (currentBlockIndex == currentPage.blocks.length - 1) {
        // Last block on page. Save the game before any changes are made during
        // the script block.
        savegame = _createSaveGame();
      }
      bool canContinue = await _runScriptBlock(
          currentPage.blocks[currentBlockIndex] as AsyncVoidFunction);

      if (choices.any((choice) => choice.isActionable(
              atEndOfPage: atEndOfPage,
              atChoiceList: true,
              filterOut: _leadsToIllegalPage)) &&
          currentBlockIndex == currentPage.blocks.length - 1) {
        assert(savegame != null);
        // TODO deep compare assert((savegame as Savegame).vars == _createSaveGame().vars);
        presenter.save(savegame);
      }
      return canContinue;
    } else {
      throw new StateError("Invalid block: "
          "${currentPage.blocks[currentBlockIndex]}");
    }
  }

  /**
   * Takes the [dest] string and converts it to an actual [ScripterPage].
   * Solves for special goto destination [:<<<:] (i.e. go back) and for when
   * the page groupName is omitted.
   */
  void _performGoto(String dest) {
    ScripterPage _gotoPage;
    int _gotoBlockIndex;

    if (Choice.GO_BACK.hasMatch(dest)) {
      // A [<<<] goto.
      if (_preGotoPosition == null) {
        throw new StateError("Cannot use [${Choice.GO_BACK}] when there is "
            "no _preGotoPosition.");
      }
      _gotoPage = _preGotoPosition.page;
      // The [:<<<:] not only goes to a page, but also to an exact block on that
      // page. We are decresing block index by one because it will be
      // automatically increased in _goOneStep.
      _gotoBlockIndex = _preGotoPosition.blockIndex - 1;
    } else {
      // Normal goto.
      _gotoPage =
          pageMap.getPage(dest, currentGroupName: currentPage.groupName);
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
      _playerChronology.add(_createLinkHash(previousPage, currentPage));
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

    DEBUG_SCR("Points embargo = $_pointsEmbargo");

    _preGotoPosition = new ScripterBlockPointer(currentPage, currentBlockIndex);
    currentPage = _gotoPage;
    currentBlockIndex = _gotoBlockIndex;
    previousPage.visitCount += 1;
  }

  /// (Re-)initializes the environment after starting or loading a new game.
  void _initScriptEnvironment() {
    currentBlockIndex = null;
    _nextScriptStack.clear();
    choices.clear();
    _currentForm = null;
    vars.clear();
    vars["points"] = _points;
    _points.clear();
    if (pageMap != null) pageMap.clearState();

    isInInitOrDeclareBlock = true;
    try {
      initBlock(); // run contents of <init>
    } catch (e, stacktrace) {
      presenter.reportError(
          "Author Exception in initBlock() (<variables>)", "$e\n$stacktrace");
      throw e;
    }
    // Just so that [vars] is filled with some data before we try to
    // run initBlock() etc.
    populateVarsFromState();
    isInInitOrDeclareBlock = false;
  }

  /// Runs the specified script block, catches exceptions and returns generated
  /// text.
  Future<bool> _runScriptBlock(ScriptBlock script) async {
    // clean up
    textBuffer.clear();

    // run the actual script
    try {
      await script();
    } catch (e, stacktrace) {
      textBuffer.write("<code><pre>ERROR: $e\n\n$stacktrace</pre></code>");
      throw new AuthorScriptException.withPageName(
          e.toString(), currentPage.name, currentBlockIndex);
    }

    if (textBuffer.isNotEmpty) {
      presenter.showText(textBuffer.toString()).then((_) => walk());
      return _STOP;
    } else {
      return _CONTINUE;
    }
  }

  /**
   * When a page is only visitable once ([:visitOnce:] option) and has been
   * visited, then it's an illegal page to visit. This helper function
   * checks for this.
   */
  bool _leadsToIllegalPage(Choice choice) {
    if (choice.goto == null) return false;
    if (Choice.GO_BACK.hasMatch(choice.goto)) return false;
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

  /// Creates and returns save game from actual [currentPage], [vars]
  /// and [pageMap].
  Savegame _createSaveGame() {
    populateVarsFromState();
    try {
      return new Savegame(currentPage.name, vars, pageMap.exportState());
    } catch (e, stacktrace) {
      presenter.reportError("Error when creating savegame", "$e\n$stacktrace");
      throw e;
    }
  }

  /**
   * Take Message of type LOAD_GAME and populate the current game
   * state with its contents. This includes both the Story Chronology (where
   * the story is right now) and the Player Chronology (what the player has
   * seen already, including blind alleys and consecutive reloads).
   *
   * Player Chronology need only provided at the start of player session. It is
   * not overwritten by loading or saving games.
   */
  void load(Savegame savegame, [Set<String> playerChronology]) {
    _initScriptEnvironment();

    if (pageMap[savegame.currentPageName] == null) {
      throw new IncompatibleSavegameException("Trying to load page "
          "'${savegame.currentPageName}' which doesn't exist in current "
          "egamebook.");
    }
    currentPage = pageMap[savegame.currentPageName];
    currentBlockIndex = LAST_BLOCK_ON_PAGE;

    DEBUG_SCR("Importing state from savegame.");
    pageMap.importState(savegame.pageMapState);

    if (playerChronology != null) {
      // This happens only at each new game session start (i.e. when user opens
      // the software. Normal LOAD_GAME messages (during play) have
      // playerChronology == null.
      DEBUG_SCR("Importing player chronology.");
      _playerChronology.addAll(playerChronology);
    }

    var _constructors = <String, Function>{};

    // copy saved variables over vars
    DEBUG_SCR("Copying save variables into vars.");
    Savegame.importSavegameToVars(savegame, vars,
        constructors: _constructors); // TODO
    extractStateFromVars();
    presenter.setStats(
        UIStat.overwriteStatsListFromDataStructure(Stat.createStatList()));
    DEBUG_SCR("loadFromSaveGame() done.");
    walk();
  }

  /// Logs debug [message].
  void DEBUG_SCR(String message) {
    presenter.log(message);
    //print("SCR: $message");
  }

  /// Returns actual points.
  PointsCounter getPoints() {
    return _points;
  }
}

/// A [ScriptBlock] (the Dart code between [:<script>:] and [:</script>:])
/// takes no arguments and doesn't return value.
typedef Future<Null> ScriptBlock();
