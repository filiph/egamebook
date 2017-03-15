import 'dart:async';
import 'dart:io';

import 'package:analyzer/dart/ast/ast.dart';
import 'package:code_builder/code_builder.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:logging/logging.dart';
import 'package:path/path.dart' as p;
import 'package:recase/recase.dart';

Future<Null> main(List<String> args) async {
  Logger.root.onRecord.listen((r) {
    stderr.writeln("[${r.level}] -- ${r.loggerName} -- ${r.message}");
  });

  var dir = new Directory(args.single);

  if (!await dir.exists()) {
    stderr.writeln("$dir doesn't exist");
    exitCode = 2;
    return;
  }

  LibraryBuilder lib = new LibraryBuilder();
  List<GeneratedGameObject> objects = [];

//  XXX START HERE: make note of all exits that lead to non-existing rooms, show warnings
//  but rewrite to an existing 'dummy' room instead ("This place doesn't exist yet.")

  await for (var fsEntity in dir.list(recursive: true)) {
    if (fsEntity is File && p.extension(fsEntity.path) == ".txt") {
      var relativePath = p.relative(fsEntity.path, from: dir.path);
      var rawMaps = parseWritersOutput(await fsEntity.readAsLines());
      for (var rawMap in rawMaps) {
        if (rawMap.keys.contains("ROOM")) {
          var room = generateRoom(rawMap, relativePath);
          objects.add(room);
        } else if (rawMap.keys.contains("ACTION")) {
          var action = generateAction(rawMap, relativePath);
          objects.add(action);
        }
      }
    }
  }

  lib.addDirectives(_allNeededTypes.map((b) => b.toImportBuilder()));

  List<GeneratedRoom> rooms =
      objects.where((o) => o is GeneratedRoom).toList(growable: false);
  for (var room in rooms) {
    room.registerReachableRooms(rooms.map((r) => r.name));
  }

  for (var object in objects) {
    lib.addMember(object.finalizeAst());
  }

  lib.addMember(_generateAllRooms(objects));
  lib.addMember(_generateAllActionInstances(objects));

  print(prettyToSource(lib.buildAst()));

  log.info("Generated ${objects.length} objects.");
}

/// A map of types of object that can be defined by writer.
const List<String> objectTypes = const ["ROOM", "ACTION"];

final RegExp commentPattern = new RegExp(r"^//.*");

final RegExp exitPattern = new RegExp(r"^(\$\w+):\s(.+)$");

final RegExp keyPattern = new RegExp(r"^([A-Z_]+):");

/// Logger for the writer's input.
Logger log = new Logger('WritersInputParser');

final _actionType = new TypeBuilder("Action",
    importFrom: "package:edgehead/fractal_stories/action.dart");

final _actorParameter = new ParameterBuilder("a", type: _actorType);

final _actorType = new TypeBuilder("Actor",
    importFrom: "package:edgehead/fractal_stories/actor.dart");

final _allNeededTypes = <TypeBuilder>[
  _actionType,
  _actorType,
  _exitType,
  _resourceType,
  _roomRoamingSituationType,
  _roomType,
  _storylineType,
  _worldStateType
];

final _boolType = new TypeBuilder("bool");

final _exitType = new TypeBuilder("Exit",
    importFrom: "package:edgehead/fractal_stories/room_exit.dart");

final _listOfActionType = new TypeBuilder('List', genericTypes: [_actionType]);

final _listOfRoomsType = new TypeBuilder('List', genericTypes: [_roomType]);

final _numType = new TypeBuilder("num");

final _resourceType = new TypeBuilder("Resource",
    importFrom: "package:edgehead/fractal_stories/action.dart");

final _roomRoamingSituationType = new TypeBuilder('RoomRoamingSituation',
    importFrom:
        'package:edgehead/src/room_roaming/room_roaming_situation.dart');

final TypeBuilder _roomType = new TypeBuilder("Room",
    importFrom: "package:edgehead/fractal_stories/room.dart");

final _storylineParameter = new ParameterBuilder("s", type: _storylineType);

final _storylineType = new TypeBuilder("Storyline",
    importFrom: "package:edgehead/fractal_stories/storyline/storyline.dart");

