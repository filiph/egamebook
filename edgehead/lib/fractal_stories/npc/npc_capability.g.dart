// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'npc_capability.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<NpcCapability> _$npcCapabilitySerializer =
    new _$NpcCapabilitySerializer();

class _$NpcCapabilitySerializer implements StructuredSerializer<NpcCapability> {
  @override
  final Iterable<Type> types = const [NpcCapability, _$NpcCapability];
  @override
  final String wireName = 'NpcCapability';

  @override
  Iterable<Object> serialize(Serializers serializers, NpcCapability object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'isHireable',
      serializers.serialize(object.isHireable,
          specifiedType: const FullType(bool)),
    ];
    if (object.followingActorId != null) {
      result
        ..add('followingActorId')
        ..add(serializers.serialize(object.followingActorId,
            specifiedType: const FullType(int)));
    }
    return result;
  }

  @override
  NpcCapability deserialize(
      Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new NpcCapabilityBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'followingActorId':
          result.followingActorId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'isHireable':
          result.isHireable = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$NpcCapability extends NpcCapability {
  @override
  final int followingActorId;
  @override
  final bool isHireable;

  factory _$NpcCapability([void Function(NpcCapabilityBuilder) updates]) =>
      (new NpcCapabilityBuilder()..update(updates)).build();

  _$NpcCapability._({this.followingActorId, this.isHireable}) : super._() {
    if (isHireable == null) {
      throw new BuiltValueNullFieldError('NpcCapability', 'isHireable');
    }
  }

  @override
  NpcCapability rebuild(void Function(NpcCapabilityBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  NpcCapabilityBuilder toBuilder() => new NpcCapabilityBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is NpcCapability &&
        followingActorId == other.followingActorId &&
        isHireable == other.isHireable;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, followingActorId.hashCode), isHireable.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('NpcCapability')
          ..add('followingActorId', followingActorId)
          ..add('isHireable', isHireable))
        .toString();
  }
}

class NpcCapabilityBuilder
    implements Builder<NpcCapability, NpcCapabilityBuilder> {
  _$NpcCapability _$v;

  int _followingActorId;
  int get followingActorId => _$this._followingActorId;
  set followingActorId(int followingActorId) =>
      _$this._followingActorId = followingActorId;

  bool _isHireable;
  bool get isHireable => _$this._isHireable;
  set isHireable(bool isHireable) => _$this._isHireable = isHireable;

  NpcCapabilityBuilder();

  NpcCapabilityBuilder get _$this {
    if (_$v != null) {
      _followingActorId = _$v.followingActorId;
      _isHireable = _$v.isHireable;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(NpcCapability other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$NpcCapability;
  }

  @override
  void update(void Function(NpcCapabilityBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$NpcCapability build() {
    final _$result = _$v ??
        new _$NpcCapability._(
            followingActorId: followingActorId, isHireable: isHireable);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
