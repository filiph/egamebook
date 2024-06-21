// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'save_element.dart';

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
        saveGameSerialized, r'SaveGame', 'saveGameSerialized');
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
    var _$hash = 0;
    _$hash = $jc(_$hash, saveGameSerialized.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SaveGame')
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
                saveGameSerialized, r'SaveGame', 'saveGameSerialized'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
