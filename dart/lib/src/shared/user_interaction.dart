library egb_user_interaction;

import 'dart:math';
import 'dart:collection';

import 'utils.dart';
import 'message.dart';

class EgbUserInteraction {
  bool shown = false;
  bool waitForEndOfPage;
  int hash;
}

class EgbChoice extends EgbUserInteraction implements Comparable {
  /// The text of the choice (what user clicks on when picking it). It is always
  /// defined. When [string] is an empty string ([:"":]), the choice is
  /// automatic (nothing is shown to the player and the scripter automatically
  /// selects the choice.
  String string;
  Function f;
  String goto;
  bool showNow;

  /// Returns [:true:] when the choice is automatic (scripter picks it
  /// silently).
  bool get isAutomatic => string.isEmpty;
  
  /**
   * Returns true if this choice is currently actionable (ie. should be 
   * actively shown to the player). That means that it hasn't been shown, 
   * is not automatic, is not waiting for end of page.
   * 
   * Caller can supply two arguments. [endOfPage] signifies whether or not
   * the scripter is currently at end of a page. With [filterOut], caller
   * can provide a function that will filter out the choice [:ch:] if
   * [:filterOut(ch) == true:].  
   */
  bool isActionable({bool endOfPage, bool filterOut(EgbChoice choice)}) {
    if (shown) return false;  // choice shown before
    if (isAutomatic) return false;
    if (endOfPage != null && !endOfPage && waitForEndOfPage) {
      return false;
    }
    if (filterOut != null && filterOut(this)) return false;
    return true;
  }

  EgbChoice(String string, {this.goto, Function script, bool showNow: false}) :
      super() {
    this.string = string.trim();  // string is defined with a trailing space because of quadruple quotes problem
    hash = string.hashCode;
    f = script;
    waitForEndOfPage = !showNow;
  }

  EgbChoice.fromMap(Map<String,dynamic> map) : super() {
    string = map["string"].trim();
    if (map.containsKey("hash")) {
      hash = map["hash"];
    } else {
      hash = string.hashCode;
    }

    goto = map["goto"];
    if (map.containsKey("showNow")) {
      showNow = map["showNow"];
    }
    f = map["then"];
  }

  EgbChoice then(Function _f) {
    f = _f;
    return this;
  }

  int compareTo(EgbChoice other) => this.string.compareTo(other.string);

  toString() {
    return "Choice: $string [$goto]";
  }
  
  /**
   * The string the author can use when he wants a choice to go back to
   * a previous choice. Like so:
   * 
   *     - [<<<]
   */
  static final RegExp GO_BACK = new RegExp(r"^\s*<<<\s*$"); 
}

class EgbChoiceList implements List<EgbChoice> {
  final List<EgbChoice> _choices;
  String question;  // TODO: implement

//  EgbChoiceList() : _choices = new List<EgbChoice>() {
//  }

//  EgbChoiceList._from(Collection<EgbChoice> list)
//      : _choices = new List<EgbChoice>() {
//    _choices.addAll(list);
//  }

  EgbChoiceList() : _choices = new List<EgbChoice>();

  EgbChoiceList.from(Iterable iterable) :
      _choices = new List<EgbChoice>.from(iterable);

  EgbChoiceList.fromMessage(EgbMessage m) : _choices = new List<EgbChoice>() {
    if (m.listContent.length < 3) {
      throw "Message with choices doesn't have enough data: ${m.listContent}.";
    } else {
      question = m.listContent[1];
      for (int i = 2; i < m.listContent.length; i++) {
        _choices.add(new EgbChoice.fromMap(m.listContent[i]));
      }
    }
  }

  /**
   * Takes list from Scripter page data and adds the contents to this.
   */
  void addFromScripterList(List list) {
    if (list[0] != null && list[0] is Function) {
      question = list[0]();
    } else {
      question = null;
    }
    for (var i = 1; i < list.length; i++) {
      Map map = list[i];
      var string;
      if (map["string"] != null && map["string"] is Function) {
        string = map["string"]();
      } else {
        string = "";
      }
      var choice = new EgbChoice(
                            string,
                            goto: map["goto"],
                            script: map["script"],
                            showNow: true);
      _choices.add(choice);
    }
  }

  add(element, {Function script, String goto, showNow: false}) {
    if (element is EgbChoice) {
      _choices.add(element);
    } else if (element is String) {
      var choice = new EgbChoice(element, goto: goto, script: script, 
                                 showNow: showNow);
      _choices.add(choice);
    } else {
      throw new ArgumentError("To add a choice to choices, one must provide "
                              "either a new EgbChoice element or a String.");
    }
  }

  where(f) => _choices.where(f);
  singleWhere(f) => _choices.singleWhere(f);
  firstWhere(test, {orElse}) => _choices.firstWhere(test, orElse: orElse);
  removeWhere(f) => _choices.removeWhere(f);
  any(bool f(EgbChoice)) => _choices.any(f);
  get length => _choices.length;
  operator [](int index) => _choices[index];
  void forEach(void f(EgbChoice element)) {
    _choices.forEach(f);
  }
  void clear() => _choices.clear();
  get iterator => _choices.iterator;

  bool get isEmpty => _choices.isEmpty;
  void addAll(Iterable<EgbChoice> iterable) => _choices.addAll(iterable);
  
  /**
   * Takes care of converting the current [EgbChoiceList] to a Message.
   *
   * By providing [filterOut()], one can force to not show choices that
   * satisfy [:filterOut(choice) == true:].
   */
  EgbMessage toMessage({
      String prependText: null,
      bool endOfPage: null,
      bool filterOut(EgbChoice choice)}) {
    List<EgbChoice> choicesToSend;

    // filter out choices we don't want to show
    choicesToSend = _choices.where(
        (choice) => choice.isActionable(endOfPage: endOfPage, 
            filterOut: filterOut)
    ).toList();
    
    if (choicesToSend.isEmpty) {
      throw "Choices is empty, but still choices.toMessage was called.";
    }

    DEBUG_SCR("Sending choices.");
    EgbMessage m = new EgbMessage(EgbMessage.SHOW_CHOICES);

    m.listContent = new List<dynamic>();
    m.listContent.add(prependText);
    m.listContent.add(question);
    choicesToSend.forEach((choice) {
      DEBUG_SCR("- $choice");
      m.listContent.add( {
        "string": choice.string,
        "hash": choice.hash
      } );
      choice.shown = true;
    });

    return m;
  }
  
  toString() => "EgbChoiceList: $_choices";
}

class EgbTextInput extends EgbUserInteraction {
  // TODO: implement
  // Question can be answered with text. Example: "What is your name?"
}

class PlayerIntent {
  PlayerIntent(type) : this.type = type;

  final int type;
  static const int QUIT = 2;
  static const int LOAD = 4;
  static const int RESTART = 8;
}

class RestartIntent extends PlayerIntent {
  RestartIntent() : super(PlayerIntent.RESTART);
}

class LoadIntent extends PlayerIntent {
  String uid;
  LoadIntent(this.uid) : super(PlayerIntent.LOAD);
}