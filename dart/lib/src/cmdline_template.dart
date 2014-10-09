import 'dart:isolate';
import '../runner.dart';
import 'interface/interface.dart';
import 'interface/interface_cmdline.dart';
import 'persistence/storage.dart';
import 'persistence/player_profile.dart';


void main() {
  // this will be rewritten with the actual file
  var scripterPath = 'book/reference_scripter_impl.dart';
  
  // create the interface
  EgbInterface interface = new CmdlineInterface();
  // open storage
  EgbStorage storage = new MemoryStorage(); // TODO: other storage?
  // get player profile
  EgbPlayerProfile playerProfile = storage.getDefaultPlayerProfile();
  // create [ReceivePort] for this isolate
  ReceivePort receivePort = new ReceivePort();
  // create the isolate // https://plus.google.com/+dartlang/posts/NF6AJ3oPYuk
  Isolate.spawnUri(Uri.parse(scripterPath), [], receivePort.sendPort)
  .then((Isolate isolate) {
    // Create the [Runner] which ties everything together.
    var runner = new EgbRunner(receivePort, interface, playerProfile);
    runner.run();
  });
}