library egb_user_interaction;

import 'dart:math';

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

  EgbChoice(this.string, {this.goto, Function then, bool showNow: false}) : super() {
    hash = string.hashCode;
    f = then;
    waitForEndOfPage = !showNow;
  }

  EgbChoice.fromMap(Map<String,dynamic> map) : super() {
    string = map["string"];
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
  
  EgbChoiceList() : _choices = new List<EgbChoice>() {
  }
  
  EgbChoiceList._from(Collection<EgbChoice> list)
      : _choices = new List<EgbChoice>() {
    _choices.addAll(list);
  }
  
  EgbChoiceList.fromMessage(EgbMessage m) 
      : _choices = new List<EgbChoice>() {
    if (m.listContent.length < 3) {
      throw "Message with choices doesn't have enough data: $m.";
    } else {
      question = m.listContent[1];
      for (int i = 2; i < m.listContent.length; i++) {
        _choices.add(new EgbChoice.fromMap(m.listContent[i]));
      }
    }
  }
  
  /**
   * Check whether the collection contains an element equal to [element].
   */
  bool contains(EgbChoice element) => _choices.contains(element);

  /**
   * Returns the last element of the [EgbChoiceList], or throws an out of bounds
   * exception if the [EgbChoiceList] is empty.
   */
  EgbChoice get last => _choices.last;

  /**
   * Returns the first index of [element] in this [EgbChoiceList].
   * Searches this [EgbChoiceList] from index [start] to the length of the
   * [EgbChoiceList]. Returns -1 if [element] is not found.
   */
  int indexOf(EgbChoice element, [int start = 0]) => _choices.indexOf(element, start);
  int lastIndexOf(EgbChoice element, [int start]) => _choices.lastIndexOf(element, start);

  /**
   * Reduce a collection to a single value by iteratively combining each element
   * of the collection with an existing value using the provided function.
   * Use [initialValue] as the initial value, and the function [combine] to
   * create a new value from the previous one and an element.
   *
   * Example of calculating the sum of a collection:
   *
   *   collection.reduce(0, (prev, element) => prev + element);
   */
  dynamic reduce(dynamic initialValue,
                 dynamic combine(dynamic previousValue, EgbChoice element))
  => _choices.reduce(initialValue, combine);

  /**
   * Returns the element at the given [index] in the [EgbChoiceList] or throws
   * an [IndexOutOfRangeException] if [index] is out of bounds.
   */
  EgbChoice operator [](int index) => _choices[index];
  
  void operator []=(int index, EgbChoice element) {
    _choices[index] = element;
  }

  void add(EgbChoice element) => _choices.add(element);
  void addLast(EgbChoice element) => _choices.addLast(element);
  void addAll(Collection<EgbChoice> collection) => _choices.addAll(collection);

  List<EgbChoice> getRange(int start, int length) => _choices.getRange(start, length);
  void removeRange(int start, int length) =>
      _choices.removeRange(start, length);
  void setRange(int start, int length, List<EgbChoice> from, [int startFrom]) =>
      _choices.setRange(start, length, from, startFrom);
  void insertRange(int start, int length, [EgbChoice initialValue]) =>
      _choices.insertRange(start, length, initialValue);

  /**
   * Applies the function [f] to each element of this collection.
   */
  void forEach(void f(EgbChoice element)) => _choices.forEach(f);

  /**
   * Returns a new [EgbChoiceList] with the elements [: f(e) :]
   * for each element [e] of this collection.
   *
   * Note on typing: the return type of f() could be an arbitrary
   * type and consequently the returned collection's
   * typeis Collection.
   */
  EgbChoiceList map(f(EgbChoice element)) =>
      new EgbChoiceList._from(_choices.map(f));

  /**
   * Returns a new [EgbChoiceList] with the elements of this collection
   * that satisfy the predicate [f].
   *
   * An element satisfies the predicate [f] if [:f(element):]
   * returns true.
   */
  EgbChoiceList filter(bool f(EgbChoice element))
  => new EgbChoiceList._from(_choices.filter(f));

  /**
   * Returns true if every elements of this collection satisify the
   * predicate [f]. Returns false otherwise.
   */
  bool every(bool f(EgbChoice element)) => _choices.every(f);

  /**
   * Returns true if one element of this collection satisfies the
   * predicate [f]. Returns false otherwise.
   */
  bool some(bool f(EgbChoice element)) => _choices.some(f);
  
  void sort([Comparator<EgbChoice> compare = Comparable.compare]) => _choices.sort(compare);

  /**
   * Returns true if there is no element in this collection.
   */
  bool get isEmpty => _choices.isEmpty;

  /**
   * Returns the number of elements in this collection.
   */
  int get length => _choices.length;
  set length(int value) => _choices.length = value;
  
  void clear() => _choices.clear();
  
  EgbChoice removeAt(int index) => _choices.removeAt(index);
  EgbChoice removeLast() => _choices.removeLast();

  /**
   * Returns an [Iterator] that iterates over this [Iterable] object.
   */
  Iterator<EgbChoice> iterator() => _choices.iterator();

  EgbMessage toMessage({String prependText: null, bool endOfPage: false}) {
    List<EgbChoice> choicesToSend;
    // filter out choices we don't want to show
    if (!endOfPage) {
      choicesToSend = this.filter((choice) => !choice.waitForEndOfPage && !choice.shown);
    } else {
      choicesToSend = this.filter((choice) => !choice.shown);
    }
  
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

class EgbQuestion extends EgbUserInteraction {
  // TODO: implement
  // Question can be answered with text. Example: "What is your name?"
}