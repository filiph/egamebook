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
Future<Presenter> runFromIsolate(
    String dartFilename, Presenter presenter, Store store) async {
  presenter.setPlayerProfile(store.getDefaultPlayerProfile());
  ScripterProxy bookProxy = new IsolateScripterProxy(Uri.parse(dartFilename));

  await bookProxy.init();
  presenter.setScripter(bookProxy);
  bookProxy.setPresenter(presenter);
  presenter.setup();
  await presenter.continueSavedGameOrCreateNew();
  return presenter;
}

/// Runs the scripter and the presenter via proxy, but without separation by
/// isolate.
Future<Presenter> runDirectly(
    ScripterProxy bookProxy, Presenter presenter, Store store) async {
  presenter.setPlayerProfile(store.getDefaultPlayerProfile());
  await bookProxy.init();
  presenter.setScripter(bookProxy);
  bookProxy.setPresenter(presenter);
  presenter.setup();
  await presenter.continueSavedGameOrCreateNew();
  return presenter;
}

/// Runs the scripter and the presenter without any proxies.
Future<Presenter> run(Scripter scripter, Presenter presenter, Store store) {
  presenter.setPlayerProfile(store.getDefaultPlayerProfile());
  presenter.setScripter(scripter);
  scripter.setPresenter(presenter);
  presenter.setup();
  presenter.continueSavedGameOrCreateNew();
  return new Future.value(presenter);
}

