// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.log;

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
    BuiltValueNullFieldError.checkNotNull(level, 'LogElement', 'level');
    BuiltValueNullFieldError.checkNotNull(message, 'LogElement', 'message');
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
    return $jf($jc($jc(0, level.hashCode), message.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('LogElement')
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
                level, 'LogElement', 'level'),
            message: BuiltValueNullFieldError.checkNotNull(
                message, 'LogElement', 'message'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,no_leading_underscores_for_local_identifiers,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
