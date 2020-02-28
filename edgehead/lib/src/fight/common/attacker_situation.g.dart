// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.fight.attacker_situation;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const AttackDirection _$fromLeft = const AttackDirection._('fromLeft');
const AttackDirection _$fromRight = const AttackDirection._('fromRight');
const AttackDirection _$primaryArm = const AttackDirection._('primaryArm');
const AttackDirection _$secondaryArm = const AttackDirection._('secondaryArm');
const AttackDirection _$neck = const AttackDirection._('neck');
const AttackDirection _$leftLeg = const AttackDirection._('leftLeg');
const AttackDirection _$rightLeg = const AttackDirection._('rightLeg');
const AttackDirection _$leftEye = const AttackDirection._('leftEye');
const AttackDirection _$rightEye = const AttackDirection._('rightEye');
const AttackDirection _$torso = const AttackDirection._('torso');
const AttackDirection _$head = const AttackDirection._('head');
const AttackDirection _$unspecified = const AttackDirection._('unspecified');

AttackDirection _$valueOfAttackDirection(String name) {
  switch (name) {
    case 'fromLeft':
      return _$fromLeft;
    case 'fromRight':
      return _$fromRight;
    case 'primaryArm':
      return _$primaryArm;
    case 'secondaryArm':
      return _$secondaryArm;
    case 'neck':
      return _$neck;
    case 'leftLeg':
      return _$leftLeg;
    case 'rightLeg':
      return _$rightLeg;
    case 'leftEye':
      return _$leftEye;
    case 'rightEye':
      return _$rightEye;
    case 'torso':
      return _$torso;
    case 'head':
      return _$head;
    case 'unspecified':
      return _$unspecified;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<AttackDirection> _$attackDirectionValues =
    new BuiltSet<AttackDirection>(const <AttackDirection>[
  _$fromLeft,
  _$fromRight,
  _$primaryArm,
  _$secondaryArm,
  _$neck,
  _$leftLeg,
  _$rightLeg,
  _$leftEye,
  _$rightEye,
  _$torso,
  _$head,
  _$unspecified,
]);

Serializer<AttackDirection> _$attackDirectionSerializer =
    new _$AttackDirectionSerializer();
Serializer<AttackerSituation> _$attackerSituationSerializer =
    new _$AttackerSituationSerializer();
Serializer<MoveEntity> _$moveEntitySerializer = new _$MoveEntitySerializer();

class _$AttackDirectionSerializer
    implements PrimitiveSerializer<AttackDirection> {
  @override
  final Iterable<Type> types = const <Type>[AttackDirection];
  @override
  final String wireName = 'AttackDirection';

  @override
  Object serialize(Serializers serializers, AttackDirection object,
          {FullType specifiedType = FullType.unspecified}) =>
      object.name;

  @override
  AttackDirection deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      AttackDirection.valueOf(serialized as String);
}

class _$AttackerSituationSerializer
    implements StructuredSerializer<AttackerSituation> {
  @override
  final Iterable<Type> types = const [AttackerSituation, _$AttackerSituation];
  @override
  final String wireName = 'AttackerSituation';

  @override
  Iterable<Object> serialize(Serializers serializers, AttackerSituation object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'attackDirection',
      serializers.serialize(object.attackDirection,
          specifiedType: const FullType(AttackDirection)),
      'attacker',
      serializers.serialize(object.attacker,
          specifiedType: const FullType(int)),
      'builtEnemyTargetActionGenerators',
      serializers.serialize(object.builtEnemyTargetActionGenerators,
          specifiedType: const FullType(
              BuiltList, const [const FullType(EnemyTargetAction)])),
      'builtOtherActorActionGenerators',
      serializers.serialize(object.builtOtherActorActionGenerators,
          specifiedType: const FullType(
              BuiltList, const [const FullType(OtherActorAction)])),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'move',
      serializers.serialize(object.move,
          specifiedType: const FullType(MoveEntity)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'target',
      serializers.serialize(object.target, specifiedType: const FullType(int)),
      'turn',
      serializers.serialize(object.turn, specifiedType: const FullType(int)),
    ];
    if (object.additionalData != null) {
      result
        ..add('additionalData')
        ..add(serializers.serialize(object.additionalData,
            specifiedType: const FullType(String)));
    }
    return result;
  }

  @override
  AttackerSituation deserialize(
      Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new AttackerSituationBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'additionalData':
          result.additionalData = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'attackDirection':
          result.attackDirection = serializers.deserialize(value,
                  specifiedType: const FullType(AttackDirection))
              as AttackDirection;
          break;
        case 'attacker':
          result.attacker = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'builtEnemyTargetActionGenerators':
          result.builtEnemyTargetActionGenerators.replace(
              serializers.deserialize(value,
                      specifiedType: const FullType(
                          BuiltList, const [const FullType(EnemyTargetAction)]))
                  as BuiltList<dynamic>);
          break;
        case 'builtOtherActorActionGenerators':
          result.builtOtherActorActionGenerators.replace(
              serializers.deserialize(value,
                      specifiedType: const FullType(
                          BuiltList, const [const FullType(OtherActorAction)]))
                  as BuiltList<dynamic>);
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'move':
          result.move.replace(serializers.deserialize(value,
              specifiedType: const FullType(MoveEntity)) as MoveEntity);
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'target':
          result.target = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'turn':
          result.turn = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
      }
    }

    return result.build();
  }
}

