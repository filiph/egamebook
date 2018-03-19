library edgehead_global;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';

part 'edgehead_global.g.dart';

abstract class EdgeheadGlobalState
    implements
        WorldStateFlags,
        Built<EdgeheadGlobalState, EdgeheadGlobalStateBuilder> {
  static Serializer<EdgeheadGlobalState> get serializer =>
      _$edgeheadGlobalStateSerializer;

  factory EdgeheadGlobalState([void updates(EdgeheadGlobalStateBuilder b)]) =
      _$EdgeheadGlobalState;

  EdgeheadGlobalState._();
}
