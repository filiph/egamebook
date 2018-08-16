// GENERATED CODE - DO NOT MODIFY BY HAND

part of egamebook.command.resolve_slot_machine;

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line
// ignore_for_file: annotate_overrides
// ignore_for_file: avoid_annotating_with_dynamic
// ignore_for_file: avoid_catches_without_on_clauses
// ignore_for_file: avoid_returning_this
// ignore_for_file: lines_longer_than_80_chars
// ignore_for_file: omit_local_variable_types
// ignore_for_file: prefer_expression_function_bodies
// ignore_for_file: sort_constructors_first

Serializer<ResolveSlotMachine> _$resolveSlotMachineSerializer =
    new _$ResolveSlotMachineSerializer();

class _$ResolveSlotMachineSerializer
    implements StructuredSerializer<ResolveSlotMachine> {
  @override
  final Iterable<Type> types = const [ResolveSlotMachine, _$ResolveSlotMachine];
  @override
  final String wireName = 'ResolveSlotMachine';

  @override
  Iterable serialize(Serializers serializers, ResolveSlotMachine object,
      {FullType specifiedType = FullType.unspecified}) {
    final result = <Object>[
      'result',
      serializers.serialize(object.result,
          specifiedType: const FullType(slot.Result)),
      'wasRerolled',
      serializers.serialize(object.wasRerolled,
          specifiedType: const FullType(bool)),
    ];

    return result;
  }

  @override
  ResolveSlotMachine deserialize(Serializers serializers, Iterable serialized,
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
              specifiedType: const FullType(slot.Result)) as slot.Result;
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

class _$ResolveSlotMachine extends ResolveSlotMachine {
  @override
  final slot.Result result;
  @override
  final bool wasRerolled;

  factory _$ResolveSlotMachine([void updates(ResolveSlotMachineBuilder b)]) =>
      (new ResolveSlotMachineBuilder()..update(updates)).build();

  _$ResolveSlotMachine._({this.result, this.wasRerolled}) : super._() {
    if (result == null)
      throw new BuiltValueNullFieldError('ResolveSlotMachine', 'result');
    if (wasRerolled == null)
      throw new BuiltValueNullFieldError('ResolveSlotMachine', 'wasRerolled');
  }

  @override
  ResolveSlotMachine rebuild(void updates(ResolveSlotMachineBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  ResolveSlotMachineBuilder toBuilder() =>
      new ResolveSlotMachineBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! ResolveSlotMachine) return false;
    return result == other.result && wasRerolled == other.wasRerolled;
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

  slot.Result _result;
  slot.Result get result => _$this._result;
  set result(slot.Result result) => _$this._result = result;

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
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$ResolveSlotMachine;
  }

  @override
  void update(void updates(ResolveSlotMachineBuilder b)) {
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
