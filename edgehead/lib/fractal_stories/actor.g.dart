// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.actor;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<Actor> _$actorSerializer = new _$ActorSerializer();

class _$ActorSerializer implements StructuredSerializer<Actor> {
  @override
  final Iterable<Type> types = const [Actor, _$Actor];
  @override
  final String wireName = 'Actor';

  @override
  Iterable serialize(Serializers serializers, Actor object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'anatomy',
      serializers.serialize(object.anatomy,
          specifiedType: const FullType(Anatomy)),
      'recoveringUntil',
      serializers.serialize(object.recoveringUntil,
          specifiedType: const FullType(DateTime)),
      'combineFunctionHandle',
      serializers.serialize(object.combineFunctionHandle,
          specifiedType: const FullType(String)),
      'constitution',
      serializers.serialize(object.constitution,
          specifiedType: const FullType(int)),
      'dexterity',
      serializers.serialize(object.dexterity,
          specifiedType: const FullType(int)),
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
      'inventory',
      serializers.serialize(object.inventory,
          specifiedType: const FullType(Inventory)),
      'isActive',
      serializers.serialize(object.isActive,
          specifiedType: const FullType(bool)),
      'isConfused',
      serializers.serialize(object.isConfused,
          specifiedType: const FullType(bool)),
      'isPlayer',
      serializers.serialize(object.isPlayer,
          specifiedType: const FullType(bool)),
      'isSurvivor',
      serializers.serialize(object.isSurvivor,
          specifiedType: const FullType(bool)),
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
      'poseMax',
      serializers.serialize(object.poseMax,
          specifiedType: const FullType(Pose)),
      'pronoun',
      serializers.serialize(object.pronoun,
          specifiedType: const FullType(Pronoun)),
      'stamina',
      serializers.serialize(object.stamina, specifiedType: const FullType(int)),
      'team',
      serializers.serialize(object.team, specifiedType: const FullType(Team)),
    ];
    if (object.currentRoomName != null) {
      result
        ..add('currentRoomName')
        ..add(serializers.serialize(object.currentRoomName,
            specifiedType: const FullType(String)));
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
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ActorBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'anatomy':
          result.anatomy.replace(serializers.deserialize(value,
              specifiedType: const FullType(Anatomy)) as Anatomy);
          break;
        case 'recoveringUntil':
          result.recoveringUntil = serializers.deserialize(value,
              specifiedType: const FullType(DateTime)) as DateTime;
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
        case 'dexterity':
          result.dexterity = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
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
        case 'inventory':
          result.inventory.replace(serializers.deserialize(value,
              specifiedType: const FullType(Inventory)) as Inventory);
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
        case 'isSurvivor':
          result.isSurvivor = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
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
        case 'poseMax':
          result.poseMax = serializers.deserialize(value,
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
      }
    }

    return result.build();
  }
}

class _$Actor extends Actor {
  @override
  final Anatomy anatomy;
  @override
  final DateTime recoveringUntil;
  @override
  final String combineFunctionHandle;
  @override
  final int constitution;
  @override
  final String currentRoomName;
  @override
  final int dexterity;
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
  final Inventory inventory;
  @override
  final bool isActive;
  @override
  final bool isConfused;
  @override
  final bool isPlayer;
  @override
  final bool isSurvivor;
  @override
  final int maxHitpoints;
  @override
  final String name;
  @override
  final bool nameIsProperNoun;
  @override
  final Pose pose;
  @override
  final Pose poseMax;
  @override
  final Pronoun pronoun;
  @override
  final int stamina;
  @override
  final Team team;

  factory _$Actor([void updates(ActorBuilder b)]) =>
      (new ActorBuilder()..update(updates)).build();

