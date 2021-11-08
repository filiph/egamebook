import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'npc_capability.g.dart';

abstract class NpcCapability
    implements Built<NpcCapability, NpcCapabilityBuilder> {
  static Serializer<NpcCapability> get serializer => _$npcCapabilitySerializer;

  factory NpcCapability({
    required bool isHireable,
    int followingActorId,
  }) = _$NpcCapability._;

  NpcCapability._();

  int? get followingActorId;

  bool get isHireable;
}
