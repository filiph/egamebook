library egamebook.element.error;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/egamebook/elements/element_base.dart';

part 'error_element.g.dart';

abstract class ErrorElement extends ElementBase
    implements Built<ErrorElement, ErrorElementBuilder> {
  static Serializer<ErrorElement> get serializer => _$errorElementSerializer;

  factory ErrorElement([void updates(ErrorElementBuilder b)]) = _$ErrorElement;

  ErrorElement._();

  String get message;

  String get stackTrace;
}
