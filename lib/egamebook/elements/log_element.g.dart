// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.log;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_returning_this
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

Serializer<LogElement> _$logElementSerializer = new _$LogElementSerializer();

class _$LogElementSerializer implements StructuredSerializer<LogElement> {
  @override
  final Iterable<Type> types = const [LogElement, _$LogElement];
  @override
  final String wireName = 'LogElement';

  @override
  Iterable serialize(Serializers serializers, LogElement object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
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
  LogElement deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new LogElementBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'level':
          result.level = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'message':
          result.message = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
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

  factory _$LogElement([void updates(LogElementBuilder b)]) =>
      (new LogElementBuilder()..update(updates)).build();

  _$LogElement._({this.level, this.message}) : super._() {
    if (level == null) throw new ArgumentError.notNull('level');
    if (message == null) throw new ArgumentError.notNull('message');
  }

  @override
  LogElement rebuild(void updates(LogElementBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  LogElementBuilder toBuilder() => new LogElementBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! LogElement) return false;
    return level == other.level && message == other.message;
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
  _$LogElement _$v;

  String _level;
  String get level => _$this._level;
  set level(String level) => _$this._level = level;

  String _message;
  String get message => _$this._message;
  set message(String message) => _$this._message = message;

  LogElementBuilder();

  LogElementBuilder get _$this {
    if (_$v != null) {
      _level = _$v.level;
      _message = _$v.message;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(LogElement other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$LogElement;
  }

  @override
  void update(void updates(LogElementBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$LogElement build() {
    final _$result = _$v ?? new _$LogElement._(level: level, message: message);
    replace(_$result);
    return _$result;
  }
}
