import 'package:egamebook/runner.dart';
import 'package:egamebook/presenters/html/html_presenter.dart';
import 'package:egamebook/src/persistence/storage.dart';

/* #if RELEASE *//*
import 'package:edgehead/edgehead.dart' deferred as book;
*//* #else */
import 'package:edgehead/edgehead.dart' as book;
/* #endif */

/// This is the entry point of the egamebook app as implemented through
/// [HtmlPresenter]. It's a template, to be rewritten by [Builder].

main() async {
  // create the presenter
  Presenter presenter = new HtmlPresenter();
  // open store
  Store store = new LocalStorageStore();
  // set player profile
  presenter.setPlayerProfile(store.getDefaultPlayerProfile());
  // run
  /* #if RELEASE *//*
  var _ = await book.loadLibrary();
  *//* #endif */
  run(new book.ScripterImpl(), presenter, store);
}

