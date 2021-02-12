library parse_writers_input;

import 'package:build/src/asset/id.dart';
import 'package:code_builder/code_builder.dart';
import 'package:logging/logging.dart';

import 'generated_game_object.dart';
import 'types.dart';

/// A map of types of object that can be defined by writer.
const List<String> objectTypes = ["ROOM", "ACTION", "APPROACH"];

final RegExp commentPattern = RegExp(r"^\s*//.*");

final RegExp keyPattern = RegExp(r"^([A-Z_]+):");

/// Logger for the writer's input.
Logger log = Logger('WritersInputParser');

Spec generateAllActionInstances(List<GeneratedGameObject> objects) {
  var list = literalList(
      objects
          .where((o) => o.type == actionType)
          .map((o) => refer(o.name).property('singleton')),
      actionType);
  return list.assignFinal('allActions').statement;
}

Spec generateAllApproaches(List<GeneratedGameObject> objects) {
  var listLiteral = literalList(
      objects.where((o) => o.type == approachType).map((o) => refer(o.name)),
      approachType);
  return listLiteral.assignFinal('allApproaches').statement;
}

Spec generateAllInksMap(List<GeneratedGameObject> objects) {
  var map = literalMap(
    Map.fromEntries(objects
        .where((o) => o.type == inkAstType)
        .map((o) => MapEntry(literalString(o.writersName), refer(o.name)))),
    stringType,
    inkAstType,
  );
  return map.assignFinal('allInks').statement;
}

Spec generateAllRooms(List<GeneratedGameObject> objects) {
  var list = literalList(
      objects.where((o) => o.type == roomType).map((o) => refer(o.name)),
      roomType);
  return list.assignFinal('allRooms').statement;
}

/// Parses a file and returns all objects specified in that file as a raw
/// map of keys and values.
Iterable<Map<String, String>> parseWritersOutput(
    List<String> contents, AssetId id) sync* {
  var result = Map<String, String>();
  String currentKey;
  var currentValue = StringBuffer();

  void addValue() {
    assert(currentKey != null);
    var string = currentValue.toString().trim();
    if (string.isNotEmpty) {
      if (result.containsKey(currentKey)) {
        log.severe("'$currentKey' defined with new value '$string' although it "
            "is already defined once in $id: $result");
        return;
      }
      result[currentKey] = string;
    }
  }

  for (var line in contents) {
    if (commentPattern.hasMatch(line)) continue;
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

    if (currentKey == "NOTES") {
      if (result.isNotEmpty) {
        // Send the last result.
        yield result;
      }
      // Ignores everything else.
      return;
    }

    if (objectTypes.contains(currentKey) && result.isNotEmpty) {
      // We have encountered a new object (ROOM, ACTION, etc.).
      // Send the last one.
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
