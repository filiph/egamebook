// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.win;

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

Serializer<WinGame> _$winGameSerializer = new _$WinGameSerializer();

class _$WinGameSerializer implements StructuredSerializer<WinGame> {
  @override
  final Iterable<Type> types = const [WinGame, _$WinGame];
  @override
  final String wireName = 'WinGame';

  @override
  Iterable serialize(Serializers serializers, WinGame object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'markdownText',
      serializers.serialize(object.markdownText,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  WinGame deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new WinGameBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'markdownText':
          result.markdownText = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
      }
    }

    return result.build();
  }
}

class _$WinGame extends WinGame {
  @override
  final String markdownText;

  factory _$WinGame([void updates(WinGameBuilder b)]) =>
      (new WinGameBuilder()..update(updates)).build();

  _$WinGame._({this.markdownText}) : super._() {
    if (markdownText == null) {
      throw new BuiltValueNullFieldError('WinGame', 'markdownText');
    }
  }

  @override
  WinGame rebuild(void updates(WinGameBuilder b)) =>
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
  _$WinGame _$v;

  String _markdownText;
  String get markdownText => _$this._markdownText;
  set markdownText(String markdownText) => _$this._markdownText = markdownText;

  WinGameBuilder();

  WinGameBuilder get _$this {
    if (_$v != null) {
      _markdownText = _$v.markdownText;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(WinGame other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$WinGame;
  }

  @override
  void update(void updates(WinGameBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$WinGame build() {
    final _$result = _$v ?? new _$WinGame._(markdownText: markdownText);
    replace(_$result);
    return _$result;
  }
}
