/// Throws when [set] has duplicate entries.
bool hasDuplicities<T extends Object>(Iterable<T> set) {
  var control = <int>{};
  for (final T item in set) {
    final hash = item.hashCode;
    if (control.contains(hash)) {
      return true;
    }
    control.add(hash);
  }
  return false;
}
