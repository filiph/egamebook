library throw_if_duplicate;

/// Throws when [set] has duplicate entries.
void throwIfDuplicate<T extends Object>(
    Iterable<T> set, String setDescription) {
  var control = new Set<int>();
  for (T item in set) {
    int hash = item.hashCode;
    // TODO: use assert with message when available (will be compiled away for production)
    if (control.contains(hash)) {
      throw new StateError(
          "Duplicate items in set: '$item' in $setDescription");
    }
    control.add(hash);
  }
}
