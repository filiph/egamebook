import 'package:code_builder/code_builder.dart';
import 'package:egamebook_builder/src/parse_writers_input/generated_ink.dart';
import 'package:logging/logging.dart';

import 'add_writers_statements.dart';
import 'generate_rescue_situation.dart';
import 'generated_game_object.dart';
import 'method_builders.dart';
import 'parameters.dart';
import 'parse_code_blocks.dart';
import 'recase.dart';
import 'types.dart';

/// The constant used for implicit actions and approaches.
final implicitPattern = r"$IMPLICIT";

final Logger log = Logger("generated_action");

/// Generates code for writer's action.
///
/// Following this:
/// https://trello.com/c/S1cXPDQ7/1-parser-for-writer-s-output#comment-58682ee019b9e7b833655fb7
GeneratedAction generateAction(Map<String, String> map, String dirPath) {
  return GeneratedAction(Map.from(map), dirPath);
}

class GeneratedAction extends GeneratedGameObject {
  static final _dartEmitter = DartEmitter();

  final Map<String, String> _map;

  final GeneratedInk ink;

  GeneratedAction(Map<String, String> map, String path)
      : _map = map,
        ink = _constructInk(map['INK'], map['ACTION'], path),
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

    String command = _map['COMMAND'];
    var isImplicit = command == implicitPattern;
    var commandPathTemplate = isImplicit ? const [] : command.split(' >> ');
    final getCommandPathBuilder = Method((b) => b
      ..type = MethodType.getter
      ..name = 'commandPathTemplate'
      ..returns = listOfString
      ..annotations.add(overrideAnnotation)
      ..body = literalList(commandPathTemplate).code);

    classBuilder.methods.add(getCommandPathBuilder);

    if (isImplicit) {
      final isImplicitGetter = _createGetter('isImplicit', boolType, true);

      classBuilder.methods.add(isImplicitGetter);
    }

    final nameField = Field((b) => b
      ..name = 'name'
      ..modifier = FieldModifier.final$
      ..type = stringType
      ..assignment = literal(writersName).code
      ..annotations.add(overrideAnnotation));
    classBuilder.fields.add(nameField);

    Method isApplicableBuilder = _createIsApplicableBuilder(forLocation);
    classBuilder.methods.add(isApplicableBuilder);

    var successChance = _map['COMPLETE_SUCCESS_PROBABILITY'] ??
        'return ReasonedSuccessChance.sureSuccess;';

    Method applySuccessBuilder = _createApplySuccessBuilder(className);
    classBuilder.methods.add(applySuccessBuilder);

    Method applyFailureBuilder = _createApplyFailureBuilder(
        hasRescue, rescueSituationClassName, className);
    classBuilder.methods.add(applyFailureBuilder);

    final successChanceBuilder = createActorSimWorldVoidMethod(
        'getSuccessChance', reasonedSuccessChanceOfVoidType)
      ..block.statements.add(Code(successChance));
    classBuilder.methods.add(successChanceBuilder.bake());

    if (_map.containsKey('REROLL_RESOURCE')) {
      // This action is rerollable.
      String resourceName;
      switch (_map['REROLL_RESOURCE']) {
        case r'$SANITY':
          resourceName = 'sanity';
          break;
        case r'$STAMINA':
          resourceName = 'stamina';
          break;
      }

      classBuilder.methods.add(_createGetter('rerollable', boolType, true));
      classBuilder.methods.add(_createGetterExpression('rerollResource',
          resourceType, refer('Resource').property(resourceName)));
    } else {
      // This action is not rerollable.
      classBuilder.methods.add(_createGetter('rerollable', boolType, false));
      classBuilder.methods
          .add(_createGetter('rerollResource', resourceType, null));
    }

    // Roll reason will just not be used it the action is non-rerollable.
    // So it's okay to define it for every action.
    var rollReasonBuilder =
        createActorSimWorldVoidMethod('getRollReason', stringType)
          ..block.addExpression(literal('Will I be successful?').returned);
    classBuilder.methods.add(rollReasonBuilder.bake());

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

