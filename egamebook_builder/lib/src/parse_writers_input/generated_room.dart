//import 'package:analyzer/analyzer.dart';
import 'package:code_builder/code_builder.dart';

import 'describer.dart';
import 'generated_game_object.dart';
import 'method_builders.dart';
import 'package:collection/collection.dart' show IterableExtension;
import 'parse_code_blocks.dart';
import 'recase.dart';
import 'types.dart';

/// A RegExp that fits an exit definition line.
///
/// Example line that matches:
///
///     $ironcast_road (Go to Fort Ironcast): You start towards the fort.
final RegExp exitPattern = RegExp(r"^(\$\w+)\s+\((.*?)\):\s(.+)$");

GeneratedGameObject generateRoom(Map<String, String> map, String dirPath) {
  return GeneratedRoom(Map.from(map), dirPath);
}

class GeneratedRoom extends GeneratedGameObject {
  /// These are the keys that are going to be inherited by a variant from
  /// its parent, if they're missing.
  static const List<String> inheritableKeys = [
    'FLAGS',
    'POS',
    'FIGHT_SITUATION',
    'MAP_NAME',
    'FIRST_MAP_NAME',
    'HINT',
    'FIRST_HINT',
    'AFTER_MONSTERS_CLEARED',
    'WHERE',
    'GROUND_MATERIAL',
    'FIRST_DESCRIPTION',
    'DESCRIPTION'
  ];

  final Map<String, String?> _map;

  List<String>? _reachableRooms;

  GeneratedRoom(Map<String, String?> map, String path)
      : _map = map,
        super(map['ROOM']!, reCase(map['ROOM']!).camelCase, roomType, path);

  bool get isVariant => _map.containsKey('VARIANT_OF');

  @override
  Iterable<Spec> finalizeAst() sync* {
    assert(_reachableRooms != null);

    var instanceName = name;

    Expression fightGenerator;
    if (_map['FIGHT_SITUATION'] == null || _map['FIGHT_SITUATION']!.isEmpty) {
      fightGenerator = literal(null);
    } else {
      fightGenerator = refer(_map['FIGHT_SITUATION']!.trim());
    }

    final Map<String, Expression> namedArguments = {};

    if (isVariant) {
      if (!_map.containsKey('RULE')) {
        throw FormatException("Room $writersName has VARIANT_OF "
            "but no RULE");
      }

      namedArguments["parent"] = literal(
          GeneratedGameObject.validateAndRemoveDollarSign(
              _map['VARIANT_OF']!.trim()));

      final roomNameHash = writersName.hashCode;
      final specificity = getSpecificity(_map['RULE']!);
      final isApplicable = createApplicabilityContextMethod();
      isApplicable.block.statements.add(Code('return ${_map["RULE"]};'));
      final prerequisite = prerequisiteType.newInstance([
        literal(roomNameHash),
        literal(specificity),
        literal(true) /* TODO: allow onlyOnce rooms/variants */,
        isApplicable.bakeAsClosure()
      ]);
      namedArguments["prerequisite"] = prerequisite;

      if (_map.containsKey('VARIANT_UPDATE_DESCRIPTION')) {
        namedArguments['variantUpdateDescribe'] =
            createDescriber(_map['VARIANT_UPDATE_DESCRIPTION']!);
      } else if (_map.containsKey('FIRST_DESCRIPTION')) {
        log.warning('Variant $writersName includes FIRST_DESCRIPTION '
            'but no VARIANT_UPDATE_DESCRIPTION.');
      }
    }

    if (_map.containsKey('FLAGS')) {
      final flags = _map['FLAGS']!.split(' ').map((s) => s.trim()).toList();
      for (final flag in flags) {
        switch (flag) {
          case r'$IDLE':
            namedArguments["isIdle"] = literalTrue;
            break;
          case r'$FIGHT_IS_OPTIONAL':
            namedArguments["fightIsOptional"] = literalTrue;
            break;
          default:
            throw ArgumentError(
                'Unknown flag "$flag" in $writersName ($path).');
        }
      }
    }

    if (_map.containsKey('POS')) {
      final posStrings = _map['POS']!.split(',').map((s) => s.trim()).toList();
      assert(posStrings.length == 2,
          'Position of a room must be given as "X, Y" (e.g. POS: 5, 7).');
      namedArguments['positionX'] = literalNum(int.parse(posStrings[0]));
      namedArguments['positionY'] = literalNum(int.parse(posStrings[1]));
    } else if (isVariant) {
      log.warning('Variant $name has no position. Please specify POS even '
          'if it\'s the same as the parent room\s.');
    }

    if (_map.containsKey('MAP_NAME')) {
      namedArguments['mapName'] = literal(_map['MAP_NAME']);
      if (_map.containsKey('FIRST_MAP_NAME')) {
        namedArguments['firstMapName'] = literal(_map['FIRST_MAP_NAME']);
      }
    } else {
      // No MAP_NAME.
      if (_map.containsKey('FIRST_MAP_NAME')) {
        log.warning('Cannot have FIRST_MAP_NAME but no MAP_NAME.');
      }
    }

    if (_map.containsKey('HINT')) {
      namedArguments['hint'] = literal(_map['HINT']);
      if (_map.containsKey('FIRST_HINT')) {
        namedArguments['firstHint'] = literal(_map['FIRST_HINT']);
      }
    } else {
      // No HINT.
      if (_map.containsKey('FIRST_HINT')) {
        log.warning('Cannot have FIRST_HINT but no HINT.');
      }
    }

    if (_map.containsKey('AFTER_MONSTERS_CLEARED')) {
      namedArguments['afterMonstersCleared'] =
          createDescriber(_map['AFTER_MONSTERS_CLEARED']!);
    }

    if (_map.containsKey('WHERE')) {
      namedArguments['whereDescription'] = literal(_map['WHERE']);
    }

    if (_map.containsKey('GROUND_MATERIAL')) {
      namedArguments['groundMaterial'] = literal(_map['GROUND_MATERIAL']);
    }

    var newInstance = roomType.newInstance([
      literal(writersName),
      createDescriber(_map['FIRST_DESCRIPTION'] ?? ''),
      createDescriber(_map['DESCRIPTION'] ?? ''),
      fightGenerator,
      literal(null) /* TODO: add item generator */,
    ], namedArguments);
    // TODO: investigate if okay to use assignFinal (or even const)
    var assignment = newInstance.assignFinal(instanceName, roomType);
    yield assignment.statement;
  }

  /// If this [isVariant], then we find the parent (the room of which this one
  /// is a variant) in [rooms], go through [inheritableKeys] and copy
  /// over values that are not in [_map].
  void maybeInheritFromParent(List<GeneratedRoom> rooms) {
    if (!isVariant) return;

    final parentName =
        GeneratedGameObject.validateAndRemoveDollarSign(_map['VARIANT_OF']!);
    final parent = rooms.singleWhereOrNull(
        (candidate) => candidate.writersName == parentName);

    if (parent == null) {
      log.severe('Room $name is defining a parent ($parentName) but '
          'this is not in the rooms: $rooms.');
      return;
    }

    for (final key in inheritableKeys) {
      if (!_map.containsKey(key) && parent._map.containsKey(key)) {
        _map[key] = parent._map[key];
      }
    }
  }

  /// Registers the rooms that are reachable. This makes sure that we don't
  /// generate approaches leading to unreachable rooms.
  void registerReachableRooms(Iterable<String> reachableRooms) {
    _reachableRooms = List<String>.from(reachableRooms);
  }
}
