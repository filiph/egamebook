// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.actor;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class Actor
// **************************************************************************

class _$Actor extends Actor {
  @override
  final bool alreadyMentioned;
  @override
  final List<String> categories;
  @override
  final CombineFunction combineFunction;
  @override
  final String currentRoomName;
  @override
  final Item currentWeapon;
  @override
  final int followingActorId;
  @override
  final int hitpoints;
  @override
  final int gold;
  @override
  final int id;
  @override
  final int initiative;
  @override
  final bool isActive;
  @override
  final bool isPlayer;
  @override
  final Set<Item> items;
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
  final Item shield;
  @override
  final int stamina;
  @override
  final Team team;

  factory _$Actor([void updates(ActorBuilder b)]) =>
      (new ActorBuilder()..update(updates)).build() as _$Actor;

  _$Actor._(
      {this.alreadyMentioned,
      this.categories,
      this.combineFunction,
      this.currentRoomName,
      this.currentWeapon,
      this.followingActorId,
      this.hitpoints,
      this.gold,
      this.id,
      this.initiative,
      this.isActive,
      this.isPlayer,
      this.items,
      this.maxHitpoints,
      this.name,
      this.nameIsProperNoun,
      this.pose,
      this.pronoun,
      this.shield,
      this.stamina,
      this.team})
      : super._() {
    if (alreadyMentioned == null)
      throw new ArgumentError.notNull('alreadyMentioned');
    if (categories == null) throw new ArgumentError.notNull('categories');
    if (hitpoints == null) throw new ArgumentError.notNull('hitpoints');
    if (gold == null) throw new ArgumentError.notNull('gold');
    if (id == null) throw new ArgumentError.notNull('id');
    if (initiative == null) throw new ArgumentError.notNull('initiative');
    if (isActive == null) throw new ArgumentError.notNull('isActive');
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
  _$ActorBuilder toBuilder() => new _$ActorBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! Actor) return false;
    return alreadyMentioned == other.alreadyMentioned &&
        categories == other.categories &&
        combineFunction == other.combineFunction &&
        currentRoomName == other.currentRoomName &&
        currentWeapon == other.currentWeapon &&
        followingActorId == other.followingActorId &&
        hitpoints == other.hitpoints &&
        gold == other.gold &&
        id == other.id &&
        initiative == other.initiative &&
        isActive == other.isActive &&
        isPlayer == other.isPlayer &&
        items == other.items &&
        maxHitpoints == other.maxHitpoints &&
        name == other.name &&
        nameIsProperNoun == other.nameIsProperNoun &&
        pose == other.pose &&
        pronoun == other.pronoun &&
        shield == other.shield &&
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
                                                                            $jc($jc($jc(0, alreadyMentioned.hashCode), categories.hashCode),
                                                                                combineFunction.hashCode),
                                                                            currentRoomName.hashCode),
                                                                        currentWeapon.hashCode),
                                                                    followingActorId.hashCode),
                                                                hitpoints.hashCode),
                                                            gold.hashCode),
                                                        id.hashCode),
                                                    initiative.hashCode),
                                                isActive.hashCode),
                                            isPlayer.hashCode),
                                        items.hashCode),
                                    maxHitpoints.hashCode),
                                name.hashCode),
                            nameIsProperNoun.hashCode),
                        pose.hashCode),
                    pronoun.hashCode),
                shield.hashCode),
            stamina.hashCode),
        team.hashCode));
  }

  @override
  String toString() {
    return 'Actor {'
        'alreadyMentioned=${alreadyMentioned.toString()},\n'
        'categories=${categories.toString()},\n'
        'combineFunction=${combineFunction.toString()},\n'
        'currentRoomName=${currentRoomName.toString()},\n'
        'currentWeapon=${currentWeapon.toString()},\n'
        'followingActorId=${followingActorId.toString()},\n'
        'hitpoints=${hitpoints.toString()},\n'
        'gold=${gold.toString()},\n'
        'id=${id.toString()},\n'
        'initiative=${initiative.toString()},\n'
        'isActive=${isActive.toString()},\n'
        'isPlayer=${isPlayer.toString()},\n'
        'items=${items.toString()},\n'
        'maxHitpoints=${maxHitpoints.toString()},\n'
        'name=${name.toString()},\n'
        'nameIsProperNoun=${nameIsProperNoun.toString()},\n'
        'pose=${pose.toString()},\n'
        'pronoun=${pronoun.toString()},\n'
        'shield=${shield.toString()},\n'
        'stamina=${stamina.toString()},\n'
        'team=${team.toString()},\n'
        '}';
  }
}

class _$ActorBuilder extends ActorBuilder {
  _$Actor _$v;

  @override
  bool get alreadyMentioned {
    _$this;
    return super.alreadyMentioned;
  }

  @override
  set alreadyMentioned(bool alreadyMentioned) {
    _$this;
    super.alreadyMentioned = alreadyMentioned;
  }

  @override
  List<String> get categories {
    _$this;
    return super.categories;
  }

  @override
  set categories(List<String> categories) {
    _$this;
    super.categories = categories;
  }

  @override
  CombineFunction get combineFunction {
    _$this;
    return super.combineFunction;
  }

