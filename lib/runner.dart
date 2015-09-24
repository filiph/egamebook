library egb_runner;

/**
 * Helper class that initializes the most common setups for an egamebook
 * session. This mostly involves creating an Isolate (if needed), linking
 * the presenter to it, and telling the presenter to continue a saved game
 * or create a new one.
 */

import 'dart:async';
import 'package:egamebook/presenter.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/src/book/scripter_proxy.dart';
import 'package:egamebook/scripter.dart';

/**
 * Does the required work to start an Isolate wrapped in an
 * [IsolateScripterProxy], set it up, tie it with the provided [presenter],
 * and try to load a saved game or create a new one.
 */
Future<Presenter> runFromIsolate(String dartFilename, Presenter
    presenter, Storage storage) {
  presenter.setPlayerProfile(storage.getDefaultPlayerProfile());
  ScripterProxy bookProxy = new IsolateScripterProxy(Uri.parse(
      dartFilename));

  return init(bookProxy, presenter).then((_) {
    presenter.setup();
    presenter.continueSavedGameOrCreateNew();
  });
}

/**
 * Does the required work to run it directly, set it up, tie it with the
 * provided [presenter], and try to load a saved game or create a new one.
 */
Future<Presenter> runDirectly(ScripterProxy bookProxy, Presenter
    presenter, Storage storage) {
  presenter.setPlayerProfile(storage.getDefaultPlayerProfile());
  return init(bookProxy, presenter).then((_) {
    presenter.setup();
    presenter.continueSavedGameOrCreateNew();
  });
}

Future<Presenter> run(Scripter scripter, Presenter presenter,
    Storage storage) {
  presenter.setPlayerProfile(storage.getDefaultPlayerProfile());
  presenter.setScripter(scripter);
  presenter.setup();
  presenter.continueSavedGameOrCreateNew();
  return new Future.value(presenter);
}

/**
 * Initializes the [Scripter], and ties [Presenter] with it.
 */
Future<Presenter> init(ScripterProxy bookProxy, Presenter presenter) {
  return bookProxy.init().then((_) {
    presenter.setScripter(bookProxy);
    bookProxy.setPresenter(presenter);

    return presenter;
  });
}