final _stringType = new TypeBuilder("String");

final _unimplementedErrorThrow =
    reference('UnimplementedError').newInstance([]).asThrow();

final _worldParameter = new ParameterBuilder("w", type: _worldStateType);

final _worldStateType = new TypeBuilder("WorldState",
    importFrom: "package:edgehead/fractal_stories/world.dart");

/// Generates code for writer's action.
///
/// Following this:
/// https://trello.com/c/S1cXPDQ7/1-parser-for-writer-s-output#comment-58682ee019b9e7b833655fb7
GeneratedGameObject generateAction(Map<String, String> map, String dirPath) {
  return new GeneratedAction(map, dirPath);
}

GeneratedGameObject generateRoom(Map<String, String> map, String dirPath) {
  return new GeneratedRoom(map, dirPath);
}

/// Parses a file and returns all objects specified in that file as a raw
/// map of keys and values.
Iterable<Map<String, String>> parseWritersOutput(List<String> contents) sync* {
  var result = new Map<String, String>();
  String currentKey;
  var currentValue = new StringBuffer();

  void addValue() {
    assert(currentKey != null);
    var string = currentValue.toString().trim();
    if (string.isNotEmpty) {
      if (result.containsKey(currentKey)) {
        log.severe("$currentKey defined more than once for $result");
        return;
      }
      result[currentKey] = string;
    }
  }

  for (var line in contents) {
    if (commentPattern.hasMatch(line)) continue;
    var keyMatch = keyPattern.firstMatch(line);
    if (keyMatch == null) {
      if (currentKey != null) {
        currentValue.writeln(line);
      }
      continue;
    }
    // New key encountered.
    if (currentKey != null) {
      // First, finalize the last key.
      addValue();
    }

    currentKey = keyMatch.group(1);

    if (objectTypes.contains(currentKey) && result.isNotEmpty) {
      // We have encountered a new object (ROOM, LOCATION, etc.). Finalize the
      // last one.
      yield result;
      result.clear();
    }

    currentValue.clear();
    currentValue.writeln(line.substring(keyMatch.end));
  }

  if (currentKey != null) {
    // Finalize the last key.
    addValue();
  }

  yield result;
}

/// Adds a note to the method, with an assert that fails.
void _addTodoToMethod(MethodBuilder method, String message) {
  var escapedMessage = _escapeDollarSign(message);
  method.addStatement(literal('/* $escapedMessage */'));
  method.addStatement(literal(false).asAssert());
}

MethodBuilder _createActorWorldMethod(
    String methodName, TypeBuilder returnType) {
  return new MethodBuilder(methodName, returnType: returnType)
    ..addPositional(_actorParameter)
    ..addPositional(_worldParameter);
}

/// Creates a new [MethodBuilder] with a skeleton of a method that takes
/// 3 positional arguments: an [Actor], a [WorldState] and a [Storyline].
///
/// This is shared across at least two methods.
MethodBuilder _createActorWorldStoryMethod(
    String methodName, TypeBuilder returnType) {
  return new MethodBuilder(methodName, returnType: returnType)
    ..addPositional(_actorParameter)
    ..addPositional(_worldParameter)
    ..addPositional(_storylineParameter);
}

String _escapeDollarSign(String s) {
  if (s.contains(r'$')) {
    log.warning("String contains a dollar sign: '''$s'''");
  }
  return s?.replaceAll(r'$', r"(DOLLAR_SIGN)");
}

StatementBuilder _generateAllActionInstances(
    List<GeneratedGameObject> objects) {
  var listLiteral = list(
      objects
          .where((o) => o.type == _actionType)
          .map((o) => reference(o.name).property('singleton')),
      type: _actionType);
  return listLiteral.asVar('allActions', _listOfActionType);
}

StatementBuilder _generateAllRooms(List<GeneratedGameObject> objects) {
  var listLiteral = list(
      objects.where((o) => o.type == _roomType).map((o) => reference(o.name)),
      type: _roomType);
  return listLiteral.asVar('allRooms', _listOfRoomsType);
}

