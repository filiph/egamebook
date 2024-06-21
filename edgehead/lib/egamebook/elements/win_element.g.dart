// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.win;

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
        markdownText, 'WinGame', 'markdownText');
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
    return $jf($jc(0, markdownText.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('WinGame')
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
                markdownText, 'WinGame', 'markdownText'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,no_leading_underscores_for_local_identifiers,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