  @override
  set combineFunction(CombineFunction combineFunction) {
    _$this;
    super.combineFunction = combineFunction;
  }

  @override
  String get currentRoomName {
    _$this;
    return super.currentRoomName;
  }

  @override
  set currentRoomName(String currentRoomName) {
    _$this;
    super.currentRoomName = currentRoomName;
  }

  @override
  Item get currentWeapon {
    _$this;
    return super.currentWeapon;
  }

  @override
  set currentWeapon(Item currentWeapon) {
    _$this;
    super.currentWeapon = currentWeapon;
  }

  @override
  int get followingActorId {
    _$this;
    return super.followingActorId;
  }

  @override
  set followingActorId(int followingActorId) {
    _$this;
    super.followingActorId = followingActorId;
  }

  @override
  int get hitpoints {
    _$this;
    return super.hitpoints;
  }

  @override
  set hitpoints(int hitpoints) {
    _$this;
    super.hitpoints = hitpoints;
  }

  @override
  int get gold {
    _$this;
    return super.gold;
  }

  @override
  set gold(int gold) {
    _$this;
    super.gold = gold;
  }

  @override
  int get id {
    _$this;
    return super.id;
  }

  @override
  set id(int id) {
    _$this;
    super.id = id;
  }

  @override
  int get initiative {
    _$this;
    return super.initiative;
  }

  @override
  set initiative(int initiative) {
    _$this;
    super.initiative = initiative;
  }

  @override
  bool get isActive {
    _$this;
    return super.isActive;
  }

  @override
  set isActive(bool isActive) {
    _$this;
    super.isActive = isActive;
  }

  @override
  bool get isPlayer {
    _$this;
    return super.isPlayer;
  }

  @override
  set isPlayer(bool isPlayer) {
    _$this;
    super.isPlayer = isPlayer;
  }

  @override
  Set<Item> get items {
    _$this;
    return super.items;
  }

  @override
  set items(Set<Item> items) {
    _$this;
    super.items = items;
  }

  @override
  int get maxHitpoints {
    _$this;
    return super.maxHitpoints;
  }

  @override
  set maxHitpoints(int maxHitpoints) {
    _$this;
    super.maxHitpoints = maxHitpoints;
  }

  @override
  String get name {
    _$this;
    return super.name;
  }

  @override
  set name(String name) {
    _$this;
    super.name = name;
  }

  @override
  bool get nameIsProperNoun {
    _$this;
    return super.nameIsProperNoun;
  }

  @override
  set nameIsProperNoun(bool nameIsProperNoun) {
    _$this;
    super.nameIsProperNoun = nameIsProperNoun;
  }

  @override
  Pose get pose {
    _$this;
    return super.pose;
  }

  @override
  set pose(Pose pose) {
    _$this;
    super.pose = pose;
  }

  @override
  Pronoun get pronoun {
    _$this;
    return super.pronoun;
  }

  @override
  set pronoun(Pronoun pronoun) {
    _$this;
    super.pronoun = pronoun;
  }

  @override
  Item get shield {
    _$this;
    return super.shield;
  }

  @override
  set shield(Item shield) {
    _$this;
    super.shield = shield;
  }

  @override
  int get stamina {
    _$this;
    return super.stamina;
  }

  @override
  set stamina(int stamina) {
    _$this;
    super.stamina = stamina;
  }

  @override
  Team get team {
    _$this;
    return super.team;
  }

  @override
  set team(Team team) {
    _$this;
    super.team = team;
  }

  _$ActorBuilder() : super._();

  ActorBuilder get _$this {
    if (_$v != null) {
      super.alreadyMentioned = _$v.alreadyMentioned;
      super.categories = _$v.categories;
      super.combineFunction = _$v.combineFunction;
      super.currentRoomName = _$v.currentRoomName;
      super.currentWeapon = _$v.currentWeapon;
      super.followingActorId = _$v.followingActorId;
      super.hitpoints = _$v.hitpoints;
      super.gold = _$v.gold;
      super.id = _$v.id;
      super.initiative = _$v.initiative;
      super.isActive = _$v.isActive;
      super.isPlayer = _$v.isPlayer;
      super.items = _$v.items;
      super.maxHitpoints = _$v.maxHitpoints;
      super.name = _$v.name;
      super.nameIsProperNoun = _$v.nameIsProperNoun;
      super.pose = _$v.pose;
      super.pronoun = _$v.pronoun;
      super.shield = _$v.shield;
      super.stamina = _$v.stamina;
      super.team = _$v.team;
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
            alreadyMentioned: alreadyMentioned,
            categories: categories,
            combineFunction: combineFunction,
            currentRoomName: currentRoomName,
            currentWeapon: currentWeapon,
            followingActorId: followingActorId,
            hitpoints: hitpoints,
            gold: gold,
            id: id,
            initiative: initiative,
            isActive: isActive,
            isPlayer: isPlayer,
            items: items,
            maxHitpoints: maxHitpoints,
            name: name,
            nameIsProperNoun: nameIsProperNoun,
            pose: pose,
            pronoun: pronoun,
            shield: shield,
            stamina: stamina,
            team: team);
    replace(result);
    return result;
  }
}