class _$MoveEntitySerializer implements StructuredSerializer<MoveEntity> {
  @override
  final Iterable<Type> types = const [MoveEntity, _$MoveEntity];
  @override
  final String wireName = 'MoveEntity';

  @override
  Iterable<Object> serialize(Serializers serializers, MoveEntity object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'firstOwnerId',
      serializers.serialize(object.firstOwnerId,
          specifiedType: const FullType(int)),
    ];

    return result;
  }

  @override
  MoveEntity deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new MoveEntityBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'firstOwnerId':
          result.firstOwnerId = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
      }
    }

    return result.build();
  }
}

class _$AttackerSituation extends AttackerSituation {
  @override
  final String additionalData;
  @override
  final AttackDirection attackDirection;
  @override
  final int attacker;
  @override
  final BuiltList<EnemyTargetAction> builtEnemyTargetActionGenerators;
  @override
  final BuiltList<OtherActorAction> builtOtherActorActionGenerators;
  @override
  final int id;
  @override
  final MoveEntity move;
  @override
  final String name;
  @override
  final int target;
  @override
  final int turn;

  factory _$AttackerSituation(
          [void Function(AttackerSituationBuilder) updates]) =>
      (new AttackerSituationBuilder()..update(updates)).build();

  _$AttackerSituation._(
      {this.additionalData,
      this.attackDirection,
      this.attacker,
      this.builtEnemyTargetActionGenerators,
      this.builtOtherActorActionGenerators,
      this.id,
      this.move,
      this.name,
      this.target,
      this.turn})
      : super._() {
    if (attackDirection == null) {
      throw new BuiltValueNullFieldError(
          'AttackerSituation', 'attackDirection');
    }
    if (attacker == null) {
      throw new BuiltValueNullFieldError('AttackerSituation', 'attacker');
    }
    if (builtEnemyTargetActionGenerators == null) {
      throw new BuiltValueNullFieldError(
          'AttackerSituation', 'builtEnemyTargetActionGenerators');
    }
    if (builtOtherActorActionGenerators == null) {
      throw new BuiltValueNullFieldError(
          'AttackerSituation', 'builtOtherActorActionGenerators');
    }
    if (id == null) {
      throw new BuiltValueNullFieldError('AttackerSituation', 'id');
    }
    if (move == null) {
      throw new BuiltValueNullFieldError('AttackerSituation', 'move');
    }
    if (name == null) {
      throw new BuiltValueNullFieldError('AttackerSituation', 'name');
    }
    if (target == null) {
      throw new BuiltValueNullFieldError('AttackerSituation', 'target');
    }
    if (turn == null) {
      throw new BuiltValueNullFieldError('AttackerSituation', 'turn');
    }
  }

  @override
  AttackerSituation rebuild(void Function(AttackerSituationBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AttackerSituationBuilder toBuilder() =>
      new AttackerSituationBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AttackerSituation &&
        additionalData == other.additionalData &&
        attackDirection == other.attackDirection &&
        attacker == other.attacker &&
        builtEnemyTargetActionGenerators ==
            other.builtEnemyTargetActionGenerators &&
        builtOtherActorActionGenerators ==
            other.builtOtherActorActionGenerators &&
        id == other.id &&
        move == other.move &&
        name == other.name &&
        target == other.target &&
        turn == other.turn;
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
                                    $jc($jc(0, additionalData.hashCode),
                                        attackDirection.hashCode),
                                    attacker.hashCode),
                                builtEnemyTargetActionGenerators.hashCode),
                            builtOtherActorActionGenerators.hashCode),
                        id.hashCode),
                    move.hashCode),
                name.hashCode),
            target.hashCode),
        turn.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('AttackerSituation')
          ..add('additionalData', additionalData)
          ..add('attackDirection', attackDirection)
          ..add('attacker', attacker)
          ..add('builtEnemyTargetActionGenerators',
              builtEnemyTargetActionGenerators)
          ..add('builtOtherActorActionGenerators',
              builtOtherActorActionGenerators)
          ..add('id', id)
          ..add('move', move)
          ..add('name', name)
          ..add('target', target)
          ..add('turn', turn))
        .toString();
  }
}

