import 'package:egamebook/runner.dart';
import 'package:egamebook/interfaces/html/html_interface.dart';
import 'package:egamebook/src/persistence/storage.dart';

/// This is the entry point of the egamebook app as implemented through
/// [HtmlPresenter]. It's a template, to be rewritten by [EgbBuilder].

void main() {
  // This will be rewritten with the actual file.
  var scripterPath = '[[PathToEgbScripterImplementation]]';

  // create the presenter
  EgbPresenter presenter = new HtmlPresenter();
  // open storage
  EgbStorage storage = new LocalStorage();
  // set player profile
  presenter.setPlayerProfile(storage.getDefaultPlayerProfile());
  // run
  runFromIsolate(scripterPath, presenter, storage);
}