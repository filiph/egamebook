import 'package:built_value/serializer.dart';

/// Used for annotating [FunctionSerializer] top-level variables for
/// source generation.
class GatherFunctionsFrom {
  final List<String> globs;

  const GatherFunctionsFrom(this.globs);

  @override
  String toString() => "Functions for this FunctionSerializer will be gathered "
      "from given globs.";
}

/// Serializes top-level and static functions.
class FunctionSerializer<T extends Function> extends PrimitiveSerializer<T> {
  final Map<String, T> _map;

  /// Precomputed map that leads from the [Function]s to the [string]s.
  final Map<T, String> _inverseMap = {};

  String _wireName;

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
  /// Note that you don't need to provide the generic argument as a fully
  /// specified function type. You can use a `typedef`.
  ///
  /// Example:
  ///
  ///     typedef String StringReturningFunc();
  ///     final serializer = new FunctionSerializer<StringReturningFunc>(...);
  ///
  /// This is important in Dart 1.x, where the fully specified function type
  /// (`void Function()`) isn't fully supported and breaks dart analyzer.
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
    }(),
        "Some functions used in map are defined as function expressions. "
        "Please define them as static or top-level functions.");
  }

  @override
  Iterable<Type> get types => [T];

  @override
  String get wireName => "Function[$_wireName]";

  @override
  T deserialize(Serializers serializers, Object serialized,
      {FullType specifiedType: FullType.unspecified}) {
    return _map[serialized];
  }

  @override
  Object serialize(Serializers serializers, T object,
      {FullType specifiedType: FullType.unspecified}) {
    assert(_inverseMap.containsKey(object), "Incomplete map in $this. "
        "Make sure you're gathering all the functions that you need. "
        "Function without a string representation: $object.");
    return _inverseMap[object];
  }
}
