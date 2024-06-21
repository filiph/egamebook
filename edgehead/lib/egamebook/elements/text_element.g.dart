// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'text_element.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<TextOutput> _$textOutputSerializer = new _$TextOutputSerializer();

class _$TextOutputSerializer implements StructuredSerializer<TextOutput> {
  @override
  final Iterable<Type> types = const [TextOutput, _$TextOutput];
  @override
  final String wireName = 'TextOutput';

  @override
  Iterable<Object?> serialize(Serializers serializers, TextOutput object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'markdownText',
      serializers.serialize(object.markdownText,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  TextOutput deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new TextOutputBuilder();

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

class _$TextOutput extends TextOutput {
  @override
  final String markdownText;

  factory _$TextOutput([void Function(TextOutputBuilder)? updates]) =>
      (new TextOutputBuilder()..update(updates))._build();

  _$TextOutput._({required this.markdownText}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        markdownText, r'TextOutput', 'markdownText');
  }

  @override
  TextOutput rebuild(void Function(TextOutputBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TextOutputBuilder toBuilder() => new TextOutputBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TextOutput && markdownText == other.markdownText;
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
    return (newBuiltValueToStringHelper(r'TextOutput')
          ..add('markdownText', markdownText))
        .toString();
  }
}

class TextOutputBuilder implements Builder<TextOutput, TextOutputBuilder> {
  _$TextOutput? _$v;

  String? _markdownText;
  String? get markdownText => _$this._markdownText;
  set markdownText(String? markdownText) => _$this._markdownText = markdownText;

  TextOutputBuilder();

  TextOutputBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _markdownText = $v.markdownText;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TextOutput other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$TextOutput;
  }

  @override
  void update(void Function(TextOutputBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TextOutput build() => _build();

  _$TextOutput _build() {
    final _$result = _$v ??
        new _$TextOutput._(
            markdownText: BuiltValueNullFieldError.checkNotNull(
                markdownText, r'TextOutput', 'markdownText'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
