// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'body_part.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const BodyPartDesignation _$neck = const BodyPartDesignation._('neck');
const BodyPartDesignation _$head = const BodyPartDesignation._('head');
const BodyPartDesignation _$leftLeg = const BodyPartDesignation._('leftLeg');
const BodyPartDesignation _$rightLeg = const BodyPartDesignation._('rightLeg');
const BodyPartDesignation _$teeth = const BodyPartDesignation._('teeth');
const BodyPartDesignation _$leftEye = const BodyPartDesignation._('leftEye');
const BodyPartDesignation _$rightEye = const BodyPartDesignation._('rightEye');
const BodyPartDesignation _$primaryArm =
    const BodyPartDesignation._('primaryArm');
const BodyPartDesignation _$primaryHand =
    const BodyPartDesignation._('primaryHand');
const BodyPartDesignation _$secondaryArm =
    const BodyPartDesignation._('secondaryArm');
const BodyPartDesignation _$secondaryHand =
    const BodyPartDesignation._('secondaryHand');
const BodyPartDesignation _$torso = const BodyPartDesignation._('torso');
const BodyPartDesignation _$tail = const BodyPartDesignation._('tail');
const BodyPartDesignation _$noSpecification =
    const BodyPartDesignation._('none');

BodyPartDesignation _$valueOfSpecifiedBodyPart(String name) {
  switch (name) {
    case 'neck':
      return _$neck;
    case 'head':
      return _$head;
    case 'leftLeg':
      return _$leftLeg;
    case 'rightLeg':
      return _$rightLeg;
    case 'teeth':
      return _$teeth;
    case 'leftEye':
      return _$leftEye;
    case 'rightEye':
      return _$rightEye;
    case 'primaryArm':
      return _$primaryArm;
    case 'primaryHand':
      return _$primaryHand;
    case 'secondaryArm':
      return _$secondaryArm;
    case 'secondaryHand':
      return _$secondaryHand;
    case 'torso':
      return _$torso;
    case 'tail':
      return _$tail;
    case 'none':
      return _$noSpecification;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<BodyPartDesignation> _$specificBodyPartValues =
    new BuiltSet<BodyPartDesignation>(const <BodyPartDesignation>[
  _$neck,
  _$head,
  _$leftLeg,
  _$rightLeg,
  _$teeth,
  _$leftEye,
  _$rightEye,
  _$primaryArm,
  _$primaryHand,
  _$secondaryArm,
  _$secondaryHand,
  _$torso,
  _$tail,
  _$noSpecification,
]);

const BodyPartFunction _$wielding = const BodyPartFunction._('wielding');
const BodyPartFunction _$mobile = const BodyPartFunction._('mobile');
const BodyPartFunction _$vision = const BodyPartFunction._('vision');
const BodyPartFunction _$damageDealing =
    const BodyPartFunction._('damageDealing');
const BodyPartFunction _$noFunction = const BodyPartFunction._('none');

BodyPartFunction _$valueOfBodyPartFunction(String name) {
  switch (name) {
    case 'wielding':
      return _$wielding;
    case 'mobile':
      return _$mobile;
    case 'vision':
      return _$vision;
    case 'damageDealing':
      return _$damageDealing;
    case 'none':
      return _$noFunction;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<BodyPartFunction> _$bodyPartFunctionValues =
    new BuiltSet<BodyPartFunction>(const <BodyPartFunction>[
  _$wielding,
  _$mobile,
  _$vision,
  _$damageDealing,
  _$noFunction,
]);

Serializer<BodyPart> _$bodyPartSerializer = new _$BodyPartSerializer();
Serializer<BodyPartDesignation> _$bodyPartDesignationSerializer =
    new _$BodyPartDesignationSerializer();
Serializer<BodyPartFunction> _$bodyPartFunctionSerializer =
    new _$BodyPartFunctionSerializer();

class _$BodyPartSerializer implements StructuredSerializer<BodyPart> {
  @override
  final Iterable<Type> types = const [BodyPart, _$BodyPart];
  @override
  final String wireName = 'BodyPart';

  @override
  Iterable<Object?> serialize(Serializers serializers, BodyPart object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'bluntHitsCount',
      serializers.serialize(object.bluntHitsCount,
          specifiedType: const FullType(int)),
      'children',
      serializers.serialize(object.children,
          specifiedType:
              const FullType(BuiltList, const [const FullType(BodyPart)])),
      'designation',
      serializers.serialize(object.designation,
          specifiedType: const FullType(BodyPartDesignation)),
      'firstOwnerId',
      serializers.serialize(object.firstOwnerId,
          specifiedType: const FullType(int)),
      'function',
      serializers.serialize(object.function,
          specifiedType: const FullType(BodyPartFunction)),
      'hitpoints',
      serializers.serialize(object.hitpoints,
          specifiedType: const FullType(int)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'isActive',
      serializers.serialize(object.isActive,
          specifiedType: const FullType(bool)),
      'isSeverable',
      serializers.serialize(object.isSeverable,
          specifiedType: const FullType(bool)),
      'isSevered',
      serializers.serialize(object.isSevered,
          specifiedType: const FullType(bool)),
      'isVital',
      serializers.serialize(object.isVital,
          specifiedType: const FullType(bool)),
      'majorCutsCount',
      serializers.serialize(object.majorCutsCount,
          specifiedType: const FullType(int)),
      'maxHitpoints',
      serializers.serialize(object.maxHitpoints,
          specifiedType: const FullType(int)),
      'minorCutsCount',
      serializers.serialize(object.minorCutsCount,
          specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
      'randomDesignation',
      serializers.serialize(object.randomDesignation,
          specifiedType: const FullType(String)),
      'swingSurfaceLeft',
      serializers.serialize(object.swingSurfaceLeft,
          specifiedType: const FullType(int)),
      'swingSurfaceRight',
      serializers.serialize(object.swingSurfaceRight,
          specifiedType: const FullType(int)),
      'thrustSurface',
      serializers.serialize(object.thrustSurface,
          specifiedType: const FullType(int)),
    ];
    Object? value;
    value = object.damageCapability;
    if (value != null) {
      result
        ..add('damageCapability')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(DamageCapability)));
    }
    return result;
  }

  @override
  BodyPart deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new BodyPartBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'bluntHitsCount':
          result.bluntHitsCount = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'children':
          result.children.replace(serializers.deserialize(value,
                  specifiedType: const FullType(
                      BuiltList, const [const FullType(BodyPart)]))!
              as BuiltList<Object?>);
          break;
        case 'damageCapability':
          result.damageCapability.replace(serializers.deserialize(value,
                  specifiedType: const FullType(DamageCapability))!
              as DamageCapability);
          break;
        case 'designation':
          result.designation = serializers.deserialize(value,
                  specifiedType: const FullType(BodyPartDesignation))!
              as BodyPartDesignation;
          break;
        case 'firstOwnerId':
          result.firstOwnerId = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'function':
          result.function = serializers.deserialize(value,
                  specifiedType: const FullType(BodyPartFunction))!
              as BodyPartFunction;
          break;
        case 'hitpoints':
          result.hitpoints = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'isActive':
          result.isActive = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'isSeverable':
          result.isSeverable = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'isSevered':
          result.isSevered = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'isVital':
          result.isVital = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'majorCutsCount':
          result.majorCutsCount = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'maxHitpoints':
          result.maxHitpoints = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'minorCutsCount':
          result.minorCutsCount = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'randomDesignation':
          result.randomDesignation = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
        case 'swingSurfaceLeft':
          result.swingSurfaceLeft = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'swingSurfaceRight':
          result.swingSurfaceRight = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
        case 'thrustSurface':
          result.thrustSurface = serializers.deserialize(value,
              specifiedType: const FullType(int))! as int;
          break;
      }
    }

    return result.build();
  }
}

