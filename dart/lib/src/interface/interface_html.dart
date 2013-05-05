library egb_interface_html;

import 'dart:async';
import 'dart:html';

import '../shared/markdown.dart' show markdown_to_html;

import 'interface.dart';
import '../persistence/savegame.dart';
import '../shared/user_interaction.dart';

// because we're defining localStorage here
import '../persistence/storage.dart';
import '../persistence/player_profile.dart';

import 'choice_with_infochips.dart';
import 'dart:collection';

class HtmlInterface implements EgbInterface {

  AnchorElement restartAnchor;
  
  DivElement bookDiv;
  
  StreamController<PlayerIntent> _streamController;
  Stream get stream => _streamController.stream;
  
  /**
   * The text that has been shown to the player since last savegame bookmark.
   * (Markdown format, pre-HTMLization.)
   */
  StringBuffer _textHistory = new StringBuffer();
  String getTextHistory() => _textHistory.toString();
  
  /**
    Constructor.
    */
  HtmlInterface() {
    _streamController = new StreamController();
    _elementShown = _elementShownController.stream.asBroadcastStream();
  }
  
  void setup() {
    // DOM
    bookDiv = document.query("div#book-wrapper");

    restartAnchor = document.query("nav a#book-restart");
    restartAnchor.onClick.listen((_) {
      _streamController.sink.add(new RestartIntent());
      // Clear text and choices
      bookDiv.children.clear();
      _textHistory.clear();
      _elementsToShow.clear();
    });
    
    _periodicSubscription = _periodic.listen((_) {
      _processElementsToShow();
    });
    _periodicSubscription.pause();
    
    document.query("p#loading").remove();
  }
  
  void close() {
    _streamController.close();
  }
  
  Queue<Element> _elementsToShow = new Queue<Element>();
  
  Future<bool> showText(String s) {
    var completer = new Completer();
    
    _textHistory.write("$s\n\n");
    String html = markdown_to_html(s);
    DivElement container = new DivElement();
    container.innerHtml = html;
    _recursiveRemoveScript(container);
    for (int i = 0; i < container.children.length; i++) {
      _elementsToShow.addLast(container.children[i].clone(true));
    }
    container.remove();  // TODO: find out if necessary to avoid leaks
    
    if (_elementsToShow.isEmpty) return new Future.value(true);
    
    var lastElementHash = _elementsToShow.last.hashCode;
    
    StreamSubscription subscription;
    subscription = _elementShown.listen((int hash) {
      if (hash == lastElementHash) {  // Cannot use .where because of bug in JS.
        completer.complete(true);
        subscription.cancel();
        // TODO: prevent memory leaks when showText isn't completed
      }
    });
    
    _periodicSubscription.resume();
    
    _processElementsToShow();
    return completer.future;
  }
  
  StreamController<int> _elementShownController = new StreamController();
  /// Stream of events when elements are shown in the web ui. The value
  /// is the hashcode of the element.
  Stream<int> _elementShown;
  
  static const Duration _durationBetweenShowingElements =
      const Duration(milliseconds: 200);
  Stream _periodic = new Stream.periodic(_durationBetweenShowingElements);
  StreamSubscription _periodicSubscription;
  
  /**
   * Goes through the list of outstanding elements to show and shows them
   * if necessary.
   */
  void _processElementsToShow() {
    if (_elementsToShow.isEmpty) {
      _periodicSubscription.pause();
      return;
    }
    if (!_scrolledPastEnd()) return;
    
    var el = _elementsToShow.removeFirst();
    el.classes.add("hidden");
    bookDiv.append(el);
    new Future.value(null).then((_) {
      el.classes.remove("hidden");
    });
    
    _elementShownController.add(el.hashCode);
    if (!_elementsToShow.isEmpty) _processElementsToShow();
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
      print("Script detected!");
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
          chip.innerHtml = markdown_to_html(choiceWithInfochips.infochips[j]);
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
          // Show bookmark.
          if (bookmarkDiv != null) {
            var _bookmarkDiv = bookmarkDiv;
            // Make the global variable immediately available.
            bookmarkDiv = null;
            var height = "${choicesOl.client.height + 10}px";
            _bookmarkDiv.query("a").style.height = height;
            _bookmarkDiv.classes.add("hidden");
            choicesOl.children.insert(0, _bookmarkDiv);
            new Future.delayed(new Duration(seconds: 1)).then((_) {
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
    
    _recursiveRemoveScript(choicesDiv);
    bookDiv.append(choicesDiv);
    return completer.future;
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
      _streamController.sink.add(new LoadIntent(uid));
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
