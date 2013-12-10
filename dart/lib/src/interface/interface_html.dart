library egb_interface_html;

import 'dart:async';
import 'dart:html';

import '../shared/markdown.dart' show markdown_to_html;

import 'interface.dart';
import '../persistence/savegame.dart';
import '../shared/user_interaction.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';

// because we're defining localStorage here
import '../persistence/storage.dart';
import '../persistence/player_profile.dart';

import 'choice_with_infochips.dart';
import 'dart:collection';

class HtmlInterface extends EgbInterfaceBase {
  AnchorElement restartAnchor;
  SpanElement pointsSpan;
  
  DivElement bookDiv;
  
  ButtonElement startButton;
  DivElement bookTitleDiv;
  DivElement bigBottomButtonDiv;
  
  /**
   * The text that has been shown to the player since last savegame bookmark.
   * (Markdown format, pre-HTMLization.)
   */
  final StringBuffer _textHistory = new StringBuffer();
  String getTextHistory() => _textHistory.toString();
  
  /**
    Constructor.
    */
  HtmlInterface() : super();
  
  void setup() {
    // DOM
    bookDiv = document.querySelector("div#book-wrapper");
    _loadingEl = document.querySelector("p#loading");
    
    bookTitleDiv = document.querySelector("div#book-title");
    bigBottomButtonDiv = document.querySelector("div#big-bottom-button");
    startButton = document.querySelector("button#start-button");
    startButton.text = "START";
    startButton.disabled = false;
    startButton.onClick.first.then((_) {
      document.body.style.overflowY = "scroll";
      new Future(() {
        assert(bookDiv.children.length > 0);
        bookDiv.children.last  // TODO: first/last according to Continue/Start
          .scrollIntoView();  
        bookTitleDiv.style.display = "none";
        bigBottomButtonDiv.style.display = "none";
      });
    });
    document.body.style.overflowY = "hidden";

    restartAnchor = document.querySelector("nav a#book-restart");
    restartAnchor.onClick.listen((_) {
      sendRestartIntent();
      // Clear text and choices
      bookDiv.children.clear();
      _textHistory.clear();
      _savegameToBe = null;
      // TODO: clear meta elements
    });
    
    pointsSpan = document.querySelector("span#points-value");
    document.querySelector("a#points-button").onClick
      .listen(_statsOnClickListener);
    
    // Set up listening for meta elements (for not showing new points before
    // user scrolls to the appropriate place in the text, for example).
    _periodicSubscription = _periodic.listen((_) {
      _checkMetaElementsInView();
    });
    _periodicSubscription.pause();
    
    _showLoading(false);
  }
  
  ParagraphElement _loadingEl;
  /// Used to store [_loadingEl]'s state outside DOM.
  bool _loadingElCurrentShowState = null;
  /**
   * Sets visibility of the loading gizmo.
   */
  void _showLoading(bool show) {
    if (_loadingElCurrentShowState != null && 
        show == _loadingElCurrentShowState) {
      return;
    }
    _loadingEl.style.visibility = (show ? "visible" : "hidden");
    _loadingElCurrentShowState = show;
  }
  
  void endBook() {
    print("The book has ended.");
  }
  
  void close() {
    super.close();
  }
  
  /**
   * Converts [s] to HTML elements (via markdown) and shows them one by one
   * on page. Returns when complete.
   */
  Future<bool> showText(String s) {
    if (s == null) return new Future.value(false);
    Completer completer = new Completer<bool>();
    
    _showLoading(false);
    
    new Future.delayed(const Duration(milliseconds: 100), ()  {
      _textHistory.write("$s\n\n");
      String html = markdown_to_html(s);
      
      if (s.trim().startsWith("<") && s.trim().endsWith(">")) {
        html = s;  // Hacky way to prevent markdown from enclosing html tags
                   // with html tags ("<p><p></p></p>"). TODO: fix
      }
      DivElement container = new DivElement();
      container.innerHtml = html;
      _recursiveRemoveScript(container);
      int count = 0;
      for (Element el in container.children) {
        if (USE_SHOWTEXT_ANIMATION) {
          count++;
          el.classes.add("hidden");
          num transitionDelay = 
              _durationBetweenShowingElements.inMilliseconds * (count - 1) / 1000; 
          el.style.transitionDelay = "${transitionDelay}s";
          new Future(() {
            el.classes.remove("hidden");
          });
        }
        bookDiv.append(el);//container.children[i]);
      }
      container.remove();  
      // TODO: find out if necessary to avoid leaks
      
      new Future.delayed(_durationBetweenShowingElements * count, () =>
          completer.complete(true)
      );
    });
    
    return completer.future;
  }
  
