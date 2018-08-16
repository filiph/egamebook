import 'package:code_builder/code_builder.dart';

abstract class GeneratedGameObject {
  final TypeReference type;

  /// The path to the original source file of this game object.
  final String path;

  /// For example, 'ironcastRoad' or 'EnterTombOfWarriors'.
  final String name;

  /// For example, `ironcast_road` or `enter_tomb_of_warriors`.
  final String writersName;

  static String validateAndRemoveDollarSign(String writersName) {
    if (!writersName.startsWith(r'$')) {
      throw new ArgumentError("Writer's name doesn't contain a dollar sign: "
          "$writersName");
    }
    return writersName.substring(1);
  }

  GeneratedGameObject(String writersName, this.name, this.type, this.path)
      : writersName = validateAndRemoveDollarSign(writersName);

  /// The method responsible for building the `code_builder` representation
  /// of this game object.
  Iterable<Spec> finalizeAst();
}
