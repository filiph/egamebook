import 'package:code_builder/code_builder.dart';

import 'escape_dollar_sign.dart';
import 'parameters.dart';

final ReferenceBuilder overrideAnnotation = reference('override');

final ExpressionBuilder unimplementedErrorThrow =
    reference('UnimplementedError').newInstance([]).asThrow();

/// Adds a note to the method, with an assert that fails.
void addTodoToMethod(MethodBuilder method, String message) {
  var escapedMessage = escapeDollarSign(message);
  method.addStatement(literal('/* $escapedMessage */'));
  method.addStatement(reference('DEV_MODE').or(literal(false)).asAssert());
}

MethodBuilder createActorWorldMethod(
    String methodName, TypeBuilder returnType) {
  return new MethodBuilder(methodName, returnType: returnType)
    ..addPositional(actorParameter)
    ..addPositional(worldParameter)
    ..addAnnotation(overrideAnnotation);
}

/// Creates a new [MethodBuilder] with a skeleton of a method that takes
/// 3 positional arguments: an [Actor], a [WorldState] and a [Storyline].
///
/// This is shared across at least two methods.
MethodBuilder createActorWorldStoryMethod(
    String methodName, TypeBuilder returnType) {
  return new MethodBuilder(methodName, returnType: returnType)
    ..addPositional(actorParameter)
    ..addPositional(worldParameter)
    ..addPositional(storylineParameter)
    ..addAnnotation(overrideAnnotation);
}

/// Creates a new [MethodBuilder] with a skeleton of a closure that takes
/// 3 positional arguments: an [Actor], a [WorldState] and a [Storyline].
MethodBuilder createActorWorldStoryClosure() {
  return new MethodBuilder.closure()
      ..addPositional(actorParameter)
      ..addPositional(worldParameter)
      ..addPositional(storylineParameter);
}

StatementBuilder stateErrorThrow(String message) =>
    reference('StateError').newInstance([literal(message)]).asThrow();
