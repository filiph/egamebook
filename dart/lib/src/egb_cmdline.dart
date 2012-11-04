import 'dart:isolate';
import 'egb_library.dart';
import 'egb_runner.dart';
import 'egb_interface.dart';
import 'egb_interface_cmdline.dart';

// this will be rewritten with the actual file
import 'reference_scripter_impl.dart';

void main() {
  // create [ReceivePort] for this isolate
  ReceivePort receivePort = new ReceivePort();
  // create the isolate
  SendPort scripterPort = spawnFunction(createScripter);
  // create the interface
  EgbInterface interface = new CmdlineInterface();
  
  new EgbRunner(receivePort, scripterPort, interface).run();
}

/**
  Top-level function which spawns the isolate containing the Scripter 
  instance (i.e. the actual egamebook).
  */
void createScripter() {
  new ScripterImpl();
}