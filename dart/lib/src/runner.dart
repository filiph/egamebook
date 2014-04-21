library egb_runner;

import 'dart:async';
import 'package:egamebook/src/interface/interface.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/src/book/scripter_proxy.dart';

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
