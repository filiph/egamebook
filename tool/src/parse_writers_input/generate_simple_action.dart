import 'package:code_builder/code_builder.dart';

import 'add_writers_statements.dart';
import 'types.dart';

NewInstanceBuilder generateSimpleAction(String actionName, String command,
    String description, String effect, String hint, String className) {
  if (command == null) {
    log.severe('Command in $className is null');
    // ignore: parameter_assignments
    command = 'MISSING';
  }

  var closure = new MethodBuilder.closure()
    ..addPositional(new ParameterBuilder('a'))
    ..addPositional(new ParameterBuilder('w'))
    ..addPositional(new ParameterBuilder('s'))
    ..addPositional(new ParameterBuilder('movePlayer'))
    ..addStatement(reference('s').property('add').call([literal(description)]));

  if (effect != null) {
    addStatements(effect, closure);
  }

  closure
    ..addStatement(reference('w').property('popSituation').call([]))
    ..addStatement(
        literal("$className resolved with rescue/continuation ($command)")
            .asReturn());

  return simpleActionType.newInstance(
      [literal(actionName), literal(command), closure, literal(hint)]);
}
