import 'dart:isolate';

import 'package:edgehead/edgehead.dart';
import 'package:egamebook/scripter.dart';

// The entry point of the isolate.
void main(List<String> args, SendPort mainIsolatePort) {
  PresenterProxy presenter = new IsolatePresenterProxy(mainIsolatePort);
  Scripter book = new ScripterImpl();
  presenter.setScripter(book);
}

