library egamebook.element.choice_block;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/egamebook/elements/choice_element.dart';
import 'package:edgehead/egamebook/elements/save_element.dart';

import 'element_base.dart';

part 'choice_block_element.g.dart';

abstract class ChoiceBlock extends ElementBase
    implements Built<ChoiceBlock, ChoiceBlockBuilder> {
  static Serializer<ChoiceBlock> get serializer => _$choiceBlockSerializer;

  /// Every choice block should include the associated [SaveGame]
  /// so that players can jump back to each decision point.
  SaveGame get saveGame;

  factory ChoiceBlock([void updates(ChoiceBlockBuilder b)]) = _$ChoiceBlock;

  ChoiceBlock._();

  BuiltList<Choice> get choices;
}
