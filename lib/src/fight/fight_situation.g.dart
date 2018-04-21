// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.fight_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_returning_this
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

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
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'droppedItems',
      serializers.serialize(object.droppedItems,
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
      {FullType specifiedType: FullType.unspecified}) {
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
              as BuiltList<Item>);
          break;
        case 'enemyTeamIds':
          result.enemyTeamIds.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(int)]))
              as BuiltList<int>);
          break;
        case 'events':
          result.events.replace(serializers.deserialize(value,
              specifiedType: const FullType(BuiltMap, const [
                const FullType(int),
                const FullType(EventCallback)
              ])) as BuiltMap<int, EventCallback>);
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
              as BuiltList<int>);
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
      this.enemyTeamIds,
      this.events,
      this.groundMaterial,
      this.id,
      this.playerTeamIds,
      this.roomRoamingSituationId,
      this.time})
      : super._() {
    if (droppedItems == null) throw new ArgumentError.notNull('droppedItems');
    if (enemyTeamIds == null) throw new ArgumentError.notNull('enemyTeamIds');
    if (events == null) throw new ArgumentError.notNull('events');
    if (groundMaterial == null)
      throw new ArgumentError.notNull('groundMaterial');
    if (id == null) throw new ArgumentError.notNull('id');
    if (playerTeamIds == null) throw new ArgumentError.notNull('playerTeamIds');
    if (roomRoamingSituationId == null)
      throw new ArgumentError.notNull('roomRoamingSituationId');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  FightSituation rebuild(void updates(FightSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  FightSituationBuilder toBuilder() =>
      new FightSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! FightSituation) return false;
    return droppedItems == other.droppedItems &&
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
                            $jc($jc(0, droppedItems.hashCode),
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
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$FightSituation;
  }

  @override
  void update(void updates(FightSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$FightSituation build() {
    final _$result = _$v ??
        new _$FightSituation._(
            droppedItems: droppedItems?.build(),
            enemyTeamIds: enemyTeamIds?.build(),
            events: events?.build(),
            groundMaterial: groundMaterial,
            id: id,
            playerTeamIds: playerTeamIds?.build(),
            roomRoamingSituationId: roomRoamingSituationId,
            time: time);
    replace(_$result);
    return _$result;
  }
}
