library html_main_entry_point;

/// This is the basis of [:example.html.dart:]. It is the entry point of
/// the egamebook app as implemented through [HtmlPresenter]. It's a template,
/// to be rewritten by [Builder].
const String HTML_ENTRY_POINT_DART_FILE = r"""
import 'dart:async';

import 'package:egamebook/presenters/html/html_presenter.dart';
import 'package:egamebook/runner.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:logging/logging.dart';

/// This is the entry point of the egamebook app as implemented through
/// [HtmlPresenter].

Future<Null> main() async {
  Logger.root.level = Level.ALL;
  Logger.root.onRecord.listen((LogRecord rec) {
    print('${rec.level.name} (${rec.loggerName}): ${rec.time}: ${rec.message}');
  });

  // create the presenter
  Presenter presenter = new HtmlPresenter();
  // open store
  Store store = new LocalStorageStore();
  // run
  await runFromIsolate("[[NAME]].isolate.dart", presenter, store);
}
""";

/// This is the file that starts the isolate. It needs to live in the web/
/// directory (so that it's compiled to JavaScript).
const String HTML_ENTRY_POINT_ISOLATE = r"""
import 'dart:isolate';

import 'package:[[NAME]]/[[NAME]].dart';
import 'package:egamebook/scripter.dart';

// The entry point of the isolate.
void main(List<String> args, SendPort mainIsolatePort) {
  PresenterProxy presenter = new IsolatePresenterProxy(mainIsolatePort);
  Scripter book = new ScripterImpl();
  presenter.setScripter(book);
}
""";

/// Entrypoint path.
const String HTML_BOOK_ENTRYPOINT_PATH = "web/";

/// The path that leads from the entrypoint file (in `web/`) to the main
/// book files (in `lib/`). This could be different for different kinds of
/// Presenter.
const String HTML_BOOK_DART_PATH_FROM_ENTRYPOINT = "../lib/";
