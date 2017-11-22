library egamebook.element.choice;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'element_base.dart';

part 'choice_element.g.dart';

abstract class Choice extends ElementBase
    implements Built<Choice, ChoiceBuilder> {
  static Serializer<Choice> get serializer => _$choiceSerializer;

  factory Choice([updates(ChoiceBuilder b)]) = _$Choice;

  Choice._();

  @nullable
  String get helpMessage;

  /// Returns [:true:] when the choice is automatic (scripter picks it
  /// silently).
  @Deprecated("Move to something more robust, like explicitly marking options "
      "'implicit'. The current approach is hacky.")
  bool get isAutomatic => markdownText.isEmpty;

  String get markdownText;
}
