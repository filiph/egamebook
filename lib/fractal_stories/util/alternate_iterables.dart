library alternate_iterables;

/// Alternates between two iterables. Once one iterable is depleted, the other
/// one runs through to the end.
Iterable/*<T>*/ alternate/*<T>*/(
    Iterable/*<T>*/ first, Iterable/*<T>*/ second) sync* {
  var firstIterator = first.iterator;
  var secondIterator = second.iterator;
  while (true) {
    bool firstHasNext = firstIterator.moveNext();
    bool secondHasNext = secondIterator.moveNext();
    if (firstHasNext) yield firstIterator.current;
    if (secondHasNext) yield secondIterator.current;
    if (!firstHasNext && !secondHasNext) break;
  }
}
