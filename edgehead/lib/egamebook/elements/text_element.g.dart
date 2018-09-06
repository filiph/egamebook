// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.text;

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

Serializer<TextOutput> _$textOutputSerializer = new _$TextOutputSerializer();

class _$TextOutputSerializer implements StructuredSerializer<TextOutput> {
  @override
  final Iterable<Type> types = const [TextOutput, _$TextOutput];
  @override
  final String wireName = 'TextOutput';

  @override
  Iterable serialize(Serializers serializers, TextOutput object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'markdownText',
      serializers.serialize(object.markdownText,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  TextOutput deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new TextOutputBuilder();

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

class _$TextOutput extends TextOutput {
  @override
  final String markdownText;

  factory _$TextOutput([void updates(TextOutputBuilder b)]) =>
      (new TextOutputBuilder()..update(updates)).build();

  _$TextOutput._({this.markdownText}) : super._() {
    if (markdownText == null) {
      throw new BuiltValueNullFieldError('TextOutput', 'markdownText');
    }
  }

  @override
  TextOutput rebuild(void updates(TextOutputBuilder b)) =>
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
    return $jf($jc(0, markdownText.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('TextOutput')
          ..add('markdownText', markdownText))
        .toString();
  }
}

class TextOutputBuilder implements Builder<TextOutput, TextOutputBuilder> {
  _$TextOutput _$v;

  String _markdownText;
  String get markdownText => _$this._markdownText;
  set markdownText(String markdownText) => _$this._markdownText = markdownText;

  TextOutputBuilder();

  TextOutputBuilder get _$this {
    if (_$v != null) {
      _markdownText = _$v.markdownText;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TextOutput other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$TextOutput;
  }

  @override
  void update(void updates(TextOutputBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$TextOutput build() {
    final _$result = _$v ?? new _$TextOutput._(markdownText: markdownText);
    replace(_$result);
    return _$result;
  }
}
