library egb_runner;

/**
 * Helper class that initializes the most common setups for an egamebook
 * session. This mostly involves creating an Isolate (if needed), linking
 * the presenter to it, and telling the presenter to continue a saved game
 * or create a new one.
 */

import 'dart:async';
import 'package:egamebook/interface.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/src/book/scripter_proxy.dart';

/**
 * Does the required work to start an Isolate wrapped in an
 * [EgbIsolateScripterProxy], set it up, tie it with the provided [presenter],
 * and try to load a saved game or create a new one.
 */
Future<EgbPresenter> runFromIsolate(String dartFilename, EgbPresenter
    presenter, EgbStorage storage) {
  presenter.setPlayerProfile(storage.getDefaultPlayerProfile());
  EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(Uri.parse(
      dartFilename));

  return init(bookProxy, presenter).then((_) {
    presenter.setup();
    presenter.continueSavedGameOrCreateNew();
  });
}

Future<EgbPresenter> runDirectly(EgbScripterProxy bookProxy, EgbPresenter
    presenter, EgbStorage storage) {
  presenter.setPlayerProfile(storage.getDefaultPlayerProfile());
  return init(bookProxy, presenter).then((_) {
    presenter.setup();
    presenter.continueSavedGameOrCreateNew();
  });
}

/**
 * Initializes the [EgbScripter], and ties [EgbPresenter] with it.
 */
Future<EgbPresenter> init(EgbScripterProxy bookProxy, EgbPresenter presenter) {
  return bookProxy.init().then((_) {
    presenter.setScripter(bookProxy);
    bookProxy.setPresenter(presenter);

    return presenter;
  });
}
