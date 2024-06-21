// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'actor.dart';

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
  Iterable<Object?> serialize(Serializers serializers, Actor object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'anatomy',
      serializers.serialize(object.anatomy,
          specifiedType: const FullType(Anatomy)),
      'constitution',
      serializers.serialize(object.constitution,
          specifiedType: const FullType(int)),
      'dexterity',
      serializers.serialize(object.dexterity,
          specifiedType: const FullType(int)),
      'foldFunctionHandle',
      serializers.serialize(object.foldFunctionHandle,
          specifiedType: const FullType(String)),
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
      'isInvincible',
      serializers.serialize(object.isInvincible,
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
      'npc',
      serializers.serialize(object.npc,
          specifiedType: const FullType(NpcCapability)),
      'pose',
      serializers.serialize(object.pose, specifiedType: const FullType(Pose)),
      'poseMax',
      serializers.serialize(object.poseMax,
          specifiedType: const FullType(Pose)),
      'pronoun',
      serializers.serialize(object.pronoun,
          specifiedType: const FullType(Pronoun)),
      'recoveringUntil',
      serializers.serialize(object.recoveringUntil,
          specifiedType: const FullType(DateTime)),
      'sanity',
      serializers.serialize(object.sanity, specifiedType: const FullType(int)),
      'stamina',
      serializers.serialize(object.stamina, specifiedType: const FullType(int)),
      'team',
      serializers.serialize(object.team, specifiedType: const FullType(Team)),
    ];
    Object? value;
    value = object.adjective;
    if (value != null) {
      result
        ..add('adjective')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(String)));
    }
    value = object.currentRoomName;
    if (value != null) {
      result
        ..add('currentRoomName')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(String)));
    }
    value = object.director;
    if (value != null) {
      result
        ..add('director')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(DirectorCapability)));
    }
    return result;
  }

  @override
  Actor deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ActorBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'adjective':
          result.adjective = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String?;
          break;
        case 'anatomy':
          result.anatomy.replace(serializers.deserialize(value,
              specifiedType: const FullType(Anatomy))! as Anatomy);
          break;
        case 'constitution':
          result.constitution = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'currentRoomName':
          result.currentRoomName = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String?;
          break;
        case 'dexterity':
          result.dexterity = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'director':
          result.director.replace(serializers.deserialize(value,
                  specifiedType: const FullType(DirectorCapability))!
              as DirectorCapability);
          break;
        case 'foldFunctionHandle':
          result.foldFunctionHandle = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'gold':
          result.gold = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'hitpoints':
          result.hitpoints = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'initiative':
          result.initiative = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'inventory':
          result.inventory.replace(serializers.deserialize(value,
              specifiedType: const FullType(Inventory))! as Inventory);
          break;
        case 'isActive':
          result.isActive = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'isConfused':
          result.isConfused = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'isInvincible':
          result.isInvincible = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'isPlayer':
          result.isPlayer = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'isSurvivor':
          result.isSurvivor = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'maxHitpoints':
          result.maxHitpoints = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'nameIsProperNoun':
          result.nameIsProperNoun = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'npc':
          result.npc.replace(serializers.deserialize(value,
              specifiedType: const FullType(NpcCapability))! as NpcCapability);
          break;
        case 'pose':
          result.pose = serializers.deserialize(value,
              specifiedType: const FullType(Pose))! as Pose;
          break;
        case 'poseMax':
          result.poseMax = serializers.deserialize(value,
              specifiedType: const FullType(Pose))! as Pose;
          break;
        case 'pronoun':
          result.pronoun.replace(serializers.deserialize(value,
              specifiedType: const FullType(Pronoun))! as Pronoun);
          break;
        case 'recoveringUntil':
          result.recoveringUntil = serializers.deserialize(value,
              specifiedType: const FullType(DateTime))! as DateTime;
          break;
        case 'sanity':
          result.sanity = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'stamina':
          result.stamina = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'team':
          result.team.replace(serializers.deserialize(value,
              specifiedType: const FullType(Team))! as Team);
          break;
      }
    }

    return result.build();
  }
}

