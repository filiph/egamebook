// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'pose.dart';

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

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
