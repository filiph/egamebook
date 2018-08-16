import 'package:code_builder/code_builder.dart';
import 'package:logging/logging.dart';

import 'add_writers_statements.dart';
import 'generate_rescue_situation.dart';
import 'generated_game_object.dart';
import 'method_builders.dart';
import 'parameters.dart';
import 'parse_code_blocks.dart';
import 'parse_percent.dart';
import 'recase.dart';
import 'types.dart';

final Logger log = new Logger("generated_action");

/// Generates code for writer's action.
///
/// Following this:
/// https://trello.com/c/S1cXPDQ7/1-parser-for-writer-s-output#comment-58682ee019b9e7b833655fb7
GeneratedGameObject generateAction(Map<String, String> map, String dirPath) {
  return new GeneratedAction(new Map.from(map), dirPath);
}

class GeneratedAction extends GeneratedGameObject {
  final Map<String, String> _map;

  GeneratedAction(Map<String, String> map, String path)
      : _map = map,
        super(
            map['ACTION'], reCase(map['ACTION']).pascalCase, actionType, path);

  @override
  Iterable<Spec> finalizeAst() sync* {
    var className = name;
    String forLocation = _map.containsKey('FOR_LOCATION')
        ? reCase(_map['FOR_LOCATION']).snakeCase
        : null;

    var classBuilder = ClassBuilder()
      ..name = className
      ..extend = actionType;

    bool hasRescue =
        _map.containsKey('RESCUE_COMMAND') && _map['RESCUE_COMMAND'].isNotEmpty;
    var rescueSituationClassName = '${className}RescueSituation';

    var classType = TypeReference((b) => b..symbol = className);

    final getCommandBuilder = createNullObjectMethod('getCommand', stringType)
      ..block.addExpression(literal(_map['COMMAND']).returned);

    classBuilder.methods.add(getCommandBuilder.bake());

    final nameField = Field((b) => b
      ..name = 'name'
      ..modifier = FieldModifier.final$
      ..type = stringType
      ..assignment = literal(writersName).code
      ..annotations.add(overrideAnnotation));
    classBuilder.fields.add(nameField);

    Method isApplicableBuilder = _createIsApplicableBuilder(forLocation);
    classBuilder.methods.add(isApplicableBuilder);

    var successChance = parsePercent(_map['COMPLETE_SUCCESS_PROBABILITY']);

    Method applySuccessBuilder =
        _createApplySuccessBuilder(successChance, className);
    classBuilder.methods.add(applySuccessBuilder);

    Method applyFailureBuilder = _createApplyFailureBuilder(
        successChance, hasRescue, rescueSituationClassName, className);
    classBuilder.methods.add(applyFailureBuilder);

    final reasonedChance =
        reasonedSuccessChanceType.constInstance([literal(successChance)]);

    final successChanceBuilder = createActorSimWorldNullMethod(
        'getSuccessChance', reasonedSuccessChanceType)
      ..block.addExpression(reasonedChance.returned);
    classBuilder.methods.add(successChanceBuilder.bake());

    classBuilder.methods.add(_createGetter('rerollable', boolType, false));

    var rollReasonBuilder =
        createActorSimWorldNullMethod('getRollReason', stringType)
          ..block.addExpression(literal('Will you be successful?').returned);
    classBuilder.methods.add(rollReasonBuilder.bake());

    classBuilder.methods
        .add(_createGetter('rerollResource', resourceType, null));

    String helpMessage = _map['HINT'];
    if (helpMessage != null &&
        _map.containsKey('ADVANTAGE_HINT_ADDENDUM_NEGATIVE')) {
      helpMessage += " " + _map['ADVANTAGE_HINT_ADDENDUM_NEGATIVE'];
      // TODO: create the other action, with ADVANTAGE_HINT_ADDENDUM
    }

    classBuilder.methods
        .add(_createGetter('helpMessage', stringType, helpMessage));

    classBuilder.methods.add(_createGetter('isAggressive', boolType, false));

    classBuilder.fields.add(Field((b) => b
      ..static = true
      ..modifier = FieldModifier.final$
      ..name = 'singleton'
      ..type = classType
      ..assignment = classType.newInstance([]).code));

    //  TODO add FAILURE_BEGINNING_DESCRIPTION in applyFailure
    //   https://trello.com/c/S1XPDQ7/1-parser-for-writer-s-output#comment-58682ee019b9e7b833655fb7
    yield classBuilder.build();

    if (hasRescue) {
      yield generateRescueSituation(
          rescueSituationClassName,
          writersName,
          _map['RESCUE_COMMAND'],
          _map['RESCUE_DESCRIPTION'],
          _map['RESCUE_PREREQUISITES'],
          _map['RESCUE_EFFECT'],
          _map['RESCUE_HINT'],
          _map['CONTINUATION_OF_FAILURE_COMMAND'],
          _map['CONTINUATION_OF_FAILURE_DESCRIPTION'],
          _map['CONTINUATION_OF_FAILURE_EFFECT'],
          _map['CONTINUATION_OF_FAILURE_HINT'],
          _map['SUCCESS_EFFECT']);
    }
  }

