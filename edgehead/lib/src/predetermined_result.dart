library edgehead.predetermination;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'predetermined_result.g.dart';

/// A defense situation can be predetermined to succeed or fail.
class Predetermination extends EnumClass {
  /// Actions should behave as normal.
  static const Predetermination none = _$none;

  /// All actions have 100% chance of success.
  static const Predetermination successGuaranteed = _$successGuaranteed;

  /// All actions have 0% chance of success.
  static const Predetermination failureGuaranteed = _$failureGuaranteed;

  static Serializer<Predetermination> get serializer =>
      _$predeterminationSerializer;

  static BuiltSet<Predetermination> get values => _$values;

  const Predetermination._(super.name);

  static Predetermination valueOf(String name) => _$valueOf(name);
}
