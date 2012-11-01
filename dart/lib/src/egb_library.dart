library egb;

import 'dart:isolate';
import 'dart:json';
import 'dart:math';

// TODO: if too big JS/Dart files, have a JSON file/server somewhere and instead of feeding Interface with paragraphs, just feed it with URIs.
// TODO: make save/load - interface Saveable for game objects. Objects need to implement "serialize()" and "loadFromSerialized()" or some such. Each object can choose which of it's parts it wants to serialize. Plain objects like int, List or Map are automatically Saveable. All Saveable objects (in vars) should be saved automatically on each new page. There should be a rotating history of ~10 pages.

void DEBUG_SCR(String str) {
  print("SCR: $str");
}


class Message {
  int type;

  // different types of contents
  List listContent;
  String strContent;
  int intContent;

  static final int MSG_QUIT = 0;
  static final int MSG_CONTINUE = 1;  // 0b0001
  static final int MSG_RESULT = 2;  // 0b0010
  static final int MSG_TEXT_RESULT = 4;  // 0b0100
  static final int MSG_INPUT_NEEDED = 8;
  static final int MSG_START = 16;
  static final int MSG_END_OF_BOOK = 32;
  static final int MSG_SHOW_CHOICES = 64;
  static final int MSG_OPTION_SELECTED = 128;
  static final int MSG_NO_RESULT = 256;

  Message(this.type) {
  }

  Message.Quit() : type = MSG_QUIT {}

  Message.Continue() : type = MSG_CONTINUE {}

  Message.TextResult(String str) : type = MSG_TEXT_RESULT {
    strContent = str;
  }

  Message.Start() : type = MSG_START {}

  Message.EndOfBook() : type = MSG_END_OF_BOOK {}

  /**
   *  Choices message. Creates a list with [0] being text prepended,
   *  [1] being the question asked, and the rest being the choices themselves.
   */
  Message.ShowChoices(
      ChoiceList choices,
      {String prependText: "",
      bool endOfPage: false}
      ) : type = MSG_SHOW_CHOICES {
    ChoiceList choicesToSend;
    // filter out choices we don't want to show
    if (!endOfPage) {
      choicesToSend = choices.filter((choice) => !choice.waitForEndOfPage && !choice.shown);
    } else {
      choicesToSend = choices.filter((choice) => !choice.shown);
    }

    DEBUG_SCR("Sending choices.");

    listContent = new List<dynamic>();
    listContent.add(prependText);
    listContent.add(choices.question);
    choicesToSend.forEach((choice) {
        listContent.add( {
          "string": choice.string,
          "hash": choice.hashCode
          } );
        choice.shown = true;
        });
  }

  Message.OptionSelected(int hash) : type = MSG_OPTION_SELECTED {
    intContent = hash;
  }

  Message.NoResult() : type = MSG_NO_RESULT {}

  /**
    Ctor that creates the Message object from a JSON string.
    XXX: this isn't needed in VM, but frog can't handle Object messages (yet?)
    */
  Message.fromJson(String json) {
    Map<String,dynamic> data = JSON.parse(json);
    type = data["type"];

    if (type == MSG_OPTION_SELECTED) {
      intContent = data["intContent"];
    } else if (type == MSG_SHOW_CHOICES) {
      listContent = data["listContent"];
    } else if (type == MSG_TEXT_RESULT) {
      strContent = data["strContent"];
    }
  }

  /**
    Outputs message to JSON string. Useful when sending via Port to Isolate.
    */
  String toJson() {
    Map<String,dynamic> data = new Map<String,dynamic>();

    data["type"] = type;

    if (type == MSG_OPTION_SELECTED) {
      data["intContent"] = intContent;
    } else if (type == MSG_SHOW_CHOICES) {
      data["listContent"] = listContent;
    } else if (type == MSG_TEXT_RESULT) {
      data["strContent"] = strContent;
    }

    return JSON.stringify(data);
  }
}

class UserInteraction implements Hashable {
  bool shown = false;
  bool waitForEndOfPage;
}

class Choice extends UserInteraction implements Comparable {
  String string;
  Function f;
  String goto;
  bool showNow;

  Choice(this.string, {this.goto, Function then, bool showNow: false}) : super() {
    f = then;
    waitForEndOfPage = !showNow;
  }

