library duplicate_list;

/// Makes a deep copy of the [original] set, using [clone] for each member.
List/*<T>*/ duplicateList/*<T>*/(
    List/*<T>*/ original, dynamic/*=T*/ clone(/*=T*/ object)) {
  List/*<T>*/ result = new List/*<T>*/();
  for (dynamic/*=T*/ member in original) {
    result.add(clone(member));
  }
  return result;
}
