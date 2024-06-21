/// Alternates between two iterables. Once one iterable is depleted, the other
/// one runs through to the end.
Iterable<T> alternate<T>(Iterable<T> first, Iterable<T> second) sync* {
  var firstIterator = first.iterator;
  var secondIterator = second.iterator;

  bool firstHasNext;
  bool secondHasNext;
  do {
    firstHasNext = firstIterator.moveNext();
    secondHasNext = secondIterator.moveNext();
    if (firstHasNext) yield firstIterator.current;
    if (secondHasNext) yield secondIterator.current;
  } while (firstHasNext || secondHasNext);
}
