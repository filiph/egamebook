library egamebook.command.load_game;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'command_base.dart';

part 'load_game_command.g.dart';

abstract class LoadGame extends CommandBase
    implements Built<LoadGame, LoadGameBuilder> {
  static Serializer<LoadGame> get serializer => _$loadGameSerializer;

  factory LoadGame([void updates(LoadGameBuilder b)]) = _$LoadGame;

  LoadGame._();

  /// The serialized savegame to be loaded.
  String get saveGameSerialized;
}
