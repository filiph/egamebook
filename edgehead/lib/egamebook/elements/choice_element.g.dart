// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.choice;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

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
      'command',
      serializers.serialize(object.command,
          specifiedType: const FullType(String)),
      'commandPath',
      serializers.serialize(object.commandPath,
          specifiedType:
              const FullType(BuiltList, const [const FullType(String)])),
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
        case 'command':
          result.command = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'commandPath':
          result.commandPath.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(String)]))
              as BuiltList);
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
  final String command;
  @override
  final BuiltList<String> commandPath;

  factory _$Choice([void updates(ChoiceBuilder b)]) =>
      (new ChoiceBuilder()..update(updates)).build();

  _$Choice._(
      {this.helpMessage, this.isImplicit, this.command, this.commandPath})
      : super._() {
    if (isImplicit == null) {
      throw new BuiltValueNullFieldError('Choice', 'isImplicit');
    }
    if (command == null) {
      throw new BuiltValueNullFieldError('Choice', 'command');
    }
    if (commandPath == null) {
      throw new BuiltValueNullFieldError('Choice', 'commandPath');
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
        command == other.command &&
        commandPath == other.commandPath;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, helpMessage.hashCode), isImplicit.hashCode),
            command.hashCode),
        commandPath.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Choice')
          ..add('helpMessage', helpMessage)
          ..add('isImplicit', isImplicit)
          ..add('command', command)
          ..add('commandPath', commandPath))
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

  String _command;
  String get command => _$this._command;
  set command(String command) => _$this._command = command;

  ListBuilder<String> _commandPath;
  ListBuilder<String> get commandPath =>
      _$this._commandPath ??= new ListBuilder<String>();
  set commandPath(ListBuilder<String> commandPath) =>
      _$this._commandPath = commandPath;

  ChoiceBuilder();

  ChoiceBuilder get _$this {
    if (_$v != null) {
      _helpMessage = _$v.helpMessage;
      _isImplicit = _$v.isImplicit;
      _command = _$v.command;
      _commandPath = _$v.commandPath?.toBuilder();
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
    _$Choice _$result;
    try {
      _$result = _$v ??
          new _$Choice._(
              helpMessage: helpMessage,
              isImplicit: isImplicit,
              command: command,
              commandPath: commandPath.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'commandPath';
        commandPath.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'Choice', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