class AttackerSituationBuilder
    implements Builder<AttackerSituation, AttackerSituationBuilder> {
  _$AttackerSituation _$v;

  String _additionalData;
  String get additionalData => _$this._additionalData;
  set additionalData(String additionalData) =>
      _$this._additionalData = additionalData;

  AttackDirection _attackDirection;
  AttackDirection get attackDirection => _$this._attackDirection;
  set attackDirection(AttackDirection attackDirection) =>
      _$this._attackDirection = attackDirection;

  int _attacker;
  int get attacker => _$this._attacker;
  set attacker(int attacker) => _$this._attacker = attacker;

  ListBuilder<EnemyTargetAction> _builtEnemyTargetActionGenerators;
  ListBuilder<EnemyTargetAction> get builtEnemyTargetActionGenerators =>
      _$this._builtEnemyTargetActionGenerators ??=
          new ListBuilder<EnemyTargetAction>();
  set builtEnemyTargetActionGenerators(
          ListBuilder<EnemyTargetAction> builtEnemyTargetActionGenerators) =>
      _$this._builtEnemyTargetActionGenerators =
          builtEnemyTargetActionGenerators;

  ListBuilder<OtherActorAction> _builtOtherActorActionGenerators;
  ListBuilder<OtherActorAction> get builtOtherActorActionGenerators =>
      _$this._builtOtherActorActionGenerators ??=
          new ListBuilder<OtherActorAction>();
  set builtOtherActorActionGenerators(
          ListBuilder<OtherActorAction> builtOtherActorActionGenerators) =>
      _$this._builtOtherActorActionGenerators = builtOtherActorActionGenerators;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  MoveEntityBuilder _move;
  MoveEntityBuilder get move => _$this._move ??= new MoveEntityBuilder();
  set move(MoveEntityBuilder move) => _$this._move = move;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  int _target;
  int get target => _$this._target;
  set target(int target) => _$this._target = target;

  int _turn;
  int get turn => _$this._turn;
  set turn(int turn) => _$this._turn = turn;

  AttackerSituationBuilder();

  AttackerSituationBuilder get _$this {
    if (_$v != null) {
      _additionalData = _$v.additionalData;
      _attackDirection = _$v.attackDirection;
      _attacker = _$v.attacker;
      _builtEnemyTargetActionGenerators =
          _$v.builtEnemyTargetActionGenerators?.toBuilder();
      _builtOtherActorActionGenerators =
          _$v.builtOtherActorActionGenerators?.toBuilder();
      _id = _$v.id;
      _move = _$v.move?.toBuilder();
      _name = _$v.name;
      _target = _$v.target;
      _turn = _$v.turn;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AttackerSituation other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$AttackerSituation;
  }

  @override
  void update(void Function(AttackerSituationBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$AttackerSituation build() {
    _$AttackerSituation _$result;
    try {
      _$result = _$v ??
          new _$AttackerSituation._(
              additionalData: additionalData,
              attackDirection: attackDirection,
              attacker: attacker,
              builtEnemyTargetActionGenerators:
                  builtEnemyTargetActionGenerators.build(),
              builtOtherActorActionGenerators:
                  builtOtherActorActionGenerators.build(),
              id: id,
              move: move.build(),
              name: name,
              target: target,
              turn: turn);
    } catch (_) {
      String _$failedField;
      try {
        _$failedField = 'builtEnemyTargetActionGenerators';
        builtEnemyTargetActionGenerators.build();
        _$failedField = 'builtOtherActorActionGenerators';
        builtOtherActorActionGenerators.build();

        _$failedField = 'move';
        move.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            'AttackerSituation', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

class _$MoveEntity extends MoveEntity {
  @override
  final int id;
  @override
  final String name;
  @override
  final int firstOwnerId;

  factory _$MoveEntity([void Function(MoveEntityBuilder) updates]) =>
      (new MoveEntityBuilder()..update(updates)).build();

  _$MoveEntity._({this.id, this.name, this.firstOwnerId}) : super._() {
    if (id == null) {
      throw new BuiltValueNullFieldError('MoveEntity', 'id');
    }
    if (name == null) {
      throw new BuiltValueNullFieldError('MoveEntity', 'name');
    }
    if (firstOwnerId == null) {
      throw new BuiltValueNullFieldError('MoveEntity', 'firstOwnerId');
    }
  }

  @override
  MoveEntity rebuild(void Function(MoveEntityBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  MoveEntityBuilder toBuilder() => new MoveEntityBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is MoveEntity &&
        id == other.id &&
        name == other.name &&
        firstOwnerId == other.firstOwnerId;
  }

  @override
  int get hashCode {
    return $jf(
        $jc($jc($jc(0, id.hashCode), name.hashCode), firstOwnerId.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('MoveEntity')
          ..add('id', id)
          ..add('name', name)
          ..add('firstOwnerId', firstOwnerId))
        .toString();
  }
}

class MoveEntityBuilder implements Builder<MoveEntity, MoveEntityBuilder> {
  _$MoveEntity _$v;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  int _firstOwnerId;
  int get firstOwnerId => _$this._firstOwnerId;
  set firstOwnerId(int firstOwnerId) => _$this._firstOwnerId = firstOwnerId;

  MoveEntityBuilder();

  MoveEntityBuilder get _$this {
    if (_$v != null) {
      _id = _$v.id;
      _name = _$v.name;
      _firstOwnerId = _$v.firstOwnerId;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(MoveEntity other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$MoveEntity;
  }

  @override
  void update(void Function(MoveEntityBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$MoveEntity build() {
    final _$result = _$v ??
        new _$MoveEntity._(id: id, name: name, firstOwnerId: firstOwnerId);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