  static const bool USE_SHOWTEXT_ANIMATION = false;
  static const Duration _durationBetweenShowingElements =
      const Duration(milliseconds: 200);
  static const Duration _durationBetweenCheckingForMetaElements =
      const Duration(milliseconds: 1000);
  final Stream _periodic = 
      new Stream.periodic(_durationBetweenCheckingForMetaElements);
  StreamSubscription _periodicSubscription;
  
  /// A list of elements and their associated actions and data. When a 
  /// _metaElement comes into view, its [doAction()] function is called.
  final List<EgbMetaElement> _metaElements = new List<EgbMetaElement>();
  
  /**
   * Checks if one of the meta elements is in view. If so, runs their
   * associated action (e.g. show a toast and increase the counter when
   * points are awarded).
   */
  void _checkMetaElementsInView() {
    if (_metaElements.isEmpty) {
      _periodicSubscription.pause();
      return;
    }
    // A line 20 pixels above fold.
    var currentBottom = window.pageYOffset + window.innerHeight - 20;
    //print("_metaElements: currentBottom = $currentBottom");
    var _processedElements = new Set<int>();
    for (int i = 0; i < _metaElements.length; i++) {
      var metaEl = _metaElements[i];
      // assert(metaEl.element.offsetParent == document.body); // Does not apply - offsetparent can also be bookDiv? null?
      if (metaEl.element.offsetTop < currentBottom) {
        metaEl.doAction();
        _processedElements.add(i);
      }
    }
    // Delete _metaElements whose actions have already been triggered.
    _metaElements.removeWhere((metaEl) => metaEl.done);
  }
  
  /**
   * Checks if user scrolled past the end of [bookDiv].
   */
  bool _scrolledPastEnd() {
    var currentBottom = window.pageYOffset + window.innerHeight;
    var bookDivBottom = bookDiv.offsetTop + bookDiv.offsetHeight;
    print("checking scroll: bookdiv = ${bookDivBottom}, "
          "currentBottom =  ${currentBottom}");
    return (bookDivBottom < currentBottom - 20);
  }
  
  /**
   * Goes through DOM Element and removes any Script Elements (recursively).
   * 
   * Currently silent.
   */
  void _recursiveRemoveScript(Element e) {
    if (e is ScriptElement) {
      print("INT: Script detected!");
      e.remove();
    } else if (e.children.length > 0) {
      for (int i = 0; i < e.children.length; i++) {
        _recursiveRemoveScript(e.children[i]);
      }
    }
  }

  Future<int> showChoices(EgbChoiceList choiceList) {
    var completer = new Completer();
    
    var choicesDiv = new DivElement();
    choicesDiv.classes.add("choices-div");
    
    if (choiceList.question != null) {
      var choicesQuestionP = new ParagraphElement();
      choicesQuestionP.innerHtml = markdown_to_html(choiceList.question);
      choicesQuestionP.classes.add("choices-question");
      choicesDiv.children.add(choicesQuestionP);
    }
    
    OListElement choicesOl = new OListElement();
    choicesOl.classes.add("choices-ol");
    
    Set<StreamSubscription> clickSubscriptions = new Set();
    
    // Build the <li> elements one by one.
    for (int i = 0; i < choiceList.length; i++) {
      EgbChoice choice = choiceList[i];
      ButtonElement btn = new ButtonElement();

      var number = new SpanElement();
      number.text = "${i+1}.";
      number.classes.add("choice-number");
      
      var choiceDisplay = new SpanElement();
      choiceDisplay.classes.add("choice-display");
      
      var choiceWithInfochips = new ChoiceWithInfochips(choice.string);
      if (!choiceWithInfochips.infochips.isEmpty) {
        var infochips = new SpanElement();
        infochips.classes.add("choice-infochips");
        for (int j = 0; j < choiceWithInfochips.infochips.length; j++) {
          var chip = new SpanElement();
          // TODO: markdown the string below (and sanitize), but not as a paragraph (like a -2E is _not_ a <li>) 
          chip.text = choiceWithInfochips.infochips[j];
          chip.classes.add("choice-infochip");
          infochips.append(chip);
        }
        choiceDisplay.append(infochips);
      }
      
      var text = new SpanElement();
      text.innerHtml = markdown_to_html(choiceWithInfochips.text); // TODO: remove the <p></p>!
      text.classes.add("choice-text");
      choiceDisplay.append(text);

      var subscription = btn.onClick.listen((MouseEvent event) =>
          _choiceClickListener(event, completer, choice, btn, choicesOl, 
              clickSubscriptions)
      );
      clickSubscriptions.add(subscription);
      
      btn.append(number);
      btn.append(choiceDisplay);
      
      choicesOl.append(btn);
    }
    
    choicesDiv.append(choicesOl);
    
    choicesDiv.classes.add("hidden");
    _recursiveRemoveScript(choicesDiv);
    bookDiv.append(choicesDiv);
    _showLoading(false);
    new Future(() => choicesDiv.classes.remove("hidden"));
    return completer.future;
  }

