// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'lose_element.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<LoseGame> _$loseGameSerializer = new _$LoseGameSerializer();

class _$LoseGameSerializer implements StructuredSerializer<LoseGame> {
  @override
  final Iterable<Type> types = const [LoseGame, _$LoseGame];
  @override
  final String wireName = 'LoseGame';

  @override
  Iterable<Object?> serialize(Serializers serializers, LoseGame object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'markdownText',
      serializers.serialize(object.markdownText,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  LoseGame deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new LoseGameBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'markdownText':
          result.markdownText = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
      }
    }

    return result.build();
  }
}

class _$LoseGame extends LoseGame {
  @override
  final String markdownText;

  factory _$LoseGame([void Function(LoseGameBuilder)? updates]) =>
      (new LoseGameBuilder()..update(updates))._build();

  _$LoseGame._({required this.markdownText}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        markdownText, r'LoseGame', 'markdownText');
  }

  @override
  LoseGame rebuild(void Function(LoseGameBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  LoseGameBuilder toBuilder() => new LoseGameBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is LoseGame && markdownText == other.markdownText;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, markdownText.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'LoseGame')
          ..add('markdownText', markdownText))
        .toString();
  }
}

class LoseGameBuilder implements Builder<LoseGame, LoseGameBuilder> {
  _$LoseGame? _$v;

  String? _markdownText;
  String? get markdownText => _$this._markdownText;
  set markdownText(String? markdownText) => _$this._markdownText = markdownText;

  LoseGameBuilder();

  LoseGameBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _markdownText = $v.markdownText;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(LoseGame other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$LoseGame;
  }

  @override
  void update(void Function(LoseGameBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  LoseGame build() => _build();

  _$LoseGame _build() {
    final _$result = _$v ??
        new _$LoseGame._(
            markdownText: BuiltValueNullFieldError.checkNotNull(
                markdownText, r'LoseGame', 'markdownText'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
