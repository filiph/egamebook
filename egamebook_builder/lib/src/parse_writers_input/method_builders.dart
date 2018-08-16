import 'package:built_collection/built_collection.dart';
import 'package:code_builder/code_builder.dart';

import 'escape_writers_text.dart';
import 'parameters.dart';
import 'types.dart';

final Reference overrideAnnotation = refer('override');

final Code unimplementedErrorThrow = Code('throw UnimplementedError()');

/// Adds a note to the method, with an assert that fails.
void addTodoToBlock(MethodAndBlock method, String message) {
  var escapedMessage = escapeWritersText(message);
  method.block.statements.add(Code('/* $escapedMessage */'));
  method.block.statements.add(
      Code('assert(DEV_MODE, "TODO exists and not running in DEV_MODE");'));
}

/// An object consisting of a [method] definition (including parameters,
/// return type, etc.) and a mutable [block] of code.
///
/// This way, a convenience function can prepare not just the method but also
/// some boilerplate code.
class MethodAndBlock {
  /// The method definition, with parameters, returns types, etc.
  final MethodBuilder method;

  /// The body of the method. If left empty, method will be built as
  /// abstract.
  final BlockBuilder block;

  MethodAndBlock(this.method, [BlockBuilder block])
      : this.block = block ?? BlockBuilder();

  /// Add the [block] contents to the [method] and bake it.
  Method bake() {
    assert(
        method.body == null,
        "When using MethodAndBlock, put all the code "
        "into the block. Code in method.body will be ignored and rewritten.");
    final body = block.build();
    // Empty blocks mean that we're trying to build an abstract method.
    method.body = body.statements.isEmpty ? null : body;
    return method.build();
  }

  /// Same as [bake], but return as a closure.
  Expression bakeAsClosure() => bake().closure;
}

/// Convenience function for building getters. It creates a getter
/// annotated with `@override` by default.
MethodAndBlock createGetter(String name, TypeReference returnType,
    {bool isStatic: false, bool isOverride: true}) {
  final methodBuilder = MethodBuilder()
    ..type = MethodType.getter
    ..name = name
    ..returns = returnType
    ..static = isStatic
    ..annotations.add(overrideAnnotation);
  return MethodAndBlock(methodBuilder);
}

/// Same as [createActionContextNullMethod], but without the `Null _`
/// parameter at the end.
MethodAndBlock createActionContextMethod() {
  final method = MethodBuilder()
    ..requiredParameters = ListBuilder<Parameter>([actionContextParameter]);
  final result = MethodAndBlock(method);
  _addActionContextConvenienceAccessors(result);
  return result;
}

/// Creates a new [MethodAndBlock] with a skeleton of a method that takes
/// 2 positional arguments: an [ActionContext] and an object (which is
/// ignored, so here it's defined as `Null _`).
MethodAndBlock createActionContextNullMethod(
    String methodName, TypeReference returnType) {
  final method = MethodBuilder()
    ..name = methodName
    ..returns = returnType
    ..requiredParameters =
        ListBuilder<Parameter>([actionContextParameter, nullParameter])
    ..annotations = ListBuilder<Expression>([overrideAnnotation]);
  final result = MethodAndBlock(method);
  _addActionContextConvenienceAccessors(result);
  return result;
}

MethodAndBlock createActorSimWorldNullMethod(
    String methodName, TypeReference returnType) {
  final method = MethodBuilder()
    ..name = methodName
    ..returns = returnType
    ..requiredParameters = ListBuilder<Parameter>(
        [actorParameter, simulationParameter, worldParameter, nullParameter])
    ..annotations = ListBuilder<Expression>([overrideAnnotation]);
  return MethodAndBlock(method);
}

/// Things like `Action.getCommand(Null _)`.
MethodAndBlock createNullObjectMethod(
    String methodName, TypeReference returnType) {
  final method = MethodBuilder()
    ..name = methodName
    ..returns = returnType
    ..requiredParameters = ListBuilder<Parameter>([nullParameter])
    ..annotations = ListBuilder<Expression>([overrideAnnotation]);
  return MethodAndBlock(method);
}

/// Same as [createActionContextMethod], but for `ApplicabilityContext`.
MethodAndBlock createApplicabilityContextMethod() {
  final method = MethodBuilder()
    ..requiredParameters =
        ListBuilder<Parameter>([applicabilityContextParameter]);
  final result = MethodAndBlock(method);
  _addApplicabilityContextConvenienceAccessors(result);
  return result;
}

Code stateErrorThrow(String message) => Code('throw StateError("$message");');

/// Add convenience assignments at the top of a method:
///
///     WorldState originalWorld = c.world;
///     Simulation sim = c.simulation;
///     Actor a = c.actor;
///     WorldStateBuilder w = c.outputWorld;
///     Storyline s = c.outputStoryline;
void _addActionContextConvenienceAccessors(MethodAndBlock method) {
  method.block
    ..addExpression(refer("c")
        .property("world")
        .assignFinal("originalWorld", worldStateType))
    ..addExpression(
        refer("c").property("simulation").assignFinal("sim", simulationType))
    ..addExpression(refer("c").property("actor").assignFinal("a", actorType))
    ..addExpression(refer("c")
        .property("outputWorld")
        .assignFinal("w", worldStateBuilderType))
    ..addExpression(
        refer("c").property("outputStoryline").assignFinal("s", storylineType));
}

/// Add convenience assignments at the top of a method:
///
///     WorldState w = c.world;
///     Simulation sim = c.simulation;
///     Actor a = c.actor;
void _addApplicabilityContextConvenienceAccessors(MethodAndBlock method) {
  method.block
    ..addExpression(
        refer("c").property("world").assignFinal("w", worldStateType))
    ..addExpression(
        refer("c").property("simulation").assignFinal("sim", simulationType))
    ..addExpression(refer("c").property("actor").assignFinal("a", actorType));
}
