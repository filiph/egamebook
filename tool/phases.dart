import 'package:build/build.dart';
import 'package:source_gen/source_gen.dart';
import 'package:built_value_generator/built_value_generator.dart';

final PhaseGroup phases = new PhaseGroup.singleAction(
    new GeneratorBuilder([new BuiltValueGenerator()]),
    new InputSet('edgehead', const [
      'lib/fractal_stories/actor.dart',
      'lib/fractal_stories/room.dart',
      'lib/fractal_stories/team.dart',
      'lib/src/**/*_situation.dart',
    ]));
