// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'error_element.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<ErrorElement> _$errorElementSerializer =
    new _$ErrorElementSerializer();

class _$ErrorElementSerializer implements StructuredSerializer<ErrorElement> {
  @override
  final Iterable<Type> types = const [ErrorElement, _$ErrorElement];
  @override
  final String wireName = 'ErrorElement';

  @override
  Iterable<Object?> serialize(Serializers serializers, ErrorElement object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
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
  ErrorElement deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ErrorElementBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'message':
          result.message = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'stackTrace':
          result.stackTrace = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
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

  factory _$ErrorElement([void Function(ErrorElementBuilder)? updates]) =>
      (new ErrorElementBuilder()..update(updates))._build();

  _$ErrorElement._({required this.message, required this.stackTrace})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(message, r'ErrorElement', 'message');
    BuiltValueNullFieldError.checkNotNull(
        stackTrace, r'ErrorElement', 'stackTrace');
  }

  @override
  ErrorElement rebuild(void Function(ErrorElementBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ErrorElementBuilder toBuilder() => new ErrorElementBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ErrorElement &&
        message == other.message &&
        stackTrace == other.stackTrace;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, message.hashCode);
    _$hash = $jc(_$hash, stackTrace.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'ErrorElement')
          ..add('message', message)
          ..add('stackTrace', stackTrace))
        .toString();
  }
}

class ErrorElementBuilder
    implements Builder<ErrorElement, ErrorElementBuilder> {
  _$ErrorElement? _$v;

  String? _message;
  String? get message => _$this._message;
  set message(String? message) => _$this._message = message;

  String? _stackTrace;
  String? get stackTrace => _$this._stackTrace;
  set stackTrace(String? stackTrace) => _$this._stackTrace = stackTrace;

  ErrorElementBuilder();

  ErrorElementBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _message = $v.message;
      _stackTrace = $v.stackTrace;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ErrorElement other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ErrorElement;
  }

  @override
  void update(void Function(ErrorElementBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  ErrorElement build() => _build();

  _$ErrorElement _build() {
    final _$result = _$v ??
        new _$ErrorElement._(
            message: BuiltValueNullFieldError.checkNotNull(
                message, r'ErrorElement', 'message'),
            stackTrace: BuiltValueNullFieldError.checkNotNull(
                stackTrace, r'ErrorElement', 'stackTrace'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
