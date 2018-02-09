library egamebook.command.resolve_slot_machine;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:slot_machine/result.dart' as slot;

import 'command_base.dart';

part 'resolve_slot_machine_command.g.dart';

abstract class ResolveSlotMachine extends CommandBase
    implements Built<ResolveSlotMachine, ResolveSlotMachineBuilder> {
  static Serializer<ResolveSlotMachine> get serializer =>
      _$resolveSlotMachineSerializer;

  factory ResolveSlotMachine([void updates(ResolveSlotMachineBuilder b)]) =
      _$ResolveSlotMachine;

  ResolveSlotMachine._();

  slot.Result get result;

  bool get wasRerolled;
}
