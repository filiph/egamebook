
class ScriptBlock extends Isolate {

  // TODO: find out why we can't send closure function through Ctor
  ScriptBlock() {
    print("BL: Scriptblock has been created.");
  }

  void main() {
    port.receive(callback);
  }

  // TODO: in the future, we can send function by message, but that's not implemented yet
  void callback(var message, SendPort replyTo) {
    print("BL: Received $message.");
    port.close();

    script();

    replyTo.send("Thanks and bye.");
  }

  void script() {
  }
}

// these are the scripts
class ScriptBlockA1 extends ScriptBlock {
  void script() {
    print("Overridden script.");
  }
}


class VirtualMachine {
  ReceivePort _receivePort;

  VirtualMachine() {
    print("VM: VirtualMachine starting.");

    _receivePort = new ReceivePort();
    _receivePort.receive(receiveFromScriptBlock);
    ScriptBlock testScript = new ScriptBlockA1();
    testScript.spawn().then((SendPort port) {
      print("VM: ScriptBlock is now ready! Sending message.");
      port.send("Hello from VM!", _receivePort);
    });
  }

  void receiveFromScriptBlock(var message, SendPort replyTo) {
    print("VM: And we're back from a ScriptBlock.");
    _receivePort.close();
  }

}

void main() {
  VirtualMachine vm = new VirtualMachine();

}
