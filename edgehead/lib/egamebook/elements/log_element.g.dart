// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'log_element.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<LogElement> _$logElementSerializer = new _$LogElementSerializer();

class _$LogElementSerializer implements StructuredSerializer<LogElement> {
  @override
  final Iterable<Type> types = const [LogElement, _$LogElement];
  @override
  final String wireName = 'LogElement';

  @override
  Iterable<Object?> serialize(Serializers serializers, LogElement object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'level',
      serializers.serialize(object.level,
          specifiedType: const FullType(String)),
      'message',
      serializers.serialize(object.message,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  LogElement deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new LogElementBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'level':
          result.level = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'message':
          result.message = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
      }
    }

    return result.build();
  }
}

class _$LogElement extends LogElement {
  @override
  final String level;
  @override
  final String message;

  factory _$LogElement([void Function(LogElementBuilder)? updates]) =>
      (new LogElementBuilder()..update(updates))._build();

  _$LogElement._({required this.level, required this.message}) : super._() {
    BuiltValueNullFieldError.checkNotNull(level, r'LogElement', 'level');
    BuiltValueNullFieldError.checkNotNull(message, r'LogElement', 'message');
  }

  @override
  LogElement rebuild(void Function(LogElementBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  LogElementBuilder toBuilder() => new LogElementBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is LogElement &&
        level == other.level &&
        message == other.message;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, level.hashCode);
    _$hash = $jc(_$hash, message.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'LogElement')
          ..add('level', level)
          ..add('message', message))
        .toString();
  }
}

class LogElementBuilder implements Builder<LogElement, LogElementBuilder> {
  _$LogElement? _$v;

  String? _level;
  String? get level => _$this._level;
  set level(String? level) => _$this._level = level;

  String? _message;
  String? get message => _$this._message;
  set message(String? message) => _$this._message = message;

  LogElementBuilder();

  LogElementBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _level = $v.level;
      _message = $v.message;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(LogElement other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$LogElement;
  }

  @override
  void update(void Function(LogElementBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  LogElement build() => _build();

  _$LogElement _build() {
    final _$result = _$v ??
        new _$LogElement._(
            level: BuiltValueNullFieldError.checkNotNull(
                level, r'LogElement', 'level'),
            message: BuiltValueNullFieldError.checkNotNull(
                message, r'LogElement', 'message'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
