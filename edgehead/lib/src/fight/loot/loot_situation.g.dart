// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'loot_situation.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<LootSituation> _$lootSituationSerializer =
    new _$LootSituationSerializer();

class _$LootSituationSerializer implements StructuredSerializer<LootSituation> {
  @override
  final Iterable<Type> types = const [LootSituation, _$LootSituation];
  @override
  final String wireName = 'LootSituation';

  @override
  Iterable<Object?> serialize(Serializers serializers, LootSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'droppedItems',
      serializers.serialize(object.droppedItems,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Item)])),
      'groundMaterial',
      serializers.serialize(object.groundMaterial,
          specifiedType: const FullType(String)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'playerTeamIds',
      serializers.serialize(object.playerTeamIds,
          specifiedType:
              const FullType(BuiltList, const [const FullType(int)])),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  LootSituation deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new LootSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'droppedItems':
          result.droppedItems.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Item)]))!
              as BuiltList<Object?>);
          break;
        case 'groundMaterial':
          result.groundMaterial = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'playerTeamIds':
          result.playerTeamIds.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(int)]))!
              as BuiltList<Object?>);
          break;
        case 'turn':
          result.turn = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
      }
    }

    return result.build();
  }
}

class _$LootSituation extends LootSituation {
  @override
  final BuiltList<Item> droppedItems;
  @override
  final String groundMaterial;
  @override
  final int id;
  @override
  final BuiltList<int> playerTeamIds;
  @override
  final int turn;

  factory _$LootSituation([void Function(LootSituationBuilder)? updates]) =>
      (new LootSituationBuilder()..update(updates))._build();

  _$LootSituation._(
      {required this.droppedItems,
      required this.groundMaterial,
      required this.id,
      required this.playerTeamIds,
      required this.turn})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        droppedItems, r'LootSituation', 'droppedItems');
    BuiltValueNullFieldError.checkNotNull(
        groundMaterial, r'LootSituation', 'groundMaterial');
    BuiltValueNullFieldError.checkNotNull(id, r'LootSituation', 'id');
    BuiltValueNullFieldError.checkNotNull(
        playerTeamIds, r'LootSituation', 'playerTeamIds');
    BuiltValueNullFieldError.checkNotNull(turn, r'LootSituation', 'turn');
  }

  @override
  LootSituation rebuild(void Function(LootSituationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  LootSituationBuilder toBuilder() => new LootSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is LootSituation &&
        droppedItems == other.droppedItems &&
        groundMaterial == other.groundMaterial &&
        id == other.id &&
        playerTeamIds == other.playerTeamIds &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, droppedItems.hashCode);
    _$hash = $jc(_$hash, groundMaterial.hashCode);
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, playerTeamIds.hashCode);
    _$hash = $jc(_$hash, turn.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'LootSituation')
          ..add('droppedItems', droppedItems)
          ..add('groundMaterial', groundMaterial)
          ..add('id', id)
          ..add('playerTeamIds', playerTeamIds)
          ..add('turn', turn))
        .toString();
  }
}

class LootSituationBuilder
    implements Builder<LootSituation, LootSituationBuilder> {
  _$LootSituation? _$v;

  ListBuilder<Item>? _droppedItems;
  ListBuilder<Item> get droppedItems =>
      _$this._droppedItems ??= new ListBuilder<Item>();
  set droppedItems(ListBuilder<Item>? droppedItems) =>
      _$this._droppedItems = droppedItems;

  String? _groundMaterial;
  String? get groundMaterial => _$this._groundMaterial;
  set groundMaterial(String? groundMaterial) =>
      _$this._groundMaterial = groundMaterial;

  int? _id;
  int? get id => _$this._id;
  set id(int? id) => _$this._id = id;

  ListBuilder<int>? _playerTeamIds;
  ListBuilder<int> get playerTeamIds =>
      _$this._playerTeamIds ??= new ListBuilder<int>();
  set playerTeamIds(ListBuilder<int>? playerTeamIds) =>
      _$this._playerTeamIds = playerTeamIds;

  int? _turn;
  int? get turn => _$this._turn;
  set turn(int? turn) => _$this._turn = turn;

  LootSituationBuilder();

  LootSituationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _droppedItems = $v.droppedItems.toBuilder();
      _groundMaterial = $v.groundMaterial;
      _id = $v.id;
      _playerTeamIds = $v.playerTeamIds.toBuilder();
      _turn = $v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(LootSituation other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$LootSituation;
  }

  @override
  void update(void Function(LootSituationBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  LootSituation build() => _build();

  _$LootSituation _build() {
    _$LootSituation _$result;
    try {
      _$result = _$v ??
          new _$LootSituation._(
              droppedItems: droppedItems.build(),
              groundMaterial: BuiltValueNullFieldError.checkNotNull(
                  groundMaterial, r'LootSituation', 'groundMaterial'),
              id: BuiltValueNullFieldError.checkNotNull(
                  id, r'LootSituation', 'id'),
              playerTeamIds: playerTeamIds.build(),
              turn: BuiltValueNullFieldError.checkNotNull(
                  turn, r'LootSituation', 'turn'));
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'droppedItems';
        droppedItems.build();

        _$failedField = 'playerTeamIds';
        playerTeamIds.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'LootSituation', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
