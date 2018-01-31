import 'package:code_builder/code_builder.dart';

import 'add_writers_statements.dart';
import 'method_builders.dart';
import 'types.dart';

NewInstanceBuilder generateSimpleAction(
    String actionName,
    String command,
    String description,
    String prerequisites,
    String effect,
    String hint,
    String className) {
  if (command == null) {
    log.severe('Command in $className is null');
    // ignore: parameter_assignments
    command = 'MISSING';
  }

  var successClosure = new MethodBuilder.closure()
    ..addPositional(new ParameterBuilder('a'))
    ..addPositional(new ParameterBuilder('sim'))
    ..addPositional(new ParameterBuilder('w'))
    ..addPositional(new ParameterBuilder('s'))
    ..addPositional(new ParameterBuilder('self'))
    ..addStatement(reference('s').property('add').call([literal(description)],
        namedArguments: {"wholeSentence": literal(true)}));

  // Pop the RescueSituation.
  successClosure.addStatement(
      reference('w').property('popSituation').call([reference("sim")]));

  if (effect != null) {
    addStatements(effect, successClosure);
  }

  successClosure.addStatement(
      literal("$className resolved with rescue/continuation ($command)")
          .asReturn());

  Map<String, MethodBuilder> namedArguments = const {};
  if (prerequisites != null) {
    MethodBuilder isApplicableClosure = new MethodBuilder.closure()
      ..addPositional(new ParameterBuilder('a'))
      ..addPositional(new ParameterBuilder('sim'))
      ..addPositional(new ParameterBuilder('w'))
      ..addPositional(new ParameterBuilder('self'));
    _addIsApplicableFromString(isApplicableClosure, prerequisites);
    namedArguments = {"isApplicableClosure": isApplicableClosure};
  }

  return simpleActionType.newInstance(
      [literal(actionName), literal(command), successClosure, literal(hint)],
      named: namedArguments);
}

void _addIsApplicableFromString(
    MethodBuilder isApplicableBuilder, String prerequisites) {
  var ifStatement =
      new ExpressionBuilder.raw((_) => prerequisites).parentheses().asReturn();
  try {
    ifStatement.buildStatement();
    isApplicableBuilder.addStatement(ifStatement);
  } catch (e) {
    log.severe('Bad expression: $prerequisites');
    addTodoToMethod(
        isApplicableBuilder, 'PLEASE IMPLEMENT PREREQUISITE: $prerequisites');
  }
}
