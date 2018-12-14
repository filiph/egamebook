// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.fight_situation;

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
  Iterable serialize(Serializers serializers, FightSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
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
          specifiedType:
              const FullType(BuiltList, const [const FullType(int)])),
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
          specifiedType:
              const FullType(BuiltList, const [const FullType(int)])),
      'roomRoamingSituationId',
      serializers.serialize(object.roomRoamingSituationId,
          specifiedType: const FullType(int)),
      'time',
      serializers.serialize(object.time, specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  FightSituation deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new FightSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'droppedItems':
          result.droppedItems.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Item)]))
              as BuiltList);
          break;
        case 'droppedItemsOutOfReach':
          result.droppedItemsOutOfReach.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Item)]))
              as BuiltList);
          break;
        case 'enemyTeamIds':
          result.enemyTeamIds.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(int)]))
              as BuiltList);
          break;
        case 'events':
          result.events.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap, const [
                const FullType(int),
                const FullType(EventCallback)
              ])) as BuiltMap);
          break;
        case 'groundMaterial':
          result.groundMaterial = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'playerTeamIds':
          result.playerTeamIds.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(int)]))
              as BuiltList);
          break;
        case 'roomRoamingSituationId':
          result.roomRoamingSituationId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'time':
          result.time = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
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
  final BuiltList<int> enemyTeamIds;
  @override
  final BuiltMap<int, EventCallback> events;
  @override
  final String groundMaterial;
  @override
  final int id;
  @override
  final BuiltList<int> playerTeamIds;
  @override
  final int roomRoamingSituationId;
  @override
  final int time;

  factory _$FightSituation([void updates(FightSituationBuilder b)]) =>
      (new FightSituationBuilder()..update(updates)).build();

  _$FightSituation._(
      {this.droppedItems,
      this.droppedItemsOutOfReach,
      this.enemyTeamIds,
      this.events,
      this.groundMaterial,
      this.id,
      this.playerTeamIds,
      this.roomRoamingSituationId,
      this.time})
      : super._() {
    if (droppedItems == null) {
      throw new BuiltValueNullFieldError('FightSituation', 'droppedItems');
    }
    if (droppedItemsOutOfReach == null) {
      throw new BuiltValueNullFieldError(
          'FightSituation', 'droppedItemsOutOfReach');
    }
    if (enemyTeamIds == null) {
      throw new BuiltValueNullFieldError('FightSituation', 'enemyTeamIds');
    }
    if (events == null) {
      throw new BuiltValueNullFieldError('FightSituation', 'events');
    }
    if (groundMaterial == null) {
      throw new BuiltValueNullFieldError('FightSituation', 'groundMaterial');
    }
    if (id == null) {
      throw new BuiltValueNullFieldError('FightSituation', 'id');
    }
    if (playerTeamIds == null) {
      throw new BuiltValueNullFieldError('FightSituation', 'playerTeamIds');
    }
    if (roomRoamingSituationId == null) {
      throw new BuiltValueNullFieldError(
          'FightSituation', 'roomRoamingSituationId');
    }
    if (time == null) {
      throw new BuiltValueNullFieldError('FightSituation', 'time');
    }
  }

  @override
  FightSituation rebuild(void updates(FightSituationBuilder b)) =>
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
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc(
                        $jc(
                            $jc(
                                $jc($jc(0, droppedItems.hashCode),
                                    droppedItemsOutOfReach.hashCode),
                                enemyTeamIds.hashCode),
                            events.hashCode),
                        groundMaterial.hashCode),
                    id.hashCode),
                playerTeamIds.hashCode),
            roomRoamingSituationId.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('FightSituation')
          ..add('droppedItems', droppedItems)
          ..add('droppedItemsOutOfReach', droppedItemsOutOfReach)
          ..add('enemyTeamIds', enemyTeamIds)
          ..add('events', events)
          ..add('groundMaterial', groundMaterial)
          ..add('id', id)
          ..add('playerTeamIds', playerTeamIds)
          ..add('roomRoamingSituationId', roomRoamingSituationId)
          ..add('time', time))
        .toString();
  }
}

class FightSituationBuilder
    implements Builder<FightSituation, FightSituationBuilder> {
  _$FightSituation _$v;

  ListBuilder<Item> _droppedItems;
  ListBuilder<Item> get droppedItems =>
      _$this._droppedItems ??= new ListBuilder<Item>();
  set droppedItems(ListBuilder<Item> droppedItems) =>
      _$this._droppedItems = droppedItems;

  ListBuilder<Item> _droppedItemsOutOfReach;
  ListBuilder<Item> get droppedItemsOutOfReach =>
      _$this._droppedItemsOutOfReach ??= new ListBuilder<Item>();
  set droppedItemsOutOfReach(ListBuilder<Item> droppedItemsOutOfReach) =>
      _$this._droppedItemsOutOfReach = droppedItemsOutOfReach;

  ListBuilder<int> _enemyTeamIds;
  ListBuilder<int> get enemyTeamIds =>
      _$this._enemyTeamIds ??= new ListBuilder<int>();
  set enemyTeamIds(ListBuilder<int> enemyTeamIds) =>
      _$this._enemyTeamIds = enemyTeamIds;

  MapBuilder<int, EventCallback> _events;
  MapBuilder<int, EventCallback> get events =>
      _$this._events ??= new MapBuilder<int, EventCallback>();
  set events(MapBuilder<int, EventCallback> events) => _$this._events = events;

  String _groundMaterial;
  String get groundMaterial => _$this._groundMaterial;
  set groundMaterial(String groundMaterial) =>
      _$this._groundMaterial = groundMaterial;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  ListBuilder<int> _playerTeamIds;
  ListBuilder<int> get playerTeamIds =>
      _$this._playerTeamIds ??= new ListBuilder<int>();
  set playerTeamIds(ListBuilder<int> playerTeamIds) =>
      _$this._playerTeamIds = playerTeamIds;

  int _roomRoamingSituationId;
  int get roomRoamingSituationId => _$this._roomRoamingSituationId;
  set roomRoamingSituationId(int roomRoamingSituationId) =>
      _$this._roomRoamingSituationId = roomRoamingSituationId;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  FightSituationBuilder();

  FightSituationBuilder get _$this {
    if (_$v != null) {
      _droppedItems = _$v.droppedItems?.toBuilder();
      _droppedItemsOutOfReach = _$v.droppedItemsOutOfReach?.toBuilder();
      _enemyTeamIds = _$v.enemyTeamIds?.toBuilder();
      _events = _$v.events?.toBuilder();
      _groundMaterial = _$v.groundMaterial;
      _id = _$v.id;
      _playerTeamIds = _$v.playerTeamIds?.toBuilder();
      _roomRoamingSituationId = _$v.roomRoamingSituationId;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(FightSituation other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$FightSituation;
  }

  @override
  void update(void updates(FightSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$FightSituation build() {
    _$FightSituation _$result;
    try {
      _$result = _$v ??
          new _$FightSituation._(
              droppedItems: droppedItems.build(),
              droppedItemsOutOfReach: droppedItemsOutOfReach.build(),
              enemyTeamIds: enemyTeamIds.build(),
              events: events.build(),
              groundMaterial: groundMaterial,
              id: id,
              playerTeamIds: playerTeamIds.build(),
              roomRoamingSituationId: roomRoamingSituationId,
              time: time);
    } catch (_) {
      String _$failedField;
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
            'FightSituation', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
