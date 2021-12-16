library egamebook.element.choice;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/egamebook/elements/element_base.dart';

part 'choice_element.g.dart';

abstract class Choice extends ElementBase
    implements Built<Choice, ChoiceBuilder> {
  static Serializer<Choice> get serializer => _$choiceSerializer;

  factory Choice([void updates(ChoiceBuilder b)]) = _$Choice;

  Choice._();

  /// The name of the action being used.
  String get actionName;

  /// Additional data, as provided by [Action.getAdditionalData].
  BuiltList<int> get additionalData;

  /// Additional data, as provided by [Action.getAdditionalStrings].
  BuiltMap<String, String> get additionalStrings;

  BuiltList<String> get commandPath;

  /// This is the sentence that gets printed _after_ the player selects
  /// the choice.
  ///
  /// For example, a choice with a [commandPath] of
  /// `['Goblin', 'body', 'slash arm']`, a [commandSentence] might be something
  /// like `"I try to slash the goblin's arm."`.
  String get commandSentence;

  String? get helpMessage;

  /// Returns [:true:] when the choice is automatic (presenter picks it
  /// silently). Corresponds to `Action.isImplicit`.
  bool get isImplicit;

  /// The chance of success, from `0` to `1`.
  double get successChance;
}
