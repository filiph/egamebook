import 'package:code_builder/code_builder.dart';

abstract class GeneratedGameObject {
  final TypeBuilder type;

  /// The path to the directory in which the source file was found, relative
  /// to the root of the Google Drive dump directory.
  ///
  /// For example, an action parsed from `/path/to/drive_dump/road_to_azeroth/`
  /// will have this set as `road_to_azeroth/`.
  final String dirPath;

  /// For example, 'ironcastRoad' or 'EnterTombOfWarriors'.
  final String name;

  /// For example, `ironcast_road` or `enter_tomb_of_warriors`.
  final String writersName;

  static String _validateAndRemoveDollarSign(String writersName) {
    if (!writersName.startsWith(r'$')) {
      throw new ArgumentError("Writer's name doesn't contain a dollar sign: "
          "$writersName");
    }
    return writersName.substring(1);
  }

  GeneratedGameObject(String writersName, this.name, this.type, this.dirPath)
      : writersName = _validateAndRemoveDollarSign(writersName);

  String get path;

  Iterable<AstBuilder> finalizeAst();
}
