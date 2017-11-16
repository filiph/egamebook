library duplicate_set;

/// Makes a deep copy of the [original] set, using [clone] for each member.
Set<T> duplicateSet<T>(Set<T> original, T clone(T object)) {
  Set<T> result = new Set<T>();
  for (T member in original) {
    result.add(clone(member));
  }
  return result;
}
