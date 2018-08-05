// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.choice_block;

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

Serializer<ChoiceBlock> _$choiceBlockSerializer = new _$ChoiceBlockSerializer();

class _$ChoiceBlockSerializer implements StructuredSerializer<ChoiceBlock> {
  @override
  final Iterable<Type> types = const [ChoiceBlock, _$ChoiceBlock];
  @override
  final String wireName = 'ChoiceBlock';

  @override
  Iterable serialize(Serializers serializers, ChoiceBlock object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'saveGame',
      serializers.serialize(object.saveGame,
          specifiedType: const FullType(SaveGame)),
      'choices',
      serializers.serialize(object.choices,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Choice)])),
    ];

    return result;
  }

  @override
  ChoiceBlock deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ChoiceBlockBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'saveGame':
          result.saveGame.replace(serializers.deserialize(value,
              specifiedType: const FullType(SaveGame)) as SaveGame);
          break;
        case 'choices':
          result.choices.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Choice)]))
              as BuiltList);
          break;
      }
    }

    return result.build();
  }
}

class _$ChoiceBlock extends ChoiceBlock {
  @override
  final SaveGame saveGame;
  @override
  final BuiltList<Choice> choices;

  factory _$ChoiceBlock([void updates(ChoiceBlockBuilder b)]) =>
      (new ChoiceBlockBuilder()..update(updates)).build();

  _$ChoiceBlock._({this.saveGame, this.choices}) : super._() {
    if (saveGame == null)
      throw new BuiltValueNullFieldError('ChoiceBlock', 'saveGame');
    if (choices == null)
      throw new BuiltValueNullFieldError('ChoiceBlock', 'choices');
  }

  @override
  ChoiceBlock rebuild(void updates(ChoiceBlockBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ChoiceBlockBuilder toBuilder() => new ChoiceBlockBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! ChoiceBlock) return false;
    return saveGame == other.saveGame && choices == other.choices;
  }

  @override
  int get hashCode {
    return $jf($jc($jc(0, saveGame.hashCode), choices.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('ChoiceBlock')
          ..add('saveGame', saveGame)
          ..add('choices', choices))
        .toString();
  }
}

class ChoiceBlockBuilder implements Builder<ChoiceBlock, ChoiceBlockBuilder> {
  _$ChoiceBlock _$v;

  SaveGameBuilder _saveGame;
  SaveGameBuilder get saveGame => _$this._saveGame ??= new SaveGameBuilder();
  set saveGame(SaveGameBuilder saveGame) => _$this._saveGame = saveGame;

  ListBuilder<Choice> _choices;
  ListBuilder<Choice> get choices =>
      _$this._choices ??= new ListBuilder<Choice>();
  set choices(ListBuilder<Choice> choices) => _$this._choices = choices;

  ChoiceBlockBuilder();

  ChoiceBlockBuilder get _$this {
    if (_$v != null) {
      _saveGame = _$v.saveGame?.toBuilder();
      _choices = _$v.choices?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ChoiceBlock other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$ChoiceBlock;
  }

  @override
  void update(void updates(ChoiceBlockBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$ChoiceBlock build() {
    _$ChoiceBlock _$result;
    try {
      _$result = _$v ??
          new _$ChoiceBlock._(
              saveGame: saveGame.build(), choices: choices.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'saveGame';
        saveGame.build();
        _$failedField = 'choices';
        choices.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'ChoiceBlock', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}
