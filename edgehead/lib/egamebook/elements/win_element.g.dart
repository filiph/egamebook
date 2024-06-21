// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'win_element.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<WinGame> _$winGameSerializer = new _$WinGameSerializer();

class _$WinGameSerializer implements StructuredSerializer<WinGame> {
  @override
  final Iterable<Type> types = const [WinGame, _$WinGame];
  @override
  final String wireName = 'WinGame';

  @override
  Iterable<Object?> serialize(Serializers serializers, WinGame object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'markdownText',
      serializers.serialize(object.markdownText,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  WinGame deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new WinGameBuilder();

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

class _$WinGame extends WinGame {
  @override
  final String markdownText;

  factory _$WinGame([void Function(WinGameBuilder)? updates]) =>
      (new WinGameBuilder()..update(updates))._build();

  _$WinGame._({required this.markdownText}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        markdownText, r'WinGame', 'markdownText');
  }

  @override
  WinGame rebuild(void Function(WinGameBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  WinGameBuilder toBuilder() => new WinGameBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is WinGame && markdownText == other.markdownText;
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
    return (newBuiltValueToStringHelper(r'WinGame')
          ..add('markdownText', markdownText))
        .toString();
  }
}

class WinGameBuilder implements Builder<WinGame, WinGameBuilder> {
  _$WinGame? _$v;

  String? _markdownText;
  String? get markdownText => _$this._markdownText;
  set markdownText(String? markdownText) => _$this._markdownText = markdownText;

  WinGameBuilder();

  WinGameBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _markdownText = $v.markdownText;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(WinGame other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$WinGame;
  }

  @override
  void update(void Function(WinGameBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  WinGame build() => _build();

  _$WinGame _build() {
    final _$result = _$v ??
        new _$WinGame._(
            markdownText: BuiltValueNullFieldError.checkNotNull(
                markdownText, r'WinGame', 'markdownText'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
