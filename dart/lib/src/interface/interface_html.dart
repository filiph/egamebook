library egb_interface_html;

import 'dart:async';
import 'dart:html' hide FormElement;

import 'package:markdown/markdown.dart' show markdownToHtml;

import 'interface.dart';
export 'interface.dart' show EgbInterface;
import '../persistence/savegame.dart';
import '../shared/user_interaction.dart';
import '../shared/points_award.dart';
import '../shared/stat.dart';

// because we're defining localStorage here
import '../persistence/storage.dart';
import '../persistence/player_profile.dart';

import 'choice_with_infochips.dart';
import 'package:egamebook/src/interface/form_proxy.dart';
import 'package:egamebook/src/shared/form.dart';
import 'package:html5lib/dom.dart' as html5lib;

class HtmlInterface extends EgbInterfaceBase {
  AnchorElement restartAnchor;
  SpanElement pointsSpan;
  
  DivElement bookDiv;
  
  ButtonElement startButton;
  DivElement bookTitleDiv;
  DivElement bigBottomButtonDiv;
  
  /// The interface shows the title 'activity' (with a big START button on
  /// the bottom).
  static const int UI_ACTIVITY_TITLE = 1;
  /// The UI is in the play state.
  static const int UI_ACTIVITY_BOOK = 2;
  int currentActivity = UI_ACTIVITY_TITLE;
  
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

