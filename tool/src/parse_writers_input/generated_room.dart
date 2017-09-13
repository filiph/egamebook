import 'package:analyzer/analyzer.dart';
import 'package:code_builder/code_builder.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:path/path.dart' as p;

import 'escape_dollar_sign.dart';
import 'generated_game_object.dart';
import 'method_builders.dart';
import 'parse_code_blocks.dart';
import 'recase.dart';
import 'types.dart';

/// A RegExp that fits an exit definition line.
///
/// Example line that matches:
///
///     $ironcast_road (Go to Fort Ironcast): You start towards the fort.
final RegExp exitPattern = new RegExp(r"^(\$\w+)\s+\((.*?)\):\s(.+)$");

GeneratedGameObject generateRoom(Map<String, String> map, String dirPath) {
  return new GeneratedRoom(new Map.from(map), dirPath);
}

class GeneratedRoom extends GeneratedGameObject {
  final Map<String, String> _map;

  List<String> _reachableRooms;

  GeneratedRoom(Map<String, String> map, String dirPath)
      : _map = map,
        super(map['ROOM'], reCase(map['ROOM']).camelCase, roomType, dirPath);

  String get filename => reCase(_map['ROOM']).snakeCase;

  @override
  String get path => p.join(dirPath, '$filename.dart');

  @override
  Iterable<AstBuilder<AstNode>> finalizeAst() sync* {
    assert(_reachableRooms != null);

    var instanceName = name;

    if (_map.containsKey('MONSTERS')) {
      log.warning("MONSTERS found in $name. It is deprecated. "
          "Use FIGHT_SITUATION instead.");
    }

    ExpressionBuilder fightGenerator;
    if (_map['FIGHT_SITUATION'] == null || _map['FIGHT_SITUATION'].isEmpty) {
      fightGenerator = literal(null);
    } else {
      fightGenerator = reference(_map['FIGHT_SITUATION'].trim());
    }

    ExpressionBuilder createDescriber(String text) {
      var closure = createActorWorldStoryClosure();
      closure.addStatements(createDescriptionStatements(text ?? ''));
      return closure;
    }

    var newInstance = roomType.newInstance([
      literal(writersName),
      createDescriber(_map['DESCRIPTION']),
      createDescriber(_map['SHORT_DESCRIPTION']),
      fightGenerator,
      literal(null) /* TODO: add item generator */,
      list(parseExits(_map['EXITS']), type: exitType)
    ]);
    // TODO: add named constructor for groundMaterial
    var assignment = newInstance.asVar(instanceName, roomType);
    yield assignment;
  }

  Iterable<ExpressionBuilder> parseExits(String s) sync* {
    if (s == null) return;
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
      var destination = match.group(1).substring(1);
      var command = match.group(2);
      var description = match.group(3);
      if (!_reachableRooms.contains(destination)) {
        log.warning("Room $name registers exit to $destination but that room "
            "is unreachable (it doesn't exist).");
        var unimplementedExit = exitType.newInstance([
          literal(endOfRoam.name),
          literal(escapeDollarSign(command + ' (UNIMPLEMENTED)')),
          literal(escapeDollarSign(description))
        ]);
        yield unimplementedExit;
        continue;
      }
      var instance = exitType.newInstance([
        literal(destination),
        literal(escapeDollarSign(command)),
        literal(escapeDollarSign(description))
      ]);
      yield instance;
    }
  }

  /// Registers the rooms that are reachable. This makes sure that we don't
  /// generate exits leading to unreachable rooms.
  void registerReachableRooms(Iterable<String> reachableRooms) {
    _reachableRooms = new List<String>.from(reachableRooms);
  }
}
