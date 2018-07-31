import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';

/// Serializes top-level Actions instances.
class ActionSerializer extends PrimitiveSerializer<Action<dynamic>> {
  final Map<String, Action<dynamic>> _map;

  /// Precomputed map that leads from the [Action]s to the [string]s.
  final Map<Action<dynamic>, String> _inverseMap = {};

  String _wireName;

  /// Creates a serializer for actions. Provide a [Map] from strings
  /// to the action instance.
  ///
  /// Example:
  ///
  ///     final sayHello = new SayHelloAction();
  ///
  ///     final serializer = new ActionSerializer({
  ///         "sayHello": sayHello,
  ///     });
  ActionSerializer(this._map) {
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
  Iterable<Type> get types => [Action];

  @override
  String get wireName => "Action[$_wireName]";

  @override
  Action<dynamic> deserialize(Serializers serializers, Object serialized,
      {FullType specifiedType: FullType.unspecified}) {
    return _map[serialized];
  }

  @override
  Object serialize(Serializers serializers, Action<dynamic> object,
      {FullType specifiedType: FullType.unspecified}) {
    assert(
        _inverseMap.containsKey(object),
        "Incomplete map in $this. "
        "Make sure you're gathering all the functions that you need. "
        "Function without a string representation: $object.");
    return _inverseMap[object];
  }
}

/// Used for annotating [ActionSerializer] top-level variables for
/// source generation.
class GatherActionsFrom {
  final List<String> globs;

  const GatherActionsFrom(this.globs);

  @override
  String toString() => "Actions for this ActionSerializer will be gathered "
      "from given globs.";
}
