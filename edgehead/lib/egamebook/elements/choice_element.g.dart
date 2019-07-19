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
  Iterable<Object> serialize(Serializers serializers, Choice object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'successChance',
      serializers.serialize(object.successChance,
          specifiedType: const FullType(double)),
      'commandPath',
      serializers.serialize(object.commandPath,
          specifiedType:
              const FullType(BuiltList, const [const FullType(String)])),
      'isImplicit',
      serializers.serialize(object.isImplicit,
          specifiedType: const FullType(bool)),
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
  Choice deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ChoiceBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'successChance':
          result.successChance = serializers.deserialize(value,
              specifiedType: const FullType(double)) as double;
          break;
        case 'commandPath':
          result.commandPath.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(String)]))
              as BuiltList<dynamic>);
          break;
        case 'helpMessage':
          result.helpMessage = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'isImplicit':
          result.isImplicit = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$Choice extends Choice {
  @override
  final double successChance;
  @override
  final BuiltList<String> commandPath;
  @override
  final String helpMessage;
  @override
  final bool isImplicit;

  factory _$Choice([void Function(ChoiceBuilder) updates]) =>
      (new ChoiceBuilder()..update(updates)).build();

  _$Choice._(
      {this.successChance, this.commandPath, this.helpMessage, this.isImplicit})
      : super._() {
    if (successChance == null) {
      throw new BuiltValueNullFieldError('Choice', 'successChance');
    }
    if (commandPath == null) {
      throw new BuiltValueNullFieldError('Choice', 'commandPath');
    }
    if (isImplicit == null) {
      throw new BuiltValueNullFieldError('Choice', 'isImplicit');
    }
  }

  @override
  Choice rebuild(void Function(ChoiceBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ChoiceBuilder toBuilder() => new ChoiceBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Choice &&
        successChance == other.successChance &&
        commandPath == other.commandPath &&
        helpMessage == other.helpMessage &&
        isImplicit == other.isImplicit;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, successChance.hashCode), commandPath.hashCode),
            helpMessage.hashCode),
        isImplicit.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Choice')
          ..add('successChance', successChance)
          ..add('commandPath', commandPath)
          ..add('helpMessage', helpMessage)
          ..add('isImplicit', isImplicit))
        .toString();
  }
}

class ChoiceBuilder implements Builder<Choice, ChoiceBuilder> {
  _$Choice _$v;

  double _successChance;
  double get successChance => _$this._successChance;
  set successChance(double successChance) =>
      _$this._successChance = successChance;

  ListBuilder<String> _commandPath;
  ListBuilder<String> get commandPath =>
      _$this._commandPath ??= new ListBuilder<String>();
  set commandPath(ListBuilder<String> commandPath) =>
      _$this._commandPath = commandPath;

  String _helpMessage;
  String get helpMessage => _$this._helpMessage;
  set helpMessage(String helpMessage) => _$this._helpMessage = helpMessage;

  bool _isImplicit;
  bool get isImplicit => _$this._isImplicit;
  set isImplicit(bool isImplicit) => _$this._isImplicit = isImplicit;

  ChoiceBuilder();

  ChoiceBuilder get _$this {
    if (_$v != null) {
      _successChance = _$v.successChance;
      _commandPath = _$v.commandPath?.toBuilder();
      _helpMessage = _$v.helpMessage;
      _isImplicit = _$v.isImplicit;
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
  void update(void Function(ChoiceBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$Choice build() {
    _$Choice _$result;
    try {
      _$result = _$v ??
          new _$Choice._(
              successChance: successChance,
              commandPath: commandPath.build(),
              helpMessage: helpMessage,
              isImplicit: isImplicit);
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

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