  _$Actor._(
      {this.anatomy,
      this.recoveringUntil,
      this.combineFunctionHandle,
      this.constitution,
      this.currentRoomName,
      this.dexterity,
      this.followingActorId,
      this.gold,
      this.hitpoints,
      this.id,
      this.initiative,
      this.inventory,
      this.isActive,
      this.isConfused,
      this.isPlayer,
      this.isSurvivor,
      this.maxHitpoints,
      this.name,
      this.nameIsProperNoun,
      this.pose,
      this.poseMax,
      this.pronoun,
      this.stamina,
      this.team})
      : super._() {
    if (anatomy == null) {
      throw new BuiltValueNullFieldError('Actor', 'anatomy');
    }
    if (recoveringUntil == null) {
      throw new BuiltValueNullFieldError('Actor', 'recoveringUntil');
    }
    if (combineFunctionHandle == null) {
      throw new BuiltValueNullFieldError('Actor', 'combineFunctionHandle');
    }
    if (constitution == null) {
      throw new BuiltValueNullFieldError('Actor', 'constitution');
    }
    if (dexterity == null) {
      throw new BuiltValueNullFieldError('Actor', 'dexterity');
    }
    if (gold == null) {
      throw new BuiltValueNullFieldError('Actor', 'gold');
    }
    if (hitpoints == null) {
      throw new BuiltValueNullFieldError('Actor', 'hitpoints');
    }
    if (id == null) {
      throw new BuiltValueNullFieldError('Actor', 'id');
    }
    if (initiative == null) {
      throw new BuiltValueNullFieldError('Actor', 'initiative');
    }
    if (inventory == null) {
      throw new BuiltValueNullFieldError('Actor', 'inventory');
    }
    if (isActive == null) {
      throw new BuiltValueNullFieldError('Actor', 'isActive');
    }
    if (isConfused == null) {
      throw new BuiltValueNullFieldError('Actor', 'isConfused');
    }
    if (isPlayer == null) {
      throw new BuiltValueNullFieldError('Actor', 'isPlayer');
    }
    if (isSurvivor == null) {
      throw new BuiltValueNullFieldError('Actor', 'isSurvivor');
    }
    if (maxHitpoints == null) {
      throw new BuiltValueNullFieldError('Actor', 'maxHitpoints');
    }
    if (name == null) {
      throw new BuiltValueNullFieldError('Actor', 'name');
    }
    if (nameIsProperNoun == null) {
      throw new BuiltValueNullFieldError('Actor', 'nameIsProperNoun');
    }
    if (pose == null) {
      throw new BuiltValueNullFieldError('Actor', 'pose');
    }
    if (poseMax == null) {
      throw new BuiltValueNullFieldError('Actor', 'poseMax');
    }
    if (pronoun == null) {
      throw new BuiltValueNullFieldError('Actor', 'pronoun');
    }
    if (stamina == null) {
      throw new BuiltValueNullFieldError('Actor', 'stamina');
    }
    if (team == null) {
      throw new BuiltValueNullFieldError('Actor', 'team');
    }
  }

  @override
  Actor rebuild(void updates(ActorBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ActorBuilder toBuilder() => new ActorBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Actor &&
        anatomy == other.anatomy &&
        recoveringUntil == other.recoveringUntil &&
        combineFunctionHandle == other.combineFunctionHandle &&
        constitution == other.constitution &&
        currentRoomName == other.currentRoomName &&
        dexterity == other.dexterity &&
        followingActorId == other.followingActorId &&
        gold == other.gold &&
        hitpoints == other.hitpoints &&
        id == other.id &&
        initiative == other.initiative &&
        inventory == other.inventory &&
        isActive == other.isActive &&
        isConfused == other.isConfused &&
        isPlayer == other.isPlayer &&
        isSurvivor == other.isSurvivor &&
        maxHitpoints == other.maxHitpoints &&
        name == other.name &&
        nameIsProperNoun == other.nameIsProperNoun &&
        pose == other.pose &&
        poseMax == other.poseMax &&
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
                                                                            $jc($jc($jc($jc($jc($jc(0, anatomy.hashCode), recoveringUntil.hashCode), combineFunctionHandle.hashCode), constitution.hashCode), currentRoomName.hashCode),
                                                                                dexterity.hashCode),
                                                                            followingActorId.hashCode),
                                                                        gold.hashCode),
                                                                    hitpoints.hashCode),
                                                                id.hashCode),
                                                            initiative.hashCode),
                                                        inventory.hashCode),
                                                    isActive.hashCode),
                                                isConfused.hashCode),
                                            isPlayer.hashCode),
                                        isSurvivor.hashCode),
                                    maxHitpoints.hashCode),
                                name.hashCode),
                            nameIsProperNoun.hashCode),
                        pose.hashCode),
                    poseMax.hashCode),
                pronoun.hashCode),
            stamina.hashCode),
        team.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('Actor')
          ..add('anatomy', anatomy)
          ..add('recoveringUntil', recoveringUntil)
          ..add('combineFunctionHandle', combineFunctionHandle)
          ..add('constitution', constitution)
          ..add('currentRoomName', currentRoomName)
          ..add('dexterity', dexterity)
          ..add('followingActorId', followingActorId)
          ..add('gold', gold)
          ..add('hitpoints', hitpoints)
          ..add('id', id)
          ..add('initiative', initiative)
          ..add('inventory', inventory)
          ..add('isActive', isActive)
          ..add('isConfused', isConfused)
          ..add('isPlayer', isPlayer)
          ..add('isSurvivor', isSurvivor)
          ..add('maxHitpoints', maxHitpoints)
          ..add('name', name)
          ..add('nameIsProperNoun', nameIsProperNoun)
          ..add('pose', pose)
          ..add('poseMax', poseMax)
          ..add('pronoun', pronoun)
          ..add('stamina', stamina)
          ..add('team', team))
        .toString();
  }
}

