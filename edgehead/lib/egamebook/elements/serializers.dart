library egamebook.element.serializers;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/egamebook/elements/choice_block_element.dart';
import 'package:edgehead/egamebook/elements/choice_element.dart';
import 'package:edgehead/egamebook/elements/error_element.dart';
import 'package:edgehead/egamebook/elements/log_element.dart';
import 'package:edgehead/egamebook/elements/lose_element.dart';
import 'package:edgehead/egamebook/elements/save_element.dart';
import 'package:edgehead/egamebook/elements/slot_machine_element.dart';
import 'package:edgehead/egamebook/elements/win_element.dart';

import 'stat_update_element.dart';
import 'text_element.dart';

part 'serializers.g.dart';

@SerializersFor([
  Choice,
  ChoiceBlock,
  ErrorElement,
  LogElement,
  LoseGame,
  SaveGame,
  SlotMachine,
  StatUpdate,
  TextOutput,
  WinGame,
])
final Serializers serializers = _$serializers;
