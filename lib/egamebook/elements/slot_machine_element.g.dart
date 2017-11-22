// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.slot_machine;

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

Serializer<SlotMachine> _$slotMachineSerializer = new _$SlotMachineSerializer();

class _$SlotMachineSerializer implements StructuredSerializer<SlotMachine> {
  @override
  final Iterable<Type> types = const [SlotMachine, _$SlotMachine];
  @override
  final String wireName = 'SlotMachine';

  @override
  Iterable serialize(Serializers serializers, SlotMachine object,
      {FullType specifiedType: FullType.unspecified}) {
    final result = <Object>[
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
    if (object.rerollEffectDescription != null) {
      result
        ..add('rerollEffectDescription')
        ..add(serializers.serialize(object.rerollEffectDescription,
            specifiedType: const FullType(String)));
    }

    return result;
  }

  @override
  SlotMachine deserialize(Serializers serializers, Iterable serialized,
      {FullType specifiedType: FullType.unspecified}) {
    final result = new SlotMachineBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'probability':
          result.probability = serializers.deserialize(value,
              specifiedType: const FullType(double)) as double;
          break;
        case 'rerollable':
          result.rerollable = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
          break;
        case 'rerollEffectDescription':
          result.rerollEffectDescription = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
          break;
        case 'rollReason':
          result.rollReason = serializers.deserialize(value,
              specifiedType: const FullType(String)) as String;
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
  final String rerollEffectDescription;
  @override
  final String rollReason;

  factory _$SlotMachine([void updates(SlotMachineBuilder b)]) =>
      (new SlotMachineBuilder()..update(updates)).build();

  _$SlotMachine._(
      {this.probability,
      this.rerollable,
      this.rerollEffectDescription,
      this.rollReason})
      : super._() {
    if (probability == null) throw new ArgumentError.notNull('probability');
    if (rerollable == null) throw new ArgumentError.notNull('rerollable');
    if (rollReason == null) throw new ArgumentError.notNull('rollReason');
  }

  @override
  SlotMachine rebuild(void updates(SlotMachineBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  SlotMachineBuilder toBuilder() => new SlotMachineBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! SlotMachine) return false;
    return probability == other.probability &&
        rerollable == other.rerollable &&
        rerollEffectDescription == other.rerollEffectDescription &&
        rollReason == other.rollReason;
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc($jc($jc(0, probability.hashCode), rerollable.hashCode),
            rerollEffectDescription.hashCode),
        rollReason.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('SlotMachine')
          ..add('probability', probability)
          ..add('rerollable', rerollable)
          ..add('rerollEffectDescription', rerollEffectDescription)
          ..add('rollReason', rollReason))
        .toString();
  }
}

class SlotMachineBuilder implements Builder<SlotMachine, SlotMachineBuilder> {
  _$SlotMachine _$v;

  double _probability;
  double get probability => _$this._probability;
  set probability(double probability) => _$this._probability = probability;

  bool _rerollable;
  bool get rerollable => _$this._rerollable;
  set rerollable(bool rerollable) => _$this._rerollable = rerollable;

  String _rerollEffectDescription;
  String get rerollEffectDescription => _$this._rerollEffectDescription;
  set rerollEffectDescription(String rerollEffectDescription) =>
      _$this._rerollEffectDescription = rerollEffectDescription;

  String _rollReason;
  String get rollReason => _$this._rollReason;
  set rollReason(String rollReason) => _$this._rollReason = rollReason;

  SlotMachineBuilder();

  SlotMachineBuilder get _$this {
    if (_$v != null) {
      _probability = _$v.probability;
      _rerollable = _$v.rerollable;
      _rerollEffectDescription = _$v.rerollEffectDescription;
      _rollReason = _$v.rollReason;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SlotMachine other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$SlotMachine;
  }

  @override
  void update(void updates(SlotMachineBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$SlotMachine build() {
    final _$result = _$v ??
        new _$SlotMachine._(
            probability: probability,
            rerollable: rerollable,
            rerollEffectDescription: rerollEffectDescription,
            rollReason: rollReason);
    replace(_$result);
    return _$result;
  }
}
