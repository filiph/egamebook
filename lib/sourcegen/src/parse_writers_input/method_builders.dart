import 'package:code_builder/code_builder.dart';

import 'escape_dollar_sign.dart';
import 'parameters.dart';
import 'types.dart';

final ReferenceBuilder overrideAnnotation = reference('override');

final ExpressionBuilder unimplementedErrorThrow =
    reference('UnimplementedError').newInstance([]).asThrow();

/// Adds a note to the method, with an assert that fails.
void addTodoToMethod(MethodBuilder method, String message) {
  var escapedMessage = escapeDollarSign(message);
  method.addStatement(literal('/* $escapedMessage */'));
  method.addStatement(reference('DEV_MODE').or(literal(false)).asAssert());
}

/// Same as [createActionContextNullMethod], but for closures.
MethodBuilder createActionContextClosure() {
  final method = new MethodBuilder.closure()
    ..addPositional(actionContextParameter);
  _addActionContextConvenienceAccessors(method);
  return method;
}

/// Creates a new [MethodBuilder] with a skeleton of a method that takes
/// 3 positional arguments: an [Actor], a [WorldState] and a [Storyline].
///
/// This is shared across at least two methods.
MethodBuilder createActionContextNullMethod(
    String methodName, TypeBuilder returnType) {
  final method = new MethodBuilder(methodName, returnType: returnType)
    ..addPositional(actionContextParameter)
    ..addPositional(nullParameter)
    ..addAnnotation(overrideAnnotation);
  _addActionContextConvenienceAccessors(method);
  return method;
}

MethodBuilder createActorSimWorldNullMethod(
    String methodName, TypeBuilder returnType) {
  return new MethodBuilder(methodName, returnType: returnType)
    ..addPositional(actorParameter)
    ..addPositional(simulationParameter)
    ..addPositional(worldParameter)
    ..addPositional(nullParameter)
    ..addAnnotation(overrideAnnotation);
}

/// Things like `Action.getCommand(Null _)`.
MethodBuilder createNullObjectMethod(
    String methodName, TypeBuilder returnType) {
  return new MethodBuilder(methodName, returnType: returnType)
    ..addPositional(nullParameter)
    ..addAnnotation(overrideAnnotation);
}

/// Creates a new [MethodBuilder] with a skeleton of a closure that takes
/// 3 positional arguments: an [Actor], a [WorldState] and a [Storyline].
MethodBuilder createActorSimWorldStoryClosure() {
  return new MethodBuilder.closure()
    ..addPositional(actorParameter)
    ..addPositional(simulationParameter)
    ..addPositional(worldParameter)
    ..addPositional(storylineParameter);
}

/// Same as [createActionContextClosure], but for `ApplicabilityContext`.
MethodBuilder createApplicabilityContextClosure() {
  final method = new MethodBuilder.closure()
    ..addPositional(applicabilityContextParameter);
  _addApplicabilityContextConvenienceAccessors(method);
  return method;
}

StatementBuilder stateErrorThrow(String message) =>
    reference('StateError').newInstance([literal(message)]).asThrow();

/// Add convenience assignments at the top of a method:
///
///     WorldState originalWorld = c.world;
///     Simulation sim = c.simulation;
///     Actor a = c.actor;
///     WorldStateBuilder w = c.outputWorld;
///     Storyline s = c.outputStoryline;
void _addActionContextConvenienceAccessors(MethodBuilder method) {
  method
    ..addStatement(reference("c")
        .property("world")
        .asFinal("originalWorld", worldStateType))
    ..addStatement(
        reference("c").property("simulation").asFinal("sim", simulationType))
    ..addStatement(reference("c").property("actor").asFinal("a", actorType))
    ..addStatement(reference("c")
        .property("outputWorld")
        .asFinal("w", worldStateBuilderType))
    ..addStatement(
        reference("c").property("outputStoryline").asFinal("s", storylineType));
}

/// Add convenience assignments at the top of a method:
///
///     WorldState w = c.world;
///     Simulation sim = c.simulation;
///     Actor a = c.actor;
void _addApplicabilityContextConvenienceAccessors(MethodBuilder method) {
  method
    ..addStatement(
        reference("c").property("world").asFinal("w", worldStateType))
    ..addStatement(
        reference("c").property("simulation").asFinal("sim", simulationType))
    ..addStatement(reference("c").property("actor").asFinal("a", actorType));
}
