// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'resolve_slot_machine_command.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const SlotResult _$success = const SlotResult._('success');
const SlotResult _$failure = const SlotResult._('failure');
const SlotResult _$criticalSuccess = const SlotResult._('criticalSuccess');
const SlotResult _$criticalFailure = const SlotResult._('criticalFailure');

SlotResult _$valueOf(String name) {
  switch (name) {
    case 'success':
      return _$success;
    case 'failure':
      return _$failure;
    case 'criticalSuccess':
      return _$criticalSuccess;
    case 'criticalFailure':
      return _$criticalFailure;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<SlotResult> _$values =
    new BuiltSet<SlotResult>(const <SlotResult>[
  _$success,
  _$failure,
  _$criticalSuccess,
  _$criticalFailure,
]);

Serializer<ResolveSlotMachine> _$resolveSlotMachineSerializer =
    new _$ResolveSlotMachineSerializer();
Serializer<SlotResult> _$slotResultSerializer = new _$SlotResultSerializer();

class _$ResolveSlotMachineSerializer
    implements StructuredSerializer<ResolveSlotMachine> {
  @override
  final Iterable<Type> types = const [ResolveSlotMachine, _$ResolveSlotMachine];
  @override
  final String wireName = 'ResolveSlotMachine';

  @override
  Iterable<Object?> serialize(
      Serializers serializers, ResolveSlotMachine object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object?>[
      'result',
      serializers.serialize(object.result,
          specifiedType: const FullType(SlotResult)),
      'wasRerolled',
      serializers.serialize(object.wasRerolled,
          specifiedType: const FullType(bool)),
    ];

    return result;
  }

  @override
  ResolveSlotMachine deserialize(
      Serializers serializers, Iterable<Object?> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ResolveSlotMachineBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current! as String;
      iterator.moveNext();
      final Object? value = iterator.current;
      switch (key) {
        case 'result':
          result.result = serializers.deserialize(value,
              specifiedType: const FullType(SlotResult))! as SlotResult;
          break;
        case 'wasRerolled':
          result.wasRerolled = serializers.deserialize(value,
              specifiedType: const FullType(bool))! as bool;
          break;
      }
    }

    return result.build();
  }
}

class _$SlotResultSerializer implements PrimitiveSerializer<SlotResult> {
  @override
  final Iterable<Type> types = const <Type>[SlotResult];
  @override
  final String wireName = 'SlotResult';

  @override
  Object serialize(Serializers serializers, SlotResult object,
          {FullType specifiedType = FullType.unspecified}) =>
      object.name;

  @override
  SlotResult deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      SlotResult.valueOf(serialized as String);
}

class _$ResolveSlotMachine extends ResolveSlotMachine {
  @override
  final SlotResult result;
  @override
  final bool wasRerolled;

  factory _$ResolveSlotMachine(
          [void Function(ResolveSlotMachineBuilder)? updates]) =>
      (new ResolveSlotMachineBuilder()..update(updates))._build();

  _$ResolveSlotMachine._({required this.result, required this.wasRerolled})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        result, r'ResolveSlotMachine', 'result');
    BuiltValueNullFieldError.checkNotNull(
        wasRerolled, r'ResolveSlotMachine', 'wasRerolled');
  }

  @override
  ResolveSlotMachine rebuild(
          void Function(ResolveSlotMachineBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ResolveSlotMachineBuilder toBuilder() =>
      new ResolveSlotMachineBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ResolveSlotMachine &&
        result == other.result &&
        wasRerolled == other.wasRerolled;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, result.hashCode);
    _$hash = $jc(_$hash, wasRerolled.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'ResolveSlotMachine')
          ..add('result', result)
          ..add('wasRerolled', wasRerolled))
        .toString();
  }
}

class ResolveSlotMachineBuilder
    implements Builder<ResolveSlotMachine, ResolveSlotMachineBuilder> {
  _$ResolveSlotMachine? _$v;

  SlotResult? _result;
  SlotResult? get result => _$this._result;
  set result(SlotResult? result) => _$this._result = result;

  bool? _wasRerolled;
  bool? get wasRerolled => _$this._wasRerolled;
  set wasRerolled(bool? wasRerolled) => _$this._wasRerolled = wasRerolled;

  ResolveSlotMachineBuilder();

  ResolveSlotMachineBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _result = $v.result;
      _wasRerolled = $v.wasRerolled;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ResolveSlotMachine other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ResolveSlotMachine;
  }

  @override
  void update(void Function(ResolveSlotMachineBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  ResolveSlotMachine build() => _build();

  _$ResolveSlotMachine _build() {
    final _$result = _$v ??
        new _$ResolveSlotMachine._(
            result: BuiltValueNullFieldError.checkNotNull(
                result, r'ResolveSlotMachine', 'result'),
            wasRerolled: BuiltValueNullFieldError.checkNotNull(
                wasRerolled, r'ResolveSlotMachine', 'wasRerolled'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
