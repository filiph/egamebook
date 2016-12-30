import 'dart:io';
import 'package:test/test.dart';
import 'package:path/path.dart' as path;

import '../bin/play.dart';

void main() {
  test("edgehead runs to completion", () async {
    await run(true, true, null);
  });

  test("edgehead runs to completion 10 times without warnings", () async {
    for (int i = 0; i < 10; i++) {
      var logSink = new StringBuffer();
      await run(true, true, logSink);
      expect(logSink.toString(), isNot(contains("[WARNING]")));
      expect(logSink.toString(), isNot(contains("[SEVERE]")));
      expect(logSink.toString(), isNot(contains("[SHOUT]")));
    }
  }, timeout: new Timeout.factor(10), tags: ["strict", "long-running"]);

  test("edgehead runs to completion 100 times", () async {
    var dir = await Directory.systemTemp.createTemp("edgehead_fuzzy_test");
    print("Putting logs into ${dir.path}");
    for (int i = 0; i < 100; i++) {
      var logPath =
          path.join(dir.path, "walk_${i.toString().padLeft(5, '0')}.log");
      IOSink logSink;
      try {
        var logSink = new StringBuffer();
        await run(true, true, logSink);
        var log = logSink.toString();
        expect(log, isNot(contains("[SEVERE]")));
        expect(log, isNot(contains("[SHOUT]")));
        await new File(logPath).writeAsString(log);
      } finally {
        logSink?.close();
      }
    }
    // await dir.delete();
  }, timeout: new Timeout.factor(100), tags: ["long-running"]);
}