  Choice.fromMap(Map<String,dynamic> map) : super() {
    string = map["string"];
    goto = map["goto"];
    if (map.containsKey("showNow")) {
      showNow = map["showNow"];
    }
    f = map["then"];
  }

  Choice then(Function _f) {
    f = _f;
    return this;
  }
  
  int compareTo(Choice other) => this.string.compareTo(other.string);
}

class ChoiceList implements List<Choice> {
  final List<Choice> _choices;
  String question;  // TODO: implement
  
  ChoiceList() : _choices = new List<Choice>() {
  }
  
  ChoiceList._from(Collection<Choice> list)
    : _choices = new List<Choice>()
  {
    _choices.addAll(list);
  }
  
  /**
   * Check whether the collection contains an element equal to [element].
   */
  bool contains(Choice element) => _choices.contains(element);

  /**
   * Returns the last element of the [ChoiceList], or throws an out of bounds
   * exception if the [ChoiceList] is empty.
   */
  Choice get last => _choices.last;

  /**
   * Returns the first index of [element] in this [ChoiceList].
   * Searches this [ChoiceList] from index [start] to the length of the
   * [ChoiceList]. Returns -1 if [element] is not found.
   */
  int indexOf(Choice element, [int start = 0]) => _choices.indexOf(element, start);
  int lastIndexOf(Choice element, [int start]) => _choices.lastIndexOf(element, start);

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
                 dynamic combine(dynamic previousValue, Choice element))
  => _choices.reduce(initialValue, combine);

  /**
   * Returns the element at the given [index] in the [ChoiceList] or throws
   * an [IndexOutOfRangeException] if [index] is out of bounds.
   */
  Choice operator [](int index) => _choices[index];
  
  void operator []=(int index, Choice element) {
    _choices[index] = element;
  }

  void add(Choice element) => _choices.add(element);
  void addLast(Choice element) => _choices.addLast(element);
  void addAll(Collection<Choice> collection) => _choices.addAll(collection);

  List<Choice> getRange(int start, int length) => _choices.getRange(start, length);
  void removeRange(int start, int length) =>
      _choices.removeRange(start, length);
  void setRange(int start, int length, List<Choice> from, [int startFrom]) =>
      _choices.setRange(start, length, from, startFrom);
  void insertRange(int start, int length, [Choice initialValue]) =>
      _choices.insertRange(start, length, initialValue);

  /**
   * Applies the function [f] to each element of this collection.
   */
  void forEach(void f(Choice element)) => _choices.forEach(f);

  /**
   * Returns a new [ChoiceList] with the elements [: f(e) :]
   * for each element [e] of this collection.
   *
   * Note on typing: the return type of f() could be an arbitrary
   * type and consequently the returned collection's
   * typeis Collection.
   */
  ChoiceList map(f(Choice element)) =>
      new ChoiceList._from(_choices.map(f));

  /**
   * Returns a new [ChoiceList] with the elements of this collection
   * that satisfy the predicate [f].
   *
   * An element satisfies the predicate [f] if [:f(element):]
   * returns true.
   */
  ChoiceList filter(bool f(Choice element))
  => new ChoiceList._from(_choices.filter(f));

  /**
   * Returns true if every elements of this collection satisify the
   * predicate [f]. Returns false otherwise.
   */
  bool every(bool f(Choice element)) => _choices.every(f);

  /**
   * Returns true if one element of this collection satisfies the
   * predicate [f]. Returns false otherwise.
   */
  bool some(bool f(Choice element)) => _choices.some(f);
  
  void sort([Comparator<Choice> compare = Comparable.compare]) => _choices.sort(compare);

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
  
  Choice removeAt(int index) => _choices.removeAt(index);
  Choice removeLast() => _choices.removeLast();

  /**
   * Returns an [Iterator] that iterates over this [Iterable] object.
   */
  Iterator<Choice> iterator() => _choices.iterator();

  Message toMessage({String prependText: null, bool endOfPage: false}) {
    List<Choice> choicesToSend;
    // filter out choices we don't want to show
    if (!endOfPage) {
      choicesToSend = this.filter((choice) => !choice.waitForEndOfPage && !choice.shown);
    } else {
      choicesToSend = this.filter((choice) => !choice.shown);
    }
  
    DEBUG_SCR("Sending choices.");
  
    Message m = new Message(Message.MSG_SHOW_CHOICES);
    
    m.listContent = new List<dynamic>();
    m.listContent.add(prependText);
    m.listContent.add(question);
    choicesToSend.forEach((choice) {
      m.listContent.add( {
        "string": choice.string,
        "hash": choice.hashCode
      } );
      choice.shown = true;
    });
    
    return m;
  }
}

