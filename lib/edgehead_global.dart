library edgehead_global;

import 'package:built_value/built_value.dart';
import 'package:meta/meta.dart';

part 'edgehead_global.g.dart';

abstract class EdgeheadGlobalState
    implements Built<EdgeheadGlobalState, EdgeheadGlobalStateBuilder> {
  factory EdgeheadGlobalState([updates(EdgeheadGlobalStateBuilder b)]) =
      _$EdgeheadGlobalState;

  EdgeheadGlobalState._();

  bool get hasKegOfBeer;
}

abstract class EdgeheadGlobalStateBuilder
    implements Builder<EdgeheadGlobalState, EdgeheadGlobalStateBuilder> {
  @virtual
  bool hasKegOfBeer = false;

  factory EdgeheadGlobalStateBuilder() = _$EdgeheadGlobalStateBuilder;
  EdgeheadGlobalStateBuilder._();
}