class _$Actor extends Actor {
  @override
  final String? adjective;
  @override
  final Anatomy anatomy;
  @override
  final int constitution;
  @override
  final String? currentRoomName;
  @override
  final int dexterity;
  @override
  final DirectorCapability? director;
  @override
  final String foldFunctionHandle;
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
  final bool isInvincible;
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
  final NpcCapability npc;
  @override
  final Pose pose;
  @override
  final Pose poseMax;
  @override
  final Pronoun pronoun;
  @override
  final DateTime recoveringUntil;
  @override
  final int sanity;
  @override
  final int stamina;
  @override
  final Team team;

  factory _$Actor([void Function(ActorBuilder)? updates]) =>
      (new ActorBuilder()..update(updates))._build();

  _$Actor._(
      {this.adjective,
      required this.anatomy,
      required this.constitution,
      this.currentRoomName,
      required this.dexterity,
      this.director,
      required this.foldFunctionHandle,
      required this.gold,
      required this.hitpoints,
      required this.id,
      required this.initiative,
      required this.inventory,
      required this.isActive,
      required this.isConfused,
      required this.isInvincible,
      required this.isPlayer,
      required this.isSurvivor,
      required this.maxHitpoints,
      required this.name,
      required this.nameIsProperNoun,
      required this.npc,
      required this.pose,
      required this.poseMax,
      required this.pronoun,
      required this.recoveringUntil,
      required this.sanity,
      required this.stamina,
      required this.team})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(anatomy, r'Actor', 'anatomy');
    BuiltValueNullFieldError.checkNotNull(
        constitution, r'Actor', 'constitution');
    BuiltValueNullFieldError.checkNotNull(dexterity, r'Actor', 'dexterity');
    BuiltValueNullFieldError.checkNotNull(
        foldFunctionHandle, r'Actor', 'foldFunctionHandle');
    BuiltValueNullFieldError.checkNotNull(gold, r'Actor', 'gold');
    BuiltValueNullFieldError.checkNotNull(hitpoints, r'Actor', 'hitpoints');
    BuiltValueNullFieldError.checkNotNull(id, r'Actor', 'id');
    BuiltValueNullFieldError.checkNotNull(initiative, r'Actor', 'initiative');
    BuiltValueNullFieldError.checkNotNull(inventory, r'Actor', 'inventory');
    BuiltValueNullFieldError.checkNotNull(isActive, r'Actor', 'isActive');
    BuiltValueNullFieldError.checkNotNull(isConfused, r'Actor', 'isConfused');
    BuiltValueNullFieldError.checkNotNull(
        isInvincible, r'Actor', 'isInvincible');
    BuiltValueNullFieldError.checkNotNull(isPlayer, r'Actor', 'isPlayer');
    BuiltValueNullFieldError.checkNotNull(isSurvivor, r'Actor', 'isSurvivor');
    BuiltValueNullFieldError.checkNotNull(
        maxHitpoints, r'Actor', 'maxHitpoints');
    BuiltValueNullFieldError.checkNotNull(name, r'Actor', 'name');
    BuiltValueNullFieldError.checkNotNull(
        nameIsProperNoun, r'Actor', 'nameIsProperNoun');
    BuiltValueNullFieldError.checkNotNull(npc, r'Actor', 'npc');
    BuiltValueNullFieldError.checkNotNull(pose, r'Actor', 'pose');
    BuiltValueNullFieldError.checkNotNull(poseMax, r'Actor', 'poseMax');
    BuiltValueNullFieldError.checkNotNull(pronoun, r'Actor', 'pronoun');
    BuiltValueNullFieldError.checkNotNull(
        recoveringUntil, r'Actor', 'recoveringUntil');
    BuiltValueNullFieldError.checkNotNull(sanity, r'Actor', 'sanity');
    BuiltValueNullFieldError.checkNotNull(stamina, r'Actor', 'stamina');
    BuiltValueNullFieldError.checkNotNull(team, r'Actor', 'team');
  }

  @override
  Actor rebuild(void Function(ActorBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ActorBuilder toBuilder() => new ActorBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Actor &&
        adjective == other.adjective &&
        anatomy == other.anatomy &&
        constitution == other.constitution &&
        currentRoomName == other.currentRoomName &&
        dexterity == other.dexterity &&
        director == other.director &&
        foldFunctionHandle == other.foldFunctionHandle &&
        gold == other.gold &&
        hitpoints == other.hitpoints &&
        id == other.id &&
        initiative == other.initiative &&
        inventory == other.inventory &&
        isActive == other.isActive &&
        isConfused == other.isConfused &&
        isInvincible == other.isInvincible &&
        isPlayer == other.isPlayer &&
        isSurvivor == other.isSurvivor &&
        maxHitpoints == other.maxHitpoints &&
        name == other.name &&
        nameIsProperNoun == other.nameIsProperNoun &&
        npc == other.npc &&
        pose == other.pose &&
        poseMax == other.poseMax &&
        pronoun == other.pronoun &&
        recoveringUntil == other.recoveringUntil &&
        sanity == other.sanity &&
        stamina == other.stamina &&
        team == other.team;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, adjective.hashCode);
    _$hash = $jc(_$hash, anatomy.hashCode);
    _$hash = $jc(_$hash, constitution.hashCode);
    _$hash = $jc(_$hash, currentRoomName.hashCode);
    _$hash = $jc(_$hash, dexterity.hashCode);
    _$hash = $jc(_$hash, director.hashCode);
    _$hash = $jc(_$hash, foldFunctionHandle.hashCode);
    _$hash = $jc(_$hash, gold.hashCode);
    _$hash = $jc(_$hash, hitpoints.hashCode);
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, initiative.hashCode);
    _$hash = $jc(_$hash, inventory.hashCode);
    _$hash = $jc(_$hash, isActive.hashCode);
    _$hash = $jc(_$hash, isConfused.hashCode);
    _$hash = $jc(_$hash, isInvincible.hashCode);
    _$hash = $jc(_$hash, isPlayer.hashCode);
    _$hash = $jc(_$hash, isSurvivor.hashCode);
    _$hash = $jc(_$hash, maxHitpoints.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, nameIsProperNoun.hashCode);
    _$hash = $jc(_$hash, npc.hashCode);
    _$hash = $jc(_$hash, pose.hashCode);
    _$hash = $jc(_$hash, poseMax.hashCode);
    _$hash = $jc(_$hash, pronoun.hashCode);
    _$hash = $jc(_$hash, recoveringUntil.hashCode);
    _$hash = $jc(_$hash, sanity.hashCode);
    _$hash = $jc(_$hash, stamina.hashCode);
    _$hash = $jc(_$hash, team.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }
}

