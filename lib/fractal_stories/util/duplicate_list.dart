library duplicate_list;

/// Makes a deep copy of the [original] set, using [clone] for each member.
List<T> duplicateList<T>(List<T> original, T clone(T object)) {
  List<T> result = new List<T>();
  for (T member in original) {
    result.add(clone(member));
  }
  return result;
}