num _parsePercent(String string) {
  assert(
      string.endsWith('%'),
      "String $string doesn't seem to be a valid "
      "percent denomination.");
  var percent = num.parse(string.replaceAll('%', ''));
  return percent / 100;
}

ReCase _reCase(String string) {
  assert(string.startsWith(r'$'), "Identifier $string doesn't start with \$.");
  return new ReCase(string.substring(1));
}

StatementBuilder _stateErrorThrow(String message) =>
    reference('StateError').newInstance([literal(message)]).asThrow();

class GeneratedAction extends GeneratedGameObject {
  final Map<String, String> _map;

  GeneratedAction(Map<String, String> map, String dirPath)
      : _map = map,
        super(_reCase(map['ACTION']).pascalCase, _actionType, dirPath);

  @override
  String get path => 'TODO ADD';

  @override
  AstBuilder<AstNode> finalizeAst() {
    var className = name;
    var forLocation = _reCase(_map['FOR_LOCATION']).camelCase;
    var classBuilder = new ClassBuilder(className);
    classBuilder.setExtends(_actionType);

    var classType = new TypeBuilder(className);

    classBuilder.addField(
        new FieldBuilder.asFinal("command", value: literal(_map['COMMAND'])));

    classBuilder
        .addField(new FieldBuilder.asFinal("name", value: literal(className)));

    var isApplicableBuilder =
        new MethodBuilder("isApplicable", returnType: _boolType)
          ..addPositional(_actorParameter)
          ..addPositional(_worldParameter);
    if (_map['PREREQUISITES'] != null) {
      _addTodoToMethod(isApplicableBuilder,
          'PLEASE IMPLEMENT PREREQUISITE: ${_map['PREREQUISITES']}');
    }
    isApplicableBuilder.addStatement((reference(_worldParameter.name)
            .property("currentSituation")
            .castAs(_roomRoamingSituationType))
        .parentheses()
        .property("currentRoomName")
        .equals(literal(forLocation))
        .asReturn());
    classBuilder.addMethod(isApplicableBuilder);

    var successChance = _parsePercent(_map['COMPLETE_SUCCESS_PROBABILITY']);

    var applySuccessBuilder =
        _createActorWorldStoryMethod('applySuccess', _stringType);

    if (successChance == 0) {
      applySuccessBuilder
          .addStatement(_stateErrorThrow('Success chance is 0%.'));
    } else {
      var successDescription =
          _escapeDollarSign(_map['COMPLETE_SUCCESS_DESCRIPTION']);
      applySuccessBuilder.addStatement(reference(_storylineParameter.name)
          .invoke('add', [literal(successDescription)]));
      if (_map['SUCCESS_EFFECT'] != null) {
        _addTodoToMethod(
            applySuccessBuilder,
            'PLEASE IMPLEMENT SUCCESS_EFFECT: '
            '${_map['SUCCESS_EFFECT']}');
        applySuccessBuilder.addStatement(
            literal('\$a successfully performs $className').asReturn());
      }
    }
    classBuilder.addMethod(applySuccessBuilder);

    var applyFailureBuilder =
        _createActorWorldStoryMethod('applyFailure', _stringType);
    if (successChance == 1.0) {
      applyFailureBuilder
          .addStatement(_stateErrorThrow('Success chance is 100%'));
    } else {
      applyFailureBuilder.addStatement(reference(_storylineParameter.name)
          .invoke('add', [literal(_map['FAILURE_BEGINNING_DESCRIPTION'])]));
      applyFailureBuilder
          .addStatement(literal('\$a fails to perform $className').asReturn());
    }
    classBuilder.addMethod(applyFailureBuilder);

    var successChanceBuilder =
        _createActorWorldMethod('getSuccessChance', _numType)
          ..addStatement(literal(successChance).asReturn());
    classBuilder.addMethod(successChanceBuilder);

    var rerollableBuilder = new MethodBuilder.getter('rerollable',
        returnType: _boolType, returns: literal(false));
    classBuilder.addMethod(rerollableBuilder);

    var rollReasonBuilder =
        _createActorWorldMethod('getRollReason', _stringType)
          ..addStatement(_stateErrorThrow('Not rerollable.'));
    classBuilder.addMethod(rollReasonBuilder);

    var rerollResourceBuilder = new MethodBuilder.getter('rerollResource',
        returnType: _resourceType, returns: literal(null));
    classBuilder.addMethod(rerollResourceBuilder);

    var helpMessageBuilder = new MethodBuilder.getter('helpMessage',
        returnType: _stringType, returns: literal(null));
    classBuilder.addMethod(helpMessageBuilder);

    var isAggressiveBuilder = new MethodBuilder.getter('isAggressive',
        returnType: _boolType, returns: literal(false));
    classBuilder.addMethod(isAggressiveBuilder);

    var singletonBuilder = new FieldBuilder.asFinal('singleton',
        type: classType, value: classType.newInstance([]));
    classBuilder.addField(singletonBuilder, asStatic: true);

    //  START HERE --  then add FAILURE_BEGINNING_DESCRIPTION in applyFailure
    //   https://trello.com/c/S1XPDQ7/1-parser-for-writer-s-output#comment-58682ee019b9e7b833655fb7
    return classBuilder;
  }
}

