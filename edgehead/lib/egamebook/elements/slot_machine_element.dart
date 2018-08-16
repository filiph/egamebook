library egamebook.element.slot_machine;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'element_base.dart';

part 'slot_machine_element.g.dart';

abstract class SlotMachine extends ElementBase
    implements Built<SlotMachine, SlotMachineBuilder> {
  static Serializer<SlotMachine> get serializer => _$slotMachineSerializer;

  factory SlotMachine([void updates(SlotMachineBuilder b)]) = _$SlotMachine;

  SlotMachine._();

  double get probability;

  bool get rerollable;

  @nullable
  String get rerollEffectDescription;

  String get rollReason;
}
