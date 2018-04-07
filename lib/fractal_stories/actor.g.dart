// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.actor;

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

Serializer<Actor> _$actorSerializer = new _$ActorSerializer();

class _$ActorSerializer implements StructuredSerializer<Actor> {
  @override
  final Iterable<Type> types = const [Actor, _$Actor];
  @override
  final String wireName = 'Actor';

  @override
  Iterable serialize(Serializers serializers, Actor object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
      'categories',
      serializers.serialize(object.categories,
          specifiedType:
              const FullType(BuiltList, const [const FullType(String)])),
      'combineFunctionHandle',
      serializers.serialize(object.combineFunctionHandle,
          specifiedType: const FullType(String)),
      'constitution',
      serializers.serialize(object.constitution,
          specifiedType: const FullType(int)),
      'currentWeapon',
      serializers.serialize(object.currentWeapon,
          specifiedType: const FullType(Weapon)),
      'gold',
      serializers.serialize(object.gold, specifiedType: const FullType(int)),
      'hitpoints',
      serializers.serialize(object.hitpoints,
          specifiedType: const FullType(int)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'initiative',
      serializers.serialize(object.initiative,
          specifiedType: const FullType(int)),
      'isActive',
      serializers.serialize(object.isActive,
          specifiedType: const FullType(bool)),
      'isConfused',
      serializers.serialize(object.isConfused,
          specifiedType: const FullType(bool)),
      'isPlayer',
      serializers.serialize(object.isPlayer,
          specifiedType: const FullType(bool)),
      'items',
      serializers.serialize(object.items,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Item)])),
      'maxHitpoints',
      serializers.serialize(object.maxHitpoints,
          specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'nameIsProperNoun',
      serializers.serialize(object.nameIsProperNoun,
          specifiedType: const FullType(bool)),
      'pose',
      serializers.serialize(object.pose, specifiedType: const FullType(Pose)),
      'pronoun',
      serializers.serialize(object.pronoun,
          specifiedType: const FullType(Pronoun)),
      'stamina',
      serializers.serialize(object.stamina, specifiedType: const FullType(int)),
      'team',
      serializers.serialize(object.team, specifiedType: const FullType(Team)),
      'torso',
      serializers.serialize(object.torso,
          specifiedType: const FullType(BodyPart)),
      'weapons',
      serializers.serialize(object.weapons,
          specifiedType:
              const FullType(BuiltList, const [const FullType(Weapon)])),
    ];
    if (object.currentRoomName != null) {
      result
        ..add('currentRoomName')
        ..add(serializers.serialize(object.currentRoomName,
            specifiedType: const FullType(String)));
    }
    if (object.currentShield != null) {
      result
        ..add('currentShield')
        ..add(serializers.serialize(object.currentShield,
            specifiedType: const FullType(Weapon)));
    }
    if (object.followingActorId != null) {
      result
        ..add('followingActorId')
        ..add(serializers.serialize(object.followingActorId,
            specifiedType: const FullType(int)));
    }

    return result;
  }

  @override
  Actor deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new ActorBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'categories':
          result.categories.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(String)]))
              as BuiltList<String>);
          break;
        case 'combineFunctionHandle':
          result.combineFunctionHandle = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'constitution':
          result.constitution = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'currentRoomName':
          result.currentRoomName = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'currentShield':
          result.currentShield.replace(serializers.deserialize(value,
              specifiedType: const FullType(Weapon)) as Weapon);
          break;
        case 'currentWeapon':
          result.currentWeapon.replace(serializers.deserialize(value,
              specifiedType: const FullType(Weapon)) as Weapon);
          break;
        case 'followingActorId':
          result.followingActorId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'gold':
          result.gold = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'hitpoints':
          result.hitpoints = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'initiative':
          result.initiative = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'isActive':
          result.isActive = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'isConfused':
          result.isConfused = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'isPlayer':
          result.isPlayer = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'items':
          result.items.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Item)]))
              as BuiltList<Item>);
          break;
        case 'maxHitpoints':
          result.maxHitpoints = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'nameIsProperNoun':
          result.nameIsProperNoun = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'pose':
          result.pose = serializers.deserialize(value,
              specifiedType: const FullType(Pose)) as Pose;
          break;
        case 'pronoun':
          result.pronoun.replace(serializers.deserialize(value,
              specifiedType: const FullType(Pronoun)) as Pronoun);
          break;
        case 'stamina':
          result.stamina = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'team':
          result.team.replace(serializers.deserialize(value,
              specifiedType: const FullType(Team)) as Team);
          break;
        case 'torso':
          result.torso.replace(serializers.deserialize(value,
              specifiedType: const FullType(BodyPart)) as BodyPart);
          break;
        case 'weapons':
          result.weapons.replace(serializers.deserialize(value,
                  specifiedType:
                      const FullType(BuiltList, const [const FullType(Weapon)]))
              as BuiltList<Weapon>);
          break;
      }
    }

    return result.build();
  }
}

class _$Actor extends Actor {
  @override
  final BuiltList<String> categories;
  @override
  final String combineFunctionHandle;
  @override
  final int constitution;
  @override
  final String currentRoomName;
  @override
  final Weapon currentShield;
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
  final BuiltList<Item> items;
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
  @override
  final BodyPart torso;
  @override
  final BuiltList<Weapon> weapons;

  factory _$Actor([void updates(ActorBuilder b)]) =>
      (new ActorBuilder()..update(updates)).build();

