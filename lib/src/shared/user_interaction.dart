library egb_user_interaction;

import 'dart:collection';

import 'utils.dart';
import 'message.dart';
import '../book/author_script_exception.dart';

/// Class Choice wraps user interaction choice.
class Choice implements Comparable {
  /// If the choice is shown.
  bool shown = false;

  /// The choice shouldn't be shown before we are at the end of the page.
  bool deferToEndOfPage;

  /// The choice shouldn't be shown before there is an actual choice list
  /// in the .egb.
  bool deferToChoiceList;

  /// The choice hash used for sending.
  int hash;

  /// The text of the choice (what user clicks on when picking it). It is always
  /// defined. When [string] is an empty string ([:"":]), the choice is
  /// automatic (nothing is shown to the player and the scripter automatically
  /// selects the choice.
  String string;

  /// Script function.
  Function f;

  /// On which page name it should go to.
  String goto;

  /// When set, this choice will be accessible in a sub menu called [submenu].
  /// The user interface is responsible of grouping choices of the same submenu
  /// together and adding a way for the player to 'open' the submenu and pick
  /// a choice from it (or pick any other choice -- opening a submenu shouldn't
  /// prevent the player from picking a choice from any other submenu or from
  /// the main choice list).
  String submenu;

  /// Returns [:true:] when the choice is automatic (scripter picks it
  /// silently).
  bool get isAutomatic => string.isEmpty;

  /**
   * Returns [:true:] if this choice is currently actionable (ie. should be
   * actively shown to the player). That means that it hasn't been shown,
   * is not automatic, is not waiting for end of page.
   *
   * Caller can supply two arguments. [atEndOfPage] signifies whether or not
   * the scripter is currently at end of a page. [atChoiceList] signifies
   * whether the scripter is now at a ChoiceList (some choices might opt
   * to be shown only with other, following choices, and not by themselves).
   *
   * With [filterOut], caller
   * can provide a function that will filter out the choice [:ch:] if
   * [:filterOut(ch) == true:].
   */
  bool isActionable(
      {bool atEndOfPage, bool atChoiceList, bool filterOut(Choice choice)}) {
    if (shown) return false; // choice shown before
    if (isAutomatic) return false;
    if (atEndOfPage != null && !atEndOfPage && deferToEndOfPage) {
      return false;
    }
    if (atChoiceList != null && !atChoiceList && deferToChoiceList) {
      return false;
    }
    if (filterOut != null && filterOut(this)) return false;
    return true;
  }

  /// Creates new Choice with the text of the choice [string] and optional
  /// attributes on which page name it should [goto], [script] function,
  /// [submenu], if [deferToEndOfPage] and if [deferToChoiceList].
  Choice(String string,
      {this.goto,
      Function script,
      this.submenu: null,
      bool deferToEndOfPage: false,
      bool deferToChoiceList: false})
      : super() {
    if (string == null) {
      throw new ArgumentError("String given to choice cannot be null.");
    }
    this.string = string
        .trim(); // string is defined with a trailing space because of quadruple quotes problem
    hash = string.hashCode;
    f = script;
    this.deferToEndOfPage = deferToEndOfPage;
    this.deferToChoiceList = deferToChoiceList;
  }

  /// Creates new Choice from a Map [map].
  Choice.fromMap(Map<String, dynamic> map) : super() {
    string = map["string"].trim();
    if (map.containsKey("hash")) {
      hash = map["hash"];
    } else {
      hash = string.hashCode;
    }

    goto = map["goto"];
    if (map.containsKey("showNow")) {
      deferToEndOfPage = !map["showNow"];
    }
    f = map["then"];

    submenu = map["submenu"];
  }

  /// Creates a Map representation of the choice with only the data needed by
  /// the presenter: [string], [hash] and [submenu].
  Map<String, Object> toMapForPresenter() =>
      {"string": string, "hash": hash, "submenu": submenu};

  /// Sets script function to [_f] and returns actual object.
  ///
  /// Defines what [Function] should do then, for example call [:echo:].
  Choice then(Function _f) {
    f = _f;
    return this;
  }

  /// Compares actual object's [string] with [other.string].
  int compareTo(Choice other) => this.string.compareTo(other.string);

  /// Returns String representation of Choice with its [string] and [goto]
  /// page.
  String toString() {
    return "Choice: $string [$goto] ($hash)";
  }

  /**
   * The string the author can use when he wants a choice to go back to
   * a previous choice. Like so:
   *
   *     - [<<<]
   */
  static final RegExp GO_BACK = new RegExp(r"^\s*<<<\s*$");
}

/**
 * A group of choices to be picked from. This class extends [ListBase], so it
 * behaves like a normal (dynamic) list.
 */
class ChoiceList extends ListBase<Choice> {
  /// Question for choice list.
  String question; // TODO: implement

  /// List of [Choice].
  List<Choice> _choices = new List<Choice>();

  /// Returns length of choice list.
  int get length => _choices.length;

