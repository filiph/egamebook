library egb_interface_html;

import 'dart:html';
import 'egb_interface.dart';
import 'egb_library.dart';

class HtmlInterface implements EgbInterface {

  DivElement paragraphsDiv;
  DivElement choicesDiv;
  ParagraphElement choicesQuestionP;
  OListElement choicesOl;
  
  /**
    Constructor.
    */
  HtmlInterface();
  
  void setup() {
    // DOM
    paragraphsDiv = document.query("div#book-paragraphs");
    choicesDiv = document.query("div#book-choices");
    choicesOl = document.query("ol#book-choices-ol");
    choicesQuestionP = document.query("p#book-choices-question");
  }
  
  void close() {
    choicesOl.elements.clear();
    choicesQuestionP.style.display = "none";
  }
  
  Future<bool> showText(String s) {
    ParagraphElement p = new Element.tag("p");
    p.innerHTML = s;
    paragraphsDiv.elements.add(p);
    return new Future.immediate(true);
  }

  Future<int> showChoices(EgbChoiceList choiceList) {
    var completer = new Completer();
    
    if (choiceList.question != null) {
      choicesQuestionP.innerHTML = choiceList.question;
      choicesQuestionP.style.display = "block";
    }
    
    // let player choose
    for (int i = 0; i < choiceList.length; i++) {
      EgbChoice choice = choiceList[i];
      LIElement li = new Element.tag("li");
      AnchorElement a = new Element.tag("a");
      a.innerHTML = choice.string;

      a.on.click.add((Event ev) {
        print("User clicked on choice $i with hash ${choice.hash}");
          completer.complete(choice.hash);
          choicesOl.elements.clear();
          choicesQuestionP.style.display = "none";
      });
      
      li.elements.add(a);
      choicesOl.elements.add(li);
    }
    
    return completer.future;
  }
}
