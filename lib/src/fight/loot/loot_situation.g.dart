// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.loot_situation;

// **************************************************************************
// Generator: BuiltValueGenerator
// **************************************************************************

// ignore_for_file: annotate_overrides
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

class _$LootSituation extends LootSituation {
  @override
  final BuiltList<Item> droppedItems;
  @override
  final String groundMaterial;
  @override
  final BuiltList<int> playerTeamIds;
  @override
  final int id;
  @override
  final int time;

  factory _$LootSituation([void updates(LootSituationBuilder b)]) =>
      (new LootSituationBuilder()..update(updates)).build();

  _$LootSituation._(
      {this.droppedItems,
      this.groundMaterial,
      this.playerTeamIds,
      this.id,
      this.time})
      : super._() {
    if (droppedItems == null) throw new ArgumentError.notNull('droppedItems');
    if (groundMaterial == null)
      throw new ArgumentError.notNull('groundMaterial');
    if (playerTeamIds == null) throw new ArgumentError.notNull('playerTeamIds');
    if (id == null) throw new ArgumentError.notNull('id');
    if (time == null) throw new ArgumentError.notNull('time');
  }

  @override
  LootSituation rebuild(void updates(LootSituationBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  LootSituationBuilder toBuilder() => new LootSituationBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! LootSituation) return false;
    return droppedItems == other.droppedItems &&
        groundMaterial == other.groundMaterial &&
        playerTeamIds == other.playerTeamIds &&
        id == other.id &&
        time == other.time;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc($jc($jc(0, droppedItems.hashCode), groundMaterial.hashCode),
                playerTeamIds.hashCode),
            id.hashCode),
        time.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('LootSituation')
          ..add('droppedItems', droppedItems)
          ..add('groundMaterial', groundMaterial)
          ..add('playerTeamIds', playerTeamIds)
          ..add('id', id)
          ..add('time', time))
        .toString();
  }
}

class LootSituationBuilder
    implements Builder<LootSituation, LootSituationBuilder> {
  _$LootSituation _$v;

  ListBuilder<Item> _droppedItems;
  ListBuilder<Item> get droppedItems =>
      _$this._droppedItems ??= new ListBuilder<Item>();
  set droppedItems(ListBuilder<Item> droppedItems) =>
      _$this._droppedItems = droppedItems;

  String _groundMaterial;
  String get groundMaterial => _$this._groundMaterial;
  set groundMaterial(String groundMaterial) =>
      _$this._groundMaterial = groundMaterial;

  ListBuilder<int> _playerTeamIds;
  ListBuilder<int> get playerTeamIds =>
      _$this._playerTeamIds ??= new ListBuilder<int>();
  set playerTeamIds(ListBuilder<int> playerTeamIds) =>
      _$this._playerTeamIds = playerTeamIds;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _time;
  int get time => _$this._time;
  set time(int time) => _$this._time = time;

  LootSituationBuilder();

  LootSituationBuilder get _$this {
    if (_$v != null) {
      _droppedItems = _$v.droppedItems?.toBuilder();
      _groundMaterial = _$v.groundMaterial;
      _playerTeamIds = _$v.playerTeamIds?.toBuilder();
      _id = _$v.id;
      _time = _$v.time;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(LootSituation other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$LootSituation;
  }

  @override
  void update(void updates(LootSituationBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$LootSituation build() {
    final _$result = _$v ??
        new _$LootSituation._(
            droppedItems: droppedItems?.build(),
            groundMaterial: groundMaterial,
            playerTeamIds: playerTeamIds?.build(),
            id: id,
            time: time);
    replace(_$result);
    return _$result;
  }
}
