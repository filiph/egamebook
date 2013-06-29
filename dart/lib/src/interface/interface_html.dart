library egb_interface_html;

import 'dart:async';
import 'dart:html';

import '../shared/markdown.dart' show markdown_to_html;

import 'interface.dart';
import '../persistence/savegame.dart';
import '../shared/user_interaction.dart';
import '../shared/points_award.dart';

// because we're defining localStorage here
import '../persistence/storage.dart';
import '../persistence/player_profile.dart';

import 'choice_with_infochips.dart';
import 'dart:collection';

class HtmlInterface extends EgbInterfaceBase {
  AnchorElement restartAnchor;
  SpanElement pointsSpan;
  
  DivElement bookDiv;
  
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
    bookDiv = document.query("div#book-wrapper");

    restartAnchor = document.query("nav a#book-restart");
    restartAnchor.onClick.listen((_) {
      streamController.add(new RestartIntent());
      // Clear text and choices
      bookDiv.children.clear();
      _textHistory.clear();
      // TODO: clear meta elements
    });
    
    pointsSpan = document.query("span#points-value");
    
    _periodicSubscription = _periodic.listen((_) {
      _checkMetaElementsInView();
    });
    _periodicSubscription.pause();
    
    document.query("p#loading").remove();
  }
  
  void endBook() {
    print("The book has ended.");
  }
  
  void close() {
    streamController.close();
  }
  
  // TODO: instead of creating one-by-one, create them all, use delayed transitions. Only use _periodic for checking if special "meta" divs are visible (can be once per second)
  /**
   * Converts [s] to HTML elements (via markdown) and shows them one by one
   * on page. Returns when complete.
   */
  Future<bool> showText(String s) {
    if (s == null) return new Future.value(false);
    var completer = new Completer();
    
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
      count++;
      el.classes.add("hidden");
      num transitionDelay = 
          _durationBetweenShowingElements.inMilliseconds * (count - 1) / 1000; 
      el.style.transitionDelay = "${transitionDelay}s";
      bookDiv.append(el);//container.children[i]);
      Timer.run(() {
        el.classes.remove("hidden");
      });
    }
    container.remove();  // TODO: find out if necessary to avoid leaks
    
    return new Future.delayed(_durationBetweenShowingElements * count, 
        () => true);
  }
  
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
    print("_metaElements: currentBottom = $currentBottom");
    var _processedElements = new Set<int>();
    for (int i = 0; i < _metaElements.length; i++) {
      var metaEl = _metaElements[i];
      assert(metaEl.element.offsetParent == document.body);
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
      LIElement li = new Element.tag("li");

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
      text.innerHtml = markdown_to_html(choiceWithInfochips.text);
      text.classes.add("choice-text");
      choiceDisplay.append(text);

      var subscription = li.onClick.listen((Event ev) {
          // Send choice hash back to Scripter.
          completer.complete(choice.hash);
          // Mark this element as chosen.
          li.classes.add("chosen");
          choicesOl.classes.add("chosen");
          // Unregister listeners.
          clickSubscriptions.forEach((StreamSubscription s) => s.cancel());
          clickSubscriptions.clear();
          // Show bookmark.
          if (bookmarkDiv != null) {
            var _bookmarkDiv = bookmarkDiv;
            // Make the global variable immediately available.
            bookmarkDiv = null;
            var height = "${choicesOl.client.height + 10}px";
            _bookmarkDiv.query("a").style.height = height;
            _bookmarkDiv.classes.add("hidden");
            choicesOl.children.insert(0, _bookmarkDiv);
            new Timer(new Duration(seconds: 1), () {
              _bookmarkDiv.classes.remove("hidden");
            });
            // TODO: show after scrolled past
          }
      });
      clickSubscriptions.add(subscription);
      
      li.append(number);
      li.append(choiceDisplay);
      
      choicesOl.append(li);
    }
    
    choicesDiv.append(choicesOl);
    
    choicesDiv.classes.add("hidden");
    _recursiveRemoveScript(choicesDiv);
    bookDiv.append(choicesDiv);
    new Future.value(null).then((_) {
      choicesDiv.classes.remove("hidden");
    });
    return completer.future;
  }
  
  Future<bool> awardPoints(PointsAward award) {
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
    Timer.run(() {
      p.classes.remove("hidden");
    });
    // Only add the action after element fully visible.
    new Timer(_durationBetweenShowingElements, () {
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
  
  /// Blinks the [el] element via CSS transitions.
  void _blink(Element el) {
    el.classes.add("blink");
    new Timer(new Duration(milliseconds: 1000), 
        () => el.classes.remove("blink"));
  }
  
  /**
   * What happens when user clicks on a savegame bookmark.
   */
  void _handleSavegameBookmarkClick(String uid) {
    // TODO: make more elegant, with confirmation appearing on page
    var confirm = window.confirm("Are you sure you want to come back to "
                    "this decision ($uid) and lose your progress since?");
    if (confirm) {
      bookDiv.children.clear();
      // TODO: retain scroll position
      streamController.add(new LoadIntent(uid));
      // TODO: solve for when savegame with that uid is not available
    }
  }
  
  DivElement bookmarkDiv;
  
  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    print("Creating savegame bookmark for ${savegame.uid}");
    _textHistory.clear();  // The _textHistory has been saved with the savegame.
    bookmarkDiv = new DivElement();
    bookmarkDiv.id = "bookmark-uid-${savegame.uid}";
    bookmarkDiv.classes.add("bookmark-div");
    var bookmarkAnchor = new AnchorElement();
    var bookmarkImg = new ImageElement(src: "img/bookmark.png", 
        width: 30, height: 60);
    bookmarkAnchor.append(bookmarkImg);
    bookmarkAnchor.onClick.listen((_) {
      _handleSavegameBookmarkClick(savegame.uid);
    });
    bookmarkDiv.append(bookmarkAnchor);
  }
}

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