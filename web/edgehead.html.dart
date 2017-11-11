import 'dart:async';
import 'dart:html';

import 'package:egamebook/presenters/html/html_presenter.dart';
import 'package:egamebook/runner.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:gtag_analytics/gtag_analytics.dart';
import 'package:logging/logging.dart';

/// This is the entry point of the egamebook app as implemented through
/// [HtmlPresenter].
Future<Null> main() async {
  // Track conversions.
  final inProduction =
      const String.fromEnvironment("production") == "true";
  final ga = new GoogleAnalytics(failSilently: inProduction);
  FormElement signUpForm = querySelector("#mc-embedded-subscribe-form");
  signUpForm.onSubmit.listen((_) {
    ga.sendSignUp(method: "email");
  });
  ElementList<AnchorElement> externalLinks =
  querySelectorAll("a[target=_blank]");
  for (final link in externalLinks) {
    link.onClick.listen((_) {
      ga.sendCustom("follow_external_link", label: link.href);
    });
  }

  // Set up logging.
  final devHostnames = [
    "localhost",
    "127.0.0.1",
    "filiph.github.io",
  ];
  final dev = devHostnames.contains(window.location.hostname);

  Logger.root.level = dev ? Level.ALL : Level.WARNING;
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
