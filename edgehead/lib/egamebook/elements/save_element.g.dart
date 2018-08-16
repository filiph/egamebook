// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.save;

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

Serializer<SaveGame> _$saveGameSerializer = new _$SaveGameSerializer();

class _$SaveGameSerializer implements StructuredSerializer<SaveGame> {
  @override
  final Iterable<Type> types = const [SaveGame, _$SaveGame];
  @override
  final String wireName = 'SaveGame';

  @override
  Iterable serialize(Serializers serializers, SaveGame object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'saveGameSerialized',
      serializers.serialize(object.saveGameSerialized,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  SaveGame deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new SaveGameBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'saveGameSerialized':
          result.saveGameSerialized = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
      }
    }

    return result.build();
  }
}

class _$SaveGame extends SaveGame {
  @override
  final String saveGameSerialized;

  factory _$SaveGame([void updates(SaveGameBuilder b)]) =>
      (new SaveGameBuilder()..update(updates)).build();

  _$SaveGame._({this.saveGameSerialized}) : super._() {
    if (saveGameSerialized == null)
      throw new BuiltValueNullFieldError('SaveGame', 'saveGameSerialized');
  }

  @override
  SaveGame rebuild(void updates(SaveGameBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  SaveGameBuilder toBuilder() => new SaveGameBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! SaveGame) return false;
    return saveGameSerialized == other.saveGameSerialized;
  }

  @override
  int get hashCode {
    return $jf($jc(0, saveGameSerialized.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('SaveGame')
          ..add('saveGameSerialized', saveGameSerialized))
        .toString();
  }
}

class SaveGameBuilder implements Builder<SaveGame, SaveGameBuilder> {
  _$SaveGame _$v;

  String _saveGameSerialized;
  String get saveGameSerialized => _$this._saveGameSerialized;
  set saveGameSerialized(String saveGameSerialized) =>
      _$this._saveGameSerialized = saveGameSerialized;

  SaveGameBuilder();

  SaveGameBuilder get _$this {
    if (_$v != null) {
      _saveGameSerialized = _$v.saveGameSerialized;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SaveGame other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$SaveGame;
  }

  @override
  void update(void updates(SaveGameBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$SaveGame build() {
    final _$result =
        _$v ?? new _$SaveGame._(saveGameSerialized: saveGameSerialized);
    replace(_$result);
    return _$result;
  }
}
