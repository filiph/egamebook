library egamebook.element.stat_update;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'element_base.dart';
import 'package:edgehead/stat.dart';

part 'stat_update_element.g.dart';

abstract class StatUpdate<T> extends ElementBase
    implements Built<StatUpdate<T>, StatUpdateBuilder<T>> {
  static Serializer<StatUpdate> get serializer => _$statUpdateSerializer;

  factory StatUpdate([void updates(StatUpdateBuilder<T> b)]) = _$StatUpdate<T>;

  StatUpdate._();

  /// Name of the stat. Corresponds to [Stat.name].
  String get name;

  /// The value of the stat after the update.
  T get newValue;
}
