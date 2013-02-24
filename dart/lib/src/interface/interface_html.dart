library egb_interface_html;

import 'dart:async';
import 'dart:html';

import 'interface.dart';
import '../persistence/savegame.dart';
import '../shared/user_interaction.dart';

// because we're defining localStorage here
import '../persistence/storage.dart';
import '../persistence/player_profile.dart';

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
    
    var choicesDiv = new DivElement();
    choicesDiv.classes.add("choices-div");
    if (_currentSavegame != null) {
      choicesDiv.dataset["savegame-uid"] = _currentSavegame.uid;
      _currentSavegame = null;
      choicesDiv.classes.add("savegame");
    }
    
    if (choiceList.question != null) {
      var choicesQuestionP = new ParagraphElement();
      choicesQuestionP.innerHtml = choiceList.question;
      choicesQuestionP.classes.add("choices-question");
      choicesDiv.children.add(choicesQuestionP);
    }
    
    OListElement choicesOl = new OListElement();
    choicesOl.classes.add("choices-ol");
    
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
          
          _makeIntoBookmark(choicesDiv);
          ev.stopPropagation();  // Prevent event from immediately propagating
                                 // to the enclosing choicesOl (thus trying to
                                 // fire a LoadIntent).
      });
      
      li.append(a);
      choicesOl.append(li);
    }
    
    choicesDiv.append(choicesOl);
    
    bookDiv.append(choicesDiv);
    
    return completer.future;
  }
  
  /**
   * Makes choices in ordered list [choicesDiv] unclickable (removes <a> tags).
   * When the element has [:savegame-uid:] data attribute set, then the list
   * becomes a "bookmark" - saved state can be loaded by clicking on it.
   */
  void _makeIntoBookmark(DivElement choicesDiv) {
    choicesDiv.classes.add("past");
    // Remove <a> tags from all choices.
    choicesDiv.query("ol.choices-ol").children.forEach((LIElement el) {
      var string = el.query("a").innerHtml;
      el.children.clear();
      el.innerHtml = string;
    });
    if (choicesDiv.dataset.containsKey("savegame-uid")) {
      String uid = choicesDiv.dataset["savegame-uid"];
      // Make possible to come back to the associated savegame.
      choicesDiv.onClick
      .listen((Event ev) {
        // TODO: make more elegant, with confirmation appearing on page
        var confirm = window.confirm("Are you sure you want to come back to "
                        "this decision ($uid) and lose your progress since?");
        if (confirm) {
          while (choicesDiv.nextElementSibling != null) {
            choicesDiv.nextElementSibling.remove();
          }
          choicesDiv.remove();
         
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