class _$BodyPartDesignationSerializer
    implements PrimitiveSerializer<BodyPartDesignation> {
  @override
  final Iterable<Type> types = const <Type>[BodyPartDesignation];
  @override
  final String wireName = 'BodyPartDesignation';

  @override
  Object serialize(Serializers serializers, BodyPartDesignation object,
          {FullType specifiedType = FullType.unspecified}) =>
      object.name;

  @override
  BodyPartDesignation deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      BodyPartDesignation.valueOf(serialized as String);
}

class _$BodyPartFunctionSerializer
    implements PrimitiveSerializer<BodyPartFunction> {
  @override
  final Iterable<Type> types = const <Type>[BodyPartFunction];
  @override
  final String wireName = 'BodyPartFunction';

  @override
  Object serialize(Serializers serializers, BodyPartFunction object,
          {FullType specifiedType = FullType.unspecified}) =>
      object.name;

  @override
  BodyPartFunction deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      BodyPartFunction.valueOf(serialized as String);
}

class _$BodyPart extends BodyPart {
  @override
  final int bluntHitsCount;
  @override
  final BuiltList<BodyPart> children;
  @override
  final DamageCapability? damageCapability;
  @override
  final BodyPartDesignation designation;
  @override
  final int firstOwnerId;
  @override
  final BodyPartFunction function;
  @override
  final int hitpoints;
  @override
  final int id;
  @override
  final bool isActive;
  @override
  final bool isSeverable;
  @override
  final bool isSevered;
  @override
  final bool isVital;
  @override
  final int majorCutsCount;
  @override
  final int maxHitpoints;
  @override
  final int minorCutsCount;
  @override
  final String name;
  @override
  final String randomDesignation;
  @override
  final int swingSurfaceLeft;
  @override
  final int swingSurfaceRight;
  @override
  final int thrustSurface;

