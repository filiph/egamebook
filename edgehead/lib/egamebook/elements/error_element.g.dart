// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.error;

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

Serializer<ErrorElement> _$errorElementSerializer =
    new _$ErrorElementSerializer();

class _$ErrorElementSerializer implements StructuredSerializer<ErrorElement> {
  @override
  final Iterable<Type> types = const [ErrorElement, _$ErrorElement];
  @override
  final String wireName = 'ErrorElement';

  @override
  Iterable serialize(Serializers serializers, ErrorElement object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'message',
      serializers.serialize(object.message,
          specifiedType: const FullType(String)),
      'stackTrace',
      serializers.serialize(object.stackTrace,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  ErrorElement deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ErrorElementBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'message':
          result.message = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'stackTrace':
          result.stackTrace = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
      }
    }

    return result.build();
  }
}

class _$ErrorElement extends ErrorElement {
  @override
  final String message;
  @override
  final String stackTrace;

  factory _$ErrorElement([void updates(ErrorElementBuilder b)]) =>
      (new ErrorElementBuilder()..update(updates)).build();

  _$ErrorElement._({this.message, this.stackTrace}) : super._() {
    if (message == null)
      throw new BuiltValueNullFieldError('ErrorElement', 'message');
    if (stackTrace == null)
      throw new BuiltValueNullFieldError('ErrorElement', 'stackTrace');
  }

  @override
  ErrorElement rebuild(void updates(ErrorElementBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ErrorElementBuilder toBuilder() => new ErrorElementBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! ErrorElement) return false;
    return message == other.message && stackTrace == other.stackTrace;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, message.hashCode), stackTrace.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('ErrorElement')
          ..add('message', message)
          ..add('stackTrace', stackTrace))
        .toString();
  }
}

class ErrorElementBuilder
    implements Builder<ErrorElement, ErrorElementBuilder> {
  _$ErrorElement _$v;

  String _message;
  String get message => _$this._message;
  set message(String message) => _$this._message = message;

  String _stackTrace;
  String get stackTrace => _$this._stackTrace;
  set stackTrace(String stackTrace) => _$this._stackTrace = stackTrace;

  ErrorElementBuilder();

  ErrorElementBuilder get _$this {
    if (_$v != null) {
      _message = _$v.message;
      _stackTrace = _$v.stackTrace;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ErrorElement other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$ErrorElement;
  }

  @override
  void update(void updates(ErrorElementBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$ErrorElement build() {
    final _$result =
        _$v ?? new _$ErrorElement._(message: message, stackTrace: stackTrace);
    replace(_$result);
    return _$result;
  }
}
