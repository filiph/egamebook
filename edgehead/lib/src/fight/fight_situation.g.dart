// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'fight_situation.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<FightSituation> _$fightSituationSerializer =
    new _$FightSituationSerializer();

class _$FightSituationSerializer
    implements StructuredSerializer<FightSituation> {
  @override
  final Iterable<Type> types = const [FightSituation, _$FightSituation];
  @override
  final String wireName = 'FightSituation';

  @override
  Iterable<Object?> serialize(Serializers serializers, FightSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'droppedItems',
      serializers.serialize(object.droppedItems,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Item)])),
      'droppedItemsOutOfReach',
      serializers.serialize(object.droppedItemsOutOfReach,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Item)])),
      'enemyTeamIds',
      serializers.serialize(object.enemyTeamIds,
          specifiedType: const FullType(BuiltSet, const [const FullType(int)])),
      'events',
      serializers.serialize(object.events,
          specifiedType: const FullType(BuiltMap,
              const [const FullType(int), const FullType(EventCallback)])),
      'groundMaterial',
      serializers.serialize(object.groundMaterial,
          specifiedType: const FullType(String)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'playerTeamIds',
      serializers.serialize(object.playerTeamIds,
          specifiedType: const FullType(BuiltSet, const [const FullType(int)])),
      'roomRoamingSituationId',
      serializers.serialize(object.roomRoamingSituationId,
          specifiedType: const FullType(int)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  FightSituation deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new FightSituationBuilder();

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
        case 'droppedItemsOutOfReach':
          result.droppedItemsOutOfReach.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Item)]))!
              as BuiltList<Object?>);
          break;
        case 'enemyTeamIds':
          result.enemyTeamIds.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltSet, const [const FullType(int)]))!
              as BuiltSet<Object?>);
          break;
        case 'events':
          result.events.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap, const [
                const FullType(int),
                const FullType(EventCallback)
              ]))!);
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
                      const FullType(BuiltSet, const [const FullType(int)]))!
              as BuiltSet<Object?>);
          break;
        case 'roomRoamingSituationId':
          result.roomRoamingSituationId = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
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

class _$FightSituation extends FightSituation {
  @override
  final BuiltList<Item> droppedItems;
  @override
  final BuiltList<Item> droppedItemsOutOfReach;
  @override
  final BuiltSet<int> enemyTeamIds;
  @override
  final BuiltMap<int, EventCallback> events;
  @override
  final String groundMaterial;
  @override
  final int id;
  @override
  final BuiltSet<int> playerTeamIds;
  @override
  final int roomRoamingSituationId;
  @override
  final int turn;

  factory _$FightSituation([void Function(FightSituationBuilder)? updates]) =>
      (new FightSituationBuilder()..update(updates))._build();

  _$FightSituation._(
      {required this.droppedItems,
      required this.droppedItemsOutOfReach,
      required this.enemyTeamIds,
      required this.events,
      required this.groundMaterial,
      required this.id,
      required this.playerTeamIds,
      required this.roomRoamingSituationId,
      required this.turn})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        droppedItems, r'FightSituation', 'droppedItems');
    BuiltValueNullFieldError.checkNotNull(
        droppedItemsOutOfReach, r'FightSituation', 'droppedItemsOutOfReach');
    BuiltValueNullFieldError.checkNotNull(
        enemyTeamIds, r'FightSituation', 'enemyTeamIds');
    BuiltValueNullFieldError.checkNotNull(events, r'FightSituation', 'events');
    BuiltValueNullFieldError.checkNotNull(
        groundMaterial, r'FightSituation', 'groundMaterial');
    BuiltValueNullFieldError.checkNotNull(id, r'FightSituation', 'id');
    BuiltValueNullFieldError.checkNotNull(
        playerTeamIds, r'FightSituation', 'playerTeamIds');
    BuiltValueNullFieldError.checkNotNull(
        roomRoamingSituationId, r'FightSituation', 'roomRoamingSituationId');
    BuiltValueNullFieldError.checkNotNull(turn, r'FightSituation', 'turn');
  }

  @override
  FightSituation rebuild(void Function(FightSituationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  FightSituationBuilder toBuilder() =>
      new FightSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is FightSituation &&
        droppedItems == other.droppedItems &&
        droppedItemsOutOfReach == other.droppedItemsOutOfReach &&
        enemyTeamIds == other.enemyTeamIds &&
        events == other.events &&
        groundMaterial == other.groundMaterial &&
        id == other.id &&
        playerTeamIds == other.playerTeamIds &&
        roomRoamingSituationId == other.roomRoamingSituationId &&
        turn == other.turn;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, droppedItems.hashCode);
    _$hash = $jc(_$hash, droppedItemsOutOfReach.hashCode);
    _$hash = $jc(_$hash, enemyTeamIds.hashCode);
    _$hash = $jc(_$hash, events.hashCode);
    _$hash = $jc(_$hash, groundMaterial.hashCode);
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, playerTeamIds.hashCode);
    _$hash = $jc(_$hash, roomRoamingSituationId.hashCode);
    _$hash = $jc(_$hash, turn.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'FightSituation')
          ..add('droppedItems', droppedItems)
          ..add('droppedItemsOutOfReach', droppedItemsOutOfReach)
          ..add('enemyTeamIds', enemyTeamIds)
          ..add('events', events)
          ..add('groundMaterial', groundMaterial)
          ..add('id', id)
          ..add('playerTeamIds', playerTeamIds)
          ..add('roomRoamingSituationId', roomRoamingSituationId)
          ..add('turn', turn))
        .toString();
  }
}

