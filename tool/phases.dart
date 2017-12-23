import 'package:build_runner/build_runner.dart';
import 'package:built_value_generator/built_value_generator.dart';
import 'package:source_gen/source_gen.dart';

final List<BuildAction> phases = [
  new BuildAction(
      new PartBuilder([
        new BuiltValueGenerator(),
      ]),
      'edgehead',
      inputs: const [
        'lib/writers_input.dart',
        'lib/edgehead_global.dart',
        'lib/fractal_stories/action_record.dart',
        'lib/fractal_stories/actor.dart',
        'lib/fractal_stories/room.dart',
        'lib/fractal_stories/team.dart',
        'lib/fractal_stories/world_state.dart',
        'lib/src/**/*_situation.dart',
        'lib/egamebook/elements/serializers.dart',
        'lib/egamebook/elements/*_element.dart',
        'lib/egamebook/commands/serializers.dart',
        'lib/egamebook/commands/*_command.dart',
      ])
];