    restartAnchor = document.querySelector("nav a#book-restart");
    restartAnchor.onClick.listen((_) {
      scripterProxy.restart();
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

  /**
   * This is called when the book is ready to be played. 
   */
  void _bookReadyHandler() {
    startButton.text = "START";
    startButton.disabled = false;
    startButton.onClick.first.then((_) {
      bookDiv.style.display = "block";
      new Future(() {  // Give the browser time to switch scrolling on.
        assert(bookDiv.children.length > 0);
        bookDiv.children.last  // TODO: first/last according to Continue/Start
          .scrollIntoView();  
        bookTitleDiv.style.display = "none";
        bigBottomButtonDiv.style.display = "none";
        currentActivity = UI_ACTIVITY_BOOK;
      });
    });
  }
  
  ParagraphElement _loadingEl;
  /// Used to store [_loadingEl]'s state outside the DOM (i.e. in memory).
  bool _loadingElCurrentShowState = null;
  /**
   * Sets visibility of the loading gizmo.
   */
  void _showLoading(bool show) {
    if (_loadingElCurrentShowState != null && 
        show == _loadingElCurrentShowState) {
      return;  // Don't do anything if the show state is the same already.
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
      String html = markdownToHtml(s);
      DocumentFragment container = new DocumentFragment();
      container.innerHtml = html;
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
        bookDiv.append(el);
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
  
  Future<int> showChoices(EgbChoiceList choiceList) {
    if (currentActivity == UI_ACTIVITY_TITLE) {
      _bookReadyHandler();
    }
    
    var completer = new Completer();
    
    var choicesDiv = new DivElement();
    choicesDiv.classes.add("choices-div");
    
    if (choiceList.question != null) {
      var choicesQuestionP = new ParagraphElement();
      choicesQuestionP.innerHtml = 
          markdownToHtml(choiceList.question, inlineOnly: true);
      choicesQuestionP.classes.add("choices-question");
      choicesDiv.children.add(choicesQuestionP);
    }
    
    OListElement choicesOl = new OListElement();
    choicesOl.classes.add("choices-ol");
    
    Set<StreamSubscription> clickSubscriptions = new Set<StreamSubscription>();
    
    // Build the <li> elements of the main (non-submenu) choices, one by one.
    int mainChoiceListNumber = 1;
    choiceList.where((choice) => choice.submenu == null).forEach((choice) {
      ButtonElement btn = _createChoiceButton("$mainChoiceListNumber.", choice, 
          completer, choicesDiv, clickSubscriptions);
      
      choicesOl.append(btn);
      mainChoiceListNumber++;
    });
    choicesDiv.append(choicesOl);
    
    // Now let's see if there are any submenus we need to show.
    Map<String,Submenu> submenus = new Map<String,Submenu>();
    choiceList.where((choice) => choice.submenu != null).forEach((choice) {
      Submenu sub = submenus.putIfAbsent(choice.submenu, 
          () => new Submenu(choice.submenu));
      sub.choices.add(choice);
    });
    
    if (submenus.isNotEmpty) {
      DivElement submenusDiv = new DivElement()
      ..classes.add("choices-submenus");
      
      DivElement submenuButtonsDiv = new DivElement()
      ..classes.add("choices-submenu-buttons");
      submenusDiv.append(submenuButtonsDiv);
      
      submenus.forEach((name, submenu) {
        ButtonElement submenuButton = new ButtonElement()
        ..classes.add("submenu-button")
        ..text = submenu.name;
        
        submenuButtonsDiv.append(submenuButton);
        
        OListElement submenuChoicesOl = new OListElement()
        ..classes.addAll(["choices-ol", "display-none"]);
        
        submenu.choices.forEach((choice) {
          ButtonElement btn = _createChoiceButton("", choice, 
              completer, choicesDiv, clickSubscriptions);
          
          submenuChoicesOl.append(btn);
        });
        
        var clickSubscription = submenuButton.onClick.listen((_) {
          submenuChoicesOl.classes.toggle("display-none");
          submenuButton.classes.toggle("depressed");
        });
        clickSubscriptions.add(clickSubscription);
        
        submenusDiv.append(submenuChoicesOl);
      });
      
      choicesDiv.append(submenusDiv);
    }
    
    choicesDiv.classes.add("hidden");
    bookDiv.append(choicesDiv);
    _showLoading(false);
    new Future(() => choicesDiv.classes.remove("hidden"));
    return completer.future;
  }

  ButtonElement _createChoiceButton(String index, EgbChoice choice, 
                          Completer completer, DivElement choicesDiv,
                          Set<StreamSubscription> clickSubscriptions) {
    ButtonElement btn = new ButtonElement();
    
    var number = new SpanElement();
    number.text = index;
    number.classes.add("choice-number");
    
    var choiceDisplay = new SpanElement();
    choiceDisplay.classes.add("choice-display");
    
    var choiceWithInfochips = new ChoiceWithInfochips(choice.string);
    if (!choiceWithInfochips.infochips.isEmpty) {
      var infochips = new SpanElement();
      infochips.classes.add("choice-infochips");
      for (int j = 0; j < choiceWithInfochips.infochips.length; j++) {
        var chip = new SpanElement();
        chip.text = markdownToHtml(choiceWithInfochips.infochips[j], 
            inlineOnly: true);
        chip.classes.add("choice-infochip");
        infochips.append(chip);
      }
      choiceDisplay.append(infochips);
    }
    
    var text = new SpanElement();
    text.innerHtml = markdownToHtml(choiceWithInfochips.text, 
        inlineOnly: true);
    text.classes.add("choice-text");
    choiceDisplay.append(text);
    
    var subscription = btn.onClick.listen((MouseEvent event) =>
        _choiceClickListener(event, completer, choice, btn, choicesDiv, 
            clickSubscriptions)
    );
    clickSubscriptions.add(subscription);
    
    btn.append(number);
    btn.append(choiceDisplay);
    return btn;
  }

  void _choiceClickListener(MouseEvent event, Completer completer, 
                            EgbChoice choice, ButtonElement btn, 
                            DivElement choicesDiv,
                            Set<StreamSubscription> clickSubscriptions) {
    // Send choice hash back to Scripter, but asynchronously.
    new Future.delayed(const Duration(milliseconds: 100), 
        () => completer.complete(choice.hash));
    _showLoading(true);
    // Mark this element as chosen.
    btn.classes.add("chosen");
    choicesDiv.classes.add("chosen");
    // Unregister listeners.
    choicesDiv.querySelectorAll("button").forEach(
        (ButtonElement b) => b.disabled = true);
    clickSubscriptions.forEach((StreamSubscription s) => s.cancel());
    clickSubscriptions.clear();
    // Show bookmark.
    if (_savegameToBe != null) {
      choicesDiv.classes.add("bookmark");
      String savegameUid = _savegameToBe.uid;
      choicesDiv.onClick.listen((_) => 
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
  
  List<UIStat> _statsList;
  final Map<String,Element> _statsElementMap = new Map();
  
  Future<bool> setStats(List<UIStat> stats) {
    _statsList = stats;
    _printStats();  // DEBUG
    var statsDiv = document.querySelector("nav div#stats");
    statsDiv.children.clear();
    for (int i = 0; i < stats.length; i++) {
      var current = stats[i];
      var span = new SpanElement();
      span.text = current.string;
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
    UIStat.updateStatsListFromMap(_statsList, mapContent)
      // Returns only the changed stats.
      .forEach((UIStat current) {
        var a = _statsElementMap[current.name];
        a.children.single.text = current.string;
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
    // TODO: make more elegant, with confirmation appearing on page, 
    //       and non-blocking
    var confirm = window.confirm("Are you sure you want to come back to "
            "this decision ($savegameUid) and lose your progress since?");
    if (confirm) {
      bookDiv.children.clear();
      // TODO: retain scroll position
      playerProfile.load(savegameUid)
      .then((EgbSavegame savegame) {
          if (savegame == null) {
            // no savegames for this egamebook savegame uid
            reportError("Bad gamesave", "That savegame is missing.");
            // TODO: provide solutions, feedback, etc.
          } else {
            showText(savegame.textHistory)
            .then((_) {
              scripterProxy.load(savegame);
            });
          }
       });
    }
  }
  
//  DivElement bookmarkDiv;
  
  /**
   * Stored savegame which wait for the next choiceList to be appended to it.
   */
  EgbSavegame _savegameToBe;
  
  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    print("Creating savegame bookmark for ${savegame.uid}");
    assert(_savegameToBe == null);
    _savegameToBe = savegame;
    return new Future.value(true);
    
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
    var completer = new Completer<bool>();
    
    DivElement dialogEl = new DivElement()
      ..classes.add("dialog");
    DivElement wrapper = new DivElement();
    HeadingElement titleEl = new HeadingElement.h3()
      ..text = dialog.title;
    wrapper.children.add(titleEl);
    DivElement contentEl = new DivElement()
      ..classes.add("dialog-content");
    wrapper.children.add(contentEl);
    DivElement textEl = new DivElement()
      ..innerHtml = dialog.html;
    contentEl.children.add(textEl);
    DivElement buttonsDivEl = new DivElement()
      ..classes.add("dialog-buttons");
    for (DialogButton button in dialog.buttons) {
      ButtonElement buttonEl = new ButtonElement()
        ..text = button.label;
      buttonEl.onClick.listen((_) {
        bool shouldClose = button.behaviour();
        if (shouldClose) {
          dialogEl.remove();
          completer.complete(true);
        }
      });
      buttonsDivEl.children.add(buttonEl);
    }
    wrapper.children.add(buttonsDivEl);
    dialogEl.children.add(wrapper);
    document.body.children.add(dialogEl);
    return completer.future;
  }
  
  void _statsOnClickListener(Event event) {
    var html = new StringBuffer();
    html.writeln("<table>");
    html.writeln("<tr><td>Points:</td><td>${_currentPoints}</td></tr>");
    for (int i = 0; i < _statsList.length; i++) {
      UIStat s = _statsList[i];
      if (s.show) {
        html.writeln("<tr><td>${s.name}:</td>"
                     "<td>${s.string}</td></tr>");
      }
    }
    html.writeln("</table>");
    var d = new Dialog("Stats", html.toString());
    showDialog(d);
  }

  Future<bool> reportError(String title, String text) {
    Dialog error = new Dialog(title, "<p>$text</p>");
    return showDialog(error);
  }

  @override
  void save(EgbSavegame savegame) {
    _textHistory.clear();
    playerProfile.save(savegame);
    addSavegameBookmark(savegame);
  }

  @override
  void log(String text) {
    print("HtmlInterface.log: $text");
  }

  /// Currently shown [FormProxy].
  FormProxy _formProxy;
  @override
  Stream<CurrentState> showForm(FormProxy formProxy) {
    _formProxy = formProxy;
    HtmlForm form = _formProxy.buildUiElements(ELEMENT_BUILDERS);
    bookDiv.append(form.uiRepresentation);
    return _formProxy.stream;
  }

  @override
  void updateForm(FormConfiguration values) {
    _formProxy.update(values);
  }
}

Map<String,UiElementBuilder> ELEMENT_BUILDERS = {
  "Form": (FormElement e) => new HtmlForm(e),
  "RangeInput": (FormElement e) => new HtmlRangeInput(e)
};

class HtmlForm implements UiElement {
  static const String DEFAULT_SUBMIT_TEXT = ">>";
  
  FormProxy blueprint;
  DivElement uiRepresentation;
  DivElement _childrenContainer;
  ButtonElement submitButton;
  
  HtmlForm(this.blueprint) {
    uiRepresentation = new DivElement()
      ..classes.add("form");
    
    // TODO: Add 'header' to the form?
    
    _childrenContainer = new DivElement();
    uiRepresentation.append(_childrenContainer);
    
     String submitText = blueprint.submitText;
     if (submitText == null) {
       submitText = DEFAULT_SUBMIT_TEXT;
     }
     
     submitButton = new ButtonElement()
     ..classes.add("submit")
     ..text = submitText;
     
     StreamSubscription subscription;
     subscription = submitButton.onClick
         .listen((ev) {
       _onInputController.add(ev);
       subscription.cancel();
     });
     uiRepresentation.append(submitButton);
  }
  
  @override
  void appendChild(Object childUiRepresentation) {
    _childrenContainer.append(childUiRepresentation);
  }

  bool _disabled = false;
  @override
  bool get disabled => _disabled;

  @override
  set disabled(bool value) {
    _disabled = value;
    submitButton.disabled = value;
  }

  StreamController _onInputController = new StreamController();
  @override
  Stream get onInput => _onInputController.stream;

  @override
  void update() {
    submitButton.text = blueprint.submitText;
  }

  @override
  void set waitingForUpdate(bool _waitingForUpdate) {
    // TODO: implement waitingForUpdate
  }

  // TODO: implement waitingForUpdate
  @override
  bool get waitingForUpdate => null;

  @override
  Object get current => null;
}

class HtmlRangeInput implements UiElement {
  BaseRangeInput blueprint;
  DivElement uiRepresentation;
  DivElement _childrenElement;
  DivElement _radioButtonsDiv;
  
  HtmlRangeInput(this.blueprint) {
    uiRepresentation = new DivElement()
      ..classes.add("range-input")
      ..id = blueprint.id;
    
    LabelElement label = new LabelElement()
    ..htmlFor = blueprint.id
    ..text = blueprint.name;
    uiRepresentation.append(label);
    
    _radioButtonsDiv = new DivElement()
    ..classes.add("buttons");
    uiRepresentation.append(_radioButtonsDiv);
    
    update();
    
    _childrenElement = new DivElement();
    uiRepresentation.append(_childrenElement);
  }

  void _createRadioButtons() {
    for (int i = blueprint.min; i <= blueprint.max; i += blueprint.step) {
      RadioButtonInputElement radioButton = new RadioButtonInputElement()
      ..name = blueprint.id
      ..checked = i == blueprint.current
      ..value = "$i"
      ..disabled = (blueprint.minEnabled != null && i < blueprint.minEnabled)
      || (blueprint.maxEnabled != null && i > blueprint.maxEnabled) ||
      disabled || waitingForUpdate;
      if (!radioButton.disabled) {
        StreamSubscription subscription;
        subscription = radioButton.onClick.listen((ev) {
          _current = i;
          _onInputController.add(ev);
        });
      }
      _radioButtonsDiv.append(radioButton);
    }
  }

  @override
  void appendChild(Object childUiRepresentation) {
    _childrenElement.append(childUiRepresentation);
  }

  bool _disabled = false;
  @override
  bool get disabled => _disabled;

  @override
  set disabled(bool value) {
    _disabled = value;
    update();
  }

  StreamController _onInputController = new StreamController();
  @override
  Stream get onInput => _onInputController.stream;

  int _current;
  @override
  int get current => _current;

  @override
  void update() {
    _current = blueprint.current;
    _radioButtonsDiv.children.clear();
    _createRadioButtons();
  }

  bool _waitingForUpdate = false;
  @override
  void set waitingForUpdate(bool value) {
    _waitingForUpdate = value;
    update();
  }

  @override
  bool get waitingForUpdate => _waitingForUpdate;
}

class Submenu {
  final String name;
  final List<EgbChoice> choices = new List<EgbChoice>();
  
  Submenu(this.name);
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