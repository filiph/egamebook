import 'package:analyzer/analyzer.dart';
import 'package:code_builder/code_builder.dart';
import 'package:edgehead/sourcegen/src/parse_writers_input/describer.dart';
import 'package:logging/logging.dart';

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

final Logger _log = new Logger("generated_room");

GeneratedGameObject generateRoom(Map<String, String> map, String dirPath) {
  return new GeneratedRoom(new Map.from(map), dirPath);
}

class GeneratedRoom extends GeneratedGameObject {
  final Map<String, String> _map;

  List<String> _reachableRooms;

  GeneratedRoom(Map<String, String> map, String path)
      : _map = map,
        super(map['ROOM'], reCase(map['ROOM']).camelCase, roomType, path);

  @override
  Iterable<AstBuilder<AstNode>> finalizeAst() sync* {
    assert(_reachableRooms != null);

    var instanceName = name;

    ExpressionBuilder fightGenerator;
    if (_map['FIGHT_SITUATION'] == null || _map['FIGHT_SITUATION'].isEmpty) {
      fightGenerator = literal(null);
    } else {
      fightGenerator = reference(_map['FIGHT_SITUATION'].trim());
    }

    final Map<String, ExpressionBuilder> namedArguments = {};
    // TODO: add named argument for groundMaterial

    if (_map.containsKey('VARIANT_OF')) {
      if (!_map.containsKey('RULE')) {
        throw new FormatException("Room $writersName has VARIANT_OF "
            "but no RULE");
      }

      namedArguments["parent"] = literal(GeneratedGameObject
          .validateAndRemoveDollarSign(_map['VARIANT_OF'].trim()));

      final roomNameHash = writersName.hashCode;
      final specificity = getSpecificity(_map['RULE']);
      final isApplicable = createApplicabilityContextClosure()
        ..addStatement(
            new ExpressionBuilder.raw((_) => _map['RULE']).asReturn());
      final prerequisite = prerequisiteType.newInstance([
        literal(roomNameHash),
        literal(specificity),
        literal(true) /* TODO: allow onlyOnce rooms/variants */,
        isApplicable
      ]);
      namedArguments["prerequisite"] = prerequisite;
    }

    var newInstance = roomType.newInstance([
      literal(writersName),
      createDescriber(_map['FIRST_DESCRIPTION']),
      createDescriber(_map['DESCRIPTION']),
      fightGenerator,
      literal(null) /* TODO: add item generator */,
    ], named: namedArguments);
    var assignment = newInstance.asVar(instanceName, roomType);
    yield assignment;
  }

  /// Registers the rooms that are reachable. This makes sure that we don't
  /// generate approaches leading to unreachable rooms.
  void registerReachableRooms(Iterable<String> reachableRooms) {
    _reachableRooms = new List<String>.from(reachableRooms);
  }
}
