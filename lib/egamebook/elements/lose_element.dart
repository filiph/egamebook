library egamebook.element.lose;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'element_base.dart';

part 'lose_element.g.dart';

abstract class LoseGame extends ElementBase
    implements Built<LoseGame, LoseGameBuilder> {
  static Serializer<LoseGame> get serializer => _$loseGameSerializer;

  factory LoseGame([void updates(LoseGameBuilder b)]) = _$LoseGame;

  LoseGame._();

  String get markdownText;
}
