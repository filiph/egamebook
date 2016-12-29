import 'package:test/test.dart';

import '../bin/play.dart';

void main() {
  test("edgehead runs to completion", () async {
    var count = 3;
    for (int i = 0; i < count; i++) {
      await run(true);
    }
  });
}