import 'package:code_builder/code_builder.dart';
import 'package:egamebook_builder/src/parse_writers_input/escape_writers_text.dart';
import 'package:egamebook_builder/src/parse_writers_input/parameters.dart';

import 'add_writers_statements.dart';
import 'method_builders.dart';
import 'types.dart';

Expression generateSimpleAction(
    String actionName,
    String command,
    String description,
    String prerequisites,
    String effect,
    String hint,
    String className) {
  if (command == null) {
    print('Command in $className is null');
    // ignore: parameter_assignments
    command = 'MISSING';
  }

  final successClosure = createActionContextSelfClosure();
  successClosure.block.addExpression(refer('s').property('add').call(
      [literal(escapeWritersText(description))],
      {'wholeSentence': literalTrue}));
  successClosure.block
      .addExpression(refer('w').property('popSituation').call([refer('c')]));

  if (effect != null) {
    addStatements(effect, successClosure.block);
  }

  successClosure.block.addExpression(
      literal("$className resolved with rescue/continuation ($command)")
          .returned);

  final namedArguments = <String, Expression>{};
  if (prerequisites != null) {
    final isApplicableClosure = _createContextActorSimWorldSelfClosure();
    isApplicableClosure.block.statements.add(Code('return $prerequisites;'));
    namedArguments["isApplicableClosure"] = isApplicableClosure.bakeAsClosure();
  }

  return simpleActionType.newInstance([
    literal(actionName),
    literal(command),
    successClosure.bakeAsClosure(),
    literal(hint)
  ], namedArguments);
}

MethodAndBlock _createContextActorSimWorldSelfClosure() {
  final method = MethodBuilder()
    ..returns = stringType
    ..requiredParameters.addAll([
      applicabilityContextParameter,
      actorParameter,
      simulationParameter,
      worldParameter,
      Parameter((b) => b..name = 'self')
    ]);
  return MethodAndBlock(method);
}

/// Use in `SimpleAction`.
MethodAndBlock createActionContextSelfClosure() {
  final method = MethodBuilder()
    ..returns = stringType
    ..requiredParameters
        .addAll([actionContextParameter, Parameter((b) => b..name = 'self')]);
  final result = MethodAndBlock(method);
  addActionContextConvenienceAccessors(result);
  return result;
}
