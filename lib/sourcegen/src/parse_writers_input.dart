library parse_writers_input;

import 'dart:async';
import 'dart:io';

import 'package:code_builder/code_builder.dart';
import 'package:logging/logging.dart';
import 'package:path/path.dart' as p;

import 'parse_writers_input/generated_action.dart';
import 'parse_writers_input/generated_game_object.dart';
import 'parse_writers_input/generated_room.dart';
import 'parse_writers_input/types.dart';

Future<Null> main(List<String> args) async {
  Logger.root.onRecord.listen((r) {
    stderr.writeln("[${r.level}] -- ${r.loggerName} -- ${r.message}");
  });

  // Switch this to true if you want to have more slack during development.
  // Switch back to false when finishing up.
  var devMode = false;

  var dir = new Directory(args.single);

  if (!await dir.exists()) {
    stderr.writeln("$dir doesn't exist");
    exitCode = 2;
    return;
  }

  LibraryBuilder lib = new LibraryBuilder("writers_input");
  List<GeneratedGameObject> objects = [];

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

  lib.addDirectives(allNeededTypes.map((b) => b.toImportBuilder()));
  lib.addDirective(new ImportBuilder("package:built_value/built_value.dart"));
  lib.addDirective(new ImportBuilder("package:built_value/serializer.dart"));
  lib.addDirective(new ImportBuilder("package:edgehead/writers_helpers.dart"));

  lib.addDirective(new PartBuilder("writers_input.g.dart"));

  if (devMode) {
    log.warning("Building in dev mode (less runtime asserts).");
  }
  lib.addMember(new FieldBuilder.asConst('DEV_MODE',
      type: boolType, value: literal(devMode)));

  List<GeneratedRoom> rooms = objects
      .where((o) => o is GeneratedRoom)
      .toList(growable: false) as List<GeneratedRoom>;
  for (var room in rooms) {
    room.registerReachableRooms(rooms.map((r) => r.writersName));
  }

  for (var object in objects) {
    lib.addMembers(object.finalizeAst());
  }

  lib.addMember(generateAllRooms(objects));
  lib.addMember(generateAllActionInstances(objects));

  print(prettyToSource(lib.buildAst()));

  log.info("Generated ${objects.length} objects.");
}

/// A map of types of object that can be defined by writer.
const List<String> objectTypes = const ["ROOM", "ACTION", "APPROACH"];

final RegExp commentPattern = new RegExp(r"^//.*");

final RegExp docsFootnotePattern = new RegExp(r"^\[\w+\]");

final RegExp keyPattern = new RegExp(r"^([A-Z_]+):");

/// Logger for the writer's input.
Logger log = new Logger('WritersInputParser');

StatementBuilder generateAllActionInstances(
    List<GeneratedGameObject> objects) {
  var listLiteral = list(
      objects.where((o) => o.type == actionType).map<ExpressionBuilder>(
          (o) => reference(o.name).property('singleton')),
      type: actionType);
  return listLiteral.asVar('allActions', listOfActionType);
}

StatementBuilder generateAllRooms(List<GeneratedGameObject> objects) {
  var listLiteral = list(
      objects
          .where((o) => o.type == roomType)
          .map<ReferenceBuilder>((o) => reference(o.name)),
      type: roomType);
  return listLiteral.asVar('allRooms', listOfRoomsType);
}

StatementBuilder generateAllApproaches(List<GeneratedGameObject> objects) {
  var listLiteral = list(
      objects
          .where((o) => o.type == approachType)
          .map<ReferenceBuilder>((o) => reference(o.name)),
      type: approachType);
  return listLiteral.asVar('allApproaches', listOfApproachType);
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
    if (docsFootnotePattern.hasMatch(line)) {
      log.info("There's a Google Docs comment in one of the files: "
          "${line}");
      continue;
    }
    var keyMatch = keyPattern.firstMatch(line);
    if (keyMatch == null ||
        keyMatch.group(1) == "TODO" /* for lines starting with "TODO:" */) {
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
      // We have encountered a new object (ROOM, ACTION, etc.). Finalize the
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