class FightSituationBuilder
    implements Builder<FightSituation, FightSituationBuilder> {
  _$FightSituation? _$v;

  ListBuilder<Item>? _droppedItems;
  ListBuilder<Item> get droppedItems =>
      _$this._droppedItems ??= new ListBuilder<Item>();
  set droppedItems(ListBuilder<Item>? droppedItems) =>
      _$this._droppedItems = droppedItems;

  ListBuilder<Item>? _droppedItemsOutOfReach;
  ListBuilder<Item> get droppedItemsOutOfReach =>
      _$this._droppedItemsOutOfReach ??= new ListBuilder<Item>();
  set droppedItemsOutOfReach(ListBuilder<Item>? droppedItemsOutOfReach) =>
      _$this._droppedItemsOutOfReach = droppedItemsOutOfReach;

  SetBuilder<int>? _enemyTeamIds;
  SetBuilder<int> get enemyTeamIds =>
      _$this._enemyTeamIds ??= new SetBuilder<int>();
  set enemyTeamIds(SetBuilder<int>? enemyTeamIds) =>
      _$this._enemyTeamIds = enemyTeamIds;

  MapBuilder<int, EventCallback>? _events;
  MapBuilder<int, EventCallback> get events =>
      _$this._events ??= new MapBuilder<int, EventCallback>();
  set events(MapBuilder<int, EventCallback>? events) => _$this._events = events;

  String? _groundMaterial;
  String? get groundMaterial => _$this._groundMaterial;
  set groundMaterial(String? groundMaterial) =>
      _$this._groundMaterial = groundMaterial;

  int? _id;
  int? get id => _$this._id;
  set id(int? id) => _$this._id = id;

  SetBuilder<int>? _playerTeamIds;
  SetBuilder<int> get playerTeamIds =>
      _$this._playerTeamIds ??= new SetBuilder<int>();
  set playerTeamIds(SetBuilder<int>? playerTeamIds) =>
      _$this._playerTeamIds = playerTeamIds;

  int? _roomRoamingSituationId;
  int? get roomRoamingSituationId => _$this._roomRoamingSituationId;
  set roomRoamingSituationId(int? roomRoamingSituationId) =>
      _$this._roomRoamingSituationId = roomRoamingSituationId;

  int? _turn;
  int? get turn => _$this._turn;
  set turn(int? turn) => _$this._turn = turn;

  FightSituationBuilder();

  FightSituationBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _droppedItems = $v.droppedItems.toBuilder();
      _droppedItemsOutOfReach = $v.droppedItemsOutOfReach.toBuilder();
      _enemyTeamIds = $v.enemyTeamIds.toBuilder();
      _events = $v.events.toBuilder();
      _groundMaterial = $v.groundMaterial;
      _id = $v.id;
      _playerTeamIds = $v.playerTeamIds.toBuilder();
      _roomRoamingSituationId = $v.roomRoamingSituationId;
      _turn = $v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(FightSituation other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$FightSituation;
  }

  @override
  void update(void Function(FightSituationBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  FightSituation build() => _build();

  _$FightSituation _build() {
    _$FightSituation _$result;
    try {
      _$result = _$v ??
          new _$FightSituation._(
              droppedItems: droppedItems.build(),
              droppedItemsOutOfReach: droppedItemsOutOfReach.build(),
              enemyTeamIds: enemyTeamIds.build(),
              events: events.build(),
              groundMaterial: BuiltValueNullFieldError.checkNotNull(
                  groundMaterial, r'FightSituation', 'groundMaterial'),
              id: BuiltValueNullFieldError.checkNotNull(
                  id, r'FightSituation', 'id'),
              playerTeamIds: playerTeamIds.build(),
              roomRoamingSituationId: BuiltValueNullFieldError.checkNotNull(
                  roomRoamingSituationId,
                  r'FightSituation',
                  'roomRoamingSituationId'),
              turn: BuiltValueNullFieldError.checkNotNull(
                  turn, r'FightSituation', 'turn'));
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'droppedItems';
        droppedItems.build();
        _$failedField = 'droppedItemsOutOfReach';
        droppedItemsOutOfReach.build();
        _$failedField = 'enemyTeamIds';
        enemyTeamIds.build();
        _$failedField = 'events';
        events.build();

        _$failedField = 'playerTeamIds';
        playerTeamIds.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'FightSituation', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