class ActorBuilder implements Builder<Actor, ActorBuilder> {
  _$Actor _$v;

  AnatomyBuilder _anatomy;
  AnatomyBuilder get anatomy => _$this._anatomy ??= new AnatomyBuilder();
  set anatomy(AnatomyBuilder anatomy) => _$this._anatomy = anatomy;

  DateTime _recoveringUntil;
  DateTime get recoveringUntil => _$this._recoveringUntil;
  set recoveringUntil(DateTime recoveringUntil) =>
      _$this._recoveringUntil = recoveringUntil;

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

  int _dexterity;
  int get dexterity => _$this._dexterity;
  set dexterity(int dexterity) => _$this._dexterity = dexterity;

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

  InventoryBuilder _inventory;
  InventoryBuilder get inventory =>
      _$this._inventory ??= new InventoryBuilder();
  set inventory(InventoryBuilder inventory) => _$this._inventory = inventory;

  bool _isActive;
  bool get isActive => _$this._isActive;
  set isActive(bool isActive) => _$this._isActive = isActive;

  bool _isConfused;
  bool get isConfused => _$this._isConfused;
  set isConfused(bool isConfused) => _$this._isConfused = isConfused;

  bool _isPlayer;
  bool get isPlayer => _$this._isPlayer;
  set isPlayer(bool isPlayer) => _$this._isPlayer = isPlayer;

  bool _isSurvivor;
  bool get isSurvivor => _$this._isSurvivor;
  set isSurvivor(bool isSurvivor) => _$this._isSurvivor = isSurvivor;

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

  Pose _poseMax;
  Pose get poseMax => _$this._poseMax;
  set poseMax(Pose poseMax) => _$this._poseMax = poseMax;

  PronounBuilder _pronoun;
  PronounBuilder get pronoun => _$this._pronoun ??= new PronounBuilder();
  set pronoun(PronounBuilder pronoun) => _$this._pronoun = pronoun;

  int _stamina;
  int get stamina => _$this._stamina;
  set stamina(int stamina) => _$this._stamina = stamina;

  TeamBuilder _team;
  TeamBuilder get team => _$this._team ??= new TeamBuilder();
  set team(TeamBuilder team) => _$this._team = team;

  ActorBuilder();

  ActorBuilder get _$this {
    if (_$v != null) {
      _anatomy = _$v.anatomy?.toBuilder();
      _recoveringUntil = _$v.recoveringUntil;
      _combineFunctionHandle = _$v.combineFunctionHandle;
      _constitution = _$v.constitution;
      _currentRoomName = _$v.currentRoomName;
      _dexterity = _$v.dexterity;
      _followingActorId = _$v.followingActorId;
      _gold = _$v.gold;
      _hitpoints = _$v.hitpoints;
      _id = _$v.id;
      _initiative = _$v.initiative;
      _inventory = _$v.inventory?.toBuilder();
      _isActive = _$v.isActive;
      _isConfused = _$v.isConfused;
      _isPlayer = _$v.isPlayer;
      _isSurvivor = _$v.isSurvivor;
      _maxHitpoints = _$v.maxHitpoints;
      _name = _$v.name;
      _nameIsProperNoun = _$v.nameIsProperNoun;
      _pose = _$v.pose;
      _poseMax = _$v.poseMax;
      _pronoun = _$v.pronoun?.toBuilder();
      _stamina = _$v.stamina;
      _team = _$v.team?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Actor other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$Actor;
  }

  @override
  void update(void updates(ActorBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$Actor build() {
    _$Actor _$result;
    try {
      _$result = _$v ??
          new _$Actor._(
              anatomy: anatomy.build(),
              recoveringUntil: recoveringUntil,
              combineFunctionHandle: combineFunctionHandle,
              constitution: constitution,
              currentRoomName: currentRoomName,
              dexterity: dexterity,
              followingActorId: followingActorId,
              gold: gold,
              hitpoints: hitpoints,
              id: id,
              initiative: initiative,
              inventory: inventory.build(),
              isActive: isActive,
              isConfused: isConfused,
              isPlayer: isPlayer,
              isSurvivor: isSurvivor,
              maxHitpoints: maxHitpoints,
              name: name,
              nameIsProperNoun: nameIsProperNoun,
              pose: pose,
              poseMax: poseMax,
              pronoun: pronoun.build(),
              stamina: stamina,
              team: team.build());
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'anatomy';
        anatomy.build();

        _$failedField = 'inventory';
        inventory.build();

        _$failedField = 'pronoun';
        pronoun.build();

        _$failedField = 'team';
        team.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'Actor', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
