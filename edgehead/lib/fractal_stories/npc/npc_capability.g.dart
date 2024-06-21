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
  Iterable<Object?> serialize(Serializers serializers, NpcCapability object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'isHireable',
      serializers.serialize(object.isHireable,
          specifiedType: const FullType(bool)),
    ];
    Object? value;
    value = object.followingActorId;
    if (value != null) {
      result
        ..add('followingActorId')
        ..add(serializers.serialize(value, specifiedType: const FullType(int)));
    }
    return result;
  }

  @override
  NpcCapability deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new NpcCapabilityBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'followingActorId':
          result.followingActorId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int?;
          break;
        case 'isHireable':
          result.isHireable = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$NpcCapability extends NpcCapability {
  @override
  final int? followingActorId;
  @override
  final bool isHireable;

  factory _$NpcCapability([void Function(NpcCapabilityBuilder)? updates]) =>
      (new NpcCapabilityBuilder()..update(updates))._build();

  _$NpcCapability._({this.followingActorId, required this.isHireable})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        isHireable, r'NpcCapability', 'isHireable');
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
    var _$hash = 0;
    _$hash = $jc(_$hash, followingActorId.hashCode);
    _$hash = $jc(_$hash, isHireable.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'NpcCapability')
          ..add('followingActorId', followingActorId)
          ..add('isHireable', isHireable))
        .toString();
  }
}

class NpcCapabilityBuilder
    implements Builder<NpcCapability, NpcCapabilityBuilder> {
  _$NpcCapability? _$v;

  int? _followingActorId;
  int? get followingActorId => _$this._followingActorId;
  set followingActorId(int? followingActorId) =>
      _$this._followingActorId = followingActorId;

  bool? _isHireable;
  bool? get isHireable => _$this._isHireable;
  set isHireable(bool? isHireable) => _$this._isHireable = isHireable;

  NpcCapabilityBuilder();

  NpcCapabilityBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _followingActorId = $v.followingActorId;
      _isHireable = $v.isHireable;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(NpcCapability other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$NpcCapability;
  }

  @override
  void update(void Function(NpcCapabilityBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  NpcCapability build() => _build();

  _$NpcCapability _build() {
    final _$result = _$v ??
        new _$NpcCapability._(
            followingActorId: followingActorId,
            isHireable: BuiltValueNullFieldError.checkNotNull(
                isHireable, r'NpcCapability', 'isHireable'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
