// GENERATED CODE - DO NOT MODIFY BY HAND

part of fractal_stories.anatomy.body_part;

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

const BodyPartDesignation _$neck = const BodyPartDesignation._('neck');
const BodyPartDesignation _$head = const BodyPartDesignation._('head');
const BodyPartDesignation _$leftLeg = const BodyPartDesignation._('leftLeg');
const BodyPartDesignation _$rightLeg = const BodyPartDesignation._('rightLeg');
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
  _$leftEye,
  _$rightEye,
  _$primaryArm,
  _$primaryHand,
  _$secondaryArm,
  _$secondaryHand,
  _$torso,
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
  Iterable serialize(Serializers serializers, BodyPart object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
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
      'function',
      serializers.serialize(object.function,
          specifiedType: const FullType(BodyPartFunction)),
      'id',
      serializers.serialize(object.id, specifiedType: const FullType(int)),
      'isActive',
      serializers.serialize(object.isActive,
          specifiedType: const FullType(bool)),
      'isAlive',
      serializers.serialize(object.isAlive,
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
      'minorCutsCount',
      serializers.serialize(object.minorCutsCount,
          specifiedType: const FullType(int)),
      'name',
      serializers.serialize(object.name, specifiedType: const FullType(String)),
    ];
    if (object.damageCapability != null) {
      result
        ..add('damageCapability')
        ..add(serializers.serialize(object.damageCapability,
            specifiedType: const FullType(DamageCapability)));
    }

    return result;
  }

  @override
  BodyPart deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new BodyPartBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'bluntHitsCount':
          result.bluntHitsCount = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'children':
          result.children.replace(serializers.deserialize(value,
                  specifiedType: const FullType(
                      BuiltList, const [const FullType(BodyPart)]))
              as BuiltList<BodyPart>);
          break;
        case 'damageCapability':
          result.damageCapability.replace(serializers.deserialize(value,
                  specifiedType: const FullType(DamageCapability))
              as DamageCapability);
          break;
        case 'designation':
          result.designation = serializers.deserialize(value,
                  specifiedType: const FullType(BodyPartDesignation))
              as BodyPartDesignation;
          break;
        case 'function':
          result.function = serializers.deserialize(value,
                  specifiedType: const FullType(BodyPartFunction))
              as BodyPartFunction;
          break;
        case 'id':
          result.id = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'isActive':
          result.isActive = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'isAlive':
          result.isAlive = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'isSeverable':
          result.isSeverable = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'isSevered':
          result.isSevered = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'isVital':
          result.isVital = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'majorCutsCount':
          result.majorCutsCount = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'minorCutsCount':
          result.minorCutsCount = serializers.deserialize(value,
              specifiedType: const FullType(int)) as int;
          break;
        case 'name':
          result.name = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
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
          {FullType specifiedType: FullType.unspecified}) =>
      object.name;

  @override
  BodyPartDesignation deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType: FullType.unspecified}) =>
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
          {FullType specifiedType: FullType.unspecified}) =>
      object.name;

  @override
  BodyPartFunction deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType: FullType.unspecified}) =>
      BodyPartFunction.valueOf(serialized as String);
}

class _$BodyPart extends BodyPart {
  @override
  final int bluntHitsCount;
  @override
  final BuiltList<BodyPart> children;
  @override
  final DamageCapability damageCapability;
  @override
  final BodyPartDesignation designation;
  @override
  final BodyPartFunction function;
  @override
  final int id;
  @override
  final bool isActive;
  @override
  final bool isAlive;
  @override
  final bool isSeverable;
  @override
  final bool isSevered;
  @override
  final bool isVital;
  @override
  final int majorCutsCount;
  @override
  final int minorCutsCount;
  @override
  final String name;

  factory _$BodyPart([void updates(BodyPartBuilder b)]) =>
      (new BodyPartBuilder()..update(updates)).build();

  _$BodyPart._(
      {this.bluntHitsCount,
      this.children,
      this.damageCapability,
      this.designation,
      this.function,
      this.id,
      this.isActive,
      this.isAlive,
      this.isSeverable,
      this.isSevered,
      this.isVital,
      this.majorCutsCount,
      this.minorCutsCount,
      this.name})
      : super._() {
    if (bluntHitsCount == null)
      throw new ArgumentError.notNull('bluntHitsCount');
    if (children == null) throw new ArgumentError.notNull('children');
    if (designation == null) throw new ArgumentError.notNull('designation');
    if (function == null) throw new ArgumentError.notNull('function');
    if (id == null) throw new ArgumentError.notNull('id');
    if (isActive == null) throw new ArgumentError.notNull('isActive');
    if (isAlive == null) throw new ArgumentError.notNull('isAlive');
    if (isSeverable == null) throw new ArgumentError.notNull('isSeverable');
    if (isSevered == null) throw new ArgumentError.notNull('isSevered');
    if (isVital == null) throw new ArgumentError.notNull('isVital');
    if (majorCutsCount == null)
      throw new ArgumentError.notNull('majorCutsCount');
    if (minorCutsCount == null)
      throw new ArgumentError.notNull('minorCutsCount');
    if (name == null) throw new ArgumentError.notNull('name');
  }

