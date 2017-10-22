library egb_presenter_html;

/// Default implementation of the [Presenter] abstract class. It uses
/// vanilla [:dart:html:] to act as an user interface to an [Scripter]. This
/// means no fancy framework is used. It also means there are probably many
/// edge cases and even bugs, and it's not that extensible.

import 'dart:async';
import 'dart:html';

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

  /// Production apps should be built with
  /// `pub run build --define production=true`. That ensures that the [_ga]
  /// code won't break the whole app when it fails.
  static final inProduction =
      const String.fromEnvironment("production") == "true";

  /// Google Analytics.
  final GoogleAnalytics _ga = new GoogleAnalytics(failSilently: inProduction);

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
      _ga.sendCustom("restart_book");
    });

    final infoAnchor = document.querySelector("#book-info-button");
    final infoDialog = document.querySelector("#book-info-dialog");
    if (infoAnchor != null && infoDialog != null) {
      infoAnchor.onClick.listen((_) {
        infoDialog.classes.remove("display-none");
        _ga.sendCustom("show_info_dialog");
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
      _ga.sendCustom("start_book");
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
    _ga.sendCustom("choose_choice");
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
      _ga.sendCustom("load_bookmark");
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
    _ga.sendCustom("show_stats");
  }

  /// Creates a simple error dialog with [title] and [text].
  Future<bool> reportError(String title, String text) {
    Dialog errorDialog = new Dialog(title, "<p>$text</p>");
    _ga.sendException("$title -- $text", fatal: true);
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
