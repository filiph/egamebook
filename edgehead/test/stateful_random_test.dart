import 'dart:math';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:test/test.dart';

void main() {
  test("Random seed continues", () {
    final random = StatefulRandom(42);
    final nextInt = random.next();
    final dupe = StatefulRandom.fromState(nextInt);
    expect(random.next(), dupe.next());
  });

  test("same sequence after seed", () {
    final seed = Random().nextInt(1000) + 1;
    final random = StatefulRandom(seed);
    final ints = List.generate(100, (_) => random.nextInt(0xffff));

    final random2 = StatefulRandom(seed);
    final ints2 = List.generate(100, (_) => random2.nextInt(0xffff));
    expect(ints, orderedEquals(ints2));
  });

  test("Elements sufficiently random", () {
    final random = StatefulRandom(42);
    final numbers =
        Iterable<int>.generate(10000, (_) => random.nextInt(100000000));
    final set = Set<int>();
    for (final n in numbers) {
      expect(set.contains(n), isFalse,
          reason: "$n is already in set (after ${set.length} numbers)");
      set.add(n);
    }
  });

  test("StatefulRandom.nextInt returns compatibly to Random.nextInt", () {
    final random = StatefulRandom(42);
    bool zeroSeen = false;
    bool nineSeen = false;
    for (int i = 0; i < 10000; i++) {
      final n = random.nextInt(10);
      expect(n, greaterThanOrEqualTo(0));
      expect(n, lessThan(10));
      if (n == 0) zeroSeen = true;
      if (n == 9) nineSeen = true;
    }
    expect(zeroSeen, isTrue);
    expect(nineSeen, isTrue);
  });

  test("StatefulRandom.nextBool returns about half true, half false", () {
    final random = StatefulRandom(42);
    int truesSeen = 0;
    const int count = 100000;
    for (int i = 0; i < count; i++) {
      final result = random.nextBool();
      if (result) truesSeen += 1;
    }
    expect(truesSeen / count, closeTo(0.5, 0.001));
  });

  test("StatefulRandom.nextDouble returns about below 0.5, half above", () {
    final random = StatefulRandom(1337);
    int belowHalf = 0;
    const int count = 100000;
    for (int i = 0; i < count; i++) {
      final result = random.nextDouble();
      if (result < 0.5) belowHalf += 1;
    }
    expect(belowHalf / count, closeTo(0.5, 0.001));
  });
}
