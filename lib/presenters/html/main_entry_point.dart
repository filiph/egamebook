library html_main_entry_point;

/// This is the basis of [:example.html.dart:]. It is the entry point of
/// the egamebook app as implemented through [HtmlPresenter]. It's a template,
/// to be rewritten by [Builder].
const String HTML_ENTRY_POINT_DART_FILE = """
import 'package:egamebook/runner.dart';
import 'package:egamebook/presenters/html/html_presenter.dart';
import 'package:egamebook/src/persistence/storage.dart';

/* #if RELEASE *//*
import 'package:[[NAME]]/[[NAME]].dart' deferred as book;
*//* #else */
import 'package:[[NAME]]/[[NAME]].dart' as book;
/* #endif */

/// This is the entry point of the egamebook app as implemented through
/// [HtmlPresenter]. It's a template, to be rewritten by [Builder].

main() async {
  // create the presenter
  Presenter presenter = new HtmlPresenter();
  // open storage
  Storage storage = new LocalStorage();
  // set player profile
  presenter.setPlayerProfile(storage.getDefaultPlayerProfile());
  // run
  /* #if RELEASE *//*
  var _ = await book.loadLibrary();
  *//* #endif */
  run(new book.ScripterImpl(), presenter, storage);
}
""";

/// Entrypoint path.
const String HTML_BOOK_ENTRYPOINT_PATH = "web/";

/// The path that leads from the entrypoint file (in `web/`) to the main
/// book files (in `lib/`). This could be different for different kinds of
/// Presenter.
const String HTML_BOOK_DART_PATH_FROM_ENTRYPOINT = "../lib/";
