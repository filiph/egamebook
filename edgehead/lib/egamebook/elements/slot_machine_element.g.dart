// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'slot_machine_element.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializer<SlotMachine> _$slotMachineSerializer = new _$SlotMachineSerializer();

class _$SlotMachineSerializer implements StructuredSerializer<SlotMachine> {
  @override
  final Iterable<Type> types = const [SlotMachine, _$SlotMachine];
  @override
  final String wireName = 'SlotMachine';

  @override
  Iterable<Object?> serialize(Serializers serializers, SlotMachine object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'probability',
      serializers.serialize(object.probability,
          specifiedType: const FullType(double)),
      'rerollable',
      serializers.serialize(object.rerollable,
          specifiedType: const FullType(bool)),
      'rollReason',
      serializers.serialize(object.rollReason,
          specifiedType: const FullType(String)),
    ];
    Object? value;
    value = object.rerollEffectDescription;
    if (value != null) {
      result
        ..add('rerollEffectDescription')
        ..add(serializers.serialize(value,
            specifiedType: const FullType(String)));
    }
    return result;
  }

  @override
  SlotMachine deserialize(Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new SlotMachineBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'probability':
          result.probability = serializers.deserialize(value,
              specifiedType: const FullType(double))! as double;
          break;
        case 'rerollable':
          result.rerollable = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
        case 'rerollEffectDescription':
          result.rerollEffectDescription = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String?;
          break;
        case 'rollReason':
          result.rollReason = serializers.deserialize(value,
              specifiedType: const FullType(String))! as String;
          break;
      }
    }

    return result.build();
  }
}

class _$SlotMachine extends SlotMachine {
  @override
  final double probability;
  @override
  final bool rerollable;
  @override
  final String? rerollEffectDescription;
  @override
  final String rollReason;

  factory _$SlotMachine([void Function(SlotMachineBuilder)? updates]) =>
      (new SlotMachineBuilder()..update(updates))._build();

  _$SlotMachine._(
      {required this.probability,
      required this.rerollable,
      this.rerollEffectDescription,
      required this.rollReason})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        probability, r'SlotMachine', 'probability');
    BuiltValueNullFieldError.checkNotNull(
        rerollable, r'SlotMachine', 'rerollable');
    BuiltValueNullFieldError.checkNotNull(
        rollReason, r'SlotMachine', 'rollReason');
  }

  @override
  SlotMachine rebuild(void Function(SlotMachineBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SlotMachineBuilder toBuilder() => new SlotMachineBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SlotMachine &&
        probability == other.probability &&
        rerollable == other.rerollable &&
        rerollEffectDescription == other.rerollEffectDescription &&
        rollReason == other.rollReason;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, probability.hashCode);
    _$hash = $jc(_$hash, rerollable.hashCode);
    _$hash = $jc(_$hash, rerollEffectDescription.hashCode);
    _$hash = $jc(_$hash, rollReason.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SlotMachine')
          ..add('probability', probability)
          ..add('rerollable', rerollable)
          ..add('rerollEffectDescription', rerollEffectDescription)
          ..add('rollReason', rollReason))
        .toString();
  }
}

class SlotMachineBuilder implements Builder<SlotMachine, SlotMachineBuilder> {
  _$SlotMachine? _$v;

  double? _probability;
  double? get probability => _$this._probability;
  set probability(double? probability) => _$this._probability = probability;

  bool? _rerollable;
  bool? get rerollable => _$this._rerollable;
  set rerollable(bool? rerollable) => _$this._rerollable = rerollable;

  String? _rerollEffectDescription;
  String? get rerollEffectDescription => _$this._rerollEffectDescription;
  set rerollEffectDescription(String? rerollEffectDescription) =>
      _$this._rerollEffectDescription = rerollEffectDescription;

  String? _rollReason;
  String? get rollReason => _$this._rollReason;
  set rollReason(String? rollReason) => _$this._rollReason = rollReason;

  SlotMachineBuilder();

  SlotMachineBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _probability = $v.probability;
      _rerollable = $v.rerollable;
      _rerollEffectDescription = $v.rerollEffectDescription;
      _rollReason = $v.rollReason;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SlotMachine other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SlotMachine;
  }

  @override
  void update(void Function(SlotMachineBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SlotMachine build() => _build();

  _$SlotMachine _build() {
    final _$result = _$v ??
        new _$SlotMachine._(
            probability: BuiltValueNullFieldError.checkNotNull(
                probability, r'SlotMachine', 'probability'),
            rerollable: BuiltValueNullFieldError.checkNotNull(
                rerollable, r'SlotMachine', 'rerollable'),
            rerollEffectDescription: rerollEffectDescription,
            rollReason: BuiltValueNullFieldError.checkNotNull(
                rollReason, r'SlotMachine', 'rollReason'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
