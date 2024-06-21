// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'anatomy.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<Anatomy> _$anatomySerializer = new _$AnatomySerializer();

class _$AnatomySerializer implements StructuredSerializer<Anatomy> {
  @override
  final Iterable<Type> types = const [Anatomy, _$Anatomy];
  @override
  final String wireName = 'Anatomy';

  @override
  Iterable<Object?> serialize(Serializers serializers, Anatomy object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'isUndead',
      serializers.serialize(object.isUndead,
          specifiedType: const FullType(bool)),
      'torso',
      serializers.serialize(object.torso,
          specifiedType: const FullType(BodyPart)),
    ];

    return result;
  }

  @override
  Anatomy deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new AnatomyBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'isUndead':
          result.isUndead = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'torso':
          result.torso.replace(serializers.deserialize(value,
              specifiedType: const FullType(BodyPart))! as BodyPart);
          break;
      }
    }

    return result.build();
  }
}

class _$Anatomy extends Anatomy {
  @override
  final bool isUndead;
  @override
  final BodyPart torso;
  List<BodyPart>? __allParts;
  Item? __bodyPartWeapon;
  bool ___bodyPartWeapon = false;
  bool? __hasCrippledLegs;
  bool? __hasHealthyLegs;
  bool? __isBlind;
  BodyPart? __primaryWeaponAppendage;
  bool ___primaryWeaponAppendage = false;
  BodyPart? __secondaryWeaponAppendage;
  bool ___secondaryWeaponAppendage = false;

  factory _$Anatomy([void Function(AnatomyBuilder)? updates]) =>
      (new AnatomyBuilder()..update(updates))._build();

  _$Anatomy._({required this.isUndead, required this.torso}) : super._() {
    BuiltValueNullFieldError.checkNotNull(isUndead, r'Anatomy', 'isUndead');
    BuiltValueNullFieldError.checkNotNull(torso, r'Anatomy', 'torso');
  }

  @override
  List<BodyPart> get allParts => __allParts ??= super.allParts;

  @override
  Item? get bodyPartWeapon {
    if (!___bodyPartWeapon) {
      __bodyPartWeapon = super.bodyPartWeapon;
      ___bodyPartWeapon = true;
    }
    return __bodyPartWeapon;
  }

  @override
  bool get hasCrippledLegs => __hasCrippledLegs ??= super.hasCrippledLegs;

  @override
  bool get hasHealthyLegs => __hasHealthyLegs ??= super.hasHealthyLegs;

  @override
  bool get isBlind => __isBlind ??= super.isBlind;

  @override
  BodyPart? get primaryWeaponAppendage {
    if (!___primaryWeaponAppendage) {
      __primaryWeaponAppendage = super.primaryWeaponAppendage;
      ___primaryWeaponAppendage = true;
    }
    return __primaryWeaponAppendage;
  }

  @override
  BodyPart? get secondaryWeaponAppendage {
    if (!___secondaryWeaponAppendage) {
      __secondaryWeaponAppendage = super.secondaryWeaponAppendage;
      ___secondaryWeaponAppendage = true;
    }
    return __secondaryWeaponAppendage;
  }

  @override
  Anatomy rebuild(void Function(AnatomyBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AnatomyBuilder toBuilder() => new AnatomyBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Anatomy &&
        isUndead == other.isUndead &&
        torso == other.torso;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, isUndead.hashCode);
    _$hash = $jc(_$hash, torso.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'Anatomy')
          ..add('isUndead', isUndead)
          ..add('torso', torso))
        .toString();
  }
}

class AnatomyBuilder implements Builder<Anatomy, AnatomyBuilder> {
  _$Anatomy? _$v;

  bool? _isUndead;
  bool? get isUndead => _$this._isUndead;
  set isUndead(bool? isUndead) => _$this._isUndead = isUndead;

  BodyPartBuilder? _torso;
  BodyPartBuilder get torso => _$this._torso ??= new BodyPartBuilder();
  set torso(BodyPartBuilder? torso) => _$this._torso = torso;

  AnatomyBuilder();

  AnatomyBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _isUndead = $v.isUndead;
      _torso = $v.torso.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Anatomy other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$Anatomy;
  }

  @override
  void update(void Function(AnatomyBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  Anatomy build() => _build();

  _$Anatomy _build() {
    _$Anatomy _$result;
    try {
      _$result = _$v ??
          new _$Anatomy._(
              isUndead: BuiltValueNullFieldError.checkNotNull(
                  isUndead, r'Anatomy', 'isUndead'),
              torso: torso.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'torso';
        torso.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'Anatomy', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
