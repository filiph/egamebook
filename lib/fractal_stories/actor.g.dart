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
  final Item currentWeapon;
  @override
  final Item shield;
  @override
  final Pose pose;
  @override
  final int hitpoints;
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
  final String name;
  @override
  final bool nameIsProperNoun;
  @override
  final Pronoun pronoun;
  @override
  final Team team;
  @override
  final WorldScoringFunction worldScoringFunction;

  factory _$Actor([updates(ActorBuilder b)]) =>
      (new ActorBuilder()..update(updates)).build();

  _$Actor._(
      {this.alreadyMentioned,
      this.categories,
      this.currentWeapon,
      this.shield,
      this.pose,
      this.hitpoints,
      this.id,
      this.initiative,
      this.isActive,
      this.isPlayer,
      this.items,
      this.name,
      this.nameIsProperNoun,
      this.pronoun,
      this.team,
      this.worldScoringFunction})
      : super._() {
    if (alreadyMentioned == null)
      throw new ArgumentError.notNull('alreadyMentioned');
    if (categories == null) throw new ArgumentError.notNull('categories');
    if (pose == null) throw new ArgumentError.notNull('pose');
    if (hitpoints == null) throw new ArgumentError.notNull('hitpoints');
    if (id == null) throw new ArgumentError.notNull('id');
    if (initiative == null) throw new ArgumentError.notNull('initiative');
    if (isActive == null) throw new ArgumentError.notNull('isActive');
    if (isPlayer == null) throw new ArgumentError.notNull('isPlayer');
    if (items == null) throw new ArgumentError.notNull('items');
    if (name == null) throw new ArgumentError.notNull('name');
    if (nameIsProperNoun == null)
      throw new ArgumentError.notNull('nameIsProperNoun');
    if (pronoun == null) throw new ArgumentError.notNull('pronoun');
    if (team == null) throw new ArgumentError.notNull('team');
  }

  @override
  Actor rebuild(updates(ActorBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  _$ActorBuilder toBuilder() => new _$ActorBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (other is! Actor) return false;
    return alreadyMentioned == other.alreadyMentioned &&
        categories == other.categories &&
        currentWeapon == other.currentWeapon &&
        shield == other.shield &&
        pose == other.pose &&
        hitpoints == other.hitpoints &&
        id == other.id &&
        initiative == other.initiative &&
        isActive == other.isActive &&
        isPlayer == other.isPlayer &&
        items == other.items &&
        name == other.name &&
        nameIsProperNoun == other.nameIsProperNoun &&
        pronoun == other.pronoun &&
        team == other.team &&
        worldScoringFunction == other.worldScoringFunction;
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
                                                                    0,
                                                                    alreadyMentioned
                                                                        .hashCode),
                                                                categories
                                                                    .hashCode),
                                                            currentWeapon
                                                                .hashCode),
                                                        shield.hashCode),
                                                    pose.hashCode),
                                                hitpoints.hashCode),
                                            id.hashCode),
                                        initiative.hashCode),
                                    isActive.hashCode),
                                isPlayer.hashCode),
                            items.hashCode),
                        name.hashCode),
                    nameIsProperNoun.hashCode),
                pronoun.hashCode),
            team.hashCode),
        worldScoringFunction.hashCode));
  }

  @override
  String toString() {
    return 'Actor {'
        'alreadyMentioned=${alreadyMentioned.toString()},\n'
        'categories=${categories.toString()},\n'
        'currentWeapon=${currentWeapon.toString()},\n'
        'shield=${shield.toString()},\n'
        'pose=${pose.toString()},\n'
        'hitpoints=${hitpoints.toString()},\n'
        'id=${id.toString()},\n'
        'initiative=${initiative.toString()},\n'
        'isActive=${isActive.toString()},\n'
        'isPlayer=${isPlayer.toString()},\n'
        'items=${items.toString()},\n'
        'name=${name.toString()},\n'
        'nameIsProperNoun=${nameIsProperNoun.toString()},\n'
        'pronoun=${pronoun.toString()},\n'
        'team=${team.toString()},\n'
        'worldScoringFunction=${worldScoringFunction.toString()},\n'
        '}';
  }
}

class _$ActorBuilder extends ActorBuilder {
  Actor _$v;

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
  Team get team {
    _$this;
    return super.team;
  }

  @override
  set team(Team team) {
    _$this;
    super.team = team;
  }

  @override
  WorldScoringFunction get worldScoringFunction {
    _$this;
    return super.worldScoringFunction;
  }

  @override
  set worldScoringFunction(WorldScoringFunction worldScoringFunction) {
    _$this;
    super.worldScoringFunction = worldScoringFunction;
  }

  _$ActorBuilder() : super._();

  ActorBuilder get _$this {
    if (_$v != null) {
      super.alreadyMentioned = _$v.alreadyMentioned;
      super.categories = _$v.categories;
      super.currentWeapon = _$v.currentWeapon;
      super.shield = _$v.shield;
      super.pose = _$v.pose;
      super.hitpoints = _$v.hitpoints;
      super.id = _$v.id;
      super.initiative = _$v.initiative;
      super.isActive = _$v.isActive;
      super.isPlayer = _$v.isPlayer;
      super.items = _$v.items;
      super.name = _$v.name;
      super.nameIsProperNoun = _$v.nameIsProperNoun;
      super.pronoun = _$v.pronoun;
      super.team = _$v.team;
      super.worldScoringFunction = _$v.worldScoringFunction;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Actor other) {
    _$v = other;
  }

  @override
  void update(updates(ActorBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  Actor build() {
    final result = _$v ??
        new _$Actor._(
            alreadyMentioned: alreadyMentioned,
            categories: categories,
            currentWeapon: currentWeapon,
            shield: shield,
            pose: pose,
            hitpoints: hitpoints,
            id: id,
            initiative: initiative,
            isActive: isActive,
            isPlayer: isPlayer,
            items: items,
            name: name,
            nameIsProperNoun: nameIsProperNoun,
            pronoun: pronoun,
            team: team,
            worldScoringFunction: worldScoringFunction);
    replace(result);
    return result;
  }
}
