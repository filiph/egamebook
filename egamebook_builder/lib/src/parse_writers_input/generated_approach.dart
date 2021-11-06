import 'package:code_builder/code_builder.dart';
import 'package:egamebook_builder/src/parse_writers_input/generated_action.dart'
    show implicitPattern;
import 'package:egamebook_builder/src/parse_writers_input/method_builders.dart';

import 'describer.dart';
import 'generated_game_object.dart';
import 'recase.dart';
import 'types.dart';

GeneratedGameObject generateApproach(Map<String, String> map, String dirPath) {
  return GeneratedApproach(Map.from(map), dirPath);
}

class GeneratedApproach extends GeneratedGameObject {
  final Map<String, String> _map;

  final _FromToTuple _tuple;

  final String? _prerequisites;

  GeneratedApproach(Map<String, String> map, String path)
      : _map = map,
        _tuple = _parseFromTo(map['APPROACH']!),
        _prerequisites = map['PREREQUISITES']?.trim(),
        super(_parseFromTo(map['APPROACH']!).asWritersName,
            _parseFromTo(map['APPROACH']!).bothCamelCased, approachType, path);

  @override
  Iterable<Spec> finalizeAst() sync* {
    final command = (_map['COMMAND'] ?? '').trim();
    final isImplicit = command == implicitPattern;

    final namedArguments = <String, Expression>{};
    if (_prerequisites != null) {
      final isApplicableClosure = createApplicabilityContextMethod();
      final conditional = Code(_prerequisites!);
      isApplicableClosure.block
          .addExpression(CodeExpression(conditional).returned);
      namedArguments['isApplicable'] = isApplicableClosure.bakeAsClosure();
    }

    var newInstance = approachType.newInstance(
      [
        literal(_tuple.from.snakeCase),
        literal(_tuple.to.snakeCase),
        // Output r'$IMPLICIT' if this is an implicit approach.
        isImplicit ? literalString(command, raw: true) : literal(command),
        createDescriber(_map['DESCRIPTION'] ?? ''),
      ],
      namedArguments,
    );
    var assignment = newInstance.assignFinal(name, approachType);
    yield assignment.statement;
  }

  /// Takes string in the form of `"$smelter FROM $war_forges"` and returns
  /// a [_FromToTuple].
  static _FromToTuple _parseFromTo(String s) {
    final parts = s.trim().split('FROM');
    assert(parts.length == 2);
    final from = parts[0].trim();
    final to = parts[1].trim();
    return _FromToTuple(reCase(to), reCase(from));
  }
}

class _FromToTuple {
  final ReCase from;
  final ReCase to;

  const _FromToTuple(this.from, this.to);

  String get asWritersName => "\$${to.snakeCase}_from_${from.snakeCase}";

  String get bothCamelCased => "${to.camelCase}From${from.pascalCase}";
}
