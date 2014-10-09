import 'package:egamebook/runner.dart';
import 'package:egamebook/default_interface/interface_html.dart';
import 'package:egamebook/src/persistence/storage.dart';

void main() {
  // this will be rewritten with the actual file
  var scripterPath = 'book/reference_scripter_impl.dart';
  
  // create the interface
  EgbInterface interface = new HtmlInterface();
  // open storage
  EgbStorage storage = new LocalStorage();
  // set player profile
  interface.setPlayerProfile(storage.getDefaultPlayerProfile());
  // run
  runFromIsolate(scripterPath, interface, storage);
}