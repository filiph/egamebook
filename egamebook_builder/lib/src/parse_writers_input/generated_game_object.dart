import 'package:code_builder/code_builder.dart';
import 'package:logging/logging.dart';

abstract class GeneratedGameObject {
  final TypeReference type;

  /// The path to the original source file of this game object.
  final String path;

  /// For example, 'ironcastRoad' or 'EnterTombOfWarriors'.
  final String name;

  /// For example, `ironcast_road` or `enter_tomb_of_warriors`.
  final String writersName;

  final Logger log;

  GeneratedGameObject(String writersName, this.name, this.type, this.path)
      : writersName = validateAndRemoveDollarSign(writersName),
        log = Logger('GeneratedGameObject<${type.symbol}, $writersName>');

  /// The method responsible for building the `code_builder` representation
  /// of this game object.
  Iterable<Spec> finalizeAst();

  static String validateAndRemoveDollarSign(String writersName) {
    if (!writersName.startsWith(r'$')) {
      throw ArgumentError("Writer's name doesn't contain a dollar sign: "
          "$writersName");
    }
    return writersName.substring(1);
  }
}