class ActorBuilder implements Builder<Actor, ActorBuilder> {
  _$Actor? _$v;

  String? _adjective;
  String? get adjective => _$this._adjective;
  set adjective(String? adjective) => _$this._adjective = adjective;

  AnatomyBuilder? _anatomy;
  AnatomyBuilder get anatomy => _$this._anatomy ??= new AnatomyBuilder();
  set anatomy(AnatomyBuilder? anatomy) => _$this._anatomy = anatomy;

  int? _constitution;
  int? get constitution => _$this._constitution;
  set constitution(int? constitution) => _$this._constitution = constitution;

  String? _currentRoomName;
  String? get currentRoomName => _$this._currentRoomName;
  set currentRoomName(String? currentRoomName) =>
      _$this._currentRoomName = currentRoomName;

  int? _dexterity;
  int? get dexterity => _$this._dexterity;
  set dexterity(int? dexterity) => _$this._dexterity = dexterity;

  DirectorCapabilityBuilder? _director;
  DirectorCapabilityBuilder get director =>
      _$this._director ??= new DirectorCapabilityBuilder();
  set director(DirectorCapabilityBuilder? director) =>
      _$this._director = director;

  String? _foldFunctionHandle;
  String? get foldFunctionHandle => _$this._foldFunctionHandle;
  set foldFunctionHandle(String? foldFunctionHandle) =>
      _$this._foldFunctionHandle = foldFunctionHandle;

