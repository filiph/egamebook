library stateful_random;

import 'package:meta/meta.dart';

/// A pseudo-random number generator that can save its complete state.
///
/// This allows users to get a predictable string of random numbers. This is
/// different from Dart library's `Random` class, which allows you to seed the
/// initial state but not states after that.
///
/// Currently implements algorithm "xor" from p. 4 of Marsaglia,
/// "Xorshift RNGs". https://en.wikipedia.org/wiki/Xorshift
class StatefulRandom {
  static const int _maxInt32 = 0xFFFFFFFF;

  static const int _halfInt32 = 0x7FFFFFFF;
  int _state;

  /// Creates a completely new instance. [seed] cannot be `null` or `0`.
  StatefulRandom(int seed) : _state = seed {
    assert(seed != null);
    assert(seed != 0);
  }

  /// Creates an instance from state that was previously created by [saveState].
  ///
  /// This is kept separate from the default constructor because later
  /// implementations could have a more involved state than just one integer.
  StatefulRandom.fromState(int state) : this(state);

  void loadState(int state) {
    assert(state != null);
    assert(state != 0);
    _state = state;
  }

  /// Returns a new number from `0` to [_maxInt32]. Clients should use
  /// [maxInt] instead.
  @visibleForTesting
  int next() {
    int x = _state;
    x ^= x << 13;
    // Dart doesn't have uint32 so we have to clamp the number like this.
    x &= _maxInt32;
    x ^= x >> 17;
    x &= _maxInt32;
    x ^= x << 5;
    x &= _maxInt32;
    _state = x;
    return x;
  }

  /// Returns `true` or `false` randomly.
  bool nextBool() {
    return next() > _halfInt32;
  }

  /// Returns a floating point number from `0.0` (inclusive)
  /// to `1.0` (exclusive).
  double nextDouble() {
    return next() / _maxInt32;
  }

  /// Returns a number from `0` (inclusive) to [max] (exclusive).
  int nextInt(int max) {
    return (nextDouble() * max).floor();
  }

  /// Returns the state that can be later fed int [StatefulRandom.fromState] to
  /// recreate the exact state of the random number generator.
  int saveState() => _state;
}
