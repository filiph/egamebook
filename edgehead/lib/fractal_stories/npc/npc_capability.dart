import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:meta/meta.dart';

part 'npc_capability.g.dart';

abstract class NpcCapability
    implements Built<NpcCapability, NpcCapabilityBuilder> {
  static Serializer<NpcCapability> get serializer => _$npcCapabilitySerializer;

  factory NpcCapability({
    @required bool isHireable,
    int followingActorId,
  }) = _$NpcCapability._;

  NpcCapability._();

  @nullable
  int get followingActorId;

  bool get isHireable;
}
