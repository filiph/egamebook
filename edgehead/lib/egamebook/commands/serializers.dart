library egamebook.command.serializers;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/egamebook/commands/pick_choice_command.dart';
import 'package:edgehead/egamebook/commands/resolve_slot_machine_command.dart';
import 'package:edgehead/egamebook/elements/choice_element.dart';

part 'serializers.g.dart';

@SerializersFor([
  PickChoice,
  ResolveSlotMachine,
])
final Serializers serializers = _$serializers;
