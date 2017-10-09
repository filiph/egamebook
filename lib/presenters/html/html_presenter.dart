library egb_presenter_html;

/// Default implementation of the [Presenter] abstract class. It uses
/// vanilla [:dart:html:] to act as an user interface to an [Scripter]. This
/// means no fancy framework is used. It also means there are probably many
/// edge cases and even bugs, and it's not that extensible.

import 'dart:async';
import 'dart:html' hide FormElement;

import 'package:gtag_analytics/gtag_analytics.dart';

import 'package:slot_machine/slot_machine.dart' as slot;
import 'package:slot_machine/humanize_probability.dart';

import 'package:markdown/markdown.dart' as mdown
    show
        InlineParser,
        InlineSyntax,
        TagSyntax,
        TagState,
        markdownToHtml,
        Element;

import '../../presenter.dart';
export '../../presenter.dart' show Presenter;
import '../../src/persistence/savegame.dart';
import '../../src/shared/user_interaction.dart';
import '../../src/shared/points_award.dart';
import 'package:egamebook/stat/stat.dart';

// because we're defining localStorage here
import '../../src/persistence/storage.dart';

import '../../src/presenter/choice_with_infochips.dart';
import 'package:egamebook/src/presenter/form_proxy.dart';
import 'package:egamebook/src/shared/form.dart';
import "package:html/dom.dart" as html5lib;

/// Class HtmlPresenter wraps HTML presenter for the application.
///
/// It contains all HTML interface elements ([:button:], [:span:] etc.) used
/// in gamebook for user interaction and displaying information.
class HtmlPresenter extends Presenter {
  /// Restart [:button:].
  Element restartAnchor;

  /// [:span:] where points are displayed.
  SpanElement pointsSpan;

  /// Main wrapper [:div:] where the content of the book is displayed.
  DivElement bookDiv;

  /// Start [:button:].
  Element startButton;

  /// Book's title [:div:].
  DivElement bookTitleDiv;

  /// Main book's start button [:div:].
  DivElement bigBottomButtonDiv;

  /// The presenter shows the title 'activity' (with a big START button on
  /// the bottom).
  static const int UI_ACTIVITY_TITLE = 1;

  /// The UI is in the play state.
  static const int UI_ACTIVITY_BOOK = 2;

  /// Current activity visible.
  int currentActivity = UI_ACTIVITY_TITLE;

  /**
   * The text that has been shown to the player since last savegame bookmark.
   * (Markdown format, pre-HTMLization.)
   */
  final StringBuffer _textHistory = new StringBuffer();

  /// Google Analytics.
  final GoogleAnalytics ga = new GoogleAnalytics(failSilently: true);

  /// Getter returns text history - the text that has been shown to the player
  /// since last savegame bookmark. (Markdown format, pre-HTMLization.)
  @override
  String getTextHistory() => _textHistory.toString();

  /// Creates new HtmlPresenter.
  HtmlPresenter() : super();