class Question extends UserInteraction {
}



/**
  Scripter is the class that runs the actual game and sends Messages to UserInterface.
  It is subclassed by ScripterImpl, which is built from .egb the file by egb_builder.
  */
abstract class Scripter {
  SendPort _interfacePort;

  List<List> pages;
  Map<String,int> pageHandles; // TODO: make this into Map<String,Page>
  
  String get currentPageName {
    if (currentPageIndex == null) {
      return null;
    }
    for (var key in pageHandles.keys) {
      if (pageHandles[key] == currentPageIndex) {
        return key;
      }
    }
    throw "Current page index ($currentPageIndex) is not among pageHandles.";
  }
  
  String get currentGroupName {
    var currentPage = currentPageName;
    int index = currentPage.indexOf(": ");
    if (index > 0) {
      return currentPage.substring(0, index);
    } else {
      return null;
    }
  }
  
  List blocks;
  int currentPageIndex;  // the current position in the pages list
  int currentBlock;  // the current position in the current page's blocks list

  int nextPageIndex;
  bool repeatBlockBit = false;
  /**
    When a block/script/choice call for a script to be called afterwards, it ends
    up on this FIFO stack.
    */
  List<Function> nextScriptStack;

  abstract void initBlock();

  Scripter() : super() {
    DEBUG_SCR("Scripter has been created.");
    nextScriptStack = new List<Function>();
    initScriptEnvironment();

    // start the loop
    port.receive(callback);
  }

  void callback(String messageJson, SendPort replyTo) {
    Message message = new Message.fromJson(messageJson);
    DEBUG_SCR("Received message from interface: ${message.type}.");
    _interfacePort = replyTo;
    if (message.type == Message.MSG_QUIT) {
      DEBUG_SCR("Closing port and quiting.");
      port.close();
    } else if (pages == null
        || (currentPageIndex != null && currentPageIndex >= pages.length)) {
      DEBUG_SCR("No more pages.");
      _interfacePort.send(new Message.EndOfBook().toJson(), port.toSendPort());
    } else {
      _interfacePort.send(goOneStep(message).toJson(), port.toSendPort());
    }
  }

  // Walks through the instructions, one block at a time.
  // Returns message for interface.
  Message goOneStep(Message incomingMessage) {
    if (incomingMessage.type == Message.MSG_START) {
      DEBUG_SCR("Starting from the beginning");
      currentPageIndex = 0;
      // TODO: currentPageName
      currentBlock = null;
      nextScriptStack.clear();
      initScriptEnvironment();
    }

    if (incomingMessage.type == Message.MSG_OPTION_SELECTED) {
      DEBUG_SCR("An option has been selected. Resolving.");
      // TODO: make this more elegant by making ChoiceList class
      Message message;
      choices.forEach((choice) {
          if (choice.hashCode == incomingMessage.intContent) {
            DEBUG_SCR("Found choice that was selected: ${choice.string}");
            if (choice.goto != null) {
              goto(choice.goto);
            }
            if (choice.f != null) {
              message = runScriptBlock(script:choice.f);
            }
          }
      });
      if (message != null) {
        return message;
      } else {
        return new Message.NoResult();
      }
    }

    // if previous script asked for nextScript()
    if (!nextScriptStack.isEmpty) {
      Function script = nextScriptStack.removeLast();
      return runScriptBlock(script:script);
    }

    // if previous script asked to jump, then jump
    if (nextPageIndex != null) {
      currentPageIndex = nextPageIndex;
      // TODO currentPageName
      currentBlock = null;
      nextPageIndex = null;
      choices.clear();
    }

    // increase currentBlock, but not if previous script called "repeatBlock();"
    if (currentBlock == null) {
      currentBlock = 0;
    } else if (repeatBlockBit) {
      repeatBlockBit = false;
    } else {
      currentBlock++;
    }

    DEBUG_SCR("currentPageIndex = $currentPageIndex, currentBlock = $currentBlock");

    blocks = pages[currentPageIndex];
    DEBUG_SCR("Resolving block.");
    if (currentBlock >= blocks.length) {
      DEBUG_SCR("At the end of page.");
      if (choices.some((choice) => !choice.shown)) {
        return choices.toMessage(endOfPage:true); //new Message.ShowChoices(choices, endOfPage:true);
      } else {
        return new Message.EndOfBook();
      }
    } else if (blocks[currentBlock] is String) {
      // just an ordinary paragraph, no script
      Message message = new Message.TextResult(blocks[currentBlock]);
      return message;
    } else if (blocks[currentBlock] is Map) {
      Map map = blocks[currentBlock] as Map<String,dynamic>;
      if (map.containsKey("question")) {
        // we have a question
        choices.question = map["question"];
      } else {
        // not a question, so it must be a choice, TODO: check
        choices.add(new Choice.fromMap(blocks[currentBlock]));
      }
      return new Message.NoResult();
    } else if (blocks[currentBlock] is Function) {
      // a script paragraph
      DEBUG_SCR("Running script.");
      return runScriptBlock(blocks[currentBlock]);
    }

  }


