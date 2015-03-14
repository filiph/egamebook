library egb_interface_html;

/// Default implementation of the [EgbInterface] abstract class. It uses
/// vanilla [:dart:html:] to act as an interface to an [EgbScripter]. This means
/// no fancy framework is used. It also means there are probably many edge cases
/// and even bugs, and it's not that extensible.

import 'dart:async';
import 'dart:html' hide FormElement;

import 'package:markdown/markdown.dart' as mdown show InlineParser,
    InlineSyntax, TagSyntax, TagState, markdownToHtml, Element;

import '../../interface.dart';
export '../../interface.dart' show EgbInterface;
import '../../src/persistence/savegame.dart';
import '../../src/shared/user_interaction.dart';
import '../../src/shared/points_award.dart';
import '../../src/shared/stat.dart';

// because we're defining localStorage here
import '../../src/persistence/storage.dart';
import '../../src/persistence/player_profile.dart';

import '../../src/interface/choice_with_infochips.dart';
import 'package:egamebook/src/interface/form_proxy.dart';
import 'package:egamebook/src/shared/form.dart';
import "package:html5lib/dom.dart" as html5lib;

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
    document.querySelector("a#points-button").onClick.listen(
        _statsOnClickListener);

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
      new Future(() { // Give the browser time to switch scrolling on.
        assert(bookDiv.children.length > 0);
        bookDiv.children.last // TODO: first/last according to Continue/Start
        .scrollIntoView();
        bookTitleDiv.style.display = "none";
        bigBottomButtonDiv.style.display = "none";
        currentActivity = UI_ACTIVITY_BOOK;
      });
    });
  }

  ParagraphElement _loadingEl;
  /// Used to store [_loadingEl]'s state outside the DOM (i.e. in memory).
  bool _loadingElVisible;
  /**
   * Sets visibility of the loading gizmo.
   */
  void _showLoading(bool show) {
    if (_loadingElVisible != null && show ==
        _loadingElVisible) {
      return; // Don't do anything if the show state is the same already.
    }
    _loadingEl.style.visibility = (show ? "visible" : "hidden");
    _loadingElVisible = show;
  }

  void endBook() {
    print("The book has ended.");
  }

  void close() {
    super.close();
  }
  
  static const Duration _durationBetweenShowingText = const Duration(
      milliseconds: 100);

  /**
   * Converts [s] to HTML elements (via markdown) and shows them one by one
   * on page. Returns when complete.
   */
  Future<bool> showText(String s) {
    if (s == null) return new Future.value(false);
    Completer completer = new Completer<bool>();

    _showLoading(false);

    new Future.delayed(_durationBetweenShowingText, () {
      _textHistory.write("$s\n\n");
      final List<mdown.InlineSyntax> syntaxes =
          <mdown.InlineSyntax>[new FootnoteSupTagSyntax()];
      String html = mdown.markdownToHtml(s, inlineSyntaxes: syntaxes);
      DocumentFragment container = new DocumentFragment();
      container.innerHtml = html;
      int count = 0;
      for (Element el in container.children) {
        if (USE_SHOWTEXT_ANIMATION) {
          count++;
          el.classes.add("hidden");
          num transitionDelay = _durationBetweenShowingElements.inMilliseconds *
              (count - 1) / 1000;
          el.style.transitionDelay = "${transitionDelay}s";
          new Future(() {
            el.classes.remove("hidden");
          });
        }
        _attachFootnoteClickListeners(el);
        bookDiv.append(el);
      }
      container.remove();
      // TODO: find out if necessary to avoid leaks

      new Future.delayed(_durationBetweenShowingElements * count, () =>
          completer.complete(true));
    });

    return completer.future;
  }

  /// Search for footnotes in [el] and attach click listeners on them. Clicking
  /// on a footnote creates a [Dialog] with the [Element.title] as its
  /// text content.
  void _attachFootnoteClickListeners(Element el) {
    // Search for footnotes and attach click listeners on them.
    el.querySelectorAll(".footnote").forEach((Element footnoteEl) {
      print("Found footnote");
      footnoteEl.onClick.listen((_) {
        showDialog(new Dialog("Footnote", "<p>${footnoteEl.title}</p>"));
      });
    });
  }

  static const bool USE_SHOWTEXT_ANIMATION = false;
  static const Duration _durationBetweenShowingElements = const Duration(
      milliseconds: 200);
  static const Duration _durationBetweenCheckingForMetaElements =
      const Duration(milliseconds: 1000);
  final Stream _periodic = new Stream.periodic(
      _durationBetweenCheckingForMetaElements);
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
    // Remove _metaElements whose actions have already been triggered.
    _metaElements.removeWhere((metaEl) => metaEl.done);
  }

  /**
   * Checks if user scrolled past the end of [bookDiv].
   */
  bool _isScrolledPastToEnd() {
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
      choicesQuestionP.innerHtml = mdown.markdownToHtml(choiceList.question,
          inlineOnly: true);
      choicesQuestionP.classes.add("choices-question");
      choicesDiv.append(choicesQuestionP);
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
    Map<String, Submenu> submenus = new Map<String, Submenu>();
    choiceList.where((choice) => choice.submenu != null).forEach((choice) {
      Submenu sub = submenus.putIfAbsent(choice.submenu, () => new Submenu(
          choice.submenu));
      sub.choices.add(choice);
    });

    if (submenus.isNotEmpty) {
      DivElement submenusDiv = new DivElement()..classes.add("choices-submenus"
          );

      DivElement submenuButtonsDiv = new DivElement()..classes.add(
          "choices-submenu-buttons");
      submenusDiv.append(submenuButtonsDiv);

      submenus.forEach((name, submenu) {
        ButtonElement submenuButton = new ButtonElement()
            ..classes.add("submenu-button")
            ..text = submenu.name;

        submenuButtonsDiv.append(submenuButton);

        OListElement submenuChoicesOl = new OListElement()..classes.addAll(
            ["choices-ol", "display-none"]);

        submenu.choices.forEach((choice) {
          ButtonElement btn = _createChoiceButton("", choice, completer,
              choicesDiv, clickSubscriptions);

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

  ButtonElement _createChoiceButton(String index, EgbChoice choice, Completer
      completer, DivElement choicesDiv, Set<StreamSubscription> clickSubscriptions) {
    ButtonElement btn = new ButtonElement();

    var numberSpan = new SpanElement();
    numberSpan.text = index;
    numberSpan.classes.add("choice-number");

    var choiceDisplaySpan = new SpanElement();
    choiceDisplaySpan.classes.add("choice-display");

    var choiceWithInfochips = new ChoiceWithInfochips(choice.string);
    if (!choiceWithInfochips.infochips.isEmpty) {
      var infochipsSpan = new SpanElement();
      infochipsSpan.classes.add("choice-infochips");
      for (int j = 0; j < choiceWithInfochips.infochips.length; j++) {
        var chipSpan = new SpanElement();
        chipSpan.text = mdown.markdownToHtml(choiceWithInfochips.infochips[j],
            inlineOnly: true);
        chipSpan.classes.add("choice-infochip");
        infochipsSpan.append(chipSpan);
      }
      choiceDisplaySpan.append(infochipsSpan);
    }

    var textSpan = new SpanElement();
    textSpan.innerHtml = mdown.markdownToHtml(choiceWithInfochips.text, inlineOnly:
        true);
    textSpan.classes.add("choice-text");
    choiceDisplaySpan.append(textSpan);

    var subscription = btn.onClick.listen((MouseEvent event) =>
        _choiceClickListener(event, completer, choice, btn, choicesDiv,
        clickSubscriptions));
    clickSubscriptions.add(subscription);

    btn.append(numberSpan);
    btn.append(choiceDisplaySpan);
    return btn;
  }

  static const Duration _durationBetweenSendingHash = const Duration(
      milliseconds: 100);
  
  // TODO: use onClick.first.then() - no need to unregister listener
  void _choiceClickListener(MouseEvent event, Completer completer, EgbChoice
      choice, ButtonElement btn, DivElement choicesDiv, Set<StreamSubscription>
      clickSubscriptions) {
    // Send choice hash back to Scripter, but asynchronously.
    new Future.delayed(_durationBetweenSendingHash, () =>
        completer.complete(choice.hash));
    _showLoading(true);
    // Mark this element as chosen.
    btn.classes.add("chosen");
    choicesDiv.classes.add("chosen");
    // Unregister listeners.
    choicesDiv.querySelectorAll("button").forEach((ButtonElement b) =>
        b.disabled = true);
    clickSubscriptions.forEach((StreamSubscription s) => s.cancel());
    clickSubscriptions.clear();
    // Show bookmark.
    if (_savegameToBe != null) {
      choicesDiv.classes.add("bookmark");
      String savegameUid = _savegameToBe.uid;
      choicesDiv.onClick.listen((_) => _handleSavegameBookmarkClick(savegameUid)
          );
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

    ParagraphElement paragraph = new ParagraphElement();
    paragraph.text = "$award";
    paragraph.classes.addAll(["toast", "non-dimmed", "hidden"]);
    // Not needed (yet?), but adding for extra security.
    bookDiv.append(paragraph);
    new Future(() {
      paragraph.classes.remove("hidden");
    });
    // Only add the action after element fully visible.
    new Future.delayed(_durationBetweenShowingElements, () {
      var metaEl = new PointsAwardElement.fromPointsAward(award, paragraph);
      metaEl.action = () {
        pointsSpan.text = "${award.result}";
        _blink(paragraph);
        paragraph.classes.remove("non-dimmed");
        _blink(pointsSpan.parent); // The button element with pointsSpan in it.
      };
      _metaElements.add(metaEl);
      if (_periodicSubscription.isPaused) _periodicSubscription.resume();
      completer.complete(true);
    });
    return completer.future;
  }

  List<UIStat> _stats;
  final Map<String, Element> _statsElements = new Map();

  Future setStats(List<UIStat> stats) {
    _stats = stats;
    _printStats(); // DEBUG
    var statsDiv = document.querySelector("nav div#stats");
    statsDiv.children.clear();
    for (int i = 0; i < stats.length; i++) {
      var stat = stats[i];
      var span = new SpanElement();
      span.text = stat.string;
      var anchor = new AnchorElement();
      anchor.classes.add("button");
      if (!stat.show) anchor.classes.add("display-none");
      anchor.children.add(span);
      statsDiv.children.add(anchor);
      _statsElements[stat.name] = anchor;
      anchor.onClick.listen(_statsOnClickListener);
    }
    return new Future.value();
  }

  Future updateStats(StatUpdateCollection updates) {
    UIStat.updateStatsList(_stats, updates
        )// Returns only the changed stats.
    .forEach((UIStat stat) {
      var anchor = _statsElements[stat.name];
      anchor.children.single.text = stat.string;
      if (stat.show) {
        anchor.classes.remove("display-none");
      } else {
        anchor.classes.add("display-none");
      }
    });
    return new Future.value();
  }

  void _printStats() {
    print("Stats:");
    _stats.where((stat) => stat.show == true).forEach((stat) {
      print("- $stat");
    });
  }

  /// Blinks the [el] element via CSS transitions.
  void _blink(Element el) {
    el.classes.add("blink");
    new Future.delayed(new Duration(milliseconds: 1000), () =>
        el.classes.remove("blink"));
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
      playerProfile.load(savegameUid).then((EgbSavegame savegame) {
        if (savegame == null) {
          // no savegames for this egamebook savegame uid
          reportError("Bad gamesave", "That savegame is missing.");
          // TODO: provide solutions, feedback, etc.
        } else {
          showText(savegame.textHistory).then((_) {
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

    DivElement dialogDiv = new DivElement()..classes.add("dialog");
    DivElement wrapperDiv = new DivElement();
    HeadingElement titleEl = new HeadingElement.h3()..text = dialog.title;
    wrapperDiv.children.add(titleEl);
    DivElement contentDiv = new DivElement()..classes.add("dialog-content");
    wrapperDiv.children.add(contentDiv);
    DivElement textDiv = new DivElement()..innerHtml = dialog.html;
    contentDiv.children.add(textDiv);
    DivElement buttonsDiv = new DivElement()..classes.add("dialog-buttons");
    for (DialogButton dialogButton in dialog.buttons) {
      ButtonElement buttonEl = new ButtonElement()..text = dialogButton.label;
      buttonEl.onClick.listen((_) {
        bool shouldClose = dialogButton.behaviour();
        if (shouldClose) {
          dialogDiv.remove();
          completer.complete(true);
        }
      });
      buttonsDiv.children.add(buttonEl);
    }
    wrapperDiv.children.add(buttonsDiv);
    dialogDiv.children.add(wrapperDiv);
    document.body.children.add(dialogDiv);
    return completer.future;
  }

  void _statsOnClickListener(Event event) {
    var html = new StringBuffer();
    html.writeln("<table>");
    html.writeln("<tr><td>Points:</td><td>${_currentPoints}</td></tr>");
    for (int i = 0; i < _stats.length; i++) {
      UIStat stat = _stats[i];
      if (stat.show) {
        html.writeln("<tr><td>${stat.name}:</td>" "<td>${stat.string}</td></tr>");
      }
    }
    html.writeln("</table>");
    var dialog = new Dialog("Stats", html.toString());
    showDialog(dialog);
  }

  Future<bool> reportError(String title, String text) {
    Dialog errorDialog = new Dialog(title, "<p>$text</p>");
    return showDialog(errorDialog);
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
    if (currentActivity == UI_ACTIVITY_TITLE) {
      _bookReadyHandler();
    }
    _formProxy = formProxy;
    HtmlForm form = _formProxy.buildUiElements(ELEMENT_BUILDERS);
    bookDiv.append(form.uiRepresentation);
    _attachFootnoteClickListeners(form.uiRepresentation);
    _showLoading(false);
    return _formProxy.stream;
  }

  @override
  void updateForm(FormConfiguration values) {
    _formProxy.update(values);
  }
}

Map<String, UiElementBuilder> ELEMENT_BUILDERS = {
  FormBase.elementClass: (FormElement e) => new HtmlForm(e),
  FormSection.elementClass: (FormElement e) => new HtmlFormSection(e),
  BaseSubmitButton.elementClass: (FormElement e) => new HtmlSubmitButton(e),
  BaseCheckboxInput.elementClass: (FormElement e) => new HtmlCheckboxInput(e),
  BaseRangeInput.elementClass: (FormElement e) => new HtmlRangeInput(e),
  BaseRangeOutput.elementClass: (FormElement e) => new HtmlRangeOuput(e),
  BaseTextOutput.elementClass: (FormElement e) => new HtmlTextOuput(e),
  BaseMultipleChoiceInput.elementClass: (FormElement e) =>
      new HtmlMultipleChoiceInput(e),
  BaseOption.elementClass: (FormElement e) => new HtmlOption(e)
};

abstract class HtmlUiElement extends UiElement {
  HtmlUiElement(FormElement blueprint) : super(blueprint);

  Element uiRepresentation;

  bool _hidden = false;
  @override
  set hidden(bool value) {
    if (value == true) {
      uiRepresentation.classes.add("display-none");
    } else {
      uiRepresentation.classes.remove("display-none");
    }
    _hidden = value;
  }

  @override
  bool get hidden => _hidden;
}

class HtmlForm extends HtmlUiElement {
  static const String DEFAULT_SUBMIT_TEXT = ">>";

  FormProxy blueprint;
  DivElement uiRepresentation;
  DivElement _childrenContainerDiv;
  ButtonElement submitButton;

  HtmlForm(FormProxy blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new DivElement()..classes.add("form");

    // TODO: Add 'header' to the form?

    _childrenContainerDiv = new DivElement();
    uiRepresentation.append(_childrenContainerDiv);

    String submitText = blueprint.submitText;
    if (submitText == null) {
      submitText = DEFAULT_SUBMIT_TEXT;
    }

    submitButton = new ButtonElement()
        ..classes.add("submit-main")
        ..text = submitText;

    StreamSubscription subscription;
    subscription = submitButton.onClick.listen((ev) {
      _onChangeController.add(ev);
      subscription.cancel();
    });
    uiRepresentation.append(submitButton);
  }

  @override
  void appendChild(Object childUiRepresentation) {
    _childrenContainerDiv.append(childUiRepresentation);
  }

  bool _disabled = false;
  @override
  bool get disabled => _disabled;

  @override
  set disabled(bool value) {
    _disabled = value;
    submitButton.disabled = value;
  }

  StreamController _onChangeController = new StreamController();
  @override
  Stream get onChange => _onChangeController.stream;

  @override
  void update() {
    super.update();
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

class HtmlFormSection extends HtmlUiElement {

  FormSection blueprint;
  DivElement uiRepresentation;
  Element _headerEl;
  /// The element which opens or closes the FormSection contents when clicked.
  Element _openCloseEl;
  DivElement _childrenDiv;

  bool open = false;

  HtmlFormSection(FormSection blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new DivElement()
        ..classes.add("form-section")
        ..id = blueprint.id;

    DivElement titleWrapperDiv = new DivElement()
        ..classes.add("form-section-title-wrapper")
        ..onClick.listen((_) {
          open = !open;
          if (open) {
            _childrenDiv.classes.remove("closed");
            _openCloseEl.text = "<";
          } else {
            _childrenDiv.classes.add("closed");
            _openCloseEl.text = "V";
          }
        });

    _openCloseEl = new DivElement()
        ..classes.add("form-section-open-close")
        ..text = "V";
    titleWrapperDiv.append(_openCloseEl);

    _headerEl = new HeadingElement.h1()
        ..classes.add("form-section-title")
        ..text = blueprint.name;
    titleWrapperDiv.append(_headerEl);

    uiRepresentation.append(titleWrapperDiv);

    update();

    _childrenDiv = new DivElement()
        ..classes.add("form-section-children")
        ..classes.add("closed");
    uiRepresentation.append(_childrenDiv);
  }

  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  @override
  Object get current => _headerEl.text;

  @override
  bool disabled = false;

  @override
  Stream get onChange => null;

  @override
  void update() {
    super.update();
    _headerEl.text = blueprint.name;
  }

  @override
  bool waitingForUpdate = false;
}

class HtmlSubmitButton extends HtmlUiElement {
  InterfaceSubmitButton blueprint;
  ButtonElement uiRepresentation;
  DivElement _childrenDiv;

  HtmlSubmitButton(InterfaceSubmitButton blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    _childrenDiv = new DivElement();

    uiRepresentation = new ButtonElement()
    ..text = blueprint.name
    ..classes.add("submit-button")
    ..append(_childrenDiv)
    ..onClick.listen((ev) {
      _onChangeController.add(ev);
    });

    update();
  }

  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  @override
  Object get current => null;

  bool _disabled = false;
  @override
  bool get disabled => _disabled;

  @override
  set disabled(bool value) {
    uiRepresentation.disabled = value;
    _disabled = value;
  }

  StreamController _onChangeController = new StreamController();
  @override
  Stream get onChange => _onChangeController.stream;

  void update() {
    super.update();
    uiRepresentation.text = blueprint.name;
  }

  bool _waitingForUpdate = false;
  @override
  void set waitingForUpdate(bool value) {
    uiRepresentation.disabled = value;
    _waitingForUpdate = value;
  }

  @override
  bool get waitingForUpdate => _waitingForUpdate;
}

class HtmlCheckboxInput extends HtmlUiElement {
  BaseCheckboxInput blueprint;
  DivElement uiRepresentation;
  CheckboxInputElement _checkboxEl;
  LabelElement _labelEl;
  DivElement _childrenDiv;

  HtmlCheckboxInput(BaseCheckboxInput blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    print(this.blueprint.name);

    uiRepresentation = new DivElement()
        ..classes.add("checkbox-input")
        ..id = blueprint.id;

    String checkboxId = "${blueprint.id}-checkbox";
    _checkboxEl = new CheckboxInputElement()
        ..id = checkboxId;
    _labelEl = new LabelElement()
        ..htmlFor = checkboxId
        ..innerHtml = blueprint.name;
    uiRepresentation.append(_checkboxEl);
    uiRepresentation.append(_labelEl);

    update();

    _childrenDiv = new DivElement();
    uiRepresentation.append(_childrenDiv);
  }

  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  @override
  Object get current => _checkboxEl.checked;

  @override
  Stream get onChange => _checkboxEl.onChange;

  @override
  void update() {
    super.update();
    _checkboxEl.checked = blueprint.current;
  }

  @override
  bool waitingForUpdate = false;

  @override
  bool get disabled => _checkboxEl.disabled;

  @override
  set disabled(bool value) {
    _checkboxEl.disabled = value;
  }
}

abstract class HtmlRangeBase extends HtmlUiElement {
  BaseRange blueprint;
  DivElement uiRepresentation;
  DivElement _childrenDiv;
  DivElement _radioButtonsDiv;
  ParagraphElement _currentValueP;

  HtmlRangeBase(BaseRange blueprint, String divClass) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new DivElement()
        ..classes.add(divClass)
        ..id = blueprint.id;

    LabelElement label = new LabelElement()
        ..htmlFor = blueprint.id
        ..innerHtml = blueprint.name;
    uiRepresentation.append(label);

    DivElement buttonsAndValueDiv = new DivElement()..classes.add(
        "buttons-and-value");
    uiRepresentation.append(buttonsAndValueDiv);

    _radioButtonsDiv = new DivElement()..classes.add("buttons");
    buttonsAndValueDiv.append(_radioButtonsDiv);

    _currentValueP = new ParagraphElement()..classes.add("current-value");
    buttonsAndValueDiv.append(_currentValueP);

    _createRadioButtons();

    _childrenDiv = new DivElement();
    uiRepresentation.append(_childrenDiv);

    update();
  }

  Map<int, RadioButtonInputElement> _radioButtons =
      new Map<int, RadioButtonInputElement>();
  void _createRadioButtons() {
    for (int i = blueprint.min; i <= blueprint.max; i += blueprint.step) {
      RadioButtonInputElement radioButton = _createRadioButton(i);
      _radioButtons[i] = radioButton;
      _radioButtonsDiv.append(radioButton);
    }
  }

  RadioButtonInputElement _createRadioButton(int i);

  void _updateRadioButtons() {
    _radioButtons.forEach((int i, RadioButtonInputElement e) =>
        _updateRadioButton(i, e));
  }

  void _updateRadioButton(int i, RadioButtonInputElement radioButton);

  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  bool _disabled = false;
  @override
  bool get disabled => _disabled;

  @override
  set disabled(bool value) {
    _disabled = value;
    _updateRadioButtons();
  }

  StreamController _onChangeController = new StreamController();
  @override
  Stream get onChange => _onChangeController.stream;

  int _current;
  @override
  int get current => _current;

  @override
  void update() {
    super.update();
    _current = blueprint.current;
    _updateRadioButtons();
    _currentValueP.text = (blueprint as
        StringRepresentationHolder).currentStringRepresentation;
  }

  bool _waitingForUpdate = false;
  @override
  void set waitingForUpdate(bool value) {
    _waitingForUpdate = value;
    _updateRadioButtons();
  }

  @override
  bool get waitingForUpdate => _waitingForUpdate;
}

class HtmlRangeOuput extends HtmlRangeBase {
  HtmlRangeOuput(BaseRangeOutput blueprint) : super(blueprint, "range-output");

  @override
  RadioButtonInputElement _createRadioButton(int i) {
    RadioButtonInputElement radioButton = new RadioButtonInputElement()
        ..name = blueprint.id
        ..value = "$i"
        ..disabled = true;
    _updateRadioButton(i, radioButton);
    return radioButton;
  }

  @override
  Stream get onChange => null;

  @override
  void _updateRadioButton(int i, RadioButtonInputElement radioButton) {
    radioButton.checked = i == blueprint.current;
  }
}

class HtmlRangeInput extends HtmlRangeBase {
  HtmlRangeInput(BaseRangeInput blueprint) : super(blueprint, "range-input");

  @override
  RadioButtonInputElement _createRadioButton(int i) {
    RadioButtonInputElement radioButton = new RadioButtonInputElement()
        ..name = blueprint.id
        ..checked = i == blueprint.current
        ..value = "$i";
    _updateRadioButton(i, radioButton);

    StreamSubscription subscription = radioButton.onClick.listen((ev) {
      if (!radioButton.disabled) {
        _current = i;
        _onChangeController.add(ev);
      }
    });
    return radioButton;
  }

  @override
  void _updateRadioButton(int i, RadioButtonInputElement radioButton) {
    radioButton.checked = i == blueprint.current;
    radioButton.disabled = (blueprint.minEnabled != null && i < blueprint.minEnabled)
        || (blueprint.maxEnabled != null && i > blueprint.maxEnabled) || disabled ||
        waitingForUpdate;
  }
}

class HtmlTextOuput extends HtmlUiElement {
  BaseText blueprint;
  DivElement uiRepresentation;
  DivElement _childrenDiv;

  HtmlTextOuput(BaseText blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new DivElement()
        ..classes.add("text-output")
        ..id = blueprint.id;

    update();

    _childrenDiv = new DivElement();
    uiRepresentation.append(_childrenDiv);
  }

  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  @override
  Object get current => uiRepresentation.text;

  @override
  bool disabled = false;

  @override
  Stream get onChange => null;

  @override
  void update() {
    super.update();
    uiRepresentation.innerHtml = blueprint.html;
  }

  @override
  bool waitingForUpdate = false;
}

class HtmlMultipleChoiceInput extends HtmlUiElement {

  BaseMultipleChoiceInput blueprint;
  DivElement uiRepresentation;
  LabelElement _labelElement;
  SelectElement _childrenSelectElement;

  HtmlMultipleChoiceInput(BaseMultipleChoiceInput blueprint) :
      super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new DivElement()
        ..classes.add("multiple-choice-input")
        ..id = blueprint.id;

    _labelElement = new LabelElement()..text = blueprint.name;
    uiRepresentation.append(_labelElement);

    _childrenSelectElement = new SelectElement()
    ..onChange.listen((Event ev) {
      if (!_childrenSelectElement.disabled) {
        // TODO: report (html5lib?) bug which throws type exception here
//        List<InterfaceOption> childOptions = blueprint.children
//            .where((html5lib.Element element) => element is InterfaceOption)
//            .toList(growable: false);

        List<InterfaceOption> childOptions = new List();
        for (html5lib.Element el in blueprint.children) {
          if (el is InterfaceOption) {
            childOptions.add(el);
          }
        }

        InterfaceOption selectedOption = childOptions[_childrenSelectElement.selectedIndex];
        HtmlOption htmlOption = selectedOption.uiElement;
        htmlOption.select();
      }
    });

    uiRepresentation.append(_childrenSelectElement);

    update();
  }

  @override
  void appendChild(Object childUiRepresentation) {
    assert(childUiRepresentation is OptionElement);
    _childrenSelectElement.append(childUiRepresentation);
  }

  // TODO: implement current
  @override
  Object get current => null;

  bool _disabled = false;
  @override
  bool get disabled => _disabled;

  @override
  set disabled(bool value) {
    _childrenSelectElement.disabled = value;
    _disabled = value;
  }

  @override
  Stream get onChange => null;  // All the "changes" happen below, on options.

  bool _waitingForUpdate = false;
  @override
  void set waitingForUpdate(bool value) {
    _childrenSelectElement.disabled = value;
    _waitingForUpdate = value;
  }

  @override
  bool get waitingForUpdate => _waitingForUpdate;
}


class HtmlOption extends HtmlUiElement {
  BaseOption blueprint;
  OptionElement uiRepresentation;

  HtmlOption(BaseOption blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new OptionElement(value: blueprint.id, selected:
        blueprint.current)..text = blueprint.text;

    update();
  }

  @override
  void appendChild(Object childUiRepresentation) {
    throw "Not implemented: adding children to Option";
  }

  @override
  Object get current => uiRepresentation.selected;

  bool _disabled = false;
  @override
  bool get disabled => _disabled;

  @override
  set disabled(bool value) {
    uiRepresentation.disabled = value;
    _disabled = value;
  }

  @override
  bool get hidden => false;
  @override  // <option> in <select> can't be hidden by CSS
  set hidden(bool value) {
    if (value == true) {
      throw "Can't hide a <option> in a select";
    }
  }

  void select() {
    _onChangeController.add(new Event("select"));
  }

  StreamController _onChangeController = new StreamController();
  @override
  Stream get onChange => _onChangeController.stream;

  @override
  void update() {
    super.update();
    uiRepresentation.selected = blueprint.current;
  }

  bool _waitingForUpdate = false;
  @override
  void set waitingForUpdate(bool value) {
    uiRepresentation.disabled = value;
    _waitingForUpdate = value;
  }

  @override
  bool get waitingForUpdate => _waitingForUpdate;
}

/// A menu with choices in it – like for example an inventory menu.
class Submenu {
  final String name;
  final List<EgbChoice> choices = new List<EgbChoice>();

  Submenu(this.name);
}

class Dialog {
  String title;
  String html;
  List<DialogButton> buttons;

  Dialog(this.title, this.html, [this.buttons = const
      [const DialogButton.justClose("Close")]]);
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
  const DialogButton.justClose(this.label) : _behaviour = null;
}

/// Returns true if dialog can be closed.
typedef bool ClickBehaviour();


/**
 * A special class for storing information about a PointsAward together
 * with its meta element.
 */
class PointsAwardElement extends PointsAward implements EgbMetaElement {
  final Element element;
  PointsAwardElement(this.element, int addition, int result, [String
      justification]) : super(addition, result, justification);

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
    return new EgbPlayerProfile(EgbStorage.DEFAULT_PLAYER_UID, this);
  }
}

/// Custom syntax that allows `<sup>` tags with titles to act as footnotes.
/// This just forces [mdown] not to escape HTML of a <sup> tag.
class FootnoteSupTagSyntax extends mdown.TagSyntax {
  String title;

  FootnoteSupTagSyntax()
      : super(r'<sup class="footnote" title="(.*?)">', end: r'</sup>', tag:
          'sup');

  bool onMatch(mdown.InlineParser parser, Match match) {
    title = match.group(1);
    return super.onMatch(parser, match);
  }

  bool onMatchEnd(mdown.InlineParser parser, Match match, mdown.TagState state)
      {
    mdown.Element element = new mdown.Element(tag, state.children);
    element.attributes["class"] = "footnote";
    element.attributes["title"] = title;
    parser.addNode(element);
    return true;
  }
}
