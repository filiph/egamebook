// TODO add `Map<String, StatSetting> statLookup` which allows Presenter to
// get a stat settings for a Stat by the stat's name.

typedef ValueToString<T> = String Function(T value);

class Stat<T> {
  final StatSetting<T> setting;
  T value;

  Stat(this.setting, T initialValue) : value = initialValue;
}

class StatSetting<T> {
  final String name;
  final String description;
  final ValueToString<T> valueToShortString;

  const StatSetting(this.name, this.description, this.valueToShortString);
}
