import 'package:code_builder/code_builder.dart';

import 'describer.dart';
import 'generated_game_object.dart';
import 'recase.dart';
import 'types.dart';

GeneratedGameObject generateApproach(Map<String, String> map, String dirPath) {
  return new GeneratedApproach(new Map.from(map), dirPath);
}

class GeneratedApproach extends GeneratedGameObject {
  final Map<String, String> _map;

  final _FromToTuple _tuple;

  GeneratedApproach(Map<String, String> map, String path)
      : _map = map,
        _tuple = _parseFromTo(map['APPROACH']),
        super(_parseFromTo(map['APPROACH']).asWritersName,
            _parseFromTo(map['APPROACH']).bothCamelCased, approachType, path);

  @override
  Iterable<Spec> finalizeAst() sync* {
    var newInstance = approachType.newInstance([
      literal(_tuple.from.snakeCase),
      literal(_tuple.to.snakeCase),
      literal(_map['COMMAND'] ?? ''),
      createDescriber(_map['DESCRIPTION']),
    ]);
    // TODO: investigate if this can be assignFinal
    var assignment = newInstance.assignVar(name, approachType);
    yield assignment.statement;
  }

  /// Takes string in the form of `"$smelter FROM $war_forges"` and returns
  /// a [_FromToTuple].
  static _FromToTuple _parseFromTo(String s) {
    final parts = s.trim().split('FROM');
    assert(parts.length == 2);
    final from = parts[0].trim();
    final to = parts[1].trim();
    return new _FromToTuple(reCase(to), reCase(from));
  }
}

class _FromToTuple {
  final ReCase from;
  final ReCase to;

  const _FromToTuple(this.from, this.to);

  String get asWritersName => "\$${to.snakeCase}_from_${from.snakeCase}";

  String get bothCamelCased => "${to.camelCase}From${from.pascalCase}";
}
