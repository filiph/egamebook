import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'director.g.dart';

abstract class DirectorCapability
    implements Built<DirectorCapability, DirectorCapabilityBuilder> {
  static Serializer<DirectorCapability> get serializer =>
      _$directorCapabilitySerializer;

  factory DirectorCapability({required bool isActive}) = _$DirectorCapability._;

  DirectorCapability._();

  // TODO: remove -- we're not using this.
  bool get isActive;
}
