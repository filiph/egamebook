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

  int get bloodrockFollowers;

  int get brianaQuoteIndex;

  bool get hasKegOfBeer;
}

abstract class EdgeheadGlobalStateBuilder
    implements Builder<EdgeheadGlobalState, EdgeheadGlobalStateBuilder> {
  @virtual
  bool hasKegOfBeer = false;

  @virtual
  int bloodrockFollowers = 0;

  @virtual
  int brianaQuoteIndex = 0;

  factory EdgeheadGlobalStateBuilder() = _$EdgeheadGlobalStateBuilder;
  EdgeheadGlobalStateBuilder._();
}