  void _choiceClickListener(MouseEvent event, Completer completer, 
                            EgbChoice choice, ButtonElement btn, 
                            OListElement choicesOl,
                            Set<StreamSubscription> clickSubscriptions) {
    // Send choice hash back to Scripter, but asynchronously.
    new Future.delayed(const Duration(milliseconds: 100), 
        () => completer.complete(choice.hash));
    _showLoading(true);
    // Mark this element as chosen.
    btn.classes.add("chosen");
    choicesOl.classes.add("chosen");
    // Unregister listeners.
    choicesOl.querySelectorAll("button").forEach(
        (ButtonElement b) => b.disabled = true);
    clickSubscriptions.forEach((StreamSubscription s) => s.cancel());
    clickSubscriptions.clear();
    // Show bookmark.
    if (_savegameToBe != null) {
      choicesOl.classes.add("bookmark");
      String savegameUid = _savegameToBe.uid;
      choicesOl.onClick.listen((_) => 
          _handleSavegameBookmarkClick(savegameUid));
      _savegameToBe = null;
    }
    event.stopPropagation();
  }
  
  
  int _currentPoints;
  Future<bool> awardPoints(PointsAward award) {
    _currentPoints = award.result;
    if (award.addition == 0) {
      // This is just setting the Points count. Don't show Toast.
      pointsSpan.text = "${award.result}";
      return new Future.value(true);
    }
    var completer = new Completer();
    
    ParagraphElement p = new ParagraphElement();
    p.text = "$award";
    p.classes.addAll(["toast", "non-dimmed", "hidden"]);
    // Not needed (yet?), but adding for extra security.
    _recursiveRemoveScript(p);
    bookDiv.append(p);
    new Future(() {
      p.classes.remove("hidden");
    });
    // Only add the action after element fully visible.
    new Future.delayed(_durationBetweenShowingElements, () {
      var metaEl = new PointsAwardElement.fromPointsAward(award, p);
      metaEl.action = () {
        pointsSpan.text = "${award.result}";
        _blink(p);
        p.classes.remove("non-dimmed");
        _blink(pointsSpan.parent); // The button element with pointsSpan in it.
      };
      _metaElements.add(metaEl);
      if (_periodicSubscription.isPaused) _periodicSubscription.resume();
      completer.complete(true);
    });
    return completer.future;
  }
  
  List<Stat> _statsList;
  final Map<String,Element> _statsElementMap = new Map();
  
  Future<bool> setStats(List<Stat> stats) {
    _statsList = stats;
    _printStats();  // DEBUG
    var statsDiv = document.querySelector("nav div#stats");
    statsDiv.children.clear();
    for (int i = 0; i < stats.length; i++) {
      var current = stats[i];
      var span = new SpanElement();
      span.text = current.toString();
      var a = new AnchorElement();
      a.classes.add("button");
      if (!current.show) a.classes.add("display-none");
      a.children.add(span);
      statsDiv.children.add(a);
      _statsElementMap[current.name] = a;
      a.onClick.listen(_statsOnClickListener);
    }
  }
  
  Future<bool> updateStats(Map<String,Object> mapContent) {
    Stat.updateStatsListFromMap(_statsList, mapContent);
    _printStats();  // DEBUG
    _statsList.where((stat) => stat.changed).forEach((Stat current) {
      var a = _statsElementMap[current.name];
      a.children.single.text = current.toString();
      if (current.show) {
        a.classes.remove("display-none");
      } else {
        a.classes.add("display-none");
      }
    });
  }
  
  void _printStats() {
    print("Stats:");
    _statsList.where((stat) => stat.show == true).forEach((stat) {
      print("- $stat");
    });
  }
  
  /// Blinks the [el] element via CSS transitions.
  void _blink(Element el) {
    el.classes.add("blink");
    new Future.delayed(new Duration(milliseconds: 1000), 
        () => el.classes.remove("blink"));
  }
  
  /**
   * What happens when user clicks on a savegame bookmark.
   */
  void _handleSavegameBookmarkClick(String savegameUid) {
    // TODO: make more elegant, with confirmation appearing on page
    var confirm = window.confirm("Are you sure you want to come back to "
            "this decision ($savegameUid) and lose your progress since?");
    if (confirm) {
      bookDiv.children.clear();
      // TODO: retain scroll position
      sendLoadIntent(savegameUid);
      // TODO: solve for when savegame with that uid is not available
    }
  }
  
//  DivElement bookmarkDiv;
  
