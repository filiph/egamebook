import 'package:test/test.dart';

import '../bin/play.dart';

void main() {
  test("edgehead runs to completion", () async {
    await run(true, true);
  });

  test("edgehead runs to completion 10 times without warnings", () async {
    for (int i = 0; i < 10; i++) {
      var buf = await run(true, true);
      // TODO LOGs!
      expect(buf.toString(), isNot(contains("WARNING")));
    }
  }, timeout: new Timeout.factor(100), tags: ["strict", "long-running"]);

  test("edgehead runs to completion 100 times", () async {
    for (int i = 0; i < 100; i++) {
      await run(true, true);
    }
  }, timeout: new Timeout.factor(100), tags: ["long-running"]);
}