  int? _gold;
  int? get gold => _$this._gold;
  set gold(int? gold) => _$this._gold = gold;

  int? _hitpoints;
  int? get hitpoints => _$this._hitpoints;
  set hitpoints(int? hitpoints) => _$this._hitpoints = hitpoints;

  int? _id;
  int? get id => _$this._id;
  set id(int? id) => _$this._id = id;

  int? _initiative;
  int? get initiative => _$this._initiative;
  set initiative(int? initiative) => _$this._initiative = initiative;

  InventoryBuilder? _inventory;
  InventoryBuilder get inventory =>
      _$this._inventory ??= new InventoryBuilder();
  set inventory(InventoryBuilder? inventory) => _$this._inventory = inventory;

  bool? _isActive;
  bool? get isActive => _$this._isActive;
  set isActive(bool? isActive) => _$this._isActive = isActive;

  bool? _isConfused;
  bool? get isConfused => _$this._isConfused;
  set isConfused(bool? isConfused) => _$this._isConfused = isConfused;

  bool? _isInvincible;
  bool? get isInvincible => _$this._isInvincible;
  set isInvincible(bool? isInvincible) => _$this._isInvincible = isInvincible;

  bool? _isPlayer;
  bool? get isPlayer => _$this._isPlayer;
  set isPlayer(bool? isPlayer) => _$this._isPlayer = isPlayer;

  bool? _isSurvivor;
  bool? get isSurvivor => _$this._isSurvivor;
  set isSurvivor(bool? isSurvivor) => _$this._isSurvivor = isSurvivor;

  int? _maxHitpoints;
  int? get maxHitpoints => _$this._maxHitpoints;
  set maxHitpoints(int? maxHitpoints) => _$this._maxHitpoints = maxHitpoints;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  bool? _nameIsProperNoun;
  bool? get nameIsProperNoun => _$this._nameIsProperNoun;
  set nameIsProperNoun(bool? nameIsProperNoun) =>
      _$this._nameIsProperNoun = nameIsProperNoun;

  NpcCapabilityBuilder? _npc;
  NpcCapabilityBuilder get npc => _$this._npc ??= new NpcCapabilityBuilder();
  set npc(NpcCapabilityBuilder? npc) => _$this._npc = npc;

  Pose? _pose;
  Pose? get pose => _$this._pose;
  set pose(Pose? pose) => _$this._pose = pose;

  Pose? _poseMax;
  Pose? get poseMax => _$this._poseMax;
  set poseMax(Pose? poseMax) => _$this._poseMax = poseMax;

  PronounBuilder? _pronoun;
  PronounBuilder get pronoun => _$this._pronoun ??= new PronounBuilder();
  set pronoun(PronounBuilder? pronoun) => _$this._pronoun = pronoun;

  DateTime? _recoveringUntil;
  DateTime? get recoveringUntil => _$this._recoveringUntil;
  set recoveringUntil(DateTime? recoveringUntil) =>
      _$this._recoveringUntil = recoveringUntil;

  int? _sanity;
  int? get sanity => _$this._sanity;
  set sanity(int? sanity) => _$this._sanity = sanity;

  int? _stamina;
  int? get stamina => _$this._stamina;
  set stamina(int? stamina) => _$this._stamina = stamina;

  TeamBuilder? _team;
  TeamBuilder get team => _$this._team ??= new TeamBuilder();
  set team(TeamBuilder? team) => _$this._team = team;

  ActorBuilder();

  ActorBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _adjective = $v.adjective;
      _anatomy = $v.anatomy.toBuilder();
      _constitution = $v.constitution;
      _currentRoomName = $v.currentRoomName;
      _dexterity = $v.dexterity;
      _director = $v.director?.toBuilder();
      _foldFunctionHandle = $v.foldFunctionHandle;
      _gold = $v.gold;
      _hitpoints = $v.hitpoints;
      _id = $v.id;
      _initiative = $v.initiative;
      _inventory = $v.inventory.toBuilder();
      _isActive = $v.isActive;
      _isConfused = $v.isConfused;
      _isInvincible = $v.isInvincible;
      _isPlayer = $v.isPlayer;
      _isSurvivor = $v.isSurvivor;
      _maxHitpoints = $v.maxHitpoints;
      _name = $v.name;
      _nameIsProperNoun = $v.nameIsProperNoun;
      _npc = $v.npc.toBuilder();
      _pose = $v.pose;
      _poseMax = $v.poseMax;
      _pronoun = $v.pronoun.toBuilder();
      _recoveringUntil = $v.recoveringUntil;
      _sanity = $v.sanity;
      _stamina = $v.stamina;
      _team = $v.team.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Actor other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$Actor;
  }

  @override
  void update(void Function(ActorBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  Actor build() => _build();

  _$Actor _build() {
    _$Actor _$result;
    try {
      _$result = _$v ??
          new _$Actor._(
              adjective: adjective,
              anatomy: anatomy.build(),
              constitution: BuiltValueNullFieldError.checkNotNull(
                  constitution, r'Actor', 'constitution'),
              currentRoomName: currentRoomName,
              dexterity: BuiltValueNullFieldError.checkNotNull(
                  dexterity, r'Actor', 'dexterity'),
              director: _director?.build(),
              foldFunctionHandle: BuiltValueNullFieldError.checkNotNull(
                  foldFunctionHandle, r'Actor', 'foldFunctionHandle'),
              gold:
                  BuiltValueNullFieldError.checkNotNull(gold, r'Actor', 'gold'),
              hitpoints: BuiltValueNullFieldError.checkNotNull(
                  hitpoints, r'Actor', 'hitpoints'),
              id: BuiltValueNullFieldError.checkNotNull(id, r'Actor', 'id'),
              initiative: BuiltValueNullFieldError.checkNotNull(
                  initiative, r'Actor', 'initiative'),
              inventory: inventory.build(),
              isActive: BuiltValueNullFieldError.checkNotNull(
                  isActive, r'Actor', 'isActive'),
              isConfused: BuiltValueNullFieldError.checkNotNull(
                  isConfused, r'Actor', 'isConfused'),
              isInvincible: BuiltValueNullFieldError.checkNotNull(
                  isInvincible, r'Actor', 'isInvincible'),
              isPlayer:
                  BuiltValueNullFieldError.checkNotNull(isPlayer, r'Actor', 'isPlayer'),
              isSurvivor: BuiltValueNullFieldError.checkNotNull(isSurvivor, r'Actor', 'isSurvivor'),
              maxHitpoints: BuiltValueNullFieldError.checkNotNull(maxHitpoints, r'Actor', 'maxHitpoints'),
              name: BuiltValueNullFieldError.checkNotNull(name, r'Actor', 'name'),
              nameIsProperNoun: BuiltValueNullFieldError.checkNotNull(nameIsProperNoun, r'Actor', 'nameIsProperNoun'),
              npc: npc.build(),
              pose: BuiltValueNullFieldError.checkNotNull(pose, r'Actor', 'pose'),
              poseMax: BuiltValueNullFieldError.checkNotNull(poseMax, r'Actor', 'poseMax'),
              pronoun: pronoun.build(),
              recoveringUntil: BuiltValueNullFieldError.checkNotNull(recoveringUntil, r'Actor', 'recoveringUntil'),
              sanity: BuiltValueNullFieldError.checkNotNull(sanity, r'Actor', 'sanity'),
              stamina: BuiltValueNullFieldError.checkNotNull(stamina, r'Actor', 'stamina'),
              team: team.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'anatomy';
        anatomy.build();

        _$failedField = 'director';
        _director?.build();

        _$failedField = 'inventory';
        inventory.build();

        _$failedField = 'npc';
        npc.build();

        _$failedField = 'pronoun';
        pronoun.build();

        _$failedField = 'team';
        team.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'Actor', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
