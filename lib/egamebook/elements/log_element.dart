library egamebook.element.log;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'element_base.dart';

part 'log_element.g.dart';

abstract class LogElement extends ElementBase
    implements Built<LogElement, LogElementBuilder> {
  static Serializer<LogElement> get serializer => _$logElementSerializer;

  factory LogElement([updates(LogElementBuilder b)]) = _$LogElement;

  LogElement._();

  String get level;

  String get message;
}
