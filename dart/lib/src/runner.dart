library egb_runner;

/**
 * Helper class that initializes the most common setups for an egamebook 
 * session. This mostly involves creating an Isolate (if needed), linking
 * the interface to it, and telling the interface to continue a saved game
 * or create a new one.
 */

import 'dart:async';
import 'package:egamebook/src/interface/interface.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/src/book/scripter_proxy.dart';

/**
 * Does the required work to start an Isolate wrapped in an
 * [EgbIsolateScripterProxy], set it up, tie it with the provided [interface],
 * and try to load a saved game or create a new one.
 */
Future<EgbInterface> runFromIsolate(String dartFilename, EgbInterface
    interface, EgbStorage storage) {
  interface.setPlayerProfile(storage.getDefaultPlayerProfile());
  EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(Uri.parse(
      dartFilename));

  return init(bookProxy, interface).then((_) {
    interface.setup();
    interface.continueSavedGameOrCreateNew();
  });
}

Future<EgbInterface> runDirectly(EgbScripterProxy bookProxy, EgbInterface
    interface, EgbStorage storage) {
  interface.setPlayerProfile(storage.getDefaultPlayerProfile());
  return init(bookProxy, interface).then((_) {
      interface.setup();
      interface.continueSavedGameOrCreateNew();
  });
}

/**
 * Initializes the [EgbScripter], and ties [EgbInterface] with it.
 */
Future<EgbInterface> init(EgbScripterProxy bookProxy, EgbInterface interface) {
  return bookProxy.init().then((_) {
    interface.setScripter(bookProxy);
    bookProxy.setInterface(interface);

    return interface;
  });
}
