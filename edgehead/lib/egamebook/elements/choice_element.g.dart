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
      'actionName',
      serializers.serialize(object.actionName,
          specifiedType: const FullType(String)),
      'additionalData',
      serializers.serialize(object.additionalData,
          specifiedType:
              const FullType(BuiltList, const [const FullType(int)])),
      'additionalStrings',
      serializers.serialize(object.additionalStrings,
          specifiedType: const FullType(BuiltMap,
              const [const FullType(String), const FullType(String)])),
      'commandPath',
      serializers.serialize(object.commandPath,
          specifiedType:
              const FullType(BuiltList, const [const FullType(String)])),
      'commandSentence',
      serializers.serialize(object.commandSentence,
          specifiedType: const FullType(String)),
      'isImplicit',
      serializers.serialize(object.isImplicit,
          specifiedType: const FullType(bool)),
      'successChance',
      serializers.serialize(object.successChance,
          specifiedType: const FullType(double)),
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
        case 'actionName':
          result.actionName = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'additionalData':
          result.additionalData.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(int)]))
              as BuiltList<dynamic>);
          break;
        case 'additionalStrings':
          result.additionalStrings.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap, const [
                const FullType(String),
                const FullType(String)
              ])) as BuiltMap<dynamic, dynamic>);
          break;
        case 'commandPath':
          result.commandPath.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(String)]))
              as BuiltList<dynamic>);
          break;
        case 'commandSentence':
          result.commandSentence = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'helpMessage':
          result.helpMessage = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'isImplicit':
          result.isImplicit = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'successChance':
          result.successChance = serializers.deserialize(value,
              specifiedType: const FullType(double)) as double;
          break;
      }
    }

    return result.build();
  }
}

class _$Choice extends Choice {
  @override
  final String actionName;
  @override
  final BuiltList<int> additionalData;
  @override
  final BuiltMap<String, String> additionalStrings;
  @override
  final BuiltList<String> commandPath;
  @override
  final String commandSentence;
  @override
  final String helpMessage;
  @override
  final bool isImplicit;
  @override
  final double successChance;

  factory _$Choice([void Function(ChoiceBuilder) updates]) =>
      (new ChoiceBuilder()..update(updates)).build();

  _$Choice._(
      {this.actionName,
      this.additionalData,
      this.additionalStrings,
      this.commandPath,
      this.commandSentence,
      this.helpMessage,
      this.isImplicit,
      this.successChance})
      : super._() {
    if (actionName == null) {
      throw new BuiltValueNullFieldError('Choice', 'actionName');
    }
    if (additionalData == null) {
      throw new BuiltValueNullFieldError('Choice', 'additionalData');
    }
    if (additionalStrings == null) {
      throw new BuiltValueNullFieldError('Choice', 'additionalStrings');
    }
    if (commandPath == null) {
      throw new BuiltValueNullFieldError('Choice', 'commandPath');
    }
    if (commandSentence == null) {
      throw new BuiltValueNullFieldError('Choice', 'commandSentence');
    }
    if (isImplicit == null) {
      throw new BuiltValueNullFieldError('Choice', 'isImplicit');
    }
    if (successChance == null) {
      throw new BuiltValueNullFieldError('Choice', 'successChance');
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
        actionName == other.actionName &&
        additionalData == other.additionalData &&
        additionalStrings == other.additionalStrings &&
        commandPath == other.commandPath &&
        commandSentence == other.commandSentence &&
        helpMessage == other.helpMessage &&
        isImplicit == other.isImplicit &&
        successChance == other.successChance;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc(
                        $jc(
                            $jc($jc(0, actionName.hashCode),
                                additionalData.hashCode),
                            additionalStrings.hashCode),
                        commandPath.hashCode),
                    commandSentence.hashCode),
                helpMessage.hashCode),
            isImplicit.hashCode),
        successChance.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Choice')
          ..add('actionName', actionName)
          ..add('additionalData', additionalData)
          ..add('additionalStrings', additionalStrings)
          ..add('commandPath', commandPath)
          ..add('commandSentence', commandSentence)
          ..add('helpMessage', helpMessage)
          ..add('isImplicit', isImplicit)
          ..add('successChance', successChance))
        .toString();
  }
}

class ChoiceBuilder implements Builder<Choice, ChoiceBuilder> {
  _$Choice _$v;

  String _actionName;
  String get actionName => _$this._actionName;
  set actionName(String actionName) => _$this._actionName = actionName;

  ListBuilder<int> _additionalData;
  ListBuilder<int> get additionalData =>
      _$this._additionalData ??= new ListBuilder<int>();
  set additionalData(ListBuilder<int> additionalData) =>
      _$this._additionalData = additionalData;

  MapBuilder<String, String> _additionalStrings;
  MapBuilder<String, String> get additionalStrings =>
      _$this._additionalStrings ??= new MapBuilder<String, String>();
  set additionalStrings(MapBuilder<String, String> additionalStrings) =>
      _$this._additionalStrings = additionalStrings;

  ListBuilder<String> _commandPath;
  ListBuilder<String> get commandPath =>
      _$this._commandPath ??= new ListBuilder<String>();
  set commandPath(ListBuilder<String> commandPath) =>
      _$this._commandPath = commandPath;

  String _commandSentence;
  String get commandSentence => _$this._commandSentence;
  set commandSentence(String commandSentence) =>
      _$this._commandSentence = commandSentence;

  String _helpMessage;
  String get helpMessage => _$this._helpMessage;
  set helpMessage(String helpMessage) => _$this._helpMessage = helpMessage;

  bool _isImplicit;
  bool get isImplicit => _$this._isImplicit;
  set isImplicit(bool isImplicit) => _$this._isImplicit = isImplicit;

  double _successChance;
  double get successChance => _$this._successChance;
  set successChance(double successChance) =>
      _$this._successChance = successChance;

  ChoiceBuilder();

  ChoiceBuilder get _$this {
    if (_$v != null) {
      _actionName = _$v.actionName;
      _additionalData = _$v.additionalData?.toBuilder();
      _additionalStrings = _$v.additionalStrings?.toBuilder();
      _commandPath = _$v.commandPath?.toBuilder();
      _commandSentence = _$v.commandSentence;
      _helpMessage = _$v.helpMessage;
      _isImplicit = _$v.isImplicit;
      _successChance = _$v.successChance;
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
              actionName: actionName,
              additionalData: additionalData.build(),
              additionalStrings: additionalStrings.build(),
              commandPath: commandPath.build(),
              commandSentence: commandSentence,
              helpMessage: helpMessage,
              isImplicit: isImplicit,
              successChance: successChance);
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'additionalData';
        additionalData.build();
        _$failedField = 'additionalStrings';
        additionalStrings.build();
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
