library throw_if_duplicate;

/// Throws when [set] has duplicate entries.
bool hasDuplicities<T extends Object>(Iterable<T> set) {
  var control = <int>{};
  for (final T item in set) {
    final hash = item.hashCode;
    // TODO: use assert with message when available
    //       (will be compiled away for production)
    if (control.contains(hash)) {
      return true;
    }
    control.add(hash);
  }
  return false;
}
