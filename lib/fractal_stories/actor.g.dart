// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.actor;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class Actor
// **************************************************************************

class _$Actor extends Actor {
  @override
  final List<String> categories;
  @override
  final CombineFunction combineFunction;
  @override
  final String currentRoomName;
  @override
  final Shield currentShield;
  @override
  final Weapon currentWeapon;
  @override
  final int followingActorId;
  @override
  final int gold;
  @override
  final int hitpoints;
  @override
  final int id;
  @override
  final int initiative;
  @override
  final bool isActive;
  @override
  final bool isConfused;
  @override
  final bool isPlayer;
  @override
  final BuiltSet<Item> items;
  @override
  final int maxHitpoints;
  @override
  final String name;
  @override
  final bool nameIsProperNoun;
  @override
  final Pose pose;
  @override
  final Pronoun pronoun;
  @override
  final int stamina;
  @override
  final Team team;

  factory _$Actor([void updates(ActorBuilder b)]) =>
      (new ActorBuilder()..update(updates)).build();

  _$Actor._(
      {this.categories,
      this.combineFunction,
      this.currentRoomName,
      this.currentShield,
      this.currentWeapon,
      this.followingActorId,
      this.gold,
      this.hitpoints,
      this.id,
      this.initiative,
      this.isActive,
      this.isConfused,
      this.isPlayer,
      this.items,
      this.maxHitpoints,
      this.name,
      this.nameIsProperNoun,
      this.pose,
      this.pronoun,
      this.stamina,
      this.team})
      : super._() {
    if (categories == null) throw new ArgumentError.notNull('categories');
    if (currentWeapon == null) throw new ArgumentError.notNull('currentWeapon');
    if (gold == null) throw new ArgumentError.notNull('gold');
    if (hitpoints == null) throw new ArgumentError.notNull('hitpoints');
    if (id == null) throw new ArgumentError.notNull('id');
    if (initiative == null) throw new ArgumentError.notNull('initiative');
    if (isActive == null) throw new ArgumentError.notNull('isActive');
    if (isConfused == null) throw new ArgumentError.notNull('isConfused');
    if (isPlayer == null) throw new ArgumentError.notNull('isPlayer');
    if (items == null) throw new ArgumentError.notNull('items');
    if (maxHitpoints == null) throw new ArgumentError.notNull('maxHitpoints');
    if (name == null) throw new ArgumentError.notNull('name');
    if (nameIsProperNoun == null)
      throw new ArgumentError.notNull('nameIsProperNoun');
    if (pose == null) throw new ArgumentError.notNull('pose');
    if (pronoun == null) throw new ArgumentError.notNull('pronoun');
    if (stamina == null) throw new ArgumentError.notNull('stamina');
    if (team == null) throw new ArgumentError.notNull('team');
  }

  @override
  Actor rebuild(void updates(ActorBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ActorBuilder toBuilder() => new ActorBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! Actor) return false;
    return categories == other.categories &&
        combineFunction == other.combineFunction &&
        currentRoomName == other.currentRoomName &&
        currentShield == other.currentShield &&
        currentWeapon == other.currentWeapon &&
        followingActorId == other.followingActorId &&
        gold == other.gold &&
        hitpoints == other.hitpoints &&
        id == other.id &&
        initiative == other.initiative &&
        isActive == other.isActive &&
        isConfused == other.isConfused &&
        isPlayer == other.isPlayer &&
        items == other.items &&
        maxHitpoints == other.maxHitpoints &&
        name == other.name &&
        nameIsProperNoun == other.nameIsProperNoun &&
        pose == other.pose &&
        pronoun == other.pronoun &&
        stamina == other.stamina &&
        team == other.team;
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
                                $jc(
                                    $jc(
                                        $jc(
                                            $jc(
                                                $jc(
                                                    $jc(
                                                        $jc(
                                                            $jc(
                                                                $jc(
                                                                    $jc(
                                                                        $jc(
                                                                            $jc($jc($jc(0, categories.hashCode), combineFunction.hashCode),
                                                                                currentRoomName.hashCode),
                                                                            currentShield.hashCode),
                                                                        currentWeapon.hashCode),
                                                                    followingActorId.hashCode),
                                                                gold.hashCode),
                                                            hitpoints.hashCode),
                                                        id.hashCode),
                                                    initiative.hashCode),
                                                isActive.hashCode),
                                            isConfused.hashCode),
                                        isPlayer.hashCode),
                                    items.hashCode),
                                maxHitpoints.hashCode),
                            name.hashCode),
                        nameIsProperNoun.hashCode),
                    pose.hashCode),
                pronoun.hashCode),
            stamina.hashCode),
        team.hashCode));
  }

  @override
  String toString() {
    return 'Actor {'
        'categories=${categories.toString()},\n'
        'combineFunction=${combineFunction.toString()},\n'
        'currentRoomName=${currentRoomName.toString()},\n'
        'currentShield=${currentShield.toString()},\n'
        'currentWeapon=${currentWeapon.toString()},\n'
        'followingActorId=${followingActorId.toString()},\n'
        'gold=${gold.toString()},\n'
        'hitpoints=${hitpoints.toString()},\n'
        'id=${id.toString()},\n'
        'initiative=${initiative.toString()},\n'
        'isActive=${isActive.toString()},\n'
        'isConfused=${isConfused.toString()},\n'
        'isPlayer=${isPlayer.toString()},\n'
        'items=${items.toString()},\n'
        'maxHitpoints=${maxHitpoints.toString()},\n'
        'name=${name.toString()},\n'
        'nameIsProperNoun=${nameIsProperNoun.toString()},\n'
        'pose=${pose.toString()},\n'
        'pronoun=${pronoun.toString()},\n'
        'stamina=${stamina.toString()},\n'
        'team=${team.toString()},\n'
        '}';
  }
}