  /**
   * Stored savegame which wait for the next choiceList to be appended to it.
   */
  EgbSavegame _savegameToBe;
  
  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    print("Creating savegame bookmark for ${savegame.uid}");
    _textHistory.clear();  // The _textHistory has been saved with the savegame.
    assert(_savegameToBe == null);
    _savegameToBe = savegame;
//    bookmarkDiv = new DivElement();
//    bookmarkDiv.id = "bookmark-uid-${savegame.uid}";
//    bookmarkDiv.classes.add("bookmark-div");
//    var bookmarkAnchor = new AnchorElement();
//    var bookmarkImg = new ImageElement(src: "img/bookmark.png", 
//        width: 30, height: 60);
//    bookmarkAnchor.append(bookmarkImg);
//    bookmarkAnchor.onClick.listen((_) {
//      _handleSavegameBookmarkClick(savegame.uid);
//    });
//    bookmarkDiv.append(bookmarkAnchor);
  }
  
  /**
   * Shows a dialog.
   */
  Future<bool> showDialog(Dialog dialog) {
    DivElement dialogEl = new DivElement()
      ..classes.add("dialog");
    DivElement wrapper = new DivElement();
    HeadingElement titleEl = new HeadingElement.h3()
      ..text = dialog.title;
    wrapper.children.add(titleEl);
    DivElement textEl = new DivElement()
      ..innerHtml = dialog.html;
    wrapper.children.add(textEl);
    DivElement buttonsDivEl = new DivElement()
      ..classes.add("dialog-buttons");
    for (DialogButton button in dialog.buttons) {
      ButtonElement buttonEl = new ButtonElement()
        ..text = button.label;
      buttonEl.onClick.listen((_) {
        bool shouldClose = button.behaviour();
        if (shouldClose) {
          dialogEl.remove();
        }
      });
      buttonsDivEl.children.add(buttonEl);
    }
    wrapper.children.add(buttonsDivEl);
    dialogEl.children.add(wrapper);
    document.body.children.add(dialogEl);
  }
  
  void _statsOnClickListener(Event event) {
    var html = new StringBuffer();
    html.writeln("<table>");
    html.writeln("<tr><td>Points:</td><td>${_currentPoints}</td></tr>");
    for (int i = 0; i < _statsList.length; i++) {
      Stat s = _statsList[i];
      if (s.show) {
        html.writeln("<tr><td>${s.name}:</td>"
                     "<td>${s.toString()}</td></tr>");
      }
    }
    html.writeln("</table>");
    var d = new Dialog("Stats", html.toString());
    showDialog(d);
  }
}

class Dialog {
  String title;
  String html;
  List<DialogButton> buttons;
  
  Dialog(this.title, this.html, [this.buttons = const [const DialogButton.JustClose("Close")]]);
}

class DialogButton {
  final String label;
  
  final ClickBehaviour _behaviour;
  static final ClickBehaviour NO_BEHAVIOUR = () => true;
  ClickBehaviour get behaviour {
    if (_behaviour == null) {
      return NO_BEHAVIOUR;
    } else {
      return _behaviour;
    }
  }
  const DialogButton(this.label, this._behaviour);
  const DialogButton.JustClose(this.label) : _behaviour = null; 
}

/// Returns true if dialog can be closed.
typedef bool ClickBehaviour();


/**
 * A special class for storing information about a PointsAward together
 * with its meta element.
 */
class PointsAwardElement extends PointsAward implements EgbMetaElement {
  final Element element;
  PointsAwardElement(this.element, int addition, int result, 
      [String justification]) : super(addition, result, justification);
  
  PointsAwardElement.fromPointsAward(PointsAward pointsAward, this.element)
      : super(pointsAward.addition, pointsAward.result, 
          pointsAward.justification);
  
  Action action;
  void doAction() {
    if (action != null && action is Action) {
      action();
      done = true;
    } else {
      throw new StateError("Called doAction() although action is null.");
    }
  }
  bool done = false;
}

abstract class EgbMetaElement {
  final Element element;
  Action action;
  void doAction();
  bool done;
  
  EgbMetaElement(this.element);
}

/// A simple callback closure for use with metaElements (called when element
/// comes into view).
typedef void Action();

/**
 * LocalStorage is the HTML5 implementation of EgbStorage (only runs in
 * [HtmlInterface]).
 * 
 * TODO: either use lawndart or make the following more robust
 */
class LocalStorage implements EgbStorage {
  Future<bool> save(String key, String value) {
    window.localStorage[key] = value;
    return new Future.value(true);
  }
  
  Future<String> load(String key) {
    var result = window.localStorage[key];
    return new Future.value(result);
  }
  
  Future<bool> delete(String key) {
    window.localStorage.remove(key);
    return new Future.value(true);
  }
  
  EgbPlayerProfile getDefaultPlayerProfile() {
    return new EgbPlayerProfile(EgbStorage.DEFAULT_PLAYER_UID, 
        this);
  }
}