import 'dart:isolate';
import 'runner.dart';
import 'interface/interface.dart';
import 'interface/interface_html.dart';
import 'persistence/storage.dart';
import 'persistence/player_profile.dart';

// this will be rewritten with the actual file
import 'book/reference_scripter_impl.dart';

void main() {
  // create [ReceivePort] for this isolate
  ReceivePort receivePort = new ReceivePort();
  // create the isolate
  SendPort scripterPort = spawnFunction(createScripter);
  // create the interface
  EgbInterface interface = new HtmlInterface();
  // open storage
  EgbStorage storage = new LocalStorage();
  // get player profile
  EgbPlayerProfile playerProfile = storage.getDefaultPlayerProfile();
  
  var runner = new EgbRunner(receivePort, scripterPort, 
      interface, playerProfile);
  runner.run();
}

/**
  Top-level function which spawns the isolate containing the Scripter 
  instance (i.e. the actual egamebook).
  */
void createScripter() {
  new ScripterImpl();
}