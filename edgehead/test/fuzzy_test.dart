import 'dart:async';
import 'dart:io';

import 'dart:math';
import 'package:edgehead/edgehead_lib.dart';
import 'package:logging/logging.dart';
import 'package:path/path.dart' as path;
import 'package:test/test.dart';

import '../bin/default_savegames.dart';
import '../bin/play.dart';

void main() {
  test("edgehead runs to completion", () async {
    final runner = CliRunner(true, true, null);
    await runner.initialize(EdgeheadGame());
    runner.startBook();
    await runner.bookEnd;
    runner.close();
  }, tags: ["long-running"]);

  test("2 run-throughs with same seed end up with the same state", () async {
    final seed = Random().nextInt(0xffffff);

    Future<String> runAndGetFinalWorld(int seed) async {
      final runner = CliRunner(true, true, null, random: Random(seed));
      await runner.initialize(EdgeheadGame(randomSeed: seed));
      runner.startBook();
      await runner.bookEnd;
      runner.close();
      return runner.latestSaveGame;
    }

    final first = await runAndGetFinalWorld(seed);
    final second = await runAndGetFinalWorld(seed);

    expect(first, second);
  }, tags: ["long-running"]);

  group("logged", () {
    Directory tempDir;

    setUp(() async {
      tempDir = await Directory.systemTemp.createTemp("edgehead_fuzzy_test");
    });

    test("edgehead runs to completion 10 times from slaveQuarters", () async {
      final stopWords = ["[SEVERE]", "[SHOUT]"];
      await testWithStopWords(stopWords, tempDir, Level.WARNING, 10,
          savegame: "slaveQuarters");
    }, timeout: const Timeout.factor(10), tags: ["long-running"]);

    test("edgehead runs to completion 10 times without warnings", () async {
      final stopWords = ["[WARNING]", "[SEVERE]", "[SHOUT]"];
      await testWithStopWords(stopWords, tempDir, Level.INFO, 10);
    }, timeout: const Timeout.factor(10), tags: ["strict", "long-running"]);

    test("edgehead runs to completion 10 times from beginning", () async {
      final stopWords = ["[SEVERE]", "[SHOUT]"];
      await testWithStopWords(stopWords, tempDir, Level.WARNING, 10);
    }, timeout: const Timeout.factor(10), tags: ["long-running"]);
  });
}

String createLogFilePath(Directory tempDir, int i, String description) =>
    path.absolute(path.join(
        tempDir.path, "${description}_${i.toString().padLeft(3, '0')}.log"));

Future<void> testWithStopWords(
    List<String> stopWords, Directory tempDir, Level logLevel, int iterations,
    {String savegame}) async {
  final identifier =
      stopWords.join("_").replaceAll("[", "").replaceAll("]", "").toLowerCase();
  for (int i = 0; i < iterations; i++) {
    var logPath = createLogFilePath(tempDir, i, identifier);
    var logFile = File(logPath);
    var saveComment = savegame == null ? '' : " (from savegame '$savegame')";
    print("Running $identifier-aware test #${i + 1}$saveComment.");
    print(" - log: $logPath");
    // Make sure the file exists even when there are no errors.
    logFile.writeAsStringSync("");
    final runner = CliRunner(true, true, logFile, logLevel: logLevel);
    await runner.initialize(EdgeheadGame(
      saveGameSerialized: savegame == null ? null : defaultSavegames[savegame],
    ));
    try {
      runner.startBook();
      await runner.bookEnd;
    } finally {
      runner.close();
    }
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
