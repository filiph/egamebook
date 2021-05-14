// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.command.resolve_slot_machine;

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
  Iterable<Object> serialize(Serializers serializers, ResolveSlotMachine object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
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
      Serializers serializers, Iterable<Object> serialized,
      {FullType specifiedType = FullType.unspecified}) {
    final result = new ResolveSlotMachineBuilder();

    final iterator = serialized.iterator;
    while (iterator.moveNext()) {
      final key = iterator.current as String;
      iterator.moveNext();
      final dynamic value = iterator.current;
      switch (key) {
        case 'result':
          result.result = serializers.deserialize(value,
              specifiedType: const FullType(SlotResult)) as SlotResult;
          break;
        case 'wasRerolled':
          result.wasRerolled = serializers.deserialize(value,
              specifiedType: const FullType(bool)) as bool;
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
          [void Function(ResolveSlotMachineBuilder) updates]) =>
      (new ResolveSlotMachineBuilder()..update(updates)).build();

  _$ResolveSlotMachine._({this.result, this.wasRerolled}) : super._() {
    if (result == null) {
      throw new BuiltValueNullFieldError('ResolveSlotMachine', 'result');
    }
    if (wasRerolled == null) {
      throw new BuiltValueNullFieldError('ResolveSlotMachine', 'wasRerolled');
    }
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
    return $jf($jc($jc(0, result.hashCode), wasRerolled.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('ResolveSlotMachine')
          ..add('result', result)
          ..add('wasRerolled', wasRerolled))
        .toString();
  }
}

class ResolveSlotMachineBuilder
    implements Builder<ResolveSlotMachine, ResolveSlotMachineBuilder> {
  _$ResolveSlotMachine _$v;

  SlotResult _result;
  SlotResult get result => _$this._result;
  set result(SlotResult result) => _$this._result = result;

  bool _wasRerolled;
  bool get wasRerolled => _$this._wasRerolled;
  set wasRerolled(bool wasRerolled) => _$this._wasRerolled = wasRerolled;

  ResolveSlotMachineBuilder();

  ResolveSlotMachineBuilder get _$this {
    if (_$v != null) {
      _result = _$v.result;
      _wasRerolled = _$v.wasRerolled;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ResolveSlotMachine other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$ResolveSlotMachine;
  }

  @override
  void update(void Function(ResolveSlotMachineBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$ResolveSlotMachine build() {
    final _$result = _$v ??
        new _$ResolveSlotMachine._(result: result, wasRerolled: wasRerolled);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