  factory _$BodyPart([void Function(BodyPartBuilder)? updates]) =>
      (new BodyPartBuilder()..update(updates))._build();

  _$BodyPart._(
      {required this.bluntHitsCount,
      required this.children,
      this.damageCapability,
      required this.designation,
      required this.firstOwnerId,
      required this.function,
      required this.hitpoints,
      required this.id,
      required this.isActive,
      required this.isSeverable,
      required this.isSevered,
      required this.isVital,
      required this.majorCutsCount,
      required this.maxHitpoints,
      required this.minorCutsCount,
      required this.name,
      required this.randomDesignation,
      required this.swingSurfaceLeft,
      required this.swingSurfaceRight,
      required this.thrustSurface})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        bluntHitsCount, r'BodyPart', 'bluntHitsCount');
    BuiltValueNullFieldError.checkNotNull(children, r'BodyPart', 'children');
    BuiltValueNullFieldError.checkNotNull(
        designation, r'BodyPart', 'designation');
    BuiltValueNullFieldError.checkNotNull(
        firstOwnerId, r'BodyPart', 'firstOwnerId');
    BuiltValueNullFieldError.checkNotNull(function, r'BodyPart', 'function');
    BuiltValueNullFieldError.checkNotNull(hitpoints, r'BodyPart', 'hitpoints');
    BuiltValueNullFieldError.checkNotNull(id, r'BodyPart', 'id');
    BuiltValueNullFieldError.checkNotNull(isActive, r'BodyPart', 'isActive');
    BuiltValueNullFieldError.checkNotNull(
        isSeverable, r'BodyPart', 'isSeverable');
    BuiltValueNullFieldError.checkNotNull(isSevered, r'BodyPart', 'isSevered');
    BuiltValueNullFieldError.checkNotNull(isVital, r'BodyPart', 'isVital');
    BuiltValueNullFieldError.checkNotNull(
        majorCutsCount, r'BodyPart', 'majorCutsCount');
    BuiltValueNullFieldError.checkNotNull(
        maxHitpoints, r'BodyPart', 'maxHitpoints');
    BuiltValueNullFieldError.checkNotNull(
        minorCutsCount, r'BodyPart', 'minorCutsCount');
    BuiltValueNullFieldError.checkNotNull(name, r'BodyPart', 'name');
    BuiltValueNullFieldError.checkNotNull(
        randomDesignation, r'BodyPart', 'randomDesignation');
    BuiltValueNullFieldError.checkNotNull(
        swingSurfaceLeft, r'BodyPart', 'swingSurfaceLeft');
    BuiltValueNullFieldError.checkNotNull(
        swingSurfaceRight, r'BodyPart', 'swingSurfaceRight');
    BuiltValueNullFieldError.checkNotNull(
        thrustSurface, r'BodyPart', 'thrustSurface');
  }

  @override
  BodyPart rebuild(void Function(BodyPartBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  BodyPartBuilder toBuilder() => new BodyPartBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is BodyPart &&
        bluntHitsCount == other.bluntHitsCount &&
        children == other.children &&
        damageCapability == other.damageCapability &&
        designation == other.designation &&
        firstOwnerId == other.firstOwnerId &&
        function == other.function &&
        hitpoints == other.hitpoints &&
        id == other.id &&
        isActive == other.isActive &&
        isSeverable == other.isSeverable &&
        isSevered == other.isSevered &&
        isVital == other.isVital &&
        majorCutsCount == other.majorCutsCount &&
        maxHitpoints == other.maxHitpoints &&
        minorCutsCount == other.minorCutsCount &&
        name == other.name &&
        randomDesignation == other.randomDesignation &&
        swingSurfaceLeft == other.swingSurfaceLeft &&
        swingSurfaceRight == other.swingSurfaceRight &&
        thrustSurface == other.thrustSurface;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, bluntHitsCount.hashCode);
    _$hash = $jc(_$hash, children.hashCode);
    _$hash = $jc(_$hash, damageCapability.hashCode);
    _$hash = $jc(_$hash, designation.hashCode);
    _$hash = $jc(_$hash, firstOwnerId.hashCode);
    _$hash = $jc(_$hash, function.hashCode);
    _$hash = $jc(_$hash, hitpoints.hashCode);
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, isActive.hashCode);
    _$hash = $jc(_$hash, isSeverable.hashCode);
    _$hash = $jc(_$hash, isSevered.hashCode);
    _$hash = $jc(_$hash, isVital.hashCode);
    _$hash = $jc(_$hash, majorCutsCount.hashCode);
    _$hash = $jc(_$hash, maxHitpoints.hashCode);
    _$hash = $jc(_$hash, minorCutsCount.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, randomDesignation.hashCode);
    _$hash = $jc(_$hash, swingSurfaceLeft.hashCode);
    _$hash = $jc(_$hash, swingSurfaceRight.hashCode);
    _$hash = $jc(_$hash, thrustSurface.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }
}

