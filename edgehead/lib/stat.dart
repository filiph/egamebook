typedef ValueToString<T> = String Function(T value);

class Stat<T> {
  final StatSetting<T> setting;
  T value;

  Stat(this.setting, T initialValue)
      // ignore: prefer_initializing_formals
      : value = initialValue;
}

class StatSetting<T> {
  final String name;
  final String description;
  final ValueToString<T> valueToShortString;
  final T maxValue;

  const StatSetting(
      this.name, this.description, this.valueToShortString, this.maxValue);
}
