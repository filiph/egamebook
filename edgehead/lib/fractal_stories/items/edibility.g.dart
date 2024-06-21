// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'edibility.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<Edibility> _$edibilitySerializer = new _$EdibilitySerializer();

class _$EdibilitySerializer implements StructuredSerializer<Edibility> {
  @override
  final Iterable<Type> types = const [Edibility, _$Edibility];
  @override
  final String wireName = 'Edibility';

  @override
  Iterable<Object?> serialize(Serializers serializers, Edibility object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'isEdibleByHumanoids',
      serializers.serialize(object.isEdibleByHumanoids,
          specifiedType: const FullType(bool)),
      'staminaBonus',
      serializers.serialize(object.staminaBonus,
          specifiedType: const FullType(int)),
    ];
    Object? value;
    value = object.eatingReport;
    if (value != null) {
      result
        ..add('eatingReport')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(String)));
    }
    return result;
  }

  @override
  Edibility deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new EdibilityBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'eatingReport':
          result.eatingReport = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String?;
          break;
        case 'isEdibleByHumanoids':
          result.isEdibleByHumanoids = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'staminaBonus':
          result.staminaBonus = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
      }
    }

    return result.build();
  }
}

class _$Edibility extends Edibility {
  @override
  final String? eatingReport;
  @override
  final bool isEdibleByHumanoids;
  @override
  final int staminaBonus;

  factory _$Edibility([void Function(EdibilityBuilder)? updates]) =>
      (new EdibilityBuilder()..update(updates))._build();

  _$Edibility._(
      {this.eatingReport,
      required this.isEdibleByHumanoids,
      required this.staminaBonus})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        isEdibleByHumanoids, r'Edibility', 'isEdibleByHumanoids');
    BuiltValueNullFieldError.checkNotNull(
        staminaBonus, r'Edibility', 'staminaBonus');
  }

  @override
  Edibility rebuild(void Function(EdibilityBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  EdibilityBuilder toBuilder() => new EdibilityBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Edibility &&
        eatingReport == other.eatingReport &&
        isEdibleByHumanoids == other.isEdibleByHumanoids &&
        staminaBonus == other.staminaBonus;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, eatingReport.hashCode);
    _$hash = $jc(_$hash, isEdibleByHumanoids.hashCode);
    _$hash = $jc(_$hash, staminaBonus.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'Edibility')
          ..add('eatingReport', eatingReport)
          ..add('isEdibleByHumanoids', isEdibleByHumanoids)
          ..add('staminaBonus', staminaBonus))
        .toString();
  }
}

class EdibilityBuilder implements Builder<Edibility, EdibilityBuilder> {
  _$Edibility? _$v;

  String? _eatingReport;
  String? get eatingReport => _$this._eatingReport;
  set eatingReport(String? eatingReport) => _$this._eatingReport = eatingReport;

  bool? _isEdibleByHumanoids;
  bool? get isEdibleByHumanoids => _$this._isEdibleByHumanoids;
  set isEdibleByHumanoids(bool? isEdibleByHumanoids) =>
      _$this._isEdibleByHumanoids = isEdibleByHumanoids;

  int? _staminaBonus;
  int? get staminaBonus => _$this._staminaBonus;
  set staminaBonus(int? staminaBonus) => _$this._staminaBonus = staminaBonus;

  EdibilityBuilder();

  EdibilityBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _eatingReport = $v.eatingReport;
      _isEdibleByHumanoids = $v.isEdibleByHumanoids;
      _staminaBonus = $v.staminaBonus;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Edibility other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$Edibility;
  }

  @override
  void update(void Function(EdibilityBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  Edibility build() => _build();

  _$Edibility _build() {
    final _$result = _$v ??
        new _$Edibility._(
            eatingReport: eatingReport,
            isEdibleByHumanoids: BuiltValueNullFieldError.checkNotNull(
                isEdibleByHumanoids, r'Edibility', 'isEdibleByHumanoids'),
            staminaBonus: BuiltValueNullFieldError.checkNotNull(
                staminaBonus, r'Edibility', 'staminaBonus'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
