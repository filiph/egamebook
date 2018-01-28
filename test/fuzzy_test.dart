import 'dart:async';
import 'dart:io';

import 'package:edgehead/edgehead_lib.dart';
import 'package:logging/logging.dart';
import 'package:path/path.dart' as path;
import 'package:test/test.dart';

import '../bin/default_savegames.dart';
import '../bin/play.dart';

void main() {
  test("edgehead runs to completion", () async {
    final runner = new CliRunner(true, true, null);
    await runner.initialize(new EdgeheadGame());
    runner.startBook();
    await runner.bookEnd;
    runner.close();
  });

  group("logged", () {
    Directory tempDir;

    setUp(() async {
      tempDir = await Directory.systemTemp.createTemp("edgehead_fuzzy_test");
    });

    test("edgehead runs to completion 10 times from slaveQuarters", () async {
      final stopWords = ["[SEVERE]", "[SHOUT]"];
      await testWithStopWords(stopWords, tempDir, Level.WARNING, 10,
          savegame: "slaveQuarters");
    }, timeout: new Timeout.factor(10), tags: ["long-running"]);

    test("edgehead runs to completion 10 times without warnings", () async {
      final stopWords = ["[WARNING]", "[SEVERE]", "[SHOUT]"];
      await testWithStopWords(stopWords, tempDir, Level.INFO, 10);
    }, timeout: new Timeout.factor(10), tags: ["strict", "long-running"]);

    test("edgehead runs to completion 10 times from beginning", () async {
      final stopWords = ["[SEVERE]", "[SHOUT]"];
      await testWithStopWords(stopWords, tempDir, Level.WARNING, 10);
    }, timeout: new Timeout.factor(10), tags: ["long-running"]);
  });
}

String createLogFilePath(Directory tempDir, int i, String description) =>
    path.absolute(path.join(
        tempDir.path, "${description}_${i.toString().padLeft(3, '0')}.log"));

Future<Null> testWithStopWords(
    List<String> stopWords, Directory tempDir, Level logLevel, int iterations,
    {String savegame}) async {
  final identifier =
      stopWords.join("_").replaceAll("[", "").replaceAll("]", "").toLowerCase();
  for (int i = 0; i < iterations; i++) {
    var logPath = createLogFilePath(tempDir, i, identifier);
    var logFile = new File(logPath);
    var saveComment = savegame == null ? '' : " (from savegame '$savegame')";
    print("Running $identifier-aware test #${i + 1}$saveComment.");
    // Make sure the file exists even when there are no errors.
    logFile.writeAsStringSync("");
    final runner = new CliRunner(true, true, logFile, logLevel: logLevel);
    await runner.initialize(new EdgeheadGame(
      saveGameSerialized: savegame == null ? null : defaultSavegames[savegame],
    ));
    runner.startBook();
    await runner.bookEnd;
    runner.close();
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
