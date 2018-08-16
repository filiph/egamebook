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

  final successClosure = _createActorSimWorldBuilderStorylineSelfClosure();
  successClosure.block.addExpression(refer('s').property('add').call(
      [literal(escapeWritersText(description))],
      {'wholeSentence': literalTrue}));
  successClosure.block
      .addExpression(refer('w').property('popSituation').call([refer('sim')]));

  if (effect != null) {
    addStatements(effect, successClosure.block);
  }

  successClosure.block.addExpression(
      literal("$className resolved with rescue/continuation ($command)")
          .returned);

  final namedArguments = <String, Expression>{};
  if (prerequisites != null) {
    final isApplicableClosure = _createActorSimWorldSelfClosure();
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

MethodAndBlock _createActorSimWorldSelfClosure() {
  final method = MethodBuilder()
    ..returns = stringType
    ..requiredParameters.addAll([
      actorParameter,
      simulationParameter,
      worldParameter,
      Parameter((b) => b..name = 'self')
    ]);
  return MethodAndBlock(method);
}

MethodAndBlock _createActorSimWorldBuilderStorylineSelfClosure() {
  final method = MethodBuilder()
    ..returns = stringType
    ..requiredParameters.addAll([
      actorParameter,
      simulationParameter,
      worldStateBuilderParameter,
      storylineParameter,
      Parameter((b) => b..name = 'self')
    ]);
  return MethodAndBlock(method);
}
