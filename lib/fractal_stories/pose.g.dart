// GENERATED CODE - DO NOT MODIFY BY HAND

part of fractal_stories.pose;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_returning_this
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

const Pose _$standing = const Pose._('standing');
const Pose _$offBalance = const Pose._('offBalance');
const Pose _$onGround = const Pose._('onGround');

Pose _$valueOf(String name) {
  switch (name) {
    case 'standing':
      return _$standing;
    case 'offBalance':
      return _$offBalance;
    case 'onGround':
      return _$onGround;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<Pose> _$values = new BuiltSet<Pose>(const <Pose>[
  _$standing,
  _$offBalance,
  _$onGround,
]);

Serializer<Pose> _$poseSerializer = new _$PoseSerializer();

class _$PoseSerializer implements PrimitiveSerializer<Pose> {
  @override
  final Iterable<Type> types = const <Type>[Pose];
  @override
  final String wireName = 'Pose';

  @override
  Object serialize(Serializers serializers, Pose object,
          {FullType specifiedType: FullType.unspecified}) =>
      object.name;

  @override
  Pose deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType: FullType.unspecified}) =>
      Pose.valueOf(serialized as String);
}
