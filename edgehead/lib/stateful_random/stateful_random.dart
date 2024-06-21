import 'dart:math';

/// A function that returns a random id. Similar to [RandomIntGetter]
/// but will pick any integer, without bounds.
typedef RandomIdGetter = int Function();

/// A function that takes a [max] argument and returns a random
/// integer between `0` (inclusive) and [max] (exclusive).
///
/// Corresponds to the [StatefulRandom.nextInt()] function. This typedef is used
/// for functions that wrap [StatefulRandom.nextInt()] with other logic, such
/// as [WorldState.randomInt].
typedef RandomIntGetter = int Function([int? max]);

/// A pseudo-random number generator that can save its complete state.
///
/// This allows users to get a predictable string of random numbers. This is
/// different from Dart library's [Random] class, which allows you to seed the
/// initial state but not states after that.
///
/// Currently implements algorithm "xor" from p. 4 of Marsaglia,
/// "Xorshift RNGs". https://en.wikipedia.org/wiki/Xorshift
class StatefulRandom implements Random {
  static const int _maxInt32 = 0xFFFFFFFF;

  static const int _halfInt32 = 0x7FFFFFFF;
  int _state;

  /// Creates a completely new instance. [seed] cannot be `null` or `0`.
  StatefulRandom(int seed)
      : _state = seed,
        assert(seed != 0);

  /// Creates an instance from state that was previously created by [saveState].
  ///
  /// This is kept separate from the default constructor because later
  /// implementations could have a more involved state than just one integer.
  StatefulRandom.fromState(int state) : this(state);

  void loadState(int state) {
    assert(state != 0);
    _state = state;
  }

  /// Returns a new number from `0` to [_maxInt32].
  ///
  /// Clients should normally use the [nextInt] method instead. But in rare
  /// cases, when the idea is to get a random identifier, this function
  /// can work.
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
  @override
  bool nextBool() {
    return next() > _halfInt32;
  }

  /// Returns a floating point number from `0.0` (inclusive)
  /// to `1.0` (exclusive).
  @override
  double nextDouble() {
    return next() / _maxInt32;
  }

  /// Returns a number from `0` (inclusive) to [max] (exclusive).
  @override
  int nextInt(int max) {
    return (nextDouble() * max).floor();
  }

  /// Returns the state that can be later fed int [StatefulRandom.fromState] to
  /// recreate the exact state of the random number generator.
  int saveState() => _state;
}