  /// Changes length of choices to some [value].
  set length(int value) => _choices.length = value;
  Choice operator [](int index) => _choices[index];
  void operator []=(int index, Choice value) {
    _choices[index] = value;
  }

  /// Creates new ChoiceList with no [question] and empty list of choices.
  ChoiceList();

  /// Creates new ChoiceList with list of [_choices] and [question].
  ChoiceList.fromList(this._choices, this.question);

  /**
   * Takes list from Scripter page data and fills/creates choices list with this
   * retrieved data.
   */
  void addFromScripterList(List list) {
    if (list[0] != null && list[0] is Function) {
      try {
        question = list[0]();
      } catch (e) {
        throw new AuthorScriptException(e.toString());
      }
    } else {
      question = null;
    }
    for (var i = 1; i < list.length; i++) {
      Map map = list[i];
      String string;
      if (map["string"] != null && map["string"] is Function) {
        try {
          string = map["string"]();
        } catch (e) {
          throw new AuthorScriptException(e.toString());
        }
      } else {
        string = "";
      }
      var choice = new Choice(string,
          goto: map["goto"], script: map["script"], submenu: map["submenu"]);
      _choices.add(choice);
    }
  }

  /// Adds new Choice into local choices list. If [element] is instance of
  /// [Choice], the choice is simply added to the list. If the element is
  /// instance of String, the new [Choice] is created from given optional
  /// parameters [script], [goto], [submenu], [deferToEndOfPage] and
  /// [deferToChoiceList]. In other case the [ArgumentError] is thrown.
  void add(Object element,
      {Function script,
      String goto,
      String submenu,
      bool deferToEndOfPage: false,
      bool deferToChoiceList: false}) {
    if (element is Choice) {
      _choices.add(element);
    } else if (element is String) {
      var choice = new Choice(element,
          goto: goto,
          script: script,
          submenu: submenu,
          deferToEndOfPage: deferToEndOfPage,
          deferToChoiceList: deferToChoiceList);
      _choices.add(choice);
    } else {
      throw new ArgumentError("To add a choice to choices, one must provide "
          "either a new Choice element or a String.");
    }
  }

  /// Creates new ChoiceList from a given [Message].
  ChoiceList.fromMessage(Message m) {
    if (m.listContent.length < 3) {
      throw "Message with choices doesn't have enough data: ${m.listContent}.";
    } else {
      question = m.listContent[1];
      for (int i = 2; i < m.listContent.length; i++) {
        _choices.add(new Choice.fromMap(m.listContent[i]));
      }
    }
  }

  /**
   * Takes care of converting the current [ChoiceList] to [Message].
   *
   * By providing [filterOut()], one can force to not show choices that
   * satisfy [:filterOut(choice) == true:].
   */
  Message toMessage(
      {String prependText,
      bool atEndOfPage,
      bool atChoiceList,
      bool filterOut(Choice choice)}) {
    List<Choice> choicesToSend;

    // filter out choices we don't want to show
    choicesToSend = _choices
        .where((choice) => choice.isActionable(
            atEndOfPage: atEndOfPage,
            atChoiceList: atChoiceList,
            filterOut: filterOut))
        .toList();

    if (choicesToSend.isEmpty) {
      throw "Choices is empty, but still choices.toMessage was called.";
    }

    DEBUG_SCR("Sending choices.");
    Message m = new Message(Message.SHOW_CHOICES);

    m.listContent = new List<dynamic>();
    m.listContent.add(prependText);
    m.listContent.add(question);
    choicesToSend.forEach((choice) {
      DEBUG_SCR("- $choice");
      m.listContent.add(choice.toMapForPresenter());
      choice.shown = true;
    });

    return m;
  }

  String toString() => _choices.map((ch) => "$ch").join(", ");
}

/**
 * [Intent] is an interaction that is 'out of place' and asynchronous.
 * For example, when the presenter is showing blocks of text, the player can
 * click on the "Restart" button. The book should then stop everything that
 * it's doing and restart itself.
 */
class Intent {
  /// Creates new Intent of [type].
  Intent(type) : this.type = type;

  /// Actual intent type.
  final int type;

  /// Intent type quit.
  static const int QUIT = 2;

  /// Intent type load.
  static const int LOAD = 4;

  /// Intent type restart.
  static const int RESTART = 8;
}

/// Intent which is type of [Intent.QUIT].
class QuitIntent extends Intent {
  /// Creates new QuitIntent of type of [Intent.QUIT].
  QuitIntent() : super(Intent.QUIT);
}

/// Intent which is type of [Intent.RESTART].
class RestartIntent extends Intent {
  /// Creates new RestartIntent of type of [Intent.RESTART].
  RestartIntent() : super(Intent.RESTART);
}

/// Intent which is type of [Intent.LOAD].
///
/// The [LoadIntent] is always providing the exact [uid] of the Savegame that
/// is supposed to be loaded.
class LoadIntent extends Intent {
  /// uid of the Savegame that will be loaded.
  String uid;

  /// Creates new LoadIntent of type of [Intent.LOAD] and with Savegame [uid].
  LoadIntent(this.uid) : super(Intent.LOAD);
}