class BodyPartBuilder implements Builder<BodyPart, BodyPartBuilder> {
  _$BodyPart? _$v;

  int? _bluntHitsCount;
  int? get bluntHitsCount => _$this._bluntHitsCount;
  set bluntHitsCount(int? bluntHitsCount) =>
      _$this._bluntHitsCount = bluntHitsCount;

  ListBuilder<BodyPart>? _children;
  ListBuilder<BodyPart> get children =>
      _$this._children ??= new ListBuilder<BodyPart>();
  set children(ListBuilder<BodyPart>? children) => _$this._children = children;

  DamageCapabilityBuilder? _damageCapability;
  DamageCapabilityBuilder get damageCapability =>
      _$this._damageCapability ??= new DamageCapabilityBuilder();
  set damageCapability(DamageCapabilityBuilder? damageCapability) =>
      _$this._damageCapability = damageCapability;

  BodyPartDesignation? _designation;
  BodyPartDesignation? get designation => _$this._designation;
  set designation(BodyPartDesignation? designation) =>
      _$this._designation = designation;

  int? _firstOwnerId;
  int? get firstOwnerId => _$this._firstOwnerId;
  set firstOwnerId(int? firstOwnerId) => _$this._firstOwnerId = firstOwnerId;

  BodyPartFunction? _function;
  BodyPartFunction? get function => _$this._function;
  set function(BodyPartFunction? function) => _$this._function = function;

  int? _hitpoints;
  int? get hitpoints => _$this._hitpoints;
  set hitpoints(int? hitpoints) => _$this._hitpoints = hitpoints;

  int? _id;
  int? get id => _$this._id;
  set id(int? id) => _$this._id = id;

  bool? _isActive;
  bool? get isActive => _$this._isActive;
  set isActive(bool? isActive) => _$this._isActive = isActive;

  bool? _isSeverable;
  bool? get isSeverable => _$this._isSeverable;
  set isSeverable(bool? isSeverable) => _$this._isSeverable = isSeverable;

  bool? _isSevered;
  bool? get isSevered => _$this._isSevered;
  set isSevered(bool? isSevered) => _$this._isSevered = isSevered;

  bool? _isVital;
  bool? get isVital => _$this._isVital;
  set isVital(bool? isVital) => _$this._isVital = isVital;

  int? _majorCutsCount;
  int? get majorCutsCount => _$this._majorCutsCount;
  set majorCutsCount(int? majorCutsCount) =>
      _$this._majorCutsCount = majorCutsCount;

  int? _maxHitpoints;
  int? get maxHitpoints => _$this._maxHitpoints;
  set maxHitpoints(int? maxHitpoints) => _$this._maxHitpoints = maxHitpoints;

  int? _minorCutsCount;
  int? get minorCutsCount => _$this._minorCutsCount;
  set minorCutsCount(int? minorCutsCount) =>
      _$this._minorCutsCount = minorCutsCount;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  String? _randomDesignation;
  String? get randomDesignation => _$this._randomDesignation;
  set randomDesignation(String? randomDesignation) =>
      _$this._randomDesignation = randomDesignation;