  /// Creates basic setup on startup for HtmlPresenter's html elements etc.
  @override
  void setup() {
    // DOM
    bookDiv = document.querySelector("div#book-wrapper");
    _loadingEl = document.querySelector("p#loading");

    bookTitleDiv = document.querySelector("div#book-title");
    bigBottomButtonDiv = document.querySelector("div#big-bottom-button");
    startButton = document.querySelector("#start-button");
    startButton.querySelector("#start-button-loading-span").text = "INITIATING";

    restartAnchor = document.querySelector("#book-restart");
    restartAnchor.onClick.listen((_) {
      scripter.restart();
      // Clear text and choices
      bookDiv.children.clear();
      _textHistory.clear();
      _savegameToBe = null;
      // TODO: clear meta elements
      _showLoading(true);
      ga.sendCustom("restart_book");
    });

    final infoAnchor = document.querySelector("#book-info-button");
    final infoDialog = document.querySelector("#book-info-dialog");
    if (infoAnchor != null && infoDialog != null) {
      infoAnchor.onClick.listen((_) {
        infoDialog.classes.remove("display-none");
        ga.sendCustom("show_info_dialog");
      });

      final infoDialogClose =
          infoDialog.querySelectorAll('.dialog-buttons .button').single;
      infoDialogClose.onClick.listen((_) {
        infoDialog.classes.add("display-none");
      });
    } else {
      print("Warning: no info button and dialog in the HTML.");
    }

    pointsSpan = document.querySelector("span#points-value");
    document
        .querySelector("#points-button")
        .onClick
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
   * This method is called when the book is ready to be played.
   */
  void _bookReadyHandler() {
    startButton
        .querySelector("#start-button-loading-span")
        .classes
        .add("hidden");
    startButton
        .querySelector("#start-button-loading-gif")
        .classes
        .add("hidden");
    startButton
        .querySelector("#start-button-start-text")
        .classes
        .remove("hidden");
    startButton.classes.remove("disabled");
    startButton.onClick.first.then((_) {
      document.body.classes.remove("title-open");
      new Future(() {
        // Give the browser time to switch scrolling on.
        assert(bookDiv.children.length > 0);
        // TODO: scroll first/last element (.scrollIntoView) according to Continue/Start
        bookTitleDiv.style.display = "none";
        bigBottomButtonDiv.style.display = "none";
        currentActivity = UI_ACTIVITY_BOOK;
      });
      ga.sendCustom("start_book");
    });
  }

  /// Paragraph where the loading gizmo is visible.
  ParagraphElement _loadingEl;

  /// If loading is visible. It is used to store [_loadingEl]'s state outside
  /// the DOM (i.e. in memory).
  bool _loadingElVisible;

  /// Sets visibility of the loading gizmo.
  void _showLoading(bool show) {
    if (_loadingElVisible != null && show == _loadingElVisible) {
      return; // Don't do anything if the show state is the same already.
    }
    _loadingEl.style.visibility = (show ? "visible" : "hidden");
    _loadingElVisible = show;
  }

  /// Prints into console that the book has ended.
  @override
  void endBook() {
    print("The book has ended.");
    _showLoading(false);
    if (currentActivity == UI_ACTIVITY_TITLE) {
      // We loaded a book which immediately ran through to the end.
      bookDiv.children.clear();
      scripter.restart();
    }
  }

  @override
  void close() {
    _periodicSubscription.cancel();
    super.close();
  }

  /// Duration between showing text. It is used in delaying of text showing.
  static const Duration _durationBetweenShowingText =
      const Duration(milliseconds: 100);

  /**
   * Converts string [s] to HTML elements (via markdown) and shows them
   * one by one on a page.
   *
   * Returns [Future] when complete.
   */
  @override
  Future<bool> showText(String s) async {
    log("Showing: $s");
    if (s == null) return new Future.value(false);

    _textHistory.write("$s\n\n");
    final List<mdown.InlineSyntax> syntaxes = <mdown.InlineSyntax>[
      new FootnoteSupTagSyntax()
    ];
    String html = mdown.markdownToHtml(s, inlineSyntaxes: syntaxes);
    DocumentFragment container = new DocumentFragment();
    container.innerHtml = html;
    int count = 0;
    for (Element el in container.children) {
      if (USE_SHOWTEXT_ANIMATION) {
        count++;
        el.classes.add("hidden");
        num transitionDelay =
            _durationBetweenShowingElements.inMilliseconds * (count) / 1000;
        el.style.transitionDelay = "${transitionDelay}s";
        // We're waiting for another frame so that the transition runs.
        // ignore: unawaited_futures
        new Future(() {
          el.classes.remove("hidden");
        });
      }
      _attachFootnoteClickListeners(el);
      bookDiv.append(el);
    }
    container.remove();
    // TODO: find out if necessary to avoid leaks

    if (USE_SHOWTEXT_ANIMATION) {
      await new Future.delayed(_durationBetweenShowingElements * count);
    }

    return true;
  }

  /// Search for footnotes in [el] and attach click listeners on them. Clicking
  /// on a footnote creates and shows a [Dialog] with the [Element.title] as its
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

  /// If animation for text showing is used.
  static const bool USE_SHOWTEXT_ANIMATION = false;

  /// Duration between showing elements.
  /// It is used in delaying of elements showing.
  static const Duration _durationBetweenShowingElements =
      const Duration(milliseconds: 200);

  /// Duration between checking presence of meta elements in view.
  static const Duration _durationBetweenCheckingForMetaElements =
      const Duration(milliseconds: 1000);

  /// Periodic [Stream] for checking presence of meta elements in view.
  final Stream _periodic =
      new Stream.periodic(_durationBetweenCheckingForMetaElements);

  /// [StreamSubscription] for [_periodic].
  StreamSubscription _periodicSubscription;

  /// A list of meta elements and their associated actions and data. When a
  /// _metaElement comes into view, its [doAction()] function is called.
  final List<MetaElement> _metaElements = new List<MetaElement>();

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

  @override
  Future<int> showChoices(ChoiceList choiceList) async {
    log("Showing choices");
    if (currentActivity == UI_ACTIVITY_TITLE) {
      _bookReadyHandler();
    }

    var completer = new Completer<int>();

    var choicesDiv = new DivElement();
    choicesDiv.classes.add("choices-div");

    if (choiceList.question != null) {
      var choicesQuestionP = new ParagraphElement();
      choicesQuestionP.innerHtml =
          mdown.markdownToHtml(choiceList.question, inlineOnly: true);
      choicesQuestionP.classes.add("choices-question");
      choicesDiv.append(choicesQuestionP);
    }

    OListElement choicesOl = new OListElement();
    choicesOl.classes.add("choices-ol");

    Set<StreamSubscription> clickSubscriptions = new Set<StreamSubscription>();

    // Build the <li> elements of the main (non-submenu) choices, one by one.
    int mainChoiceListNumber = 1;
    choiceList.where((choice) => choice.submenu == null).forEach((choice) {
      Element btn = _createChoiceButton("$mainChoiceListNumber.", choice,
          completer, choicesDiv, clickSubscriptions);

      choicesOl.append(btn);
      mainChoiceListNumber++;
    });
    choicesDiv.append(choicesOl);

    // Now let's see if there are any submenus we need to show.
    Map<String, Submenu> submenus = new Map<String, Submenu>();
    choiceList.where((choice) => choice.submenu != null).forEach((choice) {
      Submenu sub = submenus.putIfAbsent(
          choice.submenu, () => new Submenu(choice.submenu));
      sub.choices.add(choice);
    });

    if (submenus.isNotEmpty) {
      DivElement submenusDiv = new DivElement()
        ..classes.add("choices-submenus");

      DivElement submenuButtonsDiv = new DivElement()
        ..classes.add("choices-submenu-buttons");
      submenusDiv.append(submenuButtonsDiv);

      submenus.forEach((name, submenu) {
        Element submenuButton = _createButtonElement()
          ..classes.add("submenu-button")
          ..text = submenu.name;

        submenuButtonsDiv.append(submenuButton);

        OListElement submenuChoicesOl = new OListElement()
          ..classes.addAll(["choices-ol", "display-none"]);

        submenu.choices.forEach((choice) {
          Element btn = _createChoiceButton(
              "", choice, completer, choicesDiv, clickSubscriptions);

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
    return await completer.future;
  }

  /// Creates an element that is button-like, but not actual HTML
  /// [ButtonElement].
  ///
  /// This is useful when we want to have buttons inside that button (which
  /// is unsupported for `<button>` in Firefox and maybe other browsers).
  LIElement _createButtonElement() => new LIElement()
    ..classes.add('button')
    ..setAttribute('role', 'button');

  /// Creates new choice button in form of HTML [:button:] with index and text.
  ///
  /// Choice button can also have info chips.
  LIElement _createChoiceButton(
      String index,
      Choice choice,
      Completer completer,
      DivElement choicesDiv,
      Set<StreamSubscription> clickSubscriptions) {
    var btn = _createButtonElement();

    var numberSpan = new SpanElement();
    numberSpan.text = index;
    numberSpan.classes.add("choice-number");

    var choiceDisplaySpan = new SpanElement();
    choiceDisplaySpan.classes.add("choice-display");

    if (choice.helpMessage != null) {
      var helpButton = new SpanElement()
        ..text = "?"
        ..classes.add("choice-help-button");
      choiceDisplaySpan.append(helpButton);
      helpButton.onClick.listen((event) {
        showDialog(new Dialog(choice.string, "<p>${choice.helpMessage}</p>"));
        event.stopImmediatePropagation();
      });
    }

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
    textSpan.innerHtml =
        mdown.markdownToHtml(choiceWithInfochips.text, inlineOnly: true);
    textSpan.classes.add("choice-text");
    choiceDisplaySpan.append(textSpan);

    var subscription = btn.onClick.listen((MouseEvent event) =>
        _choiceClickListener(
            event, completer, choice, btn, choicesDiv, clickSubscriptions));
    clickSubscriptions.add(subscription);

    btn.append(numberSpan);
    btn.append(choiceDisplaySpan);
    return btn;
  }

  /// Duration between sending hash. It is used in delaying of hash sending.
  static const Duration _durationBetweenSendingHash =
      const Duration(milliseconds: 100);

  // TODO: use onClick.first.then() - no need to unregister listener
  /// Click listener for a choice.
  ///
  /// Choice hash is sent asynchronously back to Scripter and bookmark is set.
  void _choiceClickListener(
      MouseEvent event,
      Completer completer,
      Choice choice,
      Element btn,
      DivElement choicesDiv,
      Set<StreamSubscription> clickSubscriptions) {
    // Send choice hash back to Scripter, but asynchronously.
    new Future.delayed(
        _durationBetweenSendingHash, () => completer.complete(choice.hash));
    _showLoading(true);
    // Mark this element as chosen.
    btn.classes.add("chosen");
    choicesDiv.classes.add("chosen");
    // Unregister listeners.
    choicesDiv
        .querySelectorAll(".button")
        .forEach((var b) => b.classes.add('disabled'));
    clickSubscriptions.forEach((StreamSubscription s) => s.cancel());
    clickSubscriptions.clear();
    // Show bookmark.
    if (_savegameToBe != null) {
      choicesDiv.classes.add("bookmark");
      String savegameUid = _savegameToBe.uid;
      choicesDiv.onClick
          .listen((_) => _handleSavegameBookmarkClick(savegameUid));
      _savegameToBe = null;
    }
    event.stopPropagation();
    ga.sendCustom("choose_choice");
  }

  /// Current points awarded.
  int _currentPoints;

  @override
  Future<bool> awardPoints(PointsAward award) async {
    _currentPoints = award.result;
    if (award.addition == 0) {
      // This is just setting the Points count. Don't show Toast.
      pointsSpan.text = "${award.result}";
      return new Future.value(true);
    }

    var completer = new Completer<bool>();

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
    return await completer.future;
  }

  /// List of actual UI stats.
  List<UIStat> _stats;

  /// Map of stats HTML elements used in navigation.
  final Map<String, Element> _statsElements = new Map();

  @override
  Future<bool> setStats(List<UIStat> stats) async {
    _stats = stats;
    _printStats(); // DEBUG

    var statsDiv = document.querySelector("nav div#stats");
    statsDiv.children.clear();
    for (int i = 0; i < stats.length; i++) {
      var stat = stats[i];
      var span = new SpanElement();
      span.text = stat.string;
      var button = _createButtonElement();
      if (!stat.show) button.classes.add("display-none");
      button.children.add(span);
      statsDiv.children.add(button);
      _statsElements[stat.name] = button;
      button.onClick.listen(_statsOnClickListener);
    }
    return true;
  }

  @override
  Future<bool> updateStats(StatUpdateCollection updates) async {
    UIStat.updateStatsList(_stats, updates) // Returns only the changed stats.
        .forEach((UIStat stat) {
      var anchor = _statsElements[stat.name];
      anchor.children.single.text = stat.string;
      if (stat.show) {
        anchor.classes.remove("display-none");
      } else {
        anchor.classes.add("display-none");
      }
    });
    return true;
  }

  @override
  Future<slot.SessionResult> showSlotMachine(
      double probability, String rollReason,
      {bool rerollable: false, String rerollEffectDescription}) async {
    assert(rerollable != null, "rerollable shouldn't be null");
    log("Showing slot machine: $probability, $rollReason,"
        "reroll: $rerollEffectDescription");

    _showLoading(false);
    var div = new Element.div()..classes.add("slot-machine");
    if (rollReason != null) {
      div.append(new Element.p()
        ..text = rollReason
        ..classes.add("slot-machine__roll-reason"))
        ..append(new Element.p()
          ..text = humanizeProbability(probability)
          ..classes.add("slot-machine__humanized-probability"));
    }
    var machine = new slot.SlotMachine(probability,
        rerollable: rerollable,
        rerollEffectDescription: rerollEffectDescription);
    div.append(machine.canvasEl);
    final helpButton = new SpanElement()
      ..classes.add("slot-machine__help-button")
      ..setAttribute('role', 'button')
      ..text = "?";
    Element buildResultSurround() =>
        new Element.span()..classes.add("slot-machine__result-surround");
    var resultParagraph = new Element.p()
      ..classes.add("slot-machine__result")
      ..classes.add("display-none")
      ..append(buildResultSurround())
      ..append(machine.resultEl)
      ..append(buildResultSurround()..append(helpButton));
    div.append(resultParagraph);
    div.append(machine.rerollEl);
    bookDiv.append(div);
    helpButton.onClick.listen((_) {
      showDialog(new Dialog(
          "Probability in this game",
          "<p>Many actions in this game have an uncertain outcome. When you swing a sword or fist at an opponent, you can hit or miss. The probability of the hit depends on many things, including your gear, your stance, your opponent's stance, and so on.</p>"
          "<p>Evaluating the outcome of the roll is easy. You’ll see a sort of slot machine reel of hearts and Xs. When there are more hearts than Xs in the center row, you succeed. Otherwise, you fail. So you always need at least three hearts to succeed.</p>"
          "<p>The reels are always set up precisely for your current situation. When you're attempting something easy, there will be many more hearts than Xs. Conversely, when you're trying your luck with something difficult, Xs will vastly outnumber the hearts.</p> "
          "<p><img src='img/slot-machine-setup.jpg'/></p>"
          "<p>Sometimes, when you fail a roll, you can spend a resource you’ve acquired to re-roll. This will only reroll the vertical reels that landed on an X — the ones that have already landed on a heart will stay in place. Therefore, rerolling often has better chance of success than starting over again. Use your resources well! They may save your life one day.</p>"
          "<p>Remember that the uncertainty applies to other characters in the game as well, so any way you can give your opponents a disadvantage or give your friends an advantage can greatly benefit you and your journey.</p>"));
    });
    await machine.play();
    resultParagraph.classes.remove("display-none");
    final result = await machine.rerollIfNeeded();
    _showLoading(true);
    return result;
  }

  /// Prints visible UI stats into console.
  void _printStats() {
    print("Stats:");
    _stats.where((stat) => stat.show == true).forEach((stat) {
      print("- $stat");
    });
  }

  /// Blinks the [el] element via CSS transitions.
  void _blink(Element el) {
    el.classes.add("blink");
    new Future.delayed(
        new Duration(milliseconds: 1000), () => el.classes.remove("blink"));
  }

  /**
   * What happens when user clicks on a savegame bookmark.
   *
   * The confirm dialog is shown to user to select if he/she wants to come back.
   */
  void _handleSavegameBookmarkClick(String savegameUid) {
    // TODO: make more elegant, with confirmation appearing on page,
    //       and non-blocking
    var confirm = window.confirm("Are you sure you want to come back to "
        "this decision ($savegameUid) and lose your progress since?");
    if (confirm) {
      bookDiv.children.clear();
      // TODO: retain scroll position
      playerProfile.load(savegameUid).then((Savegame savegame) {
        if (savegame == null) {
          // no savegames for this egamebook savegame uid
          reportError("Bad gamesave", "That savegame is missing.");
          // TODO: provide solutions, feedback, etc.
        } else {
          showText(savegame.textHistory).then((_) {
            scripter.load(savegame);
          });
        }
      });
      ga.sendCustom("load_bookmark");
    }
  }

  //  DivElement bookmarkDiv;

  /**
   * Stored savegame which wait for the next choiceList to be appended to it.
   */
  Savegame _savegameToBe;

  @override
  Future<bool> addSavegameBookmark(Savegame savegame) {
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

  /// Shows a [dialog] with overlay over content.
  Future<bool> showDialog(Dialog dialog) {
    var completer = new Completer<bool>();

    DivElement dialogDiv = new DivElement()..classes.add("dialog");
    DivElement overlayDiv = new DivElement()..classes.add("overlay");
    dialogDiv.children.add(overlayDiv);
    DivElement wrapperDiv = new DivElement()..classes.add("dialog-window");
    HeadingElement titleEl = new HeadingElement.h3()..text = dialog.title;
    wrapperDiv.children.add(titleEl);
    DivElement contentDiv = new DivElement()..classes.add("dialog-content");
    wrapperDiv.children.add(contentDiv);
    DivElement textDiv = new DivElement()..innerHtml = dialog.html;
    contentDiv.children.add(textDiv);
    DivElement buttonsDiv = new DivElement()..classes.add("dialog-buttons");
    for (DialogButton dialogButton in dialog.buttons) {
      Element buttonEl = _createButtonElement()..text = dialogButton.label;
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

  /// Stats on click listener.
  ///
  /// New [Dialog] with title "Stats" is shown with a current score
  /// and all stats printed in a table.
  void _statsOnClickListener(Event event) {
    var html = new StringBuffer();
    html.writeln("<table>");
    // TODO: reintroduce once safe
    // html.writeln("<tr><td>Score:</td><td>${_currentPoints}</td></tr>");
    for (int i = 0; i < _stats.length; i++) {
      UIStat stat = _stats[i];
      if (stat.show) {
        html.writeln(
            "<tr><td>${stat.name}:</td>" "<td>${stat.string}</td></tr>");
      }
    }
    html.writeln("</table>");
    var dialog = new Dialog("Stats", html.toString());
    showDialog(dialog);
    ga.sendCustom("show_stats");
  }

  /// Creates a simple error dialog with [title] and [text].
  Future<bool> reportError(String title, String text) {
    Dialog errorDialog = new Dialog(title, "<p>$text</p>");
    ga.sendException("$title -- $text", fatal: true);
    return showDialog(errorDialog);
  }

  /// Saves game [savegame] and adds savegame bookmark.
  @override
  void save(Savegame savegame) {
    _textHistory.clear();
    playerProfile.save(savegame);
    addSavegameBookmark(savegame);
  }

  /// Simple HTML presenter logger.
  @override
  void log(String text) {
    print("HtmlPresenter.log: $text");
  }

  /// Currently shown [FormProxy].
  FormProxy _formProxy;
  @override
  Stream<CurrentState> showForm(FormProxy form) {
    if (currentActivity == UI_ACTIVITY_TITLE) {
      _bookReadyHandler();
    }
//    _formProxy = new FormProxy.fromMap(form.toMap());
    _formProxy = form;
    HtmlForm htmlForm = _formProxy.buildUiElements(ELEMENT_BUILDERS);
    bookDiv.append(htmlForm.uiRepresentation);
    _attachFootnoteClickListeners(htmlForm.uiRepresentation);
    _showLoading(false);
    return _formProxy.stream;
  }

  @override
  void updateForm(FormConfiguration values) {
    _formProxy.update(values);
  }
}

/// Map of element builders for creating of form elements.
Map<String, UiElementBuilder> ELEMENT_BUILDERS = {
  FormBase.elementClass: (FormElement e) => new HtmlForm(e),
  FormSection.elementClass: (FormElement e) => new HtmlFormSection(e),
  SubmitButtonBase.elementClass: (FormElement e) => new HtmlSubmitButton(e),
  CheckboxInputBase.elementClass: (FormElement e) => new HtmlCheckboxInput(e),
  RangeInputBase.elementClass: (FormElement e) => new HtmlRangeInput(e),
  RangeOutputBase.elementClass: (FormElement e) => new HtmlRangeOuput(e),
  TextOutputBase.elementClass: (FormElement e) => new HtmlTextOuput(e),
  MultipleChoiceInputBase.elementClass: (FormElement e) =>
      new HtmlMultipleChoiceInput(e),
  OptionBase.elementClass: (FormElement e) => new HtmlOption(e)
};

/// Abstract class HtmlUiElement wraps UI representation of basic HTML
/// (in fact [FormElement]) element.
///
/// It is a base class for all form elements (for example [HtmlForm],
/// [HtmlFormSection] or [HtmlSubmitButton]).
abstract class HtmlUiElement extends UiElement {
  /// Creates new HtmlUiElement with [blueprint] form element.
  HtmlUiElement(FormElement blueprint) : super(blueprint);

  /// UI representation as an [Element].
  Element get uiRepresentation;

  /// If is hidden.
  bool _hidden = false;

  /// Setter for hidden. If the element is hidden, it's still present in HTML
  /// but it's not visible (is hidden with css).
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

/// Class HtmlForm represents html form in HTML.
class HtmlForm extends HtmlUiElement {
  /// Default text for a submit button.
  static const String DEFAULT_SUBMIT_TEXT = ">>";

  /// Form proxy blueprint element.
  FormProxy blueprint;

  /// UI representation as a [:div:].
  DivElement uiRepresentation;

  /// Children container [:div:] used for appending child elements.
  DivElement _childrenContainerDiv;

  /// Form submit button.
  ButtonElement submitButton;

  /// Creates new HtmlForm and its UI representation from form proxy [blueprint].
  HtmlForm(FormProxy blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new DivElement()..classes.add("form");

    _childrenContainerDiv = new DivElement();
    uiRepresentation.append(_childrenContainerDiv);

    String submitText = blueprint.submitText;
    if (submitText != null) {
      submitButton = new ButtonElement()
        ..classes.add("submit-main")
        ..text = submitText;

      StreamSubscription subscription;
      subscription = submitButton.onClick.listen((ev) {
        _onChangeController.add(ev);
        destroy();
        subscription.cancel();
      });
      uiRepresentation.append(submitButton);
    }
  }

  /// Appends child element [childUiRepresentation] into children
  /// container [:div:].
  @override
  void appendChild(Object childUiRepresentation) {
    _childrenContainerDiv.append(childUiRepresentation);
  }

  /// If is disabled.
  bool _disabled = false;

  /// Getter for disabled. When the HTML form disabled is [:true:],
  /// the submit button is not clickable.
  @override
  bool get disabled => _disabled;

  /// Setter for disabled.
  @override
  set disabled(bool value) {
    _disabled = value;
    if (submitButton != null) submitButton.disabled = value;
  }

  /// On change stream controller.
  StreamController _onChangeController = new StreamController();

  /// Getter [onChange] returns [Stream] of its on change [StreamController].
  @override
  Stream get onChange => _onChangeController.stream;

  void destroy() {
    _onChangeController.close();
  }

  /// Updates [HtmlForm] after the blueprint is changed. Also the text on existing
  /// [submitButton] is updated with the text from [blueprint]'s submit text.
  @override
  void update() {
    super.update();
    if (submitButton != null) submitButton.text = blueprint.submitText;
  }

  @override
  set waitingForUpdate(bool _waitingForUpdate) {
    // TODO: implement waitingForUpdate
  }

  // TODO: implement waitingForUpdate
  @override
  bool get waitingForUpdate => null;

  /// Current value of HTML form. In this case it returns [:null:].
  @override
  Object get current => null;
}

/// Class HtmlFormSection represents form section in HTML.
class HtmlFormSection extends HtmlUiElement {
  /// Form section blueprint.
  FormSection blueprint;

  /// UI representation as a [:div:].
  DivElement uiRepresentation;

  /// Header element used to display section name.
  Element _headerEl;

  /// The element which opens or closes the FormSection contents when clicked.
  Element _openCloseEl;

  /// Children container [:div:] used for appending child elements.
  DivElement _childrenDiv;

  /// Creates new HtmlFormSection and its UI representation from form
  /// section [blueprint].
  HtmlFormSection(FormSection blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new DivElement()
      ..classes.add("form-section")
      ..id = blueprint.id;

    ButtonElement titleWrapperDiv = new ButtonElement()
      ..classes.add("form-section-title-wrapper")
      ..onClick.listen((_) {
        updateOpenCloseDomState();
      });

    _openCloseEl = new DivElement()
      ..classes.add("form-section-open-close")
      ..innerHtml = "&#9661;";
    titleWrapperDiv.append(_openCloseEl);

    _headerEl = new SpanElement()
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

  /// Updates state of who from all form sections is opened and who is closed.
  /// Only one form section can be opened at time, the others are closed.
  /// The open/close indicator in every form section is updated accordingly.
  void updateOpenCloseDomState() {
    if (_childrenDiv.classes.contains("closed")) {
      _childrenDiv.classes.remove("closed");
      _openCloseEl.innerHtml = "&#9665;";

      // Close all others. Must use DOM since we don't keep reference to parent
      // HtmlFormElement. TODO: profile and fix?
      uiRepresentation.parent
          .querySelectorAll(".form-section")
          .where((Element e) => e != uiRepresentation)
          .forEach((Element e) {
        e.querySelector(".form-section-children").classes.add("closed");
        e.querySelector(".form-section-open-close").innerHtml = "&#9661;";
      });
    } else {
      _childrenDiv.classes.add("closed");
      _openCloseEl.innerHtml = "&#9661;";
    }
  }

  /// Appends child element [childUiRepresentation] into children
  /// container [:div:].
  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  /// Returns current value. In this case text in header.
  @override
  Object get current => _headerEl.text;

  @override
  bool disabled = false;

  @override
  Stream get onChange => null;

  /// Updates [HtmlFormSection] after the blueprint is changed. Also the text
  /// in header is updated with [blueprint]'s name.
  @override
  void update() {
    super.update();
    _headerEl.text = blueprint.name;
  }

  @override
  bool waitingForUpdate = false;
}

/// Class HtmlSubmitButton represents submit button in HTML.
class HtmlSubmitButton extends HtmlUiElement {
  /// Presenter submit button blueprint.
  PresenterSubmitButton blueprint;

  /// UI representation as a [:button:].
  ButtonElement uiRepresentation;

  /// Children container [:div:] used for appending child elements.
  DivElement _childrenDiv;

  /// Creates new HtmlSubmitButton and its UI representation from a presenter
  /// submit button [blueprint].
  HtmlSubmitButton(PresenterSubmitButton blueprint) : super(blueprint) {
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

  /// Appends child element [childUiRepresentation] into children
  /// container [:div:].
  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  /// Returns current value. In this case [:null:].
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

  /// On change stream controller.
  StreamController _onChangeController = new StreamController();

  /// Getter [onChange] returns [Stream] of its on change [StreamController].
  @override
  Stream get onChange => _onChangeController.stream;

  /// Updates [HtmlSubmitButton] after the blueprint is changed. Also the text
  /// on [uiRepresentation] is updated with [blueprint]'s name.
  void update() {
    super.update();
    uiRepresentation.text = blueprint.name;
  }

  bool _waitingForUpdate = false;

  /// Implementation of waiting for update. When [:true:], the [uiRepresentation]
  /// is disabled.
  @override
  set waitingForUpdate(bool value) {
    uiRepresentation.disabled = value;
    _waitingForUpdate = value;
  }

  @override
  bool get waitingForUpdate => _waitingForUpdate;
}

/// Class HtmlCheckboxInput represents checkbox input in HTML.
class HtmlCheckboxInput extends HtmlUiElement {
  /// Checkbox input base blueprint.
  CheckboxInputBase blueprint;

  /// UI representation as a [:div:].
  DivElement uiRepresentation;

  /// Actual checkbox element.
  CheckboxInputElement _checkboxEl;

  /// Label element for displaying information.
  LabelElement _labelEl;

  /// Children container [:div:] used for appending child elements.
  DivElement _childrenDiv;

  /// Creates new HtmlCheckboxInput and its UI representation from checkbox
  /// input base [blueprint].
  HtmlCheckboxInput(CheckboxInputBase blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    print(this.blueprint.name);

    uiRepresentation = new DivElement()
      ..classes.add("checkbox-input")
      ..id = blueprint.id;

    String checkboxId = "${blueprint.id}-checkbox";
    _checkboxEl = new CheckboxInputElement()..id = checkboxId;
    _labelEl = new LabelElement()
      ..htmlFor = checkboxId
      ..innerHtml = blueprint.name;
    uiRepresentation.append(_checkboxEl);
    uiRepresentation.append(_labelEl);

    update();

    _childrenDiv = new DivElement();
    uiRepresentation.append(_childrenDiv);
  }

  /// Appends child element [childUiRepresentation] into children
  /// container [:div:].
  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  /// Returns current value. In this case [:true:] if checkbox element is checked.
  @override
  Object get current => _checkboxEl.checked;

  /// Returns [Stream] from checkbox element [onChange].
  @override
  Stream get onChange => _checkboxEl.onChange;

  /// Updates [HtmlCheckboxInput] after the blueprint is changed. Also the checked
  /// attribute on checkbox element is updated with [blueprint]'s current value.
  @override
  void update() {
    super.update();
    _checkboxEl.checked = blueprint.current;
  }

  @override
  bool waitingForUpdate = false;

  /// Returns if checkbox element is disabled.
  @override
  bool get disabled => _checkboxEl.disabled;

  /// Sets if checkbox element is disabled.
  @override
  set disabled(bool value) {
    _checkboxEl.disabled = value;
  }
}

/// Abstract class HtmlRangeBase represents base html range.
///
/// It is base class for [HtmlRangeOuput] and [HtmlRangeInput].
abstract class HtmlRangeBase extends HtmlUiElement {
  /// Range base blueprint.
  RangeBase blueprint;

  /// UI representation as a [:div:].
  DivElement uiRepresentation;

  /// Children container [:div:] used for appending child elements.
  DivElement _childrenDiv;

  /// Radio buttons container [:div:].
  DivElement _radioButtonsDiv;

  /// Paragraph used for a text.
  ParagraphElement _currentValueP;

  /// Creates new HtmlRangeBase and its UI representation from range base
  /// [blueprint] and with [divClass] used as a css class on [uiRepresentation].
  /// This css class is used to differentiate between input and output elements.
  HtmlRangeBase(RangeBase blueprint, String divClass) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new DivElement()
      ..classes.add(divClass)
      ..id = blueprint.id;

    LabelElement label = new LabelElement()
      ..htmlFor = blueprint.id
      ..innerHtml = blueprint.name;
    uiRepresentation.append(label);

    DivElement buttonsAndValueDiv = new DivElement()
      ..classes.add("buttons-and-value");
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

  /// Map of radio buttons.
  Map<int, RadioButtonInputElement> _radioButtons =
      new Map<int, RadioButtonInputElement>();

  /// Creates radio buttons with given constraints on [blueprint]
  /// (min, max and step size).
  void _createRadioButtons() {
    for (int i = blueprint.min; i <= blueprint.max; i += blueprint.step) {
      RadioButtonInputElement radioButton = _createRadioButton(i);
      _radioButtons[i] = radioButton;
      _radioButtonsDiv.append(radioButton);
    }
  }

  RadioButtonInputElement _createRadioButton(int i);

  /// Update on all radio buttons.
  void _updateRadioButtons() {
    _radioButtons.forEach(
        (int i, RadioButtonInputElement e) => _updateRadioButton(i, e));
  }

  void _updateRadioButton(int i, RadioButtonInputElement radioButton);

  /// Appends child element [childUiRepresentation] into children
  /// container [:div:].
  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  bool _disabled = false;
  @override
  bool get disabled => _disabled;

  /// When the disabled state with [value] is set, the radio buttons are also
  /// updated.
  @override
  set disabled(bool value) {
    _disabled = value;
    _updateRadioButtons();
  }

  /// On change stream controller.
  StreamController _onChangeController = new StreamController();

  /// Getter [onChange] returns [Stream] of its on change [StreamController].
  @override
  Stream get onChange => _onChangeController.stream;

  int _current;
  @override
  int get current => _current;

  /// Updates [HtmlRangeBase] after the blueprint is changed. Also the [current]
  /// attribute is updated with [blueprint]'s current value, text in paragraph
  /// is set to current string representation and radio buttons are updated.
  @override
  void update() {
    super.update();
    _current = blueprint.current;
    _updateRadioButtons();
    _currentValueP.text =
        (blueprint as StringRepresentationHolder).currentStringRepresentation;
  }

  bool _waitingForUpdate = false;
  @override
  set waitingForUpdate(bool value) {
    _waitingForUpdate = value;
    _updateRadioButtons();
  }

  @override
  bool get waitingForUpdate => _waitingForUpdate;
}

/// Class HtmlRangeOuput represents range output in HTML.
class HtmlRangeOuput extends HtmlRangeBase {
  /// Creates new HtmlRangeOuput and its UI from range output base [blueprint].
  HtmlRangeOuput(RangeOutputBase blueprint) : super(blueprint, "range-output");

  /// Creates new radio button element and updates it.
  @override
  RadioButtonInputElement _createRadioButton(int i) {
    RadioButtonInputElement radioButton = new RadioButtonInputElement()
      ..name = blueprint.id
      ..value = "$i"
      ..disabled = true;
    _updateRadioButton(i, radioButton);
    return radioButton;
  }

  /// Getter onChange returns in this case [:null:].
  @override
  Stream get onChange => null;

  /// Updates radio button's [checked] attribute.
  @override
  void _updateRadioButton(int i, RadioButtonInputElement radioButton) {
    radioButton.checked = i == blueprint.current;
  }
}

/// Class HtmlRangeInput represents range input in HTML.
class HtmlRangeInput extends HtmlRangeBase {
  /// Creates new HtmlRangeInput and its UI from range input base [blueprint].
  HtmlRangeInput(RangeInputBase blueprint) : super(blueprint, "range-input");

  /// Creates new radio button element and updates it.
  @override
  RadioButtonInputElement _createRadioButton(int i) {
    RadioButtonInputElement radioButton = new RadioButtonInputElement()
      ..name = blueprint.id
      ..checked = i == blueprint.current
      ..value = "$i";
    _updateRadioButton(i, radioButton);

    radioButton.onClick.listen((ev) {
      if (!radioButton.disabled) {
        _current = i;
        _onChangeController.add(ev);
      }
    });
    return radioButton;
  }

  /// Updates radio button's [checked] and [disabled] attributes.
  @override
  void _updateRadioButton(int i, RadioButtonInputElement radioButton) {
    radioButton.checked = i == blueprint.current;
    radioButton.disabled =
        (blueprint.minEnabled != null && i < blueprint.minEnabled) ||
            (blueprint.maxEnabled != null && i > blueprint.maxEnabled) ||
            disabled ||
            waitingForUpdate;
  }
}

/// Class HtmlTextOuput represents text output in HTML.
class HtmlTextOuput extends HtmlUiElement {
  /// Text base blueprint.
  TextBase blueprint;

  /// UI representation as a [:div:].
  DivElement uiRepresentation;

  /// Children container [:div:] used for appending child elements.
  DivElement _childrenDiv;

  /// Creates new HtmlTextOuput and its UI representation from text base
  /// [blueprint].
  HtmlTextOuput(TextBase blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation = new DivElement()
      ..classes.add("text-output")
      ..id = blueprint.id;

    update();

    _childrenDiv = new DivElement();
    uiRepresentation.append(_childrenDiv);
  }

  /// Appends child element [childUiRepresentation] into children
  /// container [:div:].
  @override
  void appendChild(Object childUiRepresentation) {
    _childrenDiv.append(childUiRepresentation);
  }

  /// Getter returns current value. In this case text from [uiRepresentation].
  @override
  Object get current => uiRepresentation.text;

  @override
  bool disabled = false;

  /// Getter onChange returns in this case [:null:].
  @override
  Stream get onChange => null;

  /// Updates [HtmlTextOuput] after the blueprint is changed. Also the inner
  /// html on [uiRepresentation] is updated with [blueprint]'s html.
  @override
  void update() {
    super.update();
    uiRepresentation.innerHtml = blueprint.html;
  }

  @override
  bool waitingForUpdate = false;
}

/// Class HtmlMultipleChoiceInput represents multiple choice input in HTML.
class HtmlMultipleChoiceInput extends HtmlUiElement {
  /// Multiple choice input base blueprint.
  MultipleChoiceInputBase blueprint;

  /// UI representation as a [:div:].
  DivElement uiRepresentation;

  /// Label element for displaying information.
  LabelElement _labelElement;

  /// Children [:select:] element used for appending [:option:] elements.
  SelectElement _childrenSelectElement;

  /// Creates new HtmlMultipleChoiceInput and its UI representation from
  /// multple choice input base [blueprint].
  HtmlMultipleChoiceInput(MultipleChoiceInputBase blueprint)
      : super(blueprint) {
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
//        List<PresenterOption> childOptions = blueprint.children
//            .where((html5lib.Element element) => element is PresenterOption)
//            .toList(growable: false);

          List<PresenterOption> childOptions = new List();
          for (html5lib.Element el in blueprint.children) {
            if (el is PresenterOption) {
              childOptions.add(el);
            }
          }

          PresenterOption selectedOption =
              childOptions[_childrenSelectElement.selectedIndex];
          HtmlOption htmlOption = selectedOption.uiElement;
          htmlOption.select();
        }
      });

    uiRepresentation.append(_childrenSelectElement);

    update();
  }

  /// Appends child element [childUiRepresentation] into children
  /// container [:div:]. The is instance of [OptionElement].
  @override
  void appendChild(Object childUiRepresentation) {
    assert(childUiRepresentation is OptionElement);
    _childrenSelectElement.append(childUiRepresentation);
  }

  // TODO: implement current
  /// Returns current value. In this case [:null:].
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

  /// Getter onChange returns in this case [:null:].
  @override
  Stream get onChange => null; // All the "changes" happen below, on options.

  bool _waitingForUpdate = false;

  /// Implementation of waiting for update. When [:true:], the select element
  /// is disabled.
  @override
  set waitingForUpdate(bool value) {
    _childrenSelectElement.disabled = value;
    _waitingForUpdate = value;
  }

  @override
  bool get waitingForUpdate => _waitingForUpdate;
}

/// Class HtmlOption represents HTML option.
class HtmlOption extends HtmlUiElement {
  /// Option base blueprint.
  OptionBase blueprint;

  /// UI representation as an [:option:].
  OptionElement uiRepresentation;

  /// Creates new HtmlOption and its UI representation from option base
  /// [blueprint].
  HtmlOption(OptionBase blueprint) : super(blueprint) {
    this.blueprint = blueprint;
    uiRepresentation =
        new OptionElement(value: blueprint.id, selected: blueprint.current)
          ..text = blueprint.text;

    update();
  }

  /// Throws with error. [:option:] element can't have children.
  @override
  void appendChild(Object childUiRepresentation) {
    throw "Not implemented: adding children to Option";
  }

  /// Returns current value. In this case [:true:] if [uiRepresentation] is
  /// selected.
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

  /// If [value] is [:true:] throws with error. [:option:] element can't
  /// be hidden.
  @override // <option> in <select> can't be hidden by CSS
  set hidden(bool value) {
    if (value == true) {
      throw "Can't hide a <option> in a select";
    }
  }

  /// When this method is called, the [_onChangeController] gets new [Event].
  void select() {
    _onChangeController.add(new Event("select"));
  }

  /// On change stream controller.
  StreamController _onChangeController = new StreamController();

  /// Getter [onChange] returns [Stream] of its on change [StreamController].
  @override
  Stream get onChange => _onChangeController.stream;

  /// Updates [HtmlOption] after the blueprint is changed. Also the [selected]
  /// attribute on [uiRepresentation] is updated with [blueprint]'s current
  /// value.
  @override
  void update() {
    super.update();
    uiRepresentation.selected = blueprint.current;
  }

  bool _waitingForUpdate = false;

  /// Implementation of waiting for update. When [:true:], the [uiRepresentation]
  /// is disabled.
  @override
  set waitingForUpdate(bool value) {
    uiRepresentation.disabled = value;
    _waitingForUpdate = value;
  }

  @override
  bool get waitingForUpdate => _waitingForUpdate;
}

/// Class Submenu represents menu with choices in it – like for example
/// an inventory menu.
class Submenu {
  /// Submenu's name.
  final String name;

  /// List of choices being displayed in submenu.
  final List<Choice> choices = new List<Choice>();

  /// Creates new Submenu with [name].
  Submenu(this.name);
}

/// Class Dialog represents dialog with title, html text and buttons.
class Dialog {
  /// Dialog title.
  String title;

  /// Dialog html text.
  String html;

  /// List of dialog buttons.
  List<DialogButton> buttons;

  /// Creates new Dialog with [title], [html] text and optional [buttons].
  ///
  /// If the dialog [buttons] are not set, the simple close button is created.
  Dialog(this.title, this.html,
      [this.buttons = const [const DialogButton.justClose("Close")]]);
}

/// Class DialogButton represents dialog button with label and some behaviour.
class DialogButton {
  /// Dialog button label.
  final String label;

  /// Dialog button behaviour.
  final ClickBehaviour _behaviour;

  /// Used as a default behaviour if no behaviour is set. Returns [:true:].
  static final ClickBehaviour NO_BEHAVIOUR = () => true;

  /// Getter for behaviour. If no behaviour is set, the [NO_BEHAVIOUR] is used.
  ClickBehaviour get behaviour {
    if (_behaviour == null) {
      return NO_BEHAVIOUR;
    } else {
      return _behaviour;
    }
  }

  /// Creates new DialogButton with [label] and [behaviour].
  const DialogButton(this.label, this._behaviour);

  /// Creates new DialogButton with [label] and without [behaviour].
  const DialogButton.justClose(this.label) : _behaviour = null;
}

/// Typedef returns [:true:] if dialog can be closed.
typedef bool ClickBehaviour();

/**
 * PointsAwardElement is a special class for storing information about
 * a PointsAward together with its meta element.
 */
class PointsAwardElement extends PointsAward implements MetaElement {
  /// Meta element.
  final Element element;

  /// Creates new PointsAwardElement with [element] and [PointsAward]'s
  /// points to be awarded [addition], resulting sum of points [result] and
  /// optional [justification] message.
  PointsAwardElement(this.element, int addition, int result,
      [String justification])
      : super(addition, result, justification);

  /// Creates new PointsAwardElement from [pointsAward] and [element].
  PointsAwardElement.fromPointsAward(PointsAward pointsAward, this.element)
      : super(pointsAward.addition, pointsAward.result,
            pointsAward.justification);

  /// Action which will be called.
  Action action;

  /// Do action on meta element if [action] is not [:null:].
  /// If action is done, set [done] to [:true:].
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

/// Abstract class MetaElement wraps meta element with its [Action].
abstract class MetaElement {
  /// Element.
  final Element element;

  /// Action which will be called.
  Action action;

  /// Do action on meta element.
  void doAction();

  /// If is action done.
  bool done;

  /// Creates new MetaElement from [element].
  MetaElement(this.element);
}

/// A simple callback closure for use with metaElements (called when element
/// comes into view).
typedef void Action();

/**
 * LocalStorageStore is the HTML5 implementation of Store (only runs in
 * [HtmlPresenter]).
 *
 * TODO: either use lawndart or make the following more robust.
 */
class LocalStorageStore extends Store {
  /// Saves [value] on [key] into local storage.
  Future<bool> save(String key, String value) {
    window.localStorage[key] = value;
    return new Future.value(true);
  }

  /// Returns value on [key] from local storage.
  Future<String> load(String key) {
    var result = window.localStorage[key];
    return new Future.value(result);
  }

  /// Deletes value on [key] from local storage.
  Future<bool> delete(String key) {
    window.localStorage.remove(key);
    return new Future.value(true);
  }
}

/// Custom syntax that allows `<sup>` tags with titles to act as footnotes.
/// This just forces [mdown] not to escape HTML of a <sup> tag.
class FootnoteSupTagSyntax extends mdown.TagSyntax {
  /// Title for a footnote.
  String title;

  /// Creates new FootnoteSupTagSyntax.
  FootnoteSupTagSyntax()
      : super(r'<sup class="footnote" title="(.*?)">',
            end: r'</sup>', tag: 'sup');

  @override
  bool onMatch(mdown.InlineParser parser, Match match) {
    title = match.group(1);
    return super.onMatch(parser, match);
  }

  @override
  bool onMatchEnd(
      mdown.InlineParser parser, Match match, mdown.TagState state) {
    mdown.Element element = new mdown.Element(tag, state.children);
    element.attributes["class"] = "footnote";
    element.attributes["title"] = title;
    parser.addNode(element);
    return true;
  }
}
