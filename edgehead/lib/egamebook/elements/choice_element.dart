library egamebook.element.choice;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'element_base.dart';

part 'choice_element.g.dart';

abstract class Choice extends ElementBase
    implements Built<Choice, ChoiceBuilder> {
  static Serializer<Choice> get serializer => _$choiceSerializer;

  factory Choice([void updates(ChoiceBuilder b)]) = _$Choice;

  Choice._();

  @nullable
  String get helpMessage;

  /// Returns [:true:] when the choice is automatic (scripter picks it
  /// silently). Corresponds to `Action.isImplicit`.
  bool get isImplicit;

  String get markdownText;
}
