// GENERATED CODE - DO NOT MODIFY BY HAND

part of fractal_stories.items.edibility;

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
  Iterable<Object> serialize(Serializers serializers, Edibility object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'isEdibleByHumanoids',
      serializers.serialize(object.isEdibleByHumanoids,
          specifiedType: const FullType(bool)),
      'staminaBonus',
      serializers.serialize(object.staminaBonus,
          specifiedType: const FullType(int)),
    ];
    if (object.eatingReport != null) {
      result
        ..add('eatingReport')
        ..add(serializers.serialize(object.eatingReport,
            specifiedType: const FullType(String)));
    }
    return result;
  }

  @override
  Edibility deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new EdibilityBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'eatingReport':
          result.eatingReport = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'isEdibleByHumanoids':
          result.isEdibleByHumanoids = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'staminaBonus':
          result.staminaBonus = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
      }
    }

    return result.build();
  }
}

class _$Edibility extends Edibility {
  @override
  final String eatingReport;
  @override
  final bool isEdibleByHumanoids;
  @override
  final int staminaBonus;

  factory _$Edibility([void Function(EdibilityBuilder) updates]) =>
      (new EdibilityBuilder()..update(updates)).build();

  _$Edibility._(
      {this.eatingReport, this.isEdibleByHumanoids, this.staminaBonus})
      : super._() {
    if (isEdibleByHumanoids == null) {
      throw new BuiltValueNullFieldError('Edibility', 'isEdibleByHumanoids');
    }
    if (staminaBonus == null) {
      throw new BuiltValueNullFieldError('Edibility', 'staminaBonus');
    }
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
    return $jf($jc(
        $jc($jc(0, eatingReport.hashCode), isEdibleByHumanoids.hashCode),
        staminaBonus.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Edibility')
          ..add('eatingReport', eatingReport)
          ..add('isEdibleByHumanoids', isEdibleByHumanoids)
          ..add('staminaBonus', staminaBonus))
        .toString();
  }
}

class EdibilityBuilder implements Builder<Edibility, EdibilityBuilder> {
  _$Edibility _$v;

  String _eatingReport;
  String get eatingReport => _$this._eatingReport;
  set eatingReport(String eatingReport) => _$this._eatingReport = eatingReport;

  bool _isEdibleByHumanoids;
  bool get isEdibleByHumanoids => _$this._isEdibleByHumanoids;
  set isEdibleByHumanoids(bool isEdibleByHumanoids) =>
      _$this._isEdibleByHumanoids = isEdibleByHumanoids;

  int _staminaBonus;
  int get staminaBonus => _$this._staminaBonus;
  set staminaBonus(int staminaBonus) => _$this._staminaBonus = staminaBonus;

  EdibilityBuilder();

  EdibilityBuilder get _$this {
    if (_$v != null) {
      _eatingReport = _$v.eatingReport;
      _isEdibleByHumanoids = _$v.isEdibleByHumanoids;
      _staminaBonus = _$v.staminaBonus;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Edibility other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$Edibility;
  }

  @override
  void update(void Function(EdibilityBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$Edibility build() {
    final _$result = _$v ??
        new _$Edibility._(
            eatingReport: eatingReport,
            isEdibleByHumanoids: isEdibleByHumanoids,
            staminaBonus: staminaBonus);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
