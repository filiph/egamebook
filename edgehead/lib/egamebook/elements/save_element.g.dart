// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.save;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<SaveGame> _$saveGameSerializer = new _$SaveGameSerializer();

class _$SaveGameSerializer implements StructuredSerializer<SaveGame> {
  @override
  final Iterable<Type> types = const [SaveGame, _$SaveGame];
  @override
  final String wireName = 'SaveGame';

  @override
  Iterable<Object?> serialize(Serializers serializers, SaveGame object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'saveGameSerialized',
      serializers.serialize(object.saveGameSerialized,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  SaveGame deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new SaveGameBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'saveGameSerialized':
          result.saveGameSerialized = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
      }
    }

    return result.build();
  }
}

class _$SaveGame extends SaveGame {
  @override
  final String saveGameSerialized;

  factory _$SaveGame([void Function(SaveGameBuilder)? updates]) =>
      (new SaveGameBuilder()..update(updates))._build();

  _$SaveGame._({required this.saveGameSerialized}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        saveGameSerialized, 'SaveGame', 'saveGameSerialized');
  }

  @override
  SaveGame rebuild(void Function(SaveGameBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SaveGameBuilder toBuilder() => new SaveGameBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SaveGame && saveGameSerialized == other.saveGameSerialized;
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
  _$SaveGame? _$v;

  String? _saveGameSerialized;
  String? get saveGameSerialized => _$this._saveGameSerialized;
  set saveGameSerialized(String? saveGameSerialized) =>
      _$this._saveGameSerialized = saveGameSerialized;

  SaveGameBuilder();

  SaveGameBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _saveGameSerialized = $v.saveGameSerialized;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SaveGame other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SaveGame;
  }

  @override
  void update(void Function(SaveGameBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SaveGame build() => _build();

  _$SaveGame _build() {
    final _$result = _$v ??
        new _$SaveGame._(
            saveGameSerialized: BuiltValueNullFieldError.checkNotNull(
                saveGameSerialized, 'SaveGame', 'saveGameSerialized'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,no_leading_underscores_for_local_identifiers,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
