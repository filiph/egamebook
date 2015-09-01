library html_main_entry_point;

/// This is the basis of [:example.html.dart:]. It is the entry point of
/// the egamebook app as implemented through [HtmlPresenter]. It's a template,
/// to be rewritten by [EgbBuilder].
const String HTML_ENTRY_POINT_DART_FILE = """
import 'package:egamebook/runner.dart';
import 'package:egamebook/presenters/html/html_presenter.dart';
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
""";