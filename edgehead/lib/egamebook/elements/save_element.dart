library egamebook.element.save;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'element_base.dart';

part 'save_element.g.dart';

abstract class SaveGame extends ElementBase
    implements Built<SaveGame, SaveGameBuilder> {
  static Serializer<SaveGame> get serializer => _$saveGameSerializer;

  factory SaveGame([void updates(SaveGameBuilder b)]) = _$SaveGame;

  SaveGame._();

  /// This is the output of `SaveGame.toJson()`, encoded as String.
  ///
  /// Each egamebook can choose whatever serialization it wants. Presenters
  /// are only tasked with persisting the data.
  String get saveGameSerialized;
}
