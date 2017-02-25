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
  await runFromIsolate("edgehead.isolate.dart", presenter, store);
}

