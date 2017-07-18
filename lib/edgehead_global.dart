library edgehead_global;

import 'package:built_value/built_value.dart';
import 'package:meta/meta.dart';

part 'edgehead_global.g.dart';

abstract class EdgeheadGlobalState
    implements Built<EdgeheadGlobalState, EdgeheadGlobalStateBuilder> {
  factory EdgeheadGlobalState([void updates(EdgeheadGlobalStateBuilder b)]) =
      _$EdgeheadGlobalState;

  EdgeheadGlobalState._();

  bool get hasKegOfBeer;

  int get bloodrockFollowers;
}

abstract class EdgeheadGlobalStateBuilder
    implements Builder<EdgeheadGlobalState, EdgeheadGlobalStateBuilder> {
  @virtual
  bool hasKegOfBeer = false;

  @virtual
  int bloodrockFollowers = 0;

  factory EdgeheadGlobalStateBuilder() = _$EdgeheadGlobalStateBuilder;
  EdgeheadGlobalStateBuilder._();
}