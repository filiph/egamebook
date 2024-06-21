// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'storyline_pronoun.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<Pronoun> _$pronounSerializer = new _$PronounSerializer();

class _$PronounSerializer implements StructuredSerializer<Pronoun> {
  @override
  final Iterable<Type> types = const [Pronoun, _$Pronoun];
  @override
  final String wireName = 'Pronoun';

  @override
  Iterable<Object?> serialize(Serializers serializers, Pronoun object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
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
  Pronoun deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new PronounBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'accusative':
          result.accusative = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'genitive':
          result.genitive = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'nominative':
          result.nominative = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'self':
          result.self = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
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

  factory _$Pronoun([void Function(PronounBuilder)? updates]) =>
      (new PronounBuilder()..update(updates))._build();

  _$Pronoun._(
      {required this.accusative,
      required this.genitive,
      required this.nominative,
      required this.self})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(accusative, r'Pronoun', 'accusative');
    BuiltValueNullFieldError.checkNotNull(genitive, r'Pronoun', 'genitive');
    BuiltValueNullFieldError.checkNotNull(nominative, r'Pronoun', 'nominative');
    BuiltValueNullFieldError.checkNotNull(self, r'Pronoun', 'self');
  }

  @override
  Pronoun rebuild(void Function(PronounBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PronounBuilder toBuilder() => new PronounBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Pronoun &&
        accusative == other.accusative &&
        genitive == other.genitive &&
        nominative == other.nominative &&
        self == other.self;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, accusative.hashCode);
    _$hash = $jc(_$hash, genitive.hashCode);
    _$hash = $jc(_$hash, nominative.hashCode);
    _$hash = $jc(_$hash, self.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }
}

class PronounBuilder implements Builder<Pronoun, PronounBuilder> {
  _$Pronoun? _$v;

  String? _accusative;
  String? get accusative => _$this._accusative;
  set accusative(String? accusative) => _$this._accusative = accusative;

  String? _genitive;
  String? get genitive => _$this._genitive;
  set genitive(String? genitive) => _$this._genitive = genitive;

  String? _nominative;
  String? get nominative => _$this._nominative;
  set nominative(String? nominative) => _$this._nominative = nominative;

  String? _self;
  String? get self => _$this._self;
  set self(String? self) => _$this._self = self;

  PronounBuilder();

  PronounBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _accusative = $v.accusative;
      _genitive = $v.genitive;
      _nominative = $v.nominative;
      _self = $v.self;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Pronoun other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$Pronoun;
  }

  @override
  void update(void Function(PronounBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  Pronoun build() => _build();

  _$Pronoun _build() {
    final _$result = _$v ??
        new _$Pronoun._(
            accusative: BuiltValueNullFieldError.checkNotNull(
                accusative, r'Pronoun', 'accusative'),
            genitive: BuiltValueNullFieldError.checkNotNull(
                genitive, r'Pronoun', 'genitive'),
            nominative: BuiltValueNullFieldError.checkNotNull(
                nominative, r'Pronoun', 'nominative'),
            self: BuiltValueNullFieldError.checkNotNull(
                self, r'Pronoun', 'self'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
