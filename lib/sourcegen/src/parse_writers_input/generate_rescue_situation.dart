import 'package:analyzer/analyzer.dart';
import 'package:code_builder/code_builder.dart';
import 'package:edgehead/sourcegen/src/recase/recase.dart';

import 'generate_simple_action.dart';
import 'method_builders.dart';
import 'parameters.dart';
import 'types.dart';

/// Generates the Situation class for a particular Action.
///
/// Each Situation needs to be implemented as its own class. Can't use deeper
/// inheritance here because then built_value wouldn't work. And we need
/// built_value to support saving, immutability, value type and all the other
/// nice things it gives to all situations.
///
/// We can't have a generic `ActionRescueSituation` with some data attached
/// because we need the situation to filter actions (rescue action and
/// continuation of failure action).
AstBuilder<AstNode> generateRescueSituation(
    String className,
    String writersName,
    String rescueCommand,
    String rescueDescription,
    String rescuePrerequisites,
    String rescueEffect,
    String rescueHint,
    String continuationCommand,
    String continuationDescription,
    String continuationEffect,
    String continuationHint,
    String successEffect) {
  var situationBuilderClassName = '${className}Builder';

  // Generate:
  //   abstract class AbcRescueSituation extends Situation implements
  //       Built<AbcRescueSituation, AbcRescueSituationBuilder> {}
  var situationClass = new ClassBuilder(className,
      asAbstract: true,
      asExtends: situationType,
      asImplements: [
        new TypeBuilder("Built", genericTypes: [
          new TypeBuilder(className),
          new TypeBuilder(situationBuilderClassName)
        ])
      ]);

  var situationClassType = new TypeBuilder(className);
  var generatedSituationClassType = new TypeBuilder("_\$$className");
  var situationBuilderClass = new TypeBuilder(situationBuilderClassName);
  var camelCaseSituation = new ReCase(className).camelCase;
  var generatedSerializerName = reference("_\$${camelCaseSituation}Serializer");

  // static Serializer<AbcRescueSituation> get serializer =>
  //     _$abcRescueSituationSerializer;
  var serializerGetter = new MethodBuilder.getter("serializer",
      returnType:
          new TypeBuilder("Serializer", genericTypes: [situationClassType]),
      returns: generatedSerializerName);

  situationClass.addMethod(serializerGetter, asStatic: true);

  //  factory AbcRescueSituation([updates(AbcRescueSituationBuilder b)]) =
  //      _$AbcRescueSituation;
  var updatesParameter = new FunctionParameterBuilder('updates',
      returnType: new TypeBuilder('void'))
    ..addPositional(new ParameterBuilder("b", type: situationBuilderClass));
  var defaultConst =
      new ConstructorBuilder.redirectTo(null, generatedSituationClassType)
        ..addPositional(updatesParameter.asOptional());
  situationClass.addConstructor(defaultConst);

  //    factory TakeOutGateGuardsRescueSituation.initialized(
  //    Room currentRoom, bool monstersAlive) =>
  //    new TakeOutGateGuardsRescueSituation((b) => b
  //    ..id = getRandomId()
  //    ..time = 0
  //    ..currentRoomName = currentRoom.name
  //    ..monstersAlive = monstersAlive);
  var initializedConstructor = new ConstructorBuilder(
      name: "initialized", asFactory: true)
    ..addPositional(new ParameterBuilder("id", type: intType))
    ..addStatement(situationClass.newInstance([
      new MethodBuilder.closure()
        ..addPositional(new ParameterBuilder("b"))
        ..addStatement(reference("id").asAssign(reference("b").property("id")))
        ..addStatement(literal(0).asAssign(reference("b").property("time")))
    ]).asReturn());
  situationClass.addConstructor(initializedConstructor);

  //    TakeOutGateGuardsRescueSituation._();
  var privateConst = new ConstructorBuilder(name: '_');
  situationClass.addConstructor(privateConst);

  //      actions can be just instances of a generic SimpleAction and ContinuationOfFailureAction
  //      but Situation needs to be each implemented, otherwise it can't be a built value
  //    @override
  //    List<Action> get actions => [new SimpleAction('Blah', (a, w, s) {
  //      s.add("Blah!");
  //  w.popSituation();
  //      return "blah done";
  //    }, null)];
  var effect = "${rescueEffect ?? ''}\n"
      "${successEffect ?? ''}";
  var actionsGetter = new MethodBuilder.getter("actions",
      returnType: new TypeBuilder("List", genericTypes: [actionType]),
      returns: list(<NewInstanceBuilder>[
        generateSimpleAction(
            "${writersName}_rescue",
            rescueCommand,
            rescueDescription,
            rescuePrerequisites,
            effect,
            rescueHint,
            className),
        generateSimpleAction(
            "${writersName}_continuation_of_failure",
            continuationCommand,
            continuationDescription,
            null,
            continuationEffect,
            continuationHint,
            className)
      ]))
    ..addAnnotation(overrideAnnotation);

  situationClass.addMethod(actionsGetter);

  //    @override
  //    int get id;
  var idGetter =
      new MethodBuilder.getter('id', returnType: intType, asAbstract: true)
        ..addAnnotation(overrideAnnotation);
  situationClass.addMethod(idGetter);

  //    @override
  //    int get time;
  var timeGetter =
      new MethodBuilder.getter('time', returnType: intType, asAbstract: true)
        ..addAnnotation(overrideAnnotation);
  situationClass.addMethod(timeGetter);

  //    @override
  //    String get name => "RoomRoamingSituation";
  var nameGetter = new MethodBuilder.getter('name',
      returnType: stringType, returns: literal(writersName))
    ..addAnnotation(overrideAnnotation);
  situationClass.addMethod(nameGetter);

  //    @override
  //    Situation elapseTime() => rebuild((b) => b..time += 1);
  var elapseTime = new MethodBuilder("elapseTime",
      returnType: situationType,
      returns: reference("rebuild").call([
        new MethodBuilder.closure()
          ..addPositional(new ParameterBuilder('b'))
          ..addStatement(reference('b').property('time').increment())
          ..addStatement(reference('b').asReturn())
      ]))
    ..addAnnotation(overrideAnnotation);
  situationClass.addMethod(elapseTime);

  //    @override
  //    Actor getActorAtTime(int time, WorldState world) {
  //    return world.actors.singleWhere((a) => a.isPlayer);
  //    }
  var getActorAtTimeMethod = new MethodBuilder('getActorAtTime',
      returnType: actorType)
    ..addPositional(new ParameterBuilder('time', type: intType))
    ..addPositional(simulationParameter)
    ..addPositional(worldParameter)
    ..addStatement(reference('time').notEquals(literal(0)).asIf()
      ..addStatement(literal(null).asReturn()))
    ..addStatement(
        reference('w').property('actors').property('singleWhere').call([
      new MethodBuilder.closure(returns: reference('a').property('isPlayer'))
        ..addPositional(new ParameterBuilder('a'))
    ]).asReturn())
    ..addAnnotation(overrideAnnotation);
  situationClass.addMethod(getActorAtTimeMethod);

  //    @override
  //    Iterable<Actor> getActors(Iterable<Actor> actors, WorldState world) {
  //    return [world.actors.singleWhere((a) => a.isPlayer)];
  //    }
  var actorIterablesType =
      new TypeBuilder('Iterable', genericTypes: [actorType]);
  var getActorsMethod = new MethodBuilder('getActors',
      returnType: actorIterablesType)
    ..addPositional(new ParameterBuilder('actors', type: actorIterablesType))
    ..addPositional(simulationParameter)
    ..addPositional(worldParameter)
    ..addStatement(list(<ExpressionBuilder>[
      reference('actors').property('singleWhere').call([
        new MethodBuilder.closure(returns: reference('a').property('isPlayer'))
          ..addPositional(new ParameterBuilder('a'))
      ])
    ]).asReturn())
    ..addAnnotation(overrideAnnotation);
  situationClass.addMethod(getActorsMethod);

  return situationClass;
}
