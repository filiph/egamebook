/// A class that generates unique [int] ids.
///
/// The ids are guaranteed to be unique only to the extent of the size of [int]
/// (~63 bits), and only inside one instance of [UniqueIdMaker]. In current
/// implementation, the ids raise sequentially. Please don't use this for
/// cryptographic reasons.
class UniqueIdMaker {
  int _next;

  /// Creates a maker of unique ids. The ids won't go under [startAt], which
  /// is useful if you need to reserve some ids.
  UniqueIdMaker({int startAt: 10000}) : _next = startAt;

  /// Generates a unique id. Consecutive calls will generate different ids.
  int generateNext() {
    return _next++;
  }
}
