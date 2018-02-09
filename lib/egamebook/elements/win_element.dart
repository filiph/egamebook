library egamebook.element.win;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'element_base.dart';

part 'win_element.g.dart';

abstract class WinGame extends ElementBase
    implements Built<WinGame, WinGameBuilder> {
  static Serializer<WinGame> get serializer => _$winGameSerializer;

  factory WinGame([void updates(WinGameBuilder b)]) = _$WinGame;

  WinGame._();

  String get markdownText;
}
