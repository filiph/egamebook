// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.command.load_game;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<LoadGame> _$loadGameSerializer = new _$LoadGameSerializer();

class _$LoadGameSerializer implements StructuredSerializer<LoadGame> {
  @override
  final Iterable<Type> types = const [LoadGame, _$LoadGame];
  @override
  final String wireName = 'LoadGame';

  @override
  Iterable<Object?> serialize(Serializers serializers, LoadGame object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'saveGameSerialized',
      serializers.serialize(object.saveGameSerialized,
          specifiedType: const FullType(String)),
    ];

    return result;
  }

  @override
  LoadGame deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new LoadGameBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final Object? value = iterator.current;
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

class _$LoadGame extends LoadGame {
  @override
  final String saveGameSerialized;

  factory _$LoadGame([void Function(LoadGameBuilder)? updates]) =>
      (new LoadGameBuilder()..update(updates)).build();

  _$LoadGame._({required this.saveGameSerialized}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        saveGameSerialized, 'LoadGame', 'saveGameSerialized');
  }

  @override
  LoadGame rebuild(void Function(LoadGameBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  LoadGameBuilder toBuilder() => new LoadGameBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is LoadGame && saveGameSerialized == other.saveGameSerialized;
  }

  @override
  int get hashCode {
    return $jf($jc(0, saveGameSerialized.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('LoadGame')
          ..add('saveGameSerialized', saveGameSerialized))
        .toString();
  }
}

class LoadGameBuilder implements Builder<LoadGame, LoadGameBuilder> {
  _$LoadGame? _$v;

  String? _saveGameSerialized;
  String? get saveGameSerialized => _$this._saveGameSerialized;
  set saveGameSerialized(String? saveGameSerialized) =>
      _$this._saveGameSerialized = saveGameSerialized;

  LoadGameBuilder();

  LoadGameBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _saveGameSerialized = $v.saveGameSerialized;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(LoadGame other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$LoadGame;
  }

  @override
  void update(void Function(LoadGameBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  _$LoadGame build() {
    final _$result = _$v ??
        new _$LoadGame._(
            saveGameSerialized: BuiltValueNullFieldError.checkNotNull(
                saveGameSerialized, 'LoadGame', 'saveGameSerialized'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
