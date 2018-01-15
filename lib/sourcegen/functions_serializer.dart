import 'package:built_value/serializer.dart';

/// Serializes top-level and static functions.
class FunctionSerializer<T extends Function> extends PrimitiveSerializer<T> {
  final Map<String, T> _map;

  /// Precomputed map that leads from the [Function]s to the [string]s.
  final Map<T, String> _inverseMap = {};

  /// Creates a serializer for functions. Provide a [Map] from strings
  /// to the functions.
  ///
  /// Example:
  ///
  ///     void hello() => print("Hello.");
  ///     void bye() => print("Bye.");
  ///
  ///     final serializer = new FunctionSerializer<void Function()>({
  ///         "hello": hello,
  ///         "bye": bye,
  ///     });
  ///
  /// Note that you **must** provide the generic argument as a fully specified
  /// function type, _not_ a `typedef`.
  ///
  /// Wrong:
  ///
  ///     typedef Wrong = void Function();
  ///     final serializer = new FunctionSerializer<Wrong>(...);
  FunctionSerializer(this._map) {
    for (final key in _map.keys) {
      final value = _map[key];
      if (_wireName == null) {
        _wireName = value.runtimeType.toString();
      }
      assert(!_inverseMap.containsKey(value), "Duplicate values in $_map");
      _inverseMap[value] = key;
    }
    assert(() {
      // Make sure the functions have sane equality.
      for (final key in _map.keys) {
        final value = _map[key];
        if (!_inverseMap.containsKey(value)) return false;
      }
      return true;
    },
        "Some functions used in map are defined as function expressions. "
        "Please define them as static or top-level functions.");
  }

  @override
  T deserialize(Serializers serializers, Object serialized,
      {FullType specifiedType: FullType.unspecified}) {
    return _map[serialized];
  }

  @override
  Object serialize(Serializers serializers, T object,
      {FullType specifiedType: FullType.unspecified}) {
    return _inverseMap[object];
  }

  @override
  Iterable<Type> get types => [T];

  String _wireName;

  @override
  String get wireName => "Function[$_wireName]";
}
