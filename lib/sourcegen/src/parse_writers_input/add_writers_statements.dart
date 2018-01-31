import 'package:code_builder/code_builder.dart';
import 'package:logging/logging.dart';

import 'method_builders.dart';

final Logger log = new Logger("add_writers_statements");

/// Tries to parse [writersStatements] and if it satisfies analyzer, add
/// it to [method]. If not, add a `todo`.
///
/// [writersStatements] should be one per line.
void addStatements(String writersStatements, MethodBuilder method) {
  Iterable<String> successEffectCommands =
      writersStatements.split('\n').where((s) => s.isNotEmpty);
  for (var line in successEffectCommands) {
    var statement = new StatementBuilder.raw((_) => line);
    try {
      // Try if it builds.
      statement.buildStatement();
      method.addStatement(statement);
    } catch (e) {
      log.severe('Bad expression: $line');
      addTodoToMethod(method, 'PLEASE IMPLEMENT SUCCESS_EFFECT: $line');
    }
  }
}
