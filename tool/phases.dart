import 'package:build/build.dart';
import 'package:source_gen/source_gen.dart';
import 'package:built_value_generator/built_value_generator.dart';

final phases = new PhaseGroup.singleAction(
    new GeneratorBuilder([new BuiltValueGenerator()]),
    new InputSet('edgehead', const [
      'lib/src/fight/*_situation.dart',
      'lib/src/fight/on_ground/*_situation.dart'
    ]));
