import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:path/path.dart' as path;
import 'package:test/test.dart';

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
        var logPath = createLogFilePath(tempDir, i, 'walk_with_warning');
        LineBuffer logSink;
        try {
          logSink =
              new LineBuffer(logPath, ["[WARNING]", "[SEVERE]", "[SHOUT]"]);
          await logSink.open();
          print("Running warning-aware test $i.");
          await run(true, true, logSink);
          if (logSink.watchPatternTriggered) {
            fail("Warning-aware playthrough $i had a severe error. "
                "Log file: ${logPath}");
          }
        } finally {
          await logSink?.close();
        }
      }
    }, timeout: new Timeout.factor(10), tags: ["strict", "long-running"]);

    test("edgehead runs to completion 20 times", () async {
      for (int i = 0; i < 20; i++) {
        var logPath = createLogFilePath(tempDir, i, 'walk');
        LineBuffer logSink;
        try {
          logSink = new LineBuffer(logPath, ["[SEVERE]", "[SHOUT]"]);
          await logSink.open();
          print("Running error-aware test $i.");
          await run(true, true, logSink);
          if (logSink.watchPatternTriggered) {
            fail("Playthrough $i had a severe error. Log file: ${logPath}");
          }
        } finally {
          await logSink?.close();
        }
      }
    }, timeout: new Timeout.factor(20), tags: ["long-running"]);
  });
}

String createLogFilePath(Directory tempDir, int i, String description) =>
    path.absolute(path.join(
        tempDir.path, "${description}_${i.toString().padLeft(3, '0')}.log"));

/// This helper class acts as logger output which forwards everything to a file
/// but also watches for patterns in the output.
class LineBuffer implements ClosableStringSink {
  final List<Pattern> _watchPatterns;

  RandomAccessFile _pipe;

  bool _watchPatternTriggered = false;

  final String path;

  LineBuffer(this.path, List<Pattern> watchPatterns)
      : _watchPatterns = watchPatterns;

  Future<Null> open() async {
    _pipe = await new File(path).open(mode: FileMode.WRITE);
  }

  bool get watchPatternTriggered => _watchPatternTriggered;

  @override
  Future<Null> close() async {
    await _pipe?.close();
  }

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
    assert(_pipe != null);
    var line = obj.toString();
    _pipe?.writeStringSync(line);
    _pipe?.writeStringSync('\n');
    if (!_watchPatternTriggered &&
        _watchPatterns.any((p) => line.contains(p))) {
      _watchPatternTriggered = true;
    }
  }
}
