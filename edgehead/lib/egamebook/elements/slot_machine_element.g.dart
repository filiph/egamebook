// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.element.slot_machine;

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
  Iterable<Object> serialize(Serializers serializers, SlotMachine object,
      {FullType specifiedType = FullType.unspecified}) {
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
    Object value;
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
  SlotMachine deserialize(Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new SlotMachineBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final Object value = iterator.current;
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

  factory _$SlotMachine([void Function(SlotMachineBuilder) updates]) =>
      (new SlotMachineBuilder()..update(updates)).build();

  _$SlotMachine._(
      {this.probability,
      this.rerollable,
      this.rerollEffectDescription,
      this.rollReason})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        probability, 'SlotMachine', 'probability');
    BuiltValueNullFieldError.checkNotNull(
        rerollable, 'SlotMachine', 'rerollable');
    BuiltValueNullFieldError.checkNotNull(
        rollReason, 'SlotMachine', 'rollReason');
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
  void update(void Function(SlotMachineBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$SlotMachine build() {
    final _$result = _$v ??
        new _$SlotMachine._(
            probability: BuiltValueNullFieldError.checkNotNull(
                probability, 'SlotMachine', 'probability'),
            rerollable: BuiltValueNullFieldError.checkNotNull(
                rerollable, 'SlotMachine', 'rerollable'),
            rerollEffectDescription: rerollEffectDescription,
            rollReason: BuiltValueNullFieldError.checkNotNull(
                rollReason, 'SlotMachine', 'rollReason'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,deprecated_member_use_from_same_package,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
