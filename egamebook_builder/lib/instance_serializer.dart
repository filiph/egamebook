import 'package:built_value/serializer.dart';

/// Used for annotating [InstanceSerializer] top-level variables for
/// source generation.
///
/// Example usage:
///
///     @GatherInstancesFrom(const ['lib/**/actions/*.dart'])
///     final InstanceSerializer<Action> actionSerializer = _$actionSerializer;
///
/// If you'll be serializing from other types than the root type (`Action` in
/// the above example), you can provide them with the named parameter
/// [additionalTypes]. These types must be subclasses of the root type.
class GatherInstancesFrom {
  final List<String> globs;

  final List<Type> additionalTypes;

  const GatherInstancesFrom(this.globs, {this.additionalTypes = const []});

  @override
  String toString() => "Instances for this InstanceSerializer will be gathered "
      "from given globs.";
}

/// Serializes top-level instances of [T].
class InstanceSerializer<T> extends PrimitiveSerializer<T> {
  /// Internal map that leads from strings to instances of [T].
  final Map<String, T> _map;

  /// Precomputed map that leads from the instances of [T] to the [string]s.
  final Map<T, String> _inverseMap = {};

  /// Additional types that this serializer can serialize.
  final List<Type> additionalTypes;

  String _wireName;

  /// Creates a serializer for instances of [T]. Provide a [Map] from strings
  /// to the action instance.
  ///
  /// Example:
  ///
  ///     final sayHello = new SayHelloAction();
  ///
  ///     final serializer = new InstanceSerializer<Action>({
  ///         "sayHello": sayHello,
  ///     });
  InstanceSerializer(this._map, {this.additionalTypes = const []}) {
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
        "Some instances used in map aren't static or top-level instances. "
        "For example, they are created anew each time they're accessed, "
        "or they are members of other instances.");
  }

  @override
  Iterable<Type> get types => [T] + additionalTypes;

  @override
  String get wireName => "Instance[$_wireName]";

  @override
  T deserialize(Serializers serializers, Object serialized,
      {FullType specifiedType: FullType.unspecified}) {
    return _map[serialized];
  }

  @override
  Object serialize(Serializers serializers, T object,
      {FullType specifiedType: FullType.unspecified}) {
    assert(
        _inverseMap.containsKey(object),
        "Incomplete map in $this. "
        "Make sure you're gathering all the instances that you need. "
        "Function without a string representation: $object.");
    return _inverseMap[object];
  }
}
