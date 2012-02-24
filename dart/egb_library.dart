#library('egb');

class Instruction {
}

class PrintInstruction extends Instruction {
  String msg;

  PrintInstruction(this.msg) {
  }
}

class ScriptInstruction extends Instruction {
}

class Message {
  final int type;
  var content;

  static final int MSG_QUIT = 0;
  static final int MSG_CONTINUE = 1;  // 0b0001
  static final int MSG_RESULT = 2;  // 0b0010
  static final int MSG_TEXT_RESULT = 4;  // 0b0100
  static final int MSG_INPUT_NEEDED = 8;

  Message(this.type) {
  }

  Message.Quit() : type = MSG_QUIT {}

  Message.Continue() : type = MSG_CONTINUE {}

  Message.TextResult(String str) : type = MSG_TEXT_RESULT {
    content = str;
  }
}


class Scripter extends Isolate {
  List<Instruction> instructions;
  int current = 0;  // the current position in the instruction set

  Scripter() : super() {
    print("Scripter has been created.");
  }

  void main() {
    port.receive(callback);
  }

  void callback(var message, SendPort replyTo) {
    print("SCR: Received message from interface: ${message.type}.");
    if (message.type == Message.MSG_QUIT) {
      print("Closing port and quiting.");
      port.close();
    } else if (instructions == null || current >= instructions.length) {
      print("No more instruction. Closing scripter.");
      replyTo.send(new Message.Quit(), port);
      port.close();
    } else if (message.type == Message.MSG_CONTINUE) {
      print("Continuing with the story.");
      // .. get data
      if (instructions[current] is PrintInstruction) {
        replyTo.send(
          new Message.TextResult(instructions[current].msg), 
          port
        );
      } else {
        // TODO: make ScriptInstruction work
        replyTo.send(
          new Message.Continue(), 
          port
        );
      }
      current++;  // TODO: solve for scripts that say what to do next
    }
  }
}

