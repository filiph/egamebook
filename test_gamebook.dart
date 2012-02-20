
class Instruction {
  Instruction() {
  }

  void run() {
  }
}

class PrintInstruction extends Instruction {
  String msg;

  PrintInstruction(this.msg) {
  }

  void run() {
    print(msg);
  }

  String toString() {
    return "Instruction that prints: \"$msg\".";
  }
}

class FuncInstruction extends Instruction {
  Function f;

  FuncInstruction(this.f) {
  }

  void run() {
    f();
  }

  String toString() {
    return "Instruction that runs a function.";
  }
}

class Page {
  List<Instruction> instructions;
  int index;
  bool running = false;

  Player player;

  Page() {
    instructions = new List<Instruction>();
  }

  void printCurrentStack() {
    print("> Current instruction stack.");

    for (int i = 0; i < instructions.length; i++) {
      if (index == i)
        print("> ** YOU ARE HERE **");
      print("> ${instructions[i]}");
    }

    print("> End of stack.");
  }

  void add(var item) {
    if (item is String) {
      addPrint(item);
    } else if (item is Function) {
      addFunc(item);
    } else {
      throw new Exception("Wrong type of item appended.");
    }
    // printCurrentStack();
  }

  void addFunc(Function f) {
    instructions.insertRange(
        running ? index + 1 : instructions.length,
        1,
        new FuncInstruction(f)
    );
    // print("> Adding a new function instruction.");
  }

  void addPrint(String msg) {
    instructions.insertRange(
        running ? index + 1 : instructions.length,
        1,
        new PrintInstruction(msg)
    );
    // print("> Adding a new print instruction. Running = $running. Index = $index.");
  }
  
  bool runNext() {
    if (index == null) {
      running = true;  // when running, we're inserting instructions just after the current index, else we're inserting at the end of the stack
      index = 0;
    }

    if (index < instructions.length) {
      instructions[index].run();
      index++;
      return index < instructions.length;
    } else {
      return false;
    }
  }
}

class Player {
  Map<String,int> items;

  Player() {
    items = new Map<String,int>();
  }

  void addItem(String name) {
    if (items[name] == null)
      items[name] = 1;
    else
      items[name]++;
  }

  bool has(String name) {
    return items[name] != null;
  }
}

void main() {
  print("Starting.");

  Player player = new Player();

  Page page = new Page();
  page.player = player;

  page.add("You enter the small house.");
  page.add("You are looking around.");
  page.add("You found a key.");
  // print("> player has small key? -> ${player.has('small key')}");
  page.add(function () {
    player.addItem("small key");
  });
  // print("> player has small key? -> ${player.has('small key')}");
  page.add("You picked up the key.");
  page.add("... some time has elapsed...");
  page.add("You are standing before a small house with a small door.");
  page.add(() {
    if (player.has('small key')) {
      page.add("You remember you have that key!");
    } else {
      page.add("Unfortunately, you don't seem to have a key that fits.");
    }
  });
  page.add("You stand before that house. What do you do?");
  //page.addIf(
  //  () => player.has("small key"),


  while (page.runNext()) {
    print("> next");
  }
}
