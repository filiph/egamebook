library egb_user_interaction;

import 'dart:math';
import 'dart:collection';

import 'egb_utils.dart';
import 'egb_message.dart';

class EgbUserInteraction {
  bool shown = false;
  bool waitForEndOfPage;
  int hash;
}

class EgbChoice extends EgbUserInteraction implements Comparable {
  String string;
  Function f;
  String goto;
  bool showNow;

  EgbChoice(String rawString, {this.goto, Function then, bool showNow: false}) : 
      super() {
    string = rawString.trim();  // string is defined with a trailing space because of quadruple quotes problem
    hash = string.hashCode;
    f = then;
    waitForEndOfPage = !showNow;
  }

  EgbChoice.fromMap(Map<String,dynamic> map) : super() {
    string = map["string"].trim();
    if (map.containsKey("hash")) {
      hash = map["hash"];
    } else {
      hash = string.hashCode;
    }
    
    // solve bug in javascript which return hashCode=0 for every string
    if (hash == 0) {
      hash = new Random().nextInt(1000000);
    }
    
    goto = map["goto"];
    if (map.containsKey("showNow")) {
      showNow = map["showNow"];
    }
    f = map["then"];
  }

  EgbChoice then(Function _f) {
    f = _f;
    return this;
  }
  
  int compareTo(EgbChoice other) => this.string.compareTo(other.string);
}

class EgbChoiceList implements List<EgbChoice> {
  final List<EgbChoice> _choices;
  String question;  // TODO: implement
  
//  EgbChoiceList() : _choices = new List<EgbChoice>() {
//  }
  
//  EgbChoiceList._from(Collection<EgbChoice> list)
//      : _choices = new List<EgbChoice>() {
//    _choices.addAll(list);
//  }
  
  EgbChoiceList() : _choices = new List<EgbChoice>();
  
  EgbChoiceList.from(Iterable iterable) : 
      _choices = new List<EgbChoice>.from(iterable);
  
  EgbChoiceList.fromMessage(EgbMessage m) : _choices = new List<EgbChoice>() {
    if (m.listContent.length < 3) {
      throw "Message with choices doesn't have enough data: $m.";
    } else {
      question = m.listContent[1];
      for (int i = 2; i < m.listContent.length; i++) {
        _choices.add(new EgbChoice.fromMap(m.listContent[i]));
      }
    }
  }
  
  where(f) => _choices.where(f);
  removeMatching(f) => _choices.removeMatching(f);
  any(f) => _choices.any(f);
  add(element) => _choices.add(element);
  get length => _choices.length;
  operator [](int index) => _choices[index];
  void forEach(void f(EgbChoice element)) {
    _choices.forEach(f);
  }
  void clear() => _choices.clear();
  get iterator => _choices.iterator;
 
  /**
   * Takes care of converting the current [EgbChoiceList] to a Message. 
   * 
   * By providing [filterOut()], one can force to not show choices that 
   * satisfy [:filterOut(choice) == true:].
   */
  EgbMessage toMessage({
      String prependText: null, 
      bool endOfPage: false,
      bool filterOut(EgbChoice choice)}) {
    List<EgbChoice> choicesToSend;
    
    // filter out choices we don't want to show
    choicesToSend = _choices.where((choice) {
      if (choice.shown) return false;  // choice shown before
      if (!endOfPage && choice.waitForEndOfPage) return false;
      if (filterOut != null && filterOut(choice)) return false;
      return true;
    }).toList();
    
    DEBUG_SCR("Sending choices.");
    EgbMessage m = new EgbMessage(EgbMessage.MSG_SHOW_CHOICES);
    
    m.listContent = new List<dynamic>();
    m.listContent.add(prependText);
    m.listContent.add(question);
    choicesToSend.forEach((choice) {
      m.listContent.add( {
        "string": choice.string,
        "hash": choice.hash
      } );
      choice.shown = true;
    });
    
    return m;
  }
}

class EgbTextInput extends EgbUserInteraction {
  // TODO: implement
  // Question can be answered with text. Example: "What is your name?"
}