  _$Actor._(
      {this.categories,
      this.combineFunctionHandle,
      this.constitution,
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
      this.team,
      this.torso,
      this.weapons})
      : super._() {
    if (categories == null) throw new ArgumentError.notNull('categories');
    if (combineFunctionHandle == null)
      throw new ArgumentError.notNull('combineFunctionHandle');
    if (constitution == null) throw new ArgumentError.notNull('constitution');
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
    if (torso == null) throw new ArgumentError.notNull('torso');
    if (weapons == null) throw new ArgumentError.notNull('weapons');
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
        combineFunctionHandle == other.combineFunctionHandle &&
        constitution == other.constitution &&
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
        team == other.team &&
        torso == other.torso &&
        weapons == other.weapons;
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
                                                                            $jc($jc($jc($jc($jc($jc(0, categories.hashCode), combineFunctionHandle.hashCode), constitution.hashCode), currentRoomName.hashCode), currentShield.hashCode),
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
                team.hashCode),
            torso.hashCode),
        weapons.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Actor')
          ..add('categories', categories)
          ..add('combineFunctionHandle', combineFunctionHandle)
          ..add('constitution', constitution)
          ..add('currentRoomName', currentRoomName)
          ..add('currentShield', currentShield)
          ..add('currentWeapon', currentWeapon)
          ..add('followingActorId', followingActorId)
          ..add('gold', gold)
          ..add('hitpoints', hitpoints)
          ..add('id', id)
          ..add('initiative', initiative)
          ..add('isActive', isActive)
          ..add('isConfused', isConfused)
          ..add('isPlayer', isPlayer)
          ..add('items', items)
          ..add('maxHitpoints', maxHitpoints)
          ..add('name', name)
          ..add('nameIsProperNoun', nameIsProperNoun)
          ..add('pose', pose)
          ..add('pronoun', pronoun)
          ..add('stamina', stamina)
          ..add('team', team)
          ..add('torso', torso)
          ..add('weapons', weapons))
        .toString();
  }
}

class ActorBuilder implements Builder<Actor, ActorBuilder> {
  _$Actor _$v;

  ListBuilder<String> _categories;
  ListBuilder<String> get categories =>
      _$this._categories ??= new ListBuilder<String>();
  set categories(ListBuilder<String> categories) =>
      _$this._categories = categories;

  String _combineFunctionHandle;
  String get combineFunctionHandle => _$this._combineFunctionHandle;
  set combineFunctionHandle(String combineFunctionHandle) =>
      _$this._combineFunctionHandle = combineFunctionHandle;

  int _constitution;
  int get constitution => _$this._constitution;
  set constitution(int constitution) => _$this._constitution = constitution;

  String _currentRoomName;
  String get currentRoomName => _$this._currentRoomName;
  set currentRoomName(String currentRoomName) =>
      _$this._currentRoomName = currentRoomName;

  WeaponBuilder _currentShield;
  WeaponBuilder get currentShield =>
      _$this._currentShield ??= new WeaponBuilder();
  set currentShield(WeaponBuilder currentShield) =>
      _$this._currentShield = currentShield;

  WeaponBuilder _currentWeapon;
  WeaponBuilder get currentWeapon =>
      _$this._currentWeapon ??= new WeaponBuilder();
  set currentWeapon(WeaponBuilder currentWeapon) =>
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

  ListBuilder<Item> _items;
  ListBuilder<Item> get items => _$this._items ??= new ListBuilder<Item>();
  set items(ListBuilder<Item> items) => _$this._items = items;

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

  PronounBuilder _pronoun;
  PronounBuilder get pronoun => _$this._pronoun ??= new PronounBuilder();
  set pronoun(PronounBuilder pronoun) => _$this._pronoun = pronoun;

  int _stamina;
  int get stamina => _$this._stamina;
  set stamina(int stamina) => _$this._stamina = stamina;

  TeamBuilder _team;
  TeamBuilder get team => _$this._team ??= new TeamBuilder();
  set team(TeamBuilder team) => _$this._team = team;

  BodyPartBuilder _torso;
  BodyPartBuilder get torso => _$this._torso ??= new BodyPartBuilder();
  set torso(BodyPartBuilder torso) => _$this._torso = torso;

  ListBuilder<Weapon> _weapons;
  ListBuilder<Weapon> get weapons =>
      _$this._weapons ??= new ListBuilder<Weapon>();
  set weapons(ListBuilder<Weapon> weapons) => _$this._weapons = weapons;

  ActorBuilder();

  ActorBuilder get _$this {
    if (_$v != null) {
      _categories = _$v.categories?.toBuilder();
      _combineFunctionHandle = _$v.combineFunctionHandle;
      _constitution = _$v.constitution;
      _currentRoomName = _$v.currentRoomName;
      _currentShield = _$v.currentShield?.toBuilder();
      _currentWeapon = _$v.currentWeapon?.toBuilder();
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
      _pronoun = _$v.pronoun?.toBuilder();
      _stamina = _$v.stamina;
      _team = _$v.team?.toBuilder();
      _torso = _$v.torso?.toBuilder();
      _weapons = _$v.weapons?.toBuilder();
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
    final _$result = _$v ??
        new _$Actor._(
            categories: categories?.build(),
            combineFunctionHandle: combineFunctionHandle,
            constitution: constitution,
            currentRoomName: currentRoomName,
            currentShield: _currentShield?.build(),
            currentWeapon: currentWeapon?.build(),
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
            pronoun: pronoun?.build(),
            stamina: stamina,
            team: team?.build(),
            torso: torso?.build(),
            weapons: weapons?.build());
    replace(_$result);
    return _$result;
  }
}
