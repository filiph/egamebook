import 'dart:isolate';
import 'runner.dart';
import 'interface/interface.dart';
import 'interface/interface_html.dart';
import 'persistence/storage.dart';
import 'persistence/player_profile.dart';

// this will be rewritten with the actual file
import 'book/reference_scripter_impl.dart';

void main() {
  // create the interface
  EgbInterface interface = new HtmlInterface();
  // open storage
  EgbStorage storage = new LocalStorage();
  // get player profile
  EgbPlayerProfile playerProfile = storage.getDefaultPlayerProfile();
  // create [ReceivePort] for this isolate
  ReceivePort receivePort = new ReceivePort();
  // create the isolate // https://plus.google.com/+dartlang/posts/NF6AJ3oPYuk
  Isolate.spawn(createScripter, receivePort.sendPort)
  .then((Isolate isolate) {
    // Wait for the first reply from the Scripter.
    return receivePort.first;
  })
  .then((SendPort scripterPort) {
    // Create the [Runner] which ties everything together.
    var runner = new EgbRunner(receivePort, scripterPort, 
        interface, playerProfile);
    runner.run();
  });
}

/**
  Top-level function which spawns the isolate containing the Scripter 
  instance (i.e. the actual egamebook).
  */
void createScripter(SendPort mainIsolatePort) {
  new ScripterImpl(mainIsolatePort);
}