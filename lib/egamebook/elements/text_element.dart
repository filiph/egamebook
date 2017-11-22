library egamebook.element.text;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'element_base.dart';

part 'text_element.g.dart';

abstract class TextOutput extends ElementBase
    implements Built<TextOutput, TextOutputBuilder> {
  static Serializer<TextOutput> get serializer => _$textOutputSerializer;

  factory TextOutput([updates(TextOutputBuilder b)]) = _$TextOutput;

  TextOutput._();

  String get markdownText;
}
