// GENERATED CODE - DO NOT MODIFY BY HAND

part of fractal_stories.pose;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const Pose _$combat = const Pose._('combat');
const Pose _$standing = const Pose._('standing');
const Pose _$extended = const Pose._('extended');
const Pose _$offBalance = const Pose._('offBalance');
const Pose _$onGround = const Pose._('onGround');

Pose _$valueOf(String name) {
  switch (name) {
    case 'combat':
      return _$combat;
    case 'standing':
      return _$standing;
    case 'extended':
      return _$extended;
    case 'offBalance':
      return _$offBalance;
    case 'onGround':
      return _$onGround;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<Pose> _$values = new BuiltSet<Pose>(const <Pose>[
  _$combat,
  _$standing,
  _$extended,
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
          {FullType specifiedType = FullType.unspecified}) =>
      object.name;

  @override
  Pose deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      Pose.valueOf(serialized as String);
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
