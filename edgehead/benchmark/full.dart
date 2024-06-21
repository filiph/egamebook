// Copyright 2012 Google Inc. All Rights Reserved.

// Import BenchmarkBase class.
import 'dart:async';
import 'dart:math';

import 'package:edgehead/edgehead_lib.dart';
import 'package:t_stats/t_stats.dart';

import '../bin/default_savegames.dart';
import '../bin/play.dart';

void main() {
  FullRunBenchmark.main();
}

/// This benchmarks runs only 2 player choices from the `bleedsFight`
/// savegame, with a set random seed (so it's always the same game).
class FullRunBenchmark extends _BenchmarkBase {
  const FullRunBenchmark() : super('FullRunBenchmark');

  @override
  Future<void> run() async {
    const seed = 42;
    final runner = CliRunner(true, true, null,
        random: Random(seed), maxAutomatedChoicesTaken: 2);
    await runner.initialize(EdgeheadGame(
      saveGameSerialized: defaultSavegames['bleedsFight'],
      randomizeAfterPlayerChoice: false,
    ));
    runner.startBook();
    await runner.bookEnd.first;
    runner.close();
  }

  @override
  FutureOr<void> warmup() {
    // No warmup. We are testing AOT, so there's no JIT compiler to warm up.
  }

  // The benchmark code.
  @override
  void setup() {}

  // Not measured setup code executed prior to the benchmark runs.
  @override
  void teardown() {}

  // Not measures teardown code executed after the benchmark runs.
  static void main() {
    const FullRunBenchmark().report();
  }
}

/// Modified from benchmark_harness for asynchronous runs.
///
/// This is no longer good for micro-benchmarks. It works as a rough benchmark
/// of the speed of the game (especially the AI).
class _BenchmarkBase {
  final String name;
  _ScoreEmitter get emitter => const _PrintEmitter();

  // Empty constructor.
  const _BenchmarkBase(this.name);

  // The benchmark code.
  // This function is not used, if both [warmup] and [exercise] are overwritten.
  FutureOr<void> exercise() async {
    await run();
  }

  static const minimalDuration = Duration(minutes: 5);

  // Runs a short version of the benchmark. By default invokes [run] once.
  Future<Statistic> measure() async {
    setup();
    // Warmup for at least 100ms. Discard result.
    await warmup();
    // Run the benchmark for at least 120s.
    final result = await measureFor(exercise, minimalDuration.inMilliseconds);
    teardown();
    return result;
  }

  // Exercises the benchmark. By default invokes [run] 10 times.
  Future<void> report() async {
    emitter.emit(name, await measure());
  }

  // Not measured setup code executed prior to the benchmark runs.
  FutureOr<void> run() {}

  // Not measures teardown code executed after the benchmark runs.
  void setup() {}

  // Measures the score for this benchmark by executing it repeately until
  // time minimum has been reached.
  void teardown() {}

  // Measures the score for the benchmark and returns it.
  FutureOr<void> warmup() async {
    await run();
  }

  static Future<Statistic> measureFor(
      FutureOr<void> Function() f, int minimumMillis) async {
    int minimumMicros = minimumMillis * 1000;
    Stopwatch watch = Stopwatch();
    watch.start();
    int elapsed = 0;
    int last = 0;
    final measurements = <double>[];
    while (elapsed < minimumMicros) {
      await f();
      elapsed = watch.elapsedMicroseconds;
      measurements.add((elapsed - last) / 1000000);
      last = elapsed;
    }
    return Statistic.from(measurements, name: "Measurements");
  }
}

// Create a new benchmark by extending BenchmarkBase
class _PrintEmitter implements _ScoreEmitter {
  const _PrintEmitter();

  @override
  void emit(String testName, Statistic value) {
    print('$testName(RunTime): $value');
    print('t_stats TSV values:');
    print(value.toTSV());
  }
}

// ignore: one_member_abstracts
abstract class _ScoreEmitter {
  void emit(String testName, Statistic value);
}