class ActorBuilder implements Builder<Actor, ActorBuilder> {
  _$Actor _$v;

  List<String> _categories;
  List<String> get categories => _$this._categories;
  set categories(List<String> categories) => _$this._categories = categories;

  CombineFunction _combineFunction;
  CombineFunction get combineFunction => _$this._combineFunction;
  set combineFunction(CombineFunction combineFunction) =>
      _$this._combineFunction = combineFunction;

  String _currentRoomName;
  String get currentRoomName => _$this._currentRoomName;
  set currentRoomName(String currentRoomName) =>
      _$this._currentRoomName = currentRoomName;

  Shield _currentShield;
  Shield get currentShield => _$this._currentShield;
  set currentShield(Shield currentShield) =>
      _$this._currentShield = currentShield;

  Weapon _currentWeapon;
  Weapon get currentWeapon => _$this._currentWeapon;
  set currentWeapon(Weapon currentWeapon) =>
      _$this._currentWeapon = currentWeapon;

  int _followingActorId;
  int get followingActorId => _$this._followingActorId;
  set followingActorId(int followingActorId) =>
      _$this._followingActorId = followingActorId;

  int _gold;
  int get gold => _$this._gold;
  set gold(int gold) => _$this._gold = gold;

  int _hitpoints;
  int get hitpoints => _$this._hitpoints;
  set hitpoints(int hitpoints) => _$this._hitpoints = hitpoints;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  int _initiative;
  int get initiative => _$this._initiative;
  set initiative(int initiative) => _$this._initiative = initiative;

  bool _isActive;
  bool get isActive => _$this._isActive;
  set isActive(bool isActive) => _$this._isActive = isActive;

  bool _isConfused;
  bool get isConfused => _$this._isConfused;
  set isConfused(bool isConfused) => _$this._isConfused = isConfused;

  bool _isPlayer;
  bool get isPlayer => _$this._isPlayer;
  set isPlayer(bool isPlayer) => _$this._isPlayer = isPlayer;

  SetBuilder<Item> _items;
  SetBuilder<Item> get items => _$this._items ??= new SetBuilder<Item>();
  set items(SetBuilder<Item> items) => _$this._items = items;

  int _maxHitpoints;
  int get maxHitpoints => _$this._maxHitpoints;
  set maxHitpoints(int maxHitpoints) => _$this._maxHitpoints = maxHitpoints;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  bool _nameIsProperNoun;
  bool get nameIsProperNoun => _$this._nameIsProperNoun;
  set nameIsProperNoun(bool nameIsProperNoun) =>
      _$this._nameIsProperNoun = nameIsProperNoun;

  Pose _pose;
  Pose get pose => _$this._pose;
  set pose(Pose pose) => _$this._pose = pose;

  Pronoun _pronoun;
  Pronoun get pronoun => _$this._pronoun;
  set pronoun(Pronoun pronoun) => _$this._pronoun = pronoun;

  int _stamina;
  int get stamina => _$this._stamina;
  set stamina(int stamina) => _$this._stamina = stamina;

  TeamBuilder _team;
  TeamBuilder get team => _$this._team ??= new TeamBuilder();
  set team(TeamBuilder team) => _$this._team = team;

  ActorBuilder();

  ActorBuilder get _$this {
    if (_$v != null) {
      _categories = _$v.categories;
      _combineFunction = _$v.combineFunction;
      _currentRoomName = _$v.currentRoomName;
      _currentShield = _$v.currentShield;
      _currentWeapon = _$v.currentWeapon;
      _followingActorId = _$v.followingActorId;
      _gold = _$v.gold;
      _hitpoints = _$v.hitpoints;
      _id = _$v.id;
      _initiative = _$v.initiative;
      _isActive = _$v.isActive;
      _isConfused = _$v.isConfused;
      _isPlayer = _$v.isPlayer;
      _items = _$v.items?.toBuilder();
      _maxHitpoints = _$v.maxHitpoints;
      _name = _$v.name;
      _nameIsProperNoun = _$v.nameIsProperNoun;
      _pose = _$v.pose;
      _pronoun = _$v.pronoun;
      _stamina = _$v.stamina;
      _team = _$v.team?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Actor other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$Actor;
  }

  @override
  void update(void updates(ActorBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$Actor build() {
    final result = _$v ??
        new _$Actor._(
            categories: categories,
            combineFunction: combineFunction,
            currentRoomName: currentRoomName,
            currentShield: currentShield,
            currentWeapon: currentWeapon,
            followingActorId: followingActorId,
            gold: gold,
            hitpoints: hitpoints,
            id: id,
            initiative: initiative,
            isActive: isActive,
            isConfused: isConfused,
            isPlayer: isPlayer,
            items: items?.build(),
            maxHitpoints: maxHitpoints,
            name: name,
            nameIsProperNoun: nameIsProperNoun,
            pose: pose,
            pronoun: pronoun,
            stamina: stamina,
            team: team?.build());
    replace(result);
    return result;
  }
}
