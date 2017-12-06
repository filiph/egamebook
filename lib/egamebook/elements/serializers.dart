library egamebook.element.serializers;

import 'package:built_value/serializer.dart';

import 'stat_update_element.dart';
import 'text_element.dart';

part 'serializers.g.dart';

@SerializersFor(const [
  TextOutput,
  StatUpdate,
  // TODO: others
])
final Serializers serializers = _$serializers;
