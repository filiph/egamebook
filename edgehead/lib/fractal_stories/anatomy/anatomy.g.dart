// GENERATED CODE - DO NOT MODIFY BY HAND

part of fractal_stories.anatomy;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_catches_without_on_clauses
// ignore_for_file: avoid_returning_this
// ignore_for_file: lines_longer_than_80_chars
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first
// ignore_for_file: unnecessary_const
// ignore_for_file: unnecessary_new
// ignore_for_file: test_types_in_equals

Serializer<Anatomy> _$anatomySerializer = new _$AnatomySerializer();

class _$AnatomySerializer implements StructuredSerializer<Anatomy> {
  @override
  final Iterable<Type> types = const [Anatomy, _$Anatomy];
  @override
  final String wireName = 'Anatomy';

  @override
  Iterable serialize(Serializers serializers, Anatomy object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'torso',
      serializers.serialize(object.torso,
          specifiedType: const FullType(BodyPart)),
    ];

    return result;
  }

  @override
  Anatomy deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new AnatomyBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'torso':
          result.torso.replace(serializers.deserialize(value,
              specifiedType: const FullType(BodyPart)) as BodyPart);
          break;
      }
    }

    return result.build();
  }
}

class _$Anatomy extends Anatomy {
  @override
  final BodyPart torso;
  Iterable<BodyPart> __allParts;

  factory _$Anatomy([void updates(AnatomyBuilder b)]) =>
      (new AnatomyBuilder()..update(updates)).build();

  _$Anatomy._({this.torso}) : super._() {
    if (torso == null) {
      throw new BuiltValueNullFieldError('Anatomy', 'torso');
    }
  }

  @override
  Iterable<BodyPart> get allParts => __allParts ??= super.allParts;

  @override
  Anatomy rebuild(void updates(AnatomyBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  AnatomyBuilder toBuilder() => new AnatomyBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Anatomy && torso == other.torso;
  }

  @override
  int get hashCode {
    return $jf($jc(0, torso.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Anatomy')..add('torso', torso))
        .toString();
  }
}

class AnatomyBuilder implements Builder<Anatomy, AnatomyBuilder> {
  _$Anatomy _$v;

  BodyPartBuilder _torso;
  BodyPartBuilder get torso => _$this._torso ??= new BodyPartBuilder();
  set torso(BodyPartBuilder torso) => _$this._torso = torso;

  AnatomyBuilder();

  AnatomyBuilder get _$this {
    if (_$v != null) {
      _torso = _$v.torso?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Anatomy other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$Anatomy;
  }

  @override
  void update(void updates(AnatomyBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$Anatomy build() {
    _$Anatomy _$result;
    try {
      _$result = _$v ?? new _$Anatomy._(torso: torso.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'torso';
        torso.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'Anatomy', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}
