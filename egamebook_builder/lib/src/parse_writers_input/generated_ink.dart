import 'package:code_builder/code_builder.dart';
import 'package:egamebook_builder/src/parse_writers_input/add_writers_statements.dart';
import 'package:egamebook_builder/src/parse_writers_input/generated_game_object.dart';
import 'package:egamebook_builder/src/parse_writers_input/parse_ink.dart';
import 'package:egamebook_builder/src/parse_writers_input/types.dart';

class GeneratedInk extends GeneratedGameObject {
  final String source;

  GeneratedInk(String writersName, String name, String path, this.source)
      : super(writersName, name, inkAstType, path);

  @override
  Iterable<Spec> finalizeAst() {
    final block = BlockBuilder();
    final inkAstSource = parseInk(name, source);
    addStatements(inkAstSource, block);
    return [block.build()];
  }
}
