// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.choice;

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

Serializer<Choice> _$choiceSerializer = new _$ChoiceSerializer();

class _$ChoiceSerializer implements StructuredSerializer<Choice> {
  @override
  final Iterable<Type> types = const [Choice, _$Choice];
  @override
  final String wireName = 'Choice';

  @override
  Iterable serialize(Serializers serializers, Choice object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'isImplicit',
      serializers.serialize(object.isImplicit,
          specifiedType: const FullType(bool)),
      'markdownText',
      serializers.serialize(object.markdownText,
          specifiedType: const FullType(String)),
    ];
    if (object.helpMessage != null) {
      result
        ..add('helpMessage')
        ..add(serializers.serialize(object.helpMessage,
            specifiedType: const FullType(String)));
    }

    return result;
  }

  @override
  Choice deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ChoiceBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'helpMessage':
          result.helpMessage = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'isImplicit':
          result.isImplicit = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'markdownText':
          result.markdownText = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
      }
    }

    return result.build();
  }
}

class _$Choice extends Choice {
  @override
  final String helpMessage;
  @override
  final bool isImplicit;
  @override
  final String markdownText;

  factory _$Choice([void updates(ChoiceBuilder b)]) =>
      (new ChoiceBuilder()..update(updates)).build();

  _$Choice._({this.helpMessage, this.isImplicit, this.markdownText})
      : super._() {
    if (isImplicit == null) {
      throw new BuiltValueNullFieldError('Choice', 'isImplicit');
    }
    if (markdownText == null) {
      throw new BuiltValueNullFieldError('Choice', 'markdownText');
    }
  }

  @override
  Choice rebuild(void updates(ChoiceBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ChoiceBuilder toBuilder() => new ChoiceBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Choice &&
        helpMessage == other.helpMessage &&
        isImplicit == other.isImplicit &&
        markdownText == other.markdownText;
  }

  @override
  int get hashCode {
    return $jf($jc($jc($jc(0, helpMessage.hashCode), isImplicit.hashCode),
        markdownText.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Choice')
          ..add('helpMessage', helpMessage)
          ..add('isImplicit', isImplicit)
          ..add('markdownText', markdownText))
        .toString();
  }
}

class ChoiceBuilder implements Builder<Choice, ChoiceBuilder> {
  _$Choice _$v;

  String _helpMessage;
  String get helpMessage => _$this._helpMessage;
  set helpMessage(String helpMessage) => _$this._helpMessage = helpMessage;

  bool _isImplicit;
  bool get isImplicit => _$this._isImplicit;
  set isImplicit(bool isImplicit) => _$this._isImplicit = isImplicit;

  String _markdownText;
  String get markdownText => _$this._markdownText;
  set markdownText(String markdownText) => _$this._markdownText = markdownText;

  ChoiceBuilder();

  ChoiceBuilder get _$this {
    if (_$v != null) {
      _helpMessage = _$v.helpMessage;
      _isImplicit = _$v.isImplicit;
      _markdownText = _$v.markdownText;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Choice other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$Choice;
  }

  @override
  void update(void updates(ChoiceBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$Choice build() {
    final _$result = _$v ??
        new _$Choice._(
            helpMessage: helpMessage,
            isImplicit: isImplicit,
            markdownText: markdownText);
    replace(_$result);
    return _$result;
  }
}
