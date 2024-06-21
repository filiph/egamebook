/// The result of querying a history.
abstract class QueryResult<T extends Record> {
  /// Whether or not this query found at least one event.
  bool get hasHappened;

  /// The latest event matching the query.
  T? get latest;
}

/// A base interface to all records.
abstract class Record {
  /// The time at which the event occurred. Must be in UTC.
  DateTime get time;
}

/// A history result that could have happened several times.
///
/// For example, visiting San Francisco can happen several times during
/// a lifetime, and we might want to track all occurrences.
///
/// The counterpart class is [SingleQueryResult].
class SerialQueryResult<T extends Record> implements QueryResult<T> {
  /// Records are in reverse chronological order, so the first result is
  /// the latest. See [SerialQueryResult.new].
  final Iterable<T> _records;

  bool _walked = false;

  /// Creates a new result with an iterable of [Record] instances.
  ///
  /// Provides optimized [hasHappened] and [latest].
  ///
  /// **IMPORTANT**: [records] must be provided in reverse chronological order.
  /// The first member must be the latest one.
  SerialQueryResult(Iterable<T> records) : _records = records;

  /// Counts the number of events in the query.
  int get count {
    _checkUnwalked();

    return _records.length;
  }

  @override
  bool get hasHappened {
    _checkUnwalked();

    for (final _ in _records) {
      return true;
    }

    return false;
  }

  @override
  T? get latest {
    _checkUnwalked();

    for (final record in _records) {
      return record;
    }

    return null;
  }

  /// The first time something happened.
  T? get oldest {
    _checkUnwalked();

    // We are dealing with an iterable, and getting a length of an iterable
    // could consume it, preventing us from getting the record. So instead,
    // we walk the iterable and return the last record in it (or null, if it
    // was empty).
    T? result;
    for (final record in _records) {
      result = record;
    }

    return result;
  }

  /// Ensures that the [_records] iterable isn't walked more than once. This
  /// means that [QueryResult] can only be used once.
  void _checkUnwalked() {
    if (_walked) throw StateError("Trying to walk query twice.");
    _walked = true;
  }
}

/// A history result that can meaningfully happen only once.
///
/// For example, being born is often a once-in-a-lifetime event. But even events
/// like "drink coffee", which can happen many times in real life, could
/// be modelled as [SingleQueryResult] if the game really only cares about
/// the _last_ time the player did something, and previous instances are
/// irrelevant.
///
/// The counterpart class is [SerialQueryResult].
class SingleQueryResult<T extends Record> implements QueryResult<T> {
  final T? _record;

  SingleQueryResult(this._record);

  @override
  bool get hasHappened => _record != null;

  @override
  T? get latest => _record;
}