  Method _createApplyFailureBuilder(
      bool hasRescue, String rescueSituationClassName, String className) {
    var applyFailureBuilder =
        createActionContextVoidMethod('applyFailure', stringType);
    var failureBeginningDescription = _map['FAILURE_BEGINNING_DESCRIPTION'];
    applyFailureBuilder.block.statements
        .addAll(createDescriptionStatements(failureBeginningDescription ?? ''));
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
    return applyFailureBuilder.bake();
  }

  Method _createApplySuccessBuilder(String className) {
    final applySuccessBuilder =
        createActionContextVoidMethod('applySuccess', stringType);

    assert(
        _map.containsKey('COMPLETE_SUCCESS_DESCRIPTION') ||
            _map.containsKey('INK'),
        "$name is missing COMPLETE_SUCCESS_DESCRIPTION or INK: $_map");

    if (_map['COMPLETE_SUCCESS_DESCRIPTION'] != null) {
      var successDescription = _map['COMPLETE_SUCCESS_DESCRIPTION'];
      applySuccessBuilder.block.statements
          .addAll(createDescriptionStatements(successDescription ?? ''));
    }

    if (_map['SUCCESS_EFFECT'] != null) {
      String successEffectBlock = _map['SUCCESS_EFFECT'];
      addStatements(successEffectBlock, applySuccessBuilder.block);
    }

    if (_map['INK'] != null) {
      assert(ink != null);
      // Push the InkSituation with the correct name at
      // the end of applySuccess.
      addStatements(
          'w.pushSituation(InkSituation.initialized('
          'w.randomInt(),'
          '"${ink.writersName}",'
          '));',
          applySuccessBuilder.block);
    }

    applySuccessBuilder.block.addExpression(
        literal('\${a.name} successfully performs $className').returned);
    return applySuccessBuilder.bake();
  }

  Method _createGetter(String name, TypeReference type, Object returnValue) {
    return Method((b) => b
      ..type = MethodType.getter
      ..name = name
      ..returns = type
      ..annotations.add(overrideAnnotation)
      ..body = literal(returnValue).code);
  }

  Method _createGetterExpression(
      String name, TypeReference type, Expression expression) {
    return Method((b) => b
      ..type = MethodType.getter
      ..name = name
      ..returns = type
      ..annotations.add(overrideAnnotation)
      ..body = expression.code);
  }

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

  Method _createIsApplicableBuilder(String forLocation) {
    var isApplicableBuilder =
        createContextActorSimWorldVoidMethod("isApplicable", boolType);
    if (forLocation != null) {
      final locationCondition = refer(applicabilityContextParameter.name)
          .property('inRoomParent')
          .call([literal(forLocation)]).notEqualTo(literalTrue);
      isApplicableBuilder.block.statements
          .add(_createIfGuard(locationCondition, false));
    }
    if (_map['PREREQUISITES'] != null) {
      final rawIfStatement = Code('if (!(${_map['PREREQUISITES']})) {'
          '  return false;'
          '}');
      isApplicableBuilder.block.statements.add(rawIfStatement);
    }

    if (_map['REPEATABLE'] != '\$TRUE') {
      assert(
          !_map.containsKey('REPEATABLE'),
          "We only allow one value for "
          "REPEATABLE, and that is \$TRUE. Instead, "
          "${_map['REPEATABLE']} was provided in $name.");

      // By default, we only allow actions to be used once.
      final actionNeverUsedCheck = refer(worldParameter.name)
          .property('actionNeverUsed')
          .call([refer('name')]);
      isApplicableBuilder.block.addExpression(actionNeverUsedCheck.returned);
    } else {
      // Otherwise, we can just return true here.
      isApplicableBuilder.block.addExpression(literalBool(true).returned);
    }
    return isApplicableBuilder.bake();
  }

  /// Returns a [GeneratedInk] if [source] is non-null. Returns `null`
  /// if [source] is `null`.
  static GeneratedInk _constructInk(
      String source, String writersName, String path) {
    if (source == null) return null;
    final name = reCase(writersName).camelCase + 'Ink';
    return GeneratedInk('${writersName}_ink', name, path, source);
  }
}
