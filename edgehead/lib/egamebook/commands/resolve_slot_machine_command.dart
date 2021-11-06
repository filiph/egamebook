library egamebook.command.resolve_slot_machine;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/egamebook/slot_machine_result.dart' as slot;

import 'command_base.dart';

part 'resolve_slot_machine_command.g.dart';

abstract class ResolveSlotMachine extends CommandBase
    implements Built<ResolveSlotMachine, ResolveSlotMachineBuilder> {
  static Serializer<ResolveSlotMachine> get serializer =>
      _$resolveSlotMachineSerializer;

  factory ResolveSlotMachine([void updates(ResolveSlotMachineBuilder b)]) =
      _$ResolveSlotMachine;

  ResolveSlotMachine._();

  SlotResult get result;

  bool get wasRerolled;
}

/// A wrapper around [slot.Result] that makes the enum serializable.
class SlotResult extends EnumClass {
  static Serializer<SlotResult> get serializer => _$slotResultSerializer;

  /// Normal success.
  static const SlotResult success = _$success;

  /// Normal failure.
  static const SlotResult failure = _$failure;

  /// Major success.
  static const SlotResult criticalSuccess = _$criticalSuccess;

  /// Major failure.
  static const SlotResult criticalFailure = _$criticalFailure;

  const SlotResult._(String name) : super(name);

  static BuiltSet<SlotResult> get values => _$values;
  static SlotResult valueOf(String name) => _$valueOf(name);

  static SlotResult from(slot.Result result) {
    switch (result) {
      case slot.Result.success:
        return success;
      case slot.Result.failure:
        return failure;
      case slot.Result.criticalSuccess:
        return criticalSuccess;
      case slot.Result.criticalFailure:
        return criticalFailure;
      default:
        throw UnimplementedError('Result $result does not correspond '
            "to any of SlotResult's values: ${SlotResult.values}");
    }
  }

  slot.Result get asResult {
    switch (this) {
      case success:
        return slot.Result.success;
      case failure:
        return slot.Result.failure;
      case criticalSuccess:
        return slot.Result.criticalSuccess;
      case criticalFailure:
        return slot.Result.criticalFailure;
      default:
        throw UnimplementedError('Result $this does not correspond '
            "to any of slot.Result's values: ${slot.Result.values}");
    }
  }
}
