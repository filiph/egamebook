library egamebook.element.serializers;

import 'package:built_value/serializer.dart';

import 'text_element.dart';

part 'serializers.g.dart';

@SerializersFor(const [
  TextOutput,
])
final Serializers serializers = _$serializers;
