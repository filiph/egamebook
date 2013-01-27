library egb_interface_html;

import 'dart:async';
import 'dart:html';
import 'egb_interface.dart';
import 'egb_library.dart';
import 'egb_storage.dart';
import 'egb_savegame.dart';
import 'egb_player_profile.dart';

class HtmlInterface implements EgbInterface {

  AnchorElement restartAnchor;
  
  
  DivElement bookDiv;
  DivElement currentChoicesDiv;
  
  StreamController<PlayerIntent> _streamController;
  Stream get stream => _streamController.stream;
  
  /**
    Constructor.
    */
  HtmlInterface() {
    _streamController = new StreamController();
  }
  
  void setup() {
    // DOM
    restartAnchor = document.query("nav a#book-restart");
    restartAnchor.onClick.listen((_) {
        _streamController.sink.add(
            new RestartIntent());
        _currentSavegame = null;
        // Clear text and choices
        bookDiv.children.clear();
    });
    
    bookDiv = document.query("div#book-wrapper");
  }
  
  void close() {
    _streamController.close();
    if (currentChoicesDiv != null) currentChoicesDiv.remove();
  }
  
  Future<bool> showText(String s) {
    var p = new ParagraphElement();
    p.innerHtml = s;
    bookDiv.append(p);  // TODO: one by one, wait for transition end
    return new Future.immediate(true);
  }
  
  DivElement _buildChoicesDiv(EgbChoiceList choiceList) {
    
  }

  Future<int> showChoices(EgbChoiceList choiceList) {
    var completer = new Completer();
    
    if (choiceList.question != null) {
      var choicesQuestionP = new ParagraphElement();
      choicesQuestionP.innerHtml = choiceList.question;
      choicesQuestionP.classes.add("choices-question");
      bookDiv.children.add(choicesQuestionP);
    }
    
    OListElement choicesOl = new OListElement();
    choicesOl.classes.add("choices");
    if (_currentSavegame != null) {
      choicesOl.dataAttributes["savegame-uid"] = _currentSavegame.uid;
      _currentSavegame = null;
      choicesOl.classes.add("savegame");
    }
    
    // let player choose
    for (int i = 0; i < choiceList.length; i++) {
      EgbChoice choice = choiceList[i];
      LIElement li = new Element.tag("li");
      AnchorElement a = new Element.tag("a");
      a.innerHtml = choice.string;

      a.onClick.listen((Event ev) {
          // Send choice hash back to Scripter.
          completer.complete(choice.hash);
          // Mark this element as chosen.
          li.classes.add("chosen");
          
          _makeIntoBookmark(choicesOl);
          ev.stopPropagation();  // Prevent event from immediately propagating
                                 // to the enclosing choicesOl (thus trying to
                                 // fire a LoadIntent).
      });
      
      li.append(a);
      choicesOl.append(li);
    }
    
    bookDiv.append(choicesOl);
    
    return completer.future;
  }
  
  /**
   * Makes choices in ordered list [choicesOl] unclickable (removes <a> tags).
   * When the element has [:savegame-uid:] data attribute set, then the list
   * becomes a "bookmark" - saved state can be loaded by clicking on it.
   */
  void _makeIntoBookmark(OListElement choicesOl) {
    choicesOl.classes.add("past");
    // Remove <a> tags from all choices.
    choicesOl.children.forEach((LIElement el) {
      var string = el.query("a").innerHtml;
      el.children.clear();
      el.innerHtml = string;
    });
    if (choicesOl.dataAttributes.containsKey("savegame-uid")) {
      String uid = choicesOl.dataAttributes["savegame-uid"];
      // Make possible to come back to the associated savegame.
      choicesOl.onClick
      //.skip(1)  // The first fired event is actually the click on the <a> tag.
      .listen((Event ev) {
        // TODO: make more elegant, with confirmation appearing on page
        var confirm = window.confirm("Are you sure you want to come back to "
                        "this decision ($uid) and lose your progress since?");
        if (confirm) {
          var prevEl = choicesOl.previousElementSibling;
          if (prevEl != null && prevEl.classes.contains("choices-question")) {
            prevEl.remove();
          }
          while (choicesOl.nextElementSibling != null) {
            choicesOl.nextElementSibling.remove();
          }
          choicesOl.remove();
         
          _streamController.sink.add(
                        new LoadIntent(uid));
        }
      });
    }
  }
  
  EgbSavegame _currentSavegame;
  
  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    _currentSavegame = savegame;
//    var p = new ParagraphElement();
//    p.text = "==> Savegame for '${savegame.currentPageName}', hash ${savegame.uid}";
//    bookDiv.append(p);
  }
}

class LocalStorage implements EgbStorage {
  Future<bool> save(String key, String value) {
    window.localStorage[key] = value;
    return new Future.immediate(true);
  }
  
  Future<String> load(String key) {
    var result = window.localStorage[key];
    return new Future.immediate(result);
  }
  
  Future<bool> delete(String key) {
    window.localStorage.remove(key);
    return new Future.immediate(true);
  }
  
  EgbPlayerProfile getDefaultPlayerProfile() {
    return new EgbPlayerProfile(EgbStorage.DEFAULT_PLAYER_UID, 
        this);
  }
}
