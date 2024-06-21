// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'choice_element.dart';

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
  Iterable<Object?> serialize(Serializers serializers, Choice object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
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
    Object? value;
    value = object.helpMessage;
    if (value != null) {
      result
        ..add('helpMessage')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(String)));
    }
    return result;
  }

  @override
  Choice deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ChoiceBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'actionName':
          result.actionName = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'additionalData':
          result.additionalData.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(int)]))!
              as BuiltList<Object?>);
          break;
        case 'additionalStrings':
          result.additionalStrings.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap,
                  const [const FullType(String), const FullType(String)]))!);
          break;
        case 'commandPath':
          result.commandPath.replace(serializers.deserialize(value,
                  specifiedType: const FullType(
                      BuiltList, const [const FullType(String)]))!
              as BuiltList<Object?>);
          break;
        case 'commandSentence':
          result.commandSentence = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'helpMessage':
          result.helpMessage = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String?;
          break;
        case 'isImplicit':
          result.isImplicit = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'successChance':
          result.successChance = serializers.deserialize(value,
              specifiedType: const FullType(double))! as double;
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
  final String? helpMessage;
  @override
  final bool isImplicit;
  @override
  final double successChance;

  factory _$Choice([void Function(ChoiceBuilder)? updates]) =>
      (new ChoiceBuilder()..update(updates))._build();

  _$Choice._(
      {required this.actionName,
      required this.additionalData,
      required this.additionalStrings,
      required this.commandPath,
      required this.commandSentence,
      this.helpMessage,
      required this.isImplicit,
      required this.successChance})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(actionName, r'Choice', 'actionName');
    BuiltValueNullFieldError.checkNotNull(
        additionalData, r'Choice', 'additionalData');
    BuiltValueNullFieldError.checkNotNull(
        additionalStrings, r'Choice', 'additionalStrings');
    BuiltValueNullFieldError.checkNotNull(
        commandPath, r'Choice', 'commandPath');
    BuiltValueNullFieldError.checkNotNull(
        commandSentence, r'Choice', 'commandSentence');
    BuiltValueNullFieldError.checkNotNull(isImplicit, r'Choice', 'isImplicit');
    BuiltValueNullFieldError.checkNotNull(
        successChance, r'Choice', 'successChance');
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
    var _$hash = 0;
    _$hash = $jc(_$hash, actionName.hashCode);
    _$hash = $jc(_$hash, additionalData.hashCode);
    _$hash = $jc(_$hash, additionalStrings.hashCode);
    _$hash = $jc(_$hash, commandPath.hashCode);
    _$hash = $jc(_$hash, commandSentence.hashCode);
    _$hash = $jc(_$hash, helpMessage.hashCode);
    _$hash = $jc(_$hash, isImplicit.hashCode);
    _$hash = $jc(_$hash, successChance.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'Choice')
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
  _$Choice? _$v;

  String? _actionName;
  String? get actionName => _$this._actionName;
  set actionName(String? actionName) => _$this._actionName = actionName;

  ListBuilder<int>? _additionalData;
  ListBuilder<int> get additionalData =>
      _$this._additionalData ??= new ListBuilder<int>();
  set additionalData(ListBuilder<int>? additionalData) =>
      _$this._additionalData = additionalData;

  MapBuilder<String, String>? _additionalStrings;
  MapBuilder<String, String> get additionalStrings =>
      _$this._additionalStrings ??= new MapBuilder<String, String>();
  set additionalStrings(MapBuilder<String, String>? additionalStrings) =>
      _$this._additionalStrings = additionalStrings;

  ListBuilder<String>? _commandPath;
  ListBuilder<String> get commandPath =>
      _$this._commandPath ??= new ListBuilder<String>();
  set commandPath(ListBuilder<String>? commandPath) =>
      _$this._commandPath = commandPath;

  String? _commandSentence;
  String? get commandSentence => _$this._commandSentence;
  set commandSentence(String? commandSentence) =>
      _$this._commandSentence = commandSentence;

  String? _helpMessage;
  String? get helpMessage => _$this._helpMessage;
  set helpMessage(String? helpMessage) => _$this._helpMessage = helpMessage;

  bool? _isImplicit;
  bool? get isImplicit => _$this._isImplicit;
  set isImplicit(bool? isImplicit) => _$this._isImplicit = isImplicit;

  double? _successChance;
  double? get successChance => _$this._successChance;
  set successChance(double? successChance) =>
      _$this._successChance = successChance;

  ChoiceBuilder();

  ChoiceBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _actionName = $v.actionName;
      _additionalData = $v.additionalData.toBuilder();
      _additionalStrings = $v.additionalStrings.toBuilder();
      _commandPath = $v.commandPath.toBuilder();
      _commandSentence = $v.commandSentence;
      _helpMessage = $v.helpMessage;
      _isImplicit = $v.isImplicit;
      _successChance = $v.successChance;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Choice other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$Choice;
  }

  @override
  void update(void Function(ChoiceBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  Choice build() => _build();

  _$Choice _build() {
    _$Choice _$result;
    try {
      _$result = _$v ??
          new _$Choice._(
              actionName: BuiltValueNullFieldError.checkNotNull(
                  actionName, r'Choice', 'actionName'),
              additionalData: additionalData.build(),
              additionalStrings: additionalStrings.build(),
              commandPath: commandPath.build(),
              commandSentence: BuiltValueNullFieldError.checkNotNull(
                  commandSentence, r'Choice', 'commandSentence'),
              helpMessage: helpMessage,
              isImplicit: BuiltValueNullFieldError.checkNotNull(
                  isImplicit, r'Choice', 'isImplicit'),
              successChance: BuiltValueNullFieldError.checkNotNull(
                  successChance, r'Choice', 'successChance'));
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'additionalData';
        additionalData.build();
        _$failedField = 'additionalStrings';
        additionalStrings.build();
        _$failedField = 'commandPath';
        commandPath.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'Choice', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
