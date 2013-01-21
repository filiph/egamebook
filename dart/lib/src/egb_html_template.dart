import 'dart:isolate';
import 'egb_runner.dart';
import 'egb_interface.dart';
import 'egb_interface_html.dart';
import 'egb_storage.dart';
import 'egb_player_profile.dart';

// this will be rewritten with the actual file
import 'reference_scripter_impl.dart';

void main() {
  // create [ReceivePort] for this isolate
  ReceivePort receivePort = new ReceivePort();
  // create the isolate
  SendPort scripterPort = spawnFunction(createScripter);
  // create the interface
  EgbInterface interface = new HtmlInterface();
  // open storage
  EgbStorage storage = new MemoryStorage(); // TODO: localStorage?
  // get player profile
  EgbPlayerProfile playerProfile = storage.getDefaultPlayerProfile();
  
  var runner = new EgbRunner(receivePort, scripterPort, 
      interface, playerProfile);
  interface.userQuit.then((_) => runner.stop());
  runner.run();
}

/**
  Top-level function which spawns the isolate containing the Scripter 
  instance (i.e. the actual egamebook).
  */
void createScripter() {
  new ScripterImpl();
}