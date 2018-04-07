/// A class that generates unique [int] ids.
///
/// The ids are guaranteed to be unique only to the extent of the size of [int]
/// (~63 bits), and only inside one instance of [UniqueIdMaker]. In current
/// implementation, the ids raise sequentially.
class UniqueIdMaker {
  int _next;

  /// Creates a maker of unique ids. The ids won't go under [startAt], which
  /// is useful if you need to reserve some ids.
  UniqueIdMaker._({int startAt: 1000000}) : _next = startAt;

  /// Generates a unique id. Consecutive calls will generate different ids.
  int generateNext() {
    return _next++;
  }
}

/// Global way of getting simple unique ids.
final UniqueIdMaker uniqueIdMaker = new UniqueIdMaker._();
