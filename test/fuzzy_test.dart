import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:logging/logging.dart';
import 'package:path/path.dart' as path;
import 'package:test/test.dart';

import '../bin/play.dart';

void main() {
  test("edgehead runs to completion", () async {
    final runner = new CliRunner(true, true, null);
    await runner.play();
  });

  group("logged", () {
    Directory tempDir;

    setUp(() async {
      tempDir = await Directory.systemTemp.createTemp("edgehead_fuzzy_test");
    });

    test("edgehead runs to completion 10 times without warnings", () async {
      final stopWords = ["[WARNING]", "[SEVERE]", "[SHOUT]"];
      await testWithStopWords(stopWords, tempDir, Level.INFO, 10);
    }, timeout: new Timeout.factor(10), tags: ["strict", "long-running"]);

    test("edgehead runs to completion 20 times", () async {
      final stopWords = ["[SEVERE]", "[SHOUT]"];
      await testWithStopWords(stopWords, tempDir, Level.WARNING, 20);
    }, timeout: new Timeout.factor(20), tags: ["long-running"]);
  });
}

String createLogFilePath(Directory tempDir, int i, String description) =>
    path.absolute(path.join(
        tempDir.path, "${description}_${i.toString().padLeft(3, '0')}.log"));

Future<Null> testWithStopWords(List<String> stopWords, Directory tempDir,
    Level logLevel, int iterations) async {
  final identifier =
      stopWords.join("_").replaceAll("[", "").replaceAll("]", "").toLowerCase();
  for (int i = 0; i < iterations; i++) {
    var logPath = createLogFilePath(tempDir, i, identifier);
    var logFile = new File(logPath);
    print("Running $identifier-aware test #${i + 1}.");
    // Make sure the file exists even when there are no errors.
    logFile.writeAsStringSync("");
    final runner = new CliRunner(true, true, logFile, logLevel: logLevel);
    await runner.play();
    for (final line in logFile.readAsLinesSync()) {
      for (final word in stopWords) {
        if (line.contains(word)) {
          fail("Warning-aware playthrough $i had a severe error. "
              "Log file: $logPath\n"
              "Error: $line");
        }
      }
    }
  }
}
