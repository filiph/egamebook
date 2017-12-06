library egamebook.element.serializers;

import 'package:built_value/serializer.dart';

import 'package:edgehead/egamebook/stat/stat.dart';
import 'text_element.dart';

part 'serializers.g.dart';

@SerializersFor(const [
  TextOutput,
  StatUpdate,
  // TODO: others
])
final Serializers serializers = _$serializers;
