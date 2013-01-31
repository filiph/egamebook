import 'dart:isolate';
import '../../lib/src/runner.dart';

import '../../lib/src/interface/interface.dart';

import '../../lib/src/interface/interface_cmdline.dart';

import '../../lib/src/persistence/storage.dart';

import '../../lib/src/persistence/player_profile.dart';


// this will be rewritten with the actual file
import '/Users/filiph/Programs/egamebook/dart/books/test/test.dart';


void main() {
  // create [ReceivePort] for this isolate
  ReceivePort receivePort = new ReceivePort();
  // create the isolate
  SendPort scripterPort = spawnFunction(createScripter);
  // create the interface
  EgbInterface interface = new CmdlineInterface();
  // open storage
  EgbStorage storage = new MemoryStorage(); // TODO: other storage?
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
