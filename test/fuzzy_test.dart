import 'dart:collection';
import 'dart:io';
import 'package:test/test.dart';
import 'package:path/path.dart' as path;

import '../bin/play.dart';

void main() {
  test("edgehead runs to completion", () async {
    await run(true, true, null);
  });

  group("logged", () {
    Directory tempDir;

    setUp(() async {
      tempDir = await Directory.systemTemp.createTemp("edgehead_fuzzy_test");
    });

    test("edgehead runs to completion 10 times without warnings", () async {
      for (int i = 0; i < 10; i++) {
        var logPath = createLogFilePath(tempDir, i);
        var logSink = new LineBuffer();
        await run(true, true, logSink);
        if (logSink.contains("[WARNING]") ||
            logSink.contains("[SEVERE]") ||
            logSink.contains("[SHOUT]")) {
          await new File(logPath).writeAsString(logSink.toString());
          fail("Warning-aware playthrough $i had a severe error. "
              "Log file: ${logPath}");
        }
      }
    }, timeout: new Timeout.factor(10), tags: ["strict", "long-running"]);

    test("edgehead runs to completion 50 times", () async {
      for (int i = 0; i < 50; i++) {
        var logPath = createLogFilePath(tempDir, i);
        var logSink = new LineBuffer();
        await run(true, true, logSink);
        if (logSink.contains("[SEVERE]") || logSink.contains("[SHOUT]")) {
          await new File(logPath).writeAsString(logSink.toString());
          fail("Playthrough $i had a severe error. Log file: ${logPath}");
        }
      }
      // await dir.delete();
    }, timeout: new Timeout.factor(50), tags: ["long-running"]);
  });
}

class LineBuffer implements StringSink {
  final _lines = new Queue<String>();

  @override
  void write(Object obj) {
    throw new UnimplementedError("LineBuffer only allows full lines "
        "to be added");
  }

  @override
  void writeAll(Iterable objects, [String separator = ""]) {
    throw new UnimplementedError("LineBuffer only allows full lines "
        "to be added");
  }

  @override
  void writeCharCode(int charCode) {
    throw new UnimplementedError("LineBuffer only allows full lines "
        "to be added");
  }

  @override
  void writeln([Object obj = ""]) {
    _lines.addLast(obj.toString());
  }

  bool contains(Pattern pattern) {
    for (var line in _lines) {
      if (line.contains(pattern)) return true;
    }
    return false;
  }

  String toString() => _lines.join('\n');
}

String createLogFilePath(Directory tempDir, int i) => path.absolute(path.join(
    tempDir.path, "walk_with_warning_${i.toString().padLeft(3, '0')}.log"));