  @override
  BodyPart rebuild(void updates(BodyPartBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  BodyPartBuilder toBuilder() => new BodyPartBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! BodyPart) return false;
    return bluntHitsCount == other.bluntHitsCount &&
        children == other.children &&
        damageCapability == other.damageCapability &&
        designation == other.designation &&
        function == other.function &&
        id == other.id &&
        isActive == other.isActive &&
        isAlive == other.isAlive &&
        isSeverable == other.isSeverable &&
        isSevered == other.isSevered &&
        isVital == other.isVital &&
        majorCutsCount == other.majorCutsCount &&
        minorCutsCount == other.minorCutsCount &&
        name == other.name;
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
                                                            0,
                                                            bluntHitsCount
                                                                .hashCode),
                                                        children.hashCode),
                                                    damageCapability.hashCode),
                                                designation.hashCode),
                                            function.hashCode),
                                        id.hashCode),
                                    isActive.hashCode),
                                isAlive.hashCode),
                            isSeverable.hashCode),
                        isSevered.hashCode),
                    isVital.hashCode),
                majorCutsCount.hashCode),
            minorCutsCount.hashCode),
        name.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('BodyPart')
          ..add('bluntHitsCount', bluntHitsCount)
          ..add('children', children)
          ..add('damageCapability', damageCapability)
          ..add('designation', designation)
          ..add('function', function)
          ..add('id', id)
          ..add('isActive', isActive)
          ..add('isAlive', isAlive)
          ..add('isSeverable', isSeverable)
          ..add('isSevered', isSevered)
          ..add('isVital', isVital)
          ..add('majorCutsCount', majorCutsCount)
          ..add('minorCutsCount', minorCutsCount)
          ..add('name', name))
        .toString();
  }
}

class BodyPartBuilder implements Builder<BodyPart, BodyPartBuilder> {
  _$BodyPart _$v;

  int _bluntHitsCount;
  int get bluntHitsCount => _$this._bluntHitsCount;
  set bluntHitsCount(int bluntHitsCount) =>
      _$this._bluntHitsCount = bluntHitsCount;

  ListBuilder<BodyPart> _children;
  ListBuilder<BodyPart> get children =>
      _$this._children ??= new ListBuilder<BodyPart>();
  set children(ListBuilder<BodyPart> children) => _$this._children = children;

  DamageCapabilityBuilder _damageCapability;
  DamageCapabilityBuilder get damageCapability =>
      _$this._damageCapability ??= new DamageCapabilityBuilder();
  set damageCapability(DamageCapabilityBuilder damageCapability) =>
      _$this._damageCapability = damageCapability;

  BodyPartDesignation _designation;
  BodyPartDesignation get designation => _$this._designation;
  set designation(BodyPartDesignation designation) =>
      _$this._designation = designation;

  BodyPartFunction _function;
  BodyPartFunction get function => _$this._function;
  set function(BodyPartFunction function) => _$this._function = function;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  bool _isActive;
  bool get isActive => _$this._isActive;
  set isActive(bool isActive) => _$this._isActive = isActive;

  bool _isAlive;
  bool get isAlive => _$this._isAlive;
  set isAlive(bool isAlive) => _$this._isAlive = isAlive;

  bool _isSeverable;
  bool get isSeverable => _$this._isSeverable;
  set isSeverable(bool isSeverable) => _$this._isSeverable = isSeverable;

  bool _isSevered;
  bool get isSevered => _$this._isSevered;
  set isSevered(bool isSevered) => _$this._isSevered = isSevered;

  bool _isVital;
  bool get isVital => _$this._isVital;
  set isVital(bool isVital) => _$this._isVital = isVital;

  int _majorCutsCount;
  int get majorCutsCount => _$this._majorCutsCount;
  set majorCutsCount(int majorCutsCount) =>
      _$this._majorCutsCount = majorCutsCount;

  int _minorCutsCount;
  int get minorCutsCount => _$this._minorCutsCount;
  set minorCutsCount(int minorCutsCount) =>
      _$this._minorCutsCount = minorCutsCount;

  String _name;
  String get name => _$this._name;
  set name(String name) => _$this._name = name;

  BodyPartBuilder();

  BodyPartBuilder get _$this {
    if (_$v != null) {
      _bluntHitsCount = _$v.bluntHitsCount;
      _children = _$v.children?.toBuilder();
      _damageCapability = _$v.damageCapability?.toBuilder();
      _designation = _$v.designation;
      _function = _$v.function;
      _id = _$v.id;
      _isActive = _$v.isActive;
      _isAlive = _$v.isAlive;
      _isSeverable = _$v.isSeverable;
      _isSevered = _$v.isSevered;
      _isVital = _$v.isVital;
      _majorCutsCount = _$v.majorCutsCount;
      _minorCutsCount = _$v.minorCutsCount;
      _name = _$v.name;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(BodyPart other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$BodyPart;
  }

  @override
  void update(void updates(BodyPartBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$BodyPart build() {
    final _$result = _$v ??
        new _$BodyPart._(
            bluntHitsCount: bluntHitsCount,
            children: children?.build(),
            damageCapability: _damageCapability?.build(),
            designation: designation,
            function: function,
            id: id,
            isActive: isActive,
            isAlive: isAlive,
            isSeverable: isSeverable,
            isSevered: isSevered,
            isVital: isVital,
            majorCutsCount: majorCutsCount,
            minorCutsCount: minorCutsCount,
            name: name);
    replace(_$result);
    return _$result;
  }
}
