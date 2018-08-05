// GENERATED CODE - DO NOT MODIFY BY HAND

part of storyline.pronoun;

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

Serializer<Pronoun> _$pronounSerializer = new _$PronounSerializer();

class _$PronounSerializer implements StructuredSerializer<Pronoun> {
  @override
  final Iterable<Type> types = const [Pronoun, _$Pronoun];
  @override
  final String wireName = 'Pronoun';

  @override
  Iterable serialize(Serializers serializers, Pronoun object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'accusative',
      serializers.serialize(object.accusative,
          specifiedType: const FullType(String)),
      'genitive',
      serializers.serialize(object.genitive,
          specifiedType: const FullType(String)),
      'nominative',
      serializers.serialize(object.nominative,
          specifiedType: const FullType(String)),
      'self',
      serializers.serialize(object.self, specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  Pronoun deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new PronounBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'accusative':
          result.accusative = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'genitive':
          result.genitive = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'nominative':
          result.nominative = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'self':
          result.self = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
      }
    }

    return result.build();
  }
}

class _$Pronoun extends Pronoun {
  @override
  final String accusative;
  @override
  final String genitive;
  @override
  final String nominative;
  @override
  final String self;

  factory _$Pronoun([void updates(PronounBuilder b)]) =>
      (new PronounBuilder()..update(updates)).build();

  _$Pronoun._({this.accusative, this.genitive, this.nominative, this.self})
      : super._() {
    if (accusative == null)
      throw new BuiltValueNullFieldError('Pronoun', 'accusative');
    if (genitive == null)
      throw new BuiltValueNullFieldError('Pronoun', 'genitive');
    if (nominative == null)
      throw new BuiltValueNullFieldError('Pronoun', 'nominative');
    if (self == null) throw new BuiltValueNullFieldError('Pronoun', 'self');
  }

  @override
  Pronoun rebuild(void updates(PronounBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  PronounBuilder toBuilder() => new PronounBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! Pronoun) return false;
    return accusative == other.accusative &&
        genitive == other.genitive &&
        nominative == other.nominative &&
        self == other.self;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, accusative.hashCode), genitive.hashCode),
            nominative.hashCode),
        self.hashCode));
  }
}

class PronounBuilder implements Builder<Pronoun, PronounBuilder> {
  _$Pronoun _$v;

  String _accusative;
  String get accusative => _$this._accusative;
  set accusative(String accusative) => _$this._accusative = accusative;

  String _genitive;
  String get genitive => _$this._genitive;
  set genitive(String genitive) => _$this._genitive = genitive;

  String _nominative;
  String get nominative => _$this._nominative;
  set nominative(String nominative) => _$this._nominative = nominative;

  String _self;
  String get self => _$this._self;
  set self(String self) => _$this._self = self;

  PronounBuilder();

  PronounBuilder get _$this {
    if (_$v != null) {
      _accusative = _$v.accusative;
      _genitive = _$v.genitive;
      _nominative = _$v.nominative;
      _self = _$v.self;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Pronoun other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$Pronoun;
  }

  @override
  void update(void updates(PronounBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$Pronoun build() {
    final _$result = _$v ??
        new _$Pronoun._(
            accusative: accusative,
            genitive: genitive,
            nominative: nominative,
            self: self);
    replace(_$result);
    return _$result;
  }
}