  int? _swingSurfaceLeft;
  int? get swingSurfaceLeft => _$this._swingSurfaceLeft;
  set swingSurfaceLeft(int? swingSurfaceLeft) =>
      _$this._swingSurfaceLeft = swingSurfaceLeft;

  int? _swingSurfaceRight;
  int? get swingSurfaceRight => _$this._swingSurfaceRight;
  set swingSurfaceRight(int? swingSurfaceRight) =>
      _$this._swingSurfaceRight = swingSurfaceRight;

  int? _thrustSurface;
  int? get thrustSurface => _$this._thrustSurface;
  set thrustSurface(int? thrustSurface) =>
      _$this._thrustSurface = thrustSurface;

  BodyPartBuilder();

  BodyPartBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _bluntHitsCount = $v.bluntHitsCount;
      _children = $v.children.toBuilder();
      _damageCapability = $v.damageCapability?.toBuilder();
      _designation = $v.designation;
      _firstOwnerId = $v.firstOwnerId;
      _function = $v.function;
      _hitpoints = $v.hitpoints;
      _id = $v.id;
      _isActive = $v.isActive;
      _isSeverable = $v.isSeverable;
      _isSevered = $v.isSevered;
      _isVital = $v.isVital;
      _majorCutsCount = $v.majorCutsCount;
      _maxHitpoints = $v.maxHitpoints;
      _minorCutsCount = $v.minorCutsCount;
      _name = $v.name;
      _randomDesignation = $v.randomDesignation;
      _swingSurfaceLeft = $v.swingSurfaceLeft;
      _swingSurfaceRight = $v.swingSurfaceRight;
      _thrustSurface = $v.thrustSurface;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(BodyPart other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$BodyPart;
  }

  @override
  void update(void Function(BodyPartBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  BodyPart build() => _build();

  _$BodyPart _build() {
    _$BodyPart _$result;
    try {
      _$result = _$v ??
          new _$BodyPart._(
              bluntHitsCount: BuiltValueNullFieldError.checkNotNull(
                  bluntHitsCount, r'BodyPart', 'bluntHitsCount'),
              children: children.build(),
              damageCapability: _damageCapability?.build(),
              designation: BuiltValueNullFieldError.checkNotNull(
                  designation, r'BodyPart', 'designation'),
              firstOwnerId: BuiltValueNullFieldError.checkNotNull(
                  firstOwnerId, r'BodyPart', 'firstOwnerId'),
              function: BuiltValueNullFieldError.checkNotNull(
                  function, r'BodyPart', 'function'),
              hitpoints: BuiltValueNullFieldError.checkNotNull(
                  hitpoints, r'BodyPart', 'hitpoints'),
              id: BuiltValueNullFieldError.checkNotNull(id, r'BodyPart', 'id'),
              isActive: BuiltValueNullFieldError.checkNotNull(
                  isActive, r'BodyPart', 'isActive'),
              isSeverable: BuiltValueNullFieldError.checkNotNull(
                  isSeverable, r'BodyPart', 'isSeverable'),
              isSevered: BuiltValueNullFieldError.checkNotNull(
                  isSevered, r'BodyPart', 'isSevered'),
              isVital: BuiltValueNullFieldError.checkNotNull(isVital, r'BodyPart', 'isVital'),
              majorCutsCount: BuiltValueNullFieldError.checkNotNull(majorCutsCount, r'BodyPart', 'majorCutsCount'),
              maxHitpoints: BuiltValueNullFieldError.checkNotNull(maxHitpoints, r'BodyPart', 'maxHitpoints'),
              minorCutsCount: BuiltValueNullFieldError.checkNotNull(minorCutsCount, r'BodyPart', 'minorCutsCount'),
              name: BuiltValueNullFieldError.checkNotNull(name, r'BodyPart', 'name'),
              randomDesignation: BuiltValueNullFieldError.checkNotNull(randomDesignation, r'BodyPart', 'randomDesignation'),
              swingSurfaceLeft: BuiltValueNullFieldError.checkNotNull(swingSurfaceLeft, r'BodyPart', 'swingSurfaceLeft'),
              swingSurfaceRight: BuiltValueNullFieldError.checkNotNull(swingSurfaceRight, r'BodyPart', 'swingSurfaceRight'),
              thrustSurface: BuiltValueNullFieldError.checkNotNull(thrustSurface, r'BodyPart', 'thrustSurface'));
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'children';
        children.build();
        _$failedField = 'damageCapability';
        _damageCapability?.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'BodyPart', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
