library egamebook.command.serializers;

import 'package:built_value/serializer.dart';
import 'package:edgehead/egamebook/commands/resolve_slot_machine_command.dart';
import 'package:edgehead/egamebook/elements/choice_element.dart';

import 'pick_choice_command.dart';

part 'serializers.g.dart';

@SerializersFor(const [
  PickChoice,
  ResolveSlotMachine,
])
final Serializers serializers = _$serializers;