  Method _createGetter(String name, TypeReference type, Object returnValue) {
    return Method((b) => b
      ..type = MethodType.getter
      ..name = name
      ..returns = type
      ..annotations.add(overrideAnnotation)
      ..body = literal(returnValue).code);
  }

  Method _createApplyFailureBuilder(num successChance, bool hasRescue,
      String rescueSituationClassName, String className) {
    var applyFailureBuilder =
        createActionContextNullMethod('applyFailure', stringType);
    if (successChance == 1.0) {
      applyFailureBuilder.block.statements
          .add(stateErrorThrow('Success chance is 100%'));
    } else {
      var failureBeginningDescription = _map['FAILURE_BEGINNING_DESCRIPTION'];
      applyFailureBuilder.block.statements.addAll(
          createDescriptionStatements(failureBeginningDescription ?? ''));
      if (hasRescue) {
        applyFailureBuilder.block
            .addExpression(refer('w').property('pushSituation').call([
          refer(rescueSituationClassName).newInstanceNamed(
              'initialized', [refer('w').property('randomInt').call([])])
        ]));
      } else {
        // No rescue, but we might have FAILURE_EFFECT and FAILURE_DESCRIPTION
        var failureDescription = _map['FAILURE_DESCRIPTION'];
        applyFailureBuilder.block.statements
            .addAll(createDescriptionStatements(failureDescription ?? ''));
        if (_map.containsKey('FAILURE_EFFECT')) {
          addStatements(_map['FAILURE_EFFECT'], applyFailureBuilder.block);
        }
      }
      applyFailureBuilder.block.addExpression(
          literal('\${a.name} fails to perform $className').returned);
    }
    return applyFailureBuilder.bake();
  }

  Method _createApplySuccessBuilder(num successChance, String className) {
    final applySuccessBuilder =
        createActionContextNullMethod('applySuccess', stringType);

    if (successChance == 0) {
      applySuccessBuilder.block.statements
          .add(stateErrorThrow('Success chance is 0%.'));
    } else {
      assert(_map.containsKey('COMPLETE_SUCCESS_DESCRIPTION'),
          "$name is missing COMPLETE_SUCCESS_DESCRIPTION: $_map");
      var successDescription = _map['COMPLETE_SUCCESS_DESCRIPTION'];
      applySuccessBuilder.block.statements
          .addAll(createDescriptionStatements(successDescription ?? ''));
      if (_map['SUCCESS_EFFECT'] != null) {
        String successEffectBlock = _map['SUCCESS_EFFECT'];
        addStatements(successEffectBlock, applySuccessBuilder.block);
      }
      applySuccessBuilder.block.addExpression(
          literal('\${a.name} successfully performs $className').returned);
    }
    return applySuccessBuilder.bake();
  }

  Method _createIsApplicableBuilder(String forLocation) {
    var isApplicableBuilder =
        createActorSimWorldNullMethod("isApplicable", boolType);
    if (forLocation != null) {
      final locationCondition = (refer(worldParameter.name)
              .property("currentSituation")
              .asA(roomRoamingSituationType))
          .property("currentRoomName")
          .notEqualTo(literal(forLocation));
      isApplicableBuilder.block.statements
          .add(_createIfGuard(locationCondition, false));
    }
    if (_map['PREREQUISITES'] != null) {
      final rawIfStatement = Code('if (!(${_map['PREREQUISITES']})) {'
          '  return false;'
          '}');
      isApplicableBuilder.block.statements.add(rawIfStatement);
    }
    isApplicableBuilder.block.addExpression(literal(true).returned);
    return isApplicableBuilder.bake();
  }

  final _dartEmitter = DartEmitter();

  /// Generates a piece of code that will return literal [returnValue]
  /// if [condition] is `true`.
  ///
  /// This is here until https://github.com/dart-lang/code_builder/issues/223
  /// is resolved.
  Code _createIfGuard(Expression condition, Object returnValue) {
    final conditionString = condition.accept(_dartEmitter).toString();
    final returnStatement = literal(returnValue).returned.statement;
    final returnString = returnStatement.accept(_dartEmitter).toString();
    return Code('if ($conditionString) { $returnString }');
  }
}