  // TODO: TBD if we want to build a class (ScriptEnvironment) for the below

  ChoiceList choices;
  Map<String, dynamic> vars;
  StringBuffer textBuffer;

  void initScriptEnvironment() {
    choices = new ChoiceList();
    vars = new Map<String, dynamic>();

    initBlock(); // run contents of <init>
  }

  // XXX: noSuchMethod not yet implemented in this form in Dart
  /*
     noSuchMethod(InvocationMirror invocation) {
     if (invocation.isGetter) {
     invocation.invokeOn(vars[invocation.memberName]);
     } else if (invocation.isSetter) {
     invocation.invokeOn(vars[invocation.memberName]);
     } else {
     throw new NoSuchMethodException(this, invocation.memberName, invocation.arguments);
     }
  // TODO: Implement "library" using noSuchMethod
  // - noSuchMethod for function invocations (combat())
  }
   */

  dynamic noSuchMethod(String name, List args) {
    if (name.startsWith("get:") || name.startsWith("get ")) {
      // TODO: throw error if not set
      return vars[name.substring(4)];
    } else if (name.startsWith("set:") || name.startsWith("set ")) {
      vars[name.substring(4)] = args[0];
      return null;
    } else {
      throw new NoSuchMethodError(this, name, args);
    }
  }

  void echo(String str) {
    if (textBuffer.length > 0) {
      textBuffer.add(" ");
    }
    textBuffer.add(str);
  }

  void goto(String dest) {
    if (currentGroupName != null
        && pageHandles.containsKey("$currentGroupName: $dest")) {
      nextPageIndex = pageHandles["$currentGroupName: $dest"];
    } else if (pageHandles.containsKey(dest)) {
      nextPageIndex = pageHandles[dest];
    } else {
      throw "Function goto() called with an invalid argument '$dest' (no such page).";
    }
  }

  void nextScript(Function f) {
    nextScriptStack.add(f);
  }

  void repeatBlock() {
    repeatBlockBit = true;
  }

  // Utility function that creates new choice.
  Choice choice(String string, [String goto, Function then, bool showNow=false]) {
    Choice choice = new Choice(string, goto:goto, then:then, showNow:showNow);
    choices.add(choice);
    return choice;
  }

  // runs the current block or the specified block
  Message runScriptBlock([Function script]) {
    // clean up
    textBuffer = new StringBuffer();
    // delete choices that have already been shown
    choices = choices.filter((Choice choice) => !choice.shown);

    // run the actual script
    if (script == null) {
      blocks[currentBlock]();
    } else {
      script();
    }

    // catch text and choices
    if (choices.some((choice) => !choice.waitForEndOfPage)) {
      return choices.toMessage(prependText:textBuffer.toString()); // new Message.ShowChoices(choices, prependText:textBuffer.toString());
    }
    return new Message.TextResult(textBuffer.toString());
  }
}

/**
  Interface to all user interfaces interacting with the Scripter.
  */
abstract class UserInterface {
  ReceivePort _receivePort;
  SendPort _scripterPort;

  // TODO: all interfaces should allow autopilot mode (for automated/unit testing)
}

