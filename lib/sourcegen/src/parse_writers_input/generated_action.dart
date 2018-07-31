import 'package:analyzer/analyzer.dart';
import 'package:code_builder/code_builder.dart';
import 'package:logging/logging.dart';

import 'add_writers_statements.dart';
import 'escape_dollar_sign.dart';
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
  Iterable<AstBuilder<AstNode>> finalizeAst() sync* {
    var className = name;
    String forLocation = _map.containsKey('FOR_LOCATION')
        ? reCase(_map['FOR_LOCATION']).snakeCase
        : null;
    var classBuilder = new ClassBuilder(className);
    classBuilder.setExtends(actionType);

    bool hasRescue =
        _map.containsKey('RESCUE_COMMAND') && _map['RESCUE_COMMAND'].isNotEmpty;
    var rescueSituationClassName = '${className}RescueSituation';

    var classType = new TypeBuilder(className);

    MethodBuilder getCommandBuilder =
        createNullObjectMethod('getCommand', new TypeBuilder('String'))
          ..addStatement(literal(_map['COMMAND']).asReturn());
    classBuilder.addMethod(getCommandBuilder);

    classBuilder.addField(new FieldBuilder.asFinal("name",
        type: stringType, value: literal(writersName))
      ..addAnnotation(overrideAnnotation));

    MethodBuilder isApplicableBuilder = _createIsApplicableBuilder(forLocation);
    classBuilder.addMethod(isApplicableBuilder);

    var successChance = parsePercent(_map['COMPLETE_SUCCESS_PROBABILITY']);

    MethodBuilder applySuccessBuilder =
        _createApplySuccessBuilder(successChance, className);
    classBuilder.addMethod(applySuccessBuilder);

    MethodBuilder applyFailureBuilder = _createApplyFailureBuilder(
        successChance, hasRescue, rescueSituationClassName, className);
    classBuilder.addMethod(applyFailureBuilder);

    final reasonedChance =
        reasonedSuccessChanceType.constInstance([literal(successChance)]);

    var successChanceBuilder = createActorSimWorldNullMethod(
        'getSuccessChance', reasonedSuccessChanceType)
      ..addStatement(reasonedChance.asReturn());
    classBuilder.addMethod(successChanceBuilder);

    var rerollableBuilder = new MethodBuilder.getter('rerollable',
        returnType: boolType, returns: literal(false))
      ..addAnnotation(overrideAnnotation);
    classBuilder.addMethod(rerollableBuilder);

    var rollReasonBuilder =
        createActorSimWorldNullMethod('getRollReason', stringType)
          ..addStatement(literal('Will you be successful?').asReturn());
    classBuilder.addMethod(rollReasonBuilder);

    var rerollResourceBuilder = new MethodBuilder.getter('rerollResource',
        returnType: resourceType, returns: literal(null))
      ..addAnnotation(overrideAnnotation);
    classBuilder.addMethod(rerollResourceBuilder);

    String helpMessage = _map['HINT'];
    if (helpMessage != null &&
        _map.containsKey('ADVANTAGE_HINT_ADDENDUM_NEGATIVE')) {
      helpMessage += " " + _map['ADVANTAGE_HINT_ADDENDUM_NEGATIVE'];
      // TODO: create the other action, with ADVANTAGE_HINT_ADDENDUM
    }

    var helpMessageBuilder = new MethodBuilder.getter('helpMessage',
        returnType: stringType, returns: literal(helpMessage))
      ..addAnnotation(overrideAnnotation);
    classBuilder.addMethod(helpMessageBuilder);

    var isAggressiveBuilder = new MethodBuilder.getter('isAggressive',
        returnType: boolType, returns: literal(false))
      ..addAnnotation(overrideAnnotation);
    classBuilder.addMethod(isAggressiveBuilder);

    var singletonBuilder = new FieldBuilder.asFinal('singleton',
        type: classType, value: classType.newInstance([]));
    classBuilder.addField(singletonBuilder, asStatic: true);

    //  START HERE --  then add FAILURE_BEGINNING_DESCRIPTION in applyFailure
    //   https://trello.com/c/S1XPDQ7/1-parser-for-writer-s-output#comment-58682ee019b9e7b833655fb7
    yield classBuilder;

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

  MethodBuilder _createApplyFailureBuilder(num successChance, bool hasRescue,
      String rescueSituationClassName, String className) {
    var applyFailureBuilder =
        createActionContextNullMethod('applyFailure', stringType);
    if (successChance == 1.0) {
      applyFailureBuilder
          .addStatement(stateErrorThrow('Success chance is 100%'));
    } else {
      var failureBeginningDescription = _map['FAILURE_BEGINNING_DESCRIPTION'];
      applyFailureBuilder.addStatements(
          createDescriptionStatements(failureBeginningDescription ?? ''));
      if (hasRescue) {
        applyFailureBuilder
            .addStatement(reference('w').property('pushSituation').call([
          reference(rescueSituationClassName).newInstance(
              [reference('w').invoke('randomInt', [])],
              constructor: 'initialized')
        ]));
      } else {
        // No rescue, but we might have FAILURE_EFFECT and FAILURE_DESCRIPTION
        var failureDescription = _map['FAILURE_DESCRIPTION'];
        applyFailureBuilder.addStatements(
            createDescriptionStatements(failureDescription ?? ''));
        if (_map.containsKey('FAILURE_EFFECT')) {
          addStatements(_map['FAILURE_EFFECT'], applyFailureBuilder);
        }
      }
      applyFailureBuilder.addStatement(
          literal('\${a.name} fails to perform $className').asReturn());
    }
    return applyFailureBuilder;
  }

  MethodBuilder _createApplySuccessBuilder(
      num successChance, String className) {
    var applySuccessBuilder =
        createActionContextNullMethod('applySuccess', stringType);

    if (successChance == 0) {
      applySuccessBuilder
          .addStatement(stateErrorThrow('Success chance is 0%.'));
    } else {
      assert(_map.containsKey('COMPLETE_SUCCESS_DESCRIPTION'),
          "$name is missing COMPLETE_SUCCESS_DESCRIPTION: $_map");
      var successDescription =
          escapeDollarSign(_map['COMPLETE_SUCCESS_DESCRIPTION']);
      applySuccessBuilder
          .addStatements(createDescriptionStatements(successDescription ?? ''));
      if (_map['SUCCESS_EFFECT'] != null) {
        String successEffectBlock = _map['SUCCESS_EFFECT'];
        addStatements(successEffectBlock, applySuccessBuilder);
      }
      applySuccessBuilder.addStatement(
          literal('\${a.name} successfully performs $className').asReturn());
    }
    return applySuccessBuilder;
  }

  MethodBuilder _createIsApplicableBuilder(String forLocation) {
    var isApplicableBuilder =
        createActorSimWorldNullMethod("isApplicable", boolType);
    if (forLocation != null) {
      isApplicableBuilder.addStatement((reference(worldParameter.name)
              .property("currentSituation")
              .castAs(roomRoamingSituationType))
          .parentheses()
          .property("currentRoomName")
          .notEquals(literal(forLocation))
          .asIf()
            ..addStatement(literal(false).asReturn()));
    }
    if (_map['PREREQUISITES'] != null) {
      var ifStatement = new ExpressionBuilder.raw((_) => _map['PREREQUISITES'])
          .parentheses()
          .notEquals(literal(true))
          .asIf()
            ..addStatement(literal(false).asReturn());
      try {
        ifStatement.buildStatement();
        isApplicableBuilder.addStatement(ifStatement);
      } catch (e) {
        log.severe('Bad expression: ${_map['PREREQUISITES']}');
        addTodoToMethod(isApplicableBuilder,
            'PLEASE IMPLEMENT PREREQUISITE: ${_map['PREREQUISITES']}');
      }
    }
    isApplicableBuilder.addStatement(literal(true).asReturn());
    return isApplicableBuilder;
  }
}