abstract class GeneratedGameObject {
  final TypeBuilder type;

  /// The path to the directory in which the source file was found, relative
  /// to the root of the Google Drive dump directory.
  ///
  /// For example, an action parsed from `/path/to/drive_dump/road_to_azeroth/`
  /// will have this set as `road_to_azeroth/`.
  final String dirPath;

  /// For example, 'ironcastRoad' or 'EnterTombOfWarriors'.
  final String name;

  GeneratedGameObject(this.name, this.type, this.dirPath);

  String get path;

  AstBuilder finalizeAst();
}

class GeneratedRoom extends GeneratedGameObject {
  final Map<String, String> _map;

  List<String> _reachableRooms;

  GeneratedRoom(Map<String, String> map, String dirPath)
      : _map = map,
        super(_reCase(map['ROOM']).camelCase, _roomType, dirPath);

  String get filename => _reCase(_map['ROOM']).snakeCase;

  @override
  String get path => p.join(dirPath, '$filename.dart');

  @override
  AstBuilder<AstNode> finalizeAst() {
    assert(_reachableRooms != null);

    var instanceName = name;

    var newInstance = _roomType.newInstance([
      literal(instanceName),
      literal(_escapeDollarSign(_map['DESCRIPTION'])),
      literal(_map['SHORT_DESCRIPTION'] ?? ''),
      new MethodBuilder.closure(
          returns: list([], type: _actorType, asConst: true))
        ..addPositional(_worldParameter) /* TODO: add monster generator */,
      literal(null) /* TODO: add item generator */,
      list(parseExits(_map['EXITS']), type: _exitType)
    ]);
    // TODO: add named constructor for groundMaterial
    var assignment = newInstance.asVar(instanceName, _roomType);
    return assignment;
  }

  Iterable<ExpressionBuilder> parseExits(String s) sync* {
    for (var line in s.split('\n')) {
      line = line.trim();
      if (line.isEmpty) continue;
      var match = exitPattern.firstMatch(line);
      if (match == null) {
        log.warning(
            "Found line that doesn't match exit pattern ($exitPattern): "
            "'$line'");
        continue;
      }
      var destination = _reCase(match.group(1)).camelCase;
      var description = match.group(2);
      if (!_reachableRooms.contains(destination)) {
        log.warning("Room $name registers exit to $destination but that room "
            "is unreachable (it doesn't exist).");
        var unimplementedExit = _exitType.newInstance([
          literal(endOfRoam.name),
          literal(_escapeDollarSign(description + ' (UNIMPLEMENTED)'))
        ]);
        yield unimplementedExit;
        continue;
      }
      var instance = _exitType.newInstance(
          [literal(destination), literal(_escapeDollarSign(description))]);
      yield instance;
    }
  }

  /// Registers the rooms that are reachable. This makes sure that we don't
  /// generate exits leading to unreachable rooms.
  void registerReachableRooms(Iterable<String> reachableRooms) {
    _reachableRooms = new List<String>.from(reachableRooms);
  }
}
