library fractal_stories.pose;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'pose.g.dart';

class Pose extends EnumClass {
  static const Pose standing = _$standing;
  static const Pose offBalance = _$offBalance;
  static const Pose onGround = _$onGround;

  static Serializer<Pose> get serializer => _$poseSerializer;

  static BuiltSet<Pose> get values => _$values;

  const Pose._(String name) : super(name);

  static Pose valueOf(String name) => _$valueOf(name);
